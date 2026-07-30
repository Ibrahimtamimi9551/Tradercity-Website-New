"use client";

import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Mic2 } from "lucide-react";
import {
  AdminDirectoryPanel,
  AdminMasterDetail,
} from "@/components/admin/directory";
import { LoadingState, PageTitle, Pagination } from "@/components/admin/ui";
import { useAnalystsDirectory } from "@/lib/analysts/hooks/useAnalystsDirectory";
import type { DirectoryAnalyst } from "@/types/analysts/directory";
import { AnalystDirectoryDetails } from "./AnalystDirectoryDetails";
import { AnalystDirectoryFiltersBar } from "./AnalystDirectoryFiltersBar";
import { AnalystDirectoryWidgets } from "./AnalystDirectoryWidgets";
import { AnalystsTable } from "./AnalystsTable";

function AnalystsDirectoryContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const {
    stats,
    filters,
    setFilters,
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
    setStatus,
    setTier,
    setHealth,
  } = useAnalystsDirectory();

  const analystFromUrl = searchParams.get("analyst");
  const [selectedId, setSelectedId] = useState<string | null>(analystFromUrl);

  useEffect(() => {
    setSelectedId(analystFromUrl);
  }, [analystFromUrl]);

  const selectedAnalyst = useMemo(() => {
    if (selectedId) {
      const match = rows.find((a) => a.id === selectedId);
      if (match) return match;
    }
    return rows[0] ?? null;
  }, [rows, selectedId]);

  const writeAnalystParam = useCallback(
    (id: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (id) params.set("analyst", id);
      else params.delete("analyst");
      const query = params.toString();
      router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const onSelectAnalyst = useCallback(
    (analyst: DirectoryAnalyst) => {
      setSelectedId(analyst.id);
      writeAnalystParam(analyst.id);
    },
    [writeAnalystParam]
  );

  const listStack = (
    <div className="space-y-4 sm:space-y-6">
      <PageTitle
        title="Analysts"
        subtitle="View and manage TraderCity analyst partners and lifecycle status."
        icon={Mic2}
      />

      <AnalystDirectoryWidgets stats={stats} />

      <AnalystDirectoryFiltersBar
        filters={filters}
        hasActiveFilters={hasActiveFilters}
        showAdvanced={showAdvanced}
        onShowAdvancedChange={setShowAdvanced}
        onSearchChange={(search) => setFilters({ search })}
        onStatusChange={setStatus}
        onTierChange={setTier}
        onHealthChange={setHealth}
        onReset={resetFilters}
      />

      <AdminDirectoryPanel tone="purple">
        <AnalystsTable
          rows={rows}
          selectedId={selectedAnalyst?.id ?? null}
          onRowSelect={onSelectAnalyst}
        />
        <div className="px-1.5 sm:px-0">
          <Pagination
            page={page}
            pageSize={pageSize}
            total={total}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
            itemLabel="analysts"
            className="max-sm:gap-2 max-sm:text-xs"
          />
        </div>
      </AdminDirectoryPanel>
    </div>
  );

  return (
    <AdminMasterDetail
      layout="page"
      list={listStack}
      detail={
        <AnalystDirectoryDetails analyst={selectedAnalyst} className="h-full" />
      }
    />
  );
}

export function AnalystsDirectoryPage() {
  return (
    <Suspense fallback={<LoadingState label="Loading analysts directory…" />}>
      <AnalystsDirectoryContent />
    </Suspense>
  );
}
