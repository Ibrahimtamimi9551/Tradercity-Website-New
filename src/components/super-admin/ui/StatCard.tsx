import type { ReactNode } from "react";
import { cn } from "@/lib/super-admin/cn";

type StatCardProps = {
  label: string;
  /** Presentational value slot — pass a placeholder string in Phase 0; never compute finance here. */
  value?: ReactNode;
  hint?: string;
  icon?: ReactNode;
  className?: string;
};

export function StatCard({ label, value = "—", hint, icon, className }: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-white/[0.07] bg-zinc-950/70 px-4 py-4",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">
          {label}
        </p>
        {icon ? <div className="text-zinc-600">{icon}</div> : null}
      </div>
      <p className="mt-3 text-2xl font-semibold tracking-tight text-zinc-100">{value}</p>
      {hint ? <p className="mt-1.5 text-xs text-zinc-500">{hint}</p> : null}
    </div>
  );
}
