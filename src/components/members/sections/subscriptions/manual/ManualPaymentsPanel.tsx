"use client";

import { useCallback, useEffect } from "react";
import { Banknote, RefreshCw } from "lucide-react";
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
import type { ManualPayment } from "@/types/members/manual-payment";
import {
  confirmActivateManualPayment,
  confirmCancelManualPayment,
} from "./manual-payment-actions";
import { ManualPaymentDetails } from "./ManualPaymentDetails";
import { ManualPaymentFiltersBar } from "./ManualPaymentFiltersBar";
import { ManualPaymentForm } from "./ManualPaymentForm";
import type { ManualPaymentRowActionHandlers } from "./ManualPaymentRowActions";
import { ManualPaymentTable } from "./ManualPaymentTable";
import { ManualPaymentWidgets } from "./ManualPaymentWidgets";
import { useManualPaymentsDirectoryContext } from "./ManualPaymentsDirectoryProvider";
import { SubscriptionsSourceNav } from "../SubscriptionsSourceNav";

function ManualPaymentsPanelContent() {
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
    selectedPayment,
    selectPayment,
    setFilters,
    setStatus,
    setPlan,
    setPaymentMethod,
    lastRefreshLabel,
    isRefreshing,
    refresh,
    uiError,
    clearError,
    createOpen,
    setCreateOpen,
    createPayment,
    activatePayment,
    cancelPayment,
  } = useManualPaymentsDirectoryContext();

  useEffect(() => {
    if (hasActiveFilters) setShowAdvanced(true);
  }, [hasActiveFilters, setShowAdvanced]);

  const onSearchChange = useCallback(
    (search: string) => {
      setFilters({ search });
    },
    [setFilters]
  );

  const onSelectPayment = useCallback(
    (payment: ManualPayment) => {
      selectPayment(payment.id);
    },
    [selectPayment]
  );

  const onActivate = useCallback(
    (payment: ManualPayment) => {
      if (!confirmActivateManualPayment(payment)) return;
      activatePayment(payment);
    },
    [activatePayment]
  );

  const onCancel = useCallback(
    (payment: ManualPayment) => {
      if (!confirmCancelManualPayment(payment)) return;
      cancelPayment(payment);
    },
    [cancelPayment]
  );

  const actionHandlers: ManualPaymentRowActionHandlers = {
    onView: onSelectPayment,
    onActivate,
    onCancel,
  };

  const emptyTitle = hasActiveFilters
    ? "No payments match your search or filters"
    : "No manual payments";

  const listStack = (
    <div className="space-y-4 sm:space-y-6">
      <PageTitle
        title="Subscriptions"
        subtitle="Manual payment recording and membership activation."
        icon={Banknote}
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
              aria-label="Refresh manual payments"
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

      <ManualPaymentWidgets stats={stats} />

      <ManualPaymentFiltersBar
        filters={filters}
        hasActiveFilters={hasActiveFilters}
        showAdvanced={showAdvanced}
        onShowAdvancedChange={setShowAdvanced}
        onSearchChange={onSearchChange}
        onStatusChange={setStatus}
        onPlanChange={setPlan}
        onMethodChange={setPaymentMethod}
        onDateFromChange={(dateFrom) => setFilters({ dateFrom })}
        onDateToChange={(dateTo) => setFilters({ dateTo })}
        onReset={resetFilters}
        onCreate={() => setCreateOpen(true)}
      />

      <AdminDirectoryPanel tone="gold">
        {total === 0 ? (
          <EmptyState
            title={emptyTitle}
            description={
              hasActiveFilters
                ? "Try clearing filters or adjusting your search."
                : "Create a manual payment when bank, UPI, cash, or assisted payments are confirmed."
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
              ) : (
                <button
                  type="button"
                  onClick={() => setCreateOpen(true)}
                  className="text-sm font-medium text-amber-200 hover:text-amber-100"
                >
                  Create Manual Payment
                </button>
              )
            }
          />
        ) : (
          <>
            <ManualPaymentTable
              rows={rows}
              selectedId={selectedId}
              onRowSelect={onSelectPayment}
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
                itemLabel="payments"
                className="max-sm:gap-2 max-sm:text-xs"
              />
            </div>
          </>
        )}
      </AdminDirectoryPanel>

      <ManualPaymentForm
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onSubmit={(input) => {
          createPayment(input);
        }}
      />
    </div>
  );

  return (
    <AdminMasterDetail
      layout="page"
      list={listStack}
      detail={
        <ManualPaymentDetails
          payment={selectedPayment}
          onActivate={onActivate}
          onCancel={onCancel}
          className="h-full"
        />
      }
    />
  );
}

export function ManualPaymentsPanel() {
  return <ManualPaymentsPanelContent />;
}
