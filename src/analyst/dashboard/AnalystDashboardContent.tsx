"use client";

import { Cormorant_Garamond } from "next/font/google";
import {
  CommissionMilestonesModule,
  CommissionOverviewModule,
  HelpSupportModule,
  HeroModule,
  OverviewModule,
  PayoutModule,
  PerformanceSnapshotModule,
  RecentPayoutsModule,
  ReferralGrowthModule,
  ReferralSummaryModule,
  RequestStatusModule,
} from "@/analyst/dashboard/modules";
import { useAnalystDashboardContext } from "@/analyst/dashboard/context/useAnalystDashboardContext";
import { PayoutFlowModal } from "@/analyst/dashboard/ui/PayoutFlowModal";
import { WalletModal } from "@/analyst/dashboard/ui/WalletModal";
import { analystTheme } from "@/analyst/dashboard/theme/analyst-theme";
import TraderCityLogo from "@/components/home/navigation/TraderCityLogo";

const displaySerif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export default function AnalystDashboardContent() {
  const { error, isLoading, display } = useAnalystDashboardContext();

  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 py-6 md:px-8 md:py-8">
      <header className="mb-8 grid grid-cols-1 items-center gap-5 lg:grid-cols-[1fr_auto_1fr]">
        <div className="flex items-center gap-3 justify-self-start">
          <TraderCityLogo className="h-10 w-10" showGlow />
          <div className="min-w-0">
            <p
              className="truncate text-[15px] font-bold tracking-[0.22em]"
              style={{ color: analystTheme.accentMuted }}
            >
              TRADERCITY
            </p>
            <p className="mt-0.5 truncate text-[10px] leading-snug text-white/65">
              Multiple Perspectives.{" "}
              <span className="font-medium text-tc-cyan">Better</span> Decisions.
            </p>
          </div>
        </div>

        <div className="hidden items-center gap-4 justify-self-center lg:flex">
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#9B5DE5]/70" />
          <h1
            className={`${displaySerif.className} text-[22px] font-semibold tracking-wide`}
            style={{ color: analystTheme.accentMuted }}
          >
            Analyst Dashboard
          </h1>
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#9B5DE5]/70" />
        </div>

        <div className="flex items-center justify-self-end gap-3">
          {isLoading ? (
            <p className="text-xs text-white/40">Syncing partner data…</p>
          ) : display ? (
            <div className="rounded-full border border-white/10 bg-white/[0.04] py-1 pl-1 pr-3">
              <div className="flex items-center gap-2.5">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ background: analystTheme.accentStrong }}
                >
                  {display.hero.displayName.slice(0, 1)}
                </div>
                <div className="hidden text-left sm:block">
                  <p className="text-sm font-medium text-white">
                    {display.hero.displayName}
                  </p>
                  <p
                    className="text-[10px]"
                    style={{ color: analystTheme.accentMuted }}
                  >
                    Partner Workspace
                  </p>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div className="col-span-full flex items-center justify-center gap-3 lg:hidden">
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#9B5DE5]/70" />
          <h1
            className={`${displaySerif.className} text-lg font-semibold tracking-wide`}
            style={{ color: analystTheme.accentMuted }}
          >
            Analyst Dashboard
          </h1>
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#9B5DE5]/70" />
        </div>
      </header>

      {error ? (
        <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      ) : null}

      <main className="flex flex-col gap-5 md:gap-6">
        <HeroModule />
        <OverviewModule />
        <PerformanceSnapshotModule />
        <ReferralGrowthModule />
        <ReferralSummaryModule />
        <CommissionMilestonesModule />
        <CommissionOverviewModule />
        <div id="analyst-payout-center">
          <PayoutModule />
        </div>
        <RequestStatusModule />
        <RecentPayoutsModule />
        <HelpSupportModule />
      </main>

      <footer className="mt-10 border-t border-white/5 pt-6 text-center text-xs text-white/35 md:text-left">
        Analyst Management manages. Analyst Dashboard visualizes.
      </footer>

      <WalletModal />
      <PayoutFlowModal />
    </div>
  );
}
