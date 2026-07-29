import type { StatusTone } from "@/types/admin/common";
import type { MembershipActivationSource } from "@/types/members/activation-source";

/**
 * Admin display states for Subscription tickets.
 * No Expired — expiry belongs to Membership.
 * URL key: `status=` (Dashboard / widget deep-links).
 *
 * Ownership:
 * - blockchain_verifying → System (no admin action)
 * - verification_required → Admin investigation
 * - approval_pending → Admin final approval (auto-verified)
 */
export type SubscriptionDisplayStatus =
  | "blockchain_verifying"
  | "approval_pending"
  | "verification_required"
  | "rejected"
  | "approved";

/** System verification outcome (Verification ≠ Approval). */
export type SubscriptionVerificationResult =
  | "pending"
  | "verifying"
  | "verified"
  | "failed"
  | "overpaid"
  | "underpaid"
  | "ambiguous";

export type SubscriptionVerificationMethod = "automatic" | "manual_assist";

export type SubscriptionNetwork = "bep20" | "erc20" | "trc20";

export type SubscriptionPlanKey = "monthly" | "quarterly" | "yearly";

export type SubscriptionAvatarTone =
  | "discord"
  | "violet"
  | "emerald"
  | "amber"
  | "rose"
  | "sky";

export type SubscriptionTimelineEvent = {
  id: string;
  title: string;
  description?: string;
  timestamp: string;
  status: "complete" | "current" | "pending" | "error";
};

export type SubscriptionVerification = {
  result: SubscriptionVerificationResult;
  resultLabel: string;
  resultTone: StatusTone;
  method: SubscriptionVerificationMethod;
  verifiedAt: string | null;
  notes: string | null;
};

export type SubscriptionApproval = {
  decision: "pending" | "approved" | "rejected";
  decidedAt: string | null;
  decidedBy: string | null;
  reason: string | null;
};

export type SubscriptionMembershipResult = {
  plan: string;
  statusLabel: string;
  statusTone: StatusTone;
  activatedAt: string | null;
  expiryAt: string | null;
  discordSyncLabel: string | null;
};

/**
 * Why automatic verification failed — drives Payment Resolution UI.
 * Present only when `displayStatus === "verification_required"`.
 */
export type PaymentFailureReason =
  | "amount_mismatch"
  | "invalid_transaction_hash"
  | "wrong_network"
  | "duplicate_transaction"
  | "wallet_mismatch"
  | "verification_timeout"
  | "blockchain_verification_failed"
  | "unknown_transaction";

export type PaymentResolutionChecklistItem = {
  id: string;
  label: string;
  done: boolean;
};

export type PaymentResolutionNote = {
  id: string;
  body: string;
  author: string;
  createdAt: string;
};

/**
 * Structured investigation workspace for Verification Required tickets.
 * Contact info reuses ticket `username` / `email` from payment activation.
 */
export type PaymentResolution = {
  failureReason: PaymentFailureReason;
  failureReasonLabel: string;
  detectedAmount: string | null;
  expectedAmount: string;
  currency: string;
  submittedWallet: string;
  expectedWallet: string;
  checklist: PaymentResolutionChecklistItem[];
  /** Instructional evidence types the admin should request — no upload yet. */
  evidenceRequests: string[];
  notes: PaymentResolutionNote[];
  startedAt: string | null;
  memberContactedAt: string | null;
};

export const PAYMENT_FAILURE_REASON_LABELS: Record<PaymentFailureReason, string> =
  {
    amount_mismatch: "Amount Mismatch",
    invalid_transaction_hash: "Invalid Transaction Hash",
    wrong_network: "Wrong Network",
    duplicate_transaction: "Duplicate Transaction",
    wallet_mismatch: "Wallet Mismatch",
    verification_timeout: "Verification Timeout",
    blockchain_verification_failed: "Blockchain Verification Failed",
    unknown_transaction: "Unknown Transaction",
  };

export type SubscriptionTicket = {
  id: string;
  /** TraderCity member id — Control Center / directory deep-links. */
  memberId: string;
  username: string;
  email: string;
  avatarTone: SubscriptionAvatarTone;
  /** Phase 4 mocks are crypto_payment only; contract supports future sources. */
  activationSource: MembershipActivationSource;
  displayStatus: SubscriptionDisplayStatus;
  statusLabel: string;
  statusTone: StatusTone;
  planKey: SubscriptionPlanKey;
  planLabel: string;
  network: SubscriptionNetwork;
  networkLabel: string;
  walletAddress: string;
  transactionHash: string;
  explorerUrl: string;
  expectedAmount: string;
  actualAmount: string | null;
  currency: string;
  paymentMethod: string;
  submittedAt: string;
  verification: SubscriptionVerification;
  approval: SubscriptionApproval;
  membershipResult: SubscriptionMembershipResult | null;
  /**
   * Payment Resolution workspace — mock-populated for Verification Required only.
   * Hidden in UI for all other display states.
   */
  resolution?: PaymentResolution | null;
  timeline: SubscriptionTimelineEvent[];
};

export type SubscriptionFilters = {
  search: string;
  /** URL key: `status` */
  status: SubscriptionDisplayStatus | "all";
  plan: SubscriptionPlanKey | "all";
  network: SubscriptionNetwork | "all";
  /** URL key: `verification` — system verification result */
  verification: SubscriptionVerificationResult | "all";
};

export type SubscriptionStats = {
  approvalPending: number;
  blockchainVerifying: number;
  verificationRequired: number;
  rejected: number;
  approved: number;
  lastRefreshLabel: string;
};

export const SUBSCRIPTION_DISPLAY_STATUS_LABELS: Record<
  SubscriptionDisplayStatus,
  string
> = {
  blockchain_verifying: "Blockchain Verifying",
  approval_pending: "Approval Pending",
  verification_required: "Verification Required",
  rejected: "Rejected",
  approved: "Approved",
};

export const SUBSCRIPTION_DISPLAY_STATUS_TONES: Record<
  SubscriptionDisplayStatus,
  StatusTone
> = {
  blockchain_verifying: "info",
  approval_pending: "warning",
  verification_required: "danger",
  rejected: "danger",
  approved: "success",
};

/** Whether the ticket is in an admin-actionable decision state. */
export function subscriptionRequiresAdminDecision(
  status: SubscriptionDisplayStatus
): boolean {
  return status === "approval_pending" || status === "verification_required";
}
