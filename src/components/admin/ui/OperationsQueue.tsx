import Link from "next/link";
import { cn } from "@/lib/admin/cn";
import { modulePanelAccent, modulePanelSurface } from "@/lib/admin/module-surfaces";

export type OperationsQueueItem = {
  id: string;
  label: string;
  /** Number of open items in this queue */
  count: number;
  /** Human-readable wait for oldest unresolved item, e.g. "6 Hours" */
  oldestWaiting: string;
  href: string;
  icon?: React.ElementType;
  iconTone?: "default" | "warning" | "danger" | "purple" | "blue";
  /** Primary CTA label without trailing arrow */
  linkText?: string;
  countLabel?: string;
};

const iconToneMap = {
  default: "bg-white/10 text-white",
  warning: "bg-amber-500 text-white",
  danger: "bg-rose-500 text-white",
  purple: "bg-tc-purple text-white",
  blue: "bg-blue-500 text-white",
};

const actionToneMap = {
  default: "border-white/10 bg-white/[0.04] text-white hover:bg-white/[0.07]",
  warning: "border-amber-500/30 bg-amber-500/10 text-amber-200 hover:bg-amber-500/15",
  danger: "border-rose-500/30 bg-rose-500/10 text-rose-200 hover:bg-rose-500/15",
  purple: "border-violet-500/30 bg-violet-500/10 text-violet-200 hover:bg-violet-500/15",
  blue: "border-blue-500/30 bg-blue-500/10 text-blue-200 hover:bg-blue-500/15",
};

export function OperationsQueue({
  title,
  items,
  total,
  viewAllHref,
}: {
  title: string;
  items: OperationsQueueItem[];
  total?: number;
  viewAllHref?: string;
}) {
  return (
    <div className={modulePanelSurface("burgundy")}>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3 className="text-base font-medium text-white">{title}</h3>
          {typeof total === "number" ? (
            <span className="flex h-5 items-center justify-center rounded-full bg-rose-500/20 px-2 text-xs font-medium text-rose-300">
              {total}
            </span>
          ) : null}
        </div>
      </div>

      <ul className="space-y-3">
        {items.map((item) => {
          const tone = item.iconTone ?? "default";
          return (
            <li key={item.id}>
              <div className="flex flex-col gap-3 rounded-xl border border-white/[0.06] bg-black/20 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-start gap-3">
                  {item.icon ? (
                    <div
                      className={cn(
                        "mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                        iconToneMap[tone]
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                    </div>
                  ) : null}

                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white">{item.label}</p>
                    <p className="mt-1 text-sm tabular-nums text-white/90">
                      <span className="text-lg font-semibold text-white">{item.count}</span>{" "}
                      <span className="text-tc-muted">{item.countLabel ?? "Requests"}</span>
                    </p>
                    <p className="mt-2 text-xs text-tc-muted">
                      Oldest Waiting:{" "}
                      <span className="font-medium text-white/85">{item.oldestWaiting}</span>
                    </p>
                  </div>
                </div>

                <Link
                  href={item.href}
                  className={cn(
                    "inline-flex shrink-0 items-center justify-center rounded-lg border px-3.5 py-2 text-xs font-medium transition-colors sm:self-center",
                    actionToneMap[tone]
                  )}
                >
                  {item.linkText || "Review"}
                </Link>
              </div>
            </li>
          );
        })}
      </ul>

      {viewAllHref ? (
        <div className="mt-5 border-t border-white/10 pt-4 text-center">
          <Link
            href={viewAllHref}
            className={cn("text-sm font-medium hover:opacity-90", modulePanelAccent("burgundy"))}
          >
            View all in Operations Queue &rarr;
          </Link>
        </div>
      ) : null}
    </div>
  );
}
