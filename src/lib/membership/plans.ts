/**
 * Official TraderCity membership plans — single source of truth for list prices.
 *
 * Layer: Membership Catalog
 * Stack: Catalog → Pricing Engine → Payment Verification (future) → Activation → Discord
 * See: docs/AI/Agents/Admin/08_Subscription_Pricing_and_Payment_Verification_Architecture.md
 *
 * Used by Homepage Pricing, Payment Flow, VIP Activation,
 * Member Dashboard, Admin Dashboard, and backend membership configuration assumptions.
 *
 * Promotions and credits are NOT defined here — see `pricing/`.
 * Blockchain verification is NOT defined here — see `verification/` (types only).
 * Do not change catalog prices for campaigns.
 *
 * Do not reintroduce Lifetime, Custom, or Arena pricing without an explicit product decision.
 */

export type MembershipPlanId = "monthly" | "quarterly" | "yearly";

export type MembershipPlanType = "MONTHLY" | "QUARTERLY" | "YEARLY";

export type MembershipPlan = {
  id: MembershipPlanId;
  type: MembershipPlanType;
  /** Display label for admin / payment UIs */
  label: string;
  /** USD list price */
  priceUsd: number;
  /** Formatted display price, e.g. "$60" */
  priceDisplay: string;
  /** Formatted amount for receipts / tables, e.g. "$60.00" */
  amountPaidDisplay: string;
  durationDays: number;
  durationLabel: string;
  periodLabel: string;
};

export const MEMBERSHIP_PLANS: Record<MembershipPlanId, MembershipPlan> = {
  monthly: {
    id: "monthly",
    type: "MONTHLY",
    label: "Monthly",
    priceUsd: 60,
    priceDisplay: "$60",
    amountPaidDisplay: "$60.00",
    durationDays: 30,
    durationLabel: "30 DAYS",
    periodLabel: "/ month",
  },
  quarterly: {
    id: "quarterly",
    type: "QUARTERLY",
    label: "Quarterly",
    priceUsd: 150,
    priceDisplay: "$150",
    amountPaidDisplay: "$150.00",
    durationDays: 90,
    durationLabel: "90 DAYS",
    periodLabel: "/ 3 months",
  },
  yearly: {
    id: "yearly",
    type: "YEARLY",
    label: "Yearly",
    priceUsd: 500,
    priceDisplay: "$500",
    amountPaidDisplay: "$500.00",
    durationDays: 365,
    durationLabel: "365 DAYS",
    periodLabel: "/ year",
  },
};

export const MEMBERSHIP_PLAN_LIST: MembershipPlan[] = [
  MEMBERSHIP_PLANS.monthly,
  MEMBERSHIP_PLANS.quarterly,
  MEMBERSHIP_PLANS.yearly,
];

export function getMembershipPlan(id: MembershipPlanId): MembershipPlan {
  return MEMBERSHIP_PLANS[id];
}

export function formatPlanWithPrice(id: MembershipPlanId): string {
  const plan = MEMBERSHIP_PLANS[id];
  return `${plan.label} → ${plan.priceDisplay}`;
}
