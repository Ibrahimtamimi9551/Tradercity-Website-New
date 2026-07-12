import { cn } from "@/lib/admin/cn";
import { CheckCircle2, Circle, Clock, XCircle } from "lucide-react";

export type TimelineItem = {
  id: string;
  title: string;
  description?: string;
  timestamp?: string;
  status?: "complete" | "current" | "pending" | "error";
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
        const Icon = iconMap[status];
        return (
          <li key={item.id} className="flex gap-3">
            <div className="flex flex-col items-center">
              <Icon className={cn("h-4 w-4", toneMap[status])} aria-hidden />
              {index < items.length - 1 ? <span className="mt-1 h-full w-px bg-white/10" /> : null}
            </div>
            <div className="pb-2">
              <p className="text-sm font-medium text-white">{item.title}</p>
              {item.description ? <p className="text-xs text-tc-muted">{item.description}</p> : null}
              {item.timestamp ? <p className="mt-1 text-xs text-tc-muted">{item.timestamp}</p> : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
