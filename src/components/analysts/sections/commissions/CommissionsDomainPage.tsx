"use client";

import { Suspense, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Coins } from "lucide-react";
import {
  AdminDirectoryPanel,
  AdminMasterDetail,
} from "@/components/admin/directory";
import { LoadingState, PageTitle, Pagination } from "@/components/admin/ui";
import { isAdminDesktop } from "@/lib/admin/directory/breakpoints";
import { useAnalystCommissions } from "@/lib/analysts/hooks/useAnalystCommissions";
import type {
  AnalystCommissionCompletePayoutInput,
  AnalystCommissionOperation,
  AnalystCommissionRecord,
} from "@/types/analysts/commissions";
import { CommissionDashboardView } from "./CommissionDashboardView";
import { CommissionDetails } from "./CommissionDetails";
import { CommissionDirectoryTable } from "./CommissionDirectoryTable";
import { CommissionFiltersBar } from "./CommissionFiltersBar";
import { CommissionHistoryView } from "./CommissionHistoryView";
import { CommissionPayoutsView } from "./CommissionPayoutsView";
import { CommissionsDomainNav } from "./CommissionsDomainNav";

const COMMISSION_DETAIL_WIDTH =
  "lg:grid-cols-[minmax(0,1fr)_min(28rem,36%)] xl:grid-cols-[minmax(0,1fr)_28rem]";

function CommissionsDomainContent() {
  const router = useRouter();
  const {
    view,
    setView,
    stats,
    payoutQueue,
    payoutHistory,
    allRows,
    filters,
    setFilters,
    resetFilters,
    hasActiveFilters,
    rows,
    total,
    page,
    pageSize,
    setPage,
    setPageSize,
    selectedId,
    setSelectedId,
    selectedRecord,
    openDirectoryFocus,
    openDirectoryRecord,
    openWorkspace,
    clearWorkspace,
    runOperation,
  } = useAnalystCommissions();

  const onSelectRecord = useCallback(
    (record: AnalystCommissionRecord) => {
      if (!isAdminDesktop()) {
        router.push(`/admin/analysts/commissions/${record.id}`);
        return;
      }
      setSelectedId(record.id);
    },
    [router, setSelectedId]
  );

  const onOperation = useCallback(
    (
      record: AnalystCommissionRecord,
      operation: AnalystCommissionOperation,
      input?: AnalystCommissionCompletePayoutInput
    ) => {
      runOperation(record.id, operation, input);
    },
    [runOperation]
  );

  const header = (
    <div className="space-y-4 sm:space-y-5">
      <PageTitle
        title="Commission"
        subtitle="Financial operations — earnings, payout lifecycle, and settlement audit."
        icon={Coins}
      />
      <CommissionsDomainNav active={view} onChange={setView} />
    </div>
  );

  if (view === "dashboard") {
    return (
      <div className="space-y-4 sm:space-y-6">
        {header}
        <CommissionDashboardView
          stats={stats}
          allRows={allRows}
          selectedRecord={selectedRecord}
          onOpenFocus={openDirectoryFocus}
          onOpenPayouts={() => setView("payouts")}
          onOpenWorkspace={openWorkspace}
          onClearWorkspace={clearWorkspace}
          onOperation={onOperation}
        />
      </div>
    );
  }

  if (view === "payouts") {
    return (
      <div className="space-y-4 sm:space-y-6">
        {header}
        <CommissionPayoutsView
          queue={payoutQueue}
          allRows={allRows}
          onOperation={runOperation}
          onOpenWorkspace={openWorkspace}
        />
      </div>
    );
  }

  if (view === "history") {
    return (
      <div className="space-y-4 sm:space-y-6">
        {header}
        <CommissionHistoryView
          rows={payoutHistory}
          onOpenProfile={(id) => {
            if (!isAdminDesktop()) {
              router.push(`/admin/analysts/commissions/${id}`);
              return;
            }
            openDirectoryRecord(id);
          }}
        />
      </div>
    );
  }

  const listStack = (
    <div className="space-y-4 sm:space-y-6">
      {header}
      <CommissionFiltersBar
        filters={filters}
        hasActiveFilters={hasActiveFilters}
        onSearchChange={(search) => setFilters({ search })}
        onStatusChange={(status) => setFilters({ status })}
        onReset={resetFilters}
      />
      <AdminDirectoryPanel>
        <CommissionDirectoryTable
          rows={rows}
          selectedId={selectedId}
          onRowSelect={onSelectRecord}
          emptyTitle={
            hasActiveFilters
              ? "No analysts match your search or filters"
              : "No commission identities yet"
          }
        />
      </AdminDirectoryPanel>
      <Pagination
        page={page}
        pageSize={pageSize}
        total={total}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />
    </div>
  );

  return (
    <AdminMasterDetail
      layout="page"
      className={COMMISSION_DETAIL_WIDTH}
      list={listStack}
      detail={
        <CommissionDetails
          record={selectedRecord}
          onOpenWorkspace={openWorkspace}
        />
      }
    />
  );
}

export function CommissionsDomainPage() {
  return (
    <Suspense fallback={<LoadingState label="Loading Analyst Commission…" />}>
      <CommissionsDomainContent />
    </Suspense>
  );
}
