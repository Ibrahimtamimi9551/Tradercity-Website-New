"use client";

import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { AdminStatGrid } from "@/components/admin/directory";
import { WidgetCard } from "@/components/admin/ui";
import type { ReferralRedeemStats } from "@/types/members/referral";

type ReferralRedeemWidgetsProps = {
  stats: ReferralRedeemStats;
};

export function ReferralRedeemWidgets({ stats }: ReferralRedeemWidgetsProps) {
  return (
    <AdminStatGrid mobileCols={2} mdCols={3} xlCols={3}>
      <WidgetCard
        label="Waiting Admin Approval"
        value={stats.waitingApproval.toLocaleString()}
        hint="Redeem requests in queue"
        icon={Clock}
        accent="amber"
        priority="critical"
        compactMobile
        href="/admin/subscriptions?source=referral_redeem"
        linkText="Review queue"
      />
      <WidgetCard
        label="Approved"
        value={stats.approved.toLocaleString()}
        hint="Membership activated via redeem"
        icon={CheckCircle2}
        accent="green"
        priority="informational"
        compactMobile
        href="/admin/subscriptions?source=referral_redeem&rrStatus=approved"
        linkText="View approved"
      />
      <WidgetCard
        label="Rejected"
        value={stats.rejected.toLocaleString()}
        hint="Membership unchanged"
        icon={XCircle}
        accent="rose"
        priority="informational"
        compactMobile
        href="/admin/subscriptions?source=referral_redeem&rrStatus=rejected"
        linkText="View rejected"
      />
    </AdminStatGrid>
  );
}
