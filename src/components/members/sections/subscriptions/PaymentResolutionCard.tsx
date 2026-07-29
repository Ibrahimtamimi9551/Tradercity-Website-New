"use client";

import { useEffect, useState } from "react";
import {
  Check,
  Circle,
  Copy,
  ExternalLink,
  Mail,
  MessageSquare,
  Plus,
  StickyNote,
} from "lucide-react";
import { InfoCard, StatusBadge } from "@/components/admin/ui";
import { cn } from "@/lib/admin/cn";
import type {
  PaymentResolution,
  PaymentResolutionNote,
  SubscriptionTicket,
} from "@/types/members/subscription";
import { formatSubscriptionDate } from "./SubscriptionTable";

type PaymentResolutionCardProps = {
  ticket: SubscriptionTicket;
  resolution: PaymentResolution;
  onOpenExplorer: (ticket: SubscriptionTicket) => void;
  onApprove: (ticket: SubscriptionTicket) => void;
  onReject: (ticket: SubscriptionTicket) => void;
};

/**
 * Payment Resolution workspace — visible only for Verification Required.
 * Contact + investigation guidance; Approve/Reject reuse existing membership flow.
 */
export function PaymentResolutionCard({
  ticket,
  resolution,
  onOpenExplorer,
  onApprove,
  onReject,
}: PaymentResolutionCardProps) {
  const [notes, setNotes] = useState<PaymentResolutionNote[]>(resolution.notes);
  const [draft, setDraft] = useState("");
  const [copied, setCopied] = useState<"discord" | "email" | "hash" | null>(
    null
  );

  useEffect(() => {
    setNotes(resolution.notes);
    setDraft("");
    setCopied(null);
  }, [ticket.id, resolution]);

  const copyValue = async (
    value: string,
    field: "discord" | "email" | "hash"
  ) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(field);
      window.setTimeout(() => setCopied(null), 1500);
    } catch {
      window.alert("Could not copy to clipboard.");
    }
  };

  const onOpenDiscord = () => {
    void copyValue(ticket.username, "discord");
    window.alert(
      `Discord username @${ticket.username} copied.\n\n` +
        "Open Discord and message the member to continue Payment Resolution.\n\n" +
        "Mock only — no Discord API."
    );
  };

  const onSendEmail = () => {
    window.open(
      `mailto:${encodeURIComponent(ticket.email)}?subject=${encodeURIComponent(
        `TraderCity payment verification — ${ticket.planLabel}`
      )}`,
      "_blank"
    );
  };

  const onAddNote = () => {
    const body = draft.trim();
    if (!body) return;
    setNotes((prev) => [
      {
        id: `local-note-${Date.now()}`,
        body,
        author: "Admin · You",
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);
    setDraft("");
  };

  return (
    <InfoCard
      title="Payment Resolution"
      className="!border-rose-500/25 !bg-rose-500/[0.06]"
    >
      <p className="mb-4 text-xs leading-relaxed text-rose-100/80">
        Automatic verification could not confirm this payment. Use this workspace
        to contact the member, gather evidence, and reach a final decision.
      </p>

      <div className="space-y-5">
        {/* Contact Member */}
        <SubSection title="Contact Member">
          <FieldRow label="Discord Username">
            <span className="font-medium text-white">@{ticket.username}</span>
          </FieldRow>
          <FieldRow label="Email Address">
            <span className="break-all text-white/90">{ticket.email}</span>
          </FieldRow>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={onOpenDiscord}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/12 bg-white/[0.04] px-3 py-2 text-xs font-medium text-white/90 transition-colors hover:bg-violet-500/15 hover:text-violet-100"
            >
              <MessageSquare className="h-3.5 w-3.5" aria-hidden />
              {copied === "discord" ? "Copied" : "Open Discord"}
            </button>
            <button
              type="button"
              onClick={onSendEmail}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/12 bg-white/[0.04] px-3 py-2 text-xs font-medium text-white/90 transition-colors hover:bg-violet-500/15 hover:text-violet-100"
            >
              <Mail className="h-3.5 w-3.5" aria-hidden />
              Send Email
            </button>
          </div>
        </SubSection>

        {/* Failure Summary */}
        <SubSection title="Payment Failure Summary">
          <FieldRow label="Verification Status">
            <StatusBadge label="Verification Required" tone="danger" />
          </FieldRow>
          <FieldRow label="Failure Reason">
            <span className="font-medium text-rose-100">
              {resolution.failureReasonLabel}
            </span>
          </FieldRow>
          <FieldRow label="Detected Amount">
            <span className="tabular-nums">
              {resolution.detectedAmount
                ? `${resolution.detectedAmount} ${resolution.currency}`
                : "—"}
            </span>
          </FieldRow>
          <FieldRow label="Expected Amount">
            <span className="tabular-nums">
              {resolution.expectedAmount} {resolution.currency}
            </span>
          </FieldRow>
        </SubSection>

        {/* Transaction Information */}
        <SubSection title="Transaction Information">
          <FieldRow label="Transaction Hash">
            <CopyableInline
              value={ticket.transactionHash}
              short={shorten(ticket.transactionHash)}
              copied={copied === "hash"}
              onCopy={() => copyValue(ticket.transactionHash, "hash")}
            />
          </FieldRow>
          <FieldRow label="Explorer Link">
            <button
              type="button"
              onClick={() => onOpenExplorer(ticket)}
              className="inline-flex items-center gap-1 text-amber-200 hover:text-amber-100"
            >
              Open on BscScan
              <ExternalLink className="h-3 w-3" aria-hidden />
            </button>
          </FieldRow>
          <FieldRow label="Submitted Wallet">
            <span
              className="truncate font-mono text-[11px]"
              title={resolution.submittedWallet}
            >
              {shorten(resolution.submittedWallet)}
            </span>
          </FieldRow>
          <FieldRow label="Expected Wallet">
            <span
              className="truncate font-mono text-[11px]"
              title={resolution.expectedWallet}
            >
              {shorten(resolution.expectedWallet)}
            </span>
          </FieldRow>
        </SubSection>

        {/* Checklist */}
        <SubSection title="Resolution Checklist">
          <ul className="space-y-2">
            {resolution.checklist.map((item) => (
              <li key={item.id} className="flex items-start gap-2.5 text-sm">
                {item.done ? (
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300"
                    aria-hidden
                  />
                ) : (
                  <Circle
                    className="mt-0.5 h-4 w-4 shrink-0 text-white/25"
                    aria-hidden
                  />
                )}
                <span
                  className={cn(
                    item.done ? "text-white/70 line-through" : "text-white/90"
                  )}
                >
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </SubSection>

        {/* Evidence guidance */}
        <SubSection title="Request Supporting Evidence">
          <p className="mb-2 text-xs text-tc-muted">
            Ask the member for relevant proof. Upload intake is deferred until
            NestJS — this list is instructional only.
          </p>
          <ul className="space-y-1.5">
            {resolution.evidenceRequests.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-xs text-white/80"
              >
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber-300/80" />
                {item}
              </li>
            ))}
          </ul>
        </SubSection>

        {/* Admin Notes */}
        <SubSection title="Admin Notes">
          <div className="space-y-2">
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={3}
              placeholder="Contact attempt, user response, investigation note…"
              className="w-full resize-y rounded-lg border border-white/10 bg-[#0c101c]/70 px-3 py-2 text-sm text-white/90 placeholder:text-tc-muted focus:border-amber-400/40 focus:outline-none focus:ring-2 focus:ring-amber-400/15"
            />
            <button
              type="button"
              onClick={onAddNote}
              disabled={!draft.trim()}
              className="inline-flex items-center gap-1.5 rounded-lg border border-amber-400/30 bg-amber-500/10 px-3 py-1.5 text-xs font-medium text-[#E8C96A] transition-colors hover:bg-amber-500/15 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Plus className="h-3.5 w-3.5" aria-hidden />
              Add Note
            </button>
          </div>

          {notes.length === 0 ? (
            <p className="mt-3 text-xs text-tc-muted">No resolution notes yet.</p>
          ) : (
            <ul className="mt-3 divide-y divide-white/10">
              {notes.map((note) => (
                <li key={note.id} className="flex gap-2 py-2.5 first:pt-0 last:pb-0">
                  <StickyNote
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-200/70"
                    aria-hidden
                  />
                  <div className="min-w-0">
                    <p className="text-sm leading-snug text-white/90">{note.body}</p>
                    <p className="mt-1 text-[11px] text-tc-muted">
                      {note.author} · {formatSubscriptionDate(note.createdAt)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </SubSection>

        {/* Resolution Actions — existing Membership activation flow */}
        <SubSection title="Resolution Actions">
          <p className="mb-3 text-xs text-tc-muted">
            Approve triggers the existing Membership activation path. Reject
            closes the ticket — Membership unchanged.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() => onApprove(ticket)}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/15 px-4 py-2.5 text-sm font-medium text-emerald-100 transition-colors hover:bg-emerald-500/25"
            >
              Approve Payment
            </button>
            <button
              type="button"
              onClick={() => onReject(ticket)}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-2.5 text-sm font-medium text-rose-100 transition-colors hover:bg-rose-500/20"
            >
              Reject Payment
            </button>
          </div>
        </SubSection>
      </div>
    </InfoCard>
  );
}

function SubSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-white/8 bg-black/20 p-3 sm:p-3.5">
      <h4 className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-amber-200/80">
        {title}
      </h4>
      {children}
    </div>
  );
}

function FieldRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-3 py-1.5">
      <span className="shrink-0 text-xs text-tc-muted">{label}</span>
      <div className="min-w-0 text-right text-sm text-white/90">{children}</div>
    </div>
  );
}

function shorten(value: string): string {
  if (value.length <= 16) return value;
  return `${value.slice(0, 8)}…${value.slice(-6)}`;
}

function CopyableInline({
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
      <span className="truncate font-mono text-[11px]" title={value}>
        {short}
      </span>
      <button
        type="button"
        onClick={onCopy}
        className="shrink-0 rounded p-0.5 text-tc-muted hover:text-white"
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
