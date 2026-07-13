"use client";

import { Users, Clock, UserPlus, Crown, User, Mail } from "lucide-react";
import { WidgetCard } from "@/components/admin/ui";
import { DiscordIcon } from "@/components/admin/ui/icons/DiscordIcon";

export function OperationalWidgets() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {/* Informational */}
      <WidgetCard
        label="Total Members"
        value="1,248"
        hint="All registered users"
        icon={Users}
        accent="purple"
        priority="informational"
        trend={{ value: 18.4, label: "vs 25 May - 31 May", direction: "up" }}
        href="/admin/members"
        linkText="View all members"
      />

      {/* Critical — amber */}
      <WidgetCard
        label="Pending Verification"
        value="24"
        hint="Subscription payments"
        icon={Clock}
        accent="amber"
        priority="critical"
        trend={{ value: 14.3, label: "vs 25 May - 31 May", direction: "down" }}
        href="/admin/subscriptions?status=pending_verification"
        linkText="Review now"
      />

      {/* Critical — red */}
      <WidgetCard
        label="Discord Issues"
        value="7"
        hint="Require attention"
        icon={DiscordIcon}
        accent="rose"
        priority="critical"
        trend={{ value: 12.5, label: "vs 25 May - 31 May", direction: "down" }}
        href="/admin/discord?sync=failed"
        linkText="Review now"
      />

      {/* Important — purple */}
      <WidgetCard
        label="Referral Requests"
        value="12"
        hint="Pending approval"
        icon={UserPlus}
        accent="purple"
        priority="important"
        trend={{ value: 20.0, label: "vs 25 May - 31 May", direction: "up" }}
        href="/admin/referrals?status=pending"
        linkText="Review now"
      />

      {/* Informational row */}
      <WidgetCard
        label="VIP Members"
        value="812"
        hint="Active VIP members"
        icon={Crown}
        accent="gold"
        priority="informational"
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
        trend={{ value: 15.3, label: "vs 25 May - 31 May", direction: "up" }}
        href="/admin/members?source=discord"
        linkText="View details"
      />
    </div>
  );
}
