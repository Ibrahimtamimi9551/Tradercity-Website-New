"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  MOCK_ANALYST_DIRECTORY_STATS,
  MOCK_DIRECTORY_ANALYSTS,
} from "@/lib/analysts/mock/directory-analysts";
import type {
  AnalystDirectoryFilters,
  AnalystLifecycleStatus,
  AnalystTier,
  DirectoryAnalyst,
} from "@/types/analysts/directory";
import type { SystemHealthState } from "@/types/admin/common";

const DEFAULT_FILTERS: AnalystDirectoryFilters = {
  search: "",
  status: "all",
  tier: "all",
  health: "all",
};

function parseStatus(value: string | null): AnalystDirectoryFilters["status"] {
  const allowed: AnalystLifecycleStatus[] = [
    "under_review",
    "verification",
    "partnership_discussion",
    "onboarding",
    "active",
    "growing",
    "suspended",
    "closed",
  ];
  if (value && allowed.includes(value as AnalystLifecycleStatus)) {
    return value as AnalystLifecycleStatus;
  }
  return "all";
}

function parseTier(value: string | null): AnalystDirectoryFilters["tier"] {
  if (
    value === "partner" ||
    value === "growing" ||
    value === "top_partner" ||
    value === "none"
  ) {
    return value;
  }
  return "all";
}

function parseHealth(value: string | null): AnalystDirectoryFilters["health"] {
  if (value === "healthy" || value === "needs_attention" || value === "action_required") {
    return value;
  }
  return "all";
}

function parseFiltersFromParams(searchParams: URLSearchParams): AnalystDirectoryFilters {
  return {
    search: searchParams.get("q") ?? "",
    status: parseStatus(searchParams.get("status")),
    tier: parseTier(searchParams.get("tier")),
    health: parseHealth(searchParams.get("health")),
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
  analyst: DirectoryAnalyst,
  filters: AnalystDirectoryFilters
): boolean {
  const query = filters.search.trim().toLowerCase();
  if (query) {
    const haystack =
      `${analyst.displayName} ${analyst.handle} ${analyst.email} ${analyst.specialization}`.toLowerCase();
    if (!haystack.includes(query)) return false;
  }

  if (filters.status !== "all" && analyst.status !== filters.status) return false;
  if (filters.tier !== "all" && analyst.tier !== filters.tier) return false;
  if (filters.health !== "all" && analyst.systemHealth !== filters.health) return false;

  return true;
}

function filtersToParams(
  filters: AnalystDirectoryFilters,
  page: number,
  pageSize: number
) {
  const params = new URLSearchParams();
  if (filters.search.trim()) params.set("q", filters.search.trim());
  if (filters.status !== "all") params.set("status", filters.status);
  if (filters.tier !== "all") params.set("tier", filters.tier);
  if (filters.health !== "all") params.set("health", filters.health);
  if (page > 1) params.set("page", String(page));
  if (pageSize !== 10) params.set("pageSize", String(pageSize));
  return params;
}

function serializeFilters(
  filters: AnalystDirectoryFilters,
  page: number,
  pageSize: number
) {
  return filtersToParams(filters, page, pageSize).toString();
}

/**
 * Analyst directory filters + pagination.
 *
 * URL contract mirrors Member directory style:
 *   /admin/analysts/directory?status=active
 *   /admin/analysts/directory?tier=growing
 *   /admin/analysts/directory?health=action_required
 *
 * TODO(NestJS): replace mock list with authenticated analysts API.
 */
export function useAnalystsDirectory() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchKey = searchParams.toString();

  const [filters, setFiltersState] = useState<AnalystDirectoryFilters>(() =>
    parseFiltersFromParams(new URLSearchParams(searchKey))
  );
  const [page, setPageState] = useState(() => parsePage(new URLSearchParams(searchKey)));
  const [pageSize, setPageSizeState] = useState(() =>
    parsePageSize(new URLSearchParams(searchKey))
  );
  const [showAdvanced, setShowAdvanced] = useState(false);

  const lastWrittenKeyRef = useRef(serializeFilters(filters, page, pageSize));
  const filtersRef = useRef(filters);
  const pageSizeRef = useRef(pageSize);
  filtersRef.current = filters;
  pageSizeRef.current = pageSize;

  useEffect(() => {
    if (searchKey === lastWrittenKeyRef.current) return;

    const params = new URLSearchParams(searchKey);
    setFiltersState(parseFiltersFromParams(params));
    setPageState(parsePage(params));
    setPageSizeState(parsePageSize(params));
    lastWrittenKeyRef.current = searchKey;
  }, [searchKey]);

  const writeUrl = useCallback(
    (nextFilters: AnalystDirectoryFilters, nextPage: number, nextPageSize: number) => {
      const query = serializeFilters(nextFilters, nextPage, nextPageSize);
      lastWrittenKeyRef.current = query;
      const href = query ? `${pathname}?${query}` : pathname;
      router.push(href, { scroll: false });
    },
    [pathname, router]
  );

  const setFilters = useCallback(
    (patch: Partial<AnalystDirectoryFilters>) => {
      const next = { ...filtersRef.current, ...patch };
      setFiltersState(next);
      setPageState(1);
      writeUrl(next, 1, pageSizeRef.current);
    },
    [writeUrl]
  );

  const resetFilters = useCallback(() => {
    setFiltersState(DEFAULT_FILTERS);
    setPageState(1);
    writeUrl(DEFAULT_FILTERS, 1, pageSizeRef.current);
  }, [writeUrl]);

  const setPage = useCallback(
    (nextPage: number) => {
      setPageState(nextPage);
      writeUrl(filtersRef.current, nextPage, pageSizeRef.current);
    },
    [writeUrl]
  );

  const setPageSize = useCallback(
    (nextSize: number) => {
      setPageSizeState(nextSize);
      setPageState(1);
      writeUrl(filtersRef.current, 1, nextSize);
    },
    [writeUrl]
  );

  const setStatus = useCallback(
    (status: AnalystLifecycleStatus | "all") => setFilters({ status }),
    [setFilters]
  );
  const setTier = useCallback(
    (tier: AnalystTier | "all") => setFilters({ tier }),
    [setFilters]
  );
  const setHealth = useCallback(
    (health: SystemHealthState | "all") => setFilters({ health }),
    [setFilters]
  );

  const filtered = useMemo(
    () => MOCK_DIRECTORY_ANALYSTS.filter((analyst) => matchesFilters(analyst, filters)),
    [filters]
  );

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);
  const pageRows = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  const hasActiveFilters =
    filters.search.trim() !== "" ||
    filters.status !== "all" ||
    filters.tier !== "all" ||
    filters.health !== "all";

  return {
    stats: MOCK_ANALYST_DIRECTORY_STATS,
    filters,
    setFilters,
    resetFilters,
    showAdvanced,
    setShowAdvanced,
    hasActiveFilters,
    rows: pageRows,
    total,
    page: safePage,
    pageSize,
    setPage,
    setPageSize,
    setStatus,
    setTier,
    setHealth,
  };
}
