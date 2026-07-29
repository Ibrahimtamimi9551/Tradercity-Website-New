"use client";

import Link from "next/link";
import {
  InfoCard,
  StatusBadge,
  Timeline,
  type TimelineItem,
} from "@/components/admin/ui";
import { cn } from "@/lib/admin/cn";
import { MEMBERSHIP_ACTIVATION_SOURCE_LABELS } from "@/types/members/activation-source";
import type { ReferralMember } from "@/types/members/referral";
import {
  REFERRAL_REDEEM_STATUS_LABELS,
  REFERRAL_REDEEM_STATUS_TONES,
  remainingCreditsAfterRedeem,
} from "@/types/members/referral";
import {
  ReferralAvatar,
  formatReferralDate,
  formatUsd,
} from "@/components/members/sections/referrals/ReferralTable";

type ReferralRedeemRequestDetailsProps = {
  member: ReferralMember | null;
  onApprove: (member: ReferralMember) => void;
  onReject: (member: ReferralMember) => void;
  fullPage?: boolean;
  className?: string;
};

/**
 * Activation Center detail — wallet snapshot + approve/reject decision surface.
 * Admin should not jump to Referral Ops to decide.
 */
export function ReferralRedeemRequestDetails({
  member,
  onApprove,
  onReject,
  fullPage = false,
  className,
}: ReferralRedeemRequestDetailsProps) {
  if (!member) {
    return (
      <div
        className={cn(
          "admin-card-surface flex h-full min-h-[20rem] flex-col items-center justify-center rounded-xl border border-dashed border-white/10 p-6 text-center",
          className
        )}
      >
        <p className="text-sm font-medium text-white">
          Select a redeem request
        </p>
        <p className="mt-1 max-w-xs text-xs text-tc-muted">
          Choose a row to inspect wallet credits, eligibility, and approve or
          reject membership activation.
        </p>
      </div>
    );
  }

  const canDecide = member.redeemRequestStatus === "waiting_admin_approval";
  const statusLabel =
    member.redeemRequestStatus === "none"
      ? "—"
      : REFERRAL_REDEEM_STATUS_LABELS[member.redeemRequestStatus];
  const statusTone =
    member.redeemRequestStatus === "none"
      ? ("neutral" as const)
      : REFERRAL_REDEEM_STATUS_TONES[member.redeemRequestStatus];

  const remaining = remainingCreditsAfterRedeem(
    member.availableCredit,
    member.creditsRequired
  );

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
        "admin-card-surface flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-amber-500/20 [--admin-card-bg:#1a150c]",
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
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="truncate text-base font-semibold text-white sm:text-lg">
                {member.displayName}
              </h2>
              <StatusBadge label={statusLabel} tone={statusTone} />
            </div>
            <p className="mt-0.5 truncate text-xs text-tc-muted">
              REF-ID : {member.referralId} ·{" "}
              {MEMBERSHIP_ACTIVATION_SOURCE_LABELS.referral_redeem}
            </p>
            <p className="mt-1 truncate text-xs text-white/70">
              Discord · @{member.discordUsername}
            </p>
            <p className="mt-1.5">
              <Link
                href={`/admin/members/${member.memberId}`}
                className="text-xs font-medium text-amber-200/90 hover:text-amber-100"
              >
                Open Control Center →
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4 sm:p-5">
        <Section title="Wallet Snapshot">
          <Field label="Available Credits">
            <span className="font-semibold tabular-nums text-emerald-300">
              {formatUsd(member.availableCredit)}
            </span>
          </Field>
          <Field label="Credits Required">
            <span className="tabular-nums text-amber-100">
              {member.creditsRequired !== null
                ? formatUsd(member.creditsRequired)
                : "—"}
            </span>
          </Field>
          <Field label="Remaining Credits">
            <span
              className={cn(
                "font-semibold tabular-nums",
                remaining !== null && remaining < 0
                  ? "text-rose-300"
                  : "text-white/90"
              )}
            >
              {remaining !== null ? formatUsd(remaining) : "—"}
            </span>
          </Field>
          <Field label="Requested Plan">
            {member.requestedPlanLabel ?? "—"}
          </Field>
          <Field label="Current Membership">
            <span>
              {member.membershipPlanLabel}
              <span className="text-tc-muted"> · </span>
              {member.membershipStatusLabel}
            </span>
          </Field>
          <Field label="Eligibility">
            {member.redeemEligibilityLabel ? (
              <StatusBadge
                label={member.redeemEligibilityLabel}
                tone={
                  member.redeemEligibility === "eligible"
                    ? "success"
                    : member.redeemEligibility === "insufficient_credit"
                      ? "warning"
                      : "danger"
                }
                dot={false}
              />
            ) : (
              "—"
            )}
          </Field>
          <Field label="Requested At">
            <span className="tabular-nums">
              {formatReferralDate(member.redeemRequestedAt)}
            </span>
          </Field>
        </Section>

        {canDecide ? (
          <StateBanner tone="warning">
            Waiting Admin Approval. Approving activates Membership, deducts
            credits, updates the wallet, and writes audit + timeline events.
            Referral Ops never activates memberships.
          </StateBanner>
        ) : null}

        {member.redeemRequestStatus === "approved" ? (
          <StateBanner tone="success">
            Approved — membership activated via Referral Redeem. Credits were
            deducted and the wallet was updated.
          </StateBanner>
        ) : null}

        {member.redeemRequestStatus === "rejected" ? (
          <StateBanner tone="danger">
            Rejected — membership unchanged. Credits remain in the referral
            wallet.
          </StateBanner>
        ) : null}

        {canDecide ? (
          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() => onApprove(member)}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/15 px-4 py-2.5 text-sm font-medium text-emerald-100 transition-colors hover:bg-emerald-500/25"
            >
              Approve Redeem
            </button>
            <button
              type="button"
              onClick={() => onReject(member)}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-2.5 text-sm font-medium text-rose-100 transition-colors hover:bg-rose-500/20"
            >
              Reject Redeem
            </button>
          </div>
        ) : null}

        <Section title="Approval Flow">
          <ol className="space-y-2 py-1 text-xs text-tc-muted">
            <li>1. Waiting Admin Approval</li>
            <li>2. Approve</li>
            <li>3. Membership Activated</li>
            <li>4. Credits Deducted</li>
            <li>5. Wallet Updated</li>
            <li>6. Audit Log</li>
            <li>7. Timeline Updated</li>
          </ol>
        </Section>

        <Section title="Timeline">
          {timelineItems.length === 0 ? (
            <p className="py-4 text-center text-sm text-tc-muted">
              No timeline events yet.
            </p>
          ) : (
            <Timeline items={timelineItems} />
          )}
        </Section>
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

function StateBanner({
  tone,
  children,
}: {
  tone: "success" | "warning" | "danger";
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border px-3.5 py-3 text-xs leading-relaxed",
        tone === "success" &&
          "border-emerald-500/30 bg-emerald-500/10 text-emerald-100/90",
        tone === "warning" &&
          "border-amber-500/30 bg-amber-500/10 text-amber-100/90",
        tone === "danger" && "border-rose-500/30 bg-rose-500/10 text-rose-100/90"
      )}
    >
      {children}
    </div>
  );
}
