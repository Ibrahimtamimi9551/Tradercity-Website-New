"use client";

import {
  DataTable,
  StatusBadge,
  type DataTableColumn,
} from "@/components/admin/ui";
import { cn } from "@/lib/admin/cn";
import type {
  SubscriptionDisplayStatus,
  SubscriptionTicket,
} from "@/types/members/subscription";
import {
  SubscriptionRowActions,
  type SubscriptionRowActionHandlers,
} from "./SubscriptionRowActions";

const avatarToneStyles: Record<SubscriptionTicket["avatarTone"], string> = {
  discord: "admin-on-accent bg-[#5865F2] text-white",
  violet: "bg-violet-500/30 text-violet-200",
  emerald: "bg-emerald-500/30 text-emerald-200",
  amber: "bg-amber-500/30 text-amber-100",
  rose: "bg-rose-500/30 text-rose-200",
  sky: "bg-sky-500/30 text-sky-200",
};

export function SubscriptionAvatar({
  ticket,
  size = "md",
}: {
  ticket: SubscriptionTicket;
  size?: "sm" | "md" | "lg";
}) {
  const initials = ticket.username.slice(0, 2).toUpperCase();
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full font-semibold",
        size === "sm" && "h-7 w-7 text-[10px]",
        size === "md" && "h-7 w-7 text-[10px] sm:h-9 sm:w-9 sm:text-xs",
        size === "lg" && "h-12 w-12 text-sm",
        avatarToneStyles[ticket.avatarTone]
      )}
      aria-hidden
    >
      {initials}
    </div>
  );
}

export function SubscriptionStatusBadge({
  status,
  label,
  tone,
}: {
  status?: SubscriptionDisplayStatus;
  label: string;
  tone: SubscriptionTicket["statusTone"];
}) {
  void status;
  return <StatusBadge label={label} tone={tone} />;
}

export function formatSubscriptionDate(iso: string | null): string {
  if (!iso || iso === "—") return "—";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
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

function shortenHash(hash: string): string {
  if (hash.length <= 14) return hash;
  return `${hash.slice(0, 8)}…${hash.slice(-6)}`;
}

type SubscriptionTableProps = {
  rows: SubscriptionTicket[];
  selectedId: string | null;
  onRowSelect: (ticket: SubscriptionTicket) => void;
  actionHandlers: SubscriptionRowActionHandlers;
  emptyTitle?: string;
};

export function SubscriptionTable({
  rows,
  selectedId,
  onRowSelect,
  actionHandlers,
  emptyTitle = "No subscription tickets found",
}: SubscriptionTableProps) {
  const columns: DataTableColumn<SubscriptionTicket>[] = [
    {
      key: "member",
      header: "Member",
      className: "min-w-[11rem]",
      render: (ticket) => (
        <div className="flex items-center gap-2.5 sm:gap-3">
          <SubscriptionAvatar ticket={ticket} />
          <div className="min-w-0">
            <p className="truncate font-medium text-white">{ticket.username}</p>
            <p className="truncate text-[10px] text-tc-muted sm:text-xs">
              {ticket.planLabel}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (ticket) => (
        <SubscriptionStatusBadge
          status={ticket.displayStatus}
          label={ticket.statusLabel}
          tone={ticket.statusTone}
        />
      ),
    },
    {
      key: "amount",
      header: "Amount",
      className: "whitespace-nowrap",
      render: (ticket) => (
        <div className="tabular-nums text-xs sm:text-sm">
          <p className="text-white/90">
            {ticket.actualAmount ?? "—"} / {ticket.expectedAmount}{" "}
            {ticket.currency}
          </p>
          <p className="text-[10px] text-tc-muted sm:text-xs">
            Expected {ticket.expectedAmount}
          </p>
        </div>
      ),
    },
    {
      key: "network",
      header: "Network",
      render: (ticket) => (
        <span className="text-xs text-white/80 sm:text-sm">
          {ticket.network.toUpperCase()}
        </span>
      ),
    },
    {
      key: "tx",
      header: "TX Hash",
      className: "min-w-[8rem]",
      render: (ticket) => (
        <span className="font-mono text-[10px] text-white/70 sm:text-xs">
          {shortenHash(ticket.transactionHash)}
        </span>
      ),
    },
    {
      key: "submitted",
      header: "Submitted",
      className: "whitespace-nowrap",
      render: (ticket) => (
        <span className="tabular-nums text-xs text-white/80 sm:text-sm">
          {formatSubscriptionDate(ticket.submittedAt)}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      stopRowClick: true,
      className: "w-[7rem] text-right",
      render: (ticket) => (
        <SubscriptionRowActions ticket={ticket} handlers={actionHandlers} />
      ),
    },
  ];

  const selectedKey =
    selectedId &&
    rows.some((r) => r.id === selectedId || r.memberId === selectedId)
      ? rows.find((r) => r.id === selectedId || r.memberId === selectedId)?.id ??
        selectedId
      : selectedId;

  return (
    <DataTable
      columns={columns}
      data={rows}
      getRowKey={(row) => row.id}
      selectedKey={selectedKey}
      onRowClick={onRowSelect}
      emptyTitle={emptyTitle}
      compactMobile
      className="border-white/10 bg-white/[0.015] max-sm:rounded-lg"
    />
  );
}
