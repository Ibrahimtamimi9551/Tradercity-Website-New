import { getMockApplication, listMockApplications } from "@/lib/analysts/mock/applications";
import { getAnalystControlCenter } from "@/lib/analysts/mock/control-center";
import { MOCK_DIRECTORY_ANALYSTS } from "@/lib/analysts/mock/directory-analysts";
import { getMockAnalystDiscordByAnalystId } from "@/lib/analysts/mock/discord";
import {
  activateAnalystReferralIdentity,
  getMockAnalystReferralByAnalystId,
} from "@/lib/analysts/mock/referrals";
import type { AnalystApplication } from "@/types/analysts/applications";
import type {
  AnalystSystemProvisioning,
  OperationalReadiness,
  ProvisioningItem,
  ProvisioningItemStatus,
} from "@/types/analysts/onboarding";

/**
 * System Provisioning verification — Wave D.
 *
 * Consumes outputs from Applications (handoff), Directory, Control Center,
 * Discord, and Referrals. Does not collect new data.
 *
 * When overall readiness is Ready, referral identity is activated (Wave E).
 *
 * TODO(NestJS): replace with GET /admin/analysts/applications/:id/provisioning
 */

const APPROVED_BY_MOCK = "Administrator";

function item(
  id: ProvisioningItem["id"],
  label: string,
  status: ProvisioningItemStatus,
  domain: ProvisioningItem["domain"],
  note?: string
): ProvisioningItem {
  return { id, label, status, domain, note };
}

function discordConnectedStatus(
  status: string | undefined
): ProvisioningItemStatus {
  if (!status) return "pending";
  if (status === "disconnected") return "failed";
  if (
    status === "connected" ||
    status === "verified" ||
    status === "role_assigned"
  ) {
    return "ready";
  }
  return "pending";
}

function computeOverall(items: ProvisioningItem[]): OperationalReadiness {
  const required = items.filter((i) => i.status !== "future");
  if (required.some((i) => i.status === "failed")) return "failed";
  if (required.some((i) => i.status === "pending")) return "provisioning_required";
  return "ready";
}

/**
 * Build provisioning checklist for an approved application.
 * Returns null when the application is not approved or has no handoff.
 */
export function buildSystemProvisioning(
  app: AnalystApplication
): AnalystSystemProvisioning | null {
  if (app.status !== "approved" || !app.partnershipHandoff) return null;

  const handoff = app.partnershipHandoff;
  const analystId = handoff.analystId;
  const directoryRow = MOCK_DIRECTORY_ANALYSTS.find((a) => a.id === analystId);
  const controlCenter = getAnalystControlCenter(analystId);
  const discord = getMockAnalystDiscordByAnalystId(analystId);
  const referral = getMockAnalystReferralByAnalystId(analystId);

  const identityReady = Boolean(analystId);
  const directoryReady = handoff.directoryCreated || Boolean(directoryRow);
  const controlCenterReady = Boolean(controlCenter) || directoryReady;
  const discordRecordReady = Boolean(handoff.discordRecordId || discord);
  const discordConnected = discordConnectedStatus(discord?.status);
  const discordRole: ProvisioningItemStatus =
    discord?.assignedRole === "analyst"
      ? "ready"
      : discord?.syncHealth === "error" &&
          (discord.status === "connected" || discord.status === "verified")
        ? "failed"
        : "pending";
  const referralReady = Boolean(
    handoff.referralRecordId || handoff.referralReserved || referral
  );
  // Commission remains a Wave F placeholder — marked ready when referral identity exists.
  const commissionReady = referralReady;

  const items: ProvisioningItem[] = [
    item(
      "analyst_identity",
      "Analyst Identity Created",
      identityReady ? "ready" : "pending",
      "applications"
    ),
    item(
      "directory_record",
      "Directory Record Created",
      directoryReady ? "ready" : "pending",
      "directory"
    ),
    item(
      "control_center",
      "Control Center Created",
      controlCenterReady ? "ready" : "pending",
      "control_center"
    ),
    item(
      "discord_record",
      "Discord Record Created",
      discordRecordReady ? "ready" : "pending",
      "discord"
    ),
    item(
      "discord_connected",
      "Discord Connected",
      discordConnected,
      "discord",
      discordConnected === "failed" ? "Account disconnected — reconnect in Discord." : undefined
    ),
    item(
      "discord_role_assigned",
      "Discord Role Assigned",
      discordRole,
      "discord",
      discordRole === "failed" ? "Role sync failed — retry in Discord Operations." : undefined
    ),
    item(
      "referral_record",
      "Referral Record Initialized",
      referralReady ? "ready" : "pending",
      "referrals",
      referral?.activationDate
        ? "Referral identity activated"
        : referralReady
          ? "Provisioned · activates when Operationally Ready"
          : undefined
    ),
    item(
      "commission_record",
      "Commission Record Initialized",
      commissionReady ? "ready" : "pending",
      "commissions",
      "Wave F consumes Referral performance — no payout math yet"
    ),
    item(
      "analyst_dashboard_profile",
      "Analyst Dashboard Profile",
      "future",
      "analyst_dashboard",
      "Future — partner-facing Analyst Dashboard"
    ),
    item(
      "backend_provisioning",
      "Backend Provisioning Ready",
      identityReady ? "ready" : "pending",
      "backend",
      "Mock-ready · NestJS will create records automatically"
    ),
  ];

  const overallStatus = computeOverall(items);

  // Wave E: Operationally Ready → Referral Activated
  if (overallStatus === "ready" && referral && !referral.activationDate) {
    activateAnalystReferralIdentity(analystId);
  }

  return {
    applicationId: app.id,
    analystId,
    analystName: app.analystName,
    email: app.email,
    avatarTone: app.avatarTone,
    approvedBy: APPROVED_BY_MOCK,
    approvedAt: app.decisionAt ?? handoff.createdAt,
    controlCenterPath: handoff.controlCenterPath,
    discordRecordId: handoff.discordRecordId ?? discord?.id ?? null,
    items,
    overallStatus,
  };
}

export function getSystemProvisioning(
  applicationId: string
): AnalystSystemProvisioning | null {
  const app = getMockApplication(applicationId);
  if (!app) return null;
  return buildSystemProvisioning(app);
}

/** Approved applications with partnership handoff — Onboarding queue. */
export function listOnboardingApplications(): AnalystApplication[] {
  return listMockApplications()
    .filter((app) => app.status === "approved" && app.partnershipHandoff)
    .sort((a, b) => {
      const aAt = a.decisionAt ?? a.partnershipHandoff?.createdAt ?? a.appliedAt;
      const bAt = b.decisionAt ?? b.partnershipHandoff?.createdAt ?? b.appliedAt;
      return bAt.localeCompare(aAt);
    });
}

export function listSystemProvisioning(): AnalystSystemProvisioning[] {
  return listOnboardingApplications()
    .map(buildSystemProvisioning)
    .filter((row): row is AnalystSystemProvisioning => row !== null);
}
