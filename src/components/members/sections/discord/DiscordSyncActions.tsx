"use client";

import Link from "next/link";
import { RefreshCw, Send } from "lucide-react";
import type { DiscordMember } from "@/types/members/discord";

type DiscordSyncActionsProps = {
  member: DiscordMember;
  onSyncNow: (member: DiscordMember) => void;
  onSendInvite: (member: DiscordMember) => void;
};

/**
 * Details-panel actions only — membership editing stays in Subscriptions.
 * TODO(NestJS): POST sync / invite endpoints on Discord integration service.
 */
export function DiscordSyncActions({
  member,
  onSyncNow,
  onSendInvite,
}: DiscordSyncActionsProps) {
  return (
    <div className="space-y-2">
      <Link
        href={`/admin/members/${member.memberId}`}
        className="admin-ghost-btn flex w-full items-center justify-center rounded-xl border border-white/15 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-white/5"
      >
        View Member Profile
      </Link>
      <button
        type="button"
        onClick={() => onSyncNow(member)}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-violet-500"
      >
        <RefreshCw className="h-4 w-4" aria-hidden />
        Sync Now
      </button>
      <button
        type="button"
        onClick={() => onSendInvite(member)}
        className="admin-ghost-btn flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-white/5"
      >
        <Send className="h-4 w-4" aria-hidden />
        Send Invite
      </button>
    </div>
  );
}
