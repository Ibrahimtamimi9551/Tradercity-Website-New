/**
 * Payment Quote — conceptual business object (frontend type only).
 *
 * Issued when the member starts / commits to a payment flow.
 * Freezes the Pricing Engine decision (standard price, adjustments, expected amount)
 * so Verification compares against THAT decision — not a later recalculation.
 *
 * Why a quote (not live recalculation)?
 * - Coupon validity may change
 * - Promotions may expire
 * - Referral credits may be revoked
 * - Catalog plan prices may change
 *
 * Backend may persist this as a "Payment Quote", "Payment Intent", or equivalent.
 * Frontend does not invent schema or APIs — this is a product / state shape.
 *
 * Architecture: docs/AI/Agents/Admin/08_Subscription_Pricing_and_Payment_Verification_Architecture.md
 */

import type { MembershipPlanId } from "@/lib/membership/plans";
import type { PriceBreakdown } from "@/lib/membership/pricing/breakdown";

/**
 * Frozen pricing decision for one payment attempt.
 * Verification must use this quote — never re-run the Pricing Engine at verify time.
 */
export type PaymentQuote = {
  /**
   * Identifier for this quote (backend-assigned when persisted).
   * Placeholder on the frontend until the capability exists.
   */
  quoteId: string;
  userId: string;
  planId: MembershipPlanId;
  /**
   * Immutable pricing breakdown at issue time:
   * Standard Price → Adjustments → Expected / Final Payable.
   */
  breakdown: PriceBreakdown;
  /**
   * Expected amount the member should pay.
   * MUST equal `breakdown.finalPayableUsd` when the quote is issued.
   */
  expectedAmountUsd: number;
  /** ISO timestamp when the quote was created */
  issuedAt: string;
  /**
   * Optional quote validity window (product concept).
   * Backend decides whether/how expiry is enforced.
   */
  expiresAt: string | null;
};

/**
 * Build a Payment Quote from a PriceBreakdown (frontend helper for UI / mocks).
 * Does not persist — persistence is a backend capability.
 */
export function createPaymentQuoteFromBreakdown(params: {
  quoteId: string;
  userId: string;
  planId: MembershipPlanId;
  breakdown: PriceBreakdown;
  issuedAt?: string;
  expiresAt?: string | null;
}): PaymentQuote {
  return {
    quoteId: params.quoteId,
    userId: params.userId,
    planId: params.planId,
    breakdown: params.breakdown,
    expectedAmountUsd: params.breakdown.finalPayableUsd,
    issuedAt: params.issuedAt ?? new Date().toISOString(),
    expiresAt: params.expiresAt ?? null,
  };
}
