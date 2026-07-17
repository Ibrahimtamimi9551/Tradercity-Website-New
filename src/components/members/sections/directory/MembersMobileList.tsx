"use client";

import { ChevronRight, Crown, FileText } from "lucide-react";
import { StatusBadge, SystemHealthBadge } from "@/components/admin/ui";
import { cn } from "@/lib/admin/cn";
import type { DirectoryMember } from "@/types/members/directory";

const avatarToneStyles: Record<DirectoryMember["avatarTone"], string> = {
  discord: "admin-on-accent bg-[#5865F2] text-white",
  violet: "bg-violet-500/30 text-violet-200",
  emerald: "bg-emerald-500/30 text-emerald-200",
  amber: "bg-amber-500/30 text-amber-100",
  rose: "bg-rose-500/30 text-rose-200",
  sky: "bg-sky-500/30 text-sky-200",
};

type MembersMobileListProps = {
  rows: DirectoryMember[];
  onSelect: (member: DirectoryMember) => void;
  emptyTitle?: string;
};

/**
 * Mobile card list — same filtered `rows` as the desktop table.
 * Selection opens the Member Control Center (handled by parent).
 */
export function MembersMobileList({
  rows,
  onSelect,
  emptyTitle = "No members match the current filters",
}: MembersMobileListProps) {
  if (rows.length === 0) {
    return (
      <div className="admin-muted rounded-xl border border-white/10 px-4 py-10 text-center text-sm md:hidden">
        {emptyTitle}
      </div>
    );
  }

  return (
    <ul className="space-y-2 md:hidden">
      {rows.map((member) => (
        <li key={member.id}>
          <button
            type="button"
            onClick={() => onSelect(member)}
            className="admin-card-surface flex w-full items-center gap-3 rounded-xl border border-white/10 p-3 text-left transition-colors hover:bg-[var(--admin-row-hover)]"
          >
            <div
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                avatarToneStyles[member.avatarTone]
              )}
              aria-hidden
            >
              {member.username.slice(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1 space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-sm font-medium text-white">
                  {member.username}
                </p>
                <ChevronRight
                  className="h-4 w-4 shrink-0 text-tc-muted"
                  aria-hidden
                />
              </div>
              <p className="truncate text-[10px] text-tc-muted">{member.email}</p>
              <div className="flex flex-wrap items-center gap-1.5">
                {member.membership === "vip" ? (
                  <span className="inline-flex items-center gap-1 rounded-full border border-violet-500/35 bg-violet-500/15 px-1.5 py-0.5 text-[10px] font-medium text-violet-200">
                    <Crown className="h-2.5 w-2.5" aria-hidden />
                    VIP
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full border border-sky-500/25 bg-sky-500/10 px-1.5 py-0.5 text-[10px] font-medium text-sky-200">
                    <FileText className="h-2.5 w-2.5" aria-hidden />
                    Free
                  </span>
                )}
                <DiscordChip status={member.discord} />
                <SystemHealthBadge state={member.systemHealth} />
                {member.accountStatus === "suspended" ? (
                  <StatusBadge label="Suspended" tone="danger" />
                ) : null}
              </div>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
}

function DiscordChip({ status }: { status: DirectoryMember["discord"] }) {
  const map = {
    connected: { label: "Connected", tone: "success" as const },
    disconnected: { label: "Disconnected", tone: "neutral" as const },
    action_required: { label: "Action Required", tone: "danger" as const },
    suspended: { label: "Suspended", tone: "danger" as const },
  }[status];

  return <StatusBadge label={map.label} tone={map.tone} />;
}
