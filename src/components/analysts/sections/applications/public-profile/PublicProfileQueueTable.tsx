"use client";

import { DataTable, StatusBadge, type DataTableColumn } from "@/components/admin/ui";
import { cn } from "@/lib/admin/cn";
import {
  displayNameInitials,
  publicProfileStatusBadge,
  type PublicAnalystProfile,
} from "@/types/analysts/public-profile";

const avatarToneStyles: Record<PublicAnalystProfile["avatarTone"], string> = {
  discord: "bg-[#5865F2] text-white",
  violet: "bg-violet-500/30 text-violet-200",
  emerald: "bg-emerald-500/30 text-emerald-200",
  amber: "bg-amber-500/30 text-amber-100",
  rose: "bg-rose-500/30 text-rose-200",
  sky: "bg-sky-500/30 text-sky-200",
};

function buildColumns(): DataTableColumn<PublicAnalystProfile>[] {
  return [
    {
      key: "analyst",
      header: "Analyst",
      render: (row) => {
        const initials = displayNameInitials(row.displayName);
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
              <span className="block max-w-[10rem] truncate text-[11px] font-medium text-white sm:max-w-none sm:text-sm">
                {row.displayName}
              </span>
              <span className="block max-w-[10rem] truncate text-[10px] text-tc-muted sm:max-w-none sm:text-xs">
                {row.analystTitle || row.analystId}
              </span>
            </span>
          </div>
        );
      },
    },
    {
      key: "status",
      header: "Profile Status",
      render: (row) => {
        const badge = publicProfileStatusBadge(row.status);
        return <StatusBadge label={badge.label} tone={badge.tone} />;
      },
    },
    {
      key: "visibility",
      header: "Homepage",
      className: "hidden md:table-cell",
      render: (row) => (
        <p className="text-sm text-white/80">
          {row.publicVisibility ? (row.featured ? "Featured" : "Visible") : "Hidden"}
          {!row.active ? (
            <span className="mt-0.5 block text-[11px] text-amber-200/80">
              Directory not active
            </span>
          ) : null}
        </p>
      ),
    },
    {
      key: "order",
      header: "Order",
      className: "hidden sm:table-cell",
      render: (row) => (
        <p className="whitespace-nowrap text-sm text-white/85">{row.displayOrder}</p>
      ),
    },
  ];
}

type PublicProfileQueueTableProps = {
  rows: PublicAnalystProfile[];
  selectedApplicationId: string | null;
  onRowSelect: (row: PublicAnalystProfile) => void;
};

export function PublicProfileQueueTable({
  rows,
  selectedApplicationId,
  onRowSelect,
}: PublicProfileQueueTableProps) {
  return (
    <DataTable
      columns={buildColumns()}
      data={rows}
      getRowKey={(row) => row.applicationId}
      selectedKey={selectedApplicationId}
      onRowClick={onRowSelect}
      emptyTitle="No public profiles yet — approve an application to generate a draft"
      compactMobile
      className="border-white/10 bg-white/[0.015] max-sm:rounded-lg"
    />
  );
}
