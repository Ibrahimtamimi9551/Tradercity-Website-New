import type { ReactNode } from "react";
import { cn } from "@/lib/admin/cn";

type AdminMasterDetailProps = {
  list: ReactNode;
  detail?: ReactNode;
  className?: string;
  detailAsideClassName?: string;
};

/**
 * Shared master–detail shell for Admin directories.
 * Side panel is `lg+` only; below `lg`, callers use a full-page detail route.
 *
 * Pass sticky / max-height on the `detail` node itself (e.g. DiscordDetails
 * `className="sticky top-20 max-h-[calc(100vh-6.5rem)]"`) so internal
 * `flex-1 overflow-y-auto` panels receive a real height constraint.
 */
export function AdminMasterDetail({
  list,
  detail,
  className,
  detailAsideClassName,
}: AdminMasterDetailProps) {
  return (
    <div
      className={cn(
        "grid min-w-0 gap-4",
        "lg:grid-cols-[minmax(0,1fr)_22rem] xl:grid-cols-[minmax(0,1fr)_24rem]",
        className
      )}
    >
      <div className="min-w-0">{list}</div>
      {detail ? (
        <aside
          className={cn(
            "hidden min-h-[32rem] min-w-0 lg:block",
            detailAsideClassName
          )}
        >
          {detail}
        </aside>
      ) : null}
    </div>
  );
}
