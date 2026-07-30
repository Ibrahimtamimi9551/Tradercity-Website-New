"use client";

import {
  AlertTriangle,
  Link2Off,
  Mail,
  ShieldAlert,
  UserPlus,
  Users,
} from "lucide-react";
import { WidgetCard } from "@/components/admin/ui";
import { modulePanelSurface } from "@/lib/admin/module-surfaces";
import type { AnalystDiscordDashboardStats } from "@/types/analysts/discord";

type DiscordDashboardViewProps = {
  stats: AnalystDiscordDashboardStats;
  onOpenFocus: (
    focus:
      | { status: "pending" | "invited" | "disconnected" | "connected" | "role_assigned" }
      | { sync: "error" }
      | { special: "role_issues" }
  ) => void;
};

export function DiscordDashboardView({
  stats,
  onOpenFocus,
}: DiscordDashboardViewProps) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-2 gap-2 md:gap-3 lg:gap-4 xl:grid-cols-3">
        <WidgetCard
          label="Connected Analysts"
          value={stats.connectedCount}
          hint="Connected · Verified · Role Assigned"
          icon={Users}
          accent="green"
          priority="informational"
          compactMobile
          href="/admin/analysts/discord?view=directory&status=role_assigned"
          linkText="Open directory"
        />
        <WidgetCard
          label="Pending Connections"
          value={stats.pendingConnectionsCount}
          hint="Awaiting invite / connect"
          icon={UserPlus}
          accent="blue"
          priority={stats.pendingConnectionsCount > 0 ? "important" : "informational"}
          compactMobile
          href="/admin/analysts/discord?view=directory&status=pending"
          linkText="Open directory"
        />
        <WidgetCard
          label="Pending Invitations"
          value={stats.pendingInvitationsCount}
          hint="Invite sent · not joined"
          icon={Mail}
          accent="purple"
          priority="informational"
          compactMobile
          href="/admin/analysts/discord?view=directory&status=invited"
          linkText="Open directory"
        />
        <WidgetCard
          label="Sync Errors"
          value={stats.syncErrorsCount}
          hint="Require attention"
          icon={AlertTriangle}
          accent="amber"
          priority={stats.syncErrorsCount > 0 ? "critical" : "informational"}
          compactMobile
          href="/admin/analysts/discord?view=directory&sync=error"
          linkText="View errors"
        />
        <WidgetCard
          label="Disconnected Analysts"
          value={stats.disconnectedCount}
          hint="Reconnect or review"
          icon={Link2Off}
          accent="rose"
          priority={stats.disconnectedCount > 0 ? "important" : "informational"}
          compactMobile
          href="/admin/analysts/discord?view=directory&status=disconnected"
          linkText="Open directory"
        />
        <WidgetCard
          label="Role Assignment Issues"
          value={stats.roleAssignmentIssuesCount}
          hint="Connected without Analyst role"
          icon={ShieldAlert}
          accent="gold"
          priority={
            stats.roleAssignmentIssuesCount > 0 ? "critical" : "informational"
          }
          compactMobile
          href="/admin/analysts/discord?view=directory&focus=role_issues"
          linkText="View issues"
        />
      </div>

      <section className={modulePanelSurface("purple", "space-y-4")}>
        <div>
          <h2 className="text-sm font-medium text-white sm:text-base">
            Discord operations pipeline
          </h2>
          <p className="mt-1 text-sm text-white/75">
            Approved applications create Discord records automatically. Manage invite →
            connect → role assignment from Directory and Operations — shared Discord
            infrastructure, Analyst role (not VIP).
          </p>
          <p className="mt-2 text-xs text-tc-muted">
            Last sync across partners: {stats.lastSyncLabel}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onOpenFocus({ status: "pending" })}
            className="rounded-lg border border-violet-400/30 bg-violet-500/10 px-3.5 py-2 text-sm font-medium text-violet-200 hover:bg-violet-500/20"
          >
            Pending connections
          </button>
          <button
            type="button"
            onClick={() => onOpenFocus({ sync: "error" })}
            className="rounded-lg border border-amber-400/30 bg-amber-500/10 px-3.5 py-2 text-sm font-medium text-amber-100 hover:bg-amber-500/20"
          >
            Sync errors
          </button>
          <button
            type="button"
            onClick={() => onOpenFocus({ special: "role_issues" })}
            className="rounded-lg border border-white/15 bg-white/5 px-3.5 py-2 text-sm font-medium text-white/80 hover:bg-white/10"
          >
            Role issues
          </button>
        </div>
      </section>
    </div>
  );
}
