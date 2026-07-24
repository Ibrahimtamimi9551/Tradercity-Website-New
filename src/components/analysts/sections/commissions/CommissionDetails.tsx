"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { StatusBadge, Timeline, type TimelineItem } from "@/components/admin/ui";
import { cn } from "@/lib/admin/cn";
import {
  analystCommissionStatusPresentation,
  formatBillingCycleMonth,
  formatCommissionDate,
  formatCommissionDateShort,
  formatCommissionUsd,
} from "@/lib/analysts/format-commissions";
import { analystReferralPartnershipLabel } from "@/lib/analysts/format-referrals";
import type { AnalystCommissionRecord } from "@/types/analysts/commissions";
import { AnalystCommissionAvatar } from "./CommissionDirectoryTable";

type CommissionDetailsProps = {
  record: AnalystCommissionRecord | null;
  /** Opens the Dashboard operational workspace for this analyst. */
  onOpenWorkspace?: (commissionId: string) => void;
  fullPage?: boolean;
  className?: string;
};

/**
 * Directory inspector — concise operational summary.
 * Visual family matches Referral / Discord profile panels.
 * Full financial audit lives on Commission Dashboard.
 */
export function CommissionDetails({
  record,
  onOpenWorkspace,
  fullPage = false,
  className,
}: CommissionDetailsProps) {
  if (!record) {
    return (
      <div
        className={cn(
          "admin-card-surface flex h-full min-h-[20rem] flex-col items-center justify-center rounded-xl border border-dashed border-white/10 p-6 text-center",
          className
        )}
      >
        <p className="text-sm font-medium text-white">Select an analyst</p>
        <p className="mt-1 max-w-xs text-xs text-tc-muted">
          Choose a row to see identity, billing cycle, payment status, and
          timeline. Full audit opens on the Commission Dashboard.
        </p>
      </div>
    );
  }

  const status = analystCommissionStatusPresentation(record.commissionStatus);
  const cycleLabel = formatBillingCycleMonth(record.tier.billingCycleMonth);
  const timelineItems: TimelineItem[] = record.timeline
    .slice()
    .sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    )
    .map((ev) => ({
      id: ev.id,
      title: ev.title,
      description: ev.description,
      timestamp: formatCommissionDateShort(ev.timestamp),
      status: ev.status ?? "complete",
    }));

  return (
    <div
      className={cn(
        "admin-card-surface flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-amber-500/20 [--admin-card-bg:#1a140c]",
        className
      )}
    >
      <div className={cn("shrink-0 border-b border-white/10 p-4", fullPage && "sm:p-5")}>
        <div className="flex items-start gap-3">
          <AnalystCommissionAvatar record={record} size="lg" />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="truncate text-base font-semibold text-white sm:text-lg">
                {record.displayName}
              </h2>
              <StatusBadge label={status.label} tone={status.tone} />
            </div>
            <p className="mt-0.5 truncate text-xs text-tc-muted">@{record.handle}</p>
            <p className="mt-1 text-xs tabular-nums text-amber-200/90">
              {cycleLabel}
            </p>
          </div>
        </div>
      </div>

      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4 sm:p-5">
        <Section title="Identity">
          <Field label="Analyst">{record.displayName}</Field>
          <Field label="Partnership Status">
            {analystReferralPartnershipLabel(record.partnershipStatus)}
          </Field>
          <Field label="Referral Status">
            <span className="capitalize">{record.referralStatus}</span>
          </Field>
          <Field label="Commission Status">
            <StatusBadge label={status.label} tone={status.tone} />
          </Field>
        </Section>

        <Section title="Billing Cycle">
          <MetricBlock label="Billing Cycle" value={cycleLabel} />
          <MetricBlock
            label="Monthly Business"
            value={formatCommissionUsd(record.tier.cumulativeBusinessUsd)}
            emphasize
          />
          <MetricBlock
            label="Current Tier"
            value={`${record.tier.analystSharePercent}%`}
          />
          <div className="grid grid-cols-2 gap-2">
            <MiniStat
              label="Analyst Share"
              value={`${record.tier.analystSharePercent}%`}
            />
            <MiniStat
              label="TraderCity Share"
              value={`${record.tier.traderCitySharePercent}%`}
            />
          </div>
        </Section>

        <Section title="Payment Summary">
          <Field label="Current Billing Cycle">{cycleLabel}</Field>
          <Field label="Gross Commission Generated">
            <span className="tabular-nums text-amber-100">
              {formatCommissionUsd(record.summary.currentCommissionUsd)}
            </span>
          </Field>
          <div className="rounded-lg border border-amber-400/25 bg-amber-500/10 px-3 py-2.5">
            <p className="text-[11px] text-tc-muted">Analyst Amount Payable</p>
            <p className="mt-1 text-xl font-semibold tabular-nums text-amber-50">
              {formatCommissionUsd(record.summary.totalPayableUsd)}
            </p>
            {record.summary.dueAmountUsd > 0 ? (
              <p className="mt-1 text-[11px] text-tc-muted">
                Current cycle{" "}
                {formatCommissionUsd(record.summary.amountPayableUsd)}
                {" · "}
                <span className="text-rose-200">
                  Due {formatCommissionUsd(record.summary.dueAmountUsd)}
                </span>
              </p>
            ) : null}
          </div>
          {record.summary.dueAmountUsd > 0 ? (
            <Field label="Outstanding Due">
              <span className="tabular-nums text-rose-200">
                {formatCommissionUsd(record.summary.dueAmountUsd)}
              </span>
            </Field>
          ) : null}
          <Field label="Next Payout Date">
            {formatCommissionDate(record.summary.nextEligiblePayoutAt)}
          </Field>
        </Section>

        <section className="space-y-3 border-t border-white/10 pt-4">
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-wider text-tc-muted">
              Commission Timeline
            </h3>
            <p className="mt-1 text-xs text-tc-muted">
              Operational audit trail for this commission identity — not
              calculations.
            </p>
          </div>
          {timelineItems.length === 0 ? (
            <p className="text-xs text-tc-muted">No commission events yet.</p>
          ) : (
            <Timeline items={timelineItems} />
          )}
        </section>

        <div className="space-y-2 rounded-lg border border-dashed border-white/10 bg-white/[0.02] px-3 py-3">
          <p className="text-xs text-tc-muted">
            Breakdown, referral records, payment details, and evidence live on
            the Commission Dashboard.
          </p>
          {onOpenWorkspace ? (
            <button
              type="button"
              onClick={() => onOpenWorkspace(record.id)}
              className="inline-flex text-xs font-medium text-amber-200 hover:text-amber-100"
            >
              Open Commission Dashboard →
            </button>
          ) : (
            <Link
              href={`/admin/analysts/commissions?commission=${record.id}`}
              className="inline-flex text-xs font-medium text-amber-200 hover:text-amber-100"
            >
              Open Commission Dashboard →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-2">
      <h3 className="text-[11px] font-semibold uppercase tracking-wider text-tc-muted">
        {title}
      </h3>
      <div className="space-y-2">{children}</div>
    </section>
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

function MetricBlock({
  label,
  value,
  emphasize,
}: {
  label: string;
  value: string;
  emphasize?: boolean;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5">
      <p className="text-[11px] text-tc-muted">{label}</p>
      <p
        className={cn(
          "mt-1 font-semibold tabular-nums text-white",
          emphasize ? "text-lg text-amber-50" : "text-base"
        )}
      >
        {value}
      </p>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5">
      <p className="text-[11px] text-tc-muted">{label}</p>
      <p className="mt-1 text-lg font-semibold tabular-nums text-white">{value}</p>
    </div>
  );
}
