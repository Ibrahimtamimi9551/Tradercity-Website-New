import type {
  SubscriptionStats,
  SubscriptionTicket,
  SubscriptionTimelineEvent,
} from "@/types/members/subscription";
import {
  PAYMENT_FAILURE_REASON_LABELS,
  SUBSCRIPTION_DISPLAY_STATUS_LABELS,
  SUBSCRIPTION_DISPLAY_STATUS_TONES,
} from "@/types/members/subscription";

const BSC_EXPLORER = "https://bscscan.com/tx/";
/** Mock TraderCity treasury / expected receive wallet. */
const EXPECTED_TREASURY_WALLET = "0xTraderCityTreasury000000000000000001";

const DEFAULT_EVIDENCE_REQUESTS = [
  "Wallet screenshot",
  "Transaction confirmation screenshot",
  "Exchange withdrawal receipt",
  "Transaction ID",
  "Wallet address used",
  "Additional explanation (if required)",
];

function timeline(
  events: Omit<SubscriptionTimelineEvent, "id">[],
  prefix: string
): SubscriptionTimelineEvent[] {
  return events.map((event, index) => ({
    ...event,
    id: `${prefix}-tl-${index + 1}`,
  }));
}

/**
 * Mock Subscription tickets — Crypto Payment cohort only (no Manual Payment members).
 *
 * Member partition (no overlap with Manual Payments):
 *   Crypto  → m-001, m-002, m-003, m-004, m-007, m-009, m-011
 *   Manual  → m-005, m-006, m-008, m-010, m-012
 *
 * Profile / Control Center resolve Activation Source via
 * `src/lib/members/mock/activation-source.ts`.
 *
 * TODO(NestJS): replace with GET /admin/subscriptions
 */
export const MOCK_SUBSCRIPTION_TICKETS: SubscriptionTicket[] = [
  {
    id: "sub-001",
    memberId: "m-001",
    username: "ibrahim_trader",
    email: "ibrahim@tradercity.com",
    avatarTone: "discord",
    activationSource: "crypto_payment",
    displayStatus: "approved",
    statusLabel: SUBSCRIPTION_DISPLAY_STATUS_LABELS.approved,
    statusTone: SUBSCRIPTION_DISPLAY_STATUS_TONES.approved,
    planKey: "monthly",
    planLabel: "VIP Monthly",
    network: "bep20",
    networkLabel: "BNB Smart Chain (BEP20)",
    walletAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1",
    transactionHash:
      "0x8f3c2a1e9b7d4f6a0c5e8b2d1a9f7e3c6b4d0a8e5f1c7b9d2a4e6f8c0b3d5a7e",
    explorerUrl:
      "https://bscscan.com/tx/0x8f3c2a1e9b7d4f6a0c5e8b2d1a9f7e3c6b4d0a8e5f1c7b9d2a4e6f8c0b3d5a7e",
    expectedAmount: "60.00",
    actualAmount: "60.00",
    currency: "USDT",
    paymentMethod: "Crypto USDT - BEP20",
    submittedAt: "2026-06-08T09:45:00",
    verification: {
      result: "verified",
      resultLabel: "Verified",
      resultTone: "success",
      method: "automatic",
      verifiedAt: "2026-06-08T09:52:00",
      notes: null,
    },
    approval: {
      decision: "approved",
      decidedAt: "2026-06-08T10:15:00",
      decidedBy: "Admin · Ibrahim",
      reason: null,
    },
    membershipResult: {
      plan: "VIP Monthly",
      statusLabel: "Active",
      statusTone: "success",
      activatedAt: "2026-06-08T10:15:00",
      expiryAt: "2026-07-08T10:15:00",
      discordSyncLabel: "VIP role assigned",
    },
    timeline: timeline(
      [
        {
          title: "Payment Submitted",
          description: "VIP Monthly · 60 USDT",
          timestamp: "2026-06-08T09:45:00",
          status: "complete",
        },
        {
          title: "Blockchain Verifying",
          timestamp: "2026-06-08T09:46:00",
          status: "complete",
        },
        {
          title: "Verification Completed",
          description: "Automatic · amounts matched",
          timestamp: "2026-06-08T09:52:00",
          status: "complete",
        },
        {
          title: "Approval Pending",
          timestamp: "2026-06-08T09:52:00",
          status: "complete",
        },
        {
          title: "Approved",
          description: "Admin · Ibrahim",
          timestamp: "2026-06-08T10:15:00",
          status: "complete",
        },
        {
          title: "Membership Activated",
          description: "VIP Monthly",
          timestamp: "2026-06-08T10:15:00",
          status: "complete",
        },
        {
          title: "Discord Sync Completed",
          description: "VIP role assigned",
          timestamp: "2026-06-08T10:22:00",
          status: "complete",
        },
      ],
      "sub-001"
    ),
  },
  {
    id: "sub-002",
    memberId: "m-002",
    username: "usman_hodler",
    email: "usman@example.com",
    avatarTone: "violet",
    activationSource: "crypto_payment",
    displayStatus: "verification_required",
    statusLabel: SUBSCRIPTION_DISPLAY_STATUS_LABELS.verification_required,
    statusTone: SUBSCRIPTION_DISPLAY_STATUS_TONES.verification_required,
    planKey: "monthly",
    planLabel: "VIP Monthly",
    network: "bep20",
    networkLabel: "BNB Smart Chain (BEP20)",
    walletAddress: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
    transactionHash:
      "0x1a2b3c4d5e6f708192a3b4c5d6e7f8091a2b3c4d5e6f708192a3b4c5d6e7f809",
    explorerUrl: `${BSC_EXPLORER}0x1a2b3c4d5e6f708192a3b4c5d6e7f8091a2b3c4d5e6f708192a3b4c5d6e7f809`,
    expectedAmount: "60.00",
    actualAmount: "45.00",
    currency: "USDT",
    paymentMethod: "Crypto USDT - BEP20",
    submittedAt: "2026-07-20T11:00:00",
    verification: {
      result: "underpaid",
      resultLabel: "Underpaid",
      resultTone: "danger",
      method: "automatic",
      verifiedAt: "2026-07-20T11:08:00",
      notes: "Received 45 USDT — expected 60 USDT from quote.",
    },
    approval: {
      decision: "pending",
      decidedAt: null,
      decidedBy: null,
      reason: null,
    },
    membershipResult: null,
    resolution: {
      failureReason: "amount_mismatch",
      failureReasonLabel: PAYMENT_FAILURE_REASON_LABELS.amount_mismatch,
      detectedAmount: "45.00",
      expectedAmount: "60.00",
      currency: "USDT",
      submittedWallet: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
      expectedWallet: EXPECTED_TREASURY_WALLET,
      checklist: [
        { id: "review_tx_hash", label: "Review transaction hash", done: true },
        { id: "verify_amount", label: "Verify payment amount", done: true },
        { id: "check_explorer", label: "Check blockchain explorer", done: true },
        { id: "contact_member", label: "Contact member", done: true },
        {
          id: "request_evidence",
          label: "Request supporting evidence",
          done: true,
        },
        { id: "review_evidence", label: "Review submitted evidence", done: false },
        { id: "final_decision", label: "Final decision", done: false },
      ],
      evidenceRequests: DEFAULT_EVIDENCE_REQUESTS,
      notes: [
        {
          id: "sub-002-note-1",
          body: "Member contacted via Discord — awaiting wallet screenshot.",
          author: "Admin · Sara",
          createdAt: "2026-07-20T12:15:00",
        },
        {
          id: "sub-002-note-2",
          body: "User confirmed they sent from Binance withdrawal; amount may have been fee-adjusted.",
          author: "Admin · Sara",
          createdAt: "2026-07-20T14:40:00",
        },
      ],
      startedAt: "2026-07-20T11:10:00",
      memberContactedAt: "2026-07-20T12:15:00",
    },
    timeline: timeline(
      [
        {
          title: "Payment Submitted",
          timestamp: "2026-07-20T11:00:00",
          status: "complete",
        },
        {
          title: "Blockchain Verifying",
          timestamp: "2026-07-20T11:01:00",
          status: "complete",
        },
        {
          title: "Verification Failed",
          description: "Amount mismatch — underpaid",
          timestamp: "2026-07-20T11:08:00",
          status: "error",
        },
        {
          title: "Payment Resolution Started",
          description: "Manual investigation opened",
          timestamp: "2026-07-20T11:10:00",
          status: "complete",
        },
        {
          title: "Member Contacted",
          description: "Reached via Discord",
          timestamp: "2026-07-20T12:15:00",
          status: "complete",
        },
        {
          title: "Supporting Evidence Requested",
          description: "Wallet screenshot + withdrawal receipt",
          timestamp: "2026-07-20T12:20:00",
          status: "complete",
        },
        {
          title: "Evidence Reviewed",
          description: "Awaiting remaining proof",
          timestamp: "—",
          status: "current",
        },
        {
          title: "Final Decision",
          description: "Approve or Reject after review",
          timestamp: "—",
          status: "pending",
        },
      ],
      "sub-002"
    ),
  },
  {
    id: "sub-003",
    memberId: "m-003",
    username: "sara_crypto",
    email: "sara.c@email.com",
    avatarTone: "emerald",
    activationSource: "crypto_payment",
    displayStatus: "approval_pending",
    statusLabel: SUBSCRIPTION_DISPLAY_STATUS_LABELS.approval_pending,
    statusTone: SUBSCRIPTION_DISPLAY_STATUS_TONES.approval_pending,
    planKey: "quarterly",
    planLabel: "VIP Quarterly",
    network: "bep20",
    networkLabel: "BNB Smart Chain (BEP20)",
    walletAddress: "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B",
    transactionHash:
      "0x9e8d7c6b5a4938271605f4e3d2c1b0a9f8e7d6c5b4a39281706f5e4d3c2b1a09",
    explorerUrl: `${BSC_EXPLORER}0x9e8d7c6b5a4938271605f4e3d2c1b0a9f8e7d6c5b4a39281706f5e4d3c2b1a09`,
    expectedAmount: "150.00",
    actualAmount: "150.00",
    currency: "USDT",
    paymentMethod: "Crypto USDT - BEP20",
    submittedAt: "2026-07-28T08:20:00",
    verification: {
      result: "verified",
      resultLabel: "Verified",
      resultTone: "success",
      method: "automatic",
      verifiedAt: "2026-07-28T08:28:00",
      notes: null,
    },
    approval: {
      decision: "pending",
      decidedAt: null,
      decidedBy: null,
      reason: null,
    },
    membershipResult: null,
    timeline: timeline(
      [
        {
          title: "Payment Submitted",
          description: "VIP Quarterly · 150 USDT",
          timestamp: "2026-07-28T08:20:00",
          status: "complete",
        },
        {
          title: "Blockchain Verifying",
          timestamp: "2026-07-28T08:21:00",
          status: "complete",
        },
        {
          title: "Verification Completed",
          description: "Automatic · amounts matched",
          timestamp: "2026-07-28T08:28:00",
          status: "complete",
        },
        {
          title: "Approval Pending",
          description: "Primary approval queue",
          timestamp: "2026-07-28T08:28:00",
          status: "current",
        },
      ],
      "sub-003"
    ),
  },
  {
    id: "sub-004",
    memberId: "m-004",
    username: "ahmed_fx",
    email: "ahmed.fx@email.com",
    avatarTone: "amber",
    activationSource: "crypto_payment",
    displayStatus: "blockchain_verifying",
    statusLabel: SUBSCRIPTION_DISPLAY_STATUS_LABELS.blockchain_verifying,
    statusTone: SUBSCRIPTION_DISPLAY_STATUS_TONES.blockchain_verifying,
    planKey: "yearly",
    planLabel: "VIP Yearly",
    network: "bep20",
    networkLabel: "BNB Smart Chain (BEP20)",
    walletAddress: "0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed",
    transactionHash:
      "0xabcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789",
    explorerUrl: `${BSC_EXPLORER}0xabcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789`,
    expectedAmount: "500.00",
    actualAmount: null,
    currency: "USDT",
    paymentMethod: "Crypto USDT - BEP20",
    submittedAt: "2026-07-28T14:05:00",
    verification: {
      result: "verifying",
      resultLabel: "Verifying",
      resultTone: "info",
      method: "automatic",
      verifiedAt: null,
      notes: null,
    },
    approval: {
      decision: "pending",
      decidedAt: null,
      decidedBy: null,
      reason: null,
    },
    membershipResult: null,
    timeline: timeline(
      [
        {
          title: "Payment Submitted",
          description: "VIP Yearly · 500 USDT",
          timestamp: "2026-07-28T14:05:00",
          status: "complete",
        },
        {
          title: "Blockchain Verifying",
          description: "Blockchain detection in progress",
          timestamp: "2026-07-28T14:06:00",
          status: "current",
        },
        {
          title: "Approval Pending",
          timestamp: "—",
          status: "pending",
        },
      ],
      "sub-004"
    ),
  },
  {
    id: "sub-007",
    memberId: "m-007",
    username: "nora_signals",
    email: "nora@email.com",
    avatarTone: "violet",
    activationSource: "crypto_payment",
    displayStatus: "blockchain_verifying",
    statusLabel: SUBSCRIPTION_DISPLAY_STATUS_LABELS.blockchain_verifying,
    statusTone: SUBSCRIPTION_DISPLAY_STATUS_TONES.blockchain_verifying,
    planKey: "quarterly",
    planLabel: "VIP Quarterly",
    network: "bep20",
    networkLabel: "BNB Smart Chain (BEP20)",
    walletAddress: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    transactionHash:
      "0x55556666777788889999aaaabbbbccccddddeeeeffff00001111222233334444",
    explorerUrl: `${BSC_EXPLORER}0x55556666777788889999aaaabbbbccccddddeeeeffff00001111222233334444`,
    expectedAmount: "150.00",
    actualAmount: null,
    currency: "USDT",
    paymentMethod: "Crypto USDT - BEP20",
    submittedAt: "2026-07-29T01:10:00",
    verification: {
      result: "pending",
      resultLabel: "Pending",
      resultTone: "warning",
      method: "automatic",
      verifiedAt: null,
      notes: null,
    },
    approval: {
      decision: "pending",
      decidedAt: null,
      decidedBy: null,
      reason: null,
    },
    membershipResult: null,
    timeline: timeline(
      [
        {
          title: "Payment Submitted",
          timestamp: "2026-07-29T01:10:00",
          status: "complete",
        },
        {
          title: "Blockchain Verifying",
          timestamp: "2026-07-29T01:11:00",
          status: "current",
        },
      ],
      "sub-007"
    ),
  },
  {
    id: "sub-009",
    memberId: "m-009",
    username: "zainab_alpha",
    email: "zainab@email.com",
    avatarTone: "amber",
    activationSource: "crypto_payment",
    displayStatus: "approval_pending",
    statusLabel: SUBSCRIPTION_DISPLAY_STATUS_LABELS.approval_pending,
    statusTone: SUBSCRIPTION_DISPLAY_STATUS_TONES.approval_pending,
    planKey: "yearly",
    planLabel: "VIP Yearly",
    network: "bep20",
    networkLabel: "BNB Smart Chain (BEP20)",
    walletAddress: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    transactionHash:
      "0xaaaabbbbccccddddeeeeffff0000111122223333444455556666777788889999",
    explorerUrl: `${BSC_EXPLORER}0xaaaabbbbccccddddeeeeffff0000111122223333444455556666777788889999`,
    expectedAmount: "500.00",
    actualAmount: "500.00",
    currency: "USDT",
    paymentMethod: "Crypto USDT - BEP20",
    submittedAt: "2026-07-26T12:00:00",
    verification: {
      result: "verified",
      resultLabel: "Verified",
      resultTone: "success",
      method: "automatic",
      verifiedAt: "2026-07-26T12:12:00",
      notes: null,
    },
    approval: {
      decision: "pending",
      decidedAt: null,
      decidedBy: null,
      reason: null,
    },
    membershipResult: null,
    timeline: timeline(
      [
        {
          title: "Payment Submitted",
          timestamp: "2026-07-26T12:00:00",
          status: "complete",
        },
        {
          title: "Verification Completed",
          timestamp: "2026-07-26T12:12:00",
          status: "complete",
        },
        {
          title: "Approval Pending",
          timestamp: "2026-07-26T12:12:00",
          status: "current",
        },
      ],
      "sub-009"
    ),
  },
  {
    id: "sub-011",
    memberId: "m-011",
    username: "layla_vip",
    email: "layla@email.com",
    avatarTone: "sky",
    activationSource: "crypto_payment",
    displayStatus: "rejected",
    statusLabel: SUBSCRIPTION_DISPLAY_STATUS_LABELS.rejected,
    statusTone: SUBSCRIPTION_DISPLAY_STATUS_TONES.rejected,
    planKey: "monthly",
    planLabel: "VIP Monthly",
    network: "bep20",
    networkLabel: "BNB Smart Chain (BEP20)",
    walletAddress: "0x1111111111111111111111111111111111111111",
    transactionHash:
      "0xccccddddeeeeffff0000111122223333444455556666777788889999aaaabbbb",
    explorerUrl: `${BSC_EXPLORER}0xccccddddeeeeffff0000111122223333444455556666777788889999aaaabbbb`,
    expectedAmount: "60.00",
    actualAmount: "10.00",
    currency: "USDT",
    paymentMethod: "Crypto USDT - BEP20",
    submittedAt: "2026-07-10T15:20:00",
    verification: {
      result: "failed",
      resultLabel: "Failed",
      resultTone: "danger",
      method: "automatic",
      verifiedAt: "2026-07-10T15:30:00",
      notes: "Amount far below quote; suspected wrong transfer.",
    },
    approval: {
      decision: "rejected",
      decidedAt: "2026-07-10T17:00:00",
      decidedBy: "Admin · Sara",
      reason: "Invalid payment — amount does not match quote.",
    },
    membershipResult: null,
    timeline: timeline(
      [
        {
          title: "Payment Submitted",
          timestamp: "2026-07-10T15:20:00",
          status: "complete",
        },
        {
          title: "Verification Failed",
          timestamp: "2026-07-10T15:30:00",
          status: "error",
        },
        {
          title: "Rejected",
          description: "Invalid payment",
          timestamp: "2026-07-10T17:00:00",
          status: "error",
        },
      ],
      "sub-011"
    ),
  },
];

export const MOCK_SUBSCRIPTION_STATS: SubscriptionStats = {
  approvalPending: MOCK_SUBSCRIPTION_TICKETS.filter(
    (t) => t.displayStatus === "approval_pending"
  ).length,
  blockchainVerifying: MOCK_SUBSCRIPTION_TICKETS.filter(
    (t) => t.displayStatus === "blockchain_verifying"
  ).length,
  verificationRequired: MOCK_SUBSCRIPTION_TICKETS.filter(
    (t) => t.displayStatus === "verification_required"
  ).length,
  rejected: MOCK_SUBSCRIPTION_TICKETS.filter((t) => t.displayStatus === "rejected")
    .length,
  approved: MOCK_SUBSCRIPTION_TICKETS.filter((t) => t.displayStatus === "approved")
    .length,
  lastRefreshLabel: "2 min ago",
};

