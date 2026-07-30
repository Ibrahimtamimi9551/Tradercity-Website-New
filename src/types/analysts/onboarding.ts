import type { StatusTone } from "@/types/admin/common";

/**
 * Admin System Provisioning (Applications → Onboarding).
 *
 * Verifies that TraderCity initialized every required operational module
 * after Approve. Not analyst education — that belongs to the future
 * Analyst Dashboard.
 */

export type ProvisioningItemStatus = "ready" | "pending" | "failed" | "future";

export type ProvisioningItemId =
  | "analyst_identity"
  | "directory_record"
  | "control_center"
  | "discord_record"
  | "discord_connected"
  | "discord_role_assigned"
  | "referral_record"
  | "commission_record"
  | "analyst_dashboard_profile"
  | "backend_provisioning";

export type ProvisioningItem = {
  id: ProvisioningItemId;
  label: string;
  status: ProvisioningItemStatus;
  /** Optional detail — e.g. Future, failure reason */
  note?: string;
  /** Domain that owns this check (for ops navigation). */
  domain:
    | "applications"
    | "directory"
    | "control_center"
    | "discord"
    | "referrals"
    | "commissions"
    | "analyst_dashboard"
    | "backend";
};

export type OperationalReadiness = "ready" | "provisioning_required" | "failed";

export type AnalystSystemProvisioning = {
  applicationId: string;
  analystId: string;
  analystName: string;
  email: string;
  avatarTone: "discord" | "violet" | "emerald" | "amber" | "rose" | "sky";
  approvedBy: string;
  approvedAt: string;
  controlCenterPath: string;
  discordRecordId: string | null;
  items: ProvisioningItem[];
  overallStatus: OperationalReadiness;
};

export type ProvisioningOverallPresentation = {
  label: string;
  tone: StatusTone;
  symbol: "✓" | "⚠" | "✗";
};

export function provisioningOverallPresentation(
  status: OperationalReadiness
): ProvisioningOverallPresentation {
  if (status === "ready") {
    return { label: "Operationally Ready", tone: "success", symbol: "✓" };
  }
  if (status === "failed") {
    return { label: "Provisioning Failed", tone: "danger", symbol: "✗" };
  }
  return { label: "Provisioning Required", tone: "warning", symbol: "⚠" };
}

export const PROVISIONING_ITEM_ORDER: ProvisioningItemId[] = [
  "analyst_identity",
  "directory_record",
  "control_center",
  "discord_record",
  "discord_connected",
  "discord_role_assigned",
  "referral_record",
  "commission_record",
  "analyst_dashboard_profile",
  "backend_provisioning",
];
