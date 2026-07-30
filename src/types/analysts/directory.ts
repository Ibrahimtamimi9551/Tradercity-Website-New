import type { SystemHealthState } from "@/types/admin/common";

export type AnalystLifecycleStatus =
  | "under_review"
  | "verification"
  | "partnership_discussion"
  | "onboarding"
  | "active"
  | "growing"
  | "suspended"
  | "closed";

export type AnalystTier = "partner" | "growing" | "top_partner" | "none";

export type DirectoryAnalyst = {
  id: string;
  displayName: string;
  handle: string;
  email: string;
  avatarTone: "discord" | "violet" | "emerald" | "amber" | "rose" | "sky";
  status: AnalystLifecycleStatus;
  tier: AnalystTier;
  specialization: string;
  reachFollowers: number;
  partneredAt: string;
  systemHealth: SystemHealthState;
};

export type AnalystDirectoryFilters = {
  search: string;
  status: AnalystLifecycleStatus | "all";
  tier: AnalystTier | "all";
  health: SystemHealthState | "all";
};

export type AnalystDirectoryStats = {
  totalAnalysts: number;
  activePartners: number;
  applicationsPending: number;
  actionRequired: number;
  newThisMonth: number;
  newThisMonthLabel: string;
};
