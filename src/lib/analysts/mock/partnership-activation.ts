import type { AnalystApplication } from "@/types/analysts/applications";
import type { DirectoryAnalyst } from "@/types/analysts/directory";
import type { AnalystDiscordRecord } from "@/types/analysts/discord";
import { applicationHandle } from "@/types/analysts/applications";
import { MOCK_DIRECTORY_ANALYSTS } from "@/lib/analysts/mock/directory-analysts";
import { upsertMockAnalystDiscord } from "@/lib/analysts/mock/discord";
import { provisionAnalystReferralIdentity } from "@/lib/analysts/mock/referrals";

/**
 * Partnership activation — Applicant → Partner birth event.
 *
 * On Approve, Applications no longer “own” the analyst. Each operational domain
 * receives its own record:
 *
 * Application → Approved
 * ────────────────────────
 * Create Analyst Identity
 * → Create Directory Record
 * → Create Control Center (lazy via Directory)
 * → Create Discord Record
 * → Provision Referral Identity (Disabled until Operationally Ready — Wave E)
 * → System Provisioning (Applications → Onboarding)
 *
 * Identity migration (existing Discord / VIP / referral merge) is a FUTURE edge
 * case — do not implement here.
 */

export type PartnershipActivationResult = {
  analystId: string;
  directoryCreated: boolean;
  discordRecordId: string;
  referralRecordId: string;
  referralReserved: boolean;
  controlCenterPath: string;
  createdAt: string;
};

function marketsToSpecialization(app: AnalystApplication): string {
  if (app.primaryMarkets.length === 0) return "General";
  return app.primaryMarkets
    .map((m) => m.replace(/_/g, " "))
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" · ");
}

function ensureDirectoryRecord(
  app: AnalystApplication,
  analystId: string,
  createdAt: string
): boolean {
  const existing = MOCK_DIRECTORY_ANALYSTS.find((a) => a.id === analystId);
  if (existing) return false;

  const handle = applicationHandle(app).replace(/^@/, "") || analystId;
  const row: DirectoryAnalyst = {
    id: analystId,
    displayName: app.analystName,
    handle,
    email: app.email,
    avatarTone: app.avatarTone,
    status: "onboarding",
    tier: "partner",
    specialization: marketsToSpecialization(app),
    reachFollowers: 0,
    partneredAt: createdAt,
    systemHealth: "healthy",
  };
  MOCK_DIRECTORY_ANALYSTS.unshift(row);
  return true;
}

function ensureDiscordRecord(
  app: AnalystApplication,
  analystId: string,
  createdAt: string
): AnalystDiscordRecord {
  const handle = applicationHandle(app).replace(/^@/, "") || analystId;
  const record: AnalystDiscordRecord = {
    id: `adisc-${analystId}`,
    analystId,
    displayName: app.analystName,
    handle,
    email: app.email,
    avatarTone: app.avatarTone,
    discordUsername: app.discordUsername,
    discordId: null,
    status: app.discordUsername ? "pending" : "pending",
    assignedRole: "none",
    serverStatus: "not_in_server",
    syncHealth: "pending",
    inviteUrl: null,
    inviteGeneratedAt: null,
    connectedAt: null,
    lastSyncAt: null,
    applicationId: app.id,
    futureCapabilitiesReserved: true,
    auditHistory: [
      {
        id: `ev-${analystId}-birth`,
        title: "Analyst identity created",
        description: "Approved application → partnership activation.",
        timestamp: createdAt,
        status: "complete",
      },
      {
        id: `ev-${analystId}-discord-reserved`,
        title: "Discord record created",
        description: "Ready for invite / connect. Referral identity provisioned (Disabled until Operationally Ready).",
        timestamp: createdAt,
        status: "current",
      },
    ],
  };
  return upsertMockAnalystDiscord(record);
}

/**
 * Activate partnership after Approve.
 * Safe to call when a handoff already exists — upserts Discord / Directory / Referral as needed.
 */
export function activatePartnershipFromApplication(
  app: AnalystApplication,
  analystId: string,
  createdAt: string = new Date().toISOString()
): PartnershipActivationResult {
  const directoryCreated = ensureDirectoryRecord(app, analystId, createdAt);
  const discord = ensureDiscordRecord(app, analystId, createdAt);
  const handle = applicationHandle(app).replace(/^@/, "") || analystId;
  const referral = provisionAnalystReferralIdentity({
    analystId,
    displayName: app.analystName,
    handle,
    email: app.email,
    avatarTone: app.avatarTone,
    applicationId: app.id,
    provisionedAt: createdAt,
  });

  return {
    analystId,
    directoryCreated,
    discordRecordId: discord.id,
    referralRecordId: referral.id,
    referralReserved: true,
    controlCenterPath: `/admin/analysts/${analystId}`,
    createdAt,
  };
}
