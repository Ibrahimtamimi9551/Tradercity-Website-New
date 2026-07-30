"use client";

import { Share2, Users } from "lucide-react";
import { useAnalystDashboardContext } from "@/analyst/dashboard/context/useAnalystDashboardContext";
import { ModulePanel } from "@/analyst/dashboard/surfaces/ModulePanel";
import { ModuleSkeleton } from "@/analyst/dashboard/ui/Skeleton";
import { analystTheme } from "@/analyst/dashboard/theme/analyst-theme";

const plans = [
  {
    key: "monthly" as const,
    label: "Monthly Memberships",
    color: analystTheme.planMonthly,
    soft: "rgba(96,165,250,0.12)",
    border: "rgba(96,165,250,0.28)",
  },
  {
    key: "quarterly" as const,
    label: "Quarterly Memberships",
    color: analystTheme.planQuarterly,
    soft: "rgba(167,139,250,0.12)",
    border: "rgba(167,139,250,0.28)",
  },
  {
    key: "yearly" as const,
    label: "Yearly Memberships",
    color: analystTheme.planYearly,
    soft: "rgba(245,215,110,0.12)",
    border: "rgba(245,215,110,0.28)",
  },
];

export function ReferralSummaryModule() {
  const { display, isLoading } = useAnalystDashboardContext();

  if (isLoading || !display) return <ModuleSkeleton rows={4} />;

  const { referralSummary } = display;
  const values = {
    monthly: referralSummary.monthlyMemberships,
    quarterly: referralSummary.quarterlyMemberships,
    yearly: referralSummary.yearlyMemberships,
  };

  return (
    <ModulePanel
      title="Referral Summary"
      icon={Share2}
      personality="referral"
      subtitle="Plan mix — member identities stay private"
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {plans.map((plan) => (
          <div
            key={plan.key}
            className="rounded-xl border p-4 transition-transform duration-200 hover:-translate-y-0.5"
            style={{ borderColor: plan.border, background: plan.soft }}
          >
            <p
              className="text-[10px] font-bold uppercase tracking-wider"
              style={{ color: plan.color }}
            >
              {plan.label}
            </p>
            <p className="mt-2 text-3xl font-bold text-white">
              {values[plan.key]}
            </p>
          </div>
        ))}

        <div
          className="rounded-xl border p-4"
          style={{
            borderColor: analystTheme.successBorder,
            background: analystTheme.successSoft,
          }}
        >
          <div className="mb-1 flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5" style={{ color: analystTheme.success }} />
            <p
              className="text-[10px] font-bold uppercase tracking-wider"
              style={{ color: analystTheme.success }}
            >
              Total Paid Members
            </p>
          </div>
          <p className="mt-2 text-3xl font-bold text-white">
            {referralSummary.totalPaidMembers}
          </p>
        </div>
      </div>
    </ModulePanel>
  );
}
