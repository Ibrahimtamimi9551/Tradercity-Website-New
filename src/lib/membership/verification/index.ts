/**
 * Payment Verification — public API (frontend types & pure helpers only).
 *
 * Capability stack (product):
 *   Membership Catalog (`../plans.ts`)
 *   → Pricing Engine (`../pricing/`)
 *   → Payment Verification (this module — FUTURE capability)
 *   → Membership Activation
 *   → Discord Access
 *
 * Pricing answers: what should this user pay?
 * Payment Quote freezes that answer for one payment attempt.
 * Verification answers: did payment received match that quote?
 *
 * Backend owns implementation. Frontend owns product behavior, UI states, and types.
 * See docs/AI/Agents/Admin/08_Subscription_Pricing_and_Payment_Verification_Architecture.md
 */

export type {
  PaymentVerificationOutcome,
  PaymentVerificationInput,
  PaymentVerificationResult,
  PaymentVerificationCapability,
  PaymentAmountMatch,
} from "@/lib/membership/verification/types";

export {
  classifyPaymentAmountMatch,
  ADMIN_DISPLAY_TO_VERIFICATION_OUTCOMES,
} from "@/lib/membership/verification/types";

/*
 * FUTURE (backend-owned):
 * - Issue / persist Payment Quote when member starts payment
 * - Accept payment proof tied to that quote
 * - Validate received amount against quote.expectedAmountUsd (not a live recalculation)
 * - On Verified: move ticket to Awaiting Admin Approval (do NOT activate Membership)
 * - On Admin Approve: activate membership, grant Discord VIP access, persist subscription, audit
 * - Surface verification + approval outcomes to member + admin UIs
 *
 * Do not invent API paths, schemas, or chain-polling clients in this frontend.
 */
