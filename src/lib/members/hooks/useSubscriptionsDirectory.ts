"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { isAdminDesktop } from "@/lib/admin/directory/breakpoints";
import {
  MOCK_SUBSCRIPTION_STATS,
  MOCK_SUBSCRIPTION_TICKETS,
} from "@/lib/members/mock/subscriptions";
import type {
  SubscriptionDisplayStatus,
  SubscriptionFilters,
  SubscriptionNetwork,
  SubscriptionPlanKey,
  SubscriptionTicket,
  SubscriptionVerificationResult,
} from "@/types/members/subscription";

const DEFAULT_FILTERS: SubscriptionFilters = {
  search: "",
  status: "all",
  plan: "all",
  network: "all",
  verification: "all",
};

function parseStatus(value: string | null): SubscriptionFilters["status"] {
  // Canonical keys + legacy aliases from earlier Phase 4 deep-links.
  if (value === "blockchain_verifying" || value === "pending_verification") {
    return "blockchain_verifying";
  }
  if (value === "approval_pending" || value === "awaiting_admin_approval") {
    return "approval_pending";
  }
  if (
    value === "verification_required" ||
    value === "rejected" ||
    value === "approved"
  ) {
    return value;
  }
  return "all";
}

function parsePlan(value: string | null): SubscriptionFilters["plan"] {
  if (value === "monthly" || value === "quarterly" || value === "yearly") {
    return value;
  }
  return "all";
}

function parseNetwork(value: string | null): SubscriptionFilters["network"] {
  if (value === "bep20" || value === "erc20" || value === "trc20") {
    return value;
  }
  return "all";
}

function parseVerification(
  value: string | null
): SubscriptionFilters["verification"] {
  if (
    value === "pending" ||
    value === "verifying" ||
    value === "verified" ||
    value === "failed" ||
    value === "overpaid" ||
    value === "underpaid" ||
    value === "ambiguous"
  ) {
    return value;
  }
  return "all";
}

function parseFiltersFromParams(searchParams: URLSearchParams): SubscriptionFilters {
  return {
    search: searchParams.get("q") ?? "",
    status: parseStatus(searchParams.get("status")),
    plan: parsePlan(searchParams.get("plan")),
    network: parseNetwork(searchParams.get("network")),
    verification: parseVerification(searchParams.get("verification")),
  };
}

function parsePage(searchParams: URLSearchParams): number {
  return Math.max(1, Number(searchParams.get("page") ?? "1") || 1);
}

function parsePageSize(searchParams: URLSearchParams): number {
  const size = Number(searchParams.get("pageSize"));
  return [10, 25, 50].includes(size) ? size : 10;
}

/** Prefer `member`, also accept `memberId` from cross-module specs. */
function parseSelectedId(searchParams: URLSearchParams): string | null {
  return searchParams.get("member") ?? searchParams.get("memberId");
}

function matchesFilters(
  ticket: SubscriptionTicket,
  filters: SubscriptionFilters
): boolean {
  const query = filters.search.trim().toLowerCase();
  if (query) {
    const haystack =
      `${ticket.username} ${ticket.email} ${ticket.transactionHash} ${ticket.walletAddress} ${ticket.memberId}`.toLowerCase();
    if (!haystack.includes(query)) return false;
  }

  if (filters.status !== "all" && ticket.displayStatus !== filters.status) {
    return false;
  }
  if (filters.plan !== "all" && ticket.planKey !== filters.plan) return false;
  if (filters.network !== "all" && ticket.network !== filters.network) {
    return false;
  }
  if (
    filters.verification !== "all" &&
    ticket.verification.result !== filters.verification
  ) {
    return false;
  }

  return true;
}

function filtersToParams(
  filters: SubscriptionFilters,
  page: number,
  pageSize: number,
  selectedId: string | null
) {
  const params = new URLSearchParams();
  if (filters.search.trim()) params.set("q", filters.search.trim());
  if (filters.status !== "all") params.set("status", filters.status);
  if (filters.plan !== "all") params.set("plan", filters.plan);
  if (filters.network !== "all") params.set("network", filters.network);
  if (filters.verification !== "all") {
    params.set("verification", filters.verification);
  }
  if (page > 1) params.set("page", String(page));
  if (pageSize !== 10) params.set("pageSize", String(pageSize));
  if (selectedId) params.set("member", selectedId);
  return params;
}

function serializeFilters(
  filters: SubscriptionFilters,
  page: number,
  pageSize: number,
  selectedId: string | null
) {
  return filtersToParams(filters, page, pageSize, selectedId).toString();
}

export const SUBSCRIPTIONS_LIST_PATH = "/admin/subscriptions";

export type UseSubscriptionsDirectoryOptions = {
  listPathname?: string;
};

/**
 * Subscriptions ticket queue — filters, pagination, selection.
 *
 * URL contract (Dashboard + widgets + Control Center):
 *   /admin/subscriptions?status=blockchain_verifying
 *   /admin/subscriptions?status=approval_pending
 *   /admin/subscriptions?status=verification_required
 *   /admin/subscriptions?member=<id>
 *
 * TODO(NestJS): replace mock list with GET /admin/subscriptions
 */
export function useSubscriptionsDirectory(
  options?: UseSubscriptionsDirectoryOptions
) {
  const listPathname = options?.listPathname ?? SUBSCRIPTIONS_LIST_PATH;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchKey = searchParams.toString();
  const isDetailRoute =
    pathname.startsWith(`${listPathname}/`) && pathname !== listPathname;

  const routeTicketId = useMemo(() => {
    if (!isDetailRoute) return null;
    const rest = pathname.slice(listPathname.length + 1);
    return rest.split("/")[0] || null;
  }, [isDetailRoute, listPathname, pathname]);

  const [filters, setFiltersState] = useState<SubscriptionFilters>(() =>
    parseFiltersFromParams(new URLSearchParams(searchKey))
  );
  const [page, setPageState] = useState(() =>
    parsePage(new URLSearchParams(searchKey))
  );
  const [pageSize, setPageSizeState] = useState(() =>
    parsePageSize(new URLSearchParams(searchKey))
  );
  const [selectedId, setSelectedIdState] = useState<string | null>(() =>
    routeTicketId ?? parseSelectedId(new URLSearchParams(searchKey))
  );
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [lastRefreshLabel, setLastRefreshLabel] = useState(
    MOCK_SUBSCRIPTION_STATS.lastRefreshLabel
  );
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [uiError, setUiError] = useState<string | null>(null);

  const lastWrittenKeyRef = useRef(
    serializeFilters(filters, page, pageSize, isDetailRoute ? null : selectedId)
  );
  const filtersRef = useRef(filters);
  const pageRef = useRef(page);
  const pageSizeRef = useRef(pageSize);
  const selectedIdRef = useRef(selectedId);
  const isDetailRouteRef = useRef(isDetailRoute);
  filtersRef.current = filters;
  pageRef.current = page;
  pageSizeRef.current = pageSize;
  selectedIdRef.current = selectedId;
  isDetailRouteRef.current = isDetailRoute;

  useEffect(() => {
    if (!routeTicketId) return;
    if (selectedIdRef.current === routeTicketId) return;
    setSelectedIdState(routeTicketId);
  }, [routeTicketId]);

  useEffect(() => {
    if (searchKey === lastWrittenKeyRef.current) return;

    const params = new URLSearchParams(searchKey);
    setFiltersState(parseFiltersFromParams(params));
    setPageState(parsePage(params));
    setPageSizeState(parsePageSize(params));
    const fromQuery = parseSelectedId(params);
    if (fromQuery) {
      setSelectedIdState(fromQuery);
    } else if (!isDetailRouteRef.current) {
      setSelectedIdState(null);
    }
    lastWrittenKeyRef.current = searchKey;
  }, [searchKey]);

  const writeUrl = useCallback(
    (
      nextFilters: SubscriptionFilters,
      nextPage: number,
      nextPageSize: number,
      nextSelected: string | null
    ) => {
      const onDetail = isDetailRouteRef.current;
      const query = serializeFilters(
        nextFilters,
        nextPage,
        nextPageSize,
        onDetail ? null : nextSelected
      );
      lastWrittenKeyRef.current = query;
      if (onDetail) {
        const href = query ? `${pathname}?${query}` : pathname;
        router.replace(href, { scroll: false });
        return;
      }
      const href = query ? `${listPathname}?${query}` : listPathname;
      router.push(href, { scroll: false });
    },
    [listPathname, pathname, router]
  );

  const getListHref = useCallback(
    (opts?: { includeMember?: boolean }) => {
      const member = opts?.includeMember ? selectedIdRef.current : null;
      const query = serializeFilters(
        filtersRef.current,
        pageRef.current,
        pageSizeRef.current,
        member
      );
      return query ? `${listPathname}?${query}` : listPathname;
    },
    [listPathname]
  );

  const setFilters = useCallback(
    (patch: Partial<SubscriptionFilters>) => {
      const next = { ...filtersRef.current, ...patch };
      setFiltersState(next);
      setPageState(1);
      writeUrl(next, 1, pageSizeRef.current, selectedIdRef.current);
    },
    [writeUrl]
  );

  const resetFilters = useCallback(() => {
    setFiltersState(DEFAULT_FILTERS);
    setPageState(1);
    writeUrl(DEFAULT_FILTERS, 1, pageSizeRef.current, selectedIdRef.current);
  }, [writeUrl]);

  const setPage = useCallback(
    (nextPage: number) => {
      setPageState(nextPage);
      writeUrl(filtersRef.current, nextPage, pageSizeRef.current, selectedIdRef.current);
    },
    [writeUrl]
  );

  const setPageSize = useCallback(
    (nextSize: number) => {
      setPageSizeState(nextSize);
      setPageState(1);
      writeUrl(filtersRef.current, 1, nextSize, selectedIdRef.current);
    },
    [writeUrl]
  );

  const setSelectedId = useCallback(
    (id: string | null) => {
      setSelectedIdState(id);
      writeUrl(filtersRef.current, pageRef.current, pageSizeRef.current, id);
    },
    [writeUrl]
  );

  const selectTicket = useCallback(
    (id: string) => {
      setSelectedIdState(id);
      if (!isAdminDesktop()) {
        const query = serializeFilters(
          filtersRef.current,
          pageRef.current,
          pageSizeRef.current,
          null
        );
        lastWrittenKeyRef.current = query;
        const detailPath = `${listPathname}/${id}`;
        router.push(query ? `${detailPath}?${query}` : detailPath);
        return;
      }
      if (!isDetailRouteRef.current) {
        writeUrl(filtersRef.current, pageRef.current, pageSizeRef.current, id);
      }
    },
    [listPathname, router, writeUrl]
  );

  const filtered = useMemo(
    () =>
      MOCK_SUBSCRIPTION_TICKETS.filter((ticket) => matchesFilters(ticket, filters)),
    [filters]
  );

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);
  const pageRows = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  const findTicketById = useCallback((id: string | null | undefined) => {
    if (!id) return null;
    return (
      MOCK_SUBSCRIPTION_TICKETS.find((t) => t.id === id || t.memberId === id) ??
      null
    );
  }, []);

  const selectedTicket = useMemo(() => {
    if (selectedId) return findTicketById(selectedId);
    if (isDetailRoute) return null;
    return pageRows[0] ?? filtered[0] ?? null;
  }, [selectedId, pageRows, filtered, findTicketById, isDetailRoute]);

  useEffect(() => {
    if (isDetailRoute) return;
    const fromQuery = parseSelectedId(new URLSearchParams(searchKey));
    if (!fromQuery && selectedIdRef.current) {
      setSelectedIdState(null);
    }
  }, [isDetailRoute, searchKey]);

  const hasActiveFilters =
    filters.search.trim() !== "" ||
    filters.status !== "all" ||
    filters.plan !== "all" ||
    filters.network !== "all" ||
    filters.verification !== "all";

  const setStatus = useCallback(
    (status: SubscriptionDisplayStatus | "all") => setFilters({ status }),
    [setFilters]
  );
  const setPlan = useCallback(
    (plan: SubscriptionPlanKey | "all") => setFilters({ plan }),
    [setFilters]
  );
  const setNetwork = useCallback(
    (network: SubscriptionNetwork | "all") => setFilters({ network }),
    [setFilters]
  );
  const setVerification = useCallback(
    (verification: SubscriptionVerificationResult | "all") =>
      setFilters({ verification }),
    [setFilters]
  );

  const refresh = useCallback(() => {
    setIsRefreshing(true);
    setUiError(null);
    window.setTimeout(() => {
      setLastRefreshLabel("Just now");
      setIsRefreshing(false);
    }, 600);
  }, []);

  return {
    listPathname,
    isDetailRoute,
    stats: { ...MOCK_SUBSCRIPTION_STATS, lastRefreshLabel },
    filters,
    setFilters,
    resetFilters,
    showAdvanced,
    setShowAdvanced,
    hasActiveFilters,
    rows: pageRows,
    allFiltered: filtered,
    total,
    page: safePage,
    pageSize,
    setPage,
    setPageSize,
    selectedId,
    selectedTicket,
    findTicketById,
    setSelectedId,
    selectTicket,
    getListHref,
    setStatus,
    setPlan,
    setNetwork,
    setVerification,
    lastRefreshLabel,
    isRefreshing,
    refresh,
    uiError,
    setUiError,
    clearError: () => setUiError(null),
  };
}

export type SubscriptionsDirectoryState = ReturnType<
  typeof useSubscriptionsDirectory
>;
