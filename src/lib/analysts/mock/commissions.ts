import type {
  AnalystCommissionCreditPlan,
  AnalystCommissionDashboardStats,
  AnalystCommissionLineItem,
  AnalystCommissionLifecycleStatus,
  AnalystCommissionPayoutQueueItem,
  AnalystCommissionRecord,
  AnalystCommissionStatus,
  AnalystCommissionSummary,
  AnalystCommissionTier,
  AnalystCommissionTimelineEvent,
  AnalystCommissionTimelineEventCategory,
  AnalystCommissionTimelineEventType,
  AnalystCommissionWallet,
  AnalystPayoutRecord,
} from "@/types/analysts/commissions";
import {
  ANALYST_COMMISSION_CURRENT_CYCLE,
  ANALYST_REFERRAL_CREDIT_USD,
} from "@/types/analysts/commissions";
import {
  analystShareFromGross,
  billingCycleFromIso,
  buildCommissionTier,
  buildPlanBreakdownFromReferralCounts,
  emptyCommissionPlanBreakdown,
  roundCommissionUsd,
} from "@/lib/analysts/format-commissions";
import {
  getMockAnalystReferral,
  getMockAnalystReferralByAnalystId,
  listMockAnalystReferrals,
} from "@/lib/analysts/mock/referrals";
import type { AnalystReferralRecord } from "@/types/analysts/referrals";

/**
 * Mock Analyst Commission store — Wave F Financial Operations.
 * Referral credit model: Monthly $10 · Quarterly $30 · Yearly $60 (no Lifetime).
 * Lifecycle: Generated → Ready for Payment → Paid (due amounts carry forward).
 *
 * TODO(NestJS): replace with GET /admin/analysts/commissions (+ payout mutations).
 * Production UI must never invent credits — NestJS owns calculation.
 */

const NETWORK_LABEL = "BNB Smart Chain (BEP-20)";

function event(
  id: string,
  type: AnalystCommissionTimelineEventType,
  category: AnalystCommissionTimelineEventCategory,
  title: string,
  timestamp: string,
  description?: string,
  status: AnalystCommissionTimelineEvent["status"] = "complete"
): AnalystCommissionTimelineEvent {
  return { id, type, category, title, description, timestamp, status };
}

function wallet(
  address: string,
  lastVerifiedAt: string | null = null
): AnalystCommissionWallet {
  return {
    address,
    network: "bsc_bep20",
    networkLabel: NETWORK_LABEL,
    token: "USDT",
    lastVerifiedAt,
  };
}

function emptyEvidence() {
  return {
    notes: null,
    screenshotUrl: null,
    receiptUrl: null,
    evidenceLabel: null,
  };
}

function deriveStatus(summary: AnalystCommissionSummary): AnalystCommissionStatus {
  if (summary.dueAmountUsd > 0) return "overdue";
  if (summary.currentCommissionUsd > 0 || summary.totalPayableUsd > 0) {
    return "ready";
  }
  if (summary.paidUsd > 0) return "paid";
  return "none";
}

export function summarizeCommissionFromLines(
  lineItems: AnalystCommissionLineItem[],
  tier: AnalystCommissionTier,
  lastPayoutAt: string | null,
  nextEligiblePayoutAt: string | null,
  paymentReviewedAt: string | null = null,
  currentCycle: string = ANALYST_COMMISSION_CURRENT_CYCLE
): AnalystCommissionSummary {
  let paidUsd = 0;
  let currentGrossUsd = 0;
  let dueGrossUsd = 0;

  for (const item of lineItems) {
    if (item.status === "paid") {
      paidUsd += item.grossUsd;
      continue;
    }
    const cycle = billingCycleFromIso(item.generatedAt);
    if (cycle === currentCycle) currentGrossUsd += item.grossUsd;
    else dueGrossUsd += item.grossUsd;
  }

  const amountPayableUsd = analystShareFromGross(
    currentGrossUsd,
    tier.analystSharePercent
  );
  const dueAmountUsd = analystShareFromGross(
    dueGrossUsd,
    tier.analystSharePercent
  );

  return {
    totalEarnedUsd: paidUsd + currentGrossUsd + dueGrossUsd,
    currentCommissionUsd: currentGrossUsd,
    amountPayableUsd,
    dueAmountUsd,
    totalPayableUsd: roundCommissionUsd(amountPayableUsd + dueAmountUsd),
    paidUsd,
    lastPayoutAt,
    nextEligiblePayoutAt,
    paymentReviewedAt,
  };
}

type LineDraft = {
  id: string;
  status: AnalystCommissionLifecycleStatus;
  plan: AnalystCommissionCreditPlan;
  memberId: string;
  memberDisplayName: string;
  purchaseDate: string;
  generatedAt: string;
  reviewedAt?: string | null;
  paidAt?: string | null;
  payoutId?: string | null;
};

function makeLines(
  referral: AnalystReferralRecord,
  drafts: LineDraft[]
): AnalystCommissionLineItem[] {
  const commissionRecordId = `acom-${referral.analystId}`;
  return drafts.map((d) => ({
    id: d.id,
    analystId: referral.analystId,
    commissionRecordId,
    analystDisplayName: referral.displayName,
    status: d.status,
    grossUsd: ANALYST_REFERRAL_CREDIT_USD[d.plan],
    generatedAt: d.generatedAt,
    reviewedAt: d.reviewedAt ?? null,
    paidAt: d.paidAt ?? null,
    payoutId: d.payoutId ?? null,
    conversion: {
      referralRecordId: referral.id,
      memberId: d.memberId,
      memberDisplayName: d.memberDisplayName,
      membershipPlan: d.plan,
      purchaseDate: d.purchaseDate,
    },
  }));
}

function payout(partial: AnalystPayoutRecord): AnalystPayoutRecord {
  return { ...partial, disputeReady: true };
}

function buildFromReferral(
  referral: AnalystReferralRecord,
  overrides: {
    lineItems: AnalystCommissionLineItem[];
    payouts?: AnalystPayoutRecord[];
    timeline?: AnalystCommissionTimelineEvent[];
    monthlyBusinessUsd: number;
    billingCycleMonth?: string;
    wallet?: AnalystCommissionWallet | null;
    nextEligiblePayoutAt?: string | null;
  }
): AnalystCommissionRecord {
  const payouts = overrides.payouts ?? [];
  const lastPayoutAt =
    payouts.filter((p) => p.status === "paid").at(-1)?.paymentDate ?? null;
  const tier = buildCommissionTier(
    overrides.billingCycleMonth ?? ANALYST_COMMISSION_CURRENT_CYCLE,
    overrides.monthlyBusinessUsd
  );
  const summary = summarizeCommissionFromLines(
    overrides.lineItems,
    tier,
    lastPayoutAt,
    overrides.nextEligiblePayoutAt ?? null
  );
  const walletValue = overrides.wallet === undefined ? null : overrides.wallet;
  const planBreakdown = buildPlanBreakdownFromReferralCounts(
    referral.planBreakdown
  );

  return {
    id: `acom-${referral.analystId}`,
    analystId: referral.analystId,
    referralRecordId: referral.id,
    displayName: referral.displayName,
    handle: referral.handle,
    email: referral.email,
    avatarTone: referral.avatarTone,
    partnershipStatus: referral.partnershipStatus,
    referralStatus: referral.status,
    commissionStatus: deriveStatus(summary),
    summary,
    planBreakdown,
    referralPlanCounts: referral.planBreakdown,
    successfulReferrals: referral.successfulReferrals,
    tier,
    wallet: walletValue,
    paymentDetails: {
      preferredMethod: "usdt_bep20",
      paymentFrequency: "monthly",
      lastVerification: walletValue?.lastVerifiedAt ?? null,
    },
    lineItems: overrides.lineItems,
    payouts,
    timeline: overrides.timeline ?? [],
  };
}

function buildInitialStore(): AnalystCommissionRecord[] {
  const ref = (analystId: string) => {
    const r = getMockAnalystReferralByAnalystId(analystId);
    if (!r) throw new Error(`Missing referral for ${analystId}`);
    return r;
  };

  const alpha = ref("a-002");
  const alphaLines = makeLines(alpha, [
    {
      id: "cline-a002-1",
      status: "paid",
      plan: "yearly",
      memberId: "m-001",
      memberDisplayName: "Jordan Lee",
      purchaseDate: "2026-05-10T12:00:00.000Z",
      generatedAt: "2026-05-10T12:00:00.000Z",
      reviewedAt: "2026-05-12T09:00:00.000Z",
      paidAt: "2026-05-15T14:00:00.000Z",
      payoutId: "payout-a002-1",
    },
    {
      id: "cline-a002-2",
      status: "paid",
      plan: "quarterly",
      memberId: "m-002",
      memberDisplayName: "Sam Rivera",
      purchaseDate: "2026-06-08T11:00:00.000Z",
      generatedAt: "2026-06-08T11:00:00.000Z",
      reviewedAt: "2026-06-10T09:00:00.000Z",
      paidAt: "2026-06-15T16:00:00.000Z",
      payoutId: "payout-a002-2",
    },
    {
      id: "cline-a002-3",
      status: "paid",
      plan: "monthly",
      memberId: "m-003",
      memberDisplayName: "Alex Morgan",
      purchaseDate: "2026-06-12T09:00:00.000Z",
      generatedAt: "2026-06-12T09:00:00.000Z",
      reviewedAt: "2026-06-13T09:00:00.000Z",
      paidAt: "2026-06-15T16:00:00.000Z",
      payoutId: "payout-a002-2",
    },
    {
      id: "cline-a002-4",
      status: "ready",
      plan: "yearly",
      memberId: "m-004",
      memberDisplayName: "Casey Ng",
      purchaseDate: "2026-07-12T10:00:00.000Z",
      generatedAt: "2026-07-12T10:00:00.000Z",
      reviewedAt: "2026-07-14T09:00:00.000Z",
    },
    {
      id: "cline-a002-5",
      status: "ready",
      plan: "quarterly",
      memberId: "m-005",
      memberDisplayName: "Riley Quinn",
      purchaseDate: "2026-07-15T14:00:00.000Z",
      generatedAt: "2026-07-15T14:00:00.000Z",
      reviewedAt: "2026-07-16T09:00:00.000Z",
    },
    {
      id: "cline-a002-6",
      status: "ready",
      plan: "monthly",
      memberId: "m-007",
      memberDisplayName: "Morgan Blake",
      purchaseDate: "2026-07-22T08:00:00.000Z",
      generatedAt: "2026-07-22T08:00:00.000Z",
    },
    {
      id: "cline-a002-7",
      status: "ready",
      plan: "monthly",
      memberId: "m-008",
      memberDisplayName: "Taylor Brooks",
      purchaseDate: "2026-07-24T11:00:00.000Z",
      generatedAt: "2026-07-24T11:00:00.000Z",
    },
  ]);

  const luna = ref("a-001");
  const lunaLines = makeLines(luna, [
    {
      id: "cline-a001-1",
      status: "ready",
      plan: "monthly",
      memberId: "m-009",
      memberDisplayName: "John Doe",
      purchaseDate: "2026-07-18T10:00:00.000Z",
      generatedAt: "2026-07-18T10:00:00.000Z",
      reviewedAt: "2026-07-20T11:00:00.000Z",
    },
    {
      id: "cline-a001-2",
      status: "ready",
      plan: "quarterly",
      memberId: "m-010",
      memberDisplayName: "Ava Chen",
      purchaseDate: "2026-07-21T09:00:00.000Z",
      generatedAt: "2026-07-21T09:00:00.000Z",
      reviewedAt: "2026-07-22T09:00:00.000Z",
    },
    {
      id: "cline-a001-3",
      status: "ready",
      plan: "yearly",
      memberId: "m-011",
      memberDisplayName: "Noah Patel",
      purchaseDate: "2026-07-23T16:00:00.000Z",
      generatedAt: "2026-07-23T16:00:00.000Z",
      reviewedAt: "2026-07-24T09:00:00.000Z",
    },
  ]);

  const vault = ref("a-010");
  const vaultLines = makeLines(vault, [
    {
      id: "cline-a010-1",
      status: "ready",
      plan: "monthly",
      memberId: "m-012",
      memberDisplayName: "Riley Park",
      purchaseDate: "2026-07-23T12:30:00.000Z",
      generatedAt: "2026-07-23T12:30:00.000Z",
    },
  ]);

  const forge = ref("a-008");
  const forgeLines = makeLines(forge, [
    {
      id: "cline-a008-1",
      status: "paid",
      plan: "yearly",
      memberId: "m-001",
      memberDisplayName: "Taylor Kim",
      purchaseDate: "2026-04-10T10:00:00.000Z",
      generatedAt: "2026-04-10T10:00:00.000Z",
      reviewedAt: "2026-04-12T10:00:00.000Z",
      paidAt: "2026-04-15T11:00:00.000Z",
      payoutId: "payout-a008-1",
    },
    {
      id: "cline-a008-2",
      status: "ready",
      plan: "quarterly",
      memberId: "m-002",
      memberDisplayName: "Quinn Ortiz",
      purchaseDate: "2026-07-19T15:00:00.000Z",
      generatedAt: "2026-07-19T15:00:00.000Z",
    },
  ]);

  const beacon = ref("a-012");
  const beaconLines = makeLines(beacon, [
    {
      id: "cline-a012-1",
      status: "paid",
      plan: "yearly",
      memberId: "m-003",
      memberDisplayName: "Drew Patel",
      purchaseDate: "2026-05-20T10:00:00.000Z",
      generatedAt: "2026-05-20T10:00:00.000Z",
      reviewedAt: "2026-05-22T10:00:00.000Z",
      paidAt: "2026-05-31T12:00:00.000Z",
      payoutId: "payout-a012-1",
    },
    {
      id: "cline-a012-2",
      status: "ready",
      plan: "yearly",
      memberId: "m-004",
      memberDisplayName: "Jamie Soto",
      purchaseDate: "2026-07-08T10:00:00.000Z",
      generatedAt: "2026-07-08T10:00:00.000Z",
      reviewedAt: "2026-07-10T10:00:00.000Z",
    },
    {
      id: "cline-a012-3",
      status: "ready",
      plan: "quarterly",
      memberId: "m-005",
      memberDisplayName: "Chris Vale",
      purchaseDate: "2026-07-11T10:00:00.000Z",
      generatedAt: "2026-07-11T10:00:00.000Z",
      reviewedAt: "2026-07-12T10:00:00.000Z",
    },
  ]);

  const edge = ref("a-005");
  const edgeLines = makeLines(edge, [
    {
      id: "cline-a005-1",
      status: "paid",
      plan: "quarterly",
      memberId: "m-006",
      memberDisplayName: "Pat Nolan",
      purchaseDate: "2025-10-18T08:30:00.000Z",
      generatedAt: "2025-10-18T08:30:00.000Z",
      reviewedAt: "2025-10-20T08:30:00.000Z",
      paidAt: "2025-10-31T10:00:00.000Z",
      payoutId: "payout-a005-1",
    },
    {
      id: "cline-a005-2",
      status: "ready",
      plan: "monthly",
      memberId: "m-007",
      memberDisplayName: "Sam Vale",
      purchaseDate: "2026-06-01T10:00:00.000Z",
      generatedAt: "2026-06-01T10:00:00.000Z",
      reviewedAt: "2026-06-02T10:00:00.000Z",
    },
  ]);

  const priya = ref("a-app-007");
  const priyaLines = makeLines(priya, [
    {
      id: "cline-app007-1",
      status: "paid",
      plan: "quarterly",
      memberId: "m-008",
      memberDisplayName: "Elena Ruiz",
      purchaseDate: "2026-07-19T10:00:00.000Z",
      generatedAt: "2026-07-19T10:00:00.000Z",
      reviewedAt: "2026-07-20T10:00:00.000Z",
      paidAt: "2026-07-22T15:00:00.000Z",
      payoutId: "payout-app007-1",
    },
    {
      id: "cline-app007-2",
      status: "paid",
      plan: "monthly",
      memberId: "m-009",
      memberDisplayName: "Omar Faris",
      purchaseDate: "2026-07-20T12:00:00.000Z",
      generatedAt: "2026-07-20T12:00:00.000Z",
      reviewedAt: "2026-07-20T14:00:00.000Z",
      paidAt: "2026-07-22T15:00:00.000Z",
      payoutId: "payout-app007-1",
    },
  ]);

  return [
    buildFromReferral(alpha, {
      monthlyBusinessUsd: 12400,
      wallet: wallet(
        "0x7A8B3c4d5e6f7890a1b2c3d4e5f6789092CF",
        "2026-06-01T10:00:00.000Z"
      ),
      nextEligiblePayoutAt: "2026-08-01T00:00:00.000Z",
      lineItems: alphaLines,
      payouts: [
        payout({
          id: "payout-a002-1",
          analystId: "a-002",
          commissionRecordId: "acom-a-002",
          analystDisplayName: "Alpha Flow",
          payoutDate: "2026-05-15T00:00:00.000Z",
          grossCommissionUsd: 60,
          traderCityShareUsd: 18,
          analystShareUsd: 42,
          referralCountIncluded: 1,
          status: "paid",
          transactionHash:
            "0xabc123def4567890abc123def4567890abc123def4567890abc123def4567890",
          network: "bsc_bep20",
          networkLabel: NETWORK_LABEL,
          token: "USDT",
          paymentDate: "2026-05-15T14:00:00.000Z",
          walletAddress: "0x7A8B3c4d5e6f7890a1b2c3d4e5f6789092CF",
          evidence: emptyEvidence(),
          commissionLineIds: ["cline-a002-1"],
          disputeReady: true,
        }),
        payout({
          id: "payout-a002-2",
          analystId: "a-002",
          commissionRecordId: "acom-a-002",
          analystDisplayName: "Alpha Flow",
          payoutDate: "2026-06-15T00:00:00.000Z",
          grossCommissionUsd: 40,
          traderCityShareUsd: 12,
          analystShareUsd: 28,
          referralCountIncluded: 2,
          status: "paid",
          transactionHash:
            "0xdef456abc7890123def456abc7890123def456abc7890123def456abc7890123",
          network: "bsc_bep20",
          networkLabel: NETWORK_LABEL,
          token: "USDT",
          paymentDate: "2026-06-15T16:00:00.000Z",
          walletAddress: "0x7A8B3c4d5e6f7890a1b2c3d4e5f6789092CF",
          evidence: {
            notes: "Cycle June — confirmed on BSCScan",
            screenshotUrl: null,
            receiptUrl: null,
            evidenceLabel: null,
          },
          commissionLineIds: ["cline-a002-2", "cline-a002-3"],
          disputeReady: true,
        }),
      ],
      timeline: [
        event(
          "ctl-a002-1",
          "commission_generated",
          "financial",
          "Commission Generated",
          "2026-05-10T12:00:00.000Z",
          "Yearly plan — Jordan Lee · $60 credit."
        ),
        event(
          "ctl-a002-2",
          "ready_for_payment",
          "financial",
          "Ready for Payment",
          "2026-05-12T09:00:00.000Z"
        ),
        event(
          "ctl-a002-3",
          "commission_paid",
          "payout",
          "Commission Paid",
          "2026-05-15T14:00:00.000Z",
          "USDT BEP-20 transfer recorded."
        ),
        event(
          "ctl-a002-4",
          "transaction_confirmed",
          "payout",
          "Transaction Confirmed",
          "2026-05-15T14:05:00.000Z",
          "Tx hash stored on ledger."
        ),
        event(
          "ctl-a002-5",
          "tier_updated",
          "administrative",
          "Tier Updated",
          "2026-07-01T00:00:00.000Z",
          "Monthly business crossed $10,000 — 70% analyst share."
        ),
        event(
          "ctl-a002-6",
          "commission_generated",
          "financial",
          "Commission Generated",
          "2026-07-22T08:00:00.000Z",
          "Monthly plan — Morgan Blake · $10 credit."
        ),
        event(
          "ctl-a002-7",
          "ready_for_payment",
          "financial",
          "Ready for Payment",
          "2026-07-14T09:00:00.000Z",
          "Yearly conversion ready for payout.",
          "current"
        ),
      ],
    }),

    buildFromReferral(luna, {
      monthlyBusinessUsd: 1850,
      wallet: wallet(
        "0x91F2e3d4c5b6a7980123456789abcdef01234567",
        "2026-07-20T09:00:00.000Z"
      ),
      nextEligiblePayoutAt: "2026-08-01T00:00:00.000Z",
      lineItems: lunaLines,
      timeline: [
        event(
          "ctl-a001-1",
          "wallet_recorded",
          "administrative",
          "Wallet Recorded",
          "2026-07-20T09:00:00.000Z",
          "USDT BEP-20 destination verified."
        ),
        event(
          "ctl-a001-2",
          "commission_generated",
          "financial",
          "Commission Generated",
          "2026-07-18T10:00:00.000Z",
          "Monthly VIP — John Doe · $10 credit."
        ),
        event(
          "ctl-a001-3",
          "ready_for_payment",
          "financial",
          "Ready for Payment",
          "2026-07-22T09:00:00.000Z",
          "Ready for payout cycle.",
          "current"
        ),
      ],
    }),

    buildFromReferral(vault, {
      monthlyBusinessUsd: 420,
      wallet: wallet("0x55AaBbCcDdEeFf00112233445566778899AaBbCc"),
      nextEligiblePayoutAt: "2026-08-15T00:00:00.000Z",
      lineItems: vaultLines,
      timeline: [
        event(
          "ctl-a010-1",
          "commission_generated",
          "financial",
          "Commission Generated",
          "2026-07-23T12:30:00.000Z",
          "Monthly plan — $10 credit ready for payment.",
          "current"
        ),
      ],
    }),

    buildFromReferral(ref("a-006"), {
      monthlyBusinessUsd: 0,
      wallet: null,
      nextEligiblePayoutAt: null,
      lineItems: [],
      timeline: [
        event(
          "ctl-a006-1",
          "wallet_recorded",
          "administrative",
          "Commission Identity Created",
          "2026-01-10T08:20:00.000Z",
          "No conversions yet — financial ledger idle.",
          "pending"
        ),
      ],
    }),

    buildFromReferral(forge, {
      monthlyBusinessUsd: 2400,
      wallet: wallet(
        "0x22Bb33Cc44Dd55Ee66Ff77889900AaBbCcDdEeFf",
        "2026-04-01T12:00:00.000Z"
      ),
      nextEligiblePayoutAt: "2026-08-01T00:00:00.000Z",
      lineItems: forgeLines,
      payouts: [
        payout({
          id: "payout-a008-1",
          analystId: "a-008",
          commissionRecordId: "acom-a-008",
          analystDisplayName: "Signal Forge",
          payoutDate: "2026-04-15T00:00:00.000Z",
          grossCommissionUsd: 60,
          traderCityShareUsd: 30,
          analystShareUsd: 30,
          referralCountIncluded: 1,
          status: "paid",
          transactionHash:
            "0x11223344556677889900aabbccddeeff11223344556677889900aabbccddeeff",
          network: "bsc_bep20",
          networkLabel: NETWORK_LABEL,
          token: "USDT",
          paymentDate: "2026-04-15T11:00:00.000Z",
          walletAddress: "0x22Bb33Cc44Dd55Ee66Ff77889900AaBbCcDdEeFf",
          evidence: emptyEvidence(),
          commissionLineIds: ["cline-a008-1"],
          disputeReady: true,
        }),
      ],
      timeline: [
        event(
          "ctl-a008-1",
          "commission_paid",
          "payout",
          "Commission Paid",
          "2026-04-15T11:00:00.000Z"
        ),
        event(
          "ctl-a008-2",
          "commission_generated",
          "financial",
          "Commission Generated",
          "2026-07-19T15:00:00.000Z",
          "Quarterly plan — $30 credit ready for payment.",
          "current"
        ),
      ],
    }),

    buildFromReferral(beacon, {
      monthlyBusinessUsd: 5200,
      wallet: wallet(
        "0xAa11Bb22Cc33Dd44Ee55Ff6677889900AaBbCcDd",
        "2026-05-01T08:00:00.000Z"
      ),
      nextEligiblePayoutAt: "2026-08-01T00:00:00.000Z",
      lineItems: beaconLines,
      payouts: [
        payout({
          id: "payout-a012-1",
          analystId: "a-012",
          commissionRecordId: "acom-a-012",
          analystDisplayName: "Beacon Desk",
          payoutDate: "2026-05-31T00:00:00.000Z",
          grossCommissionUsd: 60,
          traderCityShareUsd: 24,
          analystShareUsd: 36,
          referralCountIncluded: 1,
          status: "paid",
          transactionHash:
            "0x99887766554433221100ffeeddccbbaa99887766554433221100ffeeddccbbaa",
          network: "bsc_bep20",
          networkLabel: NETWORK_LABEL,
          token: "USDT",
          paymentDate: "2026-05-31T12:00:00.000Z",
          walletAddress: "0xAa11Bb22Cc33Dd44Ee55Ff6677889900AaBbCcDd",
          evidence: emptyEvidence(),
          commissionLineIds: ["cline-a012-1"],
          disputeReady: true,
        }),
      ],
      timeline: [
        event(
          "ctl-a012-1",
          "transaction_confirmed",
          "payout",
          "Transaction Confirmed",
          "2026-05-31T12:05:00.000Z"
        ),
        event(
          "ctl-a012-2",
          "payment_scheduled",
          "payout",
          "Payment Scheduled",
          "2026-07-25T09:00:00.000Z",
          "Ready balance queued for August cycle.",
          "current"
        ),
      ],
    }),

    buildFromReferral(edge, {
      monthlyBusinessUsd: 900,
      wallet: wallet("0xDeadBeef00001111222233334444555566667777"),
      nextEligiblePayoutAt: null,
      lineItems: edgeLines,
      payouts: [
        payout({
          id: "payout-a005-1",
          analystId: "a-005",
          commissionRecordId: "acom-a-005",
          analystDisplayName: "Edge Signals",
          payoutDate: "2025-10-31T00:00:00.000Z",
          grossCommissionUsd: 30,
          traderCityShareUsd: 18,
          analystShareUsd: 12,
          referralCountIncluded: 1,
          status: "paid",
          transactionHash:
            "0xeee111222333444555666777888999000aaabbbcccdddeeefff0001112223334",
          network: "bsc_bep20",
          networkLabel: NETWORK_LABEL,
          token: "USDT",
          paymentDate: "2025-10-31T10:00:00.000Z",
          walletAddress: "0xDeadBeef00001111222233334444555566667777",
          evidence: emptyEvidence(),
          commissionLineIds: ["cline-a005-1"],
          disputeReady: true,
        }),
      ],
      timeline: [
        event(
          "ctl-a005-1",
          "commission_paid",
          "payout",
          "Commission Paid",
          "2025-10-31T10:00:00.000Z"
        ),
        event(
          "ctl-a005-2",
          "ready_for_payment",
          "financial",
          "Ready for Payment",
          "2026-06-02T10:00:00.000Z",
          "Prior-cycle amount carried forward as Due — partnership suspended.",
          "error"
        ),
      ],
    }),

    buildFromReferral(priya, {
      monthlyBusinessUsd: 1100,
      wallet: wallet(
        "0xCafeBabe11223344556677889900AabbCcdDeeFf",
        "2026-07-18T10:00:00.000Z"
      ),
      nextEligiblePayoutAt: "2026-08-15T00:00:00.000Z",
      lineItems: priyaLines,
      payouts: [
        payout({
          id: "payout-app007-1",
          analystId: "a-app-007",
          commissionRecordId: "acom-a-app-007",
          analystDisplayName: "Priya Nair",
          payoutDate: "2026-07-22T00:00:00.000Z",
          grossCommissionUsd: 40,
          traderCityShareUsd: 20,
          analystShareUsd: 20,
          referralCountIncluded: 2,
          status: "paid",
          transactionHash:
            "0xbbccddeeff00112233445566778899aabbccddeeff00112233445566778899aa",
          network: "bsc_bep20",
          networkLabel: NETWORK_LABEL,
          token: "USDT",
          paymentDate: "2026-07-22T15:00:00.000Z",
          walletAddress: "0xCafeBabe11223344556677889900AabbCcdDeeFf",
          evidence: emptyEvidence(),
          commissionLineIds: ["cline-app007-1", "cline-app007-2"],
          disputeReady: true,
        }),
      ],
      timeline: [
        event(
          "ctl-app007-1",
          "commission_generated",
          "financial",
          "Commission Generated",
          "2026-07-19T10:00:00.000Z"
        ),
        event(
          "ctl-app007-2",
          "ready_for_payment",
          "financial",
          "Ready for Payment",
          "2026-07-20T10:00:00.000Z"
        ),
        event(
          "ctl-app007-3",
          "payment_scheduled",
          "payout",
          "Payment Scheduled",
          "2026-07-21T09:00:00.000Z"
        ),
        event(
          "ctl-app007-4",
          "commission_paid",
          "payout",
          "Commission Paid",
          "2026-07-22T15:00:00.000Z"
        ),
        event(
          "ctl-app007-5",
          "transaction_confirmed",
          "payout",
          "Transaction Confirmed",
          "2026-07-22T15:02:00.000Z"
        ),
      ],
    }),
  ];
}

let store: AnalystCommissionRecord[] | null = null;

function ensureStore(): AnalystCommissionRecord[] {
  if (!store) store = buildInitialStore();
  return store;
}

export function resetMockAnalystCommissions() {
  store = buildInitialStore();
}

export function listMockAnalystCommissions(): AnalystCommissionRecord[] {
  return ensureStore().map((row) => ({ ...row }));
}

export function getMockAnalystCommission(
  id: string
): AnalystCommissionRecord | null {
  return ensureStore().find((r) => r.id === id) ?? null;
}

export function getMockAnalystCommissionByAnalystId(
  analystId: string
): AnalystCommissionRecord | null {
  return ensureStore().find((r) => r.analystId === analystId) ?? null;
}

export function upsertMockAnalystCommission(
  record: AnalystCommissionRecord
): void {
  const rows = ensureStore();
  const idx = rows.findIndex((r) => r.id === record.id);
  if (idx >= 0) rows[idx] = record;
  else rows.push(record);
}

export function appendAnalystCommissionTimelineEvent(
  commissionId: string,
  timelineEvent: AnalystCommissionTimelineEvent
): void {
  const rows = ensureStore();
  const idx = rows.findIndex((r) => r.id === commissionId);
  if (idx < 0) return;
  const current = rows[idx];
  rows[idx] = {
    ...current,
    timeline: [...current.timeline, timelineEvent],
  };
}

export function computeAnalystCommissionStats(
  rows: AnalystCommissionRecord[]
): AnalystCommissionDashboardStats {
  let totalCommissionGeneratedUsd = 0;
  let totalAmountToPayUsd = 0;
  let paidCommissionUsd = 0;
  let outstandingDueUsd = 0;
  let readyForPaymentCount = 0;

  for (const row of rows) {
    totalCommissionGeneratedUsd += row.summary.totalEarnedUsd;
    totalAmountToPayUsd += row.summary.totalPayableUsd;
    paidCommissionUsd += row.summary.paidUsd;
    outstandingDueUsd += row.summary.dueAmountUsd;
    if (row.summary.totalPayableUsd > 0 && row.wallet) {
      readyForPaymentCount += 1;
    }
  }

  return {
    totalAnalysts: rows.length,
    readyForPaymentCount,
    totalCommissionGeneratedUsd: roundCommissionUsd(totalCommissionGeneratedUsd),
    totalAmountToPayUsd: roundCommissionUsd(totalAmountToPayUsd),
    paidCommissionUsd: roundCommissionUsd(paidCommissionUsd),
    outstandingDueUsd: roundCommissionUsd(outstandingDueUsd),
  };
}

export function computeAnalystCommissionPayoutQueue(
  rows: AnalystCommissionRecord[]
): AnalystCommissionPayoutQueueItem[] {
  return rows
    .map((record) => {
      const readyLines = record.lineItems.filter((l) => l.status === "ready");
      const readyGrossUsd = readyLines.reduce((s, l) => s + l.grossUsd, 0);
      if (readyGrossUsd <= 0 || !record.wallet) return null;
      const readyAnalystUsd = record.summary.totalPayableUsd;
      const readyTraderCityUsd = roundCommissionUsd(
        readyGrossUsd - readyAnalystUsd
      );
      return {
        record,
        readyGrossUsd,
        currentGrossUsd: record.summary.currentCommissionUsd,
        dueAmountUsd: record.summary.dueAmountUsd,
        readyTraderCityUsd,
        readyAnalystUsd,
        readyReferralCount: readyLines.length,
        readyLineIds: readyLines.map((l) => l.id),
      } satisfies AnalystCommissionPayoutQueueItem;
    })
    .filter((item): item is AnalystCommissionPayoutQueueItem => item !== null)
    .sort((a, b) => b.readyAnalystUsd - a.readyAnalystUsd);
}

export function listMockAnalystPayoutHistory(): AnalystPayoutRecord[] {
  return ensureStore()
    .flatMap((r) => r.payouts)
    .slice()
    .sort((a, b) => {
      const ta = new Date(a.paymentDate ?? a.payoutDate).getTime();
      const tb = new Date(b.paymentDate ?? b.payoutDate).getTime();
      return tb - ta;
    });
}

/** Flattened commission lines across analysts — foundation ledger view. */
export function listMockAnalystCommissionLines(): AnalystCommissionLineItem[] {
  return ensureStore()
    .flatMap((r) => r.lineItems)
    .slice()
    .sort((a, b) => {
      return (
        new Date(b.conversion.purchaseDate).getTime() -
        new Date(a.conversion.purchaseDate).getTime()
      );
    });
}

export function ensureCommissionIdentityForReferral(
  referralId: string
): AnalystCommissionRecord | null {
  const referral = getMockAnalystReferral(referralId);
  if (!referral) return null;
  const existing = getMockAnalystCommissionByAnalystId(referral.analystId);
  if (existing) return existing;

  const created = buildFromReferral(referral, {
    monthlyBusinessUsd: 0,
    wallet: null,
    lineItems: [],
    timeline: [
      event(
        `ctl-${referral.analystId}-born`,
        "wallet_recorded",
        "administrative",
        "Commission Identity Created",
        new Date().toISOString(),
        "Provisioned with Operationally Ready — awaiting conversions."
      ),
    ],
  });
  // Keep empty plan breakdown for brand-new identities
  created.planBreakdown = emptyCommissionPlanBreakdown();
  upsertMockAnalystCommission(created);
  return created;
}

export function syncCommissionIdentityFromReferrals(): void {
  const rows = ensureStore();
  for (let i = 0; i < rows.length; i++) {
    const referral = getMockAnalystReferralByAnalystId(rows[i].analystId);
    if (!referral) continue;
    rows[i] = {
      ...rows[i],
      referralRecordId: referral.id,
      displayName: referral.displayName,
      handle: referral.handle,
      email: referral.email,
      avatarTone: referral.avatarTone,
      partnershipStatus: referral.partnershipStatus,
      referralStatus: referral.status,
      referralPlanCounts: referral.planBreakdown,
      successfulReferrals: referral.successfulReferrals,
      planBreakdown: buildPlanBreakdownFromReferralCounts(
        referral.planBreakdown
      ),
      tier: buildCommissionTier(
        rows[i].tier.billingCycleMonth,
        rows[i].tier.cumulativeBusinessUsd
      ),
    };
  }
}

export function listCommissionEligibleReferralIds(): string[] {
  return listMockAnalystReferrals()
    .filter((r) => r.commissionReady)
    .map((r) => r.id);
}
