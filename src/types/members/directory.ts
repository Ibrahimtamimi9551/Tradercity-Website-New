import type { SystemHealthState } from "@/types/admin/common";

export type MembershipTier = "vip" | "free";

export type SubscriptionStatus =
  | "active"
  | "pending_verification"
  | "verification_required"
  | "none";

export type DiscordStatus = "connected" | "disconnected" | "action_required" | "suspended";

/**
 * Directory referral operational status — aligned with Referrals Progress filter.
 * - in_progress: target not yet met
 * - eligible: target met, redeem not yet requested
 * - waiting_admin_approval: Referral Redeem Request pending
 * - completed: redeem requested and admin already approved
 */
export type ReferralStatus =
  | "in_progress"
  | "eligible"
  | "waiting_admin_approval"
  | "completed";

/** Account login/access state — independent from Discord connection status. */
export type AccountStatus = "active" | "suspended";

export type DirectoryMember = {
  id: string;
  username: string;
  email: string;
  avatarTone: "discord" | "violet" | "emerald" | "amber" | "rose" | "sky";
  membership: MembershipTier;
  subscription: SubscriptionStatus;
  discord: DiscordStatus;
  accountStatus: AccountStatus;
  referralCurrent: number;
  referralTarget: number;
  /** Operational referral status (not a boolean — Eligible ≠ Completed). */
  referralStatus: ReferralStatus;
  joinedAt: string;
  systemHealth: SystemHealthState;
};

export type DirectoryFilters = {
  search: string;
  membership: MembershipTier | "all";
  subscription: SubscriptionStatus | "all";
  discord: DiscordStatus | "all";
  /**
   * `redeem_requests` maps to `waiting_admin_approval` rows
   * (same queue as Referrals `progress=redeem_requests`).
   */
  referral: ReferralStatus | "redeem_requests" | "all";
  health: SystemHealthState | "all";
};

export type DirectoryStats = {
  totalMembers: number;
  vipMembers: number;
  pendingVerification: number;
  actionRequired: number;
  newThisMonth: number;
  newThisMonthLabel: string;
};
