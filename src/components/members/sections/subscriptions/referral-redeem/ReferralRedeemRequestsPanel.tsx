"use client";

import { useCallback, useEffect } from "react";
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
import { cn } from "@/lib/admin/cn";
import type { ReferralMember } from "@/types/members/referral";
import { ReferralTable } from "@/components/members/sections/referrals/ReferralTable";
import { SubscriptionsSourceNav } from "../SubscriptionsSourceNav";
import {
  confirmApproveRedeem,
  confirmRejectRedeem,
} from "./referral-redeem-actions";
import { ReferralRedeemFiltersBar } from "./ReferralRedeemFiltersBar";
import { ReferralRedeemRequestDetails } from "./ReferralRedeemRequestDetails";
import { useReferralRedeemRequestsDirectoryContext } from "./ReferralRedeemRequestsDirectoryProvider";
import { ReferralRedeemWidgets } from "./ReferralRedeemWidgets";

function ReferralRedeemRequestsPanelContent() {
  const {
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
    setCredit,
    setStatus,
    sort,
    setSort,
    lastRefreshLabel,
    isRefreshing,
    refresh,
    uiError,
    clearError,
    approveRedeem,
    rejectRedeem,
  } = useReferralRedeemRequestsDirectoryContext();

  useEffect(() => {
    if (hasActiveFilters) setShowAdvanced(true);
  }, [hasActiveFilters, setShowAdvanced]);

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

  const onApprove = useCallback(
    (member: ReferralMember) => {
      if (!confirmApproveRedeem(member)) return;
      approveRedeem(member);
    },
    [approveRedeem]
  );

  const onReject = useCallback(
    (member: ReferralMember) => {
      if (!confirmRejectRedeem(member)) return;
      rejectRedeem(member);
    },
    [rejectRedeem]
  );

  const emptyTitle = hasActiveFilters
    ? "No redeem requests match your search or filters"
    : "No referral redeem requests waiting";

  const listStack = (
    <div className="space-y-4 sm:space-y-6">
      <PageTitle
        title="Subscriptions"
        subtitle="Referral credit redemption — membership activation source."
        icon={Gift}
        actions={
          <div className="flex items-center gap-2">
            <span className="hidden text-xs text-tc-muted sm:inline">
              Last Refresh:{" "}
              <span className="text-white/80">{lastRefreshLabel}</span>
            </span>
            <button
              type="button"
              onClick={refresh}
              disabled={isRefreshing}
              aria-label="Refresh referral redeem requests"
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

      <SubscriptionsSourceNav />

      {uiError ? <ErrorState title={uiError} onRetry={clearError} /> : null}

      <ReferralRedeemWidgets stats={stats} />

      <ReferralRedeemFiltersBar
        filters={filters}
        hasActiveFilters={hasActiveFilters}
        showAdvanced={showAdvanced}
        onShowAdvancedChange={setShowAdvanced}
        onSearchChange={onSearchChange}
        onStatusChange={setStatus}
        onMembershipPlanChange={setMembershipPlan}
        onCreditChange={setCredit}
        onReset={resetFilters}
      />

      <AdminDirectoryPanel tone="gold">
        {total === 0 ? (
          <EmptyState
            title={emptyTitle}
            description={
              hasActiveFilters
                ? "Try clearing filters or adjusting your search."
                : "When members submit referral credit redemption requests, they appear here for activation approval."
            }
            action={
              hasActiveFilters ? (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-sm font-medium text-amber-200 hover:text-amber-100"
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
                itemLabel="requests"
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
        <ReferralRedeemRequestDetails
          member={selectedMember}
          onApprove={onApprove}
          onReject={onReject}
          className="h-full"
        />
      }
    />
  );
}

export function ReferralRedeemRequestsPanel() {
  return <ReferralRedeemRequestsPanelContent />;
}
