import type { SystemHealthState } from "@/types/admin/common";

export type MembershipTier = "vip" | "free";

export type SubscriptionStatus =
  | "active"
  | "pending_verification"
  | "verification_required"
  | "none";

export type DiscordStatus = "connected" | "disconnected" | "action_required" | "suspended";

export type ReferralStatus = "in_progress" | "eligible";

export type DirectoryMember = {
  id: string;
  username: string;
  email: string;
  avatarTone: "discord" | "violet" | "emerald" | "amber" | "rose" | "sky";
  membership: MembershipTier;
  subscription: SubscriptionStatus;
  discord: DiscordStatus;
  referralCurrent: number;
  referralTarget: number;
  referralEligible: boolean;
  joinedAt: string;
  systemHealth: SystemHealthState;
};

export type DirectoryFilters = {
  search: string;
  membership: MembershipTier | "all";
  subscription: SubscriptionStatus | "all";
  discord: DiscordStatus | "all";
  referral: ReferralStatus | "all";
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
