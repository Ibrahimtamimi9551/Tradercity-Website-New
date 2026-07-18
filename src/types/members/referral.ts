import type { StatusTone } from "@/types/admin/common";

/** Membership plan shown on referral rows / filters. */
export type ReferralMembershipPlan =
  | "monthly"
  | "quarterly"
  | "yearly"
  | "free";

/** Progress bucket for filters and badges. */
export type ReferralProgressStatus = "in_progress" | "completed";

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
  progress: ReferralProgressStatus | "all";
  /** Dashboard queue uses `status=pending` → maps to pending progress filter. */
  credit: ReferralCreditFilter;
  /** When set (from `?status=pending`), show members with pending referrals. */
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
