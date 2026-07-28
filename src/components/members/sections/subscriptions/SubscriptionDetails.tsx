"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Copy, ExternalLink, Info } from "lucide-react";
import {
  InfoCard,
  StatusBadge,
  Timeline,
  type TimelineItem,
} from "@/components/admin/ui";
import { cn } from "@/lib/admin/cn";
import { MEMBERSHIP_ACTIVATION_SOURCE_LABELS } from "@/types/members/activation-source";
import type { SubscriptionTicket } from "@/types/members/subscription";
import {
  SubscriptionAvatar,
  SubscriptionStatusBadge,
  formatSubscriptionDate,
} from "./SubscriptionTable";

type SubscriptionDetailsProps = {
  ticket: SubscriptionTicket | null;
  onOpenExplorer: (ticket: SubscriptionTicket) => void;
  onApprove: (ticket: SubscriptionTicket) => void;
  onReject: (ticket: SubscriptionTicket) => void;
  fullPage?: boolean;
  className?: string;
};

/**
 * Single vertically scrolling panel — shared by desktop side panel and
 * mobile `/admin/subscriptions/[id]`.
 */
export function SubscriptionDetails({
  ticket,
  onOpenExplorer,
  onApprove,
  onReject,
  fullPage = false,
  className,
}: SubscriptionDetailsProps) {
  const [copiedField, setCopiedField] = useState<"hash" | "wallet" | null>(null);

  if (!ticket) {
    return (
      <div
        className={cn(
          "admin-card-surface flex h-full min-h-[20rem] flex-col items-center justify-center rounded-xl border border-dashed border-white/10 p-6 text-center",
          className
        )}
      >
        <p className="text-sm font-medium text-white">Select a subscription ticket</p>
        <p className="mt-1 max-w-xs text-xs text-tc-muted">
          Choose a row to inspect payment, verification, and approval details.
        </p>
      </div>
    );
  }

  const isBlockchainVerifying = ticket.displayStatus === "blockchain_verifying";
  const isVerificationRequired =
    ticket.displayStatus === "verification_required";
  const isApprovalPending = ticket.displayStatus === "approval_pending";
  const canDecide = isApprovalPending || isVerificationRequired;

  const timelineItems: TimelineItem[] = ticket.timeline.map((entry) => ({
    id: entry.id,
    title: entry.title,
    description: entry.description,
    timestamp:
      entry.timestamp === "—"
        ? "—"
        : formatSubscriptionDate(entry.timestamp),
    status: entry.status,
  }));

  const copyValue = async (value: string, field: "hash" | "wallet") => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      window.setTimeout(() => setCopiedField(null), 1500);
    } catch {
      window.alert("Could not copy to clipboard.");
    }
  };

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
          <SubscriptionAvatar ticket={ticket} size="lg" />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="truncate text-base font-semibold text-white sm:text-lg">
                {ticket.username}
              </h2>
              <SubscriptionStatusBadge
                status={ticket.displayStatus}
                label={ticket.statusLabel}
                tone={ticket.statusTone}
              />
            </div>
            <p className="mt-0.5 truncate text-xs text-tc-muted">
              {ticket.planLabel} ·{" "}
              {MEMBERSHIP_ACTIVATION_SOURCE_LABELS[ticket.activationSource]}
            </p>
            <p className="mt-1.5">
              <Link
                href={`/admin/members/${ticket.memberId}`}
                className="text-xs font-medium text-amber-200/90 hover:text-amber-100"
              >
                Open Control Center →
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4 sm:p-5">
        <Section title="Payment Summary">
          <Field label="Plan">{ticket.planLabel}</Field>
          <Field label="Status">
            <SubscriptionStatusBadge
              status={ticket.displayStatus}
              label={ticket.statusLabel}
              tone={ticket.statusTone}
            />
          </Field>
          <Field label="Activation Source">
            {MEMBERSHIP_ACTIVATION_SOURCE_LABELS[ticket.activationSource]}
          </Field>
          <Field label="Payment Method">{ticket.paymentMethod}</Field>
          <Field label="Expected Amount">
            <span className="tabular-nums">
              {ticket.expectedAmount} {ticket.currency}
            </span>
          </Field>
          {!isBlockchainVerifying ? (
            <Field label="Actual Amount">
              <span className="tabular-nums">
                {ticket.actualAmount
                  ? `${ticket.actualAmount} ${ticket.currency}`
                  : "—"}
              </span>
            </Field>
          ) : null}
          <Field label="Submitted">
            <span className="tabular-nums">
              {formatSubscriptionDate(ticket.submittedAt)}
            </span>
          </Field>
        </Section>

        <Section title="Blockchain Information">
          <Field label="Network">{ticket.networkLabel}</Field>
          {!isBlockchainVerifying ? (
            <Field label="Wallet Address">
              <CopyableValue
                value={ticket.walletAddress}
                short={shorten(ticket.walletAddress)}
                copied={copiedField === "wallet"}
                onCopy={() => copyValue(ticket.walletAddress, "wallet")}
              />
            </Field>
          ) : null}
          <Field label="Transaction Hash">
            <CopyableValue
              value={ticket.transactionHash}
              short={shorten(ticket.transactionHash)}
              copied={copiedField === "hash"}
              onCopy={() => copyValue(ticket.transactionHash, "hash")}
            />
          </Field>
          <Field label="Explorer">
            <button
              type="button"
              onClick={() => onOpenExplorer(ticket)}
              className="inline-flex items-center gap-1 text-amber-200 hover:text-amber-100"
            >
              Open on BscScan
              <ExternalLink className="h-3 w-3" aria-hidden />
            </button>
          </Field>
        </Section>

        <Section title="Verification">
          <Field label="Verification Status">
            <StatusBadge
              label={ticket.verification.resultLabel}
              tone={ticket.verification.resultTone}
            />
          </Field>
          <Field label="Verification Method">
            {ticket.verification.method === "automatic"
              ? "Automatic"
              : "Manual Assist"}
          </Field>
          {isApprovalPending || ticket.displayStatus === "approved" ? (
            <Field label="Verification Completed">
              <span className="tabular-nums">
                {formatSubscriptionDate(ticket.verification.verifiedAt)}
              </span>
            </Field>
          ) : null}
          {isVerificationRequired || ticket.verification.notes ? (
            <Field label={isVerificationRequired ? "Failure Reason" : "Notes"}>
              <span className="text-left text-xs leading-relaxed text-white/80">
                {ticket.verification.notes ??
                  ticket.verification.resultLabel}
              </span>
            </Field>
          ) : null}
        </Section>

        {!isBlockchainVerifying ? (
          <Section title="Approval">
            <Field label="Decision">
              <StatusBadge
                label={
                  ticket.approval.decision === "pending"
                    ? isApprovalPending
                      ? "Approval Pending"
                      : "Pending"
                    : ticket.approval.decision === "approved"
                      ? "Approved"
                      : "Rejected"
                }
                tone={
                  ticket.approval.decision === "approved"
                    ? "success"
                    : ticket.approval.decision === "rejected"
                      ? "danger"
                      : "warning"
                }
              />
            </Field>
            <Field label="Decided At">
              <span className="tabular-nums">
                {formatSubscriptionDate(ticket.approval.decidedAt)}
              </span>
            </Field>
            <Field label="Decided By">{ticket.approval.decidedBy ?? "—"}</Field>
            {ticket.approval.reason ? (
              <Field label="Reason">
                <span className="text-left text-xs leading-relaxed text-white/80">
                  {ticket.approval.reason}
                </span>
              </Field>
            ) : null}
          </Section>
        ) : null}

        {ticket.membershipResult ? (
          <Section title="Membership Result">
            <Field label="Plan">{ticket.membershipResult.plan}</Field>
            <Field label="Status">
              <StatusBadge
                label={ticket.membershipResult.statusLabel}
                tone={ticket.membershipResult.statusTone}
              />
            </Field>
            <Field label="Activated At">
              <span className="tabular-nums">
                {formatSubscriptionDate(ticket.membershipResult.activatedAt)}
              </span>
            </Field>
            <Field label="Expiry">
              <span className="tabular-nums">
                {formatSubscriptionDate(ticket.membershipResult.expiryAt)}
              </span>
            </Field>
            <Field label="Discord Sync">
              {ticket.membershipResult.discordSyncLabel ?? "—"}
            </Field>
          </Section>
        ) : null}

        {isBlockchainVerifying ? (
          <StateBanner tone="info">
            Blockchain verification is in progress. No admin action is required
            at this stage.
          </StateBanner>
        ) : null}

        {isVerificationRequired ? (
          <StateBanner tone="danger">
            Automatic verification could not confidently validate this
            transaction. Review the explorer, then Approve or Reject.
          </StateBanner>
        ) : null}

        {isApprovalPending ? (
          <StateBanner tone="success">
            Payment verified successfully. Final admin approval is required
            before Membership activation.
          </StateBanner>
        ) : null}

        {canDecide ? (
          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() => onApprove(ticket)}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/15 px-4 py-2.5 text-sm font-medium text-emerald-100 transition-colors hover:bg-emerald-500/25"
            >
              {isApprovalPending ? "Approve Membership" : "Approve"}
            </button>
            <button
              type="button"
              onClick={() => onReject(ticket)}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-2.5 text-sm font-medium text-rose-100 transition-colors hover:bg-rose-500/20"
            >
              {isApprovalPending ? "Reject Payment" : "Reject"}
            </button>
          </div>
        ) : null}

        <Section title="Timeline">
          {timelineItems.length === 0 ? (
            <EmptyBlock message="No timeline events yet." />
          ) : (
            <Timeline items={timelineItems} />
          )}
        </Section>

        {!isBlockchainVerifying && !isVerificationRequired && !isApprovalPending ? (
          <StateBanner tone="info">
            Verification confirms payment validity. Membership activates only
            after Admin Approve. Verified ≠ Activated.
          </StateBanner>
        ) : null}
      </div>
    </div>
  );
}

function shorten(value: string): string {
  if (value.length <= 16) return value;
  return `${value.slice(0, 8)}…${value.slice(-6)}`;
}

function CopyableValue({
  value,
  short,
  copied,
  onCopy,
}: {
  value: string;
  short: string;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <span className="inline-flex max-w-full items-center gap-1.5">
      <span className="truncate font-mono text-xs" title={value}>
        {short}
      </span>
      <button
        type="button"
        onClick={onCopy}
        className="admin-muted shrink-0 rounded p-0.5 hover:text-white"
        aria-label="Copy"
      >
        {copied ? (
          <Check className="h-3 w-3 text-emerald-300" aria-hidden />
        ) : (
          <Copy className="h-3 w-3" aria-hidden />
        )}
      </button>
    </span>
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

function EmptyBlock({ message }: { message: string }) {
  return <p className="py-4 text-center text-sm text-tc-muted">{message}</p>;
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
