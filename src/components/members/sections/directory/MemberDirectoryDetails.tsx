"use client";

import Link from "next/link";
import { Crown, FileText } from "lucide-react";
import {
  InfoCard,
  StatusBadge,
  SystemHealthBadge,
} from "@/components/admin/ui";
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

type MemberDirectoryDetailsProps = {
  member: DirectoryMember | null;
  className?: string;
};

/**
 * Desktop directory inspection panel — stacked sections (Referrals standard).
 * Full Member Control Center remains at `/admin/members/[id]` (mobile + deep link).
 */
export function MemberDirectoryDetails({
  member,
  className,
}: MemberDirectoryDetailsProps) {
  if (!member) {
    return (
      <div
        className={cn(
          "admin-card-surface flex h-full min-h-[20rem] flex-col items-center justify-center rounded-xl border border-dashed border-white/10 p-6 text-center",
          className
        )}
      >
        <p className="text-sm font-medium text-white">Select a member</p>
        <p className="mt-1 max-w-xs text-xs text-tc-muted">
          Choose a row to inspect membership, Discord, referral progress, and system health.
        </p>
      </div>
    );
  }

  const initials = member.username.slice(0, 2).toUpperCase();
  const referralPct = Math.round(
    (member.referralCurrent / Math.max(member.referralTarget, 1)) * 100
  );

  return (
    <div
      className={cn(
        "admin-card-surface flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-violet-500/20 [--admin-card-bg:#120e22]",
        className
      )}
    >
      <div className="shrink-0 border-b border-white/10 p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <div
            className={cn(
              "flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
              avatarToneStyles[member.avatarTone]
            )}
            aria-hidden
          >
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="truncate text-base font-semibold text-white sm:text-lg">
                {member.username}
              </h2>
              {member.membership === "vip" ? (
                <StatusBadge label="VIP" tone="vip" dot={false} />
              ) : (
                <StatusBadge label="Free" tone="info" dot={false} />
              )}
            </div>
            <p className="mt-0.5 truncate text-xs text-tc-muted">{member.email}</p>
          </div>
        </div>
      </div>

      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4 sm:p-5">
        <Section title="Membership Summary">
          <Field label="Tier">
            {member.membership === "vip" ? (
              <span className="inline-flex items-center gap-1 text-violet-200">
                <Crown className="h-3.5 w-3.5" aria-hidden />
                VIP
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-sky-200">
                <FileText className="h-3.5 w-3.5" aria-hidden />
                Free
              </span>
            )}
          </Field>
          <Field label="Subscription">
            <SubscriptionBadge status={member.subscription} />
          </Field>
          <Field label="Account">
            <StatusBadge
              label={member.accountStatus === "suspended" ? "Suspended" : "Active"}
              tone={member.accountStatus === "suspended" ? "danger" : "success"}
            />
          </Field>
          <Field label="Joined">
            <span className="tabular-nums">{formatJoined(member.joinedAt)}</span>
          </Field>
        </Section>

        <Section title="Discord">
          <Field label="Connection">
            <DiscordBadge status={member.discord} />
          </Field>
        </Section>

        <Section title="Referral Progress">
          <div className="space-y-2 py-1">
            <div className="flex items-center justify-between text-xs">
              <span className="tabular-nums text-white/80">
                {member.referralCurrent} / {member.referralTarget}
              </span>
              <span className="tabular-nums text-tc-muted">{referralPct}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-[var(--admin-divider)]">
              <div
                className={cn(
                  "h-full rounded-full",
                  member.referralStatus === "waiting_admin_approval"
                    ? "bg-amber-400"
                    : member.referralStatus === "completed" ||
                        member.referralStatus === "eligible"
                      ? "bg-violet-400"
                      : "bg-amber-400"
                )}
                style={{ width: `${Math.min(referralPct, 100)}%` }}
              />
            </div>
            {member.referralStatus === "waiting_admin_approval" ? (
              <StatusBadge label="Waiting Admin Approval" tone="warning" dot={false} />
            ) : member.referralStatus === "completed" ? (
              <StatusBadge label="Completed" tone="vip" dot={false} />
            ) : member.referralStatus === "eligible" ? (
              <StatusBadge label="Eligible" tone="success" dot={false} />
            ) : null}
          </div>
        </Section>

        <Section title="System Health">
          <Field label="Status">
            <SystemHealthBadge state={member.systemHealth} />
          </Field>
        </Section>

        <div className="space-y-2 pt-1">
          <Link
            href={`/admin/members/${member.id}`}
            className="inline-flex w-full items-center justify-center rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-violet-500"
          >
            Open Member Profile
          </Link>
          <Link
            href={`/admin/discord?member=${member.id}`}
            className="admin-ghost-btn flex w-full items-center justify-center rounded-xl border border-white/15 px-4 py-2.5 text-sm font-medium"
          >
            Manage Discord
          </Link>
          <Link
            href={`/admin/referrals?member=${member.id}`}
            className="admin-ghost-btn flex w-full items-center justify-center rounded-xl border border-white/15 px-4 py-2.5 text-sm font-medium"
          >
            Manage Referrals
          </Link>
        </div>
      </div>
    </div>
  );
}

function SubscriptionBadge({
  status,
}: {
  status: DirectoryMember["subscription"];
}) {
  if (status === "none") return <span className="text-tc-muted">N/A</span>;
  const map = {
    active: { label: "Active", tone: "success" as const },
    pending_verification: { label: "Pending Verification", tone: "warning" as const },
    verification_required: { label: "Verification Required", tone: "danger" as const },
  }[status];
  return <StatusBadge label={map.label} tone={map.tone} />;
}

function DiscordBadge({ status }: { status: DirectoryMember["discord"] }) {
  const map = {
    connected: { label: "Connected", tone: "success" as const },
    disconnected: { label: "Disconnected", tone: "neutral" as const },
    action_required: { label: "Action Required", tone: "danger" as const },
    suspended: { label: "Suspended", tone: "danger" as const },
  }[status];
  return <StatusBadge label={map.label} tone={map.tone} />;
}

function formatJoined(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
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
