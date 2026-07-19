/** Time window for revenue-trend charts. */
export type IntelligencePeriod = "7d" | "30d" | "quarter" | "year";

export type MembershipPlanKey = "monthly" | "quarterly" | "yearly";

/** Executive KPI snapshot — Referral Intelligence Part 2. */
export type ReferralIntelligenceOverview = {
  /** Total referral-attributed membership revenue (all time). */
  totalReferralRevenue: number;
  revenueThisMonth: number;
  revenueThisQuarter: number;
  revenueThisYear: number;
  registeredReferrals: number;
  membershipInProgress: number;
  successfulMemberships: number;
  conversionRate: number;
  averageRevenuePerReferrer: number;
  totalCreditsIssued: number;
  totalCreditsRedeemed: number;
  unusedReferralCredits: number;
  activeReferrers: number;
  newVipMembersFromReferrals: number;
  returningMembers: number;
};

export type TrendPoint = {
  label: string;
  value: number;
};

export type ReferralIntelligenceTrends = {
  period: IntelligencePeriod;
  referralRevenue: TrendPoint[];
  membershipSales: TrendPoint[];
  creditsRedeemed: TrendPoint[];
  referralGrowth: TrendPoint[];
};

export type MembershipRevenueCard = {
  plan: MembershipPlanKey;
  label: string;
  revenue: number;
  purchases: number;
  averageOrderValue: number;
  referralContributionPercent: number;
};

export type WalletIntelligence = {
  totalCreditsIssued: number;
  creditsRedeemed: number;
  unusedReferralCredits: number;
  redemptionRate: number;
  averageWalletBalance: number;
  highestWalletBalance: number;
};

export type FunnelStage = {
  id: string;
  label: string;
  count: number;
  /** Drop-off % from previous stage (null for first). */
  dropOffPercent: number | null;
};

/** Unified referrer performance row — leaderboard + revenue in one place. */
export type LeaderboardContributor = {
  username: string;
  displayName: string;
  successfulMemberships: number;
  revenueGenerated: number;
  creditsEarned: number;
  conversionRate: number;
};

export type LeaderboardSortKey =
  | "revenue"
  | "memberships"
  | "credits"
  | "conversion"
  | "share";

export type BusinessInsight = {
  id: string;
  title: string;
  summary: string;
  tone: "positive" | "neutral" | "attention";
};

export type ReferralIntelligenceDashboard = {
  overview: ReferralIntelligenceOverview;
  trends: Record<IntelligencePeriod, Omit<ReferralIntelligenceTrends, "period">>;
  membershipRevenue: MembershipRevenueCard[];
  wallet: WalletIntelligence;
  funnel: FunnelStage[];
  /** Platform total used for revenue-share % on the leaderboard. */
  totalReferralRevenue: number;
  leaderboard: LeaderboardContributor[];
  insights: BusinessInsight[];
  lastSyncLabel: string;
};

/** Member-facing leaderboard snippet — no business analytics. */
export type MemberReferralLeaderboardSnippet = {
  availableCredits: number;
  lifetimeCreditsEarned: number;
  successfulReferrals: number;
  leaderboardRank: number | null;
  progressTarget: number;
  nextMilestoneLabel: string;
  progressTowardMilestone: number;
};
