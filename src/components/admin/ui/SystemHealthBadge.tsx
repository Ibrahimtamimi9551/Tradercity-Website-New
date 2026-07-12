import { cn } from "@/lib/admin/cn";
import type { SystemHealthState } from "@/types/admin/common";

const healthConfig: Record<SystemHealthState, { label: string; className: string }> = {
  healthy: { label: "Healthy", className: "text-emerald-300" },
  needs_attention: { label: "Needs Attention", className: "text-amber-200" },
  action_required: { label: "Action Required", className: "text-rose-300" },
};

export function SystemHealthBadge({ state }: { state: SystemHealthState }) {
  const config = healthConfig[state];
  return (
    <span className={cn("inline-flex items-center gap-2 text-xs font-medium", config.className)}>
      <span className="h-2 w-2 rounded-full bg-current" aria-hidden />
      {config.label}
    </span>
  );
}
