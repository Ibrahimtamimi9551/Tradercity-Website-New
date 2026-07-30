import type { LucideIcon } from "lucide-react";
import { CheckCircle2, Circle, Clock, XCircle } from "lucide-react";
import { cn } from "@/lib/admin/cn";

export type TimelineItem = {
  id: string;
  title: string;
  description?: string;
  timestamp?: string;
  status?: "complete" | "current" | "pending" | "error";
  /** Optional status chip next to the title. */
  badge?: string;
  /** Optional icon override; defaults to status indicator. */
  icon?: LucideIcon;
};

const iconMap = {
  complete: CheckCircle2,
  current: Clock,
  pending: Circle,
  error: XCircle,
};

const toneMap = {
  complete: "text-emerald-300",
  current: "text-sky-300",
  pending: "text-tc-muted",
  error: "text-rose-300",
};

export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="space-y-4">
      {items.map((item, index) => {
        const status = item.status ?? "pending";
        const Icon = item.icon ?? iconMap[status];
        return (
          <li key={item.id} className="flex gap-3">
            <div className="flex flex-col items-center">
              <Icon className={cn("h-4 w-4 shrink-0", toneMap[status])} aria-hidden />
              {index < items.length - 1 ? (
                <span className="mt-1 h-full min-h-[1rem] w-px flex-1 bg-white/10" />
              ) : null}
            </div>
            <div className="min-w-0 pb-2">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-medium text-white">{item.title}</p>
                {item.badge ? (
                  <span className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-tc-muted">
                    {item.badge}
                  </span>
                ) : null}
              </div>
              {item.description ? (
                <p className="mt-0.5 text-xs text-tc-muted">{item.description}</p>
              ) : null}
              {item.timestamp ? (
                <p className="mt-1 text-xs text-tc-muted">{item.timestamp}</p>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
