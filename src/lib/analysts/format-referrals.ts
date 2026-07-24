import type {
  AnalystReferralMembershipPlan,
  AnalystReferralPartnershipStatus,
  AnalystReferralPlanBreakdown,
  AnalystReferralRecord,
  AnalystReferralStatusPresentation,
} from "@/types/analysts/referrals";

export function emptyPlanBreakdown(): AnalystReferralPlanBreakdown {
  return { monthly: 0, quarterly: 0, yearly: 0, lifetime: 0 };
}

export function sumPlanBreakdown(breakdown: AnalystReferralPlanBreakdown): number {
  return (
    breakdown.monthly +
    breakdown.quarterly +
    breakdown.yearly +
    breakdown.lifetime
  );
}

export function analystReferralStatusPresentation(
  status: AnalystReferralRecord["status"]
): AnalystReferralStatusPresentation {
  if (status === "enabled") {
    return { label: "Enabled", tone: "success" };
  }
  return { label: "Disabled", tone: "neutral" };
}

export function analystReferralPartnershipLabel(
  status: AnalystReferralPartnershipStatus
): string {
  const map: Record<AnalystReferralPartnershipStatus, string> = {
    active: "Active",
    onboarding: "Onboarding",
    suspended: "Suspended",
    expired: "Expired",
    closed: "Closed",
  };
  return map[status];
}

export function analystReferralPlanLabel(
  plan: AnalystReferralMembershipPlan
): string {
  const map: Record<AnalystReferralMembershipPlan, string> = {
    monthly: "Monthly Plan",
    quarterly: "Quarterly Plan",
    yearly: "Yearly Plan",
    lifetime: "Lifetime Plan",
  };
  return map[plan];
}

/** Compact link for table cells — not the full URL. */
export function formatShortReferralLink(token: string): string {
  return `tradercity.co/r/${token}`;
}

export function formatAnalystReferralDate(value: string | null): string {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  const day = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const time = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
  return `${day} · ${time}`;
}

export function formatAnalystReferralDateShort(value: string | null): string {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
