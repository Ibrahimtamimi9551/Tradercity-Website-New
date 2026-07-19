"use client";

import { SectionHeader } from "@/components/admin/ui";
import { modulePanelAccent, modulePanelSurface } from "@/lib/admin/module-surfaces";
import type { MembershipRevenueCard } from "@/types/members/referral-intelligence";
import { formatCount, formatPercent, formatUsd } from "./format";

const PLAN_TONE = {
  monthly: "purple",
  quarterly: "navy",
  yearly: "gold",
} as const;

type Props = {
  cards: MembershipRevenueCard[];
};

export function MembershipRevenueSection({ cards }: Props) {
  return (
    <section>
      <SectionHeader
        title="Membership Revenue"
        description="Which membership plans benefit most from referrals."
      />
      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((card) => {
          const tone = PLAN_TONE[card.plan];
          return (
            <div key={card.plan} className={modulePanelSurface(tone, "space-y-4")}>
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold text-white">{card.label}</h3>
                <span className={`text-xs font-medium ${modulePanelAccent(tone)}`}>
                  {formatPercent(card.referralContributionPercent)} of plan revenue
                </span>
              </div>

              <p className="text-3xl font-semibold tracking-tight text-white tabular-nums">
                {formatUsd(card.revenue)}
              </p>
              <p className="text-xs text-tc-muted">Referral-attributed revenue</p>

              <dl className="grid grid-cols-2 gap-3 border-t border-white/10 pt-4">
                <div>
                  <dt className="text-[11px] text-tc-muted">Purchases</dt>
                  <dd className="mt-0.5 text-sm font-medium text-white tabular-nums">
                    {formatCount(card.purchases)}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] text-tc-muted">Avg order value</dt>
                  <dd className="mt-0.5 text-sm font-medium text-white tabular-nums">
                    {formatUsd(card.averageOrderValue)}
                  </dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-[11px] text-tc-muted">Referral contribution</dt>
                  <dd className="mt-2">
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-violet-400/80"
                        style={{ width: `${Math.min(card.referralContributionPercent, 100)}%` }}
                      />
                    </div>
                  </dd>
                </div>
              </dl>
            </div>
          );
        })}
      </div>
    </section>
  );
}
