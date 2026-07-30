import type {
  AnalystCommissionCompletePayoutInput,
  AnalystCommissionOperation,
  AnalystCommissionRecord,
  AnalystCommissionTimelineEvent,
  AnalystPayoutRecord,
} from "@/types/analysts/commissions";
import {
  appendAnalystCommissionTimelineEvent,
  getMockAnalystCommission,
  summarizeCommissionFromLines,
  upsertMockAnalystCommission,
} from "@/lib/analysts/mock/commissions";

/**
 * Mock commission mutations — Wave F operational UX.
 * TODO(NestJS): POST /admin/analysts/commissions/:id/actions/*
 */

function nowIso() {
  return new Date().toISOString();
}

function recomputeSummary(record: AnalystCommissionRecord): AnalystCommissionRecord {
  const lastPaid =
    record.payouts
      .filter((p) => p.status === "paid")
      .map((p) => p.paymentDate ?? p.payoutDate)
      .sort()
      .at(-1) ?? null;

  const summary = summarizeCommissionFromLines(
    record.lineItems,
    record.tier,
    lastPaid,
    record.summary.nextEligiblePayoutAt,
    record.summary.paymentReviewedAt
  );

  let commissionStatus: AnalystCommissionRecord["commissionStatus"] = "none";
  if (summary.dueAmountUsd > 0) commissionStatus = "overdue";
  else if (summary.currentCommissionUsd > 0 || summary.totalPayableUsd > 0) {
    commissionStatus = "ready";
  } else if (summary.paidUsd > 0) commissionStatus = "paid";

  return { ...record, summary, commissionStatus };
}

function timelineEvent(
  id: string,
  type: AnalystCommissionTimelineEvent["type"],
  category: AnalystCommissionTimelineEvent["category"],
  title: string,
  description?: string
): AnalystCommissionTimelineEvent {
  return {
    id,
    type,
    category,
    title,
    description,
    timestamp: nowIso(),
    status: "complete",
  };
}

export function applyAnalystCommissionOperation(
  commissionId: string,
  operation: AnalystCommissionOperation,
  input?: AnalystCommissionCompletePayoutInput
): AnalystCommissionRecord | null {
  const current = getMockAnalystCommission(commissionId);
  if (!current) return null;

  if (operation === "copy_wallet" || operation === "copy_tx_hash") {
    return current;
  }

  if (operation === "review_payment") {
    const reviewedAt = nowIso();
    const lineItems = current.lineItems.map((line) =>
      line.status === "ready" && !line.reviewedAt
        ? { ...line, reviewedAt }
        : line
    );
    const next = recomputeSummary({
      ...current,
      lineItems,
      summary: {
        ...current.summary,
        paymentReviewedAt: reviewedAt,
      },
    });
    upsertMockAnalystCommission(next);
    appendAnalystCommissionTimelineEvent(
      commissionId,
      timelineEvent(
        `ctl-${commissionId}-review-${Date.now()}`,
        "payment_reviewed",
        "administrative",
        "Payment Reviewed",
        "Super Admin acknowledged payout request."
      )
    );
    return getMockAnalystCommission(commissionId);
  }

  if (operation === "schedule_payout") {
    appendAnalystCommissionTimelineEvent(
      commissionId,
      timelineEvent(
        `ctl-${commissionId}-sched-${Date.now()}`,
        "payment_scheduled",
        "payout",
        "Payment Scheduled",
        "Queued for manual USDT BEP-20 transfer."
      )
    );
    return getMockAnalystCommission(commissionId);
  }

  if (operation === "complete_payout") {
    const payload = input;
    const hash = payload?.transactionHash?.trim();
    if (!payload || !hash || !current.wallet) return current;

    const readyLines = current.lineItems.filter((l) => l.status === "ready");
    if (readyLines.length === 0) return current;

    const readyGrossUsd = readyLines.reduce((s, l) => s + l.grossUsd, 0);
    const analystShareUsd = current.summary.totalPayableUsd;
    const traderCityShareUsd =
      Math.round((readyGrossUsd - analystShareUsd) * 100) / 100;
    const payoutId = `payout-${current.analystId}-${Date.now()}`;
    const paymentDate = payload.paymentDate ?? nowIso();
    const evidenceLabel = payload.evidenceFileName?.trim() || null;

    const newPayout: AnalystPayoutRecord = {
      id: payoutId,
      analystId: current.analystId,
      commissionRecordId: current.id,
      analystDisplayName: current.displayName,
      payoutDate: paymentDate,
      grossCommissionUsd: readyGrossUsd,
      traderCityShareUsd,
      analystShareUsd,
      referralCountIncluded: readyLines.length,
      status: "paid",
      transactionHash: hash,
      network: "bsc_bep20",
      networkLabel: current.wallet.networkLabel,
      token: "USDT",
      paymentDate,
      walletAddress: current.wallet.address,
      evidence: {
        notes: payload.notes ?? null,
        screenshotUrl: evidenceLabel
          ? `mock://payment-evidence/${encodeURIComponent(evidenceLabel)}`
          : null,
        receiptUrl: null,
        evidenceLabel,
      },
      commissionLineIds: readyLines.map((l) => l.id),
      disputeReady: true,
    };

    const lineItems = current.lineItems.map((line) =>
      line.status === "ready"
        ? {
            ...line,
            status: "paid" as const,
            paidAt: paymentDate,
            payoutId,
          }
        : line
    );

    const next = recomputeSummary({
      ...current,
      lineItems,
      payouts: [...current.payouts, newPayout],
      summary: {
        ...current.summary,
        paymentReviewedAt: current.summary.paymentReviewedAt ?? paymentDate,
      },
    });
    upsertMockAnalystCommission(next);

    appendAnalystCommissionTimelineEvent(
      commissionId,
      timelineEvent(
        `ctl-${commissionId}-paid-${Date.now()}`,
        "commission_paid",
        "payout",
        "Commission Paid",
        `USDT ${analystShareUsd} recorded.`
      )
    );
    appendAnalystCommissionTimelineEvent(
      commissionId,
      timelineEvent(
        `ctl-${commissionId}-tx-${Date.now()}`,
        "transaction_confirmed",
        "payout",
        "Transaction Confirmed",
        hash
      )
    );

    return getMockAnalystCommission(commissionId);
  }

  return current;
}
