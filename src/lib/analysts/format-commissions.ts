import type { StatusTone } from "@/types/admin/common";
import {
  ANALYST_COMMISSION_CURRENT_CYCLE,
  ANALYST_COMMISSION_TIER_BANDS,
  ANALYST_REFERRAL_CREDIT_USD,
  type AnalystCommissionCreditPlan,
  type AnalystCommissionLifecycleStatus,
  type AnalystCommissionLineFilter,
  type AnalystCommissionLineItem,
  type AnalystCommissionNextTier,
  type AnalystCommissionPayoutStatus,
  type AnalystCommissionPlanBreakdown,
  type AnalystCommissionStatus,
  type AnalystCommissionStatusPresentation,
  type AnalystCommissionTier,
} from "@/types/analysts/commissions";
import type { AnalystReferralPlanBreakdown } from "@/types/analysts/referrals";

export const COMMISSION_CREDIT_PLANS: AnalystCommissionCreditPlan[] = [
  "monthly",
  "quarterly",
  "yearly",
];

export function formatCommissionUsd(amount: number): string {
  const abs = Math.abs(amount);
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: abs % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(abs);
  return amount < 0 ? `−${formatted}` : formatted;
}

export function formatCommissionDate(iso: string | null | undefined): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(d);
}

export function formatCommissionDateShort(iso: string | null | undefined): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
  }).format(d);
}

export function shortenWalletAddress(address: string, edges = 4): string {
  if (address.length <= edges * 2 + 3) return address;
  return `${address.slice(0, edges + 2)}…${address.slice(-edges)}`;
}

export function shortenTxHash(hash: string, edges = 6): string {
  if (hash.length <= edges * 2 + 3) return hash;
  return `${hash.slice(0, edges + 2)}…${hash.slice(-edges)}`;
}

export async function copyTextToClipboard(value: string): Promise<boolean> {
  if (typeof navigator === "undefined" || !navigator.clipboard) return false;
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    return false;
  }
}

export function analystCommissionStatusPresentation(
  status: AnalystCommissionStatus
): AnalystCommissionStatusPresentation {
  const map: Record<AnalystCommissionStatus, { label: string; tone: StatusTone }> =
    {
      none: { label: "No earnings", tone: "neutral" },
      ready: { label: "Ready for Payment", tone: "warning" },
      overdue: { label: "Overdue", tone: "danger" },
      paid: { label: "Paid", tone: "success" },
    };
  return map[status];
}

export function analystCommissionLifecyclePresentation(
  status: AnalystCommissionLifecycleStatus
): AnalystCommissionStatusPresentation {
  const map: Record<
    AnalystCommissionLifecycleStatus,
    { label: string; tone: StatusTone }
  > = {
    ready: { label: "Ready for Payment", tone: "warning" },
    paid: { label: "Paid", tone: "success" },
  };
  return map[status];
}

export function analystCommissionPayoutStatusPresentation(
  status: AnalystCommissionPayoutStatus
): AnalystCommissionStatusPresentation {
  const map: Record<
    AnalystCommissionPayoutStatus,
    { label: string; tone: StatusTone }
  > = {
    ready: { label: "Ready for Payment", tone: "warning" },
    scheduled: { label: "Scheduled", tone: "info" },
    paid: { label: "Paid", tone: "success" },
  };
  return map[status];
}

export function analystCommissionPlanLabel(
  plan: AnalystCommissionCreditPlan
): string {
  const map: Record<AnalystCommissionCreditPlan, string> = {
    monthly: "Monthly Plan",
    quarterly: "Quarterly Plan",
    yearly: "Yearly Plan",
  };
  return map[plan];
}

export function referralCreditForPlan(plan: AnalystCommissionCreditPlan): number {
  return ANALYST_REFERRAL_CREDIT_USD[plan];
}

/**
 * Build plan credit breakdown from successful referral counts × fixed rates.
 * Lifetime referral counts are ignored — not part of Commission credit model.
 */
export function buildPlanBreakdownFromReferralCounts(
  counts: AnalystReferralPlanBreakdown
): AnalystCommissionPlanBreakdown {
  return {
    monthly: {
      referralCount: counts.monthly,
      unitCreditUsd: ANALYST_REFERRAL_CREDIT_USD.monthly,
      earnedUsd: counts.monthly * ANALYST_REFERRAL_CREDIT_USD.monthly,
    },
    quarterly: {
      referralCount: counts.quarterly,
      unitCreditUsd: ANALYST_REFERRAL_CREDIT_USD.quarterly,
      earnedUsd: counts.quarterly * ANALYST_REFERRAL_CREDIT_USD.quarterly,
    },
    yearly: {
      referralCount: counts.yearly,
      unitCreditUsd: ANALYST_REFERRAL_CREDIT_USD.yearly,
      earnedUsd: counts.yearly * ANALYST_REFERRAL_CREDIT_USD.yearly,
    },
  };
}

export function emptyCommissionPlanBreakdown(): AnalystCommissionPlanBreakdown {
  return buildPlanBreakdownFromReferralCounts({
    monthly: 0,
    quarterly: 0,
    yearly: 0,
    lifetime: 0,
  });
}

/** Auto-resolve analyst share % from monthly business (not manually editable). */
export function resolveAnalystSharePercent(
  monthlyBusinessUsd: number
): 40 | 50 | 60 | 70 {
  for (let i = ANALYST_COMMISSION_TIER_BANDS.length - 1; i >= 0; i--) {
    const band = ANALYST_COMMISSION_TIER_BANDS[i];
    if (monthlyBusinessUsd >= band.minBusinessUsd) {
      return band.analystSharePercent;
    }
  }
  return 40;
}

export function buildCommissionTier(
  billingCycleMonth: string,
  cumulativeBusinessUsd: number
): AnalystCommissionTier {
  const analystSharePercent = resolveAnalystSharePercent(cumulativeBusinessUsd);
  return {
    billingCycleMonth,
    cumulativeBusinessUsd,
    analystSharePercent,
    traderCitySharePercent: 100 - analystSharePercent,
  };
}

export function computeNextTierProgress(
  cumulativeBusinessUsd: number
): AnalystCommissionNextTier {
  const current = resolveAnalystSharePercent(cumulativeBusinessUsd);
  if (current === 70) {
    return {
      nextAnalystSharePercent: null,
      remainingUsd: 0,
      label: "Already Maximum",
    };
  }
  const nextBand = ANALYST_COMMISSION_TIER_BANDS.find(
    (b) => b.analystSharePercent > current
  );
  if (!nextBand) {
    return {
      nextAnalystSharePercent: null,
      remainingUsd: 0,
      label: "Already Maximum",
    };
  }
  const remainingUsd = Math.max(
    0,
    Math.ceil((nextBand.minBusinessUsd - cumulativeBusinessUsd) * 100) / 100
  );
  return {
    nextAnalystSharePercent: nextBand.analystSharePercent,
    remainingUsd,
    label: `Need ${formatCommissionUsd(remainingUsd)} More`,
  };
}

/** 0–1 progress within the current tier band toward the next threshold. */
export function computeTierBandProgress(cumulativeBusinessUsd: number): number {
  const current = resolveAnalystSharePercent(cumulativeBusinessUsd);
  if (current === 70) return 1;
  const currentBand = ANALYST_COMMISSION_TIER_BANDS.find(
    (b) => b.analystSharePercent === current
  );
  const nextBand = ANALYST_COMMISSION_TIER_BANDS.find(
    (b) => b.analystSharePercent > current
  );
  if (!currentBand || !nextBand) return 1;
  const span = nextBand.minBusinessUsd - currentBand.minBusinessUsd;
  if (span <= 0) return 1;
  return Math.min(
    1,
    Math.max(0, (cumulativeBusinessUsd - currentBand.minBusinessUsd) / span)
  );
}

export function formatCommissionTierLabel(tier: AnalystCommissionTier): string {
  return `${tier.analystSharePercent}% analyst · ${tier.traderCitySharePercent}% TraderCity`;
}

export function formatBillingCycleMonth(month: string): string {
  const [y, m] = month.split("-").map(Number);
  if (!y || !m) return month;
  return new Intl.DateTimeFormat("en-GB", {
    month: "long",
    year: "numeric",
  }).format(new Date(Date.UTC(y, m - 1, 1)));
}

export function billingCycleFromIso(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return ANALYST_COMMISSION_CURRENT_CYCLE;
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

export function roundCommissionUsd(amount: number): number {
  return Math.round(amount * 100) / 100;
}

export function analystShareFromGross(
  grossUsd: number,
  analystSharePercent: number
): number {
  return roundCommissionUsd(grossUsd * (analystSharePercent / 100));
}

export function memberProfileHref(memberId: string): string {
  return `/admin/members/${memberId}`;
}

function isInCalendarMonth(iso: string, year: number, monthIndex: number): boolean {
  const d = new Date(iso);
  return d.getUTCFullYear() === year && d.getUTCMonth() === monthIndex;
}

export function filterCommissionLines(
  lines: AnalystCommissionLineItem[],
  filter: AnalystCommissionLineFilter,
  now = new Date()
): AnalystCommissionLineItem[] {
  if (filter === "all") return lines;

  if (filter === "monthly" || filter === "quarterly" || filter === "yearly") {
    return lines.filter((l) => l.conversion.membershipPlan === filter);
  }

  if (filter === "paid" || filter === "ready") {
    return lines.filter((l) => l.status === filter);
  }

  const y = now.getUTCFullYear();
  const m = now.getUTCMonth();
  if (filter === "this_month") {
    return lines.filter((l) =>
      isInCalendarMonth(l.conversion.purchaseDate, y, m)
    );
  }

  const prev = new Date(Date.UTC(y, m - 1, 1));
  return lines.filter((l) =>
    isInCalendarMonth(
      l.conversion.purchaseDate,
      prev.getUTCFullYear(),
      prev.getUTCMonth()
    )
  );
}

export function aggregatePlanBreakdownFromLines(
  lines: AnalystCommissionLineItem[]
): AnalystCommissionPlanBreakdown {
  const base = emptyCommissionPlanBreakdown();
  for (const line of lines) {
    const plan = line.conversion.membershipPlan;
    base[plan].referralCount += 1;
    base[plan].earnedUsd += line.grossUsd;
  }
  return base;
}
