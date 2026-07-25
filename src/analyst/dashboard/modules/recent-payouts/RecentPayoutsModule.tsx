"use client";

import { History } from "lucide-react";
import { useAnalystDashboardContext } from "@/analyst/dashboard/context/useAnalystDashboardContext";
import { ModulePanel } from "@/analyst/dashboard/surfaces/ModulePanel";
import { Badge } from "@/analyst/dashboard/ui/Badge";
import { Button } from "@/analyst/dashboard/ui/Button";
import { EmptyState } from "@/analyst/dashboard/ui/EmptyState";
import { ModuleSkeleton } from "@/analyst/dashboard/ui/Skeleton";
import { analystTheme } from "@/analyst/dashboard/theme/analyst-theme";
import { formatUsdPrecise } from "@/analyst/dashboard/utils/format";

export function RecentPayoutsModule() {
  const { display, isLoading, ui, dispatchUi } = useAnalystDashboardContext();

  if (isLoading || !display) return <ModuleSkeleton rows={2} />;

  const { recentPayouts } = display;
  const list = ui.payoutHistoryOpen
    ? recentPayouts.history
    : recentPayouts.recent;

  return (
    <ModulePanel
      title="Recent Payouts"
      icon={History}
      personality="finance"
      subtitle="Quick payout history"
    >
      {list.length === 0 ? (
        <EmptyState
          icon={History}
          title="No payout history yet"
          description="You'll see completed payouts here after Admin processes your first request."
          actionLabel="Learn about payouts"
          onAction={() => {
            document
              .getElementById("analyst-help-support")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          accent={analystTheme.success}
        />
      ) : (
        <ul className="space-y-2">
          {list.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-3 transition-colors hover:bg-white/[0.04]"
            >
              <div>
                <p className="text-sm font-medium text-white">
                  {item.monthLabel}
                </p>
                <Badge tone="success" className="mt-1.5">
                  {item.statusLabel}
                </Badge>
              </div>
              <p
                className="text-base font-bold"
                style={{ color: analystTheme.success }}
              >
                {formatUsdPrecise(item.amountUsd)}
              </p>
            </li>
          ))}
        </ul>
      )}

      {recentPayouts.history.length > 2 ? (
        <Button
          variant="ghost"
          className="mt-4 text-xs"
          onClick={() => dispatchUi({ type: "toggle_payout_history" })}
        >
          {ui.payoutHistoryOpen ? "Show recent only" : "View Full History"}
        </Button>
      ) : null}
    </ModulePanel>
  );
}
