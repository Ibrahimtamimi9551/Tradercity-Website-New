import type { StatusTone } from "@/types/admin/common";

/** Discord role mirrored from TraderCity membership / staff assignments. */
export type DiscordRole = "vip" | "public" | "analyst" | "moderator";

/**
 * Relationship between the Discord account and TraderCity.
 * Independent from sync status (whether Discord matches TraderCity).
 */
export type DiscordConnectionStatus =
  | "connected"
  | "disconnected"
  | "left_server"
  | "suspended";

/**
 * Whether Discord currently reflects TraderCity membership state.
 * Independent from connection status.
 */
export type DiscordSyncStatus = "synced" | "pending" | "sync_failed" | "not_synced";

export type DiscordMembershipStatus = "active" | "expired" | "pending" | "none";

export type DiscordDetailTab = "overview" | "role_history" | "events" | "sync_log";

export type DiscordRoleHistoryItem = {
  id: string;
  role: DiscordRole;
  label: string;
  timestamp: string;
  note?: string;
};

export type DiscordEventItem = {
  id: string;
  title: string;
  description?: string;
  timestamp: string;
};

export type DiscordSyncLogItem = {
  id: string;
  title: string;
  description?: string;
  timestamp: string;
  status: "complete" | "current" | "pending" | "error";
};

export type DiscordLinkedMembership = {
  plan: string;
  status: DiscordMembershipStatus;
  statusLabel: string;
  statusTone: StatusTone;
  expiryAt: string | null;
};

export type DiscordMember = {
  id: string;
  /** TraderCity member id — used for profile deep-links. */
  memberId: string;
  username: string;
  discordId: string;
  avatarTone: "discord" | "violet" | "emerald" | "amber" | "rose" | "sky";
  role: DiscordRole;
  connectionStatus: DiscordConnectionStatus;
  syncStatus: DiscordSyncStatus;
  joinedDiscordAt: string | null;
  lastSyncAt: string | null;
  accountCreatedAt: string | null;
  lastSeenLabel: string;
  lastSeenOnline: boolean;
  discordServer: string;
  discordServerUrl: string;
  syncSource: string;
  autoSync: boolean;
  /** Invite generated/sent but member has not joined Discord yet. */
  pendingInvite: boolean;
  linkedMembership: DiscordLinkedMembership;
  roleHistory: DiscordRoleHistoryItem[];
  events: DiscordEventItem[];
  syncLog: DiscordSyncLogItem[];
};

export type DiscordFilters = {
  search: string;
  role: DiscordRole | "all";
  connection: DiscordConnectionStatus | "all";
  /** URL key: `sync` — matches Dashboard deep-links. */
  sync: DiscordSyncStatus | "all";
  membership: "vip" | "free" | "all";
};

export type DiscordStats = {
  connectedMembers: number;
  totalRegistered: number;
  connectedTrend: number;
  vipMembers: number;
  vipOfConnected: number;
  vipTrend: number;
  syncIssues: number;
  pendingInvites: number;
  lastSyncLabel: string;
};
