"use client";

import {
  Mic2,
  ClipboardList,
  BadgeCheck,
  Coins,
  type LucideIcon,
} from "lucide-react";
import { WidgetCard } from "@/components/admin/ui";
import { MOCK_ANALYST_DASHBOARD } from "@/lib/analysts/mock/dashboard";

const iconByStatId: Record<string, LucideIcon> = {
  active: Mic2,
  applications: ClipboardList,
  verification: BadgeCheck,
  commissions: Coins,
};

export function AnalystOperationalWidgets() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {MOCK_ANALYST_DASHBOARD.stats.map((stat) => (
        <WidgetCard
          key={stat.id}
          label={stat.label}
          value={stat.value}
          hint={stat.hint}
          icon={iconByStatId[stat.id] ?? Mic2}
          accent={stat.accent}
          priority={stat.priority}
          trend={stat.trend}
          href={stat.href}
          linkText={stat.linkText}
        />
      ))}
    </div>
  );
}
