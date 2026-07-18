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
import type { DiscordDetailTab, DiscordMember } from "@/types/members/discord";
import {
  ConnectionStatusBadge,
  DiscordAvatar,
  DiscordRoleBadge,
  SyncStatusBadge,
  formatDiscordDate,
} from "./DiscordTable";
import { DiscordSyncActions } from "./DiscordSyncActions";

const TABS: { id: DiscordDetailTab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "role_history", label: "Role History" },
  { id: "events", label: "Events" },
  { id: "sync_log", label: "Sync Log" },
];

type DiscordDetailsProps = {
  member: DiscordMember | null;
  activeTab: DiscordDetailTab;
  onTabChange: (tab: DiscordDetailTab) => void;
  onSyncNow: (member: DiscordMember) => void;
  onSendInvite: (member: DiscordMember) => void;
  /** Compact full-page layout for mobile detail route. */
  fullPage?: boolean;
  className?: string;
};

export function DiscordDetails({
  member,
  activeTab,
  onTabChange,
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

  return (
    <div
      className={cn(
        "admin-card-surface flex h-full flex-col overflow-hidden rounded-xl border border-violet-500/20 [--admin-card-bg:#120e22]",
        className
      )}
    >
      <div className={cn("border-b border-white/10 p-4", fullPage && "sm:p-5")}>
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

        <div
          role="tablist"
          aria-label="Discord member details"
          className="mt-4 flex gap-1 overflow-x-auto border-b border-white/10 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "relative shrink-0 px-3 py-2 text-xs font-medium transition-colors sm:text-sm",
                  isActive ? "text-white" : "text-tc-muted hover:text-white/80"
                )}
              >
                {tab.label}
                {isActive ? (
                  <span
                    className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-violet-400"
                    aria-hidden
                  />
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-5">
        {activeTab === "overview" ? (
          <OverviewTab
            member={member}
            onSyncNow={onSyncNow}
            onSendInvite={onSendInvite}
          />
        ) : null}
        {activeTab === "role_history" ? <RoleHistoryTab member={member} /> : null}
        {activeTab === "events" ? <EventsTab member={member} /> : null}
        {activeTab === "sync_log" ? <SyncLogTab member={member} /> : null}
      </div>
    </div>
  );
}

function OverviewTab({
  member,
  onSyncNow,
  onSendInvite,
}: {
  member: DiscordMember;
  onSyncNow: (member: DiscordMember) => void;
  onSendInvite: (member: DiscordMember) => void;
}) {
  return (
    <div className="space-y-4">
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

      <div className="flex gap-2.5 rounded-xl border border-sky-500/25 bg-sky-500/10 p-3">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-sky-300" aria-hidden />
        <p className="text-xs leading-relaxed text-sky-100/90">
          Discord reflects TraderCity membership. TraderCity remains the source of
          truth. Synchronization keeps both systems aligned.
        </p>
      </div>
    </div>
  );
}

function RoleHistoryTab({ member }: { member: DiscordMember }) {
  if (member.roleHistory.length === 0) {
    return (
      <EmptyTab message="No role history yet. Roles appear here after Discord sync events." />
    );
  }

  const items: TimelineItem[] = member.roleHistory.map((entry, index) => ({
    id: entry.id,
    title: entry.label,
    description: entry.note,
    timestamp: formatDiscordDate(entry.timestamp),
    status: index === member.roleHistory.length - 1 ? "current" : "complete",
  }));

  return <Timeline items={items} />;
}

function EventsTab({ member }: { member: DiscordMember }) {
  if (member.events.length === 0) {
    return <EmptyTab message="No Discord events recorded for this member." />;
  }

  const items: TimelineItem[] = member.events.map((event) => ({
    id: event.id,
    title: event.title,
    description: event.description,
    timestamp: formatDiscordDate(event.timestamp),
    status: "complete",
  }));

  return <Timeline items={items} />;
}

function SyncLogTab({ member }: { member: DiscordMember }) {
  if (member.syncLog.length === 0) {
    return <EmptyTab message="No synchronization log entries yet." />;
  }

  const items: TimelineItem[] = member.syncLog.map((entry) => ({
    id: entry.id,
    title: entry.title,
    description: entry.description,
    timestamp: formatDiscordDate(entry.timestamp),
    status: entry.status,
  }));

  return <Timeline items={items} />;
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

function EmptyTab({ message }: { message: string }) {
  return <p className="py-8 text-center text-sm text-tc-muted">{message}</p>;
}
