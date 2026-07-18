"use client";

import { useCallback, useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { RefreshCw } from "lucide-react";
import {
  AdminDirectoryPanel,
  AdminMasterDetail,
} from "@/components/admin/directory";
import {
  EmptyState,
  ErrorState,
  PageTitle,
  Pagination,
} from "@/components/admin/ui";
import { DiscordIcon } from "@/components/admin/ui/icons/DiscordIcon";
import { isAdminDesktop } from "@/lib/admin/directory/breakpoints";
import { cn } from "@/lib/admin/cn";
import type { DiscordMember } from "@/types/members/discord";
import { useDiscordDirectoryContext } from "./DiscordDirectoryProvider";
import { DiscordDetails } from "./DiscordDetails";
import { DiscordFiltersBar } from "./DiscordFiltersBar";
import type { DiscordRowActionHandlers } from "./DiscordRowActions";
import { DiscordTable } from "./DiscordTable";
import { DiscordWidgets } from "./DiscordWidgets";

function DiscordPageContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const deepLinkHandled = useRef(false);

  const {
    listPathname,
    stats,
    filters,
    resetFilters,
    showAdvanced,
    setShowAdvanced,
    hasActiveFilters,
    rows,
    total,
    page,
    pageSize,
    setPage,
    setPageSize,
    selectedId,
    selectedMember,
    selectMember,
    setFilters,
    setRole,
    setConnection,
    setSync,
    setMembership,
    lastSyncLabel,
    isRefreshing,
    refresh,
    uiError,
    clearError,
    getListHref,
    onManualSync,
    onSendInvite,
  } = useDiscordDirectoryContext();

  useEffect(() => {
    if (hasActiveFilters) setShowAdvanced(true);
  }, [hasActiveFilters, setShowAdvanced]);

  // Mobile deep-link only: explicit `?member=` / `?memberId=` → detail page.
  // Never navigate from inferred/default panel selection on initial list load.
  useEffect(() => {
    if (deepLinkHandled.current) return;
    if (pathname !== listPathname) return;
    if (isAdminDesktop()) return;

    const deepLinkMember =
      searchParams.get("member") ?? searchParams.get("memberId");
    if (!deepLinkMember) return;

    deepLinkHandled.current = true;
    const href = getListHref({ includeMember: false });
    const query = href.includes("?") ? href.slice(href.indexOf("?") + 1) : "";
    router.replace(
      query
        ? `${listPathname}/${deepLinkMember}?${query}`
        : `${listPathname}/${deepLinkMember}`
    );
  }, [getListHref, listPathname, pathname, router, searchParams]);

  const onSearchChange = useCallback(
    (search: string) => {
      setFilters({ search });
    },
    [setFilters]
  );

  const onSelectMember = useCallback(
    (member: DiscordMember) => {
      selectMember(member.id);
    },
    [selectMember]
  );

  const actionHandlers: DiscordRowActionHandlers = {
    onView: onSelectMember,
    onManualSync,
    onSendInvite,
  };

  const emptyTitle = hasActiveFilters
    ? "No members match your search or filters"
    : "No Discord members";

  const listStack = (
    <div className="space-y-4 sm:space-y-6">
      <PageTitle
        title="Discord"
        subtitle="Monitor and synchronize Discord server with TraderCity membership."
        icon={DiscordIcon}
        actions={
          <div className="flex items-center gap-2">
            <span className="hidden text-xs text-tc-muted sm:inline">
              Last Sync:{" "}
              <span className="text-white/80">{lastSyncLabel}</span>
            </span>
            <button
              type="button"
              onClick={refresh}
              disabled={isRefreshing}
              aria-label="Refresh Discord sync status"
              className="admin-ghost-btn inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition-colors hover:bg-white/5 disabled:opacity-50"
            >
              <RefreshCw
                className={cn("h-4 w-4", isRefreshing && "animate-spin")}
                aria-hidden
              />
            </button>
          </div>
        }
      />

      {uiError ? <ErrorState title={uiError} onRetry={clearError} /> : null}

      <DiscordWidgets stats={stats} />

      <DiscordFiltersBar
        filters={filters}
        hasActiveFilters={hasActiveFilters}
        showAdvanced={showAdvanced}
        onShowAdvancedChange={setShowAdvanced}
        onSearchChange={onSearchChange}
        onRoleChange={setRole}
        onConnectionChange={setConnection}
        onSyncChange={setSync}
        onMembershipChange={setMembership}
        onReset={resetFilters}
      />

      <AdminDirectoryPanel tone="purple">
        {total === 0 ? (
          <EmptyState
            title={emptyTitle}
            description={
              hasActiveFilters
                ? "Try clearing filters or adjusting your search."
                : "Discord members will appear here once accounts are linked."
            }
            action={
              hasActiveFilters ? (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-sm font-medium text-violet-300 hover:text-violet-200"
                >
                  Reset filters
                </button>
              ) : null
            }
          />
        ) : (
          <>
            <DiscordTable
              rows={rows}
              selectedId={selectedId}
              onRowSelect={onSelectMember}
              actionHandlers={actionHandlers}
              emptyTitle={emptyTitle}
            />
            <div className="px-1.5 sm:px-0">
              <Pagination
                page={page}
                pageSize={pageSize}
                total={total}
                onPageChange={setPage}
                onPageSizeChange={setPageSize}
                itemLabel="members"
                className="max-sm:gap-2 max-sm:text-xs"
              />
            </div>
          </>
        )}
      </AdminDirectoryPanel>
    </div>
  );

  return (
    <AdminMasterDetail
      layout="page"
      list={listStack}
      detail={
        <DiscordDetails
          member={selectedMember}
          onSyncNow={onManualSync}
          onSendInvite={onSendInvite}
          className="h-full"
        />
      }
    />
  );
}

export function DiscordPage() {
  return <DiscordPageContent />;
}
