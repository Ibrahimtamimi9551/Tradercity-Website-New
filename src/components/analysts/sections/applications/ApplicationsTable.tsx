"use client";

import { DataTable, StatusBadge, type DataTableColumn } from "@/components/admin/ui";
import { cn } from "@/lib/admin/cn";
import {
  applicationHandle,
  applicationStatusBadge,
  formatPrimaryMarkets,
  type AnalystApplication,
} from "@/types/analysts/applications";

const avatarToneStyles: Record<AnalystApplication["avatarTone"], string> = {
  discord: "bg-[#5865F2] text-white",
  violet: "bg-violet-500/30 text-violet-200",
  emerald: "bg-emerald-500/30 text-emerald-200",
  amber: "bg-amber-500/30 text-amber-100",
  rose: "bg-rose-500/30 text-rose-200",
  sky: "bg-sky-500/30 text-sky-200",
};

function formatAppliedDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function buildColumns(): DataTableColumn<AnalystApplication>[] {
  return [
    {
      key: "name",
      header: "Name",
      render: (row) => {
        const handle = applicationHandle(row);
        const initials = handle.slice(0, 2).toUpperCase();
        return (
          <div className="flex items-center gap-2 sm:gap-3">
            <div
              className={cn(
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold sm:h-9 sm:w-9 sm:text-xs",
                avatarToneStyles[row.avatarTone]
              )}
              aria-hidden
            >
              {initials}
            </div>
            <span className="min-w-0">
              <span className="block max-w-[9rem] truncate text-[11px] font-medium text-white sm:max-w-none sm:text-sm">
                {row.analystName}
              </span>
              <span className="block max-w-[9rem] truncate text-[10px] text-tc-muted sm:max-w-none sm:text-xs">
                @{handle}
              </span>
            </span>
          </div>
        );
      },
    },
    {
      key: "applied",
      header: "Applied",
      render: (row) => (
        <p className="whitespace-nowrap text-sm text-white/85">
          {formatAppliedDate(row.appliedAt)}
        </p>
      ),
    },
    {
      key: "markets",
      header: "Primary Market",
      render: (row) => (
        <p className="max-w-[10rem] truncate text-sm text-white/85 sm:max-w-[14rem]">
          {formatPrimaryMarkets(row.primaryMarkets)}
        </p>
      ),
    },
    {
      key: "experience",
      header: "Experience",
      render: (row) => (
        <p className="max-w-[9rem] truncate text-sm text-white/75 sm:max-w-[12rem]">
          {row.yearsOfExperience}
        </p>
      ),
    },
    {
      key: "score",
      header: "Overall Score",
      render: (row) =>
        row.overallScore === null ? (
          <span className="text-sm text-tc-muted">—</span>
        ) : (
          <span className="text-sm tabular-nums text-white/90">
            {row.overallScore}
            <span className="text-tc-muted"> / 100</span>
          </span>
        ),
    },
    {
      key: "status",
      header: "Status",
      render: (row) => {
        const badge = applicationStatusBadge(row.status);
        return <StatusBadge label={badge.label} tone={badge.tone} />;
      },
    },
  ];
}

const columns = buildColumns();

type ApplicationsTableProps = {
  rows: AnalystApplication[];
  selectedId: string | null;
  onRowSelect: (app: AnalystApplication) => void;
};

export function ApplicationsTable({
  rows,
  selectedId,
  onRowSelect,
}: ApplicationsTableProps) {
  return (
    <DataTable
      columns={columns}
      data={rows}
      getRowKey={(row) => row.id}
      selectedKey={selectedId}
      onRowClick={onRowSelect}
      emptyTitle="No applications match the current filters"
      compactMobile
      className="border-white/10 bg-white/[0.015] max-sm:rounded-lg"
    />
  );
}
