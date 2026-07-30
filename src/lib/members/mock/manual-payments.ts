import type {
  ManualPayment,
  ManualPaymentStats,
  ManualPaymentTimelineEvent,
} from "@/types/members/manual-payment";
import {
  MANUAL_PAYMENT_METHOD_LABELS,
  MANUAL_PAYMENT_REASON_LABELS,
  MANUAL_PAYMENT_STATUS_LABELS,
  MANUAL_PAYMENT_STATUS_TONES,
} from "@/types/members/manual-payment";

function timeline(
  events: Omit<ManualPaymentTimelineEvent, "id">[],
  prefix: string
): ManualPaymentTimelineEvent[] {
  return events.map((event, index) => ({
    ...event,
    id: `${prefix}-tl-${index + 1}`,
  }));
}

/**
 * Mock Manual Payment records — independent activation source (no blockchain).
 *
 * Member partition (no overlap with Crypto Payments):
 *   Manual → m-005, m-006, m-008, m-010, m-012
 *   Crypto → m-001, m-002, m-003, m-004, m-007, m-009, m-011
 *
 * TODO(NestJS): replace with GET /admin/subscriptions/manual-payments
 */
export const MOCK_MANUAL_PAYMENTS: ManualPayment[] = [
  {
    id: "mp-001",
    memberId: "m-005",
    username: "fatima_trades",
    email: "fatima@email.com",
    avatarTone: "rose",
    planKey: "monthly",
    planLabel: "VIP Monthly",
    paymentMethod: "bank_transfer",
    paymentMethodLabel: MANUAL_PAYMENT_METHOD_LABELS.bank_transfer,
    amount: "60.00",
    currency: "USD",
    receivedAt: "2026-07-10T11:00:00",
    referenceNumber: "BT-2026-0710-8841",
    receivedBy: "Admin · Ibrahim",
    reason: "new_membership",
    reasonLabel: MANUAL_PAYMENT_REASON_LABELS.new_membership,
    notes: "Wire received from Emirates NBD — confirmed in ops channel.",
    status: "activated",
    statusLabel: MANUAL_PAYMENT_STATUS_LABELS.activated,
    statusTone: MANUAL_PAYMENT_STATUS_TONES.activated,
    activatedBy: "Admin · Ibrahim",
    activatedAt: "2026-07-10T11:30:00",
    membershipResult: {
      plan: "VIP Monthly",
      statusLabel: "Active",
      statusTone: "success",
      activatedAt: "2026-07-10T11:30:00",
      expiryAt: "2026-08-10T11:30:00",
      renewalCount: 1,
      discordSyncLabel: "VIP role assigned",
    },
    createdAt: "2026-07-10T11:05:00",
    timeline: timeline(
      [
        {
          title: "Manual Payment Created",
          description: "VIP Monthly · Bank Transfer",
          timestamp: "2026-07-10T11:05:00",
          status: "complete",
        },
        {
          title: "Payment Recorded",
          description: "BT-2026-0710-8841 · $60.00 USD",
          timestamp: "2026-07-10T11:05:00",
          status: "complete",
        },
        {
          title: "Membership Activated",
          description: "VIP Monthly",
          timestamp: "2026-07-10T11:30:00",
          status: "complete",
        },
        {
          title: "Discord Sync Started",
          timestamp: "2026-07-10T11:30:00",
          status: "complete",
        },
        {
          title: "Discord Sync Completed",
          description: "VIP role assigned",
          timestamp: "2026-07-10T11:35:00",
          status: "complete",
        },
      ],
      "mp-001"
    ),
  },
  {
    id: "mp-002",
    memberId: "m-008",
    username: "omar_charts",
    email: "omar.c@email.com",
    avatarTone: "discord",
    planKey: "monthly",
    planLabel: "VIP Monthly",
    paymentMethod: "cash",
    paymentMethodLabel: MANUAL_PAYMENT_METHOD_LABELS.cash,
    amount: "60.00",
    currency: "USD",
    receivedAt: "2026-07-22T16:00:00",
    referenceNumber: null,
    receivedBy: "Admin · Sara",
    reason: "membership_extension",
    reasonLabel: MANUAL_PAYMENT_REASON_LABELS.membership_extension,
    notes: "Cash collected at meetup — receipt issued offline.",
    status: "pending",
    statusLabel: MANUAL_PAYMENT_STATUS_LABELS.pending,
    statusTone: MANUAL_PAYMENT_STATUS_TONES.pending,
    activatedBy: null,
    activatedAt: null,
    membershipResult: null,
    createdAt: "2026-07-22T16:10:00",
    timeline: timeline(
      [
        {
          title: "Manual Payment Created",
          description: "VIP Monthly · Cash",
          timestamp: "2026-07-22T16:10:00",
          status: "complete",
        },
        {
          title: "Payment Recorded",
          description: "$60.00 USD",
          timestamp: "2026-07-22T16:10:00",
          status: "complete",
        },
        {
          title: "Membership Activated",
          description: "Awaiting activation",
          timestamp: "—",
          status: "current",
        },
        {
          title: "Discord Sync Started",
          timestamp: "—",
          status: "pending",
        },
        {
          title: "Discord Sync Completed",
          timestamp: "—",
          status: "pending",
        },
      ],
      "mp-002"
    ),
  },
  {
    id: "mp-003",
    memberId: "m-012",
    username: "yusuf_desk",
    email: "yusuf.d@email.com",
    avatarTone: "sky",
    planKey: "quarterly",
    planLabel: "VIP Quarterly",
    paymentMethod: "wise",
    paymentMethodLabel: MANUAL_PAYMENT_METHOD_LABELS.wise,
    amount: "150.00",
    currency: "USD",
    receivedAt: "2026-07-05T13:20:00",
    referenceNumber: "WISE-TC-1205",
    receivedBy: "Admin · Sara",
    reason: "renewal",
    reasonLabel: MANUAL_PAYMENT_REASON_LABELS.renewal,
    notes: "Wise transfer cleared — renewal for VIP Quarterly.",
    status: "activated",
    statusLabel: MANUAL_PAYMENT_STATUS_LABELS.activated,
    statusTone: MANUAL_PAYMENT_STATUS_TONES.activated,
    activatedBy: "Admin · Sara",
    activatedAt: "2026-07-05T13:45:00",
    membershipResult: {
      plan: "VIP Quarterly",
      statusLabel: "Active",
      statusTone: "success",
      activatedAt: "2026-07-05T13:45:00",
      expiryAt: "2026-10-05T13:45:00",
      renewalCount: 2,
      discordSyncLabel: "VIP role assigned",
    },
    createdAt: "2026-07-05T13:25:00",
    timeline: timeline(
      [
        {
          title: "Manual Payment Created",
          description: "VIP Quarterly · Wise",
          timestamp: "2026-07-05T13:25:00",
          status: "complete",
        },
        {
          title: "Payment Recorded",
          description: "WISE-TC-1205 · $150.00 USD",
          timestamp: "2026-07-05T13:25:00",
          status: "complete",
        },
        {
          title: "Membership Activated",
          timestamp: "2026-07-05T13:45:00",
          status: "complete",
        },
        {
          title: "Discord Sync Started",
          timestamp: "2026-07-05T13:45:00",
          status: "complete",
        },
        {
          title: "Discord Sync Completed",
          description: "VIP role assigned",
          timestamp: "2026-07-05T13:50:00",
          status: "complete",
        },
      ],
      "mp-003"
    ),
  },
  {
    id: "mp-004",
    memberId: "m-006",
    username: "khalid_markets",
    email: "khalid.m@email.com",
    avatarTone: "sky",
    planKey: "quarterly",
    planLabel: "VIP Quarterly",
    paymentMethod: "exchange_transfer",
    paymentMethodLabel: MANUAL_PAYMENT_METHOD_LABELS.exchange_transfer,
    amount: "150.00",
    currency: "USDT",
    receivedAt: "2026-07-28T08:00:00",
    referenceNumber: "BIN-WD-55821",
    receivedBy: "Admin · Ibrahim",
    reason: "manual_correction",
    reasonLabel: MANUAL_PAYMENT_REASON_LABELS.manual_correction,
    notes: "Exchange withdrawal landed off-quote — recorded as manual correction.",
    status: "pending",
    statusLabel: MANUAL_PAYMENT_STATUS_LABELS.pending,
    statusTone: MANUAL_PAYMENT_STATUS_TONES.pending,
    activatedBy: null,
    activatedAt: null,
    membershipResult: null,
    createdAt: "2026-07-28T08:15:00",
    timeline: timeline(
      [
        {
          title: "Manual Payment Created",
          description: "VIP Quarterly · Exchange Transfer",
          timestamp: "2026-07-28T08:15:00",
          status: "complete",
        },
        {
          title: "Payment Recorded",
          description: "BIN-WD-55821 · 150.00 USDT",
          timestamp: "2026-07-28T08:15:00",
          status: "complete",
        },
        {
          title: "Membership Activated",
          description: "Awaiting activation",
          timestamp: "—",
          status: "current",
        },
        {
          title: "Discord Sync Started",
          timestamp: "—",
          status: "pending",
        },
        {
          title: "Discord Sync Completed",
          timestamp: "—",
          status: "pending",
        },
      ],
      "mp-004"
    ),
  },
  {
    id: "mp-005",
    memberId: "m-010",
    username: "hassan_pro",
    email: "hassan.pro@email.com",
    avatarTone: "amber",
    planKey: "monthly",
    planLabel: "VIP Monthly",
    paymentMethod: "paypal",
    paymentMethodLabel: MANUAL_PAYMENT_METHOD_LABELS.paypal,
    amount: "60.00",
    currency: "USD",
    receivedAt: "2026-07-12T10:30:00",
    referenceNumber: "PP-9X2K-771",
    receivedBy: "Admin · Sara",
    reason: "special_approval",
    reasonLabel: MANUAL_PAYMENT_REASON_LABELS.special_approval,
    notes: "PayPal friends & family — cancelled after duplicate request found.",
    status: "cancelled",
    statusLabel: MANUAL_PAYMENT_STATUS_LABELS.cancelled,
    statusTone: MANUAL_PAYMENT_STATUS_TONES.cancelled,
    activatedBy: null,
    activatedAt: null,
    membershipResult: null,
    createdAt: "2026-07-12T10:35:00",
    timeline: timeline(
      [
        {
          title: "Manual Payment Created",
          description: "VIP Monthly · PayPal",
          timestamp: "2026-07-12T10:35:00",
          status: "complete",
        },
        {
          title: "Payment Recorded",
          description: "PP-9X2K-771 · $60.00 USD",
          timestamp: "2026-07-12T10:35:00",
          status: "complete",
        },
        {
          title: "Cancelled",
          description: "Duplicate request — Membership unchanged",
          timestamp: "2026-07-12T12:00:00",
          status: "error",
        },
      ],
      "mp-005"
    ),
  },
];

export const MOCK_MANUAL_PAYMENT_STATS: ManualPaymentStats = {
  pending: MOCK_MANUAL_PAYMENTS.filter((p) => p.status === "pending").length,
  activated: MOCK_MANUAL_PAYMENTS.filter((p) => p.status === "activated").length,
  cancelled: MOCK_MANUAL_PAYMENTS.filter((p) => p.status === "cancelled").length,
  lastRefreshLabel: "2 min ago",
};

/**
 * Soft-match directory for optional Member ID linking when a typed username
 * happens to match. Create form does not require selecting from this list.
 */
export const MANUAL_PAYMENT_MEMBER_OPTIONS = [
  {
    id: "m-005",
    username: "fatima_trades",
    email: "fatima@email.com",
    avatarTone: "rose" as const,
  },
  {
    id: "m-006",
    username: "khalid_markets",
    email: "khalid.m@email.com",
    avatarTone: "sky" as const,
  },
  {
    id: "m-008",
    username: "omar_charts",
    email: "omar.c@email.com",
    avatarTone: "discord" as const,
  },
  {
    id: "m-010",
    username: "hassan_pro",
    email: "hassan.pro@email.com",
    avatarTone: "amber" as const,
  },
  {
    id: "m-012",
    username: "yusuf_desk",
    email: "yusuf.d@email.com",
    avatarTone: "sky" as const,
  },
];

export const MANUAL_PAYMENT_PLAN_OPTIONS = [
  { value: "monthly" as const, label: "VIP Monthly", amount: "60.00" },
  { value: "quarterly" as const, label: "VIP Quarterly", amount: "150.00" },
  { value: "yearly" as const, label: "VIP Yearly", amount: "500.00" },
];
