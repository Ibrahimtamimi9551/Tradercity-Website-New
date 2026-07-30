"use client";

import Link from "next/link";
import { Info } from "lucide-react";
import {
  InfoCard,
  StatusBadge,
  Timeline,
  type TimelineItem,
} from "@/components/admin/ui";
import { cn } from "@/lib/admin/cn";
import { MEMBERSHIP_ACTIVATION_SOURCE_LABELS } from "@/types/members/activation-source";
import type { ManualPayment } from "@/types/members/manual-payment";
import {
  manualPaymentCanActivate,
  manualPaymentCanCancel,
} from "@/types/members/manual-payment";
import {
  formatManualPaymentDate,
  ManualPaymentAvatar,
} from "./ManualPaymentTable";
import { ManualPaymentStatusBadge } from "./ManualPaymentStatusBadge";

type ManualPaymentDetailsProps = {
  payment: ManualPayment | null;
  onActivate: (payment: ManualPayment) => void;
  onCancel: (payment: ManualPayment) => void;
  fullPage?: boolean;
  className?: string;
};

/**
 * Single vertically scrolling panel — desktop side panel + mobile detail.
 * Review-oriented: Payment Summary → Payment Information → Membership Result → Timeline.
 */
export function ManualPaymentDetails({
  payment,
  onActivate,
  onCancel,
  fullPage = false,
  className,
}: ManualPaymentDetailsProps) {
  if (!payment) {
    return (
      <div
        className={cn(
          "admin-card-surface flex h-full min-h-[20rem] flex-col items-center justify-center rounded-xl border border-dashed border-white/10 p-6 text-center",
          className
        )}
      >
        <p className="text-sm font-medium text-white">Select a manual payment</p>
        <p className="mt-1 max-w-xs text-xs text-tc-muted">
          Choose a row to inspect payment details, review, and activate membership.
        </p>
      </div>
    );
  }

  const canActivate = manualPaymentCanActivate(payment.status);
  const canCancel = manualPaymentCanCancel(payment.status);

  const timelineItems: TimelineItem[] = payment.timeline.map((entry) => ({
    id: entry.id,
    title: entry.title,
    description: entry.description,
    timestamp:
      entry.timestamp === "—"
        ? "—"
        : formatManualPaymentDate(entry.timestamp),
    status: entry.status,
  }));

  return (
    <div
      className={cn(
        "admin-card-surface flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-amber-500/20 [--admin-card-bg:#1a150c]",
        className
      )}
    >
      <div
        className={cn(
          "shrink-0 border-b border-white/10 p-4",
          fullPage && "sm:p-5"
        )}
      >
        <div className="flex items-start gap-3">
          <ManualPaymentAvatar payment={payment} size="lg" />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="truncate text-base font-semibold text-white sm:text-lg">
                {payment.username}
              </h2>
              <ManualPaymentStatusBadge
                status={payment.status}
                label={payment.statusLabel}
                tone={payment.statusTone}
              />
            </div>
            <p className="mt-0.5 truncate text-xs text-tc-muted">
              {payment.planLabel} ·{" "}
              {MEMBERSHIP_ACTIVATION_SOURCE_LABELS.manual_payment}
            </p>
            <p className="mt-1.5">
              {payment.memberId ? (
                <Link
                  href={`/admin/members/${payment.memberId}`}
                  className="text-xs font-medium text-amber-200/90 hover:text-amber-100"
                >
                  Open Control Center →
                </Link>
              ) : (
                <span className="text-xs text-tc-muted">
                  Member not linked yet — username recorded for later resolution
                </span>
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4 sm:p-5">
        <Section title="Payment Summary">
          <Field label="Discord Username">@{payment.username}</Field>
          <Field label="Membership Plan">{payment.planLabel}</Field>
          <Field label="Payment Method">{payment.paymentMethodLabel}</Field>
          <Field label="Amount">
            <span className="tabular-nums">
              {payment.amount} {payment.currency}
            </span>
          </Field>
          <Field label="Currency">{payment.currency}</Field>
          <Field label="Received Date">
            <span className="tabular-nums">
              {formatManualPaymentDate(payment.receivedAt)}
            </span>
          </Field>
          <Field label="Status">
            <ManualPaymentStatusBadge
              status={payment.status}
              label={payment.statusLabel}
              tone={payment.statusTone}
            />
          </Field>
        </Section>

        <Section title="Payment Information">
          <Field label="Reference Number">
            {payment.referenceNumber ?? "—"}
          </Field>
          <Field label="Received By">{payment.receivedBy}</Field>
          <Field label="Reason">{payment.reasonLabel}</Field>
          <Field label="Notes">
            <span className="text-left text-xs leading-relaxed text-white/80">
              {payment.notes ?? "—"}
            </span>
          </Field>
        </Section>

        {canActivate ? (
          <Section title="Review — Confirm Activation">
            <div className="space-y-3 py-1">
              <ReviewStep
                step="1"
                title="Payment Summary"
                body={`${payment.paymentMethodLabel} · ${payment.amount} ${payment.currency}`}
              />
              <ReviewStep
                step="2"
                title="Membership Result"
                body={`${payment.planLabel} will activate after confirmation`}
              />
              <ReviewStep
                step="3"
                title="Confirm Activation"
                body="Administrator confirms receipt — no blockchain verification"
              />
            </div>
          </Section>
        ) : null}

        {payment.membershipResult ? (
          <Section title="Membership Result">
            <Field label="Membership Activated">
              <StatusBadge
                label={payment.membershipResult.statusLabel}
                tone={payment.membershipResult.statusTone}
              />
            </Field>
            <Field label="Plan">{payment.membershipResult.plan}</Field>
            <Field label="Activation Date">
              <span className="tabular-nums">
                {formatManualPaymentDate(payment.membershipResult.activatedAt)}
              </span>
            </Field>
            <Field label="Expiry Date">
              <span className="tabular-nums">
                {formatManualPaymentDate(payment.membershipResult.expiryAt)}
              </span>
            </Field>
            <Field label="Renewal Count">
              <span className="tabular-nums">
                {payment.membershipResult.renewalCount}
              </span>
            </Field>
            <Field label="Discord Sync">
              {payment.membershipResult.discordSyncLabel ?? "—"}
            </Field>
            <Field label="Activated By">{payment.activatedBy ?? "—"}</Field>
          </Section>
        ) : null}

        {canActivate ? (
          <StateBanner tone="success">
            Payment has been recorded. Confirm activation to grant Membership and
            start Discord sync. The administrator is the source of confirmation.
          </StateBanner>
        ) : null}

        {payment.status === "cancelled" ? (
          <StateBanner tone="danger">
            This manual payment was cancelled. Membership was not changed.
          </StateBanner>
        ) : null}

        {canActivate || canCancel ? (
          <div className="flex flex-col gap-2 sm:flex-row">
            {canActivate ? (
              <button
                type="button"
                onClick={() => onActivate(payment)}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/15 px-4 py-2.5 text-sm font-medium text-emerald-100 transition-colors hover:bg-emerald-500/25"
              >
                Activate Membership
              </button>
            ) : null}
            {canCancel ? (
              <button
                type="button"
                onClick={() => onCancel(payment)}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-2.5 text-sm font-medium text-rose-100 transition-colors hover:bg-rose-500/20"
              >
                Cancel Payment
              </button>
            ) : null}
          </div>
        ) : null}

        <Section title="Timeline">
          {timelineItems.length === 0 ? (
            <p className="py-4 text-center text-sm text-tc-muted">
              No timeline events yet.
            </p>
          ) : (
            <Timeline items={timelineItems} />
          )}
        </Section>
      </div>
    </div>
  );
}

function ReviewStep({
  step,
  title,
  body,
}: {
  step: string;
  title: string;
  body: string;
}) {
  return (
    <div className="flex gap-3">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-amber-500/35 bg-amber-500/10 text-[10px] font-semibold text-amber-100">
        {step}
      </span>
      <div className="min-w-0">
        <p className="text-sm font-medium text-white">{title}</p>
        <p className="mt-0.5 text-xs text-tc-muted">{body}</p>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <InfoCard title={title} className="!bg-white/[0.02]">
      <div className="divide-y divide-white/5">{children}</div>
    </InfoCard>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-3 py-2.5 first:pt-0 last:pb-0">
      <span className="shrink-0 text-xs text-tc-muted">{label}</span>
      <div className="min-w-0 text-right text-sm text-white/90">{children}</div>
    </div>
  );
}

function StateBanner({
  tone,
  children,
}: {
  tone: "info" | "danger" | "success";
  children: React.ReactNode;
}) {
  const styles = {
    info: "border-sky-500/25 bg-sky-500/10 text-sky-100/90",
    danger: "border-rose-500/25 bg-rose-500/10 text-rose-100/90",
    success: "border-emerald-500/25 bg-emerald-500/10 text-emerald-100/90",
  }[tone];
  const iconClass = {
    info: "text-sky-300",
    danger: "text-rose-300",
    success: "text-emerald-300",
  }[tone];

  return (
    <div className={cn("flex gap-2.5 rounded-xl border p-3", styles)}>
      <Info className={cn("mt-0.5 h-4 w-4 shrink-0", iconClass)} aria-hidden />
      <p className="text-xs leading-relaxed">{children}</p>
    </div>
  );
}
