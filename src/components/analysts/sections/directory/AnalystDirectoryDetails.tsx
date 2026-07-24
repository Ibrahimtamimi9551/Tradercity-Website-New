"use client";

import Link from "next/link";
import { StatusBadge, SystemHealthBadge } from "@/components/admin/ui";
import { cn } from "@/lib/admin/cn";
import {
  analystReferralPlanLabel,
  analystReferralStatusPresentation,
} from "@/lib/analysts/format-referrals";
import {
  analystCommissionStatusPresentation,
  formatCommissionDateShort,
  formatCommissionUsd,
} from "@/lib/analysts/format-commissions";
import { getMockAnalystCommissionByAnalystId } from "@/lib/analysts/mock/commissions";
import { getMockAnalystReferralByAnalystId } from "@/lib/analysts/mock/referrals";
import type {
  AnalystLifecycleStatus,
  AnalystTier,
  DirectoryAnalyst,
} from "@/types/analysts/directory";
import type { StatusTone } from "@/types/admin/common";
import type { AnalystReferralMembershipPlan } from "@/types/analysts/referrals";

const avatarToneStyles: Record<DirectoryAnalyst["avatarTone"], string> = {
  discord: "admin-on-accent bg-[#5865F2] text-white",
  violet: "bg-violet-500/30 text-violet-200",
  emerald: "bg-emerald-500/30 text-emerald-200",
  amber: "bg-amber-500/30 text-amber-100",
  rose: "bg-rose-500/30 text-rose-200",
  sky: "bg-sky-500/30 text-sky-200",
};

const PLAN_ORDER: AnalystReferralMembershipPlan[] = [
  "monthly",
  "quarterly",
  "yearly",
  "lifetime",
];

function statusBadge(status: AnalystLifecycleStatus): { label: string; tone: StatusTone } {
  const map: Record<AnalystLifecycleStatus, { label: string; tone: StatusTone }> = {
    under_review: { label: "Under Review", tone: "warning" },
    verification: { label: "Verification", tone: "info" },
    partnership_discussion: { label: "Partnership", tone: "info" },
    onboarding: { label: "Onboarding", tone: "info" },
    active: { label: "Active", tone: "success" },
    growing: { label: "Growing", tone: "vip" },
    suspended: { label: "Suspended", tone: "danger" },
    closed: { label: "Closed", tone: "neutral" },
  };
  return map[status];
}

function tierLabel(tier: AnalystTier): string {
  if (tier === "none") return "None";
  if (tier === "top_partner") return "Top Partner";
  if (tier === "growing") return "Growing";
  return "Partner";
}

function formatReach(count: number): string {
  if (count >= 1000) return `${(count / 1000).toFixed(count >= 10000 ? 0 : 1)}k`;
  return String(count);
}

type AnalystDirectoryDetailsProps = {
  analyst: DirectoryAnalyst | null;
  className?: string;
};

/**
 * Desktop directory inspection panel — quick preview only.
 * Full operations live in Analyst Control Center (`/admin/analysts/[id]`).
 */
export function AnalystDirectoryDetails({
  analyst,
  className,
}: AnalystDirectoryDetailsProps) {
  if (!analyst) {
    return (
      <div
        className={cn(
          "admin-card-surface flex h-full min-h-[20rem] flex-col items-center justify-center rounded-xl border border-dashed border-white/10 p-6 text-center",
          className
        )}
      >
        <p className="text-sm font-medium text-white">Select an analyst</p>
        <p className="mt-1 max-w-xs text-xs text-tc-muted">
          Choose a row to inspect partnership status, tier, reach, and health.
        </p>
      </div>
    );
  }

  const initials = analyst.handle.slice(0, 2).toUpperCase();
  const status = statusBadge(analyst.status);
  const referral = getMockAnalystReferralByAnalystId(analyst.id);
  const commission = getMockAnalystCommissionByAnalystId(analyst.id);
  const partnered = new Date(analyst.partneredAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

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
              avatarToneStyles[analyst.avatarTone]
            )}
            aria-hidden
          >
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="truncate text-base font-semibold text-white sm:text-lg">
                {analyst.displayName}
              </h2>
              <StatusBadge label={status.label} tone={status.tone} />
            </div>
            <p className="mt-0.5 truncate text-xs text-tc-muted">@{analyst.handle}</p>
            <p className="mt-0.5 truncate text-xs text-tc-muted">{analyst.email}</p>
          </div>
        </div>
      </div>

      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4 sm:p-5">
        <section className="space-y-2">
          <h3 className="text-[11px] font-semibold uppercase tracking-wider text-tc-muted">
            Partnership Summary
          </h3>
          <dl className="space-y-2 text-sm">
            <div className="flex items-center justify-between gap-3">
              <dt className="text-tc-muted">Tier</dt>
              <dd className="text-white/90">{tierLabel(analyst.tier)}</dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="text-tc-muted">Specialization</dt>
              <dd className="truncate text-right text-white/90">{analyst.specialization}</dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="text-tc-muted">Reach</dt>
              <dd className="tabular-nums text-white/90">{formatReach(analyst.reachFollowers)}</dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="text-tc-muted">Partnered</dt>
              <dd className="text-white/90">{partnered}</dd>
            </div>
            <div className="flex items-center justify-between gap-3">
              <dt className="text-tc-muted">Health</dt>
              <dd>
                <SystemHealthBadge state={analyst.systemHealth} />
              </dd>
            </div>
          </dl>
        </section>

        <section className="space-y-2">
          <h3 className="text-[11px] font-semibold uppercase tracking-wider text-tc-muted">
            Referral Summary
          </h3>
          {referral ? (
            <>
              <dl className="space-y-2 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-tc-muted">Total Referrals</dt>
                  <dd className="tabular-nums text-white/90">
                    {referral.totalReferrals}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-tc-muted">Successful Referrals</dt>
                  <dd className="tabular-nums text-white/90">
                    {referral.successfulReferrals}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-tc-muted">Referral Status</dt>
                  <dd>
                    <StatusBadge
                      label={
                        analystReferralStatusPresentation(referral.status).label
                      }
                      tone={
                        analystReferralStatusPresentation(referral.status).tone
                      }
                    />
                  </dd>
                </div>
              </dl>
              <div className="grid grid-cols-2 gap-1.5 pt-1">
                {PLAN_ORDER.map((plan) => (
                  <div
                    key={plan}
                    className="rounded-md border border-white/10 bg-white/[0.02] px-2 py-1.5"
                  >
                    <p className="text-[10px] text-tc-muted">
                      {analystReferralPlanLabel(plan).replace(" Plan", "")}
                    </p>
                    <p className="text-sm font-medium tabular-nums text-white">
                      {referral.planBreakdown[plan]}
                    </p>
                  </div>
                ))}
              </div>
              <Link
                href={`/admin/analysts/referrals?view=directory&referral=${referral.id}`}
                className="inline-flex text-xs font-medium text-violet-300 hover:text-violet-200"
              >
                Manage Referrals →
              </Link>
            </>
          ) : (
            <p className="text-xs text-tc-muted">
              No referral identity yet — provisions after partnership activation.
            </p>
          )}
        </section>

        <section className="space-y-2">
          <h3 className="text-[11px] font-semibold uppercase tracking-wider text-tc-muted">
            Commission Summary
          </h3>
          {commission ? (
            <>
              <dl className="space-y-2 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-tc-muted">Total Earned</dt>
                  <dd className="tabular-nums text-white/90">
                    {formatCommissionUsd(commission.summary.totalEarnedUsd)}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-tc-muted">Amount Payable</dt>
                  <dd className="tabular-nums text-amber-100/90">
                    {formatCommissionUsd(commission.summary.totalPayableUsd)}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-tc-muted">Outstanding Due</dt>
                  <dd className="tabular-nums text-rose-200/90">
                    {formatCommissionUsd(commission.summary.dueAmountUsd)}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-tc-muted">Last Payment</dt>
                  <dd className="text-white/90">
                    {formatCommissionDateShort(commission.summary.lastPayoutAt)}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-tc-muted">Commission Status</dt>
                  <dd>
                    <StatusBadge
                      label={
                        analystCommissionStatusPresentation(
                          commission.commissionStatus
                        ).label
                      }
                      tone={
                        analystCommissionStatusPresentation(
                          commission.commissionStatus
                        ).tone
                      }
                    />
                  </dd>
                </div>
              </dl>
              <Link
                href={`/admin/analysts/commissions?commission=${commission.id}`}
                className="inline-flex text-xs font-medium text-amber-200 hover:text-amber-100"
              >
                Open Commission Dashboard →
              </Link>
            </>
          ) : (
            <p className="text-xs text-tc-muted">
              No commission identity yet — Financial Ops after referral readiness.
            </p>
          )}
        </section>

        <div className="space-y-2 rounded-lg border border-dashed border-white/10 bg-white/[0.02] px-3 py-3">
          <p className="text-xs text-tc-muted">
            Quick preview only. Click the analyst name to open the Control Center for
            partnership operations.
          </p>
          <Link
            href={`/admin/analysts/${analyst.id}`}
            className="inline-flex text-xs font-medium text-violet-300 hover:text-violet-200"
          >
            Open Control Center →
          </Link>
        </div>
      </div>
    </div>
  );
}
