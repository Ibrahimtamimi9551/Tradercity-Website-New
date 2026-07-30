"use client";

import { cn } from "@/lib/admin/cn";
import { GUIDE_TABS } from "@/lib/admin/guide";
import type { GuideTabId } from "@/types/admin/guide";

type GuideCenterTabsProps = {
  active: GuideTabId;
  onChange: (tab: GuideTabId) => void;
};

export function GuideCenterTabs({ active, onChange }: GuideCenterTabsProps) {
  return (
    <div className="-mx-1 border-b border-white/10">
      <div
        role="tablist"
        aria-label="Admin Guide Center sections"
        className="flex gap-1 overflow-x-auto px-1 pb-px [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {GUIDE_TABS.map((tab) => {
          if (tab.comingSoon) {
            return (
              <span
                key={tab.id}
                className="relative shrink-0 cursor-default px-3.5 py-2.5 text-sm font-medium text-tc-muted/50 sm:px-4"
                title="Coming soon"
              >
                {tab.label}
                <span className="ml-1.5 rounded border border-white/10 px-1 py-0.5 text-[10px] uppercase tracking-wide">
                  Soon
                </span>
              </span>
            );
          }

          const isActive = tab.id === active;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              id={`guide-tab-${tab.id}`}
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
