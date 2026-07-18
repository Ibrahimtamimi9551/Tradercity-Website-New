"use client";

import {
  DataTable,
  StatusBadge,
  type DataTableColumn,
} from "@/components/admin/ui";
import { cn } from "@/lib/admin/cn";
import type {
  ReferralMember,
  ReferralSort,
  ReferralSortKey,
} from "@/types/members/referral";
import {
  ReferralRowActions,
  type ReferralRowActionHandlers,
} from "./ReferralRowActions";

const avatarToneStyles: Record<ReferralMember["avatarTone"], string> = {
  discord: "admin-on-accent bg-[#5865F2] text-white",
  violet: "bg-violet-500/30 text-violet-200",
  emerald: "bg-emerald-500/30 text-emerald-200",
  amber: "bg-amber-500/30 text-amber-100",
  rose: "bg-rose-500/30 text-rose-200",
  sky: "bg-sky-500/30 text-sky-200",
};

export function ReferralAvatar({
  member,
  size = "md",
}: {
  member: ReferralMember;
  size?: "sm" | "md" | "lg";
}) {
  const initials = member.displayName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

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

export function formatUsd(amount: number) {
  return `$${amount.toLocaleString(undefined, {
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;
}

export function formatRelativeTime(iso: string | null): string {
  if (!iso) return "—";
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diffMs = Math.max(0, now - then);
  const minutes = Math.floor(diffMs / 60_000);
  if (minutes < 60) return minutes <= 1 ? "1 min ago" : `${minutes} mins ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return days === 1 ? "1 day ago" : `${days} days ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
  const months = Math.floor(days / 30);
  return months <= 1 ? "1 month ago" : `${months} months ago`;
}

export function formatReferralDate(iso: string | null): string {
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

export function ReferralProgressCell({ member }: { member: ReferralMember }) {
  const pct = Math.round(
    (member.successfulReferrals / Math.max(member.progressTarget, 1)) * 100
  );
  const completed = member.progressStatus === "completed";

  return (
    <div className="min-w-[8.5rem]">
      <div className="mb-1 flex items-center justify-between gap-2 text-xs">
        <span className="tabular-nums text-white/80">
          {member.successfulReferrals} / {member.progressTarget}
        </span>
        <span className="tabular-nums text-tc-muted">{Math.min(pct, 100)}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-[var(--admin-divider)]">
        <div
          className={cn(
            "h-full rounded-full",
            completed ? "bg-violet-400" : pct >= 50 ? "bg-violet-400" : "bg-amber-400"
          )}
          style={{ width: `${Math.min(pct, 100)}%` }}
        />
      </div>
      {completed ? (
        <div className="mt-1.5">
          <StatusBadge label="Completed" tone="vip" dot={false} />
        </div>
      ) : null}
    </div>
  );
}

type ReferralTableProps = {
  rows: ReferralMember[];
  selectedId: string | null;
  onRowSelect: (member: ReferralMember) => void;
  actionHandlers: ReferralRowActionHandlers;
  sort: ReferralSort;
  onSortChange: (key: ReferralSortKey) => void;
  emptyTitle?: string;
};

export function ReferralTable({
  rows,
  selectedId,
  onRowSelect,
  actionHandlers,
  sort,
  onSortChange,
  emptyTitle = "No referral members found",
}: ReferralTableProps) {
  const columns: DataTableColumn<ReferralMember>[] = [
    {
      key: "username",
      header: "Referrer",
      className: "min-w-[12rem]",
      sortable: true,
      render: (member) => (
        <div className="flex items-center gap-2.5 sm:gap-3">
          <ReferralAvatar member={member} />
          <div className="min-w-0">
            <p className="truncate font-medium text-white">{member.displayName}</p>
            <p className="truncate text-[10px] text-tc-muted sm:text-xs">
              REF-ID : {member.referralId}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "progress",
      header: "Referral Progress",
      sortable: true,
      render: (member) => <ReferralProgressCell member={member} />,
    },
    {
      key: "availableCredit",
      header: "Available Credit",
      sortable: true,
      render: (member) => (
        <span className="font-medium tabular-nums text-emerald-300">
          {formatUsd(member.availableCredit)}
        </span>
      ),
    },
    {
      key: "latestReferral",
      header: "Latest Referral",
      className: "whitespace-nowrap",
      sortable: true,
      render: (member) => (
        <span className="text-xs text-white/80 sm:text-sm">
          {formatRelativeTime(member.latestReferralAt)}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      stopRowClick: true,
      className: "w-[3.5rem] text-right",
      render: (member) => (
        <ReferralRowActions member={member} handlers={actionHandlers} />
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
      sortKey={sort.key}
      sortDirection={sort.direction}
      onSortChange={(key) => onSortChange(key as ReferralSortKey)}
      className="hidden md:block"
    />
  );
}
