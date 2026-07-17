import type { ReactNode } from "react";
import { cn } from "@/lib/admin/cn";

type ColCount = 1 | 2 | 3 | 4 | 5;

const mobileColClass: Record<ColCount, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-2",
  5: "grid-cols-3",
};

const mdColClass: Record<ColCount, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-2",
  5: "md:grid-cols-2",
};

const xlColClass: Record<ColCount, string> = {
  1: "xl:grid-cols-1",
  2: "xl:grid-cols-2",
  3: "xl:grid-cols-3",
  4: "xl:grid-cols-4",
  5: "xl:grid-cols-5",
};

type AdminStatGridProps = {
  children: ReactNode;
  /** Columns below `md`. Default 2. */
  mobileCols?: ColCount;
  /** Columns from `md` to `xl`. Default 2. */
  mdCols?: ColCount;
  /** Columns at `xl+`. Default 4. */
  xlCols?: ColCount;
  className?: string;
};

/**
 * KPI / widget grid that does not fight module-specific column counts.
 * Prefer this over the legacy `.admin-members-stat-grid` CSS override.
 */
export function AdminStatGrid({
  children,
  mobileCols = 2,
  mdCols = 2,
  xlCols = 4,
  className,
}: AdminStatGridProps) {
  return (
    <div
      className={cn(
        "grid gap-1.5 md:gap-4",
        mobileColClass[mobileCols],
        mdColClass[mdCols],
        xlColClass[xlCols],
        className
      )}
    >
      {children}
    </div>
  );
}
