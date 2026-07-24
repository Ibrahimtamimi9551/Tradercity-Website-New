"use client";

import {
  BookOpen,
  Clock,
  Coins,
  FileText,
  LineChart,
  MessageSquare,
  StickyNote,
  UserPlus,
  Users,
  Activity,
  type LucideIcon,
} from "lucide-react";
import { StatusBadge, SystemHealthBadge, WidgetCard } from "@/components/admin/ui";
import { modulePanelSurface, type ModulePanelTone } from "@/lib/admin/module-surfaces";
import {
  activityStatusPresentation,
  analystStatusBadge,
  analystTierLabel,
  formatControlCenterDateTime,
  formatPartneredDate,
  formatReach,
} from "@/lib/analysts/format-control-center";
import {
  analystDiscordRoleLabel,
  analystDiscordStatusPresentation,
  formatAnalystDiscordDate,
} from "@/lib/analysts/format-discord";
import {
  analystCommissionStatusPresentation,
  formatCommissionUsd,
} from "@/lib/analysts/format-commissions";
import { analystReferralStatusPresentation } from "@/lib/analysts/format-referrals";
import { getMockAnalystCommissionByAnalystId } from "@/lib/analysts/mock/commissions";
import { getMockAnalystDiscordByAnalystId } from "@/lib/analysts/mock/discord";
import { getMockAnalystReferralByAnalystId } from "@/lib/analysts/mock/referrals";
import type {
  AnalystControlCenter,
  AnalystControlCenterTabId,
  AnalystLifecycleStage,
} from "@/types/analysts/control-center";
import { cn } from "@/lib/admin/cn";

type ControlCenterOverviewProps = {
  profile: AnalystControlCenter;
  onOpenTab: (tab: AnalystControlCenterTabId) => void;
};

/**
 * Overview = command center for the partnership.
 * Surfaces module summary cards; detailed management stays in dedicated tabs.
 * Administration remains separate (critical actions, not daily ops).
 */
export function ControlCenterOverview({
  profile,
  onOpenTab,
}: ControlCenterOverviewProps) {
  const status = analystStatusBadge(profile.status);
  const activity = activityStatusPresentation(profile.activityStatus);
  const discord = getMockAnalystDiscordByAnalystId(profile.id);
  const discordStatus = discord
    ? analystDiscordStatusPresentation(discord.status)
    : { label: profile.discord.roleStatus, tone: "neutral" as const };
  const referral = getMockAnalystReferralByAnalystId(profile.id);
  const commission = getMockAnalystCommissionByAnalystId(profile.id);
  const latestNote = profile.notes[0] ?? null;

  return (
    <div className="space-y-4 md:space-y-5 lg:space-y-6">
      {/* Primary ops + compact lifecycle side rail */}
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(11rem,13.5rem)] lg:items-start">
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <section className={modulePanelSurface("purple", "space-y-3 p-3.5 md:p-4 lg:p-5")}>
              <h2 className="text-sm font-medium text-white md:text-[15px] lg:text-base">
                Partnership Summary
              </h2>
              <dl className="space-y-2 text-sm">
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

            <section className={modulePanelSurface("emerald", "space-y-3 p-3.5 md:p-4 lg:p-5")}>
              <h2 className="text-sm font-medium text-white md:text-[15px] lg:text-base">
                Operational Summary
              </h2>
              <p className="text-sm leading-relaxed text-white/85">
                {profile.operationalSummary}
              </p>
              <p className="text-xs text-tc-muted">
                Synthesized from Discord, publishing, and commission signals as modules mature.
              </p>
            </section>
          </div>

          {/* Module command cards */}
          <div>
            <h2 className="mb-3 text-sm font-medium text-white md:text-[15px] lg:text-base">
              Module Overview
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              <ModuleSummaryCard
                tone="purple"
                icon={MessageSquare}
                title="Discord"
                onOpen={() => onOpenTab("discord")}
              >
                <MetricRow label="Status">
                  <StatusBadge label={discordStatus.label} tone={discordStatus.tone} />
                </MetricRow>
                <MetricRow label="Role">
                  {discord
                    ? analystDiscordRoleLabel(discord.assignedRole)
                    : profile.discord.currentRole}
                </MetricRow>
                <MetricRow label="Last Sync">
                  {discord
                    ? formatAnalystDiscordDate(discord.lastSyncAt)
                    : formatControlCenterDateTime(profile.discord.lastSync)}
                </MetricRow>
              </ModuleSummaryCard>

              <ModuleSummaryCard
                tone="purple"
                icon={UserPlus}
                title="Referral"
                onOpen={() => onOpenTab("referrals")}
              >
                <MetricRow label="Total Referrals">
                  <span className="tabular-nums">
                    {referral?.totalReferrals ?? profile.stats.memberReferrals}
                  </span>
                </MetricRow>
                <MetricRow label="Successful">
                  <span className="tabular-nums">
                    {referral?.successfulReferrals ?? "—"}
                  </span>
                </MetricRow>
                <MetricRow label="Status">
                  {referral ? (
                    <StatusBadge
                      label={
                        analystReferralStatusPresentation(referral.status).label
                      }
                      tone={
                        analystReferralStatusPresentation(referral.status).tone
                      }
                    />
                  ) : (
                    "—"
                  )}
                </MetricRow>
              </ModuleSummaryCard>

              <ModuleSummaryCard
                tone="emerald"
                icon={LineChart}
                title="Performance"
                onOpen={() => onOpenTab("performance")}
              >
                <MetricRow label="Reports">{profile.stats.reportsPublished}</MetricRow>
                <MetricRow label="Lessons">{profile.stats.lessons}</MetricRow>
                <MetricRow label="Activity">{profile.stats.recentActivityLabel}</MetricRow>
              </ModuleSummaryCard>

              <ModuleSummaryCard
                tone="navy"
                icon={Clock}
                title="Timeline"
                onOpen={() => onOpenTab("timeline")}
              >
                <MetricRow label="Partner Since">
                  {formatPartneredDate(profile.partneredAt)}
                </MetricRow>
                <MetricRow label="Lifecycle">
                  {profile.lifecycleStages.find((s) => s.state === "current")?.label ?? "—"}
                </MetricRow>
                <p className="text-xs text-tc-muted">Full event history opens in Timeline.</p>
              </ModuleSummaryCard>

              <ModuleSummaryCard
                tone="gold"
                icon={StickyNote}
                title="Notes"
                onOpen={() => onOpenTab("notes")}
              >
                <MetricRow label="Notes">{profile.notes.length}</MetricRow>
                {latestNote ? (
                  <p className="line-clamp-2 text-xs leading-relaxed text-white/80">
                    {latestNote.body}
                  </p>
                ) : (
                  <p className="text-xs text-tc-muted">No notes yet.</p>
                )}
              </ModuleSummaryCard>

              <ModuleSummaryCard
                tone="gold"
                icon={Coins}
                title="Commission"
                onOpen={() => onOpenTab("commissions")}
              >
                <MetricRow label="Total Earned">
                  {commission
                    ? formatCommissionUsd(commission.summary.totalEarnedUsd)
                    : profile.stats.commissionEarned}
                </MetricRow>
                <MetricRow label="Amount Payable">
                  {commission
                    ? formatCommissionUsd(commission.summary.totalPayableUsd)
                    : "—"}
                </MetricRow>
                <MetricRow label="Status">
                  {commission ? (
                    <StatusBadge
                      label={
                        analystCommissionStatusPresentation(
                          commission.commissionStatus
                        ).label
                      }
                      tone={
                        analystCommissionStatusPresentation(
                          commission.commissionStatus
                        ).tone
                      }
                    />
                  ) : (
                    "—"
                  )}
                </MetricRow>
              </ModuleSummaryCard>
            </div>
          </div>
        </div>

        {/* Compact lifecycle — side rail on desktop, inline compact on mobile */}
        <LifecycleSideCard stages={profile.lifecycleStages} />
      </div>

      <div>
        <h2 className="mb-3 text-sm font-medium text-white md:text-[15px] lg:text-base">
          Quick Statistics
        </h2>
        <div className="grid grid-cols-2 gap-2 md:gap-3 lg:gap-4 xl:grid-cols-3">
          <WidgetCard
            label="Reports Published"
            value={profile.stats.reportsPublished}
            icon={FileText}
            accent="purple"
            priority="informational"
            compactMobile
          />
          <WidgetCard
            label="Lessons"
            value={profile.stats.lessons}
            icon={BookOpen}
            accent="blue"
            priority="informational"
            compactMobile
          />
          <WidgetCard
            label="Community Size"
            value={formatReach(profile.stats.communitySize)}
            icon={Users}
            accent="teal"
            priority="informational"
            compactMobile
          />
          <WidgetCard
            label="Commission Earned"
            value={
              commission
                ? formatCommissionUsd(commission.summary.totalEarnedUsd)
                : profile.stats.commissionEarned
            }
            icon={Coins}
            accent="gold"
            priority="informational"
            compactMobile
          />
          <WidgetCard
            label="Member Referrals"
            value={profile.stats.memberReferrals}
            icon={MessageSquare}
            accent="green"
            priority="informational"
            compactMobile
          />
          <WidgetCard
            label="Recent Activity"
            value={profile.stats.recentActivityLabel}
            icon={Activity}
            accent="amber"
            priority="informational"
            compactMobile
          />
        </div>
      </div>
    </div>
  );
}

function LifecycleSideCard({ stages }: { stages: AnalystLifecycleStage[] }) {
  return (
    <section
      className={cn(
        modulePanelSurface("navy", "p-3 md:p-3.5 lg:p-4"),
        "lg:sticky lg:top-4"
      )}
      aria-labelledby="lifecycle-side-heading"
    >
      <h2
        id="lifecycle-side-heading"
        className="text-xs font-medium uppercase tracking-wide text-blue-200/80"
      >
        Lifecycle
      </h2>
      <ol className="mt-3 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:flex-col lg:gap-0 lg:overflow-visible lg:pb-0">
        {stages.map((stage, index) => (
          <li key={stage.id} className="flex shrink-0 items-stretch gap-2 lg:shrink lg:gap-0">
            <div className="hidden flex-col items-center lg:flex">
              <span
                className={cn(
                  "mt-1 h-2 w-2 rounded-full",
                  stage.state === "complete" && "bg-emerald-400",
                  stage.state === "current" && "bg-violet-400 ring-2 ring-violet-400/35",
                  stage.state === "upcoming" && "bg-white/20"
                )}
                aria-hidden
              />
              {index < stages.length - 1 ? (
                <span
                  className={cn(
                    "my-1 w-px flex-1 min-h-[0.75rem]",
                    stage.state === "complete" ? "bg-emerald-400/40" : "bg-white/10"
                  )}
                  aria-hidden
                />
              ) : null}
            </div>
            <span
              className={cn(
                "inline-flex items-center rounded-md border px-2 py-1 text-[11px] font-medium lg:mb-1.5 lg:w-full lg:px-2.5 lg:py-1.5 lg:text-xs",
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
          </li>
        ))}
      </ol>
    </section>
  );
}

function ModuleSummaryCard({
  tone,
  icon: Icon,
  title,
  badge,
  onOpen,
  children,
}: {
  tone: ModulePanelTone;
  icon: LucideIcon;
  title: string;
  badge?: string;
  onOpen: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        modulePanelSurface(tone, "space-y-2.5 p-3.5 text-left transition-[filter] md:p-4"),
        "hover:brightness-[1.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/40"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-black/25 text-white/85">
            <Icon className="h-3.5 w-3.5" aria-hidden />
          </div>
          <h3 className="text-sm font-medium text-white">{title}</h3>
        </div>
        {badge ? (
          <span className="rounded border border-white/10 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-tc-muted">
            {badge}
          </span>
        ) : (
          <span className="text-xs text-violet-300/90">Open →</span>
        )}
      </div>
      <div className="space-y-1.5 text-sm">{children}</div>
    </button>
  );
}

function MetricRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-2 text-xs md:text-sm">
      <span className="text-tc-muted">{label}</span>
      <span className="min-w-0 truncate text-right text-white/90">{children}</span>
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
