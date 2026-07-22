"use client";

import {
  BookOpen,
  Coins,
  FileText,
  MessageCircle,
  Users,
  Activity,
} from "lucide-react";
import { StatusBadge, SystemHealthBadge, WidgetCard } from "@/components/admin/ui";
import { modulePanelSurface } from "@/lib/admin/module-surfaces";
import {
  activityStatusPresentation,
  analystStatusBadge,
  analystTierLabel,
  formatPartneredDate,
  formatReach,
} from "@/lib/analysts/format-control-center";
import type { AnalystControlCenter } from "@/types/analysts/control-center";
import { cn } from "@/lib/admin/cn";

type ControlCenterOverviewProps = {
  profile: AnalystControlCenter;
};

export function ControlCenterOverview({ profile }: ControlCenterOverviewProps) {
  const status = analystStatusBadge(profile.status);
  const activity = activityStatusPresentation(profile.activityStatus);

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="grid gap-4 lg:grid-cols-2">
        <section className={modulePanelSurface("purple", "space-y-4")}>
          <h2 className="text-sm font-medium text-white sm:text-base">Partnership Summary</h2>
          <dl className="space-y-2.5 text-sm">
            <SummaryRow label="Status">
              <StatusBadge label={status.label} tone={status.tone} />
            </SummaryRow>
            <SummaryRow label="Tier">
              <span className="text-white/90">{analystTierLabel(profile.tier)}</span>
            </SummaryRow>
            <SummaryRow label="Specialization">
              <span className="text-right text-white/90">{profile.specialization}</span>
            </SummaryRow>
            <SummaryRow label="Partner Since">
              <span className="text-white/90">{formatPartneredDate(profile.partneredAt)}</span>
            </SummaryRow>
            <SummaryRow label="Reach">
              <span className="tabular-nums text-white/90">
                {formatReach(profile.reachFollowers)}
              </span>
            </SummaryRow>
            <SummaryRow label="Health">
              <SystemHealthBadge state={profile.systemHealth} />
            </SummaryRow>
            <SummaryRow label="Activity Status">
              <StatusBadge label={activity.label} tone={activity.tone} />
            </SummaryRow>
          </dl>
        </section>

        <section className={modulePanelSurface("emerald", "space-y-4")}>
          <h2 className="text-sm font-medium text-white sm:text-base">Operational Summary</h2>
          <p className="text-sm leading-relaxed text-white/85">{profile.operationalSummary}</p>
          <p className="text-xs text-tc-muted">
            Mock operational narrative — will be synthesized from Discord, publishing, and
            commission modules.
          </p>
        </section>
      </div>

      <section className={modulePanelSurface("navy", "space-y-4")}>
        <h2 className="text-sm font-medium text-white sm:text-base">Lifecycle</h2>
        <ol className="flex flex-col gap-0 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-1 sm:gap-y-2">
          {profile.lifecycleStages.map((stage, index) => (
            <li key={stage.id} className="flex items-center gap-1 sm:gap-1.5">
              <span
                className={cn(
                  "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium",
                  stage.state === "complete" &&
                    "border-emerald-400/30 bg-emerald-500/15 text-emerald-200",
                  stage.state === "current" &&
                    "border-violet-400/45 bg-violet-500/25 text-violet-100 ring-1 ring-violet-400/30",
                  stage.state === "upcoming" &&
                    "border-white/10 bg-black/20 text-tc-muted"
                )}
              >
                {stage.label}
              </span>
              {index < profile.lifecycleStages.length - 1 ? (
                <span className="hidden text-tc-muted sm:inline" aria-hidden>
                  →
                </span>
              ) : null}
              {index < profile.lifecycleStages.length - 1 ? (
                <span className="mx-3 h-3 w-px bg-white/10 sm:hidden" aria-hidden />
              ) : null}
            </li>
          ))}
        </ol>
      </section>

      <div>
        <h2 className="mb-3 text-sm font-medium text-white sm:text-base">Quick Statistics</h2>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          <WidgetCard
            label="Reports Published"
            value={profile.stats.reportsPublished}
            icon={FileText}
            accent="purple"
            priority="informational"
          />
          <WidgetCard
            label="Lessons"
            value={profile.stats.lessons}
            icon={BookOpen}
            accent="blue"
            priority="informational"
          />
          <WidgetCard
            label="Community Size"
            value={formatReach(profile.stats.communitySize)}
            icon={Users}
            accent="teal"
            priority="informational"
          />
          <WidgetCard
            label="Commission Earned"
            value={profile.stats.commissionEarned}
            icon={Coins}
            accent="gold"
            priority="informational"
          />
          <WidgetCard
            label="Member Referrals"
            value={profile.stats.memberReferrals}
            icon={MessageCircle}
            accent="green"
            priority="informational"
          />
          <WidgetCard
            label="Recent Activity"
            value={profile.stats.recentActivityLabel}
            icon={Activity}
            accent="amber"
            priority="informational"
          />
        </div>
      </div>
    </div>
  );
}

function SummaryRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-tc-muted">{label}</dt>
      <dd className="min-w-0">{children}</dd>
    </div>
  );
}
