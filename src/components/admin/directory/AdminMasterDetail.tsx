import type { ReactNode } from "react";
import { cn } from "@/lib/admin/cn";

/**
 * Desktop details panel width — Referrals standard for stacked inspection content.
 * ~10% narrower than the prior 36rem / 40% shell so the primary workspace can breathe.
 */
export const ADMIN_DETAIL_PANEL_WIDTH =
  "lg:grid-cols-[minmax(0,1fr)_min(32.4rem,36%)] xl:grid-cols-[minmax(0,1fr)_32.4rem]";

type AdminMasterDetailProps = {
  list: ReactNode;
  detail?: ReactNode;
  className?: string;
  detailAsideClassName?: string;
  /**
   * `section` — panel beside the list block only (legacy).
   * `page` — permanent full-height panel aligned to content top (desktop standard).
   */
  layout?: "section" | "page";
};

/**
 * Shared master–detail shell for Admin directories.
 * Side panel is `lg+` only; below `lg`, callers use a full-page detail route.
 *
 * For `layout="page"`, put the whole page stack (title, widgets, filters, table)
 * in `list` so the panel aligns with the top of the content area.
 */
export function AdminMasterDetail({
  list,
  detail,
  className,
  detailAsideClassName,
  layout = "page",
}: AdminMasterDetailProps) {
  const isPage = layout === "page";

  return (
    <div
      className={cn(
        "grid min-w-0 gap-4",
        ADMIN_DETAIL_PANEL_WIDTH,
        isPage && "lg:items-start",
        className
      )}
    >
      <div className="min-w-0">{list}</div>
      {detail ? (
        <aside
          className={cn(
            "hidden min-w-0 lg:flex lg:flex-col",
            isPage
              ? // Header (4rem) + main pt-6 (1.5rem) → top; leave main pb-8 (2rem) at bottom
                "lg:sticky lg:top-[5.5rem] lg:h-[calc(100vh-7.5rem)]"
              : "min-h-[32rem] lg:sticky lg:top-[5.5rem] lg:h-[calc(100vh-7.5rem)]",
            detailAsideClassName
          )}
        >
          <div className="min-h-0 min-w-0 flex-1">{detail}</div>
        </aside>
      ) : null}
    </div>
  );
}
