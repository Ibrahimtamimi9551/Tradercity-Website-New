"use client";

import { Users, Crown, AlertTriangle, Mail } from "lucide-react";
import { AdminStatGrid } from "@/components/admin/directory";
import { WidgetCard } from "@/components/admin/ui";
import type { DiscordStats } from "@/types/members/discord";

type DiscordWidgetsProps = {
  stats: DiscordStats;
};

export function DiscordWidgets({ stats }: DiscordWidgetsProps) {
  return (
    <AdminStatGrid mobileCols={2} mdCols={2} xlCols={4}>
      <WidgetCard
        label="Connected Members"
        value={stats.connectedMembers.toLocaleString()}
        hint={`of ${stats.totalRegistered.toLocaleString()} registered`}
        icon={Users}
        accent="green"
        priority="informational"
        compactMobile
        href="/admin/discord?connection=connected"
        linkText="View all"
        trend={{
          value: stats.connectedTrend,
          label: "vs last month",
          direction: "up",
        }}
      />
      <WidgetCard
        label="VIP Members"
        value={stats.vipMembers.toLocaleString()}
        hint={`of ${stats.vipOfConnected.toLocaleString()} connected`}
        icon={Crown}
        accent="gold"
        priority="informational"
        compactMobile
        href="/admin/discord?role=vip"
        linkText="View all"
        trend={{
          value: stats.vipTrend,
          label: "vs last month",
          direction: "up",
        }}
      />
      <WidgetCard
        label="Sync Issues"
        value={stats.syncIssues.toLocaleString()}
        hint="Require attention"
        icon={AlertTriangle}
        accent="amber"
        priority="critical"
        compactMobile
        href="/admin/discord?sync=failed"
        linkText="View issues"
      />
      <WidgetCard
        label="Pending Invites"
        value={stats.pendingInvites.toLocaleString()}
        hint="Invites not accepted"
        icon={Mail}
        accent="blue"
        priority="informational"
        compactMobile
        href="/admin/discord?sync=pending"
        linkText="View invites"
      />
    </AdminStatGrid>
  );
}
