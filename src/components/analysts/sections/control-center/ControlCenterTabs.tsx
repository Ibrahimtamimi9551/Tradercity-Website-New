"use client";

import { cn } from "@/lib/admin/cn";
import type { AnalystControlCenterTabId } from "@/types/analysts/control-center";

const TABS: { id: AnalystControlCenterTabId; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "timeline", label: "Timeline" },
  { id: "administration", label: "Administration" },
  { id: "performance", label: "Performance" },
  { id: "discord", label: "Discord" },
  { id: "referrals", label: "Referrals" },
  { id: "commissions", label: "Commissions" },
  { id: "notes", label: "Notes" },
];

type ControlCenterTabsProps = {
  active: AnalystControlCenterTabId;
  onChange: (tab: AnalystControlCenterTabId) => void;
};

export function ControlCenterTabs({ active, onChange }: ControlCenterTabsProps) {
  return (
    <div className="-mx-1 border-b border-white/10">
      <div
        role="tablist"
        aria-label="Analyst Control Center sections"
        className="flex gap-1 overflow-x-auto px-1 pb-px [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {TABS.map((tab) => {
          const isActive = tab.id === active;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              id={`control-center-tab-${tab.id}`}
              onClick={() => onChange(tab.id)}
              className={cn(
                "relative shrink-0 px-3.5 py-2.5 text-sm font-medium transition-colors sm:px-4",
                isActive ? "text-violet-200" : "text-tc-muted hover:text-white/80"
              )}
            >
              {tab.label}
              {isActive ? (
                <span
                  className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-violet-400"
                  aria-hidden
                />
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
