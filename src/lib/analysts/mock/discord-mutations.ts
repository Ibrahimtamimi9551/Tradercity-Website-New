import type {
  AnalystDiscordOperation,
  AnalystDiscordRecord,
} from "@/types/analysts/discord";
import {
  getMockAnalystDiscord,
  replaceMockAnalystDiscord,
} from "@/lib/analysts/mock/discord";

function pushAudit(
  record: AnalystDiscordRecord,
  title: string,
  description?: string,
  status: AnalystDiscordRecord["auditHistory"][number]["status"] = "complete"
): AnalystDiscordRecord {
  const now = new Date().toISOString();
  return {
    ...record,
    auditHistory: [
      {
        id: `ev-${record.id}-${Date.now()}`,
        title,
        description,
        timestamp: now,
        status,
      },
      ...record.auditHistory,
    ],
  };
}

/**
 * Mock Discord operational mutations.
 * TODO(NestJS): shared Discord sync / bot role APIs — Analyst trigger differs from VIP.
 */
export function applyAnalystDiscordOperation(
  id: string,
  operation: AnalystDiscordOperation,
  opts?: { discordUsername?: string }
): AnalystDiscordRecord | null {
  const current = getMockAnalystDiscord(id);
  if (!current) return null;
  const now = new Date().toISOString();

  switch (operation) {
    case "generate_invite": {
      const inviteUrl = `https://discord.gg/tradercity-mock-${current.analystId}`;
      return replaceMockAnalystDiscord(
        pushAudit(
          {
            ...current,
            status: current.status === "pending" ? "invited" : current.status,
            inviteUrl,
            inviteGeneratedAt: now,
            syncHealth: "pending",
          },
          "Invite generated",
          inviteUrl
        )
      );
    }
    case "copy_invite": {
      // UI copies clipboard; mock only records audit.
      if (!current.inviteUrl) {
        return applyAnalystDiscordOperation(id, "generate_invite");
      }
      return replaceMockAnalystDiscord(
        pushAudit(current, "Invite copied", current.inviteUrl)
      );
    }
    case "connect_account": {
      const username =
        opts?.discordUsername?.trim() ||
        current.discordUsername ||
        current.handle;
      return replaceMockAnalystDiscord(
        pushAudit(
          {
            ...current,
            discordUsername: username,
            discordId: current.discordId ?? `d-${current.analystId.replace(/^a-/, "")}`,
            status: "connected",
            serverStatus: "in_server",
            connectedAt: current.connectedAt ?? now,
            lastSyncAt: now,
            syncHealth: "ok",
            assignedRole:
              current.assignedRole === "analyst" ? "analyst" : "pending",
          },
          "Account connected",
          `@${username}`
        )
      );
    }
    case "reconnect": {
      return replaceMockAnalystDiscord(
        pushAudit(
          {
            ...current,
            status: "connected",
            serverStatus: "in_server",
            connectedAt: now,
            lastSyncAt: now,
            syncHealth: "ok",
            assignedRole:
              current.assignedRole === "analyst" ? "analyst" : "pending",
          },
          "Account reconnected"
        )
      );
    }
    case "synchronize_roles": {
      const ok = current.status !== "disconnected";
      return replaceMockAnalystDiscord(
        pushAudit(
          {
            ...current,
            lastSyncAt: now,
            syncHealth: ok ? "ok" : "error",
            status:
              ok && current.assignedRole === "analyst"
                ? "role_assigned"
                : current.status === "disconnected"
                  ? "disconnected"
                  : current.status === "pending" || current.status === "invited"
                    ? current.status
                    : "verified",
          },
          ok ? "Roles synchronized" : "Role sync failed",
          undefined,
          ok ? "complete" : "error"
        )
      );
    }
    case "assign_role": {
      // Gate documented: full assign after onboarding (Wave D). Mock allows ops override.
      return replaceMockAnalystDiscord(
        pushAudit(
          {
            ...current,
            assignedRole: "analyst",
            status: "role_assigned",
            serverStatus: "in_server",
            lastSyncAt: now,
            syncHealth: "ok",
            connectedAt: current.connectedAt ?? now,
            discordUsername: current.discordUsername ?? current.handle,
            discordId:
              current.discordId ?? `d-${current.analystId.replace(/^a-/, "")}`,
          },
          "Analyst role assigned",
          "Mock assign — production gate: Onboarding Complete → Assign Role."
        )
      );
    }
    case "remove_role": {
      return replaceMockAnalystDiscord(
        pushAudit(
          {
            ...current,
            assignedRole: "none",
            status:
              current.status === "disconnected" ? "disconnected" : "verified",
            lastSyncAt: now,
            syncHealth: "ok",
          },
          "Analyst role removed"
        )
      );
    }
    case "disconnect_account": {
      return replaceMockAnalystDiscord(
        pushAudit(
          {
            ...current,
            status: "disconnected",
            assignedRole: "none",
            serverStatus:
              current.serverStatus === "in_server"
                ? "left_server"
                : current.serverStatus,
            lastSyncAt: now,
            syncHealth: "pending",
          },
          "Account disconnected"
        )
      );
    }
    case "view_audit_history":
      // Placeholder — UI surfaces audit panel; no mutation.
      return current;
    default:
      return current;
  }
}
