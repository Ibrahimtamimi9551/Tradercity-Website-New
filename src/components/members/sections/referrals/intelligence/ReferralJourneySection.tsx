"use client";

import { SectionHeader } from "@/components/admin/ui";
import { modulePanelSurface } from "@/lib/admin/module-surfaces";
import { cn } from "@/lib/admin/cn";
import type {
  FunnelStage,
  ReferralIntelligenceOverview,
} from "@/types/members/referral-intelligence";
import { formatCount, formatPercent } from "./format";
import { IntelligencePanelMetric } from "./IntelligencePanelMetric";

type Props = {
  overview: ReferralIntelligenceOverview;
  funnel: FunnelStage[];
};

/**
 * Unified Referral Journey — lifecycle snapshot + drop-off funnel as one story.
 */
export function ReferralJourneySection({ overview, funnel }: Props) {
  const max = Math.max(...funnel.map((s) => s.count), 1);

  return (
    <section>
      <SectionHeader
        title="Referral Journey"
        description="How referred users progress through the journey — and where they drop off."
      />

      <div className={modulePanelSurface("purple", "space-y-0 overflow-hidden p-0")}>
        <div className="p-5 sm:p-6">
          <h3 className="text-xs font-medium uppercase tracking-wider text-violet-200/90">
            Lifecycle Summary
          </h3>
          <p className="mt-1 text-xs text-tc-muted">
            How many users are at each stage of the referral program.
          </p>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
            <IntelligencePanelMetric
              label="Registered Referrals"
              value={formatCount(overview.registeredReferrals)}
              hint="Joined via a referral link"
            />
            <IntelligencePanelMetric
              label="Membership In Progress"
              value={formatCount(overview.membershipInProgress)}
              hint="Plan selected / payment stage"
            />
            <IntelligencePanelMetric
              label="Successful Memberships"
              value={formatCount(overview.successfulMemberships)}
              hint="Payment verified & activated"
            />
            <IntelligencePanelMetric
              label="Conversion Rate"
              value={formatPercent(overview.conversionRate)}
              hint="Registered → successful membership"
            />
          </div>
        </div>

        <div className="border-t border-white/10 p-5 sm:p-6">
          <h3 className="text-xs font-medium uppercase tracking-wider text-violet-200/90">
            Journey Funnel
          </h3>
          <p className="mt-1 text-xs text-tc-muted">
            Where users drop off across the referral journey.
          </p>

          <div className="mt-5 space-y-1">
            {funnel.map((stage, index) => {
              const widthPct = Math.max((stage.count / max) * 100, 8);
              return (
                <div key={stage.id}>
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-500/20 text-[11px] font-semibold text-violet-200">
                          {index + 1}
                        </span>
                        <p className="text-sm font-medium text-white">{stage.label}</p>
                      </div>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="tabular-nums text-white/90">
                          {formatCount(stage.count)}
                        </span>
                        {stage.dropOffPercent != null && stage.dropOffPercent > 0 ? (
                          <span className="tabular-nums text-rose-300/90">
                            −{formatPercent(stage.dropOffPercent)} drop-off
                          </span>
                        ) : stage.dropOffPercent === 0 ? (
                          <span className="text-emerald-300/80">No drop-off</span>
                        ) : null}
                      </div>
                    </div>
                    <div className="h-3.5 overflow-hidden rounded-full bg-white/[0.06]">
                      <div
                        className={cn(
                          "h-full rounded-full transition-[width]",
                          index === 0 && "bg-blue-400/80",
                          index === 1 && "bg-violet-400/80",
                          index === 2 && "bg-amber-400/75",
                          index === 3 && "bg-emerald-400/80",
                          index === 4 && "bg-teal-400/80",
                          index === 5 && "bg-rose-400/75"
                        )}
                        style={{ width: `${widthPct}%` }}
                      />
                    </div>
                  </div>
                  {index < funnel.length - 1 ? (
                    <div className="flex justify-center py-1.5" aria-hidden>
                      <div className="h-4 w-px bg-white/15" />
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
