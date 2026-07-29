import { MEMBERSHIP_ACTIVATION_SOURCE_LABELS } from "@/types/members/activation-source";
import type { MembershipActivationSource } from "@/types/members/activation-source";
import type { ManualPayment } from "@/types/members/manual-payment";
import type { MemberProfile } from "@/types/members/profile";
import type { SubscriptionTicket } from "@/types/members/subscription";
import { MOCK_MANUAL_PAYMENTS } from "@/lib/members/mock/manual-payments";
import { MOCK_SUBSCRIPTION_TICKETS } from "@/lib/members/mock/subscriptions";

/**
 * Membership Activation Source — mock single source of truth.
 *
 * Partition (no duplicate members across payment sources):
 *   Crypto  → m-001, m-002, m-003, m-004, m-007, m-009, m-011
 *   Manual  → m-005, m-006, m-008, m-010, m-012
 *
 * Profile / Control Center subscription reflection MUST resolve through
 * these helpers so Activation Source stays consistent with payment tables.
 *
 * TODO(NestJS): replace with Membership.activationSource + joined payment APIs
 */

export const CRYPTO_PAYMENT_MEMBER_IDS = [
  "m-001",
  "m-002",
  "m-003",
  "m-004",
  "m-007",
  "m-009",
  "m-011",
] as const;

export const MANUAL_PAYMENT_MEMBER_IDS = [
  "m-005",
  "m-006",
  "m-008",
  "m-010",
  "m-012",
] as const;

/** Explicit overrides for VIP members without a payment-ticket record. */
const FALLBACK_ACTIVATION_SOURCE: Record<string, MembershipActivationSource> = {
  // Reserved for future Referral Redeem / Admin Grant demos when needed.
};

export function findCryptoTicketByMemberId(
  memberId: string
): SubscriptionTicket | null {
  return (
    MOCK_SUBSCRIPTION_TICKETS.find((ticket) => ticket.memberId === memberId) ??
    null
  );
}

export function findManualPaymentByMemberId(
  memberId: string
): ManualPayment | null {
  const matches = MOCK_MANUAL_PAYMENTS.filter((p) => p.memberId === memberId);
  if (matches.length === 0) return null;
  return (
    matches.find((p) => p.status === "activated") ??
    matches.find((p) => p.status === "pending") ??
    matches[0] ??
    null
  );
}

/**
 * Resolve the single Membership Activation Source for a member.
 * Payment table membership wins; never returns both.
 */
export function resolveMemberActivationSource(
  memberId: string
): MembershipActivationSource | null {
  if (findManualPaymentByMemberId(memberId)) return "manual_payment";
  if (findCryptoTicketByMemberId(memberId)) return "crypto_payment";
  return FALLBACK_ACTIVATION_SOURCE[memberId] ?? null;
}

function daysUntil(iso: string | null | undefined): number | null {
  if (!iso) return null;
  const target = new Date(iso).getTime();
  if (Number.isNaN(target)) return null;
  const diff = Math.ceil((target - Date.now()) / (1000 * 60 * 60 * 24));
  return diff;
}

/**
 * Build Control Center / Profile subscription reflection from the owning
 * payment record (Crypto ticket or Manual Payment).
 */
export function buildSubscriptionFromActivation(
  memberId: string
): MemberProfile["subscription"] | null {
  const manual = findManualPaymentByMemberId(memberId);
  if (manual) return subscriptionFromManualPayment(manual);

  const crypto = findCryptoTicketByMemberId(memberId);
  if (crypto) return subscriptionFromCryptoTicket(crypto);

  return null;
}

function subscriptionFromCryptoTicket(
  ticket: SubscriptionTicket
): MemberProfile["subscription"] {
  const approved = ticket.displayStatus === "approved";
  const verifying = ticket.displayStatus === "blockchain_verifying";
  const verificationRequired =
    ticket.displayStatus === "verification_required";

  return {
    plan: ticket.planLabel,
    statusLabel: ticket.statusLabel,
    statusTone: ticket.statusTone,
    paymentDate: ticket.submittedAt,
    expiryDate: ticket.membershipResult?.expiryAt ?? null,
    daysRemaining: daysUntil(ticket.membershipResult?.expiryAt),
    renewalCount: approved ? 1 : 0,
    activatedVia: MEMBERSHIP_ACTIVATION_SOURCE_LABELS.crypto_payment,
    activationSource: "crypto_payment",
    transactionHash: ticket.transactionHash,
    explorerUrl: ticket.explorerUrl,
    paymentMethod: ticket.paymentMethod,
    amountPaid: ticket.actualAmount
      ? `${ticket.actualAmount} ${ticket.currency}`
      : `${ticket.expectedAmount} ${ticket.currency}`,
    notes: ticket.verification.notes ?? ticket.approval.reason,
    approvedBy: ticket.approval.decidedBy,
    activationDate: ticket.membershipResult?.activatedAt ?? null,
    referenceNumber: null,
    receivedDate: null,
    receivedBy: null,
    reason: null,
    creditsRedeemed: null,
    networkLabel: ticket.networkLabel,
    verificationLabel: ticket.verification.resultLabel,
    verificationTone: ticket.verification.resultTone,
    approvalLabel:
      ticket.approval.decision === "approved"
        ? "Approved"
        : ticket.approval.decision === "rejected"
          ? "Rejected"
          : verifying
            ? "—"
            : verificationRequired
              ? "Pending investigation"
              : "Approval Pending",
  };
}

function subscriptionFromManualPayment(
  payment: ManualPayment
): MemberProfile["subscription"] {
  const activated = payment.status === "activated";

  return {
    plan: payment.planLabel,
    statusLabel:
      payment.status === "activated"
        ? "Successful"
        : payment.status === "pending"
          ? "Pending Activation"
          : "Cancelled",
    statusTone: payment.statusTone,
    paymentDate: payment.receivedAt,
    expiryDate: payment.membershipResult?.expiryAt ?? null,
    daysRemaining: daysUntil(payment.membershipResult?.expiryAt),
    renewalCount: payment.membershipResult?.renewalCount ?? (activated ? 1 : 0),
    activatedVia: MEMBERSHIP_ACTIVATION_SOURCE_LABELS.manual_payment,
    activationSource: "manual_payment",
    transactionHash: null,
    explorerUrl: null,
    paymentMethod: payment.paymentMethodLabel,
    amountPaid: `${payment.amount} ${payment.currency}`,
    notes: payment.notes,
    approvedBy: payment.activatedBy ?? payment.receivedBy,
    activationDate: payment.activatedAt,
    referenceNumber: payment.referenceNumber,
    receivedDate: payment.receivedAt,
    receivedBy: payment.receivedBy,
    reason: payment.reasonLabel,
    creditsRedeemed: null,
    networkLabel: null,
    verificationLabel: null,
    verificationTone: null,
    approvalLabel: null,
  };
}
