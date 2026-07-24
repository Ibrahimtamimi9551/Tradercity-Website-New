"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { applyAnalystCommissionOperation } from "@/lib/analysts/mock/commissions-mutations";
import {
  computeAnalystCommissionPayoutQueue,
  computeAnalystCommissionStats,
  getMockAnalystCommission,
  listMockAnalystCommissions,
  listMockAnalystPayoutHistory,
  syncCommissionIdentityFromReferrals,
} from "@/lib/analysts/mock/commissions";
import type {
  AnalystCommissionCompletePayoutInput,
  AnalystCommissionDomainView,
  AnalystCommissionFilters,
  AnalystCommissionOperation,
  AnalystCommissionStatus,
} from "@/types/analysts/commissions";

const DEFAULT_FILTERS: AnalystCommissionFilters = {
  search: "",
  status: "all",
};

function parseView(value: string | null): AnalystCommissionDomainView {
  // Legacy `lines` redirects into dashboard workspace conceptually
  if (value === "lines") return "dashboard";
  if (
    value === "directory" ||
    value === "payouts" ||
    value === "history" ||
    value === "dashboard"
  ) {
    return value;
  }
  return "dashboard";
}

function parseStatus(value: string | null): AnalystCommissionFilters["status"] {
  // Legacy Pending/Approved URLs map into Ready for Payment.
  if (value === "pending" || value === "approved") return "ready";
  if (
    value === "none" ||
    value === "ready" ||
    value === "overdue" ||
    value === "paid"
  ) {
    return value;
  }
  return "all";
}

function parseFiltersFromParams(
  searchParams: URLSearchParams
): AnalystCommissionFilters {
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
  row: ReturnType<typeof listMockAnalystCommissions>[number],
  filters: AnalystCommissionFilters
): boolean {
  const query = filters.search.trim().toLowerCase();
  if (query) {
    const haystack =
      `${row.displayName} ${row.handle} ${row.email} ${row.id}`.toLowerCase();
    if (!haystack.includes(query)) return false;
  }
  if (filters.status !== "all" && row.commissionStatus !== filters.status) {
    return false;
  }
  return true;
}

function filtersToParams(
  view: AnalystCommissionDomainView,
  filters: AnalystCommissionFilters,
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
  if (selectedId) params.set("commission", selectedId);
  return params;
}

function serializeState(
  view: AnalystCommissionDomainView,
  filters: AnalystCommissionFilters,
  page: number,
  pageSize: number,
  selectedId: string | null
) {
  return filtersToParams(view, filters, page, pageSize, selectedId).toString();
}

/**
 * Analyst Commission domain — Dashboard / Directory / Payouts / History.
 * Dashboard hosts the full operational workspace when `commission` is set.
 */
export function useAnalystCommissions() {
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
  const selectedId = searchParams.get("commission");

  const allRows = useMemo(() => {
    void tick;
    syncCommissionIdentityFromReferrals();
    return listMockAnalystCommissions();
  }, [tick]);

  const stats = useMemo(
    () => computeAnalystCommissionStats(allRows),
    [allRows]
  );

  const payoutQueue = useMemo(
    () => computeAnalystCommissionPayoutQueue(allRows),
    [allRows]
  );

  const payoutHistory = useMemo(() => {
    void tick;
    return listMockAnalystPayoutHistory();
  }, [tick]);

  const filtered = useMemo(
    () => allRows.filter((row) => matchesFilters(row, filters)),
    [allRows, filters]
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
    return getMockAnalystCommission(selectedId) ?? null;
  }, [selectedId, tick]);

  const writeUrl = useCallback(
    (
      nextView: AnalystCommissionDomainView,
      nextFilters: AnalystCommissionFilters,
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
    if (view === "directory" && safePage !== page) {
      writeUrl(view, filters, safePage, pageSize, selectedId);
    }
  }, [filters, page, pageSize, safePage, selectedId, view, writeUrl]);

  const setView = useCallback(
    (next: AnalystCommissionDomainView) => {
      writeUrl(next, DEFAULT_FILTERS, 1, pageSize, null);
    },
    [pageSize, writeUrl]
  );

  const setFilters = useCallback(
    (patch: Partial<AnalystCommissionFilters>) => {
      writeUrl(
        "directory",
        { ...filters, ...patch },
        1,
        pageSize,
        view === "directory" ? selectedId : null
      );
    },
    [filters, pageSize, selectedId, view, writeUrl]
  );

  const resetFilters = useCallback(() => {
    writeUrl("directory", DEFAULT_FILTERS, 1, pageSize, null);
  }, [pageSize, writeUrl]);

  const setPage = useCallback(
    (next: number) => {
      writeUrl("directory", filters, next, pageSize, selectedId);
    },
    [filters, pageSize, selectedId, writeUrl]
  );

  const setPageSize = useCallback(
    (next: number) => {
      writeUrl("directory", filters, 1, next, selectedId);
    },
    [filters, selectedId, writeUrl]
  );

  const setSelectedId = useCallback(
    (id: string | null) => {
      writeUrl("directory", filters, page, pageSize, id);
    },
    [filters, page, pageSize, writeUrl]
  );

  const openDirectoryFocus = useCallback(
    (focus: { status: AnalystCommissionStatus }) => {
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

  const openDirectoryRecord = useCallback(
    (commissionId: string) => {
      writeUrl("directory", DEFAULT_FILTERS, 1, pageSize, commissionId);
    },
    [pageSize, writeUrl]
  );

  /** Open Dashboard operational workspace for one analyst. */
  const openWorkspace = useCallback(
    (commissionId: string) => {
      writeUrl("dashboard", DEFAULT_FILTERS, 1, pageSize, commissionId);
    },
    [pageSize, writeUrl]
  );

  const clearWorkspace = useCallback(() => {
    writeUrl("dashboard", DEFAULT_FILTERS, 1, pageSize, null);
  }, [pageSize, writeUrl]);

  const runOperation = useCallback(
    (
      id: string,
      operation: AnalystCommissionOperation,
      input?: AnalystCommissionCompletePayoutInput
    ) => {
      const next = applyAnalystCommissionOperation(id, operation, input);
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
    payoutQueue,
    payoutHistory,
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
    openDirectoryRecord,
    openWorkspace,
    clearWorkspace,
    runOperation,
  };
}

export function parseAnalystCommissionDomainView(
  value: string | null
): AnalystCommissionDomainView {
  return parseView(value);
}
