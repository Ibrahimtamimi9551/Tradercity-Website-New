/**
 * Official membership plan catalog for Admin + member surfaces.
 * SSOT: `src/lib/membership/plans.ts` — Monthly $60 / Quarterly $150 / Yearly $500.
 * Lifetime and Custom plans are not part of TraderCity.
 *
 * Pricing adjustments + Payment Quote: `src/lib/membership/pricing/`
 * Payment verification (FUTURE types only): `src/lib/membership/verification/`
 *
 * Full stack: docs/AI/Agents/Admin/08_Subscription_Pricing_and_Payment_Verification_Architecture.md
 */
export type {
  MembershipPlanId,
  MembershipPlanType,
  MembershipPlan,
} from "@/lib/membership/plans";

export type {
  PricingAdjustmentType,
  PricingAdjustmentId,
  PricingAdjustmentDefinition,
  PricingContext,
  AppliedPricingAdjustment,
  PriceBreakdown,
  PaymentQuote,
} from "@/lib/membership/pricing";

export type {
  PaymentVerificationOutcome,
  PaymentVerificationInput,
  PaymentVerificationResult,
  PaymentVerificationCapability,
  PaymentAmountMatch,
} from "@/lib/membership/verification";
