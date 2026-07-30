"use client";

import { cn } from "@/lib/admin/cn";
import type { AnalystCommissionDomainView } from "@/types/analysts/commissions";

const VIEWS: { id: AnalystCommissionDomainView; label: string }[] = [
  { id: "dashboard", label: "Dashboard" },
  { id: "directory", label: "Directory" },
  { id: "payouts", label: "Payouts" },
  { id: "history", label: "History" },
];

type CommissionsDomainNavProps = {
  active: AnalystCommissionDomainView;
  onChange: (view: AnalystCommissionDomainView) => void;
};

export function CommissionsDomainNav({
  active,
  onChange,
}: CommissionsDomainNavProps) {
  return (
    <div className="-mx-1 border-b border-white/10">
      <div
        role="tablist"
        aria-label="Commission domain views"
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
              id={`commissions-view-${view.id}`}
              onClick={() => onChange(view.id)}
              className={cn(
                "relative shrink-0 px-3.5 py-2.5 text-sm font-medium transition-colors sm:px-4",
                isActive
                  ? "text-amber-200"
                  : "text-tc-muted hover:text-white/80"
              )}
            >
              {view.label}
              {isActive ? (
                <span
                  className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-amber-400"
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
