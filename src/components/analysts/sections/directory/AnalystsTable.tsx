"use client";

import Link from "next/link";
import {
  DataTable,
  StatusBadge,
  SystemHealthBadge,
  type DataTableColumn,
} from "@/components/admin/ui";
import { cn } from "@/lib/admin/cn";
import {
  analystStatusBadge,
  analystTierBadge,
  formatPartneredDate,
  formatReach,
} from "@/lib/analysts/format-control-center";
import type { DirectoryAnalyst } from "@/types/analysts/directory";
import { AnalystRowActions } from "./AnalystRowActions";

const avatarToneStyles: Record<DirectoryAnalyst["avatarTone"], string> = {
  discord: "bg-[#5865F2] text-white",
  violet: "bg-violet-500/30 text-violet-200",
  emerald: "bg-emerald-500/30 text-emerald-200",
  amber: "bg-amber-500/30 text-amber-100",
  rose: "bg-rose-500/30 text-rose-200",
  sky: "bg-sky-500/30 text-sky-200",
};

function AnalystAvatar({ analyst }: { analyst: DirectoryAnalyst }) {
  const initials = analyst.handle.slice(0, 2).toUpperCase();
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full font-semibold",
        "h-7 w-7 text-[10px] sm:h-9 sm:w-9 sm:text-xs",
        avatarToneStyles[analyst.avatarTone]
      )}
      aria-hidden
    >
      {initials}
    </div>
  );
}

function buildColumns(): DataTableColumn<DirectoryAnalyst>[] {
  return [
    {
      key: "identity",
      header: "Analyst",
      render: (row) => (
        <Link
          href={`/admin/analysts/${row.id}`}
          className="flex items-center gap-2 sm:gap-3"
          onClick={(e) => e.stopPropagation()}
        >
          <AnalystAvatar analyst={row} />
          <span className="min-w-0">
            <span className="block max-w-[8rem] truncate text-[11px] font-medium text-violet-300 hover:text-violet-200 sm:max-w-none sm:text-sm">
              {row.displayName}
            </span>
            <span className="block max-w-[8rem] truncate text-[10px] text-tc-muted sm:max-w-none sm:text-xs">
              @{row.handle}
            </span>
          </span>
        </Link>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row) => {
        const badge = analystStatusBadge(row.status);
        return <StatusBadge label={badge.label} tone={badge.tone} />;
      },
    },
    {
      key: "tier",
      header: "Tier",
      render: (row) => {
        const badge = analystTierBadge(row.tier);
        if (!badge) return <span className="text-sm text-tc-muted">—</span>;
        return <StatusBadge label={badge.label} tone={badge.tone} dot={false} />;
      },
    },
    {
      key: "reach",
      header: "Reach",
      render: (row) => (
        <div className="min-w-[5rem]">
          <p className="text-sm tabular-nums text-white/85">
            {formatReach(row.reachFollowers)}
          </p>
          <p className="max-w-[8rem] truncate text-[10px] text-tc-muted sm:text-xs">
            {row.specialization}
          </p>
        </div>
      ),
    },
    {
      key: "partnered",
      header: "Partnered",
      render: (row) => (
        <p className="whitespace-nowrap text-sm text-white/85">
          {formatPartneredDate(row.partneredAt)}
        </p>
      ),
    },
    {
      key: "health",
      header: "Health",
      render: (row) => <SystemHealthBadge state={row.systemHealth} />,
    },
    {
      key: "actions",
      header: "Actions",
      className: "w-12",
      render: (row) => <AnalystRowActions analyst={row} />,
    },
  ];
}

const columns = buildColumns();

type AnalystsTableProps = {
  rows: DirectoryAnalyst[];
  selectedId?: string | null;
  onRowSelect: (analyst: DirectoryAnalyst) => void;
};

export function AnalystsTable({
  rows,
  selectedId = null,
  onRowSelect,
}: AnalystsTableProps) {
  return (
    <DataTable
      columns={columns}
      data={rows}
      getRowKey={(row) => row.id}
      selectedKey={selectedId}
      onRowClick={onRowSelect}
      emptyTitle="No analysts match the current filters"
      compactMobile
      className="border-white/10 bg-white/[0.015] max-sm:rounded-lg"
    />
  );
}
