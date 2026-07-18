"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { isAdminDesktop } from "@/lib/admin/directory/breakpoints";
import {
  MOCK_REFERRAL_MEMBERS,
  MOCK_REFERRAL_STATS,
} from "@/lib/members/mock/referral-members";
import type {
  ReferralCreditFilter,
  ReferralFilters,
  ReferralMember,
  ReferralMembershipPlan,
  ReferralProgressStatus,
  ReferralSort,
  ReferralSortKey,
} from "@/types/members/referral";

const DEFAULT_FILTERS: ReferralFilters = {
  search: "",
  membershipPlan: "all",
  progress: "all",
  credit: "all",
  pendingOnly: false,
};

const DEFAULT_SORT: ReferralSort = {
  key: "latestReferral",
  direction: "desc",
};

function parseMembershipPlan(
  value: string | null
): ReferralFilters["membershipPlan"] {
  if (
    value === "monthly" ||
    value === "quarterly" ||
    value === "yearly" ||
    value === "free"
  ) {
    return value;
  }
  return "all";
}

function parseProgress(value: string | null): ReferralFilters["progress"] {
  if (value === "in_progress" || value === "completed") return value;
  return "all";
}

function parseCredit(value: string | null): ReferralCreditFilter {
  if (value === "has_credit" || value === "no_credit") return value;
  return "all";
}

function parseSortKey(value: string | null): ReferralSortKey {
  if (
    value === "username" ||
    value === "progress" ||
    value === "availableCredit" ||
    value === "latestReferral"
  ) {
    return value;
  }
  return DEFAULT_SORT.key;
}

function parseSortDirection(value: string | null): ReferralSort["direction"] {
  return value === "asc" ? "asc" : "desc";
}

function parseFiltersFromParams(searchParams: URLSearchParams): ReferralFilters {
  const status = searchParams.get("status");
  return {
    search: searchParams.get("q") ?? "",
    membershipPlan: parseMembershipPlan(
      searchParams.get("plan") ?? searchParams.get("membership")
    ),
    progress: parseProgress(searchParams.get("progress")),
    credit: parseCredit(searchParams.get("credit")),
    pendingOnly: status === "pending",
  };
}

function parseSortFromParams(searchParams: URLSearchParams): ReferralSort {
  if (!searchParams.get("sort")) return DEFAULT_SORT;
  return {
    key: parseSortKey(searchParams.get("sort")),
    direction: parseSortDirection(searchParams.get("dir")),
  };
}

function parsePage(searchParams: URLSearchParams): number {
  return Math.max(1, Number(searchParams.get("page") ?? "1") || 1);
}

function parsePageSize(searchParams: URLSearchParams): number {
  const size = Number(searchParams.get("pageSize"));
  return [10, 25, 50].includes(size) ? size : 10;
}

function parseSelectedId(searchParams: URLSearchParams): string | null {
  return searchParams.get("member") ?? searchParams.get("memberId");
}

function matchesFilters(member: ReferralMember, filters: ReferralFilters): boolean {
  const query = filters.search.trim().toLowerCase();
  if (query) {
    const haystack =
      `${member.username} ${member.displayName} ${member.referralId} ${member.referralCode} ${member.discordUsername}`.toLowerCase();
    if (!haystack.includes(query)) return false;
  }

  if (
    filters.membershipPlan !== "all" &&
    member.membershipPlan !== filters.membershipPlan
  ) {
    return false;
  }

  if (filters.progress !== "all" && member.progressStatus !== filters.progress) {
    return false;
  }

  if (filters.credit === "has_credit" && member.availableCredit <= 0) return false;
  if (filters.credit === "no_credit" && member.availableCredit > 0) return false;

  if (filters.pendingOnly && member.pendingReferrals <= 0) return false;

  return true;
}

function compareMembers(
  a: ReferralMember,
  b: ReferralMember,
  sort: ReferralSort
): number {
  const dir = sort.direction === "asc" ? 1 : -1;
  switch (sort.key) {
    case "username":
      return (
        a.displayName.localeCompare(b.displayName, undefined, {
          sensitivity: "base",
        }) * dir
      );
    case "progress": {
      const ap = a.successfulReferrals / Math.max(a.progressTarget, 1);
      const bp = b.successfulReferrals / Math.max(b.progressTarget, 1);
      return (ap - bp) * dir;
    }
    case "availableCredit":
      return (a.availableCredit - b.availableCredit) * dir;
    case "latestReferral": {
      const at = a.latestReferralAt ? new Date(a.latestReferralAt).getTime() : 0;
      const bt = b.latestReferralAt ? new Date(b.latestReferralAt).getTime() : 0;
      return (at - bt) * dir;
    }
    default:
      return 0;
  }
}

function filtersToParams(
  filters: ReferralFilters,
  page: number,
  pageSize: number,
  selectedId: string | null,
  sort: ReferralSort
) {
  const params = new URLSearchParams();
  if (filters.search.trim()) params.set("q", filters.search.trim());
  if (filters.membershipPlan !== "all") params.set("plan", filters.membershipPlan);
  if (filters.progress !== "all") params.set("progress", filters.progress);
  if (filters.credit !== "all") params.set("credit", filters.credit);
  if (filters.pendingOnly) params.set("status", "pending");
  if (sort.key !== DEFAULT_SORT.key || sort.direction !== DEFAULT_SORT.direction) {
    params.set("sort", sort.key);
    params.set("dir", sort.direction);
  }
  if (page > 1) params.set("page", String(page));
  if (pageSize !== 10) params.set("pageSize", String(pageSize));
  if (selectedId) params.set("member", selectedId);
  return params;
}

function serializeState(
  filters: ReferralFilters,
  page: number,
  pageSize: number,
  selectedId: string | null,
  sort: ReferralSort
) {
  return filtersToParams(filters, page, pageSize, selectedId, sort).toString();
}

export const REFERRALS_LIST_PATH = "/admin/referrals";

export type UseReferralsDirectoryOptions = {
  listPathname?: string;
};

/**
 * Referral Operations Dashboard — filters, sort, pagination, selection.
 *
 * URL contract:
 *   /admin/referrals?status=pending
 *   /admin/referrals?progress=completed
 *   /admin/referrals?credit=has_credit
 *   /admin/referrals?member=<id>
 *   /admin/referrals?sort=availableCredit&dir=desc
 *
 * TODO(NestJS): replace mock list with authenticated referrals API.
 */
export function useReferralsDirectory(options?: UseReferralsDirectoryOptions) {
  const listPathname = options?.listPathname ?? REFERRALS_LIST_PATH;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchKey = searchParams.toString();
  const isDetailRoute =
    pathname.startsWith(`${listPathname}/`) && pathname !== listPathname;

  const routeMemberId = useMemo(() => {
    if (!isDetailRoute) return null;
    const rest = pathname.slice(listPathname.length + 1);
    return rest.split("/")[0] || null;
  }, [isDetailRoute, listPathname, pathname]);

  const [filters, setFiltersState] = useState<ReferralFilters>(() =>
    parseFiltersFromParams(new URLSearchParams(searchKey))
  );
  const [sort, setSortState] = useState<ReferralSort>(() =>
    parseSortFromParams(new URLSearchParams(searchKey))
  );
  const [page, setPageState] = useState(() => parsePage(new URLSearchParams(searchKey)));
  const [pageSize, setPageSizeState] = useState(() =>
    parsePageSize(new URLSearchParams(searchKey))
  );
  const [selectedId, setSelectedIdState] = useState<string | null>(() =>
    routeMemberId ?? parseSelectedId(new URLSearchParams(searchKey))
  );
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [lastSyncLabel, setLastSyncLabel] = useState(MOCK_REFERRAL_STATS.lastSyncLabel);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [uiError, setUiError] = useState<string | null>(null);

  const lastWrittenKeyRef = useRef(
    serializeState(filters, page, pageSize, isDetailRoute ? null : selectedId, sort)
  );
  const filtersRef = useRef(filters);
  const sortRef = useRef(sort);
  const pageRef = useRef(page);
  const pageSizeRef = useRef(pageSize);
  const selectedIdRef = useRef(selectedId);
  const isDetailRouteRef = useRef(isDetailRoute);
  filtersRef.current = filters;
  sortRef.current = sort;
  pageRef.current = page;
  pageSizeRef.current = pageSize;
  selectedIdRef.current = selectedId;
  isDetailRouteRef.current = isDetailRoute;

  useEffect(() => {
    if (!routeMemberId) return;
    if (selectedIdRef.current === routeMemberId) return;
    setSelectedIdState(routeMemberId);
  }, [routeMemberId]);

  useEffect(() => {
    if (searchKey === lastWrittenKeyRef.current) return;

    const params = new URLSearchParams(searchKey);
    setFiltersState(parseFiltersFromParams(params));
    setSortState(parseSortFromParams(params));
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
      nextFilters: ReferralFilters,
      nextPage: number,
      nextPageSize: number,
      nextSelected: string | null,
      nextSort: ReferralSort
    ) => {
      const onDetail = isDetailRouteRef.current;
      const query = serializeState(
        nextFilters,
        nextPage,
        nextPageSize,
        onDetail ? null : nextSelected,
        nextSort
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
      const query = serializeState(
        filtersRef.current,
        pageRef.current,
        pageSizeRef.current,
        member,
        sortRef.current
      );
      return query ? `${listPathname}?${query}` : listPathname;
    },
    [listPathname]
  );

  const setFilters = useCallback(
    (patch: Partial<ReferralFilters>) => {
      const next = { ...filtersRef.current, ...patch };
      setFiltersState(next);
      setPageState(1);
      writeUrl(next, 1, pageSizeRef.current, selectedIdRef.current, sortRef.current);
    },
    [writeUrl]
  );

  const resetFilters = useCallback(() => {
    setFiltersState(DEFAULT_FILTERS);
    setPageState(1);
    writeUrl(
      DEFAULT_FILTERS,
      1,
      pageSizeRef.current,
      selectedIdRef.current,
      sortRef.current
    );
  }, [writeUrl]);

  const setPage = useCallback(
    (nextPage: number) => {
      setPageState(nextPage);
      writeUrl(
        filtersRef.current,
        nextPage,
        pageSizeRef.current,
        selectedIdRef.current,
        sortRef.current
      );
    },
    [writeUrl]
  );

  const setPageSize = useCallback(
    (nextSize: number) => {
      setPageSizeState(nextSize);
      setPageState(1);
      writeUrl(
        filtersRef.current,
        1,
        nextSize,
        selectedIdRef.current,
        sortRef.current
      );
    },
    [writeUrl]
  );

  const setSort = useCallback(
    (key: ReferralSortKey) => {
      const current = sortRef.current;
      const next: ReferralSort =
        current.key === key
          ? { key, direction: current.direction === "asc" ? "desc" : "asc" }
          : { key, direction: key === "username" ? "asc" : "desc" };
      setSortState(next);
      setPageState(1);
      writeUrl(filtersRef.current, 1, pageSizeRef.current, selectedIdRef.current, next);
    },
    [writeUrl]
  );

  const selectMember = useCallback(
    (id: string) => {
      setSelectedIdState(id);
      if (!isAdminDesktop()) {
        const query = serializeState(
          filtersRef.current,
          pageRef.current,
          pageSizeRef.current,
          null,
          sortRef.current
        );
        lastWrittenKeyRef.current = query;
        const detailPath = `${listPathname}/${id}`;
        router.push(query ? `${detailPath}?${query}` : detailPath);
        return;
      }
      if (!isDetailRouteRef.current) {
        writeUrl(
          filtersRef.current,
          pageRef.current,
          pageSizeRef.current,
          id,
          sortRef.current
        );
      }
    },
    [listPathname, router, writeUrl]
  );

  const filtered = useMemo(() => {
    const rows = MOCK_REFERRAL_MEMBERS.filter((member) =>
      matchesFilters(member, filters)
    );
    return [...rows].sort((a, b) => compareMembers(a, b, sort));
  }, [filters, sort]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);
  const pageRows = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  const findMemberById = useCallback((id: string | null | undefined) => {
    if (!id) return null;
    return (
      MOCK_REFERRAL_MEMBERS.find((m) => m.id === id || m.memberId === id) ?? null
    );
  }, []);

  const selectedMember = useMemo(() => {
    if (selectedId) return findMemberById(selectedId);
    // Desktop panel preview only — never treat as a navigation selection.
    if (isDetailRoute) return null;
    return pageRows[0] ?? filtered[0] ?? null;
  }, [selectedId, pageRows, filtered, findMemberById, isDetailRoute]);

  // List route without ?member= must clear selection (provider stays mounted across
  // list ↔ detail; otherwise Back would re-trigger mobile deep-link navigation).
  useEffect(() => {
    if (isDetailRoute) return;
    const fromQuery = parseSelectedId(new URLSearchParams(searchKey));
    if (!fromQuery && selectedIdRef.current) {
      setSelectedIdState(null);
    }
  }, [isDetailRoute, searchKey]);

  const hasActiveFilters =
    filters.search.trim() !== "" ||
    filters.membershipPlan !== "all" ||
    filters.progress !== "all" ||
    filters.credit !== "all" ||
    filters.pendingOnly;

  const setMembershipPlan = useCallback(
    (membershipPlan: ReferralMembershipPlan | "all") =>
      setFilters({ membershipPlan }),
    [setFilters]
  );
  const setProgress = useCallback(
    (progress: ReferralProgressStatus | "all") => setFilters({ progress }),
    [setFilters]
  );
  const setCredit = useCallback(
    (credit: ReferralCreditFilter) => setFilters({ credit }),
    [setFilters]
  );

  const refresh = useCallback(() => {
    setIsRefreshing(true);
    setUiError(null);
    window.setTimeout(() => {
      setLastSyncLabel("Just now");
      setIsRefreshing(false);
    }, 600);
  }, []);

  return {
    listPathname,
    isDetailRoute,
    stats: { ...MOCK_REFERRAL_STATS, lastSyncLabel },
    filters,
    setFilters,
    resetFilters,
    sort,
    setSort,
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
    selectedMember,
    findMemberById,
    selectMember,
    getListHref,
    setMembershipPlan,
    setProgress,
    setCredit,
    lastSyncLabel,
    isRefreshing,
    refresh,
    uiError,
    setUiError,
    clearError: () => setUiError(null),
  };
}

export type ReferralsDirectoryState = ReturnType<typeof useReferralsDirectory>;
