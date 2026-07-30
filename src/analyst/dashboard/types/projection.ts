/**
 * Partner Analyst Dashboard projection DTOs.
 * Display-ready only — never computed as business engines in modules.
 * Source of truth: Analyst Management.
 */

export type MetricComparison = {
  value: number | null;
  previousValue: number | null;
  /** Preformatted MoM delta, e.g. "+12%" or "—" */
  changeLabel: string;
};

export type HeroSlice = {
  analystId: string;
  displayName: string;
  welcomeMessage: string;
  partnerStatusLabel: string;
  partneredAtLabel: string;
  illustrationLabel: string;
};

export type OverviewSlice = {
  totalReferrals: number;
  paidReferrals: number;
  activeSubscribers: number;
  commissionSharePercent: number;
  currentMonthEarningsUsd: number;
};

export type PerformanceSlice = {
  clicks: MetricComparison;
  registrations: MetricComparison;
  activeMembers: MetricComparison;
  paidMembers: MetricComparison;
  conversionRateLabel: string;
  conversionPreviousLabel: string;
  conversionChangeLabel: string;
};

export type ChartPoint = {
  label: string;
  value: number;
};

export type ReferralGrowthSlice = {
  points: ChartPoint[];
  note: string;
};

export type ReferralSummarySlice = {
  monthlyMemberships: number;
  quarterlyMemberships: number;
  yearlyMemberships: number;
  totalPaidMembers: number;
};

export type MilestoneRow = {
  id: "bronze" | "silver" | "gold" | "diamond";
  name: string;
  requiredLabel: string;
  sharePercent: number;
  isCurrent: boolean;
  isUnlocked: boolean;
  progressPercent: number;
};

export type CommissionMilestonesSlice = {
  cumulativeEarningsUsd: number;
  currentSharePercent: number;
  currentMonthEarningsUsd: number;
  currentMilestoneName: string;
  helperMessage: string;
  rows: MilestoneRow[];
};

export type PlanBreakdownRow = {
  planLabel: string;
  count: number;
  earningsUsd: number;
};

export type CommissionOverviewSlice = {
  thisMonthUsd: number;
  previousMonthUsd: number;
  lifetimeUsd: number;
  monthlyTrend: ChartPoint[];
  breakdown: PlanBreakdownRow[];
  breakdownTotalUsd: number;
};

export type PayoutWindowState = "closed" | "open" | "already_requested";

export type PayoutSlice = {
  availableUsd: number;
  statusLabel: string;
  windowState: PayoutWindowState;
  windowHelper: string;
  nextWindowLabel: string;
  tokenLabel: string;
  networkLabel: string;
  walletAddress: string | null;
  requestEligible: boolean;
  requestButtonLabel: string;
};

export type RequestTimelineStep = {
  id: "submitted" | "under_review" | "paid";
  label: string;
  detail: string | null;
  state: "complete" | "current" | "upcoming";
};

export type RequestInvoice = {
  monthlyUsd: number;
  quarterlyUsd: number;
  yearlyUsd: number;
  totalUsd: number;
  walletAddress: string | null;
  requestDateLabel: string;
  transactionHash: string | null;
};

export type RequestStatusSlice = {
  hasActiveRequest: boolean;
  emptyNote: string;
  amountUsd: number | null;
  estimatedProcessingLabel: string;
  timeline: RequestTimelineStep[];
  invoice: RequestInvoice | null;
};

export type RecentPayoutItem = {
  id: string;
  monthLabel: string;
  statusLabel: string;
  amountUsd: number;
};

export type RecentPayoutsSlice = {
  recent: RecentPayoutItem[];
  history: RecentPayoutItem[];
};

export type HelpSupportSlice = {
  commissionPolicy: string[];
  payoutFaq: { question: string; answer: string }[];
  discordLabel: string;
  discordUrl: string;
  supportEmail: string;
};

export type AnalystDashboardProjection = {
  analystId: string;
  hero: HeroSlice;
  overview: OverviewSlice;
  performance: PerformanceSlice;
  referralGrowth: ReferralGrowthSlice;
  referralSummary: ReferralSummarySlice;
  commissionMilestones: CommissionMilestonesSlice;
  commissionOverview: CommissionOverviewSlice;
  payout: PayoutSlice;
  requestStatus: RequestStatusSlice;
  recentPayouts: RecentPayoutsSlice;
  helpSupport: HelpSupportSlice;
};
