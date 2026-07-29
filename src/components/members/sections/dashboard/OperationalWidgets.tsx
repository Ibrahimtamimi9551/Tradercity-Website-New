"use client";

import { Users, Clock, UserPlus, Crown, User, Mail } from "lucide-react";
import { AdminStatGrid } from "@/components/admin/directory";
import { WidgetCard } from "@/components/admin/ui";
import { DiscordIcon } from "@/components/admin/ui/icons/DiscordIcon";

export function OperationalWidgets() {
  return (
    <AdminStatGrid mobileCols={2} mdCols={2} xlCols={4}>
      <WidgetCard
        label="Total Members"
        value="1,248"
        hint="All registered users"
        icon={Users}
        accent="purple"
        priority="informational"
        compactMobile
        trend={{ value: 18.4, label: "vs 25 May - 31 May", direction: "up" }}
        href="/admin/members"
        linkText="View all members"
      />

      <WidgetCard
        label="Approval Pending"
        value="3"
        hint="Verified — final admin approval"
        icon={Clock}
        accent="amber"
        priority="critical"
        compactMobile
        trend={{ value: 14.3, label: "vs 25 May - 31 May", direction: "down" }}
        href="/admin/subscriptions?status=approval_pending"
        linkText="Review now"
      />

      <WidgetCard
        label="Discord Issues"
        value="7"
        hint="Require attention"
        icon={DiscordIcon}
        accent="rose"
        priority="critical"
        compactMobile
        trend={{ value: 12.5, label: "vs 25 May - 31 May", direction: "down" }}
        href="/admin/discord?sync=failed"
        linkText="Review now"
      />

      <WidgetCard
        label="Referral Redeem Requests"
        value="12"
        hint="Waiting admin approval"
        icon={UserPlus}
        accent="purple"
        priority="important"
        compactMobile
        trend={{ value: 20.0, label: "vs 25 May - 31 May", direction: "up" }}
        href="/admin/subscriptions?source=referral_redeem"
        linkText="Review now"
      />

      <WidgetCard
        label="VIP Members"
        value="812"
        hint="Active VIP members"
        icon={Crown}
        accent="gold"
        priority="informational"
        compactMobile
        trend={{ value: 22.7, label: "vs 25 May - 31 May", direction: "up" }}
        href="/admin/members?membership=vip"
        linkText="View VIP members"
      />
      <WidgetCard
        label="Free Members"
        value="436"
        hint="Active free members"
        icon={User}
        accent="green"
        priority="informational"
        compactMobile
        trend={{ value: 9.2, label: "vs 25 May - 31 May", direction: "up" }}
        href="/admin/members?membership=free"
        linkText="View free members"
      />
      <WidgetCard
        label="Total Registrations (Email)"
        value="1,785"
        hint="Users registered via email"
        icon={Mail}
        accent="blue"
        priority="informational"
        compactMobile
        trend={{ value: 22.7, label: "vs 25 May - 31 May", direction: "up" }}
        href="/admin/members?source=email"
        linkText="View details"
      />
      <WidgetCard
        label="Total Registrations (Discord)"
        value="962"
        hint="Users registered via Discord"
        icon={DiscordIcon}
        accent="teal"
        priority="informational"
        compactMobile
        trend={{ value: 15.3, label: "vs 25 May - 31 May", direction: "up" }}
        href="/admin/members?source=discord"
        linkText="View details"
      />
    </AdminStatGrid>
  );
}
