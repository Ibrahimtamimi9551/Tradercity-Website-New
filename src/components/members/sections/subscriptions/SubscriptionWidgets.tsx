"use client";

import { CheckCircle2, Clock, AlertTriangle, XCircle, ShieldCheck } from "lucide-react";
import { AdminStatGrid } from "@/components/admin/directory";
import { WidgetCard } from "@/components/admin/ui";
import type { SubscriptionStats } from "@/types/members/subscription";

type SubscriptionWidgetsProps = {
  stats: SubscriptionStats;
};

export function SubscriptionWidgets({ stats }: SubscriptionWidgetsProps) {
  return (
    <AdminStatGrid mobileCols={2} mdCols={3} xlCols={5}>
      <WidgetCard
        label="Approval Pending"
        value={stats.approvalPending.toLocaleString()}
        hint="Verified — final admin approval"
        icon={ShieldCheck}
        accent="gold"
        priority="important"
        compactMobile
        href="/admin/subscriptions?status=approval_pending"
        linkText="Review queue"
      />
      <WidgetCard
        label="Blockchain Verifying"
        value={stats.blockchainVerifying.toLocaleString()}
        hint="System verifying — no action"
        icon={Clock}
        accent="blue"
        priority="informational"
        compactMobile
        href="/admin/subscriptions?status=blockchain_verifying"
        linkText="Monitor"
      />
      <WidgetCard
        label="Verification Required"
        value={stats.verificationRequired.toLocaleString()}
        hint="Manual investigation needed"
        icon={AlertTriangle}
        accent="rose"
        priority="critical"
        compactMobile
        href="/admin/subscriptions?status=verification_required"
        linkText="Review now"
      />
      <WidgetCard
        label="Rejected"
        value={stats.rejected.toLocaleString()}
        hint="Closed without activation"
        icon={XCircle}
        accent="rose"
        priority="informational"
        compactMobile
        href="/admin/subscriptions?status=rejected"
        linkText="View rejected"
      />
      <WidgetCard
        label="Approved"
        value={stats.approved.toLocaleString()}
        hint="Membership activated"
        icon={CheckCircle2}
        accent="green"
        priority="informational"
        compactMobile
        href="/admin/subscriptions?status=approved"
        linkText="View approved"
      />
    </AdminStatGrid>
  );
}
