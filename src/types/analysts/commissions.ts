import type { StatusTone } from "@/types/admin/common";
import type { DirectoryAnalyst } from "@/types/analysts/directory";
import type {
  AnalystReferralPartnershipStatus,
  AnalystReferralPlanBreakdown,
  AnalystReferralStatus,
} from "@/types/analysts/referrals";

/**
 * Commission Financial Operations — Wave F (operational UX).
 * Consumes Referral performance; owns earnings, payouts, wallet, ledger.
 *
 * Referral credit model (TraderCity):
 *   Monthly $10 · Quarterly $30 · Yearly $60
 * Lifetime is not part of Commission credits.
 *
 * Commission lifecycle (not accounting states):
 *   Generated → Ready for Payment → Paid
 * Approval is an optional acknowledgement — not a commission state.
 * Unpaid prior-cycle amounts carry forward as Due Amount.
 */

export type AnalystCommissionDomainView =
  | "dashboard"
  | "directory"
  | "payouts"
  | "history";

/** Commission-creditable membership plans only (no Lifetime). */
export type AnalystCommissionCreditPlan = "monthly" | "quarterly" | "yearly";

/**
 * Line lifecycle — Ready for Payment or Paid.
 * Pending/Approved accounting states are intentionally not used.
 */
export type AnalystCommissionLifecycleStatus = "ready" | "paid";

/** Dominant operational posture on Directory / Profile. */
export type AnalystCommissionStatus =
  | "none"
  | "ready"
  | "overdue"
  | "paid";

export type AnalystCommissionPayoutStatus =
  | "ready"
  | "scheduled"
  | "paid";

export type AnalystCommissionNetwork = "bsc_bep20";
export type AnalystCommissionToken = "USDT";

export type AnalystCommissionPaymentMethod = "usdt_bep20";
export type AnalystCommissionPaymentFrequency = "monthly" | "biweekly";

/** Fixed referral credits — NestJS must use the same constants. */
export const ANALYST_REFERRAL_CREDIT_USD: Record<
  AnalystCommissionCreditPlan,
  number
> = {
  monthly: 10,
  quarterly: 30,
  yearly: 60,
};

/** Monthly cumulative business → analyst share % (auto from thresholds). */
export type AnalystCommissionTierBand = {
  minBusinessUsd: number;
  /** Exclusive upper bound; null = open-ended. */
  maxBusinessUsd: number | null;
  analystSharePercent: 40 | 50 | 60 | 70;
};

export type AnalystCommissionTier = {
  billingCycleMonth: string;
  cumulativeBusinessUsd: number;
  analystSharePercent: 40 | 50 | 60 | 70;
  traderCitySharePercent: number;
};

export type AnalystCommissionNextTier = {
  /** Null when already at maximum band. */
  nextAnalystSharePercent: 40 | 50 | 60 | 70 | null;
  /** USD still needed to reach next band; 0 at max. */
  remainingUsd: number;
  label: string;
};

export type AnalystCommissionWallet = {
  address: string;
  network: AnalystCommissionNetwork;
  networkLabel: string;
  token: AnalystCommissionToken;
  lastVerifiedAt: string | null;
};

export type AnalystCommissionPlanEarnings = {
  referralCount: number;
  unitCreditUsd: number;
  earnedUsd: number;
};

export type AnalystCommissionPlanBreakdown = Record<
  AnalystCommissionCreditPlan,
  AnalystCommissionPlanEarnings
>;

/**
 * Operational payment summary — not Pending / Approved / Paid accounting.
 */
export type AnalystCommissionSummary = {
  /** All-time gross commission generated. */
  totalEarnedUsd: number;
  /** Current billing-cycle gross (ready lines in active cycle). */
  currentCommissionUsd: number;
  /** Analyst share of current-cycle ready commission. */
  amountPayableUsd: number;
  /** Unpaid prior-cycle analyst share carried forward. */
  dueAmountUsd: number;
  /** amountPayableUsd + dueAmountUsd. */
  totalPayableUsd: number;
  /** All-time gross of paid lines. */
  paidUsd: number;
  lastPayoutAt: string | null;
  nextEligiblePayoutAt: string | null;
  /**
   * Optional Super Admin acknowledgement that the payout was reviewed.
   * Not a commission lifecycle state.
   */
  paymentReviewedAt: string | null;
};

/**
 * Links a commission line to a Member Management identity.
 * Do not duplicate member records — reference by memberId.
 */
export type AnalystCommissionConversionLink = {
  referralRecordId: string;
  memberId: string;
  memberDisplayName: string;
  membershipPlan: AnalystCommissionCreditPlan;
  purchaseDate: string;
};

/**
 * Individual commission line — foundation for breakdown, gross, payouts, history.
 * `grossUsd` is the referral credit for this conversion ($10 / $30 / $60).
 */
export type AnalystCommissionLineItem = {
  id: string;
  analystId: string;
  commissionRecordId: string;
  analystDisplayName: string;
  status: AnalystCommissionLifecycleStatus;
  grossUsd: number;
  generatedAt: string;
  /** Optional review acknowledgement timestamp — not a financial state. */
  reviewedAt: string | null;
  paidAt: string | null;
  payoutId: string | null;
  conversion: AnalystCommissionConversionLink;
};

export type AnalystCommissionPaymentEvidence = {
  notes: string | null;
  /** Optional exchange screenshot / wallet confirmation filename or mock URL. */
  screenshotUrl: string | null;
  receiptUrl: string | null;
  /** Display label for uploaded evidence (mock-first). */
  evidenceLabel: string | null;
};

export type AnalystPayoutRecord = {
  id: string;
  analystId: string;
  commissionRecordId: string;
  analystDisplayName: string;
  payoutDate: string;
  /** Gross business / commission credits included in this payout. */
  grossCommissionUsd: number;
  traderCityShareUsd: number;
  analystShareUsd: number;
  referralCountIncluded: number;
  status: AnalystCommissionPayoutStatus;
  transactionHash: string | null;
  network: AnalystCommissionNetwork;
  networkLabel: string;
  token: AnalystCommissionToken;
  paymentDate: string | null;
  walletAddress: string | null;
  evidence: AnalystCommissionPaymentEvidence;
  commissionLineIds: string[];
  disputeReady: true;
};

export type AnalystCommissionTimelineEventType =
  | "commission_generated"
  | "ready_for_payment"
  | "payment_reviewed"
  | "payment_scheduled"
  | "commission_paid"
  | "transaction_confirmed"
  | "wallet_recorded"
  | "tier_updated";

export type AnalystCommissionTimelineEventCategory =
  | "financial"
  | "payout"
  | "administrative";

export type AnalystCommissionTimelineEvent = {
  id: string;
  type: AnalystCommissionTimelineEventType;
  category: AnalystCommissionTimelineEventCategory;
  title: string;
  description?: string;
  timestamp: string;
  status?: "complete" | "current" | "pending" | "error";
};

export type AnalystCommissionPaymentDetails = {
  preferredMethod: AnalystCommissionPaymentMethod;
  paymentFrequency: AnalystCommissionPaymentFrequency;
  lastVerification: string | null;
};

export type AnalystCommissionRecord = {
  id: string;
  analystId: string;
  referralRecordId: string;
  displayName: string;
  handle: string;
  email: string;
  avatarTone: DirectoryAnalyst["avatarTone"];
  partnershipStatus: AnalystReferralPartnershipStatus;
  referralStatus: AnalystReferralStatus;
  commissionStatus: AnalystCommissionStatus;
  summary: AnalystCommissionSummary;
  planBreakdown: AnalystCommissionPlanBreakdown;
  /** Counts mirrored for display — source of truth remains Referrals. */
  referralPlanCounts: AnalystReferralPlanBreakdown;
  successfulReferrals: number;
  tier: AnalystCommissionTier;
  wallet: AnalystCommissionWallet | null;
  paymentDetails: AnalystCommissionPaymentDetails;
  lineItems: AnalystCommissionLineItem[];
  payouts: AnalystPayoutRecord[];
  timeline: AnalystCommissionTimelineEvent[];
};

export type AnalystCommissionFilters = {
  search: string;
  status: AnalystCommissionStatus | "all";
};

/** Profile / Referral Commission Records table filters. */
export type AnalystCommissionLineFilter =
  | "all"
  | "monthly"
  | "quarterly"
  | "yearly"
  | "paid"
  | "ready"
  | "this_month"
  | "last_month";

export type AnalystCommissionDashboardStats = {
  totalAnalysts: number;
  readyForPaymentCount: number;
  totalCommissionGeneratedUsd: number;
  totalAmountToPayUsd: number;
  paidCommissionUsd: number;
  outstandingDueUsd: number;
};

export type AnalystCommissionPayoutQueueItem = {
  record: AnalystCommissionRecord;
  /** Gross of all unpaid (ready) lines. */
  readyGrossUsd: number;
  currentGrossUsd: number;
  dueAmountUsd: number;
  readyTraderCityUsd: number;
  /** Total analyst share to send (current + due). */
  readyAnalystUsd: number;
  readyReferralCount: number;
  readyLineIds: string[];
};

export type AnalystCommissionStatusPresentation = {
  label: string;
  tone: StatusTone;
};

export type AnalystCommissionOperation =
  | "copy_wallet"
  | "copy_tx_hash"
  | "review_payment"
  | "schedule_payout"
  | "complete_payout";

export type AnalystCommissionCompletePayoutInput = {
  transactionHash: string;
  paymentDate?: string;
  notes?: string;
  /** Optional payment evidence filename (exchange screenshot, receipt, etc.). */
  evidenceFileName?: string;
};

/**
 * Canonical tier bands — percentage is a function of monthly business.
 * Do not manually edit percentage in Admin UI.
 */
export const ANALYST_COMMISSION_TIER_BANDS: AnalystCommissionTierBand[] = [
  { minBusinessUsd: 0, maxBusinessUsd: 1000, analystSharePercent: 40 },
  { minBusinessUsd: 1000, maxBusinessUsd: 3000, analystSharePercent: 50 },
  { minBusinessUsd: 3000, maxBusinessUsd: 10000, analystSharePercent: 60 },
  { minBusinessUsd: 10000, maxBusinessUsd: null, analystSharePercent: 70 },
];

/** Mock / display current billing cycle (NestJS will supply). */
export const ANALYST_COMMISSION_CURRENT_CYCLE = "2026-07";
