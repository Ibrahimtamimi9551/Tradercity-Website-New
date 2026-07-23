"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { applyAnalystDiscordOperation } from "@/lib/analysts/mock/discord-mutations";
import {
  computeAnalystDiscordStats,
  getMockAnalystDiscord,
  listMockAnalystDiscord,
} from "@/lib/analysts/mock/discord";
import type {
  AnalystDiscordAssignedRole,
  AnalystDiscordDomainView,
  AnalystDiscordFilters,
  AnalystDiscordOperation,
  AnalystDiscordRecord,
  AnalystDiscordStatus,
  AnalystDiscordSyncHealth,
} from "@/types/analysts/discord";

const DEFAULT_FILTERS: AnalystDiscordFilters = {
  search: "",
  status: "all",
  role: "all",
  sync: "all",
};

function parseView(value: string | null): AnalystDiscordDomainView {
  if (value === "directory" || value === "operations" || value === "dashboard") return value;
  return "dashboard";
}

function parseStatus(value: string | null): AnalystDiscordFilters["status"] {
  const allowed: AnalystDiscordStatus[] = [
    "pending",
    "invited",
    "connected",
    "verified",
    "role_assigned",
    "disconnected",
  ];
  if (value && allowed.includes(value as AnalystDiscordStatus)) {
    return value as AnalystDiscordStatus;
  }
  // Widget shorthand
  if (value === "pending_connections") return "pending";
  if (value === "pending_invitations") return "invited";
  return "all";
}

function parseRole(value: string | null): AnalystDiscordFilters["role"] {
  if (value === "none" || value === "analyst" || value === "pending") return value;
  return "all";
}

function parseSync(value: string | null): AnalystDiscordFilters["sync"] {
  if (value === "ok" || value === "pending" || value === "error") return value;
  if (value === "failed") return "error";
  return "all";
}

function parseFiltersFromParams(searchParams: URLSearchParams): AnalystDiscordFilters {
  return {
    search: searchParams.get("q") ?? "",
    status: parseStatus(searchParams.get("status")),
    role: parseRole(searchParams.get("role")),
    sync: parseSync(searchParams.get("sync")),
  };
}

function parsePage(searchParams: URLSearchParams): number {
  return Math.max(1, Number(searchParams.get("page") ?? "1") || 1);
}

function parsePageSize(searchParams: URLSearchParams): number {
  const size = Number(searchParams.get("pageSize"));
  return [10, 25, 50].includes(size) ? size : 10;
}

function matchesFilters(
  row: AnalystDiscordRecord,
  filters: AnalystDiscordFilters,
  special?: string | null
): boolean {
  const query = filters.search.trim().toLowerCase();
  if (query) {
    const haystack =
      `${row.displayName} ${row.handle} ${row.discordUsername ?? ""} ${row.email}`.toLowerCase();
    if (!haystack.includes(query)) return false;
  }

  if (special === "role_issues") {
    return (
      (row.status === "connected" || row.status === "verified") &&
      row.assignedRole !== "analyst"
    );
  }

  if (filters.status !== "all" && row.status !== filters.status) return false;
  if (filters.role !== "all" && row.assignedRole !== filters.role) return false;
  if (filters.sync !== "all" && row.syncHealth !== filters.sync) return false;
  return true;
}

function filtersToParams(
  view: AnalystDiscordDomainView,
  filters: AnalystDiscordFilters,
  page: number,
  pageSize: number,
  selectedId: string | null,
  special: string | null
) {
  const params = new URLSearchParams();
  if (view !== "dashboard") params.set("view", view);
  if (filters.search.trim()) params.set("q", filters.search.trim());
  if (filters.status !== "all") params.set("status", filters.status);
  if (filters.role !== "all") params.set("role", filters.role);
  if (filters.sync !== "all") params.set("sync", filters.sync);
  if (special) params.set("focus", special);
  if (page > 1) params.set("page", String(page));
  if (pageSize !== 10) params.set("pageSize", String(pageSize));
  if (selectedId) params.set("discord", selectedId);
  return params;
}

function serializeState(
  view: AnalystDiscordDomainView,
  filters: AnalystDiscordFilters,
  page: number,
  pageSize: number,
  selectedId: string | null,
  special: string | null
) {
  return filtersToParams(view, filters, page, pageSize, selectedId, special).toString();
}

/**
 * Analyst Discord domain — Dashboard / Directory / Operations.
 * Mock-first; mirrors Member Discord UX with Analyst lifecycle logic.
 */
export function useAnalystDiscord() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const skipUrlWrite = useRef(false);
  const [tick, setTick] = useState(0);

  const view = parseView(searchParams.get("view"));
  const filters = useMemo(
    () => parseFiltersFromParams(searchParams),
    [searchParams]
  );
  const page = parsePage(searchParams);
  const pageSize = parsePageSize(searchParams);
  const selectedId = searchParams.get("discord");
  const special = searchParams.get("focus");

  const allRows = useMemo(() => {
    void tick;
    return listMockAnalystDiscord();
  }, [tick]);

  const stats = useMemo(() => computeAnalystDiscordStats(allRows), [allRows]);

  const filtered = useMemo(
    () => allRows.filter((row) => matchesFilters(row, filters, special)),
    [allRows, filters, special]
  );

  const total = filtered.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, pageCount);
  const rows = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, pageSize, safePage]);

  const selectedRecord = useMemo(() => {
    if (!selectedId) return null;
    return getMockAnalystDiscord(selectedId) ?? null;
  }, [selectedId, tick]);

  const writeUrl = useCallback(
    (
      nextView: AnalystDiscordDomainView,
      nextFilters: AnalystDiscordFilters,
      nextPage: number,
      nextPageSize: number,
      nextSelected: string | null,
      nextSpecial: string | null
    ) => {
      const qs = serializeState(
        nextView,
        nextFilters,
        nextPage,
        nextPageSize,
        nextSelected,
        nextSpecial
      );
      const href = qs ? `${pathname}?${qs}` : pathname;
      skipUrlWrite.current = true;
      router.replace(href, { scroll: false });
    },
    [pathname, router]
  );

  useEffect(() => {
    if (skipUrlWrite.current) {
      skipUrlWrite.current = false;
      return;
    }
  }, [searchParams]);

  useEffect(() => {
    if (safePage !== page) {
      writeUrl(view, filters, safePage, pageSize, selectedId, special);
    }
  }, [filters, page, pageSize, safePage, selectedId, special, view, writeUrl]);

  const setView = useCallback(
    (next: AnalystDiscordDomainView) => {
      writeUrl(next, filters, 1, pageSize, null, null);
    },
    [filters, pageSize, writeUrl]
  );

  const setFilters = useCallback(
    (patch: Partial<AnalystDiscordFilters>) => {
      writeUrl(view === "dashboard" ? "directory" : view, { ...filters, ...patch }, 1, pageSize, selectedId, null);
    },
    [filters, pageSize, selectedId, view, writeUrl]
  );

  const resetFilters = useCallback(() => {
    writeUrl(view === "dashboard" ? "directory" : view, DEFAULT_FILTERS, 1, pageSize, null, null);
  }, [pageSize, view, writeUrl]);

  const setPage = useCallback(
    (next: number) => {
      writeUrl(view, filters, next, pageSize, selectedId, special);
    },
    [filters, pageSize, selectedId, special, view, writeUrl]
  );

  const setPageSize = useCallback(
    (next: number) => {
      writeUrl(view, filters, 1, next, selectedId, special);
    },
    [filters, selectedId, special, view, writeUrl]
  );

  const setSelectedId = useCallback(
    (id: string | null) => {
      writeUrl(
        view === "dashboard" ? "directory" : view,
        filters,
        page,
        pageSize,
        id,
        special
      );
    },
    [filters, page, pageSize, special, view, writeUrl]
  );

  const openDirectoryFocus = useCallback(
    (focus:
      | { status: AnalystDiscordStatus }
      | { sync: AnalystDiscordSyncHealth }
      | { role: AnalystDiscordAssignedRole }
      | { special: "role_issues" }
    ) => {
      if ("special" in focus) {
        writeUrl("directory", DEFAULT_FILTERS, 1, pageSize, null, "role_issues");
        return;
      }
      if ("status" in focus) {
        writeUrl("directory", { ...DEFAULT_FILTERS, status: focus.status }, 1, pageSize, null, null);
        return;
      }
      if ("sync" in focus) {
        writeUrl("directory", { ...DEFAULT_FILTERS, sync: focus.sync }, 1, pageSize, null, null);
        return;
      }
      writeUrl("directory", { ...DEFAULT_FILTERS, role: focus.role }, 1, pageSize, null, null);
    },
    [pageSize, writeUrl]
  );

  const runOperation = useCallback(
    (id: string, operation: AnalystDiscordOperation, opts?: { discordUsername?: string }) => {
      const next = applyAnalystDiscordOperation(id, operation, opts);
      setTick((t) => t + 1);
      return next;
    },
    []
  );

  const hasActiveFilters =
    Boolean(filters.search.trim()) ||
    filters.status !== "all" ||
    filters.role !== "all" ||
    filters.sync !== "all" ||
    Boolean(special);

  return {
    view,
    setView,
    stats,
    filters,
    setFilters,
    resetFilters,
    hasActiveFilters,
    allRows,
    rows,
    total,
    page: safePage,
    pageSize,
    setPage,
    setPageSize,
    selectedId,
    setSelectedId,
    selectedRecord,
    openDirectoryFocus,
    runOperation,
    special,
  };
}

export function parseAnalystDiscordDomainView(
  value: string | null
): AnalystDiscordDomainView {
  return parseView(value);
}
