"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  MOCK_DIRECTORY_MEMBERS,
  MOCK_DIRECTORY_STATS,
} from "@/lib/members/mock/directory-members";
import type {
  AccountStatus,
  DirectoryFilters,
  DiscordStatus,
  MembershipTier,
  ReferralStatus,
  SubscriptionStatus,
} from "@/types/members/directory";
import type { SystemHealthState } from "@/types/admin/common";

const DEFAULT_FILTERS: DirectoryFilters = {
  search: "",
  membership: "all",
  subscription: "all",
  discord: "all",
  referral: "all",
  health: "all",
};

function parseMembership(value: string | null): DirectoryFilters["membership"] {
  if (value === "vip" || value === "free") return value;
  return "all";
}

function parseSubscription(value: string | null): DirectoryFilters["subscription"] {
  if (
    value === "active" ||
    value === "pending_verification" ||
    value === "verification_required" ||
    value === "none"
  ) {
    return value;
  }
  return "all";
}

function parseDiscord(value: string | null): DirectoryFilters["discord"] {
  if (
    value === "connected" ||
    value === "disconnected" ||
    value === "action_required" ||
    value === "suspended"
  ) {
    return value;
  }
  return "all";
}

function parseReferral(value: string | null): DirectoryFilters["referral"] {
  if (value === "in_progress" || value === "eligible") return value;
  return "all";
}

function parseHealth(value: string | null): DirectoryFilters["health"] {
  if (value === "healthy" || value === "needs_attention" || value === "action_required") {
    return value;
  }
  return "all";
}

function parseFiltersFromParams(searchParams: URLSearchParams): DirectoryFilters {
  let health = parseHealth(searchParams.get("health"));

  // Ops queue / legacy deep-links until Subscriptions owns expiry filtering.
  const expiring =
    searchParams.get("expiring") ?? searchParams.get("expiry");
  if (expiring === "today" && health === "all") {
    health = "needs_attention";
  }

  return {
    search: searchParams.get("q") ?? "",
    membership: parseMembership(searchParams.get("membership")),
    subscription: parseSubscription(
      searchParams.get("subscription") ?? searchParams.get("status")
    ),
    discord: parseDiscord(searchParams.get("discord") ?? searchParams.get("sync")),
    referral: parseReferral(searchParams.get("referral")),
    health,
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
  member: (typeof MOCK_DIRECTORY_MEMBERS)[number],
  filters: DirectoryFilters
): boolean {
  const query = filters.search.trim().toLowerCase();
  if (query) {
    const haystack = `${member.username} ${member.email}`.toLowerCase();
    if (!haystack.includes(query)) return false;
  }

  if (filters.membership !== "all" && member.membership !== filters.membership) return false;
  if (filters.subscription !== "all" && member.subscription !== filters.subscription) {
    return false;
  }
  if (filters.discord !== "all" && member.discord !== filters.discord) return false;

  if (filters.referral === "eligible" && !member.referralEligible) return false;
  if (filters.referral === "in_progress" && member.referralEligible) return false;

  if (filters.health !== "all" && member.systemHealth !== filters.health) return false;

  return true;
}

function filtersToParams(filters: DirectoryFilters, page: number, pageSize: number) {
  const params = new URLSearchParams();
  if (filters.search.trim()) params.set("q", filters.search.trim());
  if (filters.membership !== "all") params.set("membership", filters.membership);
  if (filters.subscription !== "all") params.set("subscription", filters.subscription);
  if (filters.discord !== "all") params.set("discord", filters.discord);
  if (filters.referral !== "all") params.set("referral", filters.referral);
  if (filters.health !== "all") params.set("health", filters.health);
  if (page > 1) params.set("page", String(page));
  if (pageSize !== 10) params.set("pageSize", String(pageSize));
  return params;
}

function serializeFilters(filters: DirectoryFilters, page: number, pageSize: number) {
  return filtersToParams(filters, page, pageSize).toString();
}

/**
 * Members directory filters + pagination.
 *
 * Table filters share the same URL contract as DirectoryWidgets deep-links:
 *   /admin/members?membership=vip
 *   /admin/members?health=action_required
 *
 * Local state updates immediately; navigation uses router.push (same path as
 * WidgetCard <Link>) so useSearchParams stays in sync on all viewports.
 *
 * TODO(NestJS): replace mock list with authenticated members API.
 */
export function useMembersDirectory() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchKey = searchParams.toString();

  const [filters, setFiltersState] = useState<DirectoryFilters>(() =>
    parseFiltersFromParams(new URLSearchParams(searchKey))
  );
  const [page, setPageState] = useState(() => parsePage(new URLSearchParams(searchKey)));
  const [pageSize, setPageSizeState] = useState(() =>
    parsePageSize(new URLSearchParams(searchKey))
  );
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [accountOverrides, setAccountOverrides] = useState<Record<string, AccountStatus>>(
    {}
  );

  /** Prevents back/forward effect from fighting our own URL writes. */
  const lastWrittenKeyRef = useRef(serializeFilters(filters, page, pageSize));
  const filtersRef = useRef(filters);
  const pageSizeRef = useRef(pageSize);
  filtersRef.current = filters;
  pageSizeRef.current = pageSize;

  // Browser back/forward + widget Link navigations → adopt URL into local state.
  // Widget cards use <Link href="?membership=vip"> — same URL contract as filters below.
  useEffect(() => {
    if (searchKey === lastWrittenKeyRef.current) return;

    const params = new URLSearchParams(searchKey);
    setFiltersState(parseFiltersFromParams(params));
    setPageState(parsePage(params));
    setPageSizeState(parsePageSize(params));
    lastWrittenKeyRef.current = searchKey;
  }, [searchKey]);

  const writeUrl = useCallback(
    (nextFilters: DirectoryFilters, nextPage: number, nextPageSize: number) => {
      const query = serializeFilters(nextFilters, nextPage, nextPageSize);
      lastWrittenKeyRef.current = query;
      const href = query ? `${pathname}?${query}` : pathname;
      // Same navigation path as directory WidgetCard <Link>s — router.push
      // reliably updates useSearchParams; history.replaceState does not.
      router.push(href, { scroll: false });
    },
    [pathname, router]
  );

  const setFilters = useCallback(
    (patch: Partial<DirectoryFilters>) => {
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

  const membersWithOverrides = useMemo(
    () =>
      MOCK_DIRECTORY_MEMBERS.map((member) => {
        const override = accountOverrides[member.id];
        return override ? { ...member, accountStatus: override } : member;
      }),
    [accountOverrides]
  );

  const filtered = useMemo(
    () => membersWithOverrides.filter((member) => matchesFilters(member, filters)),
    [filters, membersWithOverrides]
  );

  const setAccountStatus = useCallback((memberId: string, status: AccountStatus) => {
    setAccountOverrides((prev) => ({ ...prev, [memberId]: status }));
  }, []);

  const setMembership = useCallback(
    (membership: MembershipTier | "all") => setFilters({ membership }),
    [setFilters]
  );
  const setSubscription = useCallback(
    (subscription: SubscriptionStatus | "all") => setFilters({ subscription }),
    [setFilters]
  );
  const setDiscord = useCallback(
    (discord: DiscordStatus | "all") => setFilters({ discord }),
    [setFilters]
  );
  const setReferral = useCallback(
    (referral: ReferralStatus | "all") => setFilters({ referral }),
    [setFilters]
  );
  const setHealth = useCallback(
    (health: SystemHealthState | "all") => setFilters({ health }),
    [setFilters]
  );

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);
  const pageRows = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  const hasActiveFilters =
    filters.search.trim() !== "" ||
    filters.membership !== "all" ||
    filters.subscription !== "all" ||
    filters.discord !== "all" ||
    filters.referral !== "all" ||
    filters.health !== "all";

  return {
    stats: MOCK_DIRECTORY_STATS,
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
    setMembership,
    setSubscription,
    setDiscord,
    setReferral,
    setHealth,
    setAccountStatus,
  };
}
