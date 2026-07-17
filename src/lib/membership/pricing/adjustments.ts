/**
 * Pricing adjustments — independent of the official membership catalog.
 *
 * Catalog list prices live in `../plans.ts` and must not change for campaigns.
 * Adjustments (credits, coupons, promos, etc.) layer on top as reductions (or
 * future surcharges) and are summed by the pricing breakdown engine.
 *
 * Do not invent backend APIs here — definitions + eligibility helpers only.
 */

import type { MembershipPlanId } from "@/lib/membership/plans";

/**
 * Supported adjustment kinds. Only `welcome_credit` is active today;
 * remaining values are reserved extension points — do not implement yet.
 */
export type PricingAdjustmentType =
  | "welcome_credit"
  | "referral_credit"
  | "coupon_discount"
  | "promotional_campaign"
  | "seasonal_offer"
  | "admin_credit"
  | "wallet_balance";

/** Stable ids for concrete adjustment definitions in the registry. */
export type PricingAdjustmentId = "welcome_credit";

export type PricingAdjustmentDefinition = {
  id: PricingAdjustmentId;
  type: PricingAdjustmentType;
  /** Admin / reporting label */
  name: string;
  /** Short member-facing headline */
  headline: string;
  /** Positive USD amount subtracted from catalog price when applied */
  amountUsd: number;
  amountDisplay: string;
  /** Plans this adjustment may apply to */
  applicablePlanIds: readonly MembershipPlanId[];
  oncePerAccount: boolean;
  /** Human-readable rules for docs / UI helpers */
  rules: readonly string[];
};

/**
 * Welcome Credit — $10 off first Monthly VIP purchase.
 * Business rules unchanged; architecture is generic for future adjustment types.
 */
export const WELCOME_CREDIT: PricingAdjustmentDefinition = {
  id: "welcome_credit",
  type: "welcome_credit",
  name: "Welcome Credit",
  headline: "New Member Offer",
  amountUsd: 10,
  amountDisplay: "$10",
  applicablePlanIds: ["monthly"],
  oncePerAccount: true,
  rules: [
    "Granted once per account after signup + Free Community join",
    "Only if the user has never purchased a VIP membership before",
    "Non-transferable",
    "Only applicable to the first Monthly VIP purchase",
    "Automatically consumed on first successful VIP activation",
    "Cannot be reused after first successful VIP activation",
  ],
};

/** Active adjustment definitions. Add future campaigns here without changing plans.ts. */
export const PRICING_ADJUSTMENTS = {
  welcome_credit: WELCOME_CREDIT,
} as const;

/**
 * Purchase context used to decide which adjustments are eligible.
 * Extend with coupon codes, referral balances, etc. when NestJS exposes them —
 * without restructuring the catalog or breakdown model.
 */
export type PricingContext = {
  planId: MembershipPlanId;
  /** Eligible new member — apply Welcome Credit when plan allows */
  applyWelcomeCredit?: boolean;
  // Future (not implemented):
  // applyReferralCredit?: boolean;
  // couponCode?: string;
  // adminCreditUsd?: number;
  // walletBalanceUsd?: number;
};

/**
 * Resolve eligible adjustment definitions for a purchase context.
 * Today: Welcome Credit only. Future adjustments register here.
 */
export function resolveEligibleAdjustments(
  context: PricingContext
): PricingAdjustmentDefinition[] {
  const eligible: PricingAdjustmentDefinition[] = [];

  if (
    context.applyWelcomeCredit === true &&
    WELCOME_CREDIT.applicablePlanIds.includes(context.planId)
  ) {
    eligible.push(WELCOME_CREDIT);
  }

  return eligible;
}
