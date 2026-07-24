"use client";

import {
  computeNextTierProgress,
  computeTierBandProgress,
  formatCommissionUsd,
} from "@/lib/analysts/format-commissions";

type CommissionTierProgressProps = {
  monthlyBusinessUsd: number;
  currentTierPercent: number;
};

/**
 * Visual progress toward the next commission tier.
 */
export function CommissionTierProgress({
  monthlyBusinessUsd,
  currentTierPercent,
}: CommissionTierProgressProps) {
  const next = computeNextTierProgress(monthlyBusinessUsd);
  const progress = computeTierBandProgress(monthlyBusinessUsd);
  const filled = Math.round(progress * 12);

  return (
    <div className="space-y-2 rounded-lg border border-white/8 bg-black/20 px-3 py-2.5">
      <div className="flex items-center justify-between gap-2 text-sm">
        <span className="text-tc-muted">Current</span>
        <span className="tabular-nums font-medium text-white">
          {formatCommissionUsd(monthlyBusinessUsd)}
        </span>
      </div>
      <div
        className="flex gap-0.5"
        role="meter"
        aria-valuenow={Math.round(progress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Progress toward next commission tier"
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className={
              i < filled
                ? "h-2 flex-1 rounded-sm bg-amber-400"
                : "h-2 flex-1 rounded-sm bg-white/10"
            }
          />
        ))}
      </div>
      <div className="flex items-center justify-between gap-2 text-sm">
        <span className="text-tc-muted">Need</span>
        <span className="tabular-nums text-white/90">
          {next.nextAnalystSharePercent === null
            ? "—"
            : formatCommissionUsd(next.remainingUsd)}
        </span>
      </div>
      <div className="flex items-center justify-between gap-2 border-t border-white/10 pt-2 text-sm">
        <span className="text-tc-muted">Next Tier</span>
        <span className="font-semibold text-amber-100">
          {next.nextAnalystSharePercent === null
            ? "Already Maximum"
            : `${next.nextAnalystSharePercent}%`}
        </span>
      </div>
      <p className="text-[11px] text-tc-muted">
        Current tier {currentTierPercent}%
        {next.nextAnalystSharePercent !== null
          ? ` · ${next.label}`
          : " · top band reached"}
      </p>
    </div>
  );
}
