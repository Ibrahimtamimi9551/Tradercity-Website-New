"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { applyAnalystReferralOperation } from "@/lib/analysts/mock/referrals-mutations";
import {
  computeAnalystReferralPerformance,
  computeAnalystReferralStats,
  getMockAnalystReferral,
  listArchivedMockAnalystReferrals,
  listMockAnalystReferrals,
} from "@/lib/analysts/mock/referrals";
import type {
  AnalystReferralDomainView,
  AnalystReferralFilters,
  AnalystReferralOperation,
  AnalystReferralRecord,
  AnalystReferralStatus,
} from "@/types/analysts/referrals";

const DEFAULT_FILTERS: AnalystReferralFilters = {
  search: "",
  status: "all",
};

function parseView(value: string | null): AnalystReferralDomainView {
  if (
    value === "directory" ||
    value === "performance" ||
    value === "archive" ||
    value === "dashboard"
  ) {
    return value;
  }
  return "dashboard";
}

function parseStatus(value: string | null): AnalystReferralFilters["status"] {
  if (value === "enabled" || value === "disabled") return value;
  return "all";
}

function parseFiltersFromParams(
  searchParams: URLSearchParams
): AnalystReferralFilters {
  return {
    search: searchParams.get("q") ?? "",
    status: parseStatus(searchParams.get("status")),
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
  row: AnalystReferralRecord,
  filters: AnalystReferralFilters
): boolean {
  const query = filters.search.trim().toLowerCase();
  if (query) {
    const haystack =
      `${row.displayName} ${row.handle} ${row.referralCode} ${row.referralToken} ${row.email}`.toLowerCase();
    if (!haystack.includes(query)) return false;
  }
  if (filters.status !== "all" && row.status !== filters.status) return false;
  return true;
}

function filtersToParams(
  view: AnalystReferralDomainView,
  filters: AnalystReferralFilters,
  page: number,
  pageSize: number,
  selectedId: string | null
) {
  const params = new URLSearchParams();
  if (view !== "dashboard") params.set("view", view);
  if (filters.search.trim()) params.set("q", filters.search.trim());
  if (filters.status !== "all") params.set("status", filters.status);
  if (page > 1) params.set("page", String(page));
  if (pageSize !== 10) params.set("pageSize", String(pageSize));
  if (selectedId) params.set("referral", selectedId);
  return params;
}

function serializeState(
  view: AnalystReferralDomainView,
  filters: AnalystReferralFilters,
  page: number,
  pageSize: number,
  selectedId: string | null
) {
  return filtersToParams(view, filters, page, pageSize, selectedId).toString();
}

/**
 * Analyst Referrals domain — Dashboard / Directory / Performance / Archive.
 * Mock-first; commission math deferred to Wave F.
 */
export function useAnalystReferrals() {
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
  const selectedId = searchParams.get("referral");

  const allRows = useMemo(() => {
    void tick;
    return listMockAnalystReferrals();
  }, [tick]);

  const archiveRows = useMemo(() => {
    void tick;
    return listArchivedMockAnalystReferrals();
  }, [tick]);

  const directorySource = useMemo(
    () => allRows.filter((r) => !r.archived),
    [allRows]
  );

  const stats = useMemo(
    () => computeAnalystReferralStats(allRows),
    [allRows]
  );

  const performance = useMemo(
    () => computeAnalystReferralPerformance(allRows),
    [allRows]
  );

  const sourceRows = view === "archive" ? archiveRows : directorySource;

  const filtered = useMemo(
    () => sourceRows.filter((row) => matchesFilters(row, filters)),
    [sourceRows, filters]
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
    return getMockAnalystReferral(selectedId) ?? null;
  }, [selectedId, tick]);

  const writeUrl = useCallback(
    (
      nextView: AnalystReferralDomainView,
      nextFilters: AnalystReferralFilters,
      nextPage: number,
      nextPageSize: number,
      nextSelected: string | null
    ) => {
      const qs = serializeState(
        nextView,
        nextFilters,
        nextPage,
        nextPageSize,
        nextSelected
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
      writeUrl(view, filters, safePage, pageSize, selectedId);
    }
  }, [filters, page, pageSize, safePage, selectedId, view, writeUrl]);

  const setView = useCallback(
    (next: AnalystReferralDomainView) => {
      writeUrl(next, filters, 1, pageSize, null);
    },
    [filters, pageSize, writeUrl]
  );

  const setFilters = useCallback(
    (patch: Partial<AnalystReferralFilters>) => {
      const nextView =
        view === "dashboard" || view === "performance" ? "directory" : view;
      writeUrl(nextView, { ...filters, ...patch }, 1, pageSize, selectedId);
    },
    [filters, pageSize, selectedId, view, writeUrl]
  );

  const resetFilters = useCallback(() => {
    const nextView =
      view === "dashboard" || view === "performance" ? "directory" : view;
    writeUrl(nextView, DEFAULT_FILTERS, 1, pageSize, null);
  }, [pageSize, view, writeUrl]);

  const setPage = useCallback(
    (next: number) => {
      writeUrl(view, filters, next, pageSize, selectedId);
    },
    [filters, pageSize, selectedId, view, writeUrl]
  );

  const setPageSize = useCallback(
    (next: number) => {
      writeUrl(view, filters, 1, next, selectedId);
    },
    [filters, selectedId, view, writeUrl]
  );

  const setSelectedId = useCallback(
    (id: string | null) => {
      writeUrl(
        view === "dashboard" || view === "performance" ? "directory" : view,
        filters,
        page,
        pageSize,
        id
      );
    },
    [filters, page, pageSize, view, writeUrl]
  );

  const openDirectoryFocus = useCallback(
    (focus: { status: AnalystReferralStatus }) => {
      writeUrl(
        "directory",
        { ...DEFAULT_FILTERS, status: focus.status },
        1,
        pageSize,
        null
      );
    },
    [pageSize, writeUrl]
  );

  const runOperation = useCallback(
    (id: string, operation: AnalystReferralOperation) => {
      const next = applyAnalystReferralOperation(id, operation);
      setTick((t) => t + 1);
      return next;
    },
    []
  );

  const hasActiveFilters =
    Boolean(filters.search.trim()) || filters.status !== "all";

  return {
    view,
    setView,
    stats,
    performance,
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
  };
}

export function parseAnalystReferralDomainView(
  value: string | null
): AnalystReferralDomainView {
  return parseView(value);
}
