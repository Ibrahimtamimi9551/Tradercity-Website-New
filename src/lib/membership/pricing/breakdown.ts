/**
 * Pricing breakdown — catalog price → adjustments → final payable.
 *
 * Always keep standard (catalog) price intact for Admin revenue / analytics.
 * Adjustments are layered; final payable is what the member sends.
 */

import { MEMBERSHIP_PLANS, type MembershipPlanId } from "@/lib/membership/plans";
import {
  resolveEligibleAdjustments,
  type PricingAdjustmentType,
  type PricingContext,
} from "@/lib/membership/pricing/adjustments";

export type AppliedPricingAdjustment = {
  id: string;
  type: PricingAdjustmentType;
  label: string;
  /** Positive USD amount deducted from standard price */
  amountUsd: number;
  /** Display as a reduction, e.g. "-$10" */
  amountDisplay: string;
};

export type PriceBreakdown = {
  /** Official catalog list price — never mutated by promotions */
  standardPriceUsd: number;
  standardPriceDisplay: string;
  /** Ordered list of applied adjustments (empty when none) */
  adjustments: AppliedPricingAdjustment[];
  /** Sum of adjustment amounts (positive = total discount) */
  totalAdjustmentsUsd: number;
  totalAdjustmentsDisplay: string | null;
  /** What the member actually pays */
  finalPayableUsd: number;
  finalPayableDisplay: string;
};

function formatUsd(amount: number): string {
  return `$${amount.toFixed(amount % 1 === 0 ? 0 : 2)}`;
}

/**
 * Compute payable amount: Standard Price − Σ(eligible adjustments).
 * Does not change catalog prices.
 */
export function getPriceBreakdown(context: PricingContext): PriceBreakdown {
  const plan = MEMBERSHIP_PLANS[context.planId];
  const definitions = resolveEligibleAdjustments(context);

  const adjustments: AppliedPricingAdjustment[] = definitions.map((def) => ({
    id: def.id,
    type: def.type,
    label: def.name,
    amountUsd: def.amountUsd,
    amountDisplay: `-$${def.amountUsd}`,
  }));

  const totalAdjustmentsUsd = adjustments.reduce((sum, a) => sum + a.amountUsd, 0);
  const finalPayableUsd = Math.max(0, plan.priceUsd - totalAdjustmentsUsd);

  return {
    standardPriceUsd: plan.priceUsd,
    standardPriceDisplay: plan.priceDisplay,
    adjustments,
    totalAdjustmentsUsd,
    totalAdjustmentsDisplay:
      totalAdjustmentsUsd > 0 ? `-$${totalAdjustmentsUsd}` : null,
    finalPayableUsd,
    finalPayableDisplay: formatUsd(finalPayableUsd),
  };
}

/** Convenience wrapper when only a plan id + welcome-credit flag is known. */
export function getPriceBreakdownForPlan(
  planId: MembershipPlanId,
  options?: { applyWelcomeCredit?: boolean }
): PriceBreakdown {
  return getPriceBreakdown({
    planId,
    applyWelcomeCredit: options?.applyWelcomeCredit,
  });
}
