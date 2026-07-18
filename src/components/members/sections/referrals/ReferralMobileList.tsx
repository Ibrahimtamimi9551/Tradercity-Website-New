"use client";

import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/admin/cn";
import type { ReferralMember } from "@/types/members/referral";
import {
  ReferralAvatar,
  ReferralProgressCell,
  formatRelativeTime,
  formatUsd,
} from "./ReferralTable";

type ReferralMobileListProps = {
  rows: ReferralMember[];
  selectedId: string | null;
  onSelect: (member: ReferralMember) => void;
  emptyTitle?: string;
};

export function ReferralMobileList({
  rows,
  selectedId,
  onSelect,
  emptyTitle = "No referral members found",
}: ReferralMobileListProps) {
  if (rows.length === 0) {
    return (
      <div className="rounded-xl border border-white/10 px-4 py-10 text-center text-sm text-tc-muted md:hidden">
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
              <ReferralAvatar member={member} />
              <div className="min-w-0 flex-1 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-white">
                      {member.displayName}
                    </p>
                    <p className="truncate text-[10px] text-tc-muted">
                      REF-ID : {member.referralId}
                    </p>
                  </div>
                  <ChevronRight
                    className="h-4 w-4 shrink-0 text-tc-muted"
                    aria-hidden
                  />
                </div>
                <ReferralProgressCell member={member} />
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium tabular-nums text-emerald-300">
                    {formatUsd(member.availableCredit)}
                  </span>
                  <span className="text-tc-muted">
                    {formatRelativeTime(member.latestReferralAt)}
                  </span>
                </div>
              </div>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
