"use client";

import {
  DataTable,
  StatusBadge,
  type DataTableColumn,
} from "@/components/admin/ui";
import { cn } from "@/lib/admin/cn";
import type {
  DiscordConnectionStatus,
  DiscordMember,
  DiscordRole,
  DiscordSyncStatus,
} from "@/types/members/discord";
import {
  DiscordRowActions,
  type DiscordRowActionHandlers,
} from "./DiscordRowActions";

const avatarToneStyles: Record<DiscordMember["avatarTone"], string> = {
  discord: "admin-on-accent bg-[#5865F2] text-white",
  violet: "bg-violet-500/30 text-violet-200",
  emerald: "bg-emerald-500/30 text-emerald-200",
  amber: "bg-amber-500/30 text-amber-100",
  rose: "bg-rose-500/30 text-rose-200",
  sky: "bg-sky-500/30 text-sky-200",
};

export function DiscordAvatar({
  member,
  size = "md",
}: {
  member: DiscordMember;
  size?: "sm" | "md" | "lg";
}) {
  const initials = member.username.slice(0, 2).toUpperCase();
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full font-semibold",
        size === "sm" && "h-7 w-7 text-[10px]",
        size === "md" && "h-7 w-7 text-[10px] sm:h-9 sm:w-9 sm:text-xs",
        size === "lg" && "h-12 w-12 text-sm",
        avatarToneStyles[member.avatarTone]
      )}
      aria-hidden
    >
      {initials}
    </div>
  );
}

export function DiscordRoleBadge({ role }: { role: DiscordRole }) {
  const map: Record<DiscordRole, { label: string; className: string }> = {
    vip: {
      label: "VIP",
      className: "border-violet-500/35 bg-violet-500/15 text-violet-200",
    },
    public: {
      label: "Public",
      className: "border-white/15 bg-white/5 text-white/70",
    },
    analyst: {
      label: "Analyst",
      className: "border-sky-500/35 bg-sky-500/15 text-sky-200",
    },
    moderator: {
      label: "Moderator",
      className: "border-amber-500/35 bg-amber-500/15 text-amber-200",
    },
  };
  const item = map[role];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        item.className
      )}
    >
      {item.label}
    </span>
  );
}

export function ConnectionStatusBadge({
  status,
}: {
  status: DiscordConnectionStatus;
}) {
  const map = {
    connected: { label: "Connected", tone: "success" as const },
    disconnected: { label: "Disconnected", tone: "neutral" as const },
    left_server: { label: "Left Server", tone: "warning" as const },
    suspended: { label: "Suspended", tone: "danger" as const },
  }[status];
  return <StatusBadge label={map.label} tone={map.tone} />;
}

export function SyncStatusBadge({ status }: { status: DiscordSyncStatus }) {
  const map = {
    synced: { label: "Synced", tone: "success" as const },
    pending: { label: "Pending", tone: "info" as const },
    sync_failed: { label: "Sync Failed", tone: "danger" as const },
    not_synced: { label: "Not Synced", tone: "warning" as const },
  }[status];
  return <StatusBadge label={map.label} tone={map.tone} />;
}

export function formatDiscordDate(iso: string | null): string {
  if (!iso) return "—";
  const date = new Date(iso);
  const day = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const time = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return `${day} ${time}`;
}

type DiscordTableProps = {
  rows: DiscordMember[];
  selectedId: string | null;
  onRowSelect: (member: DiscordMember) => void;
  actionHandlers: DiscordRowActionHandlers;
  emptyTitle?: string;
};

export function DiscordTable({
  rows,
  selectedId,
  onRowSelect,
  actionHandlers,
  emptyTitle = "No Discord members found",
}: DiscordTableProps) {
  const columns: DataTableColumn<DiscordMember>[] = [
    {
      key: "user",
      header: "Discord User",
      className: "min-w-[12rem]",
      render: (member) => (
        <div className="flex items-center gap-2.5 sm:gap-3">
          <DiscordAvatar member={member} />
          <div className="min-w-0">
            <p className="truncate font-medium text-white">{member.username}</p>
            <p className="truncate text-[10px] text-tc-muted sm:text-xs">
              ID: {member.discordId}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "role",
      header: "Discord Role",
      render: (member) => <DiscordRoleBadge role={member.role} />,
    },
    {
      key: "connection",
      header: "Connection Status",
      render: (member) => (
        <ConnectionStatusBadge status={member.connectionStatus} />
      ),
    },
    {
      key: "sync",
      header: "Sync Status",
      render: (member) => <SyncStatusBadge status={member.syncStatus} />,
    },
    {
      key: "joined",
      header: "Joined Discord",
      className: "whitespace-nowrap",
      render: (member) => (
        <span className="tabular-nums text-xs text-white/80 sm:text-sm">
          {formatDiscordDate(member.joinedDiscordAt)}
        </span>
      ),
    },
    {
      key: "lastSync",
      header: "Last Sync",
      className: "whitespace-nowrap",
      render: (member) => (
        <span className="tabular-nums text-xs text-white/80 sm:text-sm">
          {formatDiscordDate(member.lastSyncAt)}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      stopRowClick: true,
      className: "w-[7rem] text-right",
      render: (member) => (
        <DiscordRowActions member={member} handlers={actionHandlers} />
      ),
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
      className="hidden md:block"
    />
  );
}
