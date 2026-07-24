import type { DirectoryAnalyst } from "@/types/analysts/directory";
import type {
  AnalystDiscordAssignedRole,
  AnalystDiscordDashboardStats,
  AnalystDiscordRecord,
  AnalystDiscordStatus,
  AnalystDiscordSyncHealth,
} from "@/types/analysts/discord";
import { MOCK_DIRECTORY_ANALYSTS } from "@/lib/analysts/mock/directory-analysts";

/**
 * Mock Analyst Discord store — UI-only until NestJS / shared Discord sync.
 * TODO(NestJS): replace with GET /admin/analysts/discord (+ mutations).
 */

function audit(
  id: string,
  title: string,
  timestamp: string,
  status: AnalystDiscordRecord["auditHistory"][number]["status"] = "complete",
  description?: string
): AnalystDiscordRecord["auditHistory"][number] {
  return { id, title, description, timestamp, status };
}

function fromDirectory(
  row: DirectoryAnalyst,
  overrides: Partial<AnalystDiscordRecord> = {}
): AnalystDiscordRecord {
  const connected =
    row.status === "active" || row.status === "growing";
  const onboarding = row.status === "onboarding";
  const suspended = row.status === "suspended";

  let status: AnalystDiscordStatus = "pending";
  let assignedRole: AnalystDiscordAssignedRole = "none";
  let syncHealth: AnalystDiscordSyncHealth = "pending";
  let serverStatus: AnalystDiscordRecord["serverStatus"] = "not_in_server";

  if (connected) {
    status = "role_assigned";
    assignedRole = "analyst";
    syncHealth = "ok";
    serverStatus = "in_server";
  } else if (onboarding) {
    status = "connected";
    assignedRole = "pending";
    syncHealth = "pending";
    serverStatus = "in_server";
  } else if (suspended) {
    status = "disconnected";
    assignedRole = "none";
    syncHealth = "error";
    serverStatus = "in_server";
  } else if (row.status === "partnership_discussion" || row.status === "verification") {
    status = "invited";
    assignedRole = "none";
    syncHealth = "pending";
    serverStatus = "not_in_server";
  }

  const base: AnalystDiscordRecord = {
    id: `adisc-${row.id}`,
    analystId: row.id,
    displayName: row.displayName,
    handle: row.handle,
    email: row.email,
    avatarTone: row.avatarTone,
    discordUsername: connected || onboarding ? `${row.handle}` : null,
    discordId: connected || onboarding ? `d-${row.id.replace("a-", "")}` : null,
    status,
    assignedRole,
    serverStatus,
    syncHealth,
    inviteUrl:
      status === "invited" || status === "pending"
        ? `https://discord.gg/tradercity-mock-${row.id}`
        : connected || onboarding
          ? `https://discord.gg/tradercity-mock-${row.id}`
          : null,
    inviteGeneratedAt:
      status === "invited" || status === "pending" || connected || onboarding
        ? row.partneredAt
        : null,
    connectedAt: connected || onboarding ? row.partneredAt : null,
    lastSyncAt: connected
      ? "2026-07-22T19:40:00.000Z"
      : onboarding
        ? "2026-07-20T12:00:00.000Z"
        : suspended
          ? "2026-07-18T09:30:00.000Z"
          : null,
    applicationId: null,
    futureCapabilitiesReserved: true,
    auditHistory: [
      audit(`ev-${row.id}-1`, "Partnership activated", row.partneredAt),
      ...(status === "invited"
        ? [audit(`ev-${row.id}-2`, "Invite generated", row.partneredAt)]
        : []),
      ...(connected
        ? [
            audit(`ev-${row.id}-2`, "Account connected", row.partneredAt),
            audit(`ev-${row.id}-3`, "Analyst role assigned", row.partneredAt),
            audit(`ev-${row.id}-4`, "Roles synchronized", "2026-07-22T19:40:00.000Z"),
          ]
        : []),
      ...(onboarding
        ? [
            audit(`ev-${row.id}-2`, "Account connected", row.partneredAt),
            audit(
              `ev-${row.id}-3`,
              "Role assignment gated",
              row.partneredAt,
              "pending",
              "Assign Analyst role after onboarding complete (Wave D)."
            ),
          ]
        : []),
      ...(suspended
        ? [
            audit(`ev-${row.id}-2`, "Analyst role removed", "2026-07-18T09:30:00.000Z", "error"),
            audit(`ev-${row.id}-3`, "Account disconnected (ops)", "2026-07-18T09:30:00.000Z"),
          ]
        : []),
    ],
  };

  return { ...base, ...overrides, auditHistory: overrides.auditHistory ?? base.auditHistory };
}

/** Seed from Directory partners + approved Wave B handoffs. */
function buildInitialStore(): AnalystDiscordRecord[] {
  const fromDir = MOCK_DIRECTORY_ANALYSTS.filter((row) =>
    [
      "onboarding",
      "active",
      "growing",
      "suspended",
      "partnership_discussion",
      "verification",
    ].includes(row.status)
  ).map((row) => fromDirectory(row));

  // Wave B approved applications — Discord records ready for onboarding.
  const fromApprovals: AnalystDiscordRecord[] = [
    {
      id: "adisc-a-app-005",
      analystId: "a-app-005",
      displayName: "Sofia Almeida",
      handle: "sofiamacro",
      email: "sofia.almeida@example.com",
      avatarTone: "rose",
      discordUsername: null,
      discordId: null,
      status: "pending",
      assignedRole: "none",
      serverStatus: "not_in_server",
      syncHealth: "pending",
      inviteUrl: null,
      inviteGeneratedAt: null,
      connectedAt: null,
      lastSyncAt: null,
      applicationId: "app-005",
      futureCapabilitiesReserved: true,
      auditHistory: [
        audit(
          "ev-a-app-005-1",
          "Analyst identity created",
          "2026-07-02T15:00:00.000Z",
          "complete",
          "Approved application → partnership activation."
        ),
        audit(
          "ev-a-app-005-2",
          "Discord record reserved",
          "2026-07-02T15:00:00.000Z",
          "current",
          "Ready for invite / connect."
        ),
      ],
    },
    {
      id: "adisc-a-app-007",
      analystId: "a-app-007",
      displayName: "Priya Nair",
      handle: "priyaonchain",
      email: "priya.nair@example.com",
      avatarTone: "violet",
      discordUsername: "priyaonchain",
      discordId: "d-app-007",
      status: "role_assigned",
      assignedRole: "analyst",
      serverStatus: "in_server",
      syncHealth: "ok",
      inviteUrl: "https://discord.gg/tradercity-mock-a-app-007",
      inviteGeneratedAt: "2026-05-21T10:00:00.000Z",
      connectedAt: "2026-05-22T14:00:00.000Z",
      lastSyncAt: "2026-07-20T12:00:00.000Z",
      applicationId: "app-007",
      futureCapabilitiesReserved: true,
      auditHistory: [
        audit("ev-a-app-007-1", "Analyst identity created", "2026-05-20T09:00:00.000Z"),
        audit("ev-a-app-007-2", "Invite generated", "2026-05-21T10:00:00.000Z"),
        audit("ev-a-app-007-3", "Account connected", "2026-05-22T14:00:00.000Z"),
        audit("ev-a-app-007-4", "Analyst role assigned", "2026-05-22T14:05:00.000Z"),
      ],
    },
  ];

  // Intentional sync-error sample for dashboard (active partner).
  const withIssue = fromDir.map((r) => {
    if (r.analystId === "a-006") {
      return {
        ...r,
        status: "connected" as const,
        assignedRole: "pending" as const,
        syncHealth: "error" as const,
        serverStatus: "in_server" as const,
        discordUsername: r.handle,
        discordId: `d-${r.analystId.replace("a-", "")}`,
        auditHistory: [
          ...r.auditHistory,
          audit(
            `ev-${r.analystId}-sync-err`,
            "Role sync failed",
            "2026-07-23T08:00:00.000Z",
            "error",
            "Assigned role mismatch — retry synchronize."
          ),
        ],
      };
    }
    return r;
  });

  const byAnalyst = new Map<string, AnalystDiscordRecord>();
  for (const row of [...withIssue, ...fromApprovals]) {
    byAnalyst.set(row.analystId, row);
  }
  return Array.from(byAnalyst.values());
}

let STORE: AnalystDiscordRecord[] = buildInitialStore();

export function listMockAnalystDiscord(): AnalystDiscordRecord[] {
  return STORE.map(cloneRecord);
}

export function getMockAnalystDiscord(id: string): AnalystDiscordRecord | undefined {
  const row = STORE.find((r) => r.id === id || r.analystId === id);
  return row ? cloneRecord(row) : undefined;
}

export function getMockAnalystDiscordByAnalystId(
  analystId: string
): AnalystDiscordRecord | undefined {
  const row = STORE.find((r) => r.analystId === analystId);
  return row ? cloneRecord(row) : undefined;
}

export function replaceMockAnalystDiscord(
  next: AnalystDiscordRecord
): AnalystDiscordRecord {
  const idx = STORE.findIndex((r) => r.id === next.id);
  const cloned = cloneRecord(next);
  if (idx >= 0) STORE[idx] = cloned;
  else STORE.push(cloned);
  return cloneRecord(cloned);
}

export function upsertMockAnalystDiscord(
  record: AnalystDiscordRecord
): AnalystDiscordRecord {
  return replaceMockAnalystDiscord(record);
}

export function computeAnalystDiscordStats(
  rows: AnalystDiscordRecord[] = STORE
): AnalystDiscordDashboardStats {
  const connectedCount = rows.filter(
    (r) =>
      r.status === "connected" ||
      r.status === "verified" ||
      r.status === "role_assigned"
  ).length;
  const pendingConnectionsCount = rows.filter((r) => r.status === "pending").length;
  const pendingInvitationsCount = rows.filter((r) => r.status === "invited").length;
  const syncErrorsCount = rows.filter((r) => r.syncHealth === "error").length;
  const disconnectedCount = rows.filter((r) => r.status === "disconnected").length;
  const roleAssignmentIssuesCount = rows.filter(
    (r) =>
      (r.status === "connected" || r.status === "verified") &&
      r.assignedRole !== "analyst"
  ).length;

  const lastSync = rows
    .map((r) => r.lastSyncAt)
    .filter((v): v is string => Boolean(v))
    .sort()
    .at(-1);

  return {
    connectedCount,
    pendingConnectionsCount,
    pendingInvitationsCount,
    syncErrorsCount,
    disconnectedCount,
    roleAssignmentIssuesCount,
    lastSyncLabel: lastSync
      ? new Date(lastSync).toLocaleString("en-GB", {
          day: "2-digit",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "—",
  };
}

function cloneRecord(row: AnalystDiscordRecord): AnalystDiscordRecord {
  return {
    ...row,
    auditHistory: row.auditHistory.map((e) => ({ ...e })),
  };
}

/** Test / HMR helper — rebuild from directory seeds (does not wipe runtime upserts mid-session unless called). */
export function __resetMockAnalystDiscordForTests() {
  STORE = buildInitialStore();
}
