"use client";

import { useCallback, useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Gift, RefreshCw } from "lucide-react";
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
import { isAdminDesktop } from "@/lib/admin/directory/breakpoints";
import { cn } from "@/lib/admin/cn";
import type { ReferralMember } from "@/types/members/referral";
import { ReferralDetails } from "./ReferralDetails";
import { ReferralFiltersBar } from "./ReferralFiltersBar";
import { ReferralModuleNav } from "./ReferralModuleNav";
import type { ReferralRowActionHandlers } from "./ReferralRowActions";
import { ReferralTable } from "./ReferralTable";
import { ReferralWidgets } from "./ReferralWidgets";
import { useReferralsDirectoryContext } from "./ReferralsDirectoryProvider";

function ReferralsPageContent() {
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
    setMembershipPlan,
    setProgress,
    setCredit,
    sort,
    setSort,
    lastSyncLabel,
    isRefreshing,
    refresh,
    uiError,
    clearError,
    getListHref,
    onCopyReferralLink,
    onCopyReferralCode,
  } = useReferralsDirectoryContext();

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
    (member: ReferralMember) => {
      selectMember(member.id);
    },
    [selectMember]
  );

  const actionHandlers: ReferralRowActionHandlers = {
    onCopyReferralLink,
    onCopyReferralCode,
  };

  const emptyTitle = hasActiveFilters
    ? "No members match your search or filters"
    : "No referral members";

  const listStack = (
    <div className="space-y-4 sm:space-y-6">
      <PageTitle
        title="Referral Operations"
        subtitle="Track, manage and monitor referral activity, wallet credits and member progress."
        icon={Gift}
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
              aria-label="Refresh referral data"
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

      <ReferralModuleNav />

      {uiError ? <ErrorState title={uiError} onRetry={clearError} /> : null}

      <ReferralWidgets stats={stats} />

      <ReferralFiltersBar
        filters={filters}
        hasActiveFilters={hasActiveFilters}
        showAdvanced={showAdvanced}
        onShowAdvancedChange={setShowAdvanced}
        onSearchChange={onSearchChange}
        onMembershipPlanChange={setMembershipPlan}
        onProgressChange={setProgress}
        onCreditChange={setCredit}
        onReset={resetFilters}
      />

      <AdminDirectoryPanel tone="purple">
        {total === 0 ? (
          <EmptyState
            title={emptyTitle}
            description={
              hasActiveFilters
                ? "Try clearing filters or adjusting your search."
                : "Referral members will appear here once referral tracking is active."
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
            <ReferralTable
              rows={rows}
              selectedId={selectedId}
              onRowSelect={onSelectMember}
              actionHandlers={actionHandlers}
              sort={sort}
              onSortChange={setSort}
              emptyTitle={emptyTitle}
            />
            <div className="px-1.5 sm:px-0">
              <Pagination
                page={page}
                pageSize={pageSize}
                total={total}
                onPageChange={setPage}
                onPageSizeChange={setPageSize}
                itemLabel="entries"
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
      detail={<ReferralDetails member={selectedMember} className="h-full" />}
    />
  );
}

export function ReferralsPage() {
  return <ReferralsPageContent />;
}
