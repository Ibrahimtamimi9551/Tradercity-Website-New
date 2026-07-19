"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/admin/ui";
import { modulePanelSurface } from "@/lib/admin/module-surfaces";
import { cn } from "@/lib/admin/cn";
import type {
  IntelligencePeriod,
  ReferralIntelligenceDashboard,
} from "@/types/members/referral-intelligence";
import { formatCount, formatUsd } from "./format";
import { TrendChart } from "./TrendChart";

const PERIODS: { id: IntelligencePeriod; label: string }[] = [
  { id: "7d", label: "7 Days" },
  { id: "30d", label: "30 Days" },
  { id: "quarter", label: "Quarter" },
  { id: "year", label: "Year" },
];

type Props = {
  trends: ReferralIntelligenceDashboard["trends"];
};

export function RevenueTrendsSection({ trends }: Props) {
  const [period, setPeriod] = useState<IntelligencePeriod>("30d");
  const data = trends[period];

  const charts = [
    {
      title: "Referral Revenue",
      points: data.referralRevenue,
      color: "rgb(244, 63, 94)",
      format: (v: number) => formatUsd(v, true),
      variant: "line" as const,
    },
    {
      title: "Membership Sales",
      points: data.membershipSales,
      color: "rgb(167, 139, 250)",
      format: formatCount,
      variant: "bar" as const,
    },
    {
      title: "Credits Redeemed",
      points: data.creditsRedeemed,
      color: "rgb(16, 185, 129)",
      format: (v: number) => formatUsd(v, true),
      variant: "line" as const,
    },
    {
      title: "Referral Growth",
      points: data.referralGrowth,
      color: "rgb(59, 130, 246)",
      format: formatCount,
      variant: "bar" as const,
    },
  ];

  return (
    <section>
      <SectionHeader
        title="Revenue Trends"
        description="Time-based analytics for referral-driven growth."
        action={
          <div
            className="inline-flex rounded-lg border border-white/10 bg-white/[0.03] p-0.5"
            role="group"
            aria-label="Trend period"
          >
            {PERIODS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPeriod(p.id)}
                className={cn(
                  "min-h-9 rounded-md px-2.5 text-xs font-medium transition-colors sm:px-3",
                  period === p.id
                    ? "bg-violet-500/25 text-white"
                    : "text-tc-muted hover:text-white"
                )}
              >
                {p.label}
              </button>
            ))}
          </div>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 md:gap-5">
        {charts.map((chart) => (
          <div
            key={chart.title}
            className={modulePanelSurface("purple", "p-5 sm:p-6")}
          >
            <h3 className="mb-4 text-sm font-medium text-white">{chart.title}</h3>
            <TrendChart
              key={`${period}-${chart.title}`}
              points={chart.points}
              color={chart.color}
              variant={chart.variant}
              valueFormatter={chart.format}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
