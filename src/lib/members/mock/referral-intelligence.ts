import type {
  MemberReferralLeaderboardSnippet,
  ReferralIntelligenceDashboard,
} from "@/types/members/referral-intelligence";

/**
 * Mock Referral Intelligence (Part 2) — UI-only until NestJS BI hooks land.
 * Reward model reference (configurable later): Monthly $10 · Quarterly $30 · Yearly $60.
 */
export const MOCK_REFERRAL_INTELLIGENCE: ReferralIntelligenceDashboard = {
  lastSyncLabel: "2 min ago",
  overview: {
    totalReferralRevenue: 86420,
    revenueThisMonth: 12480,
    revenueThisQuarter: 31250,
    revenueThisYear: 86420,
    registeredReferrals: 2140,
    membershipInProgress: 326,
    successfulMemberships: 1248,
    conversionRate: 58.3,
    averageRevenuePerReferrer: 142.6,
    totalCreditsIssued: 31230,
    totalCreditsRedeemed: 12780,
    unusedReferralCredits: 18450,
    activeReferrers: 606,
    newVipMembersFromReferrals: 1184,
    returningMembers: 64,
  },
  trends: {
    "7d": {
      referralRevenue: [
        { label: "Mon", value: 1420 },
        { label: "Tue", value: 1680 },
        { label: "Wed", value: 1540 },
        { label: "Thu", value: 1920 },
        { label: "Fri", value: 2100 },
        { label: "Sat", value: 1780 },
        { label: "Sun", value: 2040 },
      ],
      membershipSales: [
        { label: "Mon", value: 18 },
        { label: "Tue", value: 22 },
        { label: "Wed", value: 19 },
        { label: "Thu", value: 26 },
        { label: "Fri", value: 28 },
        { label: "Sat", value: 24 },
        { label: "Sun", value: 27 },
      ],
      creditsRedeemed: [
        { label: "Mon", value: 320 },
        { label: "Tue", value: 280 },
        { label: "Wed", value: 410 },
        { label: "Thu", value: 360 },
        { label: "Fri", value: 490 },
        { label: "Sat", value: 380 },
        { label: "Sun", value: 420 },
      ],
      referralGrowth: [
        { label: "Mon", value: 42 },
        { label: "Tue", value: 48 },
        { label: "Wed", value: 45 },
        { label: "Thu", value: 56 },
        { label: "Fri", value: 61 },
        { label: "Sat", value: 52 },
        { label: "Sun", value: 58 },
      ],
    },
    "30d": {
      referralRevenue: [
        { label: "Week 1", value: 8200 },
        { label: "Week 2", value: 9100 },
        { label: "Week 3", value: 10400 },
        { label: "Week 4", value: 12480 },
      ],
      membershipSales: [
        { label: "Week 1", value: 98 },
        { label: "Week 2", value: 112 },
        { label: "Week 3", value: 128 },
        { label: "Week 4", value: 146 },
      ],
      creditsRedeemed: [
        { label: "Week 1", value: 2100 },
        { label: "Week 2", value: 2480 },
        { label: "Week 3", value: 2760 },
        { label: "Week 4", value: 3120 },
      ],
      referralGrowth: [
        { label: "Week 1", value: 180 },
        { label: "Week 2", value: 210 },
        { label: "Week 3", value: 245 },
        { label: "Week 4", value: 286 },
      ],
    },
    quarter: {
      referralRevenue: [
        { label: "May", value: 22150 },
        { label: "Jun", value: 24820 },
        { label: "Jul", value: 21050 },
      ],
      membershipSales: [
        { label: "May", value: 248 },
        { label: "Jun", value: 286 },
        { label: "Jul", value: 240 },
      ],
      creditsRedeemed: [
        { label: "May", value: 5100 },
        { label: "Jun", value: 5800 },
        { label: "Jul", value: 4680 },
      ],
      referralGrowth: [
        { label: "May", value: 510 },
        { label: "Jun", value: 580 },
        { label: "Jul", value: 490 },
      ],
    },
    year: {
      referralRevenue: [
        { label: "Q1", value: 14200 },
        { label: "Q2", value: 24820 },
        { label: "Q3", value: 31250 },
        { label: "Q4", value: 16150 },
      ],
      membershipSales: [
        { label: "Q1", value: 180 },
        { label: "Q2", value: 320 },
        { label: "Q3", value: 410 },
        { label: "Q4", value: 338 },
      ],
      creditsRedeemed: [
        { label: "Q1", value: 2100 },
        { label: "Q2", value: 3800 },
        { label: "Q3", value: 4680 },
        { label: "Q4", value: 2200 },
      ],
      referralGrowth: [
        { label: "Q1", value: 380 },
        { label: "Q2", value: 620 },
        { label: "Q3", value: 740 },
        { label: "Q4", value: 400 },
      ],
    },
  },
  membershipRevenue: [
    {
      plan: "monthly",
      label: "Monthly",
      revenue: 32880,
      purchases: 548,
      averageOrderValue: 60,
      referralContributionPercent: 42.1,
    },
    {
      plan: "quarterly",
      label: "Quarterly",
      revenue: 29160,
      purchases: 162,
      averageOrderValue: 180,
      referralContributionPercent: 28.4,
    },
    {
      plan: "yearly",
      label: "Yearly",
      revenue: 24380,
      purchases: 58,
      averageOrderValue: 420.3,
      referralContributionPercent: 29.5,
    },
  ],
  wallet: {
    totalCreditsIssued: 31230,
    creditsRedeemed: 12780,
    unusedReferralCredits: 18450,
    redemptionRate: 40.9,
    averageWalletBalance: 30.4,
    highestWalletBalance: 320,
  },
  funnel: [
    { id: "link", label: "Referral Link", count: 8420, dropOffPercent: null },
    { id: "registration", label: "Registration", count: 2140, dropOffPercent: 74.6 },
    {
      id: "in_progress",
      label: "Membership In Progress",
      count: 1566,
      dropOffPercent: 26.8,
    },
    {
      id: "activated",
      label: "Membership Activated",
      count: 1248,
      dropOffPercent: 20.3,
    },
    {
      id: "credit_issued",
      label: "Referral Credit Issued",
      count: 1248,
      dropOffPercent: 0,
    },
    {
      id: "credit_redeemed",
      label: "Referral Credit Redeemed",
      count: 512,
      dropOffPercent: 59.0,
    },
  ],
  totalReferralRevenue: 86420,
  leaderboard: [
    {
      username: "ibrahim_trader",
      displayName: "Ibrahim Trader",
      successfulMemberships: 5,
      revenueGenerated: 1980,
      creditsEarned: 540,
      conversionRate: 62.5,
    },
    {
      username: "sara_fx",
      displayName: "Sara FX",
      successfulMemberships: 12,
      revenueGenerated: 1860,
      creditsEarned: 280,
      conversionRate: 80.0,
    },
    {
      username: "omar_charts",
      displayName: "Omar Charts",
      successfulMemberships: 8,
      revenueGenerated: 1240,
      creditsEarned: 160,
      conversionRate: 72.7,
    },
    {
      username: "layla_markets",
      displayName: "Layla Markets",
      successfulMemberships: 6,
      revenueGenerated: 980,
      creditsEarned: 120,
      conversionRate: 66.7,
    },
    {
      username: "yusuf_drift",
      displayName: "Yusuf Drift",
      successfulMemberships: 5,
      revenueGenerated: 750,
      creditsEarned: 80,
      conversionRate: 55.6,
    },
    {
      username: "nathan_edge",
      displayName: "Nathan Edge",
      successfulMemberships: 4,
      revenueGenerated: 720,
      creditsEarned: 90,
      conversionRate: 57.1,
    },
    {
      username: "maya_swing",
      displayName: "Maya Swing",
      successfulMemberships: 3,
      revenueGenerated: 465,
      creditsEarned: 70,
      conversionRate: 50.0,
    },
    {
      username: "kai_levels",
      displayName: "Kai Levels",
      successfulMemberships: 3,
      revenueGenerated: 420,
      creditsEarned: 60,
      conversionRate: 42.9,
    },
  ],
  insights: [
    {
      id: "plan",
      title: "Best-performing membership plan",
      summary:
        "Monthly VIP drives the most referral volume (548 purchases), while Yearly delivers the highest average order value ($420). Growth campaigns should dual-track volume (Monthly) and lifetime value (Yearly).",
      tone: "positive",
    },
    {
      id: "period",
      title: "Highest converting referral period",
      summary:
        "Week 4 of the current month produced the strongest conversion lift — referral revenue rose to $12,480 with 146 membership sales. Reinforce share prompts mid-to-late month.",
      tone: "positive",
    },
    {
      id: "time",
      title: "Average time from registration to membership",
      summary:
        "Referred users convert in ~3.4 days on average. The largest drop-off sits between Referral Link → Registration (74.6%) — tighten onboarding after the first click.",
      tone: "attention",
    },
    {
      id: "value",
      title: "Average referral value",
      summary:
        "Each successful referral generates ~$69.20 in membership revenue for TraderCity, against an average credit cost of $25. Referral unit economics remain healthy.",
      tone: "positive",
    },
    {
      id: "referrer",
      title: "Most active referrer",
      summary:
        "Sara FX leads successful memberships (12) at an 80% conversion rate. Ibrahim Trader leads lifetime revenue attributed ($1,980) — different excellence modes to celebrate.",
      tone: "neutral",
    },
    {
      id: "milestone",
      title: "Members close to the next referral milestone",
      summary:
        "14 members sit at 5/6 successful referrals. A light nudge or in-app milestone prompt could unlock the next redemption wave without changing reward rules.",
      tone: "attention",
    },
  ],
};

/** Simplified member-dashboard snippet — never include revenue attribution. */
export const MOCK_MEMBER_REFERRAL_LEADERBOARD: MemberReferralLeaderboardSnippet = {
  availableCredits: 20,
  lifetimeCreditsEarned: 40,
  successfulReferrals: 2,
  leaderboardRank: 24,
  progressTarget: 6,
  nextMilestoneLabel: "Unlock next month free",
  progressTowardMilestone: 2,
};
