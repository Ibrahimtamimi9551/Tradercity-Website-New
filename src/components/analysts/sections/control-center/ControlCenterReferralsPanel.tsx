"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { Gift } from "lucide-react";
import { StatusBadge } from "@/components/admin/ui";
import { modulePanelSurface } from "@/lib/admin/module-surfaces";
import {
  analystReferralPlanLabel,
  analystReferralStatusPresentation,
  formatAnalystReferralDate,
  formatShortReferralLink,
} from "@/lib/analysts/format-referrals";
import { getMockAnalystReferralByAnalystId } from "@/lib/analysts/mock/referrals";
import type { AnalystControlCenter } from "@/types/analysts/control-center";
import type { AnalystReferralMembershipPlan } from "@/types/analysts/referrals";

type ControlCenterReferralsPanelProps = {
  profile: AnalystControlCenter;
};

const PLAN_ORDER: AnalystReferralMembershipPlan[] = [
  "monthly",
  "quarterly",
  "yearly",
  "lifetime",
];

/**
 * Control Center Referrals tab — concise summary of the Referrals domain.
 * Full operations live in `/admin/analysts/referrals`.
 */
export function ControlCenterReferralsPanel({
  profile,
}: ControlCenterReferralsPanelProps) {
  const record = getMockAnalystReferralByAnalystId(profile.id);

  return (
    <section className={modulePanelSurface("purple", "space-y-4")}>
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-violet-400/30 bg-black/25 text-violet-200">
          <Gift className="h-4 w-4" aria-hidden />
        </div>
        <div>
          <h2 className="text-sm font-medium text-white sm:text-base">
            Referrals
          </h2>
          <p className="text-xs text-tc-muted">
            Partnership growth summary · Referrals domain owns ops
          </p>
        </div>
      </div>

      {record ? (
        <>
          <dl className="space-y-2.5 text-sm">
            <Row
              label="Referral Status"
              value={
                <StatusBadge
                  label={analystReferralStatusPresentation(record.status).label}
                  tone={analystReferralStatusPresentation(record.status).tone}
                />
              }
            />
            <Row
              label="Referral Code"
              value={
                <span className="font-mono text-violet-200">
                  {record.referralCode}
                </span>
              }
            />
            <Row
              label="Referral Link"
              value={
                <span className="font-mono text-xs">
                  {formatShortReferralLink(record.referralToken)}
                </span>
              }
            />
            <Row
              label="Total Referrals"
              value={
                <span className="tabular-nums">{record.totalReferrals}</span>
              }
            />
            <Row
              label="Successful Referrals"
              value={
                <span className="tabular-nums">
                  {record.successfulReferrals}
                </span>
              }
            />
            <Row
              label="Activated"
              value={formatAnalystReferralDate(record.activationDate)}
            />
          </dl>

          <div>
            <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-tc-muted">
              Successful Referral Breakdown
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {PLAN_ORDER.map((plan) => (
                <div
                  key={plan}
                  className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2"
                >
                  <p className="text-[11px] text-tc-muted">
                    {analystReferralPlanLabel(plan)}
                  </p>
                  <p className="mt-0.5 text-base font-semibold tabular-nums text-white">
                    {record.planBreakdown[plan]}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            <Link
              href={`/admin/analysts/referrals?view=directory&referral=${record.id}`}
              className="rounded-lg border border-violet-400/30 bg-violet-500/10 px-3.5 py-2 text-sm font-medium text-violet-200 hover:bg-violet-500/20"
            >
              Open Referral Profile
            </Link>
            <Link
              href="/admin/analysts/referrals?view=performance"
              className="rounded-lg border border-white/15 bg-white/5 px-3.5 py-2 text-sm font-medium text-white/80 hover:bg-white/10"
            >
              Referral Performance
            </Link>
          </div>
        </>
      ) : (
        <div className="rounded-lg border border-dashed border-white/10 bg-black/20 px-4 py-8 text-center">
          <p className="text-sm text-white/85">No referral identity yet</p>
          <p className="mt-2 text-xs text-tc-muted">
            Referral identity provisions after partnership activation and
            activates when Operationally Ready.
          </p>
          <Link
            href="/admin/analysts/referrals"
            className="mt-3 inline-flex text-xs font-medium text-violet-300 hover:text-violet-200"
          >
            Open Referrals domain →
          </Link>
        </div>
      )}
    </section>
  );
}

function Row({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-tc-muted">{label}</dt>
      <dd className="min-w-0 truncate text-right text-white/90">{value}</dd>
    </div>
  );
}
