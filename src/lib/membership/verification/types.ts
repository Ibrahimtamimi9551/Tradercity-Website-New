/**
 * Payment Verification — frontend types & capability placeholders only.
 *
 * NOT IMPLEMENTED. No blockchain RPC, API clients, or fake verifiers.
 *
 * Functional requirement (product):
 *   Validate that payment received matches the Payment Quote issued for
 *   THIS user / THIS attempt — never re-run Pricing Engine at verify time,
 *   and never assume plan list prices (e.g. Monthly === $60).
 *
 * Backend owns how quotes are persisted and how verification is built.
 * These types describe frontend state models and required capabilities only.
 *
 * Architecture: docs/AI/Agents/Admin/08_Subscription_Pricing_and_Payment_Verification_Architecture.md
 */

import type { MembershipPlanId } from "@/lib/membership/plans";
import type { PaymentQuote } from "@/lib/membership/pricing/quote";
import type { PriceBreakdown } from "@/lib/membership/pricing";

/**
 * Product / UI verification outcomes (documentation states).
 * Admin UI today consolidates to a smaller display set; expand when backend exposes them.
 */
export type PaymentVerificationOutcome =
  | "pending"
  | "verifying"
  | "successful"
  | "overpaid"
  | "underpaid"
  | "expired"
  | "failed"
  | "cancelled"
  | "refund_required";

/**
 * Information verification will need (capability / frontend state shape).
 * Not a database schema or API contract — backend chooses persistence & transport.
 *
 * Prefer verifying against `paymentQuote` (frozen pricing decision).
 * Loose breakdown fields remain for display / migration clarity.
 */
export type PaymentVerificationInput = {
  discordUsername: string;
  userId: string;
  planId: MembershipPlanId;
  /**
   * Payment Quote issued when the member started this payment attempt.
   * Verification MUST use quote.expectedAmountUsd — not a live recalculation.
   */
  paymentQuote: PaymentQuote;
  /**
   * Denormalized for convenience; MUST equal `paymentQuote.expectedAmountUsd`.
   */
  expectedPayableUsd: number;
  /** Mirror of quote.breakdown for UI without nested access */
  pricingBreakdown: PriceBreakdown;
  transactionHash: string;
  walletAddress: string;
  /** e.g. "BNB Smart Chain (BEP20)" */
  network: string;
  /** ISO timestamp when member submitted payment proof */
  paymentSubmittedAt: string;
};

/**
 * Result of expected vs received comparison (product outcome shape for UI).
 */
export type PaymentVerificationResult = {
  outcome: PaymentVerificationOutcome;
  /** Quote being verified against */
  quoteId: string;
  expectedPayableUsd: number;
  /** Amount observed as paid; null while pending / verifying */
  receivedAmountUsd: number | null;
  /** ISO timestamp of comparison; null if not yet compared */
  comparedAt: string | null;
  notes: string | null;
};

/**
 * Capability contract the backend must satisfy functionally.
 * Frontend will consume whatever API the backend exposes — this is not a NestJS spec.
 */
export type PaymentVerificationCapability = {
  /** Resolve the Payment Quote tied to a submitted payment proof */
  getPaymentQuote(submissionId: string): Promise<PaymentQuote>;

  /**
   * Validate received payment against the quote's expected amount.
   * Must not re-run Pricing Engine or branch on catalog list prices alone.
   */
  verify(
    input: PaymentVerificationInput,
    receivedAmountUsd: number
  ): Promise<PaymentVerificationResult>;
};

/**
 * Product rule as a type-level invariant:
 *   successful  ⇔  receivedAmountUsd === quote.expectedAmountUsd
 *   underpaid   ⇔  received < expected
 *   overpaid    ⇔  received > expected
 */
export type PaymentAmountMatch =
  | { kind: "match"; expectedPayableUsd: number; receivedAmountUsd: number }
  | { kind: "underpaid"; expectedPayableUsd: number; receivedAmountUsd: number }
  | { kind: "overpaid"; expectedPayableUsd: number; receivedAmountUsd: number };

/** Pure helper for UI / docs examples — not a blockchain verifier. */
export function classifyPaymentAmountMatch(
  expectedPayableUsd: number,
  receivedAmountUsd: number
): PaymentAmountMatch {
  if (receivedAmountUsd === expectedPayableUsd) {
    return { kind: "match", expectedPayableUsd, receivedAmountUsd };
  }
  if (receivedAmountUsd < expectedPayableUsd) {
    return { kind: "underpaid", expectedPayableUsd, receivedAmountUsd };
  }
  return { kind: "overpaid", expectedPayableUsd, receivedAmountUsd };
}

/**
 * Admin Subscriptions display states today vs richer product outcomes later.
 * Expand Admin badges when the backend exposes more detail — do not invent UI states early.
 */
export const ADMIN_DISPLAY_TO_VERIFICATION_OUTCOMES = {
  pending_verification: ["pending", "verifying"] as const,
  verification_required: [
    "underpaid",
    "overpaid",
    "expired",
    "failed",
    "refund_required",
  ] as const,
  successful: ["successful"] as const,
  rejected: ["cancelled", "failed"] as const,
} as const;
