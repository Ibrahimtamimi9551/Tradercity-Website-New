"use client";

import { SectionHeader } from "@/components/admin/ui";
import { modulePanelSurface } from "@/lib/admin/module-surfaces";
import type { ReferralIntelligenceOverview } from "@/types/members/referral-intelligence";
import { formatPercent, formatUsd } from "./format";
import { IntelligencePanelMetric } from "./IntelligencePanelMetric";

type Props = {
  overview: ReferralIntelligenceOverview;
};

/**
 * Executive snapshot — one financial hero + supporting performance metrics.
 */
export function RevenueOverviewSection({ overview }: Props) {
  return (
    <section>
      <SectionHeader
        title="Revenue Overview"
        description="How much business referrals generate — and how efficient the program is."
      />
      <div className={modulePanelSurface("burgundy", "p-5 sm:p-6")}>
        <IntelligencePanelMetric
          label="Total Referral Revenue"
          value={formatUsd(overview.totalReferralRevenue)}
          hint="All-time membership revenue attributed to referrals"
          emphasize
        />

        <div className="mt-6 grid gap-5 border-t border-white/10 pt-5 sm:grid-cols-3 sm:gap-6">
          <IntelligencePanelMetric
            label="Revenue This Month"
            value={formatUsd(overview.revenueThisMonth)}
            hint="Current calendar month"
          />
          <IntelligencePanelMetric
            label="Conversion Rate"
            value={formatPercent(overview.conversionRate)}
            hint="Registered → successful membership"
          />
          <IntelligencePanelMetric
            label="Avg Revenue per Referrer"
            value={formatUsd(overview.averageRevenuePerReferrer)}
            hint="Among active referrers"
          />
        </div>
      </div>
    </section>
  );
}
