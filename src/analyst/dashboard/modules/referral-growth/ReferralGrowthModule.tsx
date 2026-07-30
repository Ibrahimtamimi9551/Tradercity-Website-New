"use client";

import { Network } from "lucide-react";
import { useAnalystDashboardContext } from "@/analyst/dashboard/context/useAnalystDashboardContext";
import { AreaChart } from "@/analyst/dashboard/surfaces/AreaChart";
import { ModulePanel } from "@/analyst/dashboard/surfaces/ModulePanel";
import { ChartSkeleton, ModuleSkeleton } from "@/analyst/dashboard/ui/Skeleton";
import { analystTheme } from "@/analyst/dashboard/theme/analyst-theme";

export function ReferralGrowthModule() {
  const { display, isLoading } = useAnalystDashboardContext();

  if (isLoading || !display) {
    return (
      <div className="rounded-2xl border border-white/10 bg-[rgba(10,14,24,0.92)] p-5 md:p-6">
        <ModuleSkeleton rows={1} />
        <ChartSkeleton height={200} />
      </div>
    );
  }

  const { referralGrowth } = display;

  return (
    <ModulePanel
      title="Referral Growth"
      icon={Network}
      personality="growth"
      subtitle="Volume over time"
    >
      <AreaChart
        points={referralGrowth.points}
        height={210}
        accent={analystTheme.growth}
      />
      <p className="mt-3 text-xs text-white/40">{referralGrowth.note}</p>
    </ModulePanel>
  );
}
