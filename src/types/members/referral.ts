import type { StatusTone } from "@/types/admin/common";

/** Membership plan shown on referral rows / filters. */
export type ReferralMembershipPlan =
  | "monthly"
  | "quarterly"
  | "yearly"
  | "free";

/** Progress bucket for badges / In Progress filter (target met vs not). */
export type ReferralProgressStatus = "in_progress" | "completed";

/**
 * Progress filter options — includes the operational redeem queue.
 * - `completed` = redeem requested and admin already approved
 * - `redeem_requests` = Waiting Admin Approval only
 */
export type ReferralProgressFilter =
  | ReferralProgressStatus
  | "redeem_requests"
  | "all";

/** Redeem request operational status (approval queue). */
export type ReferralRedeemRequestStatus =
  | "none"
  | "waiting_admin_approval"
  | "redeemed"
  | "rejected";

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
   * Redeem request queue status.
   * `waiting_admin_approval` = Referral Redeem Requests operational queue.
   */
  redeemRequestStatus: ReferralRedeemRequestStatus;
  availableCredit: number;
  pendingCredit: number;
  lifetimeEarned: number;
  lifetimeRedeemed: number;
  /** Revenue generated for TraderCity via successful referrals. */
  businessValueGenerated: number;
  latestReferralAt: string | null;
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
