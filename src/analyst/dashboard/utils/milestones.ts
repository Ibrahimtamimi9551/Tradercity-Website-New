import { ANALYST_COMMISSION_TIER_BANDS } from "@/types/analysts/commissions";
import type { MilestoneRow } from "@/analyst/dashboard/types";
import { formatUsd } from "@/analyst/dashboard/utils/format";

const MILESTONE_META = [
  { id: "bronze" as const, name: "Bronze Analyst" },
  { id: "silver" as const, name: "Silver Analyst" },
  { id: "gold" as const, name: "Gold Analyst" },
  { id: "diamond" as const, name: "Diamond Analyst" },
];

/** Presentation labels over Management-owned tier bands. */
export function buildMilestoneRows(
  cumulativeEarningsUsd: number,
  currentSharePercent: number
): MilestoneRow[] {
  return ANALYST_COMMISSION_TIER_BANDS.map((band, index) => {
    const meta = MILESTONE_META[index];
    const max = band.maxBusinessUsd;
    const requiredLabel =
      max === null
        ? `Greater than ${formatUsd(band.minBusinessUsd)}`
        : band.minBusinessUsd === 0
          ? `Less than ${formatUsd(max)}`
          : `${formatUsd(band.minBusinessUsd)} – ${formatUsd(max)}`;

    const isUnlocked = cumulativeEarningsUsd >= band.minBusinessUsd;
    const isCurrent = currentSharePercent === band.analystSharePercent;

    let progressPercent = 0;
    if (isCurrent) {
      if (max === null) {
        progressPercent = 100;
      } else {
        const span = Math.max(1, max - band.minBusinessUsd);
        progressPercent = Math.min(
          100,
          Math.max(
            0,
            Math.round(
              ((cumulativeEarningsUsd - band.minBusinessUsd) / span) * 100
            )
          )
        );
      }
    } else if (isUnlocked) {
      progressPercent = 100;
    }

    return {
      id: meta.id,
      name: meta.name,
      requiredLabel,
      sharePercent: band.analystSharePercent,
      isCurrent,
      isUnlocked,
      progressPercent,
    };
  });
}

export function milestoneNameForShare(sharePercent: number): string {
  const idx = ANALYST_COMMISSION_TIER_BANDS.findIndex(
    (b) => b.analystSharePercent === sharePercent
  );
  return MILESTONE_META[idx]?.name ?? "Partner";
}

export function milestoneHelperMessage(
  currentSharePercent: number,
  nextSharePercent: number | null
): string {
  if (nextSharePercent === null) {
    return `You are currently earning ${currentSharePercent}% commission. You have reached the Diamond Analyst tier.`;
  }
  const nextBand = ANALYST_COMMISSION_TIER_BANDS.find(
    (b) => b.analystSharePercent === nextSharePercent
  );
  const threshold = nextBand?.minBusinessUsd ?? 0;
  return `You are currently earning ${currentSharePercent}% commission. Reach ${formatUsd(threshold)} cumulative referral earnings to unlock ${nextSharePercent}% commission.`;
}
