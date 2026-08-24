import type { ReactNode } from "react";
import { cn } from "@/lib/super-admin/cn";

type FilterBarProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Layout shell for filters. No filtering logic in Phase 0 —
 * pass presentational controls as children.
 */
export function FilterBar({ children, className }: FilterBarProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-xl border border-white/[0.06] bg-zinc-950/50 p-3 sm:flex-row sm:flex-wrap sm:items-center",
        className
      )}
    >
      {children}
    </div>
  );
}
