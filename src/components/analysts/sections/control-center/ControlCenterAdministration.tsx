"use client";

import { Archive, Ban, PauseCircle, RotateCcw, ShieldAlert, XCircle } from "lucide-react";
import { modulePanelSurface } from "@/lib/admin/module-surfaces";
import { analystStatusBadge } from "@/lib/analysts/format-control-center";
import { StatusBadge } from "@/components/admin/ui";
import type { AnalystControlCenter } from "@/types/analysts/control-center";
import { cn } from "@/lib/admin/cn";

type ControlCenterAdministrationProps = {
  profile: AnalystControlCenter;
  onSuspend: () => void;
};

export function ControlCenterAdministration({
  profile,
  onSuspend,
}: ControlCenterAdministrationProps) {
  const status = analystStatusBadge(profile.status);
  const canSuspend = profile.status !== "suspended" && profile.status !== "closed";

  return (
    <div className="space-y-4 sm:space-y-6">
      <section className={modulePanelSurface("burgundy", "space-y-3")}>
        <h2 className="text-sm font-medium text-white sm:text-base">Partnership Administration</h2>
        <p className="text-sm leading-relaxed text-white/80">
          Business operations for this partnership live here — not in the Directory table or
          Inspector. Suspend uses a guided mock confirmation flow. Other actions are reserved.
        </p>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="text-tc-muted">Current status</span>
          <StatusBadge label={status.label} tone={status.tone} />
        </div>
      </section>

      <div className="grid gap-3 sm:grid-cols-2">
        <ActionCard
          icon={ShieldAlert}
          title="Suspend Partnership"
          description="Temporarily pause the partnership with reason, notes, and duration."
          actionLabel="Suspend…"
          tone="danger"
          disabled={!canSuspend}
          disabledReason={
            canSuspend ? undefined : "Already suspended or closed — use Reactivate when available."
          }
          onAction={onSuspend}
        />
        <ActionCard
          icon={RotateCcw}
          title="Reactivate Partnership"
          description="Restore a suspended partnership after review."
          actionLabel="Reactivate"
          disabled
        />
        <ActionCard
          icon={XCircle}
          title="Close Partnership"
          description="Terminal close with audit retention."
          actionLabel="Close…"
          disabled
        />
        <ActionCard
          icon={Archive}
          title="Archive Partnership"
          description="Long-term archival of the analyst record."
          actionLabel="Archive"
          disabled
        />
        <ActionCard
          icon={PauseCircle}
          title="Pause Publishing"
          description="Pause content publishing obligations and surfaces."
          actionLabel="Pause Publishing"
          disabled
        />
        <ActionCard
          icon={Ban}
          title="Pause Commission"
          description="Halt commission accrual / payouts as configured."
          actionLabel="Pause Commission"
          disabled
        />
      </div>
    </div>
  );
}

function ActionCard({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  disabled,
  disabledReason,
  tone = "neutral",
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  actionLabel: string;
  onAction?: () => void;
  disabled?: boolean;
  disabledReason?: string;
  tone?: "neutral" | "danger";
}) {
  return (
    <section className={modulePanelSurface("purple", "flex flex-col gap-3")}>
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border bg-black/25",
            tone === "danger"
              ? "border-rose-400/30 text-rose-200"
              : "border-white/10 text-violet-200"
          )}
        >
          <Icon className="h-4 w-4" aria-hidden />
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-medium text-white">{title}</h3>
          <p className="mt-1 text-xs leading-relaxed text-tc-muted">{description}</p>
        </div>
      </div>
      <button
        type="button"
        disabled={disabled}
        onClick={onAction}
        className={cn(
          "mt-auto rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
          disabled
            ? "cursor-not-allowed border-white/10 bg-black/20 text-tc-muted"
            : tone === "danger"
              ? "border-rose-400/40 bg-rose-500/15 text-rose-100 hover:bg-rose-500/25"
              : "border-violet-400/40 bg-violet-500/15 text-violet-100 hover:bg-violet-500/25"
        )}
      >
        {disabled ? `${actionLabel} (soon)` : actionLabel}
      </button>
      {disabled && disabledReason ? (
        <p className="text-[11px] text-tc-muted">{disabledReason}</p>
      ) : null}
    </section>
  );
}
