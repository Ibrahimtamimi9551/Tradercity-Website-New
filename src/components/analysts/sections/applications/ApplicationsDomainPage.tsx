"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ClipboardList } from "lucide-react";
import {
  AdminDirectoryPanel,
  AdminMasterDetail,
} from "@/components/admin/directory";
import { LoadingState, PageTitle, Pagination } from "@/components/admin/ui";
import { isAdminDesktop } from "@/lib/admin/directory/breakpoints";
import {
  parseApplicationViewerTab,
  useAnalystApplications,
} from "@/lib/analysts/hooks/useAnalystApplications";
import type {
  AnalystApplication,
  ApplicationViewerTabId,
} from "@/types/analysts/applications";
import { ApplicationDashboardView } from "./ApplicationDashboardView";
import { ApplicationQueueFiltersBar } from "./ApplicationQueueFiltersBar";
import { ApplicationViewer } from "./ApplicationViewer";
import { ApplicationsDomainNav } from "./ApplicationsDomainNav";
import { ApplicationsTable } from "./ApplicationsTable";

/** Wider than Directory Inspector — application forms need more review room. */
const APPLICATIONS_DETAIL_WIDTH =
  "lg:grid-cols-[minmax(0,1fr)_min(40rem,46%)] xl:grid-cols-[minmax(0,1fr)_40rem]";

function ApplicationsDomainContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const {
    view,
    setView,
    stats,
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
    selectedApplication,
    openQueueWithStatus,
    updateCategoryEvaluation,
    updateVerification,
    updateNotes,
    applyDecision,
    threshold,
  } = useAnalystApplications();

  const [viewerTab, setViewerTab] = useState<ApplicationViewerTabId>(() =>
    parseApplicationViewerTab(searchParams.get("tab"))
  );

  useEffect(() => {
    setViewerTab(parseApplicationViewerTab(searchParams.get("tab")));
  }, [searchParams]);

  const writeTab = useCallback(
    (tab: ApplicationViewerTabId) => {
      setViewerTab(tab);
      const params = new URLSearchParams(searchParams.toString());
      if (tab === "application") params.delete("tab");
      else params.set("tab", tab);
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const onSelectApplication = useCallback(
    (app: AnalystApplication) => {
      if (!isAdminDesktop()) {
        const params = new URLSearchParams();
        if (viewerTab !== "application") params.set("tab", viewerTab);
        const query = params.toString();
        router.push(
          query
            ? `/admin/analysts/applications/${app.id}?${query}`
            : `/admin/analysts/applications/${app.id}`
        );
        return;
      }
      setSelectedId(app.id);
    },
    [router, setSelectedId, viewerTab]
  );

  const header = (
    <div className="space-y-4 sm:space-y-5">
      <PageTitle
        title="Applications"
        subtitle="Partnership intake — application, verification, and evaluation in one operational domain."
        icon={ClipboardList}
      />
      <ApplicationsDomainNav active={view} onChange={setView} />
    </div>
  );

  if (view === "dashboard") {
    return (
      <div className="space-y-4 sm:space-y-6">
        {header}
        <ApplicationDashboardView stats={stats} onOpenStatus={openQueueWithStatus} />
      </div>
    );
  }

  const listStack = (
    <div className="space-y-4 sm:space-y-6">
      {header}
      {view === "archive" ? (
        <p className="text-sm text-tc-muted">
          Historical applications retained for operational reference.
        </p>
      ) : (
        <p className="text-sm text-tc-muted">
          Review Queue — Application → Verification → Evaluation → Decision without leaving this
          workflow.
        </p>
      )}
      <ApplicationQueueFiltersBar
        filters={filters}
        hasActiveFilters={hasActiveFilters}
        onSearchChange={(search) => setFilters({ search })}
        onStatusChange={(status) => setFilters({ status })}
        onReset={resetFilters}
      />
      <AdminDirectoryPanel tone="purple">
        <ApplicationsTable
          rows={rows}
          selectedId={selectedId}
          onRowSelect={onSelectApplication}
        />
        <div className="px-1.5 sm:px-0">
          <Pagination
            page={page}
            pageSize={pageSize}
            total={total}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
            itemLabel="applications"
            className="max-sm:gap-2 max-sm:text-xs"
          />
        </div>
      </AdminDirectoryPanel>
    </div>
  );

  return (
    <AdminMasterDetail
      layout="page"
      className={APPLICATIONS_DETAIL_WIDTH}
      list={listStack}
      detail={
        <ApplicationViewer
          application={selectedApplication}
          activeTab={viewerTab}
          onTabChange={writeTab}
          threshold={threshold}
          onUpdateCategory={(categoryId, patch) => {
            if (!selectedApplication) return;
            updateCategoryEvaluation(selectedApplication.id, categoryId, patch);
          }}
          onUpdateVerification={(patch) => {
            if (!selectedApplication) return;
            updateVerification(selectedApplication.id, patch);
          }}
          onUpdateNotes={(patch) => {
            if (!selectedApplication) return;
            updateNotes(selectedApplication.id, patch);
          }}
          onDecision={(action) => {
            if (!selectedApplication) return;
            applyDecision(selectedApplication.id, action);
          }}
          className="h-full"
        />
      }
    />
  );
}

export function ApplicationsDomainPage() {
  return (
    <Suspense fallback={<LoadingState label="Loading applications…" />}>
      <ApplicationsDomainContent />
    </Suspense>
  );
}
