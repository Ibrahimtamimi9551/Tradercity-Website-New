"use client";

import { Users, Clock, Wallet, BadgeDollarSign, TrendingUp } from "lucide-react";
import { AdminStatGrid } from "@/components/admin/directory";
import { WidgetCard } from "@/components/admin/ui";
import type { ReferralStats } from "@/types/members/referral";

type ReferralWidgetsProps = {
  stats: ReferralStats;
};

function formatUsd(amount: number) {
  return `$${amount.toLocaleString()}`;
}

export function ReferralWidgets({ stats }: ReferralWidgetsProps) {
  return (
    <AdminStatGrid mobileCols={2} mdCols={3} xlCols={5}>
      <WidgetCard
        label="Successful Referrals"
        value={stats.successfulReferrals.toLocaleString()}
        hint="Completed VIP referrals"
        icon={Users}
        accent="purple"
        priority="informational"
        compactMobile
        href="/admin/referrals?progress=completed"
        linkText="View all"
        trend={{
          value: stats.successfulTrend,
          label: "vs last month",
          direction: "up",
        }}
      />
      <WidgetCard
        label="Pending Referrals"
        value={stats.pendingReferrals.toLocaleString()}
        hint="Awaiting completion"
        icon={Clock}
        accent="amber"
        priority="important"
        compactMobile
        href="/admin/referrals?status=pending"
        linkText="View pending"
        trend={{
          value: stats.pendingTrend,
          label: "vs last month",
          direction: "up",
        }}
      />
      <WidgetCard
        label="Available Credits"
        value={formatUsd(stats.availableCredits)}
        hint="Total available"
        icon={Wallet}
        accent="green"
        priority="informational"
        compactMobile
        href="/admin/referrals?credit=has_credit"
        linkText="View wallets"
      />
      <WidgetCard
        label="Credits Redeemed"
        value={formatUsd(stats.creditsRedeemed)}
        hint="Total redeemed"
        icon={BadgeDollarSign}
        accent="blue"
        priority="informational"
        compactMobile
        href="/admin/referrals"
        linkText="View all"
      />
      <WidgetCard
        label="Total Referral Revenue"
        value={formatUsd(stats.totalReferralRevenue)}
        hint="Open Intelligence for full analytics"
        icon={TrendingUp}
        accent="rose"
        priority="informational"
        compactMobile
        href="/admin/referrals/intelligence"
        linkText="Open Intelligence"
        trend={{
          value: stats.revenueTrend,
          label: "vs last month",
          direction: "up",
        }}
        className="col-span-2 md:col-span-1 xl:col-span-1"
      />
    </AdminStatGrid>
  );
}
