"use client";

import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/admin/cn";
import type { DiscordMember } from "@/types/members/discord";
import {
  ConnectionStatusBadge,
  DiscordAvatar,
  DiscordRoleBadge,
  SyncStatusBadge,
} from "./DiscordTable";

type DiscordMobileListProps = {
  rows: DiscordMember[];
  selectedId: string | null;
  onSelect: (member: DiscordMember) => void;
  emptyTitle?: string;
};

/**
 * Mobile card list — same filtered dataset as the desktop table.
 * Selection navigates to the dedicated details page (handled by parent).
 */
export function DiscordMobileList({
  rows,
  selectedId,
  onSelect,
  emptyTitle = "No Discord members found",
}: DiscordMobileListProps) {
  if (rows.length === 0) {
    return (
      <div className="admin-muted rounded-xl border border-white/10 px-4 py-10 text-center text-sm md:hidden">
        {emptyTitle}
      </div>
    );
  }

  return (
    <ul className="space-y-2 md:hidden">
      {rows.map((member) => {
        const isSelected = selectedId === member.id;
        return (
          <li key={member.id}>
            <button
              type="button"
              onClick={() => onSelect(member)}
              className={cn(
                "admin-card-surface flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-colors",
                isSelected
                  ? "border-violet-500/40 bg-violet-500/10"
                  : "border-white/10 hover:bg-[var(--admin-row-hover)]"
              )}
            >
              <DiscordAvatar member={member} size="md" />
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
                <p className="truncate text-[10px] text-tc-muted">
                  ID: {member.discordId}
                </p>
                <div className="flex flex-wrap items-center gap-1.5">
                  <DiscordRoleBadge role={member.role} />
                  <ConnectionStatusBadge status={member.connectionStatus} />
                  <SyncStatusBadge status={member.syncStatus} />
                </div>
              </div>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
