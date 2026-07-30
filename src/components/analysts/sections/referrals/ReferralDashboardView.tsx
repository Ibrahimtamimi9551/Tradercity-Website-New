"use client";

import {
  Ban,
  Coins,
  Crown,
  Link2,
  UserCheck,
  Users,
} from "lucide-react";
import { WidgetCard } from "@/components/admin/ui";
import { modulePanelSurface } from "@/lib/admin/module-surfaces";
import { formatCommissionUsd } from "@/lib/analysts/format-commissions";
import {
  computeAnalystCommissionStats,
  listMockAnalystCommissions,
} from "@/lib/analysts/mock/commissions";
import type { AnalystReferralDashboardStats } from "@/types/analysts/referrals";

type ReferralDashboardViewProps = {
  stats: AnalystReferralDashboardStats;
  onOpenFocus: (focus: { status: "enabled" | "disabled" }) => void;
};

export function ReferralDashboardView({
  stats,
  onOpenFocus,
}: ReferralDashboardViewProps) {
  const commissionStats = computeAnalystCommissionStats(
    listMockAnalystCommissions()
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-2 gap-2 md:gap-3 lg:gap-4 xl:grid-cols-3">
        <WidgetCard
          label="Total Analysts"
          value={stats.totalAnalysts}
          hint="Referral identities (active roster)"
          icon={Users}
          accent="blue"
          priority="informational"
          compactMobile
          href="/admin/analysts/referrals?view=directory"
          linkText="Open directory"
        />
        <WidgetCard
          label="Referral Enabled"
          value={stats.referralEnabled}
          hint="Operational referral codes"
          icon={UserCheck}
          accent="green"
          priority="informational"
          compactMobile
          href="/admin/analysts/referrals?view=directory&status=enabled"
          linkText="View enabled"
        />
        <WidgetCard
          label="Referral Disabled"
          value={stats.referralDisabled}
          hint="Paused or not yet activated"
          icon={Ban}
          accent="amber"
          priority={stats.referralDisabled > 0 ? "important" : "informational"}
          compactMobile
          href="/admin/analysts/referrals?view=directory&status=disabled"
          linkText="View disabled"
        />
        <WidgetCard
          label="Total Referrals Generated"
          value={stats.totalReferralsGenerated}
          hint="All attributed registrations"
          icon={Link2}
          accent="purple"
          priority="informational"
          compactMobile
          href="/admin/analysts/referrals?view=directory"
          linkText="Open directory"
        />
        <WidgetCard
          label="Successful Referrals"
          value={stats.successfulReferrals}
          hint="Converted memberships"
          icon={Crown}
          accent="gold"
          priority="informational"
          compactMobile
          href="/admin/analysts/referrals?view=performance"
          linkText="Open performance"
        />
        <WidgetCard
          label="VIP Conversions"
          value={stats.vipConversions}
          hint="Active VIP members attributed"
          icon={Crown}
          accent="teal"
          priority="informational"
          compactMobile
          href="/admin/analysts/referrals?view=performance"
          linkText="Open performance"
        />
        <WidgetCard
          label="Ready for Payment"
          value={formatCommissionUsd(commissionStats.totalAmountToPayUsd)}
          hint={stats.pendingCommissionLabel}
          icon={Coins}
          accent="rose"
          priority="informational"
          compactMobile
          href="/admin/analysts/commissions?view=directory&status=ready"
          linkText="Open Commission"
        />
      </div>

      <section className={modulePanelSurface("purple", "space-y-4")}>
        <div>
          <h2 className="text-sm font-medium text-white sm:text-base">
            Referral operations
          </h2>
          <p className="mt-1 text-sm text-white/75">
            Operationally Ready analysts receive a referral identity. Manage
            Enabled / Disabled status from Directory. Financial settlement lives
            in the Commission domain.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onOpenFocus({ status: "enabled" })}
            className="rounded-lg border border-emerald-400/30 bg-emerald-500/10 px-3.5 py-2 text-sm font-medium text-emerald-100 hover:bg-emerald-500/20"
          >
            Enabled referrals
          </button>
          <button
            type="button"
            onClick={() => onOpenFocus({ status: "disabled" })}
            className="rounded-lg border border-amber-400/30 bg-amber-500/10 px-3.5 py-2 text-sm font-medium text-amber-100 hover:bg-amber-500/20"
          >
            Disabled referrals
          </button>
        </div>
      </section>
    </div>
  );
}
