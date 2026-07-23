"use client";

import { cn } from "@/lib/admin/cn";
import type { ApplicationViewerTabId } from "@/types/analysts/applications";

const TABS: { id: ApplicationViewerTabId; label: string }[] = [
  { id: "application", label: "Application" },
  { id: "verification", label: "Verification" },
  { id: "evaluation", label: "Evaluation" },
  { id: "notes", label: "Notes" },
  { id: "decision", label: "Decision" },
];

type ApplicationViewerTabsProps = {
  active: ApplicationViewerTabId;
  onChange: (tab: ApplicationViewerTabId) => void;
};

export function ApplicationViewerTabs({
  active,
  onChange,
}: ApplicationViewerTabsProps) {
  return (
    <div className="-mx-1 border-b border-white/10">
      <div
        role="tablist"
        aria-label="Application review pipeline"
        className="flex gap-0.5 overflow-x-auto px-1 pb-px [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {TABS.map((tab) => {
          const isActive = tab.id === active;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              id={`application-viewer-tab-${tab.id}`}
              onClick={() => onChange(tab.id)}
              className={cn(
                "relative shrink-0 px-2.5 py-2 text-xs font-medium transition-colors sm:px-3 sm:text-sm",
                isActive ? "text-violet-200" : "text-tc-muted hover:text-white/80"
              )}
            >
              {tab.label}
              {isActive ? (
                <span
                  className="absolute inset-x-1.5 -bottom-px h-0.5 rounded-full bg-violet-400"
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
