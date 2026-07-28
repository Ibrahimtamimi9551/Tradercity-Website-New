"use client";

import { useCallback, useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CreditCard, RefreshCw } from "lucide-react";
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
import type { SubscriptionTicket } from "@/types/members/subscription";
import { useSubscriptionsDirectoryContext } from "./SubscriptionsDirectoryProvider";
import { SubscriptionDetails } from "./SubscriptionDetails";
import { SubscriptionFiltersBar } from "./SubscriptionFiltersBar";
import type { SubscriptionRowActionHandlers } from "./SubscriptionRowActions";
import { SubscriptionTable } from "./SubscriptionTable";
import { SubscriptionWidgets } from "./SubscriptionWidgets";

function SubscriptionsPageContent() {
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
    selectedTicket,
    selectTicket,
    setFilters,
    setStatus,
    setPlan,
    setNetwork,
    setVerification,
    lastRefreshLabel,
    isRefreshing,
    refresh,
    uiError,
    clearError,
    getListHref,
    onOpenExplorer,
    onApprove,
    onReject,
  } = useSubscriptionsDirectoryContext();

  useEffect(() => {
    if (hasActiveFilters) setShowAdvanced(true);
  }, [hasActiveFilters, setShowAdvanced]);

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

  const onSelectTicket = useCallback(
    (ticket: SubscriptionTicket) => {
      selectTicket(ticket.id);
    },
    [selectTicket]
  );

  const actionHandlers: SubscriptionRowActionHandlers = {
    onView: onSelectTicket,
    onOpenExplorer,
    onApprove,
    onReject,
  };

  const emptyTitle = hasActiveFilters
    ? "No tickets match your search or filters"
    : "No subscription tickets";

  const listStack = (
    <div className="space-y-4 sm:space-y-6">
      <PageTitle
        title="Subscriptions"
        subtitle="Payment verification, approval, and subscription tickets."
        icon={CreditCard}
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
              aria-label="Refresh subscription tickets"
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

      <SubscriptionWidgets stats={stats} />

      <SubscriptionFiltersBar
        filters={filters}
        hasActiveFilters={hasActiveFilters}
        showAdvanced={showAdvanced}
        onShowAdvancedChange={setShowAdvanced}
        onSearchChange={onSearchChange}
        onStatusChange={setStatus}
        onPlanChange={setPlan}
        onNetworkChange={setNetwork}
        onVerificationChange={setVerification}
        onReset={resetFilters}
      />

      <AdminDirectoryPanel tone="gold">
        {total === 0 ? (
          <EmptyState
            title={emptyTitle}
            description={
              hasActiveFilters
                ? "Try clearing filters or adjusting your search."
                : "Subscription payment tickets will appear here once members submit crypto payments."
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
            <SubscriptionTable
              rows={rows}
              selectedId={selectedId}
              onRowSelect={onSelectTicket}
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
                itemLabel="tickets"
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
        <SubscriptionDetails
          ticket={selectedTicket}
          onOpenExplorer={onOpenExplorer}
          onApprove={onApprove}
          onReject={onReject}
          className="h-full"
        />
      }
    />
  );
}

export function SubscriptionsPage() {
  return <SubscriptionsPageContent />;
}
