"use client";

import { Mic2, BadgeCheck, ClipboardList, AlertTriangle, UserPlus } from "lucide-react";
import { WidgetCard } from "@/components/admin/ui";
import type { AnalystDirectoryStats } from "@/types/analysts/directory";

type AnalystDirectoryWidgetsProps = {
  stats: AnalystDirectoryStats;
};

export function AnalystDirectoryWidgets({ stats }: AnalystDirectoryWidgetsProps) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-4 xl:grid-cols-5">
      <WidgetCard
        label="Total Analysts"
        value={stats.totalAnalysts.toLocaleString()}
        hint="All partnership records"
        icon={Mic2}
        accent="purple"
        priority="informational"
        compactMobile
        href="/admin/analysts/directory"
        linkText="View all"
      />
      <WidgetCard
        label="Active Partners"
        value={stats.activePartners.toLocaleString()}
        hint="Active or growing"
        icon={BadgeCheck}
        accent="green"
        priority="informational"
        compactMobile
        href="/admin/analysts/directory?status=active"
        linkText="View all"
      />
      <WidgetCard
        label="Applications Pending"
        value={stats.applicationsPending.toLocaleString()}
        hint="Intake queue"
        icon={ClipboardList}
        accent="blue"
        priority="informational"
        compactMobile
          href="/admin/analysts/applications?view=queue"
          linkText="View queue"
      />
      <WidgetCard
        label="Action Required"
        value={stats.actionRequired.toLocaleString()}
        hint="Analysts need attention"
        icon={AlertTriangle}
        accent="amber"
        priority="critical"
        compactMobile
        href="/admin/analysts/directory?health=action_required"
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
        href="/admin/analysts/directory"
        linkText="View all"
        className="col-span-2 xl:col-span-1"
      />
    </div>
  );
}
