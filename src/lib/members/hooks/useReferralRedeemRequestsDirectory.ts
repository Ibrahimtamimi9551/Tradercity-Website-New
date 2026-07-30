"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { isAdminDesktop } from "@/lib/admin/directory/breakpoints";
import {
  MOCK_REFERRAL_MEMBERS,
  MOCK_REFERRAL_REDEEM_STATS,
} from "@/lib/members/mock/referral-members";
import type {
  ReferralCreditFilter,
  ReferralMember,
  ReferralMembershipPlan,
  ReferralRedeemFilters,
  ReferralRedeemRequestStatus,
  ReferralRedeemStats,
  ReferralSort,
  ReferralSortKey,
} from "@/types/members/referral";
import {
  REFERRAL_REDEEM_STATUS_LABELS,
  REFERRAL_REDEEM_STATUS_TONES,
} from "@/types/members/referral";

const DEFAULT_FILTERS: ReferralRedeemFilters = {
  search: "",
  membershipPlan: "all",
  credit: "all",
  status: "queue",
};

const DEFAULT_SORT: ReferralSort = {
  key: "latestReferral",
  direction: "desc",
};

export const REFERRAL_REDEEM_LIST_PATH = "/admin/subscriptions";
export const REFERRAL_REDEEM_SOURCE = "referral_redeem";

function parseMembershipPlan(
  value: string | null
): ReferralRedeemFilters["membershipPlan"] {
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

function parseCredit(value: string | null): ReferralCreditFilter {
  if (value === "has_credit" || value === "no_credit") return value;
  return "all";
}

function parseStatus(
  value: string | null
): ReferralRedeemFilters["status"] {
  if (
    value === "all" ||
    value === "queue" ||
    value === "waiting_admin_approval" ||
    value === "approved" ||
    value === "rejected" ||
    value === "expired" ||
    value === "cancelled"
  ) {
    return value;
  }
  return "queue";
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

function parseFiltersFromParams(
  searchParams: URLSearchParams
): ReferralRedeemFilters {
  return {
    search: searchParams.get("q") ?? "",
    membershipPlan: parseMembershipPlan(
      searchParams.get("plan") ?? searchParams.get("rrPlan")
    ),
    credit: parseCredit(searchParams.get("credit")),
    status: parseStatus(searchParams.get("rrStatus")),
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

function matchesFilters(
  member: ReferralMember,
  filters: ReferralRedeemFilters
): boolean {
  // Activation Center only shows members who have submitted a redeem request.
  if (member.redeemRequestStatus === "none") return false;

  if (filters.status === "queue") {
    if (member.redeemRequestStatus !== "waiting_admin_approval") return false;
  } else if (
    filters.status !== "all" &&
    member.redeemRequestStatus !== filters.status
  ) {
    return false;
  }

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

  if (filters.credit === "has_credit" && member.availableCredit <= 0) {
    return false;
  }
  if (filters.credit === "no_credit" && member.availableCredit > 0) {
    return false;
  }

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
      const at = a.redeemRequestedAt
        ? new Date(a.redeemRequestedAt).getTime()
        : a.latestReferralAt
          ? new Date(a.latestReferralAt).getTime()
          : 0;
      const bt = b.redeemRequestedAt
        ? new Date(b.redeemRequestedAt).getTime()
        : b.latestReferralAt
          ? new Date(b.latestReferralAt).getTime()
          : 0;
      return (at - bt) * dir;
    }
    default:
      return 0;
  }
}

function filtersToParams(
  filters: ReferralRedeemFilters,
  page: number,
  pageSize: number,
  selectedId: string | null,
  sort: ReferralSort
) {
  const params = new URLSearchParams();
  params.set("source", REFERRAL_REDEEM_SOURCE);
  if (filters.search.trim()) params.set("q", filters.search.trim());
  if (filters.membershipPlan !== "all") {
    params.set("plan", filters.membershipPlan);
  }
  if (filters.credit !== "all") params.set("credit", filters.credit);
  if (filters.status !== "queue") params.set("rrStatus", filters.status);
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
  filters: ReferralRedeemFilters,
  page: number,
  pageSize: number,
  selectedId: string | null,
  sort: ReferralSort
) {
  return filtersToParams(filters, page, pageSize, selectedId, sort).toString();
}

function computeStats(members: ReferralMember[]): ReferralRedeemStats {
  return {
    waitingApproval: members.filter(
      (m) => m.redeemRequestStatus === "waiting_admin_approval"
    ).length,
    approved: members.filter((m) => m.redeemRequestStatus === "approved").length,
    rejected: members.filter((m) => m.redeemRequestStatus === "rejected").length,
    lastRefreshLabel: MOCK_REFERRAL_REDEEM_STATS.lastRefreshLabel,
  };
}

function nowIso() {
  return new Date().toISOString().slice(0, 19);
}

/**
 * Approve cascade (mock):
 * Waiting → Approved → Membership Activated → Credits Deducted →
 * Wallet Updated → Audit / Timeline Updated
 */
function approveRedeemRecord(member: ReferralMember): ReferralMember {
  const required = member.creditsRequired ?? 0;
  const nextCredit = Math.max(0, member.availableCredit - required);
  const stamp = nowIso();
  const planLabel = member.requestedPlanLabel ?? "VIP";

  return {
    ...member,
    redeemRequestStatus: "approved",
    availableCredit: nextCredit,
    lifetimeRedeemed: member.lifetimeRedeemed + required,
    membershipPlan: member.requestedPlan ?? member.membershipPlan,
    membershipPlanLabel: member.requestedPlanLabel ?? member.membershipPlanLabel,
    membershipStatus: "active",
    membershipStatusLabel: "Active",
    membershipStatusTone: "success",
    progressStatus: "completed",
    timeline: [
      {
        id: `rt-approve-${stamp}`,
        title: "Redeem Approved",
        description: `Membership activated via Referral Redeem · ${planLabel}`,
        timestamp: stamp,
        status: "complete",
      },
      {
        id: `rt-credits-${stamp}`,
        title: "Credits Deducted",
        description: `−$${required} from referral wallet`,
        timestamp: stamp,
        status: "complete",
      },
      {
        id: `rt-wallet-${stamp}`,
        title: "Wallet Updated",
        description: `Available credit now $${nextCredit}`,
        timestamp: stamp,
        status: "complete",
      },
      ...member.timeline,
    ],
    activity: [
      {
        id: `ra-approve-${stamp}`,
        title: "Redeem Approved",
        description: "Membership activated · credits deducted",
        timestamp: stamp,
      },
      ...member.activity,
    ],
  };
}

function rejectRedeemRecord(member: ReferralMember): ReferralMember {
  const stamp = nowIso();
  return {
    ...member,
    redeemRequestStatus: "rejected",
    timeline: [
      {
        id: `rt-reject-${stamp}`,
        title: "Redeem Rejected",
        description: "Membership unchanged · credits retained",
        timestamp: stamp,
        status: "error",
      },
      ...member.timeline,
    ],
    activity: [
      {
        id: `ra-reject-${stamp}`,
        title: "Redeem Rejected",
        timestamp: stamp,
      },
      ...member.activity,
    ],
  };
}

export type UseReferralRedeemRequestsDirectoryOptions = {
  listPathname?: string;
};

/**
 * Membership Activation Center — Referral Redeem Requests queue.
 *
 * URL contract:
 *   /admin/subscriptions?source=referral_redeem
 *   /admin/subscriptions?source=referral_redeem&rrStatus=approved
 *   /admin/subscriptions?source=referral_redeem&member=<id>
 *
 * Referral never activates membership — this Activation Center surface does.
 * TODO(NestJS): wire approve/reject to membership + wallet + audit APIs.
 */
export function useReferralRedeemRequestsDirectory(
  options?: UseReferralRedeemRequestsDirectoryOptions
) {
  const listPathname = options?.listPathname ?? REFERRAL_REDEEM_LIST_PATH;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchKey = searchParams.toString();
  const isDetailRoute =
    pathname.startsWith(`${listPathname}/`) && pathname !== listPathname;

  const routeMemberId = useMemo(() => {
    if (!isDetailRoute) return null;
    return pathname.slice(listPathname.length + 1).split("/")[0] || null;
  }, [isDetailRoute, listPathname, pathname]);

  const [members, setMembers] = useState<ReferralMember[]>(() => [
    ...MOCK_REFERRAL_MEMBERS,
  ]);
  const [filters, setFiltersState] = useState<ReferralRedeemFilters>(() =>
    parseFiltersFromParams(new URLSearchParams(searchKey))
  );
  const [sort, setSortState] = useState<ReferralSort>(() =>
    parseSortFromParams(new URLSearchParams(searchKey))
  );
  const [page, setPageState] = useState(() =>
    parsePage(new URLSearchParams(searchKey))
  );
  const [pageSize, setPageSizeState] = useState(() =>
    parsePageSize(new URLSearchParams(searchKey))
  );
  const [selectedId, setSelectedIdState] = useState<string | null>(
    () => routeMemberId ?? parseSelectedId(new URLSearchParams(searchKey))
  );
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [lastRefreshLabel, setLastRefreshLabel] = useState(
    MOCK_REFERRAL_REDEEM_STATS.lastRefreshLabel
  );
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
  const membersRef = useRef(members);
  filtersRef.current = filters;
  sortRef.current = sort;
  pageRef.current = page;
  pageSizeRef.current = pageSize;
  selectedIdRef.current = selectedId;
  isDetailRouteRef.current = isDetailRoute;
  membersRef.current = members;

  useEffect(() => {
    if (!routeMemberId) return;
    if (selectedIdRef.current === routeMemberId) return;
    setSelectedIdState(routeMemberId);
  }, [routeMemberId]);

  useEffect(() => {
    if (searchKey === lastWrittenKeyRef.current) return;
    if (searchParams.get("source") !== REFERRAL_REDEEM_SOURCE) return;

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
  }, [searchKey, searchParams]);

  const writeUrl = useCallback(
    (
      nextFilters: ReferralRedeemFilters,
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
      const href = query
        ? `${listPathname}?${query}`
        : `${listPathname}?source=${REFERRAL_REDEEM_SOURCE}`;
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
      return query
        ? `${listPathname}?${query}`
        : `${listPathname}?source=${REFERRAL_REDEEM_SOURCE}`;
    },
    [listPathname]
  );

  const setFilters = useCallback(
    (patch: Partial<ReferralRedeemFilters>) => {
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
      writeUrl(
        filtersRef.current,
        1,
        pageSizeRef.current,
        selectedIdRef.current,
        next
      );
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
        router.push(query ? `${detailPath}?${query}` : `${detailPath}?source=${REFERRAL_REDEEM_SOURCE}`);
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
    const rows = members.filter((member) => matchesFilters(member, filters));
    return [...rows].sort((a, b) => compareMembers(a, b, sort));
  }, [members, filters, sort]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);
  const pageRows = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  const findMemberById = useCallback((id: string | null | undefined) => {
    if (!id) return null;
    return (
      membersRef.current.find((m) => m.id === id || m.memberId === id) ?? null
    );
  }, []);

  const selectedMember = useMemo(() => {
    if (selectedId) return findMemberById(selectedId);
    if (isDetailRoute) return null;
    return pageRows[0] ?? filtered[0] ?? null;
  }, [selectedId, pageRows, filtered, findMemberById, isDetailRoute]);

  useEffect(() => {
    if (isDetailRoute) return;
    if (searchParams.get("source") !== REFERRAL_REDEEM_SOURCE) return;
    const fromQuery = parseSelectedId(new URLSearchParams(searchKey));
    if (!fromQuery && selectedIdRef.current) {
      setSelectedIdState(null);
    }
  }, [isDetailRoute, searchKey, searchParams]);

  const hasActiveFilters =
    filters.search.trim() !== "" ||
    filters.membershipPlan !== "all" ||
    filters.credit !== "all" ||
    filters.status !== "queue";

  const setMembershipPlan = useCallback(
    (membershipPlan: ReferralMembershipPlan | "all") =>
      setFilters({ membershipPlan }),
    [setFilters]
  );
  const setCredit = useCallback(
    (credit: ReferralCreditFilter) => setFilters({ credit }),
    [setFilters]
  );
  const setStatus = useCallback(
    (status: ReferralRedeemFilters["status"]) => setFilters({ status }),
    [setFilters]
  );

  const approveRedeem = useCallback((member: ReferralMember) => {
    if (member.redeemRequestStatus !== "waiting_admin_approval") return;
    setMembers((prev) =>
      prev.map((m) => (m.id === member.id ? approveRedeemRecord(m) : m))
    );
  }, []);

  const rejectRedeem = useCallback((member: ReferralMember) => {
    if (member.redeemRequestStatus !== "waiting_admin_approval") return;
    setMembers((prev) =>
      prev.map((m) => (m.id === member.id ? rejectRedeemRecord(m) : m))
    );
  }, []);

  const refresh = useCallback(() => {
    setIsRefreshing(true);
    setUiError(null);
    window.setTimeout(() => {
      setLastRefreshLabel("Just now");
      setIsRefreshing(false);
    }, 600);
  }, []);

  const stats = useMemo(() => {
    const base = computeStats(members);
    return { ...base, lastRefreshLabel };
  }, [members, lastRefreshLabel]);

  return {
    listPathname,
    isDetailRoute,
    stats,
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
    setCredit,
    setStatus,
    approveRedeem,
    rejectRedeem,
    lastRefreshLabel,
    isRefreshing,
    refresh,
    uiError,
    setUiError,
    clearError: () => setUiError(null),
    statusLabel: (status: ReferralRedeemRequestStatus) =>
      status === "none" ? "—" : REFERRAL_REDEEM_STATUS_LABELS[status],
    statusTone: (status: ReferralRedeemRequestStatus) =>
      status === "none" ? ("neutral" as const) : REFERRAL_REDEEM_STATUS_TONES[status],
  };
}

export type ReferralRedeemRequestsDirectoryState = ReturnType<
  typeof useReferralRedeemRequestsDirectory
>;
