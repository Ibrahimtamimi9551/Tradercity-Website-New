"use client";

import Link from "next/link";
import { CheckCircle2, Clock, AlertTriangle, Mic2 } from "lucide-react";
import { cn } from "@/lib/admin/cn";
import { modulePanelAccent, modulePanelSurface } from "@/lib/admin/module-surfaces";
import { MOCK_ANALYST_DASHBOARD } from "@/lib/analysts/mock/dashboard";

const toneIcon = {
  success: CheckCircle2,
  purple: Mic2,
  warning: Clock,
  danger: AlertTriangle,
} as const;

const toneClass = {
  success: "bg-emerald-500/15 text-emerald-300",
  purple: "bg-tc-purple/20 text-tc-purple",
  warning: "bg-amber-500/15 text-amber-200",
  danger: "bg-rose-500/15 text-rose-300",
} as const;

export function AnalystRecentActivity() {
  return (
    <section
      className={cn(
        modulePanelSurface("navy", "flex h-full flex-col"),
        modulePanelAccent("purple")
      )}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-white">Recent Analyst Activity</h2>
        <Link
          href="/admin/analysts/directory"
          className="text-xs font-medium text-tc-purple hover:text-tc-purple/80"
        >
          View directory
        </Link>
      </div>

      <ul className="flex flex-1 flex-col gap-3">
        {MOCK_ANALYST_DASHBOARD.activity.map((item) => {
          const Icon = toneIcon[item.tone];
          return (
            <li key={item.id} className="flex items-start gap-3">
              <div
                className={cn(
                  "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                  toneClass[item.tone]
                )}
              >
                <Icon className="h-4 w-4" aria-hidden />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-white">{item.title}</p>
                <p className="truncate text-xs text-tc-muted">{item.description}</p>
              </div>
              <span className="shrink-0 text-[11px] text-tc-muted">{item.time}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
