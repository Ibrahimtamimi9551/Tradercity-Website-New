/**
 * Membership pricing engine — public API.
 *
 * Layer: Pricing Engine — determines expected payable for a user/context.
 * Issues a Payment Quote conceptually when the member starts paying.
 * Does NOT verify payments (that is Payment Verification — future).
 *
 * Catalog: `../plans.ts`
 * Adjustments: `./adjustments.ts`
 * Calculation: `./breakdown.ts`
 * Quote: `./quote.ts`
 * Verification (future types): `../verification/`
 *
 * Flow: Catalog → Pricing Engine → Payment Quote → User Pays → Verification → Activation
 *
 * Architecture: docs/AI/Agents/Admin/08_Subscription_Pricing_and_Payment_Verification_Architecture.md
 */

import { MEMBERSHIP_PLANS } from "@/lib/membership/plans";
import { WELCOME_CREDIT } from "@/lib/membership/pricing/adjustments";
import { getPriceBreakdownForPlan } from "@/lib/membership/pricing/breakdown";

export type {
  PricingAdjustmentType,
  PricingAdjustmentId,
  PricingAdjustmentDefinition,
  PricingContext,
} from "@/lib/membership/pricing/adjustments";

export {
  WELCOME_CREDIT,
  PRICING_ADJUSTMENTS,
  resolveEligibleAdjustments,
} from "@/lib/membership/pricing/adjustments";

export type {
  AppliedPricingAdjustment,
  PriceBreakdown,
} from "@/lib/membership/pricing/breakdown";

export {
  getPriceBreakdown,
  getPriceBreakdownForPlan,
} from "@/lib/membership/pricing/breakdown";

export type { PaymentQuote } from "@/lib/membership/pricing/quote";

export { createPaymentQuoteFromBreakdown } from "@/lib/membership/pricing/quote";

/**
 * Promo copy for the Monthly pricing card (visually secondary to catalog price).
 * Sourced from Welcome Credit + pricing breakdown — shared by Homepage Pricing.
 */
const monthlyWithWelcome = getPriceBreakdownForPlan("monthly", {
  applyWelcomeCredit: true,
});

const welcomeAdjustment = monthlyWithWelcome.adjustments[0];

export const WELCOME_CREDIT_MONTHLY_OFFER_COPY = {
  title: WELCOME_CREDIT.headline,
  bodyLead: "Get ",
  bodyEmphasis: `${WELCOME_CREDIT.amountDisplay} OFF`,
  bodyTrail: " your first Monthly VIP membership.",
  payableLead: "First payment: ",
  payableAmount: monthlyWithWelcome.finalPayableDisplay,
  payableMid: " instead of ",
  standardAmount: MEMBERSHIP_PLANS.monthly.priceDisplay,
  payableEnd: ".",
} as const;

/**
 * Upgrade CTA payment breakdown — Free Dashboard, Payment Activation readiness.
 * Standard Price / Welcome Credit / Amount Payable all from the pricing engine.
 */
export const MONTHLY_WELCOME_UPGRADE_CTA = {
  standardPriceLabel: "Standard Price",
  adjustmentLabel: WELCOME_CREDIT.name,
  amountPayableLabel: "Amount Payable",
  standardPriceDisplay: monthlyWithWelcome.standardPriceDisplay,
  adjustmentAmountDisplay: welcomeAdjustment?.amountDisplay ?? null,
  finalPayableDisplay: monthlyWithWelcome.finalPayableDisplay,
  footnote: `Membership price remains ${MEMBERSHIP_PLANS.monthly.priceDisplay}. Eligible new members receive a one-time ${WELCOME_CREDIT.amountDisplay} credit on their first Monthly VIP purchase.`,
  chip: `${WELCOME_CREDIT.name} · once per account`,
  /** Catalog + breakdown for surfaces that need full objects */
  breakdown: monthlyWithWelcome,
  credit: WELCOME_CREDIT,
} as const;
