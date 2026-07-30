"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { StatusBadge } from "@/components/admin/ui";
import { modulePanelSurface } from "@/lib/admin/module-surfaces";
import { cn } from "@/lib/admin/cn";
import {
  COMMISSION_CREDIT_PLANS,
  analystCommissionPayoutStatusPresentation,
  analystCommissionPlanLabel,
  analystCommissionStatusPresentation,
  buildPlanBreakdownFromReferralCounts,
  formatBillingCycleMonth,
  formatCommissionDate,
  formatCommissionDateShort,
  formatCommissionUsd,
  shortenTxHash,
  shortenWalletAddress,
} from "@/lib/analysts/format-commissions";
import { analystReferralPartnershipLabel } from "@/lib/analysts/format-referrals";
import { getMockAnalystReferralByAnalystId } from "@/lib/analysts/mock/referrals";
import type {
  AnalystCommissionCompletePayoutInput,
  AnalystCommissionOperation,
  AnalystCommissionRecord,
  AnalystCommissionTimelineEvent,
  AnalystPayoutRecord,
} from "@/types/analysts/commissions";
import { AnalystCommissionAvatar } from "./CommissionDirectoryTable";
import { CommissionReferralTable } from "./CommissionReferralTable";
import { CopyValueButton } from "./CopyValueButton";

type CommissionWorkspaceViewProps = {
  record: AnalystCommissionRecord;
  onOperation: (
    record: AnalystCommissionRecord,
    operation: AnalystCommissionOperation,
    input?: AnalystCommissionCompletePayoutInput
  ) => void;
  onBack?: () => void;
  onOpenPayouts?: () => void;
};

/**
 * Commission Dashboard operational workspace for one analyst.
 * Full audit: identity → billing → breakdown → records → timeline → payment.
 */
export function CommissionWorkspaceView({
  record,
  onOperation,
  onBack,
  onOpenPayouts,
}: CommissionWorkspaceViewProps) {
  const status = analystCommissionStatusPresentation(record.commissionStatus);
  const planBreakdown = buildPlanBreakdownFromReferralCounts(
    record.referralPlanCounts
  );
  const referral = getMockAnalystReferralByAnalystId(record.analystId);

  return (
    <div className="space-y-4 sm:space-y-6">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm text-amber-300 hover:text-amber-200"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to program overview
        </button>
      ) : null}

      <section className={modulePanelSurface("gold", "space-y-4")}>
        <div className="flex items-start gap-3">
          <AnalystCommissionAvatar record={record} size="lg" />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-semibold text-white">
                {record.displayName}
              </h2>
              <StatusBadge label={status.label} tone={status.tone} />
            </div>
            <p className="mt-0.5 text-sm text-tc-muted">@{record.handle}</p>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Panel title="Identity Summary">
            <Field label="Analyst">{record.displayName}</Field>
            <Field label="Partnership">
              {analystReferralPartnershipLabel(record.partnershipStatus)}
            </Field>
            <Field label="Referral Status">
              <span className="capitalize">{record.referralStatus}</span>
            </Field>
            <Field label="Commission Status">
              <StatusBadge label={status.label} tone={status.tone} />
            </Field>
            {referral ? (
              <>
                <Field label="Referral Code">
                  <div className="flex items-center justify-end gap-2">
                    <span className="font-mono text-xs text-violet-200">
                      {referral.referralCode}
                    </span>
                    <CopyValueButton value={referral.referralCode} />
                  </div>
                </Field>
                <Field label="Referral Link">
                  <div className="flex items-center justify-end gap-2">
                    <span className="max-w-[10rem] truncate font-mono text-[11px] text-white/70">
                      tradercity.co/r/{referral.referralToken}
                    </span>
                    <CopyValueButton value={referral.referralLink} />
                  </div>
                </Field>
              </>
            ) : null}
          </Panel>

          <Panel title="Billing Cycle">
            <Field label="Billing Cycle">
              {formatBillingCycleMonth(record.tier.billingCycleMonth)}
            </Field>
            <Field label="Monthly Business">
              <span className="text-base font-semibold tabular-nums text-amber-50">
                {formatCommissionUsd(record.tier.cumulativeBusinessUsd)}
              </span>
            </Field>
            <Field label="Current Tier">
              <span className="text-base font-semibold">
                {record.tier.analystSharePercent}%
              </span>
            </Field>
            <Field label="Analyst Share">
              {record.tier.analystSharePercent}%
            </Field>
            <Field label="TraderCity Share">
              {record.tier.traderCitySharePercent}%
            </Field>
            <p className="pt-1 text-[11px] text-tc-muted">
              Tier is calculated automatically from monthly business.
            </p>
          </Panel>

          <Panel title="Commission Summary">
            <Field label="Current Billing Cycle">
              {formatBillingCycleMonth(record.tier.billingCycleMonth)}
            </Field>
            <Field label="Commission Generated">
              <span className="tabular-nums text-amber-100">
                {formatCommissionUsd(record.summary.currentCommissionUsd)}
              </span>
            </Field>
            <Field label="Amount Payable">
              <span className="tabular-nums font-semibold text-white">
                {formatCommissionUsd(record.summary.amountPayableUsd)}
              </span>
            </Field>
            <Field label="Outstanding Due">
              <span
                className={cn(
                  "tabular-nums",
                  record.summary.dueAmountUsd > 0
                    ? "text-rose-200"
                    : "text-tc-muted"
                )}
              >
                {formatCommissionUsd(record.summary.dueAmountUsd)}
              </span>
            </Field>
            <Field label="Total Payable">
              <span className="tabular-nums font-semibold text-amber-50">
                {formatCommissionUsd(record.summary.totalPayableUsd)}
              </span>
            </Field>
            <Field label="Last Payment">
              {formatCommissionDate(record.summary.lastPayoutAt)}
            </Field>
            <Field label="Next Payout">
              {formatCommissionDate(record.summary.nextEligiblePayoutAt)}
            </Field>
            {record.summary.totalPayableUsd > 0 && onOpenPayouts ? (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onOpenPayouts}
                  className="inline-flex w-full items-center justify-center rounded-lg border border-amber-400/35 bg-amber-500/20 px-3 py-2 text-sm font-medium text-amber-50 hover:bg-amber-500/30"
                >
                  Open payouts · Total to pay{" "}
                  {formatCommissionUsd(record.summary.totalPayableUsd)}
                </button>
              </div>
            ) : null}
          </Panel>
        </div>
      </section>

      <section className={modulePanelSurface("navy", "space-y-4")}>
        <div>
          <h3 className="text-sm font-medium text-white sm:text-base">
            Commission Breakdown
          </h3>
          <p className="mt-1 text-xs text-tc-muted">
            Successful referrals × fixed credits (Monthly $10 · Quarterly $30 ·
            Yearly $60)
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {COMMISSION_CREDIT_PLANS.map((plan) => {
            const row = planBreakdown[plan];
            return (
              <div
                key={plan}
                className="rounded-lg border border-white/10 bg-black/25 px-3 py-3"
              >
                <p className="text-sm font-medium text-white">
                  {analystCommissionPlanLabel(plan).replace(" Plan", "")}
                </p>
                <p className="mt-2 font-mono text-xs text-white/75">
                  {row.referralCount} × {formatCommissionUsd(row.unitCreditUsd)}
                </p>
                <div className="my-2 flex justify-center text-tc-muted" aria-hidden>
                  ↓
                </div>
                <p className="text-lg font-semibold tabular-nums text-amber-100">
                  {formatCommissionUsd(row.earnedUsd)}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className={modulePanelSurface("gold", "space-y-3")}>
        <div>
          <h3 className="text-sm font-medium text-white sm:text-base">
            Referral Commission Records
          </h3>
          <p className="mt-1 text-xs text-tc-muted">
            Every successful referral purchase that generated commission. Open
            Member links to Member Management.
          </p>
        </div>
        <CommissionReferralTable lines={record.lineItems} />
        <Link
          href={`/admin/analysts/referrals?view=directory&referral=${record.referralRecordId}`}
          className="inline-block text-xs text-violet-300 hover:text-violet-200"
        >
          Open Referral Profile →
        </Link>
      </section>

      <section className={modulePanelSurface("navy", "space-y-3")}>
        <h3 className="text-sm font-medium text-white sm:text-base">
          Commission Timeline
        </h3>
        <CommissionTimeline events={record.timeline} />
      </section>

      <section className={modulePanelSurface("gold", "space-y-4")}>
        <div>
          <h3 className="text-sm font-medium text-white sm:text-base">
            Payment Details
          </h3>
          <p className="mt-1 text-xs text-tc-muted">
            Wallet, network, transaction hashes, and payment evidence — after
            commission review.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Panel title="Wallet & Network">
            <Field label="Preferred Method">USDT · BEP-20</Field>
            <Field label="Network">
              {record.wallet?.networkLabel ?? "BNB Smart Chain (BEP-20)"}
            </Field>
            <Field label="Wallet">
              {record.wallet ? (
                <div className="flex items-center justify-end gap-2">
                  <span className="font-mono text-xs text-amber-100/90">
                    {shortenWalletAddress(record.wallet.address, 6)}
                  </span>
                  <CopyValueButton
                    value={record.wallet.address}
                    onCopied={() => onOperation(record, "copy_wallet")}
                  />
                </div>
              ) : (
                <span className="text-tc-muted">Not provided</span>
              )}
            </Field>
            <Field label="Payment Frequency">
              <span className="capitalize">
                {record.paymentDetails.paymentFrequency}
              </span>
            </Field>
            <Field label="Last Verification">
              {formatCommissionDate(record.paymentDetails.lastVerification)}
            </Field>
          </Panel>

          <Panel title="Payout History · Hash · Evidence">
            {record.payouts.length === 0 ? (
              <p className="text-xs text-tc-muted">No payouts recorded yet.</p>
            ) : (
              <ul className="space-y-2.5">
                {record.payouts
                  .slice()
                  .reverse()
                  .map((p) => (
                    <PayoutCard
                      key={p.id}
                      payout={p}
                      onCopyTx={() => onOperation(record, "copy_tx_hash")}
                    />
                  ))}
              </ul>
            )}
          </Panel>
        </div>
      </section>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/20 p-3 sm:p-4">
      <h4 className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-tc-muted">
        {title}
      </h4>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-3 text-sm">
      <dt className="shrink-0 text-tc-muted">{label}</dt>
      <dd className="min-w-0 text-right text-white/90">{children}</dd>
    </div>
  );
}

function PayoutCard({
  payout,
  onCopyTx,
}: {
  payout: AnalystPayoutRecord;
  onCopyTx: () => void;
}) {
  const st = analystCommissionPayoutStatusPresentation(payout.status);
  return (
    <li className="rounded-lg border border-white/8 bg-black/25 px-3 py-2.5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-medium text-white">
          {formatCommissionDateShort(payout.paymentDate ?? payout.payoutDate)}
        </p>
        <StatusBadge label={st.label} tone={st.tone} />
      </div>
      <p className="mt-1 tabular-nums text-sm text-amber-100">
        {formatCommissionUsd(payout.analystShareUsd)}
      </p>
      {payout.transactionHash ? (
        <div className="mt-1.5 flex items-center justify-between gap-2">
          <p className="truncate font-mono text-[11px] text-white/70">
            Hash · {shortenTxHash(payout.transactionHash)}
          </p>
          <CopyValueButton value={payout.transactionHash} onCopied={onCopyTx} />
        </div>
      ) : null}
      {payout.evidence.evidenceLabel || payout.evidence.notes ? (
        <p className="mt-1 text-[11px] text-tc-muted">
          {payout.evidence.evidenceLabel
            ? `Evidence · ${payout.evidence.evidenceLabel}`
            : null}
          {payout.evidence.evidenceLabel && payout.evidence.notes ? " · " : null}
          {payout.evidence.notes ? `Notes · ${payout.evidence.notes}` : null}
        </p>
      ) : (
        <p className="mt-1 text-[11px] text-tc-muted">No payment evidence</p>
      )}
    </li>
  );
}

function CommissionTimeline({
  events,
}: {
  events: AnalystCommissionTimelineEvent[];
}) {
  if (events.length === 0) {
    return <p className="text-xs text-tc-muted">No timeline events yet.</p>;
  }
  const ordered = events.slice().sort((a, b) => {
    return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
  });

  return (
    <ol className="space-y-0">
      {ordered.map((ev, index) => (
        <li key={ev.id} className="relative flex gap-3 pb-4 last:pb-0">
          <div className="flex flex-col items-center">
            <span
              className={cn(
                "mt-1 h-2 w-2 shrink-0 rounded-full",
                ev.status === "error"
                  ? "bg-rose-400"
                  : ev.status === "current"
                    ? "bg-amber-300"
                    : ev.status === "pending"
                      ? "bg-white/30"
                      : "bg-amber-500/80"
              )}
            />
            {index < ordered.length - 1 ? (
              <span className="mt-1 w-px flex-1 bg-white/10" aria-hidden />
            ) : null}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] text-tc-muted">
              {formatCommissionDateShort(ev.timestamp)}
            </p>
            <p className="text-sm font-medium text-white">{ev.title}</p>
            {ev.description ? (
              <p className="mt-0.5 text-xs text-tc-muted">{ev.description}</p>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
