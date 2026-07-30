"use client";

import {
  DataTable,
  StatusBadge,
  type DataTableColumn,
} from "@/components/admin/ui";
import { cn } from "@/lib/admin/cn";
import {
  analystDiscordRoleLabel,
  analystDiscordStatusPresentation,
  analystDiscordSyncPresentation,
  formatAnalystDiscordDate,
} from "@/lib/analysts/format-discord";
import type { AnalystDiscordRecord } from "@/types/analysts/discord";

const avatarToneStyles: Record<AnalystDiscordRecord["avatarTone"], string> = {
  discord: "admin-on-accent bg-[#5865F2] text-white",
  violet: "bg-violet-500/30 text-violet-200",
  emerald: "bg-emerald-500/30 text-emerald-200",
  amber: "bg-amber-500/30 text-amber-100",
  rose: "bg-rose-500/30 text-rose-200",
  sky: "bg-sky-500/30 text-sky-200",
};

export function AnalystDiscordAvatar({
  record,
  size = "md",
}: {
  record: AnalystDiscordRecord;
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

type DiscordDirectoryTableProps = {
  rows: AnalystDiscordRecord[];
  selectedId: string | null;
  onRowSelect: (row: AnalystDiscordRecord) => void;
  emptyTitle?: string;
};

export function DiscordDirectoryTable({
  rows,
  selectedId,
  onRowSelect,
  emptyTitle = "No Discord analyst records",
}: DiscordDirectoryTableProps) {
  const columns: DataTableColumn<AnalystDiscordRecord>[] = [
    {
      key: "analyst",
      header: "Analyst",
      className: "min-w-[12rem]",
      render: (row) => (
        <div className="flex items-center gap-2.5 sm:gap-3">
          <AnalystDiscordAvatar record={row} />
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
      key: "status",
      header: "Connection Status",
      render: (row) => {
        const p = analystDiscordStatusPresentation(row.status);
        return <StatusBadge label={p.label} tone={p.tone} />;
      },
    },
    {
      key: "role",
      header: "Assigned Role",
      render: (row) => (
        <span
          className={cn(
            "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
            row.assignedRole === "analyst"
              ? "border-sky-500/35 bg-sky-500/15 text-sky-200"
              : row.assignedRole === "pending"
                ? "border-amber-500/35 bg-amber-500/15 text-amber-100"
                : "border-white/15 bg-white/5 text-white/70"
          )}
        >
          {analystDiscordRoleLabel(row.assignedRole)}
        </span>
      ),
    },
    {
      key: "sync",
      header: "Last Sync",
      render: (row) => {
        const sync = analystDiscordSyncPresentation(row.syncHealth);
        return (
          <div className="space-y-1">
            <StatusBadge label={sync.label} tone={sync.tone} />
            <p className="text-[10px] tabular-nums text-tc-muted">
              {formatAnalystDiscordDate(row.lastSyncAt)}
            </p>
          </div>
        );
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
