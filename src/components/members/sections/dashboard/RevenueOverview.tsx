"use client";

import { Lock } from "lucide-react";
import { cn } from "@/lib/admin/cn";
import { modulePanelAccent, modulePanelSurface } from "@/lib/admin/module-surfaces";

export function RevenueOverview() {
  return (
    <div className={modulePanelSurface("gold")}>
      <div className="mb-6 flex items-center gap-3">
        <h3 className="text-base font-medium text-white">Revenue Overview</h3>
        <div className="flex items-center gap-1.5 rounded-full bg-amber-500/15 px-2 py-0.5 text-xs font-medium text-[#E8C96A]">
          <Lock className="h-3 w-3" />
          Super Admin Only
        </div>
      </div>

      <p className="mb-6 text-sm text-tc-muted">This data is only visible to Super Admins.</p>

      <button
        type="button"
        className={cn(
          "flex items-center gap-2 rounded-lg border border-amber-400/25 bg-amber-500/10 px-4 py-2 text-sm font-medium transition-colors hover:bg-amber-500/15",
          modulePanelAccent("gold")
        )}
      >
        <Lock className="h-4 w-4" />
        View Revenue
      </button>
    </div>
  );
}
