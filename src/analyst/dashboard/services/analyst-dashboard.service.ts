/**
 * Analyst Dashboard Service — Dashboard Projection Layer.
 *
 * Consumes Analyst Management mocks and returns display-ready slices.
 * Does not own commission/referral/payout engines.
 *
 * TODO(NestJS): replace with GET /analyst/dashboard (authenticated).
 */

import { MOCK_DIRECTORY_ANALYSTS } from "@/lib/analysts/mock/directory-analysts";
import { getMockAnalystReferralByAnalystId } from "@/lib/analysts/mock/referrals";
import { getMockAnalystCommissionByAnalystId } from "@/lib/analysts/mock/commissions";
import { computeNextTierProgress } from "@/lib/analysts/format-commissions";
import { MOCK_AUTHENTICATED_ANALYST_ID } from "@/analyst/dashboard/constants/mock-auth";
import type {
  AnalystDashboardProjection,
  ChartPoint,
  MetricComparison,
} from "@/analyst/dashboard/types";
import { formatPartneredDate } from "@/analyst/dashboard/utils/format";
import {
  buildMilestoneRows,
  milestoneHelperMessage,
  milestoneNameForShare,
} from "@/analyst/dashboard/utils/milestones";
import {
  isLastWeekOfMonth,
  nextPayoutWindowLabel,
} from "@/analyst/dashboard/utils/payout-window";
import { lifecycleStatusLabel } from "@/analyst/dashboard/utils/status-labels";

function comparison(
  value: number | null,
  previousValue: number | null
): MetricComparison {
  if (value === null || previousValue === null || previousValue === 0) {
    return {
      value,
      previousValue,
      changeLabel: previousValue === null ? "—" : "n/a",
    };
  }
  const delta = ((value - previousValue) / previousValue) * 100;
  const rounded = Math.round(delta);
  const changeLabel = `${rounded >= 0 ? "+" : ""}${rounded}%`;
  return { value, previousValue, changeLabel };
}

function mockReferralGrowthPoints(total: number): ChartPoint[] {
  const months = ["Feb", "Mar", "Apr", "May", "Jun", "Jul"];
  const base = Math.max(1, Math.floor(total / 3));
  return months.map((label, i) => ({
    label,
    value: Math.max(0, Math.round(base * (0.45 + i * 0.18) + (i === 5 ? total * 0.15 : 0))),
  }));
}

function mockCommissionTrend(lifetime: number, thisMonth: number): ChartPoint[] {
  const months = ["Feb", "Mar", "Apr", "May", "Jun", "Jul"];
  const avg = Math.max(1, lifetime / 6);
  return months.map((label, i) => ({
    label,
    value:
      i === months.length - 1
        ? thisMonth
        : Math.round(avg * (0.55 + i * 0.12)),
  }));
}

function emptyProjection(analystId: string): AnalystDashboardProjection {
  const emptyMetric = comparison(0, 0);
  return {
    analystId,
    hero: {
      analystId,
      displayName: "Unknown Partner",
      welcomeMessage: "Your partnership is growing every day.",
      partnerStatusLabel: "—",
      partneredAtLabel: "—",
      illustrationLabel: "Partnership",
    },
    overview: {
      totalReferrals: 0,
      paidReferrals: 0,
      activeSubscribers: 0,
      commissionSharePercent: 0,
      currentMonthEarningsUsd: 0,
    },
    performance: {
      clicks: { value: null, previousValue: null, changeLabel: "—" },
      registrations: emptyMetric,
      activeMembers: emptyMetric,
      paidMembers: emptyMetric,
      conversionRateLabel: "—",
      conversionPreviousLabel: "—",
      conversionChangeLabel: "—",
    },
    referralGrowth: {
      points: [],
      note: "Referral growth over time.",
    },
    referralSummary: {
      monthlyMemberships: 0,
      quarterlyMemberships: 0,
      yearlyMemberships: 0,
      totalPaidMembers: 0,
    },
    commissionMilestones: {
      cumulativeEarningsUsd: 0,
      currentSharePercent: 40,
      currentMonthEarningsUsd: 0,
      currentMilestoneName: "Bronze Analyst",
      helperMessage: milestoneHelperMessage(40, 50),
      rows: buildMilestoneRows(0, 40),
    },
    commissionOverview: {
      thisMonthUsd: 0,
      previousMonthUsd: 0,
      lifetimeUsd: 0,
      monthlyTrend: [],
      breakdown: [],
      breakdownTotalUsd: 0,
    },
    payout: {
      availableUsd: 0,
      statusLabel: "No balance",
      windowState: "closed",
      windowHelper:
        "Payout requests can only be submitted during the last week of every month.",
      nextWindowLabel: nextPayoutWindowLabel(),
      tokenLabel: "USDT",
      networkLabel: "BNB Smart Chain (BEP-20)",
      walletAddress: null,
      requestEligible: false,
      requestButtonLabel: "Payout Window Closed",
    },
    requestStatus: {
      hasActiveRequest: false,
      emptyNote: "No active payout request. Submit during the payout window.",
      amountUsd: null,
      estimatedProcessingLabel: "1–3 Business Days",
      timeline: [],
      invoice: null,
    },
    recentPayouts: { recent: [], history: [] },
    helpSupport: {
      commissionPolicy: [
        "Commission tiers are based on cumulative referral earnings.",
        "Bronze 40% · Silver 50% · Gold 60% · Diamond 70%.",
        "Credits: Monthly $10 · Quarterly $30 · Yearly $60 (Lifetime excluded).",
      ],
      payoutFaq: [
        {
          question: "When can I request a payout?",
          answer:
            "During the last week of every month, when your balance is ready.",
        },
        {
          question: "Which network is supported?",
          answer: "USDT on BNB Smart Chain (BEP-20) only.",
        },
        {
          question: "How long does processing take?",
          answer: "Typically 1–3 business days after review.",
        },
      ],
      discordLabel: "Message Admin",
      discordUrl: "https://discord.com/channels/@me",
      supportEmail: "analyst@tradercity.com",
    },
  };
}

export function getAnalystDashboardProjection(
  analystId: string = MOCK_AUTHENTICATED_ANALYST_ID
): AnalystDashboardProjection {
  const directory = MOCK_DIRECTORY_ANALYSTS.find((row) => row.id === analystId);
  if (!directory) return emptyProjection(analystId);

  const referral = getMockAnalystReferralByAnalystId(analystId);
  const commission = getMockAnalystCommissionByAnalystId(analystId);
  const base = emptyProjection(analystId);

  const totalReferrals = referral?.totalReferrals ?? 0;
  const paidReferrals = referral?.successfulReferrals ?? 0;
  const activeVip = referral?.activeVipMembers ?? 0;
  const share = commission?.tier.analystSharePercent ?? 40;
  const cumulative = commission?.tier.cumulativeBusinessUsd ?? 0;
  const thisMonth = commission?.summary.amountPayableUsd ?? 0;
  const lifetime = commission?.summary.totalEarnedUsd ?? 0;
  const previousMonth = Math.round(lifetime * 0.22);
  const tierProgress = computeNextTierProgress(cumulative);

  const prevRegs = Math.max(0, Math.round(totalReferrals * 0.75));
  const prevPaid = Math.max(0, Math.round(paidReferrals * 0.7));
  const prevActive = Math.max(0, Math.round(activeVip * 0.8));

  const conversionLabel =
    totalReferrals > 0
      ? `${Math.round((paidReferrals / totalReferrals) * 100)}%`
      : "—";
  const prevConversion =
    prevRegs > 0 ? `${Math.round((prevPaid / prevRegs) * 100)}%` : "—";

  const windowOpen = isLastWeekOfMonth();
  const hasReadyBalance = (commission?.summary.totalPayableUsd ?? 0) > 0;
  const alreadyRequested = false;
  const windowState = alreadyRequested
    ? "already_requested"
    : windowOpen && hasReadyBalance
      ? "open"
      : "closed";

  const plan = commission?.planBreakdown;
  const breakdown = [
    {
      planLabel: "Monthly Memberships",
      count: plan?.monthly.referralCount ?? referral?.planBreakdown.monthly ?? 0,
      earningsUsd: plan?.monthly.earnedUsd ?? 0,
    },
    {
      planLabel: "Quarterly Memberships",
      count:
        plan?.quarterly.referralCount ?? referral?.planBreakdown.quarterly ?? 0,
      earningsUsd: plan?.quarterly.earnedUsd ?? 0,
    },
    {
      planLabel: "Yearly Memberships",
      count: plan?.yearly.referralCount ?? referral?.planBreakdown.yearly ?? 0,
      earningsUsd: plan?.yearly.earnedUsd ?? 0,
    },
  ];
  const breakdownTotalUsd = breakdown.reduce((s, r) => s + r.earningsUsd, 0);

  const paidPayouts = (commission?.payouts ?? [])
    .filter((p) => p.status === "paid")
    .sort(
      (a, b) =>
        new Date(b.payoutDate).getTime() - new Date(a.payoutDate).getTime()
    )
    .map((p) => ({
      id: p.id,
      monthLabel: new Date(p.payoutDate).toLocaleDateString("en-US", {
        month: "long",
      }),
      statusLabel: "Paid",
      amountUsd: p.analystShareUsd,
    }));

  const latestPaid = paidPayouts[0] ?? null;

  return {
    analystId,
    hero: {
      analystId,
      displayName: directory.displayName,
      welcomeMessage: "Your partnership is growing every day.",
      partnerStatusLabel: lifecycleStatusLabel(directory.status),
      partneredAtLabel: formatPartneredDate(directory.partneredAt),
      illustrationLabel: "Partnership growth",
    },
    overview: {
      totalReferrals,
      paidReferrals,
      activeSubscribers: activeVip,
      commissionSharePercent: share,
      currentMonthEarningsUsd: thisMonth,
    },
    performance: {
      clicks: comparison(null, null),
      registrations: comparison(totalReferrals, prevRegs),
      activeMembers: comparison(activeVip, prevActive),
      paidMembers: comparison(paidReferrals, prevPaid),
      conversionRateLabel: conversionLabel,
      conversionPreviousLabel: prevConversion,
      conversionChangeLabel:
        conversionLabel === "—" || prevConversion === "—"
          ? "—"
          : comparison(
              Number.parseInt(conversionLabel, 10),
              Number.parseInt(prevConversion, 10)
            ).changeLabel,
    },
    referralGrowth: {
      points: mockReferralGrowthPoints(totalReferrals),
      note: "Referral growth over time — no duplicate funnel.",
    },
    referralSummary: {
      monthlyMemberships: referral?.planBreakdown.monthly ?? 0,
      quarterlyMemberships: referral?.planBreakdown.quarterly ?? 0,
      yearlyMemberships: referral?.planBreakdown.yearly ?? 0,
      totalPaidMembers: paidReferrals,
    },
    commissionMilestones: {
      cumulativeEarningsUsd: cumulative,
      currentSharePercent: share,
      currentMonthEarningsUsd: thisMonth,
      currentMilestoneName: milestoneNameForShare(share),
      helperMessage: milestoneHelperMessage(
        share,
        tierProgress.nextAnalystSharePercent
      ),
      rows: buildMilestoneRows(cumulative, share),
    },
    commissionOverview: {
      thisMonthUsd: thisMonth,
      previousMonthUsd: previousMonth,
      lifetimeUsd: lifetime,
      monthlyTrend: mockCommissionTrend(lifetime, thisMonth),
      breakdown,
      breakdownTotalUsd:
        breakdownTotalUsd > 0 ? breakdownTotalUsd : thisMonth,
    },
    payout: {
      availableUsd: commission?.summary.totalPayableUsd ?? 0,
      statusLabel: alreadyRequested
        ? "Already Requested"
        : hasReadyBalance
          ? "Ready for Request"
          : "No balance available",
      windowState,
      windowHelper:
        "Payout requests can only be submitted during the last week of every month.",
      nextWindowLabel: nextPayoutWindowLabel(),
      tokenLabel: "USDT",
      networkLabel: "BNB Smart Chain (BEP-20)",
      walletAddress: commission?.wallet?.address ?? null,
      requestEligible: windowState === "open",
      requestButtonLabel:
        windowState === "open"
          ? "Request Payout"
          : windowState === "already_requested"
            ? "Already Requested"
            : "Payout Window Closed",
    },
    requestStatus: latestPaid
      ? {
          hasActiveRequest: true,
          emptyNote: base.requestStatus.emptyNote,
          amountUsd: latestPaid.amountUsd,
          estimatedProcessingLabel: "1–3 Business Days",
          timeline: [
            {
              id: "submitted",
              label: "Submitted",
              detail: null,
              state: "complete",
            },
            {
              id: "under_review",
              label: "Under Review",
              detail: `USDT ${latestPaid.amountUsd.toFixed(0)} · Estimated Processing 1–3 Business Days`,
              state: "complete",
            },
            {
              id: "paid",
              label: "Paid",
              detail: null,
              state: "complete",
            },
          ],
          invoice: {
            monthlyUsd: breakdown[0]?.earningsUsd ?? 0,
            quarterlyUsd: breakdown[1]?.earningsUsd ?? 0,
            yearlyUsd: breakdown[2]?.earningsUsd ?? 0,
            totalUsd: latestPaid.amountUsd,
            walletAddress: commission?.wallet?.address ?? null,
            requestDateLabel: formatPartneredDate(
              commission?.payouts[0]?.payoutDate ?? directory.partneredAt
            ),
            transactionHash:
              commission?.payouts.find((p) => p.status === "paid")
                ?.transactionHash ?? null,
          },
        }
      : {
          ...base.requestStatus,
          hasActiveRequest: false,
        },
    recentPayouts: {
      recent: paidPayouts.slice(0, 2),
      history: paidPayouts,
    },
    helpSupport: base.helpSupport,
  };
}

/** Stub — NestJS will own eligibility + mutation. */
export function requestPayoutStub(): { ok: false; message: string } {
  return {
    ok: false,
    message: "Payout request will be available after NestJS integration.",
  };
}

/** Stub — NestJS will validate + persist wallet. */
export function updateWalletStub(address: string): {
  ok: false;
  message: string;
} {
  void address;
  return {
    ok: false,
    message: "Wallet updates will be available after NestJS integration.",
  };
}
