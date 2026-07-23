import type { StatusTone } from "@/types/admin/common";
import type { DirectoryAnalyst } from "@/types/analysts/directory";

/**
 * Analyst Discord operational lifecycle status.
 * Keep simple — do not invent parallel status systems in Wave C.
 */
export type AnalystDiscordStatus =
  | "pending"
  | "invited"
  | "connected"
  | "verified"
  | "role_assigned"
  | "disconnected";

/** Assigned Discord role for Analyst partners (shared infra; Analyst ≠ VIP). */
export type AnalystDiscordAssignedRole = "none" | "analyst" | "pending";

export type AnalystDiscordServerStatus =
  | "in_server"
  | "not_in_server"
  | "left_server"
  | "unknown";

export type AnalystDiscordSyncHealth = "ok" | "pending" | "error";

export type AnalystDiscordDomainView = "dashboard" | "directory" | "operations";

export type AnalystDiscordAuditEntry = {
  id: string;
  title: string;
  description?: string;
  timestamp: string;
  status: "complete" | "current" | "pending" | "error";
};

/**
 * Analyst Discord operational record.
 * Created when an application is approved (partnership activation).
 * Applications record entry; Discord owns connection lifecycle.
 */
export type AnalystDiscordRecord = {
  id: string;
  analystId: string;
  displayName: string;
  handle: string;
  email: string;
  avatarTone: DirectoryAnalyst["avatarTone"];
  /** Discord username when known (from application or connect). */
  discordUsername: string | null;
  discordId: string | null;
  status: AnalystDiscordStatus;
  assignedRole: AnalystDiscordAssignedRole;
  serverStatus: AnalystDiscordServerStatus;
  syncHealth: AnalystDiscordSyncHealth;
  /** Invite URL generated for this partner (mock). */
  inviteUrl: string | null;
  inviteGeneratedAt: string | null;
  connectedAt: string | null;
  lastSyncAt: string | null;
  applicationId: string | null;
  /** Future: publishing / private / education / mod permissions — reserved. */
  futureCapabilitiesReserved: true;
  auditHistory: AnalystDiscordAuditEntry[];
};

export type AnalystDiscordFilters = {
  search: string;
  status: AnalystDiscordStatus | "all";
  role: AnalystDiscordAssignedRole | "all";
  sync: AnalystDiscordSyncHealth | "all";
};

export type AnalystDiscordDashboardStats = {
  connectedCount: number;
  pendingConnectionsCount: number;
  pendingInvitationsCount: number;
  syncErrorsCount: number;
  disconnectedCount: number;
  roleAssignmentIssuesCount: number;
  lastSyncLabel: string;
};

export type AnalystDiscordStatusPresentation = {
  label: string;
  tone: StatusTone;
};

/** Operational actions available in Discord Operations / inspector. */
export type AnalystDiscordOperation =
  | "generate_invite"
  | "copy_invite"
  | "connect_account"
  | "reconnect"
  | "synchronize_roles"
  | "assign_role"
  | "remove_role"
  | "disconnect_account"
  | "view_audit_history";
