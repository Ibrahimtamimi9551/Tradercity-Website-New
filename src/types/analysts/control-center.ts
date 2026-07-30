import type { SystemHealthState, StatusTone } from "@/types/admin/common";
import type {
  AnalystLifecycleStatus,
  AnalystTier,
  DirectoryAnalyst,
} from "@/types/analysts/directory";

export type AnalystControlCenterTabId =
  | "overview"
  | "timeline"
  | "administration"
  | "performance"
  | "discord"
  | "referrals"
  | "commissions"
  | "notes";

/** Communication / engagement freshness — independent of lifecycle status. */
export type AnalystActivityStatus =
  | "active_today"
  | "active"
  | "quiet"
  | "inactive"
  | "critical";

export type AnalystLifecycleStageId =
  | "application"
  | "verification"
  | "partnership"
  | "agreement"
  | "onboarding"
  | "active"
  | "growing";

export type AnalystLifecycleStage = {
  id: AnalystLifecycleStageId;
  label: string;
  state: "complete" | "current" | "upcoming";
};

export type AnalystControlCenterNote = {
  id: string;
  body: string;
  author: string;
  createdAt: string;
};

export type AnalystControlCenterStats = {
  reportsPublished: number;
  lessons: number;
  communitySize: number;
  commissionEarned: string;
  memberReferrals: number;
  recentActivityLabel: string;
};

export type AnalystControlCenterDiscord = {
  account: string;
  currentRole: string;
  lastSync: string;
  roleStatus: string;
};

export type AnalystControlCenter = {
  id: string;
  displayName: string;
  handle: string;
  email: string;
  avatarTone: DirectoryAnalyst["avatarTone"];
  status: AnalystLifecycleStatus;
  tier: AnalystTier;
  specialization: string;
  reachFollowers: number;
  partneredAt: string;
  systemHealth: SystemHealthState;
  activityStatus: AnalystActivityStatus;
  lastActivityAt: string;
  operationalSummary: string;
  stats: AnalystControlCenterStats;
  lifecycleStages: AnalystLifecycleStage[];
  discord: AnalystControlCenterDiscord;
  notes: AnalystControlCenterNote[];
};

export type SuspendPartnershipDraft = {
  reason: string;
  notes: string;
  duration: "7d" | "14d" | "30d" | "indefinite";
  notifyAnalyst: boolean;
  removeDiscordRole: boolean;
  pauseCommission: boolean;
};

export type ActivityStatusPresentation = {
  label: string;
  tone: StatusTone;
};
