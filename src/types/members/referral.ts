import type { StatusTone } from "@/types/admin/common";
import type { MembershipPlanId } from "@/lib/membership/plans";

/** Membership plan shown on referral rows / filters. */
export type ReferralMembershipPlan =
  | "monthly"
  | "quarterly"
  | "yearly"
  | "free";

/** Progress bucket for badges / In Progress filter (target met vs not). */
export type ReferralProgressStatus = "in_progress" | "completed";

/**
 * Progress filter options for Referral Ops (non-activating).
 * Legacy `redeem_requests` is accepted only for redirect → Subscriptions.
 * - `completed` = redeem requested and admin already approved
 */
export type ReferralProgressFilter =
  | ReferralProgressStatus
  | "redeem_requests"
  | "all";

/**
 * Standardized Referral Redeem Request statuses (Activation Center queue).
 * `none` = no redeem request submitted.
 */
export type ReferralRedeemRequestStatus =
  | "none"
  | "waiting_admin_approval"
  | "approved"
  | "rejected"
  | "expired"
  | "cancelled";

export const REFERRAL_REDEEM_STATUS_LABELS: Record<
  Exclude<ReferralRedeemRequestStatus, "none">,
  string
> = {
  waiting_admin_approval: "Waiting Admin Approval",
  approved: "Approved",
  rejected: "Rejected",
  expired: "Expired",
  cancelled: "Cancelled",
};

export const REFERRAL_REDEEM_STATUS_TONES: Record<
  Exclude<ReferralRedeemRequestStatus, "none">,
  StatusTone
> = {
  waiting_admin_approval: "warning",
  approved: "success",
  rejected: "danger",
  expired: "neutral",
  cancelled: "neutral",
};

/** Eligibility for the pending / historical redeem request. */
export type ReferralRedeemEligibility =
  | "eligible"
  | "insufficient_credit"
  | "ineligible";

export const REFERRAL_REDEEM_ELIGIBILITY_LABELS: Record<
  ReferralRedeemEligibility,
  string
> = {
  eligible: "Eligible",
  insufficient_credit: "Insufficient Credit",
  ineligible: "Ineligible",
};

/** Available-credit filter buckets (table stays amount-only). */
export type ReferralCreditFilter = "has_credit" | "no_credit" | "all";

export type ReferralSortKey =
  | "username"
  | "progress"
  | "availableCredit"
  | "latestReferral";

export type ReferralSortDirection = "asc" | "desc";

export type ReferralTimelineItem = {
  id: string;
  title: string;
  description?: string;
  timestamp: string;
  status?: "complete" | "current" | "pending" | "error";
};

export type ReferralActivityItem = {
  id: string;
  title: string;
  description?: string;
  timestamp: string;
};

export type ReferralMember = {
  id: string;
  /** TraderCity member id — profile deep-links. */
  memberId: string;
  username: string;
  displayName: string;
  email: string;
  discordUsername: string;
  referralCode: string;
  referralId: string;
  referralLink: string;
  avatarTone: "discord" | "violet" | "emerald" | "amber" | "rose" | "sky";
  membershipPlan: ReferralMembershipPlan;
  membershipPlanLabel: string;
  membershipStatus: "active" | "expired" | "pending" | "free";
  membershipStatusLabel: string;
  membershipStatusTone: StatusTone;
  joinedAt: string;
  /** Successful referrals toward the visual progress target. */
  successfulReferrals: number;
  pendingReferrals: number;
  /** Progress denominator (e.g. 6) — display only. */
  progressTarget: number;
  progressStatus: ReferralProgressStatus;
  /**
   * Redeem request status — Activation Center processes waiting_admin_approval.
   * Referral Ops never activates membership from this field.
   */
  redeemRequestStatus: ReferralRedeemRequestStatus;
  /**
   * Plan requested via credit redemption (null when no redeem request).
   * Used by Activation Center Wallet Snapshot.
   */
  requestedPlan: MembershipPlanId | null;
  requestedPlanLabel: string | null;
  /** Catalog credits required for requestedPlan (null when none). */
  creditsRequired: number | null;
  redeemEligibility: ReferralRedeemEligibility | null;
  redeemEligibilityLabel: string | null;
  availableCredit: number;
  pendingCredit: number;
  lifetimeEarned: number;
  lifetimeRedeemed: number;
  /** Revenue generated for TraderCity via successful referrals. */
  businessValueGenerated: number;
  latestReferralAt: string | null;
  /** When the redeem request entered Waiting Admin Approval. */
  redeemRequestedAt: string | null;
  timeline: ReferralTimelineItem[];
  activity: ReferralActivityItem[];
};

export type ReferralFilters = {
  search: string;
  membershipPlan: ReferralMembershipPlan | "all";
  progress: ReferralProgressFilter;
  credit: ReferralCreditFilter;
  /**
   * When set (from `?status=pending`), show members with pending referrals
   * (invite/completion pipeline — distinct from Referral Redeem Requests).
   */
  pendingOnly: boolean;
};

/** Filters for Activation Center redeem queue (`?source=referral_redeem`). */
export type ReferralRedeemFilters = {
  search: string;
  membershipPlan: ReferralMembershipPlan | "all";
  credit: ReferralCreditFilter;
  /** Default queue view locks to waiting; allow review of other statuses. */
  status: ReferralRedeemRequestStatus | "all" | "queue";
};

export type ReferralSort = {
  key: ReferralSortKey;
  direction: ReferralSortDirection;
};

export type ReferralStats = {
  successfulReferrals: number;
  successfulTrend: number;
  pendingReferrals: number;
  pendingTrend: number;
  availableCredits: number;
  creditsRedeemed: number;
  totalReferralRevenue: number;
  revenueTrend: number;
  lastSyncLabel: string;
};

export type ReferralRedeemStats = {
  waitingApproval: number;
  approved: number;
  rejected: number;
  lastRefreshLabel: string;
};

export function remainingCreditsAfterRedeem(
  availableCredit: number,
  creditsRequired: number | null
): number | null {
  if (creditsRequired === null) return null;
  return availableCredit - creditsRequired;
}
