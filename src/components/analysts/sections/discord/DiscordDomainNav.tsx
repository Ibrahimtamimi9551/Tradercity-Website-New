"use client";

import { cn } from "@/lib/admin/cn";
import type { AnalystDiscordDomainView } from "@/types/analysts/discord";

const VIEWS: { id: AnalystDiscordDomainView; label: string }[] = [
  { id: "dashboard", label: "Dashboard" },
  { id: "directory", label: "Directory" },
  { id: "operations", label: "Operations" },
];

type DiscordDomainNavProps = {
  active: AnalystDiscordDomainView;
  onChange: (view: AnalystDiscordDomainView) => void;
};

export function DiscordDomainNav({ active, onChange }: DiscordDomainNavProps) {
  return (
    <div className="-mx-1 border-b border-white/10">
      <div
        role="tablist"
        aria-label="Discord domain views"
        className="flex gap-1 overflow-x-auto px-1 pb-px [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {VIEWS.map((view) => {
          const isActive = view.id === active;
          return (
            <button
              key={view.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              id={`discord-view-${view.id}`}
              onClick={() => onChange(view.id)}
              className={cn(
                "relative shrink-0 px-3.5 py-2.5 text-sm font-medium transition-colors sm:px-4",
                isActive ? "text-violet-200" : "text-tc-muted hover:text-white/80"
              )}
            >
              {view.label}
              {isActive ? (
                <span
                  className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-violet-400"
                  aria-hidden
                />
              ) : null}
            </button>
          );
        })}
        <span
          className="relative shrink-0 cursor-default px-3.5 py-2.5 text-sm font-medium text-tc-muted/50 sm:px-4"
          title="Stage 2"
        >
          Intelligence
          <span className="ml-1.5 rounded border border-white/10 px-1 py-0.5 text-[10px] uppercase tracking-wide">
            Soon
          </span>
        </span>
      </div>
    </div>
  );
}
