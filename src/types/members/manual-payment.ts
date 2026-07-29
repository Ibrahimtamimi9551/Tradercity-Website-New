import type { StatusTone } from "@/types/admin/common";
import type { SubscriptionAvatarTone, SubscriptionPlanKey } from "@/types/members/subscription";

/**
 * Manual Payment — independent Membership Activation Source.
 * No blockchain verification lifecycle; administrator confirms receipt.
 *
 * Statuses stay intentionally simple (sibling of Crypto Payment tickets).
 */
export type ManualPaymentStatus = "pending" | "activated" | "cancelled";

export type ManualPaymentMethod =
  | "bank_transfer"
  | "upi"
  | "cash"
  | "paypal"
  | "wise"
  | "exchange_transfer"
  | "other";

export type ManualPaymentReason =
  | "new_membership"
  | "renewal"
  | "upgrade"
  | "membership_extension"
  | "manual_correction"
  | "special_approval"
  | "other";

export type ManualPaymentCurrency = "USD" | "USDT" | "EUR" | "GBP" | "INR";

export type ManualPaymentTimelineEvent = {
  id: string;
  title: string;
  description?: string;
  timestamp: string;
  status: "complete" | "current" | "pending" | "error";
};

export type ManualPaymentMembershipResult = {
  plan: string;
  statusLabel: string;
  statusTone: StatusTone;
  activatedAt: string | null;
  expiryAt: string | null;
  renewalCount: number;
  discordSyncLabel: string | null;
};

/**
 * Backend-compatible Manual Payment record.
 * TODO(NestJS): align with POST/GET /admin/subscriptions/manual-payments
 */
export type ManualPayment = {
  id: string;
  /**
   * Linked Member ID when resolved; null when payment was recorded against a
   * free-text Discord username before account exists.
   * TODO(NestJS): backfill after username → member resolution.
   */
  memberId: string | null;
  username: string;
  email: string | null;
  avatarTone: SubscriptionAvatarTone;
  planKey: SubscriptionPlanKey;
  planLabel: string;
  paymentMethod: ManualPaymentMethod;
  paymentMethodLabel: string;
  amount: string;
  currency: ManualPaymentCurrency;
  receivedAt: string;
  referenceNumber: string | null;
  receivedBy: string;
  reason: ManualPaymentReason;
  reasonLabel: string;
  notes: string | null;
  status: ManualPaymentStatus;
  statusLabel: string;
  statusTone: StatusTone;
  activatedBy: string | null;
  activatedAt: string | null;
  membershipResult: ManualPaymentMembershipResult | null;
  timeline: ManualPaymentTimelineEvent[];
  createdAt: string;
};

export type ManualPaymentFilters = {
  search: string;
  status: ManualPaymentStatus | "all";
  plan: SubscriptionPlanKey | "all";
  paymentMethod: ManualPaymentMethod | "all";
  /** ISO date (yyyy-mm-dd) inclusive start — empty = no bound */
  dateFrom: string;
  /** ISO date (yyyy-mm-dd) inclusive end — empty = no bound */
  dateTo: string;
};

export type ManualPaymentStats = {
  pending: number;
  activated: number;
  cancelled: number;
  lastRefreshLabel: string;
};

/** Payload for Create Manual Payment (frontend form → mock / future NestJS). */
export type ManualPaymentCreateInput = {
  /** Free-text Discord username — may not match an existing member yet. */
  username: string;
  planKey: SubscriptionPlanKey;
  amount: string;
  currency: ManualPaymentCurrency;
  paymentMethod: ManualPaymentMethod;
  receivedAt: string;
  referenceNumber: string;
  receivedBy: string;
  reason: ManualPaymentReason;
  notes: string;
};

export const MANUAL_PAYMENT_STATUS_LABELS: Record<ManualPaymentStatus, string> =
  {
    pending: "Pending",
    activated: "Activated",
    cancelled: "Cancelled",
  };

export const MANUAL_PAYMENT_STATUS_TONES: Record<
  ManualPaymentStatus,
  StatusTone
> = {
  pending: "warning",
  activated: "success",
  cancelled: "danger",
};

export const MANUAL_PAYMENT_METHOD_LABELS: Record<ManualPaymentMethod, string> =
  {
    bank_transfer: "Bank Transfer",
    upi: "UPI",
    cash: "Cash",
    paypal: "PayPal",
    wise: "Wise",
    exchange_transfer: "Exchange Transfer",
    other: "Other",
  };

export const MANUAL_PAYMENT_REASON_LABELS: Record<ManualPaymentReason, string> =
  {
    new_membership: "New Membership",
    renewal: "Renewal",
    upgrade: "Upgrade",
    membership_extension: "Membership Extension",
    manual_correction: "Manual Correction",
    special_approval: "Special Approval",
    other: "Other",
  };

export const MANUAL_PAYMENT_METHOD_OPTIONS: {
  value: ManualPaymentMethod;
  label: string;
}[] = (
  Object.entries(MANUAL_PAYMENT_METHOD_LABELS) as [
    ManualPaymentMethod,
    string,
  ][]
).map(([value, label]) => ({ value, label }));

export const MANUAL_PAYMENT_REASON_OPTIONS: {
  value: ManualPaymentReason;
  label: string;
}[] = (
  Object.entries(MANUAL_PAYMENT_REASON_LABELS) as [
    ManualPaymentReason,
    string,
  ][]
).map(([value, label]) => ({ value, label }));

export const MANUAL_PAYMENT_CURRENCY_OPTIONS: {
  value: ManualPaymentCurrency;
  label: string;
}[] = [
  { value: "USD", label: "USD" },
  { value: "USDT", label: "USDT" },
  { value: "EUR", label: "EUR" },
  { value: "GBP", label: "GBP" },
  { value: "INR", label: "INR" },
];

export function manualPaymentCanActivate(
  status: ManualPaymentStatus
): boolean {
  return status === "pending";
}

export function manualPaymentCanCancel(status: ManualPaymentStatus): boolean {
  return status === "pending";
}
