import type { StatusTone } from "@/types/admin/common";
import type { DirectoryAnalyst } from "@/types/analysts/directory";

/**
 * Operational referral status — Wave E.
 * Keep to Enabled / Disabled only (no intermediate commercial states).
 */
export type AnalystReferralStatus = "enabled" | "disabled";

/**
 * Partnership posture reflected on the referral identity.
 * Referrals consume Directory lifecycle; they do not own partnership admin.
 */
export type AnalystReferralPartnershipStatus =
  | "active"
  | "onboarding"
  | "suspended"
  | "expired"
  | "closed";

/** Membership plans attributed to successful referral conversions. */
export type AnalystReferralMembershipPlan =
  | "monthly"
  | "quarterly"
  | "yearly"
  | "lifetime";

export type AnalystReferralDomainView =
  | "dashboard"
  | "directory"
  | "performance"
  | "archive";

export type AnalystReferralPlanBreakdown = {
  monthly: number;
  quarterly: number;
  yearly: number;
  lifetime: number;
};

/**
 * Referral-specific operational audit events.
 * Not analyst activity history — that belongs to future Activity Tracking.
 * Extensible for NestJS event sync without UI redesign.
 */
export type AnalystReferralTimelineEventType =
  // System
  | "identity_created"
  | "referral_enabled"
  | "referral_disabled"
  | "referral_reactivated"
  | "referral_activated"
  // Member
  | "first_registration"
  | "new_registration"
  | "referral_milestone"
  // Conversion
  | "first_vip_conversion"
  | "monthly_purchased"
  | "quarterly_purchased"
  | "yearly_purchased"
  | "lifetime_purchased"
  // Administrative
  | "manually_disabled"
  | "manually_reactivated"
  | "referral_archived";

export type AnalystReferralTimelineEventCategory =
  | "system"
  | "member"
  | "conversion"
  | "administrative";

export type AnalystReferralTimelineEvent = {
  id: string;
  type: AnalystReferralTimelineEventType;
  category: AnalystReferralTimelineEventCategory;
  title: string;
  description?: string;
  /** ISO timestamp — NestJS appends chronologically. */
  timestamp: string;
  status?: "complete" | "current" | "pending" | "error";
};

/**
 * Analyst Referral Identity — owned exclusively by the Referrals domain.
 * Created when Operationally Ready (Wave D); activated after onboarding completes.
 * Commission calculations are out of scope (Wave F consumes this shape).
 */
export type AnalystReferralRecord = {
  id: string;
  analystId: string;
  displayName: string;
  handle: string;
  email: string;
  avatarTone: DirectoryAnalyst["avatarTone"];
  /** Display code, e.g. REF-X7K82 */
  referralCode: string;
  /** Short token used in links, e.g. X7K82 */
  referralToken: string;
  /** Full share URL (copy action). Display uses shortened form. */
  referralLink: string;
  status: AnalystReferralStatus;
  partnershipStatus: AnalystReferralPartnershipStatus;
  /** Null until Operationally Ready → Referral Activated. */
  activationDate: string | null;
  /** Provisioned at Approve / readiness path but not yet activated. */
  provisionedAt: string;
  archived: boolean;
  archiveReason: "disabled" | "analyst_archived" | "expired_partnership" | null;
  totalReferrals: number;
  successfulReferrals: number;
  activeVipMembers: number;
  pendingConversions: number;
  planBreakdown: AnalystReferralPlanBreakdown;
  /**
   * Operational audit trail for this referral identity only.
   * Chronological (oldest → newest). Not analytics.
   */
  timeline: AnalystReferralTimelineEvent[];
  applicationId: string | null;
  /** Wave F consumes performance — no commission logic here. */
  commissionReady: true;
};

export type AnalystReferralFilters = {
  search: string;
  status: AnalystReferralStatus | "all";
};

export type AnalystReferralDashboardStats = {
  totalAnalysts: number;
  referralEnabled: number;
  referralDisabled: number;
  totalReferralsGenerated: number;
  successfulReferrals: number;
  vipConversions: number;
  /** Wave F placeholder — no calculation. */
  pendingCommissionLabel: string;
};

export type AnalystReferralPerformanceSnapshot = {
  topReferring: AnalystReferralRecord[];
  recentSuccessful: AnalystReferralRecord[];
  recentlyActivated: AnalystReferralRecord[];
  disabledCodes: AnalystReferralRecord[];
  withoutReferrals: AnalystReferralRecord[];
};

export type AnalystReferralStatusPresentation = {
  label: string;
  tone: StatusTone;
};

export type AnalystReferralOperation =
  | "copy_code"
  | "copy_link"
  | "enable"
  | "disable"
  | "archive"
  | "restore";
