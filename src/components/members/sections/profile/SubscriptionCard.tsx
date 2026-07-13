"use client";

import { useState } from "react";
import { Check, Copy, Crown, ExternalLink } from "lucide-react";
import { StatusBadge } from "@/components/admin/ui";
import {
  daysRemainingClass,
  formatDaysRemaining,
  formatProfileDateTime,
} from "@/lib/members/format-profile";
import type { MemberProfile } from "@/types/members/profile";
import { FieldRow, ManageLink, ReflectionCard } from "./ReflectionCard";

type SubscriptionCardProps = {
  profile: MemberProfile;
};

export function SubscriptionCard({ profile }: SubscriptionCardProps) {
  const { subscription } = profile;
  const [copied, setCopied] = useState(false);

  const copyHash = async () => {
    if (!subscription.transactionHash) return;
    try {
      await navigator.clipboard.writeText(subscription.transactionHash);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <ReflectionCard
      tone="purple"
      title="Subscription"
      icon={Crown}
      badge={
        <StatusBadge
          label={subscription.statusLabel}
          tone={subscription.statusTone}
          className="hidden sm:inline-flex"
        />
      }
      footer={
        <ManageLink
          href={`/admin/subscriptions?member=${profile.id}`}
          label="Manage Subscription"
          tone="purple"
        />
      }
    >
      <div className="divide-y divide-white/5">
        <FieldRow label="Plan">
          <span className="text-violet-300">{subscription.plan}</span>
        </FieldRow>
        <FieldRow label="Status">
          <span
            className={
              subscription.statusTone === "success"
                ? "text-emerald-300"
                : subscription.statusTone === "warning"
                  ? "text-amber-200"
                  : subscription.statusTone === "danger"
                    ? "text-rose-300"
                    : "text-white/80"
            }
          >
            {subscription.statusLabel}
          </span>
        </FieldRow>
        <FieldRow label="Payment Date">
          {formatProfileDateTime(subscription.paymentDate)}
        </FieldRow>
        <FieldRow label="Expiry Date">{formatProfileDateTime(subscription.expiryDate)}</FieldRow>
        <FieldRow label="Days Remaining">
          <span className={daysRemainingClass(subscription.daysRemaining)}>
            {formatDaysRemaining(subscription.daysRemaining)}
          </span>
        </FieldRow>
        <FieldRow label="Transaction Hash">
          {subscription.transactionHash ? (
            <span className="inline-flex items-center gap-1.5">
              <span className="font-mono text-xs text-white/80">{subscription.transactionHash}</span>
              <button
                type="button"
                onClick={copyHash}
                className="rounded p-0.5 text-tc-muted hover:text-violet-300"
                aria-label={copied ? "Copied" : "Copy transaction hash"}
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-300" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
              {subscription.explorerUrl ? (
                <a
                  href={subscription.explorerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded p-0.5 text-tc-muted hover:text-violet-300"
                  aria-label="Open blockchain explorer"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              ) : null}
            </span>
          ) : (
            "—"
          )}
        </FieldRow>
        <FieldRow label="Payment Method">{subscription.paymentMethod ?? "—"}</FieldRow>
        <FieldRow label="Amount Paid">
          <span className="tabular-nums">{subscription.amountPaid ?? "—"}</span>
        </FieldRow>
      </div>
    </ReflectionCard>
  );
}
