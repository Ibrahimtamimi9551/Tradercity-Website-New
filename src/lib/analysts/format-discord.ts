import type { StatusTone } from "@/types/admin/common";
import type {
  AnalystDiscordAssignedRole,
  AnalystDiscordServerStatus,
  AnalystDiscordStatus,
  AnalystDiscordStatusPresentation,
  AnalystDiscordSyncHealth,
} from "@/types/analysts/discord";

export function analystDiscordStatusPresentation(
  status: AnalystDiscordStatus
): AnalystDiscordStatusPresentation {
  const map: Record<AnalystDiscordStatus, AnalystDiscordStatusPresentation> = {
    pending: { label: "Pending", tone: "neutral" },
    invited: { label: "Invited", tone: "info" },
    connected: { label: "Connected", tone: "success" },
    verified: { label: "Verified", tone: "success" },
    role_assigned: { label: "Role Assigned", tone: "vip" },
    disconnected: { label: "Disconnected", tone: "danger" },
  };
  return map[status];
}

export function analystDiscordRoleLabel(role: AnalystDiscordAssignedRole): string {
  if (role === "analyst") return "Analyst";
  if (role === "pending") return "Pending";
  return "None";
}

export function analystDiscordServerLabel(status: AnalystDiscordServerStatus): string {
  const map: Record<AnalystDiscordServerStatus, string> = {
    in_server: "In Server",
    not_in_server: "Not In Server",
    left_server: "Left Server",
    unknown: "Unknown",
  };
  return map[status];
}

export function analystDiscordSyncPresentation(
  sync: AnalystDiscordSyncHealth
): { label: string; tone: StatusTone } {
  if (sync === "ok") return { label: "Synced", tone: "success" };
  if (sync === "error") return { label: "Sync Error", tone: "danger" };
  return { label: "Pending", tone: "info" };
}

export function formatAnalystDiscordDate(iso: string | null): string {
  if (!iso) return "—";
  const date = new Date(iso);
  const day = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const time = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return `${day} ${time}`;
}
