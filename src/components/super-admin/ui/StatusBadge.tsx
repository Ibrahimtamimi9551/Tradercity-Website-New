import { cn } from "@/lib/super-admin/cn";
import type { SuperAdminStatus } from "@/types/super-admin";

const statusStyles: Record<SuperAdminStatus, string> = {
  active: "border-emerald-500/25 bg-emerald-500/10 text-emerald-300",
  inactive: "border-zinc-500/30 bg-zinc-500/10 text-zinc-400",
  pending: "border-amber-500/25 bg-amber-500/10 text-amber-200",
  healthy: "border-emerald-500/25 bg-emerald-500/10 text-emerald-300",
  warning: "border-amber-500/25 bg-amber-500/10 text-amber-200",
  critical: "border-rose-500/30 bg-rose-500/10 text-rose-300",
};

const statusLabels: Record<SuperAdminStatus, string> = {
  active: "Active",
  inactive: "Inactive",
  pending: "Pending",
  healthy: "Healthy",
  warning: "Warning",
  critical: "Critical",
};

type StatusBadgeProps = {
  status: SuperAdminStatus;
  label?: string;
  className?: string;
};

export function StatusBadge({ status, label, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-[11px] font-medium tracking-wide",
        statusStyles[status],
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-90" aria-hidden />
      {label ?? statusLabels[status]}
    </span>
  );
}
