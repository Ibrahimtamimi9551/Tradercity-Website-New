"use client";

import { BarChart3, RefreshCw } from "lucide-react";
import { PageTitle } from "@/components/admin/ui";
import { cn } from "@/lib/admin/cn";
import { MOCK_REFERRAL_INTELLIGENCE } from "@/lib/members/mock/referral-intelligence";
import { ReferralModuleNav } from "../ReferralModuleNav";
import { BusinessInsightsSection } from "./BusinessInsightsSection";
import { MembershipRevenueSection } from "./MembershipRevenueSection";
import { ReferralJourneySection } from "./ReferralJourneySection";
import { ReferralLeaderboardSection } from "./ReferralLeaderboardSection";
import { RevenueOverviewSection } from "./RevenueOverviewSection";
import { RevenueTrendsSection } from "./RevenueTrendsSection";
import { WalletJourneySection } from "./WalletJourneySection";

/**
 * Phase 6 Part 2 — Referral Intelligence Dashboard.
 * Executive BI surface — grouped business modules, not a widget grid.
 */
export function ReferralIntelligencePage() {
  const data = MOCK_REFERRAL_INTELLIGENCE;

  return (
    <div className="space-y-8 sm:space-y-10">
      <div className="space-y-4">
        <PageTitle
          title="Referral Intelligence"
          subtitle="How much business referrals generate, who drives growth, and how healthy the program is."
          icon={BarChart3}
          actions={
            <div className="flex items-center gap-2">
              <span className="hidden text-xs text-tc-muted sm:inline">
                Last Sync:{" "}
                <span className="text-white/80">{data.lastSyncLabel}</span>
              </span>
              <button
                type="button"
                aria-label="Refresh intelligence data"
                className="admin-ghost-btn inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition-colors hover:bg-white/5"
              >
                <RefreshCw className={cn("h-4 w-4")} aria-hidden />
              </button>
            </div>
          }
        />
        <ReferralModuleNav />
      </div>

      <RevenueOverviewSection overview={data.overview} />
      <MembershipRevenueSection cards={data.membershipRevenue} />
      <ReferralJourneySection overview={data.overview} funnel={data.funnel} />
      <RevenueTrendsSection trends={data.trends} />
      <WalletJourneySection wallet={data.wallet} />
      <ReferralLeaderboardSection
        contributors={data.leaderboard}
        totalReferralRevenue={data.totalReferralRevenue}
      />
      <BusinessInsightsSection insights={data.insights} />
    </div>
  );
}
