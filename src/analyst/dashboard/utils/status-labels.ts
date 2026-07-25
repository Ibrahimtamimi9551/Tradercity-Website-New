import type { AnalystLifecycleStatus, AnalystTier } from "@/types/analysts/directory";
import type { AnalystCommissionStatus } from "@/types/analysts/commissions";
import type { AnalystReferralStatus } from "@/types/analysts/referrals";

/** Presentation labels — mirrors Management vocabulary; no state transitions. */

export function lifecycleStatusLabel(status: AnalystLifecycleStatus): string {
  const map: Record<AnalystLifecycleStatus, string> = {
    under_review: "Under Review",
    verification: "Verification",
    partnership_discussion: "Partnership Discussion",
    onboarding: "Onboarding",
    active: "Active Partner",
    growing: "Growing Partner",
    suspended: "Suspended",
    closed: "Closed",
  };
  return map[status] ?? status;
}

export function tierLabel(tier: AnalystTier): string {
  const map: Record<AnalystTier, string> = {
    none: "—",
    partner: "Partner",
    growing: "Growing",
    top_partner: "Top Partner",
  };
  return map[tier] ?? tier;
}

export function referralStatusLabel(status: AnalystReferralStatus): string {
  return status === "enabled" ? "Enabled" : "Disabled";
}

export function commissionPayoutStatusLabel(
  status: AnalystCommissionStatus
): string {
  const map: Record<AnalystCommissionStatus, string> = {
    none: "No balance",
    ready: "Ready for payout",
    overdue: "Due amount outstanding",
    paid: "Paid up",
  };
  return map[status] ?? status;
}
