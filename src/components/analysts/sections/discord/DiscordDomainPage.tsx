"use client";

import { Suspense, useCallback } from "react";
import { useRouter } from "next/navigation";
import { MessageSquare } from "lucide-react";
import {
  AdminDirectoryPanel,
  AdminMasterDetail,
} from "@/components/admin/directory";
import { LoadingState, PageTitle, Pagination } from "@/components/admin/ui";
import { isAdminDesktop } from "@/lib/admin/directory/breakpoints";
import { useAnalystDiscord } from "@/lib/analysts/hooks/useAnalystDiscord";
import type {
  AnalystDiscordOperation,
  AnalystDiscordRecord,
} from "@/types/analysts/discord";
import { DiscordDashboardView } from "./DiscordDashboardView";
import { DiscordDetails } from "./DiscordDetails";
import { DiscordDirectoryTable } from "./DiscordDirectoryTable";
import { DiscordDomainNav } from "./DiscordDomainNav";
import { DiscordFiltersBar } from "./DiscordFiltersBar";
import { DiscordOperationsView } from "./DiscordOperationsView";

const DISCORD_DETAIL_WIDTH =
  "lg:grid-cols-[minmax(0,1fr)_min(36rem,42%)] xl:grid-cols-[minmax(0,1fr)_36rem]";

function DiscordDomainContent() {
  const router = useRouter();
  const {
    view,
    setView,
    stats,
    filters,
    setFilters,
    resetFilters,
    hasActiveFilters,
    rows,
    allRows,
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
  } = useAnalystDiscord();

  const onSelectRecord = useCallback(
    (record: AnalystDiscordRecord) => {
      if (!isAdminDesktop()) {
        router.push(`/admin/analysts/discord/${record.id}`);
        return;
      }
      setSelectedId(record.id);
    },
    [router, setSelectedId]
  );

  const onOperation = useCallback(
    (record: AnalystDiscordRecord, operation: AnalystDiscordOperation) => {
      runOperation(record.id, operation);
    },
    [runOperation]
  );

  const header = (
    <div className="space-y-4 sm:space-y-5">
      <PageTitle
        title="Discord"
        subtitle="Analyst Discord lifecycle — invite, connect, sync, and assign the Analyst role."
        icon={MessageSquare}
      />
      <DiscordDomainNav active={view} onChange={setView} />
    </div>
  );

  if (view === "dashboard") {
    return (
      <div className="space-y-4 sm:space-y-6">
        {header}
        <DiscordDashboardView stats={stats} onOpenFocus={openDirectoryFocus} />
      </div>
    );
  }

  if (view === "operations") {
    return (
      <div className="space-y-4 sm:space-y-6">
        {header}
        <DiscordOperationsView
          records={allRows}
          selected={selectedRecord}
          onSelect={(record) => setSelectedId(record.id)}
          onOperation={onOperation}
        />
      </div>
    );
  }

  const listStack = (
    <div className="space-y-4 sm:space-y-6">
      {header}
      <DiscordFiltersBar
        filters={filters}
        hasActiveFilters={hasActiveFilters}
        onSearchChange={(search) => setFilters({ search })}
        onStatusChange={(status) => setFilters({ status })}
        onRoleChange={(role) => setFilters({ role })}
        onSyncChange={(sync) => setFilters({ sync })}
        onReset={resetFilters}
      />
      <AdminDirectoryPanel>
        <DiscordDirectoryTable
          rows={rows}
          selectedId={selectedId}
          onRowSelect={onSelectRecord}
          emptyTitle={
            hasActiveFilters
              ? "No analysts match your search or filters"
              : "No Discord records — approve an application to activate a partner"
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
      className={DISCORD_DETAIL_WIDTH}
      list={listStack}
      detail={
        <DiscordDetails record={selectedRecord} onOperation={onOperation} />
      }
    />
  );
}

export function DiscordDomainPage() {
  return (
    <Suspense fallback={<LoadingState label="Loading Analyst Discord…" />}>
      <DiscordDomainContent />
    </Suspense>
  );
}
