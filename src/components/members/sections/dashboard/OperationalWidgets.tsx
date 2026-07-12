"use client";

import { Users, Clock, UserPlus, Crown, User, Mail } from "lucide-react";
import { WidgetCard } from "@/components/admin/ui";
import { DiscordIcon } from "@/components/admin/ui/icons/DiscordIcon";

export function OperationalWidgets() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <WidgetCard
        label="Total Members"
        value="1,248"
        hint="All registered users"
        icon={Users}
        iconTone="purple"
        trend={{ value: 18.4, label: "vs 25 May - 31 May", direction: "up" }}
        href="/admin/members"
        linkText="View all members"
      />
      <WidgetCard
        label="Pending Verification"
        value="24"
        hint="Subscription payments"
        icon={Clock}
        iconTone="warning"
        tone="warning"
        trend={{ value: 14.3, label: "vs 25 May - 31 May", direction: "down" }}
        href="/admin/subscriptions?status=pending_verification"
        linkText="Review now"
      />
      <WidgetCard
        label="Discord Issues"
        value="7"
        hint="Require attention"
        icon={DiscordIcon}
        iconTone="danger"
        tone="danger"
        trend={{ value: 12.5, label: "vs 25 May - 31 May", direction: "down" }}
        href="/admin/discord?sync=failed"
        linkText="Review now"
      />
      <WidgetCard
        label="Referral Requests"
        value="12"
        hint="Pending approval"
        icon={UserPlus}
        iconTone="purple"
        tone="purple"
        trend={{ value: 20.0, label: "vs 25 May - 31 May", direction: "up" }}
        href="/admin/referrals?status=pending"
        linkText="Review now"
      />
      <WidgetCard
        label="VIP Members"
        value="812"
        hint="Active VIP members"
        icon={Crown}
        iconTone="purple"
        trend={{ value: 22.7, label: "vs 25 May - 31 May", direction: "up" }}
        href="/admin/members?membership=vip"
        linkText="View VIP members"
      />
      <WidgetCard
        label="Free Members"
        value="436"
        hint="Active free members"
        icon={User}
        iconTone="warning"
        trend={{ value: 9.2, label: "vs 25 May - 31 May", direction: "up" }}
        href="/admin/members?membership=free"
        linkText="View free members"
      />
      <WidgetCard
        label="Total Registrations (Email)"
        value="1,785"
        hint="Users registered via email"
        icon={Mail}
        iconTone="blue"
        trend={{ value: 22.7, label: "vs 25 May - 31 May", direction: "up" }}
        href="/admin/members?source=email"
        linkText="View details"
      />
      <WidgetCard
        label="Total Registrations (Discord)"
        value="962"
        hint="Users registered via Discord"
        icon={DiscordIcon}
        iconTone="success"
        trend={{ value: 15.3, label: "vs 25 May - 31 May", direction: "up" }}
        href="/admin/members?source=discord"
        linkText="View details"
      />
    </div>
  );
}
