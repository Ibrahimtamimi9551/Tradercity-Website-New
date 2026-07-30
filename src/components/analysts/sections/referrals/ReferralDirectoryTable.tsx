"use client";

import {
  DataTable,
  StatusBadge,
  type DataTableColumn,
} from "@/components/admin/ui";
import { cn } from "@/lib/admin/cn";
import {
  analystReferralStatusPresentation,
  formatShortReferralLink,
} from "@/lib/analysts/format-referrals";
import type { AnalystReferralRecord } from "@/types/analysts/referrals";

const avatarToneStyles: Record<AnalystReferralRecord["avatarTone"], string> = {
  discord: "admin-on-accent bg-[#5865F2] text-white",
  violet: "bg-violet-500/30 text-violet-200",
  emerald: "bg-emerald-500/30 text-emerald-200",
  amber: "bg-amber-500/30 text-amber-100",
  rose: "bg-rose-500/30 text-rose-200",
  sky: "bg-sky-500/30 text-sky-200",
};

export function AnalystReferralAvatar({
  record,
  size = "md",
}: {
  record: AnalystReferralRecord;
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

type ReferralDirectoryTableProps = {
  rows: AnalystReferralRecord[];
  selectedId: string | null;
  onRowSelect: (row: AnalystReferralRecord) => void;
  emptyTitle?: string;
  showArchiveReason?: boolean;
};

export function ReferralDirectoryTable({
  rows,
  selectedId,
  onRowSelect,
  emptyTitle = "No referral identities",
  showArchiveReason = false,
}: ReferralDirectoryTableProps) {
  const columns: DataTableColumn<AnalystReferralRecord>[] = [
    {
      key: "analyst",
      header: "Analyst",
      className: "min-w-[11rem]",
      render: (row) => (
        <div className="flex items-center gap-2.5 sm:gap-3">
          <AnalystReferralAvatar record={row} />
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
      key: "code",
      header: "Referral Code",
      className: "min-w-[9rem]",
      render: (row) => (
        <div className="min-w-0 space-y-0.5">
          <p className="font-mono text-xs font-medium text-white sm:text-sm">
            {row.referralCode}
          </p>
          <p className="truncate font-mono text-[10px] text-tc-muted sm:text-xs">
            {formatShortReferralLink(row.referralToken)}
          </p>
        </div>
      ),
    },
    {
      key: "status",
      header: "Referral Status",
      render: (row) => {
        const p = analystReferralStatusPresentation(row.status);
        return <StatusBadge label={p.label} tone={p.tone} />;
      },
    },
    {
      key: "total",
      header: "Total Referrals",
      render: (row) => (
        <span className="tabular-nums text-white/90">{row.totalReferrals}</span>
      ),
    },
    {
      key: "successful",
      header: "Successful Referrals",
      render: (row) => (
        <span className="tabular-nums text-white/90">
          {row.successfulReferrals}
        </span>
      ),
    },
  ];

  if (showArchiveReason) {
    columns.push({
      key: "archive",
      header: "Archive",
      render: (row) => (
        <span className="text-xs text-tc-muted">
          {row.archiveReason === "expired_partnership"
            ? "Expired partnership"
            : row.archiveReason === "analyst_archived"
              ? "Archived analyst"
              : row.status === "disabled"
                ? "Disabled code"
                : "Archived"}
        </span>
      ),
    });
  }

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
