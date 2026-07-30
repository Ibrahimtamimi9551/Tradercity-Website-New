"use client";

import Link from "next/link";
import { Calendar, ShieldAlert, Sparkles } from "lucide-react";
import { StatusBadge, SystemHealthBadge } from "@/components/admin/ui";
import { cn } from "@/lib/admin/cn";
import { modulePanelSurface } from "@/lib/admin/module-surfaces";
import {
  activityStatusPresentation,
  analystStatusBadge,
  analystTierBadge,
  formatPartneredDate,
} from "@/lib/analysts/format-control-center";
import type { AnalystControlCenter } from "@/types/analysts/control-center";
import type { DirectoryAnalyst } from "@/types/analysts/directory";

const avatarToneStyles: Record<DirectoryAnalyst["avatarTone"], string> = {
  discord: "bg-[#5865F2] text-white",
  violet: "bg-violet-500/30 text-violet-200",
  emerald: "bg-emerald-500/30 text-emerald-200",
  amber: "bg-amber-500/30 text-amber-100",
  rose: "bg-rose-500/30 text-rose-200",
  sky: "bg-sky-500/30 text-sky-200",
};

type ControlCenterHeaderProps = {
  profile: AnalystControlCenter;
  onOpenAdministration: () => void;
  onOpenSuspend: () => void;
};

export function ControlCenterHeader({
  profile,
  onOpenAdministration,
  onOpenSuspend,
}: ControlCenterHeaderProps) {
  const initials = profile.handle.slice(0, 2).toUpperCase();
  const status = analystStatusBadge(profile.status);
  const tier = analystTierBadge(profile.tier);
  const activity = activityStatusPresentation(profile.activityStatus);

  return (
    <section className={modulePanelSurface("purple", "space-y-5")}>
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div className="flex min-w-0 items-start gap-4">
          <div
            className={cn(
              "flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-base font-semibold sm:h-16 sm:w-16 sm:text-lg",
              avatarToneStyles[profile.avatarTone]
            )}
            aria-hidden
          >
            {initials}
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="truncate text-xl font-semibold tracking-tight text-white sm:text-2xl">
                {profile.displayName}
              </h1>
              <StatusBadge label={status.label} tone={status.tone} />
              {tier ? <StatusBadge label={tier.label} tone={tier.tone} dot={false} /> : null}
            </div>
            <p className="mt-1 truncate text-sm text-tc-muted">@{profile.handle}</p>
            <p className="mt-0.5 truncate text-sm text-tc-muted">{profile.email}</p>
            <p className="mt-2 text-sm text-white/80">{profile.specialization}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:min-w-0 xl:max-w-2xl xl:flex-1">
          <HeaderMetric label="Activity" value={activity.label} tone={activity.tone} />
          <div className="rounded-lg border border-white/10 bg-black/20 px-3 py-2.5">
            <p className="text-[10px] uppercase tracking-wide text-tc-muted sm:text-[11px]">
              Health
            </p>
            <div className="mt-1.5">
              <SystemHealthBadge state={profile.systemHealth} />
            </div>
          </div>
          <HeaderMetric
            label="Partner Since"
            value={formatPartneredDate(profile.partneredAt)}
            icon={Calendar}
          />
          <HeaderMetric label="Tier" value={tier?.label ?? "None"} icon={Sparkles} />
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onOpenAdministration}
            className="inline-flex items-center gap-2 rounded-lg border border-violet-400/40 bg-violet-500/20 px-3.5 py-2 text-sm font-medium text-violet-100 transition-colors hover:bg-violet-500/30"
          >
            Administration
          </button>
          {profile.status !== "suspended" && profile.status !== "closed" ? (
            <button
              type="button"
              onClick={onOpenSuspend}
              className="inline-flex items-center gap-2 rounded-lg border border-rose-400/35 bg-rose-500/10 px-3.5 py-2 text-sm font-medium text-rose-100 transition-colors hover:bg-rose-500/20"
            >
              <ShieldAlert className="h-3.5 w-3.5" aria-hidden />
              Suspend
            </button>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function HeaderMetric({
  label,
  value,
  tone,
  icon: Icon,
}: {
  label: string;
  value: string;
  tone?: "success" | "warning" | "danger" | "info" | "neutral" | "vip";
  icon?: React.ElementType;
}) {
  const valueClass =
    tone === "success"
      ? "text-emerald-300"
      : tone === "warning"
        ? "text-amber-200"
        : tone === "danger"
          ? "text-rose-300"
          : "text-white/85";

  return (
    <div className="rounded-lg border border-white/10 bg-black/20 px-3 py-2.5">
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wide text-tc-muted sm:text-[11px]">
        {Icon ? <Icon className="h-3 w-3 shrink-0 text-violet-300" aria-hidden /> : null}
        <span className="truncate">{label}</span>
      </div>
      <p className={cn("mt-1.5 text-sm font-medium leading-snug", valueClass)}>{value}</p>
    </div>
  );
}

export function ControlCenterBreadcrumb({ displayName }: { displayName?: string }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-tc-muted">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link href="/admin/analysts/directory" className="hover:text-violet-300">
            Directory
          </Link>
        </li>
        <li aria-hidden className="text-white/30">
          /
        </li>
        <li className="font-medium text-white/85">
          {displayName ? displayName : "Control Center"}
        </li>
      </ol>
    </nav>
  );
}
