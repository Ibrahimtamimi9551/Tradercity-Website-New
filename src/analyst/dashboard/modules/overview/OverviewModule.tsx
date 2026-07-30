"use client";

import { BarChart3 } from "lucide-react";
import { useAnalystDashboardContext } from "@/analyst/dashboard/context/useAnalystDashboardContext";
import {
  MetricCell,
  ModulePanel,
} from "@/analyst/dashboard/surfaces/ModulePanel";
import { ModuleSkeleton } from "@/analyst/dashboard/ui/Skeleton";
import { analystTheme } from "@/analyst/dashboard/theme/analyst-theme";

export function OverviewModule() {
  const { display, isLoading } = useAnalystDashboardContext();

  if (isLoading || !display) return <ModuleSkeleton rows={5} />;

  const { overview } = display;

  return (
    <ModulePanel
      title="Overview"
      icon={BarChart3}
      personality="overview"
      subtitle="Quick partnership summary"
    >
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        <MetricCell
          label="Total Referrals"
          value={String(overview.totalReferrals)}
          numericValue={overview.totalReferrals}
          accent={analystTheme.analytics}
        />
        <MetricCell
          label="Paid Referrals"
          value={String(overview.paidReferrals)}
          numericValue={overview.paidReferrals}
          accent={analystTheme.success}
        />
        <MetricCell
          label="Active Subscribers"
          value={String(overview.activeSubscribers)}
          numericValue={overview.activeSubscribers}
          accent={analystTheme.info}
        />
        <MetricCell
          label="Commission %"
          value={`${overview.commissionSharePercent}%`}
          numericValue={overview.commissionSharePercent}
          suffix="%"
          accent={analystTheme.accent}
        />
        <MetricCell
          label="Current Month"
          value={`$${overview.currentMonthEarningsUsd.toFixed(0)}`}
          numericValue={overview.currentMonthEarningsUsd}
          prefix="$"
          decimals={0}
          accent={analystTheme.gold}
        />
      </div>
    </ModulePanel>
  );
}
