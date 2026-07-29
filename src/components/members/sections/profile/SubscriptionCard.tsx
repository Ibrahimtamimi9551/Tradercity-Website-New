"use client";

import { useState } from "react";
import { Check, Copy, Crown, ExternalLink } from "lucide-react";
import { StatusBadge } from "@/components/admin/ui";
import {
  daysRemainingClass,
  formatDaysRemaining,
  formatProfileDateTime,
} from "@/lib/members/format-profile";
import {
  MEMBERSHIP_ACTIVATION_SOURCE_LABELS,
  type MembershipActivationSource,
} from "@/types/members/activation-source";
import type { MemberProfile } from "@/types/members/profile";
import { FieldRow, ManageLink, ReflectionCard } from "./ReflectionCard";

type SubscriptionCardProps = {
  profile: MemberProfile;
};

function activationSourceLabel(
  source: MembershipActivationSource | null | undefined,
  legacy: string | null | undefined
): string {
  if (source) return MEMBERSHIP_ACTIVATION_SOURCE_LABELS[source];
  return legacy ?? "—";
}

function manageHref(
  profile: MemberProfile,
  source: MembershipActivationSource | null
): { href: string; label: string } {
  if (source === "referral_redeem") {
    return {
      href: `/admin/referrals?member=${profile.id}`,
      label: "Manage Referral",
    };
  }
  if (source === "manual_payment") {
    return {
      href: `/admin/subscriptions?source=manual&q=${encodeURIComponent(profile.username)}`,
      label: "Manage Subscription",
    };
  }
  return {
    href: `/admin/subscriptions?member=${profile.id}`,
    label: "Manage Subscription",
  };
}

/**
 * Subscription reflection card — fields adapt by Membership Activation Source.
 * Data is resolved from Crypto / Manual payment mocks (single source of truth).
 */
export function SubscriptionCard({ profile }: SubscriptionCardProps) {
  const { subscription } = profile;
  const source = subscription.activationSource;
  const [copied, setCopied] = useState(false);
  const manage = manageHref(profile, source);

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
        <ManageLink href={manage.href} label={manage.label} tone="purple" />
      }
    >
      <div className="divide-y divide-white/5">
        <FieldRow label="Activation Source">
          <span className="text-sky-300">
            {activationSourceLabel(source, subscription.activatedVia)}
          </span>
        </FieldRow>

        {source === "manual_payment" ? (
          <ManualPaymentFields subscription={subscription} />
        ) : source === "referral_redeem" ? (
          <ReferralRedeemFields subscription={subscription} />
        ) : source === "admin_grant" || source === "future_grant" ? (
          <GrantFields subscription={subscription} />
        ) : source === "crypto_payment" || subscription.transactionHash ? (
          <CryptoPaymentFields
            subscription={subscription}
            copied={copied}
            onCopyHash={copyHash}
          />
        ) : (
          <EmptySourceFields subscription={subscription} />
        )}
      </div>
    </ReflectionCard>
  );
}

type Sub = MemberProfile["subscription"];

function CryptoPaymentFields({
  subscription,
  copied,
  onCopyHash,
}: {
  subscription: Sub;
  copied: boolean;
  onCopyHash: () => void;
}) {
  return (
    <>
      <FieldRow label="Plan">
        <span className="text-violet-300">{subscription.plan}</span>
      </FieldRow>
      <FieldRow label="Status">
        <StatusText tone={subscription.statusTone} label={subscription.statusLabel} />
      </FieldRow>
      <FieldRow label="Network">{subscription.networkLabel ?? "—"}</FieldRow>
      <FieldRow label="Payment Method">{subscription.paymentMethod ?? "—"}</FieldRow>
      <FieldRow label="Amount Paid">
        <span className="tabular-nums">{subscription.amountPaid ?? "—"}</span>
      </FieldRow>
      <FieldRow label="Transaction Hash">
        {subscription.transactionHash ? (
          <span className="inline-flex items-center gap-1.5">
            <span className="font-mono text-xs text-white/80">
              {shortenHash(subscription.transactionHash)}
            </span>
            <button
              type="button"
              onClick={onCopyHash}
              className="rounded p-0.5 text-tc-muted hover:text-violet-300"
              aria-label={copied ? "Copied" : "Copy transaction hash"}
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-emerald-300" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
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
      <FieldRow label="Verification Status">
        {subscription.verificationLabel ?? "—"}
      </FieldRow>
      <FieldRow label="Approval">{subscription.approvalLabel ?? "—"}</FieldRow>
      <FieldRow label="Payment Date">
        {formatProfileDateTime(subscription.paymentDate)}
      </FieldRow>
      <FieldRow label="Expiry Date">
        {formatProfileDateTime(subscription.expiryDate)}
      </FieldRow>
      <FieldRow label="Days Remaining">
        <span className={daysRemainingClass(subscription.daysRemaining)}>
          {formatDaysRemaining(subscription.daysRemaining)}
        </span>
      </FieldRow>
    </>
  );
}

function ManualPaymentFields({ subscription }: { subscription: Sub }) {
  return (
    <>
      <FieldRow label="Plan">
        <span className="text-violet-300">{subscription.plan}</span>
      </FieldRow>
      <FieldRow label="Payment Method">
        {subscription.paymentMethod ?? "—"}
      </FieldRow>
      <FieldRow label="Amount">
        <span className="tabular-nums">{subscription.amountPaid ?? "—"}</span>
      </FieldRow>
      <FieldRow label="Reference Number">
        {subscription.referenceNumber ?? "—"}
      </FieldRow>
      <FieldRow label="Received By">{subscription.receivedBy ?? "—"}</FieldRow>
      <FieldRow label="Reason">{subscription.reason ?? "—"}</FieldRow>
      <FieldRow label="Notes">{subscription.notes ?? "—"}</FieldRow>
      <FieldRow label="Received Date">
        {formatProfileDateTime(
          subscription.receivedDate ?? subscription.paymentDate
        )}
      </FieldRow>
      <FieldRow label="Activated By">{subscription.approvedBy ?? "—"}</FieldRow>
      <FieldRow label="Activation Date">
        {formatProfileDateTime(subscription.activationDate)}
      </FieldRow>
    </>
  );
}

function ReferralRedeemFields({ subscription }: { subscription: Sub }) {
  return (
    <>
      <FieldRow label="Plan">
        <span className="text-violet-300">{subscription.plan}</span>
      </FieldRow>
      <FieldRow label="Credits Redeemed">
        <span className="tabular-nums text-emerald-300">
          {subscription.creditsRedeemed ?? "—"}
        </span>
      </FieldRow>
      <FieldRow label="Approved By">{subscription.approvedBy ?? "—"}</FieldRow>
      <FieldRow label="Activation Date">
        {formatProfileDateTime(subscription.activationDate)}
      </FieldRow>
    </>
  );
}

function GrantFields({ subscription }: { subscription: Sub }) {
  return (
    <>
      <FieldRow label="Plan">
        <span className="text-violet-300">{subscription.plan}</span>
      </FieldRow>
      <FieldRow label="Notes">{subscription.notes ?? "—"}</FieldRow>
      <FieldRow label="Approved By">{subscription.approvedBy ?? "—"}</FieldRow>
      <FieldRow label="Activation Date">
        {formatProfileDateTime(subscription.activationDate)}
      </FieldRow>
    </>
  );
}

function EmptySourceFields({ subscription }: { subscription: Sub }) {
  return (
    <>
      <FieldRow label="Plan">
        <span className="text-violet-300">{subscription.plan}</span>
      </FieldRow>
      <FieldRow label="Status">
        <StatusText tone={subscription.statusTone} label={subscription.statusLabel} />
      </FieldRow>
    </>
  );
}

function shortenHash(hash: string): string {
  if (hash.length <= 18) return hash;
  return `${hash.slice(0, 10)}…${hash.slice(-6)}`;
}

function StatusText({
  tone,
  label,
}: {
  tone: MemberProfile["subscription"]["statusTone"];
  label: string;
}) {
  return (
    <span
      className={
        tone === "success"
          ? "text-emerald-300"
          : tone === "warning"
            ? "text-amber-200"
            : tone === "danger"
              ? "text-rose-300"
              : "text-white/80"
      }
    >
      {label}
    </span>
  );
}
