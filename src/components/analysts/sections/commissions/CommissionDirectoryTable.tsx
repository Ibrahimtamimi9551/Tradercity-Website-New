"use client";

import {
  DataTable,
  StatusBadge,
  type DataTableColumn,
} from "@/components/admin/ui";
import { cn } from "@/lib/admin/cn";
import {
  analystCommissionStatusPresentation,
  formatCommissionDateShort,
  formatCommissionUsd,
} from "@/lib/analysts/format-commissions";
import type { AnalystCommissionRecord } from "@/types/analysts/commissions";

const avatarToneStyles: Record<AnalystCommissionRecord["avatarTone"], string> =
  {
    discord: "admin-on-accent bg-[#5865F2] text-white",
    violet: "bg-violet-500/30 text-violet-200",
    emerald: "bg-emerald-500/30 text-emerald-200",
    amber: "bg-amber-500/30 text-amber-100",
    rose: "bg-rose-500/30 text-rose-200",
    sky: "bg-sky-500/30 text-sky-200",
  };

export function AnalystCommissionAvatar({
  record,
  size = "md",
}: {
  record: AnalystCommissionRecord;
  size?: "sm" | "md" | "lg";
}) {
  const initials = record.displayName.slice(0, 2).toUpperCase();
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full font-semibold",
        size === "sm" && "h-7 w-7 text-[10px]",
        size === "md" && "h-7 w-7 text-[10px] sm:h-9 sm:w-9 sm:text-xs",
        size === "lg" && "h-12 w-12 text-sm",
        avatarToneStyles[record.avatarTone]
      )}
      aria-hidden
    >
      {initials}
    </div>
  );
}

type CommissionDirectoryTableProps = {
  rows: AnalystCommissionRecord[];
  selectedId: string | null;
  onRowSelect: (row: AnalystCommissionRecord) => void;
  emptyTitle?: string;
};

export function CommissionDirectoryTable({
  rows,
  selectedId,
  onRowSelect,
  emptyTitle = "No commission records",
}: CommissionDirectoryTableProps) {
  const columns: DataTableColumn<AnalystCommissionRecord>[] = [
    {
      key: "analyst",
      header: "Analyst",
      className: "min-w-[11rem]",
      render: (row) => (
        <div className="flex items-center gap-2.5 sm:gap-3">
          <AnalystCommissionAvatar record={row} />
          <div className="min-w-0">
            <p className="truncate font-medium text-white">{row.displayName}</p>
            <p className="truncate text-[10px] text-tc-muted sm:text-xs">
              @{row.handle}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "business",
      header: "Monthly Business",
      render: (row) => (
        <span className="tabular-nums text-white">
          {formatCommissionUsd(row.tier.cumulativeBusinessUsd)}
        </span>
      ),
    },
    {
      key: "tier",
      header: "Current Tier",
      render: (row) => (
        <span className="tabular-nums text-white">
          {row.tier.analystSharePercent}%
        </span>
      ),
    },
    {
      key: "gross",
      header: "Gross Commission",
      render: (row) => (
        <span className="tabular-nums text-amber-100/90">
          {formatCommissionUsd(row.summary.currentCommissionUsd)}
        </span>
      ),
    },
    {
      key: "share",
      header: "Analyst Share",
      render: (row) => (
        <span className="tabular-nums text-white">
          {formatCommissionUsd(row.summary.amountPayableUsd)}
        </span>
      ),
    },
    {
      key: "due",
      header: "Due Amount",
      render: (row) => (
        <span
          className={cn(
            "tabular-nums",
            row.summary.dueAmountUsd > 0
              ? "text-rose-200"
              : "text-tc-muted"
          )}
        >
          {formatCommissionUsd(row.summary.dueAmountUsd)}
        </span>
      ),
    },
    {
      key: "lastPayment",
      header: "Last Payment",
      render: (row) => (
        <span className="text-tc-muted">
          {formatCommissionDateShort(row.summary.lastPayoutAt)}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row) => {
        const p = analystCommissionStatusPresentation(row.commissionStatus);
        return <StatusBadge label={p.label} tone={p.tone} />;
      },
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={rows}
      getRowKey={(row) => row.id}
      selectedKey={selectedId}
      onRowClick={onRowSelect}
      emptyTitle={emptyTitle}
      compactMobile
      className="border-white/10 bg-white/[0.015] max-sm:rounded-lg"
    />
  );
}
