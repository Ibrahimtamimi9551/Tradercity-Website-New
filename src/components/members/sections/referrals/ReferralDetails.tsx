"use client";

import { useCallback, useState } from "react";
import { Check, Copy, X } from "lucide-react";
import {
  InfoCard,
  StatusBadge,
  Timeline,
  type TimelineItem,
} from "@/components/admin/ui";
import { cn } from "@/lib/admin/cn";
import type { ReferralMember } from "@/types/members/referral";
import {
  ReferralAvatar,
  ReferralProgressCell,
  formatReferralDate,
  formatUsd,
} from "./ReferralTable";

type ReferralDetailsProps = {
  member: ReferralMember | null;
  onClose?: () => void;
  /** Full-page layout for mobile detail route. */
  fullPage?: boolean;
  className?: string;
};

/**
 * Single vertically scrolling panel — no tabs.
 * Shared by desktop side panel and mobile `/admin/referrals/[id]`.
 */
export function ReferralDetails({
  member,
  onClose,
  fullPage = false,
  className,
}: ReferralDetailsProps) {
  if (!member) {
    return (
      <div
        className={cn(
          "admin-card-surface flex h-full min-h-[20rem] flex-col items-center justify-center rounded-xl border border-dashed border-white/10 p-6 text-center",
          className
        )}
      >
        <p className="text-sm font-medium text-white">Select a referrer</p>
        <p className="mt-1 max-w-xs text-xs text-tc-muted">
          Choose a row to inspect progress, wallet credits, and referral activity.
        </p>
      </div>
    );
  }

  const timelineItems: TimelineItem[] = member.timeline.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    timestamp: formatReferralDate(item.timestamp),
    status: item.status ?? "complete",
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
          <ReferralAvatar member={member} size="lg" />
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="truncate text-base font-semibold text-white sm:text-lg">
                    {member.displayName}
                  </h2>
                  {member.membershipPlan !== "free" ? (
                    <StatusBadge label="VIP" tone="vip" dot={false} />
                  ) : null}
                </div>
                <p className="mt-0.5 truncate text-xs text-tc-muted">
                  REF-ID : {member.referralId}
                </p>
                <p className="mt-1 truncate text-xs text-white/70">
                  Discord · @{member.discordUsername}
                </p>
                <p className="mt-0.5 truncate text-xs text-tc-muted">
                  {member.membershipPlanLabel}
                </p>
              </div>
              {onClose && !fullPage ? (
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close details"
                  className="admin-ghost-btn rounded-lg p-1.5 text-tc-muted hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4 sm:p-5">
        <ReferralSummaryCard member={member} />
        <MemberInformationCard member={member} />
        <WalletInformationCard member={member} />

        <Section title="Referral Timeline">
          {timelineItems.length === 0 ? (
            <EmptyBlock message="No timeline events yet." />
          ) : (
            <Timeline items={timelineItems} />
          )}
        </Section>

        <Section title="Recent Activity">
          {member.activity.length === 0 ? (
            <EmptyBlock message="No recent referral activity." />
          ) : (
            <ul className="space-y-3">
              {member.activity.map((item) => (
                <li key={item.id} className="border-b border-white/5 pb-3 last:border-0 last:pb-0">
                  <p className="text-sm font-medium text-white">{item.title}</p>
                  {item.description ? (
                    <p className="text-xs text-tc-muted">{item.description}</p>
                  ) : null}
                  <p className="mt-1 text-xs text-tc-muted">
                    {formatReferralDate(item.timestamp)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </Section>
      </div>
    </div>
  );
}

function ReferralSummaryCard({ member }: { member: ReferralMember }) {
  return (
    <Section title="Referral Summary">
      <div className="space-y-3">
        <div>
          <p className="mb-1.5 text-xs text-tc-muted">Referral Progress</p>
          <ReferralProgressCell member={member} />
        </div>
        <Field label="Available Credit">
          <span className="font-semibold tabular-nums text-emerald-300">
            {formatUsd(member.availableCredit)}
          </span>
        </Field>
        <Field label="Successful Referrals">
          <span className="tabular-nums">{member.successfulReferrals}</span>
        </Field>
        <Field label="Pending Referrals">
          <span className="tabular-nums text-amber-200">
            {member.pendingReferrals}
          </span>
        </Field>
        <Field label="Business Value Generated">
          <span className="font-semibold tabular-nums text-violet-300">
            {formatUsd(member.businessValueGenerated)}
          </span>
        </Field>
      </div>
    </Section>
  );
}

function MemberInformationCard({ member }: { member: ReferralMember }) {
  return (
    <Section title="Member Information">
      <Field label="Membership Plan">{member.membershipPlanLabel}</Field>
      <Field label="Status">
        <StatusBadge
          label={member.membershipStatusLabel}
          tone={member.membershipStatusTone}
        />
      </Field>
      <Field label="Joined Date">
        <span className="tabular-nums">{formatReferralDate(member.joinedAt)}</span>
      </Field>
      <Field label="Discord Username">@{member.discordUsername}</Field>
      <Field label="Email">
        <span className="break-all">{member.email}</span>
      </Field>
      <CopyField label="Referral Code" value={member.referralCode} />
      <CopyField label="Referral Link" value={member.referralLink} />
    </Section>
  );
}

function WalletInformationCard({ member }: { member: ReferralMember }) {
  return (
    <Section title="Wallet Information">
      <Field label="Available Credit">
        <span className="tabular-nums text-emerald-300">
          {formatUsd(member.availableCredit)}
        </span>
      </Field>
      <Field label="Pending Credit">
        <span className="tabular-nums text-amber-200">
          {formatUsd(member.pendingCredit)}
        </span>
      </Field>
      <Field label="Lifetime Earned">
        <span className="tabular-nums">{formatUsd(member.lifetimeEarned)}</span>
      </Field>
      <Field label="Lifetime Redeemed">
        <span className="tabular-nums text-rose-300">
          {formatUsd(member.lifetimeRedeemed)}
        </span>
      </Field>
    </Section>
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

function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  const onCopy = useCallback(() => {
    void navigator.clipboard?.writeText(value).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    });
  }, [value]);

  return (
    <div className="flex items-start justify-between gap-3 py-2.5">
      <span className="shrink-0 text-xs text-tc-muted">{label}</span>
      <div className="flex min-w-0 max-w-[65%] items-center gap-1.5">
        <span className="truncate text-right text-sm text-white/90" title={value}>
          {value}
        </span>
        <button
          type="button"
          onClick={onCopy}
          aria-label={`Copy ${label}`}
          className="admin-ghost-btn shrink-0 rounded-md p-1 text-tc-muted hover:text-white"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-emerald-300" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
        </button>
      </div>
    </div>
  );
}

function EmptyBlock({ message }: { message: string }) {
  return <p className="py-4 text-center text-sm text-tc-muted">{message}</p>;
}
