import Link from "next/link";
import { cn } from "@/lib/admin/cn";

export type OperationsQueueItem = {
  id: string;
  label: string;
  description?: string;
  count: number;
  href: string;
  icon?: React.ElementType;
  iconTone?: "default" | "warning" | "danger" | "purple" | "blue";
  linkText?: string;
  avatars?: string[];
  extraCount?: number;
};

const iconToneMap = {
  default: "bg-white/10 text-white",
  warning: "bg-amber-500 text-white",
  danger: "bg-rose-500 text-white",
  purple: "bg-tc-purple text-white",
  blue: "bg-blue-500 text-white",
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
    <div className="rounded-xl border border-white/10 bg-[#0A0A0A] p-5">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3 className="text-base font-medium text-white">{title}</h3>
          {typeof total === "number" ? (
            <span className="flex h-5 items-center justify-center rounded-full bg-rose-500/15 px-2 text-xs font-medium text-rose-400">
              {total}
            </span>
          ) : null}
        </div>
        <button className="text-tc-muted hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <circle cx="12" cy="12" r="1" />
            <circle cx="12" cy="5" r="1" />
            <circle cx="12" cy="19" r="1" />
          </svg>
        </button>
      </div>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.id}>
            <div className="flex items-center justify-between rounded-lg p-2 transition-colors hover:bg-white/[0.02]">
              <div className="flex items-center gap-4">
                {item.icon ? (
                  <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-full", iconToneMap[item.iconTone ?? "default"])}>
                    <item.icon className="h-5 w-5" />
                  </div>
                ) : null}
                <span className="text-xl font-medium text-white w-8 text-center">{item.count}</span>
                <div>
                  <p className="text-sm font-medium text-white/90">{item.label}</p>
                  {item.description ? (
                    <p className="text-xs text-tc-muted">{item.description}</p>
                  ) : null}
                </div>
              </div>
              <div className="flex items-center gap-4">
                {item.avatars && item.avatars.length > 0 && (
                  <div className="flex items-center">
                    <div className="flex -space-x-2">
                      {item.avatars.map((avatar, i) => (
                        <div key={i} className="h-6 w-6 rounded-full border border-[#0A0A0A] bg-white/10 overflow-hidden">
                          <img src={avatar} alt="Avatar" className="h-full w-full object-cover" />
                        </div>
                      ))}
                    </div>
                    {item.extraCount && (
                      <span className="ml-2 text-xs font-medium text-tc-muted">+{item.extraCount}</span>
                    )}
                  </div>
                )}
                <Link
                  href={item.href}
                  className="rounded-lg border border-white/5 bg-white/[0.02] px-3 py-1.5 text-xs font-medium text-tc-purple transition-colors hover:bg-white/[0.04] hover:text-purple-300"
                >
                  {item.linkText || "Review →"}
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {viewAllHref ? (
        <div className="mt-4 border-t border-white/5 pt-4 text-center">
          <Link href={viewAllHref} className="text-sm font-medium text-tc-purple hover:text-purple-300">
            View all in Operations Queue &rarr;
          </Link>
        </div>
      ) : null}
    </div>
  );
}
