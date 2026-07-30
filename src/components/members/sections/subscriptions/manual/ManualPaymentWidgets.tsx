"use client";

import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { AdminStatGrid } from "@/components/admin/directory";
import { WidgetCard } from "@/components/admin/ui";
import type { ManualPaymentStats } from "@/types/members/manual-payment";

type ManualPaymentWidgetsProps = {
  stats: ManualPaymentStats;
};

export function ManualPaymentWidgets({ stats }: ManualPaymentWidgetsProps) {
  return (
    <AdminStatGrid mobileCols={2} mdCols={3} xlCols={3}>
      <WidgetCard
        label="Pending"
        value={stats.pending.toLocaleString()}
        hint="Recorded — ready to activate"
        icon={Clock}
        accent="gold"
        priority="important"
        compactMobile
        href="/admin/subscriptions?source=manual&mpStatus=pending"
        linkText="Review pending"
      />
      <WidgetCard
        label="Activated"
        value={stats.activated.toLocaleString()}
        hint="Membership activated"
        icon={CheckCircle2}
        accent="green"
        priority="informational"
        compactMobile
        href="/admin/subscriptions?source=manual&mpStatus=activated"
        linkText="View activated"
      />
      <WidgetCard
        label="Cancelled"
        value={stats.cancelled.toLocaleString()}
        hint="Closed without activation"
        icon={XCircle}
        accent="rose"
        priority="informational"
        compactMobile
        href="/admin/subscriptions?source=manual&mpStatus=cancelled"
        linkText="View cancelled"
      />
    </AdminStatGrid>
  );
}
