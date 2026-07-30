"use client";

import { Trophy } from "lucide-react";
import { useAnalystDashboardContext } from "@/analyst/dashboard/context/useAnalystDashboardContext";
import { ModulePanel } from "@/analyst/dashboard/surfaces/ModulePanel";
import { Badge } from "@/analyst/dashboard/ui/Badge";
import { ModuleSkeleton } from "@/analyst/dashboard/ui/Skeleton";
import { analystTheme } from "@/analyst/dashboard/theme/analyst-theme";
import {
  formatPercent,
  formatUsdPrecise,
} from "@/analyst/dashboard/utils/format";

const tierColors = {
  bronze: analystTheme.bronze,
  silver: analystTheme.silver,
  gold: analystTheme.gold,
  diamond: analystTheme.diamond,
} as const;

export function CommissionMilestonesModule() {
  const { display, isLoading } = useAnalystDashboardContext();

  if (isLoading || !display) return <ModuleSkeleton rows={4} />;

  const { commissionMilestones } = display;

  return (
    <ModulePanel
      title="Commission Milestones"
      icon={Trophy}
      personality="achievement"
      subtitle="Cumulative referral earnings drive your tier"
    >
      <div className="space-y-3">
        {commissionMilestones.rows.map((row) => {
          const color = tierColors[row.id];
          return (
            <div
              key={row.id}
              className="relative overflow-hidden rounded-xl border px-4 py-3.5 transition-colors"
              style={{
                borderColor: row.isCurrent
                  ? `${color}66`
                  : "rgba(255,255,255,0.08)",
                background: row.isCurrent
                  ? `${color}14`
                  : "rgba(255,255,255,0.02)",
              }}
            >
              {row.isCurrent ? (
                <span
                  className="absolute right-0 top-0 rounded-bl-lg px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-black"
                  style={{ background: color }}
                >
                  Current
                </span>
              ) : null}

              <div className="flex flex-wrap items-center justify-between gap-2 pr-14">
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold text-black"
                    style={{ background: color }}
                  >
                    {row.sharePercent}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {row.name}
                    </p>
                    <p className="mt-0.5 text-xs text-white/45">
                      Required: {row.requiredLabel}
                    </p>
                  </div>
                </div>
                <p className="text-lg font-bold" style={{ color }}>
                  {formatPercent(row.sharePercent)}
                </p>
              </div>

              {row.isCurrent ? (
                <>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Badge tone="gold">
                      Cumulative{" "}
                      {formatUsdPrecise(
                        commissionMilestones.cumulativeEarningsUsd
                      )}
                    </Badge>
                    <Badge tone="success">
                      This month{" "}
                      {formatUsdPrecise(
                        commissionMilestones.currentMonthEarningsUsd
                      )}
                    </Badge>
                  </div>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-black/40">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${row.progressPercent}%`,
                        background: color,
                      }}
                    />
                  </div>
                </>
              ) : null}
            </div>
          );
        })}
      </div>

      <p
        className="mt-4 rounded-xl border px-4 py-3 text-sm"
        style={{
          borderColor: "rgba(245,215,110,0.25)",
          background: "rgba(245,215,110,0.08)",
          color: "rgba(255,255,255,0.85)",
        }}
      >
        {commissionMilestones.helperMessage}
      </p>
    </ModulePanel>
  );
}
