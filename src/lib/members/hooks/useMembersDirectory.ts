"use client";

import { useCallback, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  MOCK_DIRECTORY_MEMBERS,
  MOCK_DIRECTORY_STATS,
} from "@/lib/members/mock/directory-members";
import type {
  DirectoryFilters,
  DirectoryMember,
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

function matchesFilters(member: DirectoryMember, filters: DirectoryFilters): boolean {
  const query = filters.search.trim().toLowerCase();
  if (query) {
    const haystack = `${member.username} ${member.email}`.toLowerCase();
    if (!haystack.includes(query)) return false;
  }

  if (filters.membership !== "all" && member.membership !== filters.membership) return false;
  if (filters.subscription !== "all" && member.subscription !== filters.subscription) return false;
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

/**
 * Members directory filters + pagination.
 * TODO(NestJS): replace mock list with authenticated members API.
 */
export function useMembersDirectory() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters: DirectoryFilters = useMemo(
    () => ({
      search: searchParams.get("q") ?? "",
      membership: parseMembership(searchParams.get("membership")),
      subscription: parseSubscription(searchParams.get("subscription") ?? searchParams.get("status")),
      discord: parseDiscord(searchParams.get("discord") ?? searchParams.get("sync")),
      referral: parseReferral(searchParams.get("referral")),
      health: parseHealth(searchParams.get("health")),
    }),
    [searchParams]
  );

  const page = Math.max(1, Number(searchParams.get("page") ?? "1") || 1);
  const pageSize = [10, 25, 50].includes(Number(searchParams.get("pageSize")))
    ? Number(searchParams.get("pageSize"))
    : 10;

  const [showAdvanced, setShowAdvanced] = useState(false);

  const syncUrl = useCallback(
    (nextFilters: DirectoryFilters, nextPage: number, nextPageSize: number) => {
      const params = filtersToParams(nextFilters, nextPage, nextPageSize);
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [pathname, router]
  );

  const setFilters = useCallback(
    (patch: Partial<DirectoryFilters>) => {
      syncUrl({ ...filters, ...patch }, 1, pageSize);
    },
    [filters, pageSize, syncUrl]
  );

  const resetFilters = useCallback(() => {
    syncUrl(DEFAULT_FILTERS, 1, pageSize);
  }, [pageSize, syncUrl]);

  const setPage = useCallback(
    (nextPage: number) => {
      syncUrl(filters, nextPage, pageSize);
    },
    [filters, pageSize, syncUrl]
  );

  const setPageSize = useCallback(
    (nextSize: number) => {
      syncUrl(filters, 1, nextSize);
    },
    [filters, syncUrl]
  );

  const filtered = useMemo(
    () => MOCK_DIRECTORY_MEMBERS.filter((member) => matchesFilters(member, filters)),
    [filters]
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
    /** Expose setter helpers for typed selects */
    setMembership: (membership: MembershipTier | "all") => setFilters({ membership }),
    setSubscription: (subscription: SubscriptionStatus | "all") => setFilters({ subscription }),
    setDiscord: (discord: DiscordStatus | "all") => setFilters({ discord }),
    setReferral: (referral: ReferralStatus | "all") => setFilters({ referral }),
    setHealth: (health: SystemHealthState | "all") => setFilters({ health }),
  };
}
