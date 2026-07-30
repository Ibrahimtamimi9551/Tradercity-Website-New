"use client";

import { ActivitySquare } from "lucide-react";
import { useAnalystDashboardContext } from "@/analyst/dashboard/context/useAnalystDashboardContext";
import { ModulePanel } from "@/analyst/dashboard/surfaces/ModulePanel";
import { ModuleSkeleton } from "@/analyst/dashboard/ui/Skeleton";
import { analystTheme } from "@/analyst/dashboard/theme/analyst-theme";
import type { MetricComparison } from "@/analyst/dashboard/types";

function FunnelMetric({
  label,
  metric,
  accent,
  fallback,
}: {
  label: string;
  metric: MetricComparison;
  accent: string;
  fallback?: string;
}) {
  const display =
    metric.value === null ? (fallback ?? "Soon") : String(metric.value);
  const positive =
    metric.changeLabel.startsWith("+") || metric.changeLabel === "0%";

  return (
    <div
      className="rounded-xl border p-4 transition-colors hover:bg-white/[0.03]"
      style={{
        borderColor: "rgba(91,155,255,0.18)",
        background: "rgba(8,14,28,0.75)",
      }}
    >
      <div className="mb-2 flex items-center gap-2">
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: accent, boxShadow: `0 0 8px ${accent}` }}
        />
        <p className="text-[10px] font-bold uppercase tracking-wider text-white/40">
          {label}
        </p>
      </div>
      <p className="text-xl font-bold text-white md:text-2xl">{display}</p>
      <p
        className="mt-1.5 text-xs font-medium"
        style={{
          color: positive ? analystTheme.success : analystTheme.neutral,
        }}
      >
        {metric.changeLabel} vs last month
      </p>
    </div>
  );
}

export function PerformanceSnapshotModule() {
  const { display, isLoading } = useAnalystDashboardContext();

  if (isLoading || !display) return <ModuleSkeleton rows={5} />;

  const { performance } = display;

  return (
    <ModulePanel
      title="Performance Snapshot"
      icon={ActivitySquare}
      personality="analytics"
      subtitle="Referral funnel with monthly comparison"
    >
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
        <FunnelMetric
          label="Clicks"
          metric={performance.clicks}
          accent={analystTheme.info}
        />
        <FunnelMetric
          label="Registrations"
          metric={performance.registrations}
          accent={analystTheme.analytics}
        />
        <FunnelMetric
          label="Active Members"
          metric={performance.activeMembers}
          accent={analystTheme.accentMuted}
        />
        <FunnelMetric
          label="Paid Members"
          metric={performance.paidMembers}
          accent={analystTheme.success}
        />
        <div
          className="rounded-xl border p-4"
          style={{
            borderColor: "rgba(91,155,255,0.18)",
            background: "rgba(8,14,28,0.75)",
          }}
        >
          <div className="mb-2 flex items-center gap-2">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{
                background: analystTheme.info,
                boxShadow: `0 0 8px ${analystTheme.info}`,
              }}
            />
            <p className="text-[10px] font-bold uppercase tracking-wider text-white/40">
              Conversion Rate
            </p>
          </div>
          <p className="text-xl font-bold text-white md:text-2xl">
            {performance.conversionRateLabel}
          </p>
          <p className="mt-1.5 text-xs font-medium text-[#7EB6FF]">
            {performance.conversionChangeLabel} vs last month
          </p>
        </div>
      </div>
    </ModulePanel>
  );
}
