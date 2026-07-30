"use client";

import { ChevronDown, Coins } from "lucide-react";
import { useAnalystDashboardContext } from "@/analyst/dashboard/context/useAnalystDashboardContext";
import { AreaChart } from "@/analyst/dashboard/surfaces/AreaChart";
import {
  MetricCell,
  ModulePanel,
} from "@/analyst/dashboard/surfaces/ModulePanel";
import { Button } from "@/analyst/dashboard/ui/Button";
import { ModuleSkeleton } from "@/analyst/dashboard/ui/Skeleton";
import { analystTheme } from "@/analyst/dashboard/theme/analyst-theme";
import { formatUsdPrecise } from "@/analyst/dashboard/utils/format";

export function CommissionOverviewModule() {
  const { display, isLoading, ui, dispatchUi } = useAnalystDashboardContext();

  if (isLoading || !display) return <ModuleSkeleton rows={3} />;

  const { commissionOverview } = display;
  const open = ui.commissionBreakdownOpen;

  return (
    <ModulePanel
      title="Commission Overview"
      icon={Coins}
      personality="finance"
      subtitle="How much have I earned?"
      action={
        <Button
          variant="ghost"
          className="!min-h-9 !px-2 text-xs"
          onClick={() => dispatchUi({ type: "toggle_commission_breakdown" })}
        >
          {open ? "Hide breakdown" : "View breakdown"}
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          />
        </Button>
      }
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <MetricCell
          label="This Month Earnings"
          value={formatUsdPrecise(commissionOverview.thisMonthUsd)}
          numericValue={commissionOverview.thisMonthUsd}
          prefix="$"
          accent={analystTheme.success}
        />
        <MetricCell
          label="Previous Month Earnings"
          value={formatUsdPrecise(commissionOverview.previousMonthUsd)}
          numericValue={commissionOverview.previousMonthUsd}
          prefix="$"
          accent={analystTheme.neutral}
        />
        <MetricCell
          label="Lifetime Commission Earned"
          value={formatUsdPrecise(commissionOverview.lifetimeUsd)}
          numericValue={commissionOverview.lifetimeUsd}
          prefix="$"
          accent={analystTheme.gold}
        />
      </div>

      <div className="mt-5">
        <p
          className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em]"
          style={{ color: analystTheme.success }}
        >
          Monthly Commission Growth
        </p>
        <AreaChart
          points={commissionOverview.monthlyTrend}
          height={200}
          accent={analystTheme.success}
          valuePrefix="$"
        />
      </div>

      <div className="analyst-expand mt-2" data-open={open}>
        <div>
          <div
            className="mt-3 rounded-xl border p-4"
            style={{
              borderColor: analystTheme.successBorder,
              background: "rgba(0,0,0,0.28)",
            }}
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/45">
              Commission Breakdown
            </p>
            <ul className="mt-3 space-y-2">
              {commissionOverview.breakdown.map((row) => (
                <li
                  key={row.planLabel}
                  className="flex items-center justify-between gap-3 text-sm text-white/80"
                >
                  <span>
                    {row.planLabel}{" "}
                    <span className="text-white/40">({row.count})</span>
                  </span>
                  <span
                    className="font-semibold"
                    style={{ color: analystTheme.success }}
                  >
                    USDT {row.earningsUsd.toFixed(0)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3 text-sm font-semibold text-white">
              <span>Total Commission</span>
              <span style={{ color: analystTheme.success }}>
                USDT {commissionOverview.breakdownTotalUsd.toFixed(0)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </ModulePanel>
  );
}
