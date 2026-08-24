import type { ReactNode } from "react";
import { cn } from "@/lib/super-admin/cn";

type EmptyStateProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
};

export function EmptyState({ title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-zinc-950/40 px-6 py-16 text-center",
        className
      )}
    >
      <p className="text-sm font-medium text-zinc-200">{title}</p>
      {description ? (
        <p className="mt-2 max-w-md text-sm leading-relaxed text-zinc-500">{description}</p>
      ) : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
