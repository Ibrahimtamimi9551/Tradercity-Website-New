"use client";

import { Suspense, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Gift } from "lucide-react";
import {
  AdminDirectoryPanel,
  AdminMasterDetail,
} from "@/components/admin/directory";
import { LoadingState, PageTitle, Pagination } from "@/components/admin/ui";
import { isAdminDesktop } from "@/lib/admin/directory/breakpoints";
import { useAnalystReferrals } from "@/lib/analysts/hooks/useAnalystReferrals";
import type {
  AnalystReferralOperation,
  AnalystReferralRecord,
} from "@/types/analysts/referrals";
import { ReferralDashboardView } from "./ReferralDashboardView";
import { ReferralDetails } from "./ReferralDetails";
import { ReferralDirectoryTable } from "./ReferralDirectoryTable";
import { ReferralFiltersBar } from "./ReferralFiltersBar";
import { ReferralPerformanceView } from "./ReferralPerformanceView";
import { ReferralsDomainNav } from "./ReferralsDomainNav";

const REFERRAL_DETAIL_WIDTH =
  "lg:grid-cols-[minmax(0,1fr)_min(36rem,42%)] xl:grid-cols-[minmax(0,1fr)_36rem]";

function ReferralsDomainContent() {
  const router = useRouter();
  const {
    view,
    setView,
    stats,
    performance,
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
    runOperation,
  } = useAnalystReferrals();

  const onSelectRecord = useCallback(
    (record: AnalystReferralRecord) => {
      if (!isAdminDesktop()) {
        router.push(`/admin/analysts/referrals/${record.id}`);
        return;
      }
      setSelectedId(record.id);
    },
    [router, setSelectedId]
  );

  const onOperation = useCallback(
    (record: AnalystReferralRecord, operation: AnalystReferralOperation) => {
      runOperation(record.id, operation);
    },
    [runOperation]
  );

  const header = (
    <div className="space-y-4 sm:space-y-5">
      <PageTitle
        title="Referrals"
        subtitle="Partnership growth — referral identity, performance, and conversion tracking."
        icon={Gift}
      />
      <ReferralsDomainNav active={view} onChange={setView} />
    </div>
  );

  if (view === "dashboard") {
    return (
      <div className="space-y-4 sm:space-y-6">
        {header}
        <ReferralDashboardView stats={stats} onOpenFocus={openDirectoryFocus} />
      </div>
    );
  }

  if (view === "performance") {
    return (
      <div className="space-y-4 sm:space-y-6">
        {header}
        <ReferralPerformanceView snapshot={performance} />
      </div>
    );
  }

  const isArchive = view === "archive";

  const listStack = (
    <div className="space-y-4 sm:space-y-6">
      {header}
      <ReferralFiltersBar
        filters={filters}
        hasActiveFilters={hasActiveFilters}
        onSearchChange={(search) => setFilters({ search })}
        onStatusChange={(status) => setFilters({ status })}
        onReset={resetFilters}
      />
      <AdminDirectoryPanel>
        <ReferralDirectoryTable
          rows={rows}
          selectedId={selectedId}
          onRowSelect={onSelectRecord}
          showArchiveReason={isArchive}
          emptyTitle={
            isArchive
              ? hasActiveFilters
                ? "No archived identities match your filters"
                : "No archived referral identities"
              : hasActiveFilters
                ? "No analysts match your search or filters"
                : "No referral identities — complete onboarding to activate"
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
      className={REFERRAL_DETAIL_WIDTH}
      list={listStack}
      detail={
        <ReferralDetails record={selectedRecord} onOperation={onOperation} />
      }
    />
  );
}

export function ReferralsDomainPage() {
  return (
    <Suspense fallback={<LoadingState label="Loading Analyst Referrals…" />}>
      <ReferralsDomainContent />
    </Suspense>
  );
}
