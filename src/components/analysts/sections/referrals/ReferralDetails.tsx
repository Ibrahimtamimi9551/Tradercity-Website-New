"use client";

import type { ComponentType, ReactNode } from "react";
import Link from "next/link";
import { Archive, Ban, CheckCircle2, Copy, RotateCcw } from "lucide-react";
import { StatusBadge } from "@/components/admin/ui";
import { cn } from "@/lib/admin/cn";
import {
  analystReferralPartnershipLabel,
  analystReferralPlanLabel,
  analystReferralStatusPresentation,
  formatAnalystReferralDate,
  formatAnalystReferralDateShort,
  formatShortReferralLink,
} from "@/lib/analysts/format-referrals";
import type {
  AnalystReferralMembershipPlan,
  AnalystReferralOperation,
  AnalystReferralRecord,
  AnalystReferralTimelineEvent,
} from "@/types/analysts/referrals";
import { AnalystReferralAvatar } from "./ReferralDirectoryTable";

type ReferralDetailsProps = {
  record: AnalystReferralRecord | null;
  onOperation: (
    record: AnalystReferralRecord,
    operation: AnalystReferralOperation
  ) => void;
  fullPage?: boolean;
  className?: string;
};

const PLAN_ORDER: AnalystReferralMembershipPlan[] = [
  "monthly",
  "quarterly",
  "yearly",
  "lifetime",
];

/**
 * Referral Profile — desktop inspector + mobile detail page.
 * Owns identity, performance, plan breakdown, and referral-specific timeline.
 */
export function ReferralDetails({
  record,
  onOperation,
  fullPage = false,
  className,
}: ReferralDetailsProps) {
  if (!record) {
    return (
      <div
        className={cn(
          "admin-card-surface flex h-full min-h-[20rem] flex-col items-center justify-center rounded-xl border border-dashed border-white/10 p-6 text-center",
          className
        )}
      >
        <p className="text-sm font-medium text-white">Select a referral identity</p>
        <p className="mt-1 max-w-xs text-xs text-tc-muted">
          Choose a row to inspect referral code, performance, and membership
          conversions.
        </p>
      </div>
    );
  }

  const status = analystReferralStatusPresentation(record.status);

  const copyText = async (value: string, operation: AnalystReferralOperation) => {
    onOperation(record, operation);
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(value);
      } catch {
        /* mock-first */
      }
    }
  };

  return (
    <div
      className={cn(
        "admin-card-surface flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-violet-500/20 [--admin-card-bg:#120e22]",
        className
      )}
    >
      <div className={cn("shrink-0 border-b border-white/10 p-4", fullPage && "sm:p-5")}>
        <div className="flex items-start gap-3">
          <AnalystReferralAvatar record={record} size="lg" />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="truncate text-base font-semibold text-white sm:text-lg">
                {record.displayName}
              </h2>
              <StatusBadge label={status.label} tone={status.tone} />
            </div>
            <p className="mt-0.5 truncate text-xs text-tc-muted">@{record.handle}</p>
            <p className="mt-1 font-mono text-xs text-violet-200">
              {record.referralCode}
            </p>
          </div>
        </div>
      </div>

      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4 sm:p-5">
        <Section title="Identity">
          <Field label="Analyst">{record.displayName}</Field>
          <Field label="Referral Code">
            <span className="font-mono text-violet-200">{record.referralCode}</span>
          </Field>
          <Field label="Referral Link">
            <span className="font-mono text-xs text-white/80">
              {formatShortReferralLink(record.referralToken)}
            </span>
          </Field>
          <Field label="Referral Status">
            <StatusBadge label={status.label} tone={status.tone} />
          </Field>
          <Field label="Activation Date">
            <span className="tabular-nums">
              {formatAnalystReferralDate(record.activationDate)}
            </span>
          </Field>
          <Field label="Partnership Status">
            {analystReferralPartnershipLabel(record.partnershipStatus)}
          </Field>
          {!record.activationDate ? (
            <p className="text-xs text-amber-100/90">
              Provisioned — activates when Operationally Ready.
            </p>
          ) : null}
        </Section>

        <Section title="Referral Performance">
          <Field label="Total Referrals">
            <span className="tabular-nums">{record.totalReferrals}</span>
          </Field>
          <Field label="Successful Referrals">
            <span className="tabular-nums">{record.successfulReferrals}</span>
          </Field>
          <Field label="Active VIP Members">
            <span className="tabular-nums">{record.activeVipMembers}</span>
          </Field>
          <Field label="Pending Conversions">
            <span className="tabular-nums">{record.pendingConversions}</span>
          </Field>
        </Section>

        <Section title="Successful Referral Breakdown">
          <div className="grid grid-cols-2 gap-2">
            {PLAN_ORDER.map((plan) => (
              <div
                key={plan}
                className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5"
              >
                <p className="text-[11px] text-tc-muted">
                  {analystReferralPlanLabel(plan)}
                </p>
                <p className="mt-1 text-lg font-semibold tabular-nums text-white">
                  {record.planBreakdown[plan]}
                </p>
              </div>
            ))}
          </div>
        </Section>

        <section className="space-y-3 border-t border-white/10 pt-4">
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-wider text-tc-muted">
              Referral Timeline
            </h3>
            <p className="mt-1 text-xs text-tc-muted">
              Operational audit trail for this referral identity — not analytics.
            </p>
          </div>
          <ReferralTimeline events={record.timeline} />
        </section>

        <Section title="Actions">
          <div className="grid gap-2">
            <ActionButton
              icon={Copy}
              label="Copy Referral Code"
              variant="ghost"
              onClick={() => void copyText(record.referralCode, "copy_code")}
            />
            <ActionButton
              icon={Copy}
              label="Copy Full Referral Link"
              onClick={() => void copyText(record.referralLink, "copy_link")}
            />
            {record.status === "disabled" ? (
              <ActionButton
                icon={CheckCircle2}
                label="Enable Referral"
                onClick={() => onOperation(record, "enable")}
              />
            ) : (
              <ActionButton
                icon={Ban}
                label="Disable Referral"
                variant="ghost"
                onClick={() => onOperation(record, "disable")}
              />
            )}
            {record.archived ? (
              <ActionButton
                icon={RotateCcw}
                label="Restore from Archive"
                variant="ghost"
                onClick={() => onOperation(record, "restore")}
              />
            ) : (
              <ActionButton
                icon={Archive}
                label="Archive Identity"
                variant="ghost"
                onClick={() => onOperation(record, "archive")}
              />
            )}
          </div>
        </Section>

        <div className="space-y-2 rounded-lg border border-dashed border-white/10 bg-white/[0.02] px-3 py-3">
          <p className="text-xs text-tc-muted">
            Commission consumes this performance — open Financial Operations for
            payouts.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/admin/analysts/commissions?commission=acom-${record.analystId}`}
              className="inline-flex text-xs font-medium text-amber-200 hover:text-amber-100"
            >
              Open Commission Dashboard →
            </Link>
            <Link
              href={`/admin/analysts/${record.analystId}?tab=referrals`}
              className="inline-flex text-xs font-medium text-violet-300 hover:text-violet-200"
            >
              Open Control Center →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Lightweight chronological audit list — date first, title, optional note.
 * Referral-specific only; not the future Analyst Activity Timeline.
 */
function ReferralTimeline({
  events,
}: {
  events: AnalystReferralTimelineEvent[];
}) {
  if (events.length === 0) {
    return <p className="text-xs text-tc-muted">No referral events yet.</p>;
  }

  return (
    <ol className="space-y-0">
      {events.map((entry, index) => (
        <li key={entry.id} className="flex gap-3">
          <div className="flex flex-col items-center pt-1">
            <span
              className={cn(
                "h-2 w-2 shrink-0 rounded-full",
                entry.status === "error"
                  ? "bg-rose-400/80"
                  : entry.status === "current"
                    ? "bg-sky-400/80"
                    : "bg-white/35"
              )}
              aria-hidden
            />
            {index < events.length - 1 ? (
              <span className="mt-1 h-full min-h-[1.75rem] w-px flex-1 bg-white/10" />
            ) : null}
          </div>
          <div className={cn("min-w-0 pb-4", index === events.length - 1 && "pb-0")}>
            <p className="text-[11px] tabular-nums text-tc-muted">
              {formatAnalystReferralDateShort(entry.timestamp)}
            </p>
            <p className="mt-0.5 text-sm font-medium text-white">{entry.title}</p>
            {entry.description ? (
              <p className="mt-0.5 text-xs leading-relaxed text-tc-muted">
                {entry.description}
              </p>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
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

function ActionButton({
  icon: Icon,
  label,
  onClick,
  variant = "solid",
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  onClick: () => void;
  variant?: "solid" | "ghost";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors",
        variant === "solid"
          ? "border border-violet-400/30 bg-violet-500/15 text-violet-100 hover:bg-violet-500/25"
          : "border border-white/10 bg-white/[0.03] text-white/80 hover:bg-white/[0.06]"
      )}
    >
      <Icon className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
      {label}
    </button>
  );
}
