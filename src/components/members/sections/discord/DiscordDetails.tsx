"use client";

import Link from "next/link";
import { ExternalLink, Info } from "lucide-react";
import {
  InfoCard,
  StatusBadge,
  Timeline,
  type TimelineItem,
} from "@/components/admin/ui";
import { cn } from "@/lib/admin/cn";
import type { DiscordMember } from "@/types/members/discord";
import {
  ConnectionStatusBadge,
  DiscordAvatar,
  DiscordRoleBadge,
  SyncStatusBadge,
  formatDiscordDate,
} from "./DiscordTable";
import { DiscordSyncActions } from "./DiscordSyncActions";

type DiscordDetailsProps = {
  member: DiscordMember | null;
  onSyncNow: (member: DiscordMember) => void;
  onSendInvite: (member: DiscordMember) => void;
  /** Compact full-page layout for mobile detail route. */
  fullPage?: boolean;
  className?: string;
};

/**
 * Single vertically scrolling panel — no tabs (Referrals design standard).
 * Shared by desktop side panel and mobile `/admin/discord/[id]`.
 */
export function DiscordDetails({
  member,
  onSyncNow,
  onSendInvite,
  fullPage = false,
  className,
}: DiscordDetailsProps) {
  if (!member) {
    return (
      <div
        className={cn(
          "admin-card-surface flex h-full min-h-[20rem] flex-col items-center justify-center rounded-xl border border-dashed border-white/10 p-6 text-center",
          className
        )}
      >
        <p className="text-sm font-medium text-white">Select a Discord member</p>
        <p className="mt-1 max-w-xs text-xs text-tc-muted">
          Choose a row to inspect connection state, sync status, and linked membership.
        </p>
      </div>
    );
  }

  const roleHistoryItems: TimelineItem[] = member.roleHistory.map((entry, index) => ({
    id: entry.id,
    title: entry.label,
    description: entry.note,
    timestamp: formatDiscordDate(entry.timestamp),
    status: index === member.roleHistory.length - 1 ? "current" : "complete",
  }));

  const eventItems: TimelineItem[] = member.events.map((event) => ({
    id: event.id,
    title: event.title,
    description: event.description,
    timestamp: formatDiscordDate(event.timestamp),
    status: "complete",
  }));

  const syncLogItems: TimelineItem[] = member.syncLog.map((entry) => ({
    id: entry.id,
    title: entry.title,
    description: entry.description,
    timestamp: formatDiscordDate(entry.timestamp),
    status: entry.status,
  }));

  return (
    <div
      className={cn(
        "admin-card-surface flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-violet-500/20 [--admin-card-bg:#120e22]",
        className
      )}
    >
      <div
        className={cn(
          "shrink-0 border-b border-white/10 p-4",
          fullPage && "sm:p-5"
        )}
      >
        <div className="flex items-start gap-3">
          <DiscordAvatar member={member} size="lg" />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="truncate text-base font-semibold text-white sm:text-lg">
                {member.username}
              </h2>
              <DiscordRoleBadge role={member.role} />
            </div>
            <p className="mt-0.5 truncate text-xs text-tc-muted">
              ID: {member.discordId}
            </p>
            {member.role === "vip" ||
            member.linkedMembership.plan.toLowerCase().includes("vip") ? (
              <p className="mt-1.5">
                <StatusBadge label="VIP Member" tone="vip" dot={false} />
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4 sm:p-5">
        <Section title="Discord Information">
          <Field label="Current Role">
            <DiscordRoleBadge role={member.role} />
          </Field>
          <Field label="Connection Status">
            <ConnectionStatusBadge status={member.connectionStatus} />
          </Field>
          <Field label="Joined Discord">
            <span className="tabular-nums">{formatDiscordDate(member.joinedDiscordAt)}</span>
          </Field>
          <Field label="Account Created">
            <span className="tabular-nums">{formatDiscordDate(member.accountCreatedAt)}</span>
          </Field>
          <Field label="Last Seen in Discord">
            <span className="inline-flex items-center gap-1.5">
              {member.lastSeenOnline ? (
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
              ) : null}
              {member.lastSeenLabel}
            </span>
          </Field>
          <Field label="Discord Server">
            <a
              href={member.discordServerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-violet-300 hover:text-violet-200"
            >
              {member.discordServer}
              <ExternalLink className="h-3 w-3" aria-hidden />
            </a>
          </Field>
        </Section>

        <Section title="Synchronization Status">
          <Field label="Status">
            <SyncStatusBadge status={member.syncStatus} />
          </Field>
          <Field label="Last Sync">
            <span className="tabular-nums">{formatDiscordDate(member.lastSyncAt)}</span>
          </Field>
          <Field label="Sync Source">{member.syncSource}</Field>
          <Field label="Auto Sync">
            <StatusBadge
              label={member.autoSync ? "Enabled" : "Disabled"}
              tone={member.autoSync ? "success" : "neutral"}
            />
          </Field>
        </Section>

        <Section title="Linked Membership">
          <Field label="Plan">
            <span className="text-violet-200">{member.linkedMembership.plan}</span>
          </Field>
          <Field label="Status">
            <StatusBadge
              label={member.linkedMembership.statusLabel}
              tone={member.linkedMembership.statusTone}
            />
          </Field>
          <Field label="Expiry Date">
            <span className="tabular-nums">
              {formatDiscordDate(member.linkedMembership.expiryAt)}
            </span>
          </Field>
          <div className="pt-1">
            <Link
              href={`/admin/subscriptions?member=${member.memberId}`}
              className="text-xs font-medium text-violet-300 hover:text-violet-200"
            >
              Open in Membership →
            </Link>
          </div>
        </Section>

        <DiscordSyncActions
          member={member}
          onSyncNow={onSyncNow}
          onSendInvite={onSendInvite}
        />

        <Section title="Role History">
          {roleHistoryItems.length === 0 ? (
            <EmptyBlock message="No role history yet." />
          ) : (
            <Timeline items={roleHistoryItems} />
          )}
        </Section>

        <Section title="Events">
          {eventItems.length === 0 ? (
            <EmptyBlock message="No Discord events recorded." />
          ) : (
            <Timeline items={eventItems} />
          )}
        </Section>

        <Section title="Sync Log">
          {syncLogItems.length === 0 ? (
            <EmptyBlock message="No synchronization log entries yet." />
          ) : (
            <Timeline items={syncLogItems} />
          )}
        </Section>

        <div className="flex gap-2.5 rounded-xl border border-sky-500/25 bg-sky-500/10 p-3">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-sky-300" aria-hidden />
          <p className="text-xs leading-relaxed text-sky-100/90">
            Discord reflects TraderCity membership. TraderCity remains the source of
            truth. Synchronization keeps both systems aligned.
          </p>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <InfoCard title={title} className="!bg-white/[0.02]">
      <div className="divide-y divide-white/5">{children}</div>
    </InfoCard>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-3 py-2.5 first:pt-0 last:pb-0">
      <span className="shrink-0 text-xs text-tc-muted">{label}</span>
      <div className="text-right text-sm text-white/90">{children}</div>
    </div>
  );
}

function EmptyBlock({ message }: { message: string }) {
  return <p className="py-4 text-center text-sm text-tc-muted">{message}</p>;
}
