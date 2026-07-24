"use client";

import { Users, Crown, Clock, AlertTriangle, UserPlus } from "lucide-react";
import { AdminStatGrid } from "@/components/admin/directory";
import { WidgetCard } from "@/components/admin/ui";
import type { DirectoryStats } from "@/types/members/directory";

type DirectoryWidgetsProps = {
  stats: DirectoryStats;
};

export function DirectoryWidgets({ stats }: DirectoryWidgetsProps) {
  return (
    <AdminStatGrid mobileCols={2} mdCols={3} xlCols={5}>
      <WidgetCard
        label="Total Members"
        value={stats.totalMembers.toLocaleString()}
        hint="All registered users"
        icon={Users}
        accent="purple"
        priority="informational"
        compactMobile
        href="/admin/members"
        linkText="View all"
      />
      <WidgetCard
        label="VIP Members"
        value={stats.vipMembers.toLocaleString()}
        hint="Active VIP members"
        icon={Crown}
        accent="gold"
        priority="informational"
        compactMobile
        href="/admin/members?membership=vip"
        linkText="View all"
      />
      <WidgetCard
        label="Pending Verification"
        value={stats.pendingVerification.toLocaleString()}
        hint="Subscription pending"
        icon={Clock}
        accent="blue"
        priority="informational"
        compactMobile
        href="/admin/subscriptions?status=pending_verification"
        linkText="View all"
      />
      <WidgetCard
        label="Action Required"
        value={stats.actionRequired.toLocaleString()}
        hint="Members need attention"
        icon={AlertTriangle}
        accent="amber"
        priority="critical"
        compactMobile
        href="/admin/members?health=action_required"
        linkText="View all"
      />
      <WidgetCard
        label="New This Month"
        value={stats.newThisMonth.toLocaleString()}
        hint={stats.newThisMonthLabel}
        icon={UserPlus}
        accent="teal"
        priority="informational"
        compactMobile
        href="/admin/members"
        linkText="View all"
        className="col-span-2 md:col-span-1 xl:col-span-1"
      />
    </AdminStatGrid>
  );
}
