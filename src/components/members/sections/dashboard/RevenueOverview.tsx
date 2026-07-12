"use client";

import { Lock } from "lucide-react";

export function RevenueOverview() {
  return (
    <div className="rounded-xl border border-white/10 bg-[#0A0A0A] p-5">
      <div className="mb-6 flex items-center gap-3">
        <h3 className="text-base font-medium text-white">Revenue Overview</h3>
        <div className="flex items-center gap-1.5 rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-400">
          <Lock className="h-3 w-3" />
          Super Admin Only
        </div>
      </div>
      
      <p className="mb-6 text-sm text-tc-muted">
        This data is only visible to Super Admins.
      </p>
      
      <button className="flex items-center gap-2 rounded-lg bg-tc-purple/10 px-4 py-2 text-sm font-medium text-tc-purple transition-colors hover:bg-tc-purple/20">
        <Lock className="h-4 w-4" />
        View Revenue
      </button>
    </div>
  );
}
