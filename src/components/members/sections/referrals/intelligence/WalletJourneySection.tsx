"use client";

import { SectionHeader } from "@/components/admin/ui";
import { modulePanelSurface } from "@/lib/admin/module-surfaces";
import { cn } from "@/lib/admin/cn";
import type { WalletIntelligence } from "@/types/members/referral-intelligence";
import { formatPercent, formatUsd } from "./format";
import { IntelligencePanelMetric } from "./IntelligencePanelMetric";

type Props = {
  wallet: WalletIntelligence;
};

type LifecycleStage = {
  id: string;
  label: string;
  value: number;
  hint: string;
  barClass: string;
  /** Share of issued credits (Issued = 100%). */
  ofIssuedPercent: number;
};

/**
 * Wallet Journey — credit lifecycle storytelling, parallel to Referral Journey.
 * Answers: how do referral credits move through the platform economy?
 */
export function WalletJourneySection({ wallet }: Props) {
  const issued = Math.max(wallet.totalCreditsIssued, 1);

  const stages: LifecycleStage[] = [
    {
      id: "issued",
      label: "Credits Issued",
      value: wallet.totalCreditsIssued,
      hint: "Lifetime rewards created for referrers",
      barClass: "bg-emerald-400/80",
      ofIssuedPercent: 100,
    },
    {
      id: "redeemed",
      label: "Credits Redeemed",
      value: wallet.creditsRedeemed,
      hint: "Consumed against membership purchases",
      barClass: "bg-teal-400/80",
      ofIssuedPercent: (wallet.creditsRedeemed / issued) * 100,
    },
    {
      id: "unused",
      label: "Unused Referral Credits",
      value: wallet.unusedReferralCredits,
      hint: "Still sitting in member wallets",
      barClass: "bg-amber-400/75",
      ofIssuedPercent: (wallet.unusedReferralCredits / issued) * 100,
    },
  ];

  return (
    <section>
      <SectionHeader
        title="Wallet Journey"
        description="How referral credits move through the economy — issued, redeemed, and still unused."
      />

      <div className={modulePanelSurface("emerald", "space-y-0 overflow-hidden p-0")}>
        <div className="p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-xs font-medium uppercase tracking-wider text-emerald-200/90">
                Credit Lifecycle
              </h3>
              <p className="mt-1 text-xs text-tc-muted">
                Flow of every referral credit from creation to redemption.
              </p>
            </div>
            <div className="rounded-lg border border-emerald-500/25 bg-black/20 px-3.5 py-2 text-right">
              <p className="text-[10px] font-medium uppercase tracking-wider text-tc-muted">
                Redemption Rate
              </p>
              <p className="mt-0.5 text-xl font-semibold tabular-nums text-emerald-300">
                {formatPercent(wallet.redemptionRate)}
              </p>
              <p className="text-[10px] text-tc-muted">Redeemed ÷ issued</p>
            </div>
          </div>

          <div className="mt-5 space-y-1">
            {stages.map((stage, index) => {
              const widthPct = Math.max(stage.ofIssuedPercent, 8);
              return (
                <div key={stage.id}>
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-[11px] font-semibold text-emerald-200">
                          {index + 1}
                        </span>
                        <div>
                          <p className="text-sm font-medium text-white">{stage.label}</p>
                          <p className="text-[11px] text-tc-muted">{stage.hint}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-base font-semibold tabular-nums text-white">
                          {formatUsd(stage.value)}
                        </span>
                        {stage.id !== "issued" ? (
                          <span className="tabular-nums text-tc-muted">
                            {formatPercent(stage.ofIssuedPercent)} of issued
                          </span>
                        ) : (
                          <span className="text-emerald-300/80">100% pool</span>
                        )}
                      </div>
                    </div>
                    <div className="h-3.5 overflow-hidden rounded-full bg-white/[0.06]">
                      <div
                        className={cn(
                          "h-full rounded-full transition-[width]",
                          stage.barClass
                        )}
                        style={{ width: `${widthPct}%` }}
                      />
                    </div>
                  </div>
                  {index < stages.length - 1 ? (
                    <div className="flex justify-center py-1.5" aria-hidden>
                      <div className="h-4 w-px bg-white/15" />
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>

        <div className="border-t border-white/10 p-5 sm:p-6">
          <h3 className="text-xs font-medium uppercase tracking-wider text-emerald-200/90">
            Wallet Distribution
          </h3>
          <p className="mt-1 text-xs text-tc-muted">
            Supporting balance metrics across member wallets.
          </p>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 sm:gap-6">
            <IntelligencePanelMetric
              label="Average Wallet Balance"
              value={formatUsd(wallet.averageWalletBalance)}
              hint="Mean unused credits per wallet"
            />
            <IntelligencePanelMetric
              label="Highest Wallet Balance"
              value={formatUsd(wallet.highestWalletBalance)}
              hint="Largest single member credit balance"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
