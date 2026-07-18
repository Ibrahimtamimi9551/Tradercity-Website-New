"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { isAdminDesktop } from "@/lib/admin/directory/breakpoints";
import {
  MOCK_DISCORD_MEMBERS,
  MOCK_DISCORD_STATS,
} from "@/lib/members/mock/discord-members";
import type {
  DiscordConnectionStatus,
  DiscordFilters,
  DiscordMember,
  DiscordRole,
  DiscordSyncStatus,
} from "@/types/members/discord";

const DEFAULT_FILTERS: DiscordFilters = {
  search: "",
  role: "all",
  connection: "all",
  sync: "all",
  membership: "all",
};

function parseRole(value: string | null): DiscordFilters["role"] {
  if (
    value === "vip" ||
    value === "public" ||
    value === "analyst" ||
    value === "moderator"
  ) {
    return value;
  }
  return "all";
}

function parseConnection(value: string | null): DiscordFilters["connection"] {
  if (
    value === "connected" ||
    value === "disconnected" ||
    value === "left_server" ||
    value === "suspended"
  ) {
    return value;
  }
  return "all";
}

/**
 * Dashboard / widget deep-links use `?sync=failed|pending|synced`.
 * Also accept canonical enum values (`sync_failed`, `not_synced`).
 */
function parseSync(value: string | null): DiscordFilters["sync"] {
  if (value === "failed" || value === "sync_failed") return "sync_failed";
  if (value === "pending") return "pending";
  if (value === "synced") return "synced";
  if (value === "not_synced") return "not_synced";
  return "all";
}

function parseMembership(value: string | null): DiscordFilters["membership"] {
  if (value === "vip" || value === "free") return value;
  return "all";
}

function parseFiltersFromParams(searchParams: URLSearchParams): DiscordFilters {
  return {
    search: searchParams.get("q") ?? "",
    role: parseRole(searchParams.get("role")),
    connection: parseConnection(searchParams.get("connection")),
    sync: parseSync(searchParams.get("sync")),
    membership: parseMembership(searchParams.get("membership")),
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

function syncToParam(sync: DiscordFilters["sync"]): string | null {
  if (sync === "all") return null;
  if (sync === "sync_failed") return "failed";
  return sync;
}

function matchesFilters(member: DiscordMember, filters: DiscordFilters): boolean {
  const query = filters.search.trim().toLowerCase();
  if (query) {
    const haystack = `${member.username} ${member.discordId}`.toLowerCase();
    if (!haystack.includes(query)) return false;
  }

  if (filters.role !== "all" && member.role !== filters.role) return false;
  if (filters.connection !== "all" && member.connectionStatus !== filters.connection) {
    return false;
  }

  if (filters.sync === "pending") {
    // Pending Invites widget: invite sent, not yet joined.
    if (!(member.pendingInvite || member.syncStatus === "pending")) return false;
  } else if (filters.sync !== "all" && member.syncStatus !== filters.sync) {
    return false;
  }

  if (filters.membership === "vip") {
    const isVipPlan = member.linkedMembership.plan.toLowerCase().includes("vip");
    if (!isVipPlan && member.role !== "vip") return false;
  }
  if (filters.membership === "free") {
    const isFree =
      member.linkedMembership.plan.toLowerCase() === "free" ||
      member.linkedMembership.status === "none";
    if (!isFree) return false;
  }

  return true;
}

function filtersToParams(
  filters: DiscordFilters,
  page: number,
  pageSize: number,
  selectedId: string | null
) {
  const params = new URLSearchParams();
  if (filters.search.trim()) params.set("q", filters.search.trim());
  if (filters.role !== "all") params.set("role", filters.role);
  if (filters.connection !== "all") params.set("connection", filters.connection);
  const syncParam = syncToParam(filters.sync);
  if (syncParam) params.set("sync", syncParam);
  if (filters.membership !== "all") params.set("membership", filters.membership);
  if (page > 1) params.set("page", String(page));
  if (pageSize !== 10) params.set("pageSize", String(pageSize));
  if (selectedId) params.set("member", selectedId);
  return params;
}

function serializeFilters(
  filters: DiscordFilters,
  page: number,
  pageSize: number,
  selectedId: string | null
) {
  return filtersToParams(filters, page, pageSize, selectedId).toString();
}

export const DISCORD_LIST_PATH = "/admin/discord";

export type UseDiscordDirectoryOptions = {
  /** Canonical list path for URL writes. Default `/admin/discord`. */
  listPathname?: string;
};

/**
 * Discord Synchronization Center — filters, pagination, selection.
 *
 * URL contract (Dashboard + widgets):
 *   /admin/discord?sync=failed
 *   /admin/discord?sync=pending
 *   /admin/discord?role=vip
 *   /admin/discord?member=<id>   (also accepts memberId)
 *
 * When mounted in a layout that spans `/admin/discord` and `/admin/discord/[id]`,
 * filter/page state stays alive across detail navigation. Detail routes carry the
 * list query string (without `member`) so refresh preserves browsing context.
 *
 * TODO(NestJS): replace mock list with authenticated Discord sync API.
 */
export function useDiscordDirectory(options?: UseDiscordDirectoryOptions) {
  const listPathname = options?.listPathname ?? DISCORD_LIST_PATH;
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

  const [filters, setFiltersState] = useState<DiscordFilters>(() =>
    parseFiltersFromParams(new URLSearchParams(searchKey))
  );
  const [page, setPageState] = useState(() => parsePage(new URLSearchParams(searchKey)));
  const [pageSize, setPageSizeState] = useState(() =>
    parsePageSize(new URLSearchParams(searchKey))
  );
  const [selectedId, setSelectedIdState] = useState<string | null>(() =>
    routeMemberId ?? parseSelectedId(new URLSearchParams(searchKey))
  );
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [lastSyncLabel, setLastSyncLabel] = useState(MOCK_DISCORD_STATS.lastSyncLabel);
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

  // Keep selection aligned with `/admin/discord/[id]` without writing the list URL.
  useEffect(() => {
    if (!routeMemberId) return;
    if (selectedIdRef.current === routeMemberId) return;
    setSelectedIdState(routeMemberId);
  }, [routeMemberId]);

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
      nextFilters: DiscordFilters,
      nextPage: number,
      nextPageSize: number,
      nextSelected: string | null
    ) => {
      // Detail routes encode selection in the path — omit `member` from the query.
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
    (patch: Partial<DiscordFilters>) => {
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

  /**
   * Select a member. Below `lg`, performs a single navigation to the detail route
   * with the list query preserved. At `lg+`, updates list URL selection for the panel.
   */
  const selectMember = useCallback(
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
    () => MOCK_DISCORD_MEMBERS.filter((member) => matchesFilters(member, filters)),
    [filters]
  );

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(page, totalPages);
  const pageRows = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  const findMemberById = useCallback((id: string | null | undefined) => {
    if (!id) return null;
    return (
      MOCK_DISCORD_MEMBERS.find((m) => m.id === id || m.memberId === id) ?? null
    );
  }, []);

  const selectedMember = useMemo(() => {
    if (!selectedId) return pageRows[0] ?? filtered[0] ?? null;
    return findMemberById(selectedId);
  }, [selectedId, pageRows, filtered, findMemberById]);

  const hasActiveFilters =
    filters.search.trim() !== "" ||
    filters.role !== "all" ||
    filters.connection !== "all" ||
    filters.sync !== "all" ||
    filters.membership !== "all";

  const setRole = useCallback(
    (role: DiscordRole | "all") => setFilters({ role }),
    [setFilters]
  );
  const setConnection = useCallback(
    (connection: DiscordConnectionStatus | "all") => setFilters({ connection }),
    [setFilters]
  );
  const setSync = useCallback(
    (sync: DiscordSyncStatus | "all") => setFilters({ sync }),
    [setFilters]
  );
  const setMembership = useCallback(
    (membership: DiscordFilters["membership"]) => setFilters({ membership }),
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
    stats: { ...MOCK_DISCORD_STATS, lastSyncLabel },
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
    selectedId: selectedMember?.id ?? selectedId,
    selectedMember,
    findMemberById,
    setSelectedId,
    selectMember,
    getListHref,
    setRole,
    setConnection,
    setSync,
    setMembership,
    lastSyncLabel,
    isRefreshing,
    refresh,
    uiError,
    setUiError,
    clearError: () => setUiError(null),
  };
}

export type DiscordDirectoryState = ReturnType<typeof useDiscordDirectory>;
