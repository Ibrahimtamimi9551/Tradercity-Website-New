import type {
  AnalystReferralOperation,
  AnalystReferralRecord,
} from "@/types/analysts/referrals";
import {
  appendAnalystReferralTimelineEvent,
  getMockAnalystReferral,
  upsertMockAnalystReferral,
} from "@/lib/analysts/mock/referrals";

/**
 * Mock referral mutations — enable/disable/archive only.
 * Appends operational timeline events (audit trail, not analytics).
 * No commission math.
 */
export function applyAnalystReferralOperation(
  id: string,
  operation: AnalystReferralOperation
): AnalystReferralRecord | undefined {
  const current = getMockAnalystReferral(id);
  if (!current) return undefined;

  const now = new Date().toISOString();

  switch (operation) {
    case "copy_code":
    case "copy_link":
      return current;
    case "enable": {
      const next = upsertMockAnalystReferral({
        ...current,
        status: "enabled",
        archived: false,
        archiveReason: null,
        activationDate: current.activationDate ?? now,
        partnershipStatus:
          current.partnershipStatus === "onboarding"
            ? "active"
            : current.partnershipStatus,
      });
      appendAnalystReferralTimelineEvent(id, {
        type: current.activationDate
          ? "manually_reactivated"
          : "referral_activated",
        category: current.activationDate ? "administrative" : "system",
        title: current.activationDate
          ? "Referral Reactivated"
          : "Referral Activated",
        description: current.activationDate
          ? "Manually re-enabled by administrator."
          : "Referral identity became available after successful system provisioning.",
        timestamp: now,
      });
      return getMockAnalystReferral(id) ?? next;
    }
    case "disable": {
      const next = upsertMockAnalystReferral({
        ...current,
        status: "disabled",
      });
      appendAnalystReferralTimelineEvent(id, {
        type: "manually_disabled",
        category: "administrative",
        title: "Referral Manually Disabled",
        description: "Paused by administrator.",
        timestamp: now,
        status: "error",
      });
      return getMockAnalystReferral(id) ?? next;
    }
    case "archive": {
      const next = upsertMockAnalystReferral({
        ...current,
        status: "disabled",
        archived: true,
        archiveReason: current.archiveReason ?? "disabled",
      });
      appendAnalystReferralTimelineEvent(id, {
        type: "referral_archived",
        category: "administrative",
        title: "Referral Archived",
        description: "Identity moved to Archive.",
        timestamp: now,
        status: "error",
      });
      return getMockAnalystReferral(id) ?? next;
    }
    case "restore": {
      const next = upsertMockAnalystReferral({
        ...current,
        archived: false,
        archiveReason: null,
        status: "enabled",
        partnershipStatus:
          current.partnershipStatus === "expired" ||
          current.partnershipStatus === "closed"
            ? "active"
            : current.partnershipStatus,
      });
      appendAnalystReferralTimelineEvent(id, {
        type: "referral_reactivated",
        category: "administrative",
        title: "Referral Reactivated",
        description: "Restored from Archive.",
        timestamp: now,
      });
      return getMockAnalystReferral(id) ?? next;
    }
    default:
      return current;
  }
}
