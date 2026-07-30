import type { DirectoryAnalyst } from "@/types/analysts/directory";
import type {
  AnalystReferralDashboardStats,
  AnalystReferralPartnershipStatus,
  AnalystReferralPerformanceSnapshot,
  AnalystReferralPlanBreakdown,
  AnalystReferralRecord,
  AnalystReferralTimelineEvent,
  AnalystReferralTimelineEventCategory,
  AnalystReferralTimelineEventType,
} from "@/types/analysts/referrals";
import { MOCK_DIRECTORY_ANALYSTS } from "@/lib/analysts/mock/directory-analysts";
import {
  emptyPlanBreakdown,
  sumPlanBreakdown,
} from "@/lib/analysts/format-referrals";

/**
 * Mock Analyst Referrals store — Wave E.
 * Owns referral identity, code/link, status, performance, and operational timeline.
 * Commission calculations intentionally absent (Wave F).
 *
 * TODO(NestJS): replace with GET /admin/analysts/referrals (+ mutations).
 * Timeline becomes append-only event stream from NestJS.
 */

function event(
  id: string,
  type: AnalystReferralTimelineEventType,
  category: AnalystReferralTimelineEventCategory,
  title: string,
  timestamp: string,
  description?: string,
  status: AnalystReferralTimelineEvent["status"] = "complete"
): AnalystReferralTimelineEvent {
  return { id, type, category, title, description, timestamp, status };
}

function tokenFromId(analystId: string): string {
  const raw = analystId.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
  return raw.slice(-5).padStart(5, "X");
}

function codeFromToken(token: string): string {
  return `REF-${token}`;
}

function linkFromToken(token: string): string {
  return `https://tradercity.co/r/${token}`;
}

function partnershipFromDirectory(
  status: DirectoryAnalyst["status"]
): AnalystReferralPartnershipStatus {
  if (status === "suspended") return "suspended";
  if (status === "closed") return "closed";
  if (status === "onboarding") return "onboarding";
  if (
    status === "under_review" ||
    status === "verification" ||
    status === "partnership_discussion"
  ) {
    return "onboarding";
  }
  return "active";
}

function buildRecord(
  row: DirectoryAnalyst,
  overrides: Partial<AnalystReferralRecord> = {}
): AnalystReferralRecord {
  const token = overrides.referralToken ?? tokenFromId(row.id);
  const planBreakdown = overrides.planBreakdown ?? emptyPlanBreakdown();
  const successful =
    overrides.successfulReferrals ?? sumPlanBreakdown(planBreakdown);
  const totalReferrals = overrides.totalReferrals ?? successful;

  const base: AnalystReferralRecord = {
    id: `aref-${row.id}`,
    analystId: row.id,
    displayName: row.displayName,
    handle: row.handle,
    email: row.email,
    avatarTone: row.avatarTone,
    referralCode: codeFromToken(token),
    referralToken: token,
    referralLink: linkFromToken(token),
    status: "enabled",
    partnershipStatus: partnershipFromDirectory(row.status),
    activationDate: row.partneredAt,
    provisionedAt: row.partneredAt,
    archived: false,
    archiveReason: null,
    totalReferrals,
    successfulReferrals: successful,
    activeVipMembers: overrides.activeVipMembers ?? successful,
    pendingConversions: overrides.pendingConversions ?? 0,
    planBreakdown,
    timeline: overrides.timeline ?? [],
    applicationId: null,
    commissionReady: true,
  };

  return {
    ...base,
    ...overrides,
    referralToken: token,
    referralCode: overrides.referralCode ?? codeFromToken(token),
    referralLink: overrides.referralLink ?? linkFromToken(token),
    planBreakdown: overrides.planBreakdown ?? planBreakdown,
    successfulReferrals: successful,
    totalReferrals,
    timeline: overrides.timeline ?? base.timeline,
    id: overrides.id ?? base.id,
  };
}

function plans(
  monthly: number,
  quarterly: number,
  yearly: number,
  lifetime: number
): AnalystReferralPlanBreakdown {
  return { monthly, quarterly, yearly, lifetime };
}

function buildInitialStore(): AnalystReferralRecord[] {
  const byId = (id: string) =>
    MOCK_DIRECTORY_ANALYSTS.find((a) => a.id === id)!;

  return [
    // Mixed membership conversions — top referring partner
    buildRecord(byId("a-002"), {
      referralToken: "A2FLOW",
      activationDate: "2025-06-05T10:00:00.000Z",
      provisionedAt: "2025-06-02T14:30:00.000Z",
      planBreakdown: plans(12, 5, 2, 1),
      totalReferrals: 28,
      successfulReferrals: 20,
      activeVipMembers: 18,
      pendingConversions: 3,
      timeline: [
        event(
          "tl-a002-1",
          "identity_created",
          "system",
          "Referral Identity Created",
          "2025-06-02T14:30:00.000Z",
          "Provisioned at partnership approval."
        ),
        event(
          "tl-a002-2",
          "referral_activated",
          "system",
          "Referral Activated",
          "2025-06-05T10:00:00.000Z",
          "Became available after successful system provisioning."
        ),
        event(
          "tl-a002-3",
          "first_registration",
          "member",
          "First Registration",
          "2025-06-12T16:20:00.000Z"
        ),
        event(
          "tl-a002-4",
          "first_vip_conversion",
          "conversion",
          "First VIP Conversion",
          "2025-06-18T11:05:00.000Z",
          "Monthly membership purchased."
        ),
        event(
          "tl-a002-5",
          "quarterly_purchased",
          "conversion",
          "Quarterly Membership Purchased",
          "2025-08-02T09:40:00.000Z"
        ),
        event(
          "tl-a002-6",
          "lifetime_purchased",
          "conversion",
          "Lifetime Membership Purchased",
          "2026-01-14T13:15:00.000Z"
        ),
        event(
          "tl-a002-7",
          "referral_milestone",
          "member",
          "Referral Milestone Reached",
          "2026-03-01T08:00:00.000Z",
          "20 successful referrals attributed."
        ),
      ],
    }),
    // Solid performer — matches sample lifecycle in docs
    buildRecord(byId("a-001"), {
      referralToken: "X7K82",
      activationDate: "2026-07-24T09:00:00.000Z",
      provisionedAt: "2026-07-24T08:00:00.000Z",
      planBreakdown: plans(6, 2, 1, 0),
      totalReferrals: 14,
      successfulReferrals: 9,
      activeVipMembers: 8,
      pendingConversions: 2,
      timeline: [
        event(
          "tl-a001-1",
          "identity_created",
          "system",
          "Referral Identity Created",
          "2026-07-24T08:00:00.000Z"
        ),
        event(
          "tl-a001-2",
          "referral_activated",
          "system",
          "Referral Activated",
          "2026-07-24T09:00:00.000Z",
          "Referral identity became available after successful system provisioning."
        ),
        event(
          "tl-a001-3",
          "first_registration",
          "member",
          "First Registration",
          "2026-07-26T14:20:00.000Z"
        ),
        event(
          "tl-a001-4",
          "first_vip_conversion",
          "conversion",
          "First VIP Conversion",
          "2026-07-28T10:35:00.000Z"
        ),
        event(
          "tl-a001-5",
          "quarterly_purchased",
          "conversion",
          "Quarterly Membership Purchased",
          "2026-08-02T11:10:00.000Z"
        ),
      ],
    }),
    // Growing partner with referrals
    buildRecord(byId("a-008"), {
      referralToken: "S8FRGE",
      activationDate: "2025-08-16T12:00:00.000Z",
      planBreakdown: plans(4, 3, 1, 0),
      totalReferrals: 11,
      successfulReferrals: 8,
      activeVipMembers: 7,
      pendingConversions: 1,
      timeline: [
        event(
          "tl-a008-1",
          "identity_created",
          "system",
          "Referral Identity Created",
          "2025-08-14T12:00:00.000Z"
        ),
        event(
          "tl-a008-2",
          "referral_activated",
          "system",
          "Referral Activated",
          "2025-08-16T12:00:00.000Z"
        ),
        event(
          "tl-a008-3",
          "first_registration",
          "member",
          "First Registration",
          "2025-08-22T09:00:00.000Z"
        ),
        event(
          "tl-a008-4",
          "yearly_purchased",
          "conversion",
          "Yearly Membership Purchased",
          "2025-09-04T15:30:00.000Z"
        ),
        event(
          "tl-a008-5",
          "new_registration",
          "member",
          "New Registration",
          "2026-02-11T18:45:00.000Z"
        ),
      ],
    }),
    // Analyst with no referrals — activated only
    buildRecord(byId("a-006"), {
      referralToken: "HZN06",
      activationDate: "2026-01-10T08:20:00.000Z",
      planBreakdown: emptyPlanBreakdown(),
      totalReferrals: 0,
      successfulReferrals: 0,
      activeVipMembers: 0,
      pendingConversions: 0,
      timeline: [
        event(
          "tl-a006-1",
          "identity_created",
          "system",
          "Referral Identity Created",
          "2026-01-08T08:20:00.000Z"
        ),
        event(
          "tl-a006-2",
          "referral_activated",
          "system",
          "Referral Activated",
          "2026-01-10T08:20:00.000Z",
          "No attributed registrations yet."
        ),
      ],
    }),
    // Newly activated — short history
    buildRecord(byId("a-010"), {
      referralToken: "VLT10",
      activationDate: "2026-07-20T11:00:00.000Z",
      provisionedAt: "2026-03-22T10:05:00.000Z",
      planBreakdown: plans(1, 0, 0, 0),
      totalReferrals: 2,
      successfulReferrals: 1,
      activeVipMembers: 1,
      pendingConversions: 1,
      timeline: [
        event(
          "tl-a010-1",
          "identity_created",
          "system",
          "Referral Identity Created",
          "2026-03-22T10:05:00.000Z"
        ),
        event(
          "tl-a010-2",
          "referral_activated",
          "system",
          "Referral Activated",
          "2026-07-20T11:00:00.000Z",
          "Activated after Operationally Ready."
        ),
        event(
          "tl-a010-3",
          "first_registration",
          "member",
          "First Registration",
          "2026-07-22T16:00:00.000Z"
        ),
        event(
          "tl-a010-4",
          "monthly_purchased",
          "conversion",
          "Monthly Membership Purchased",
          "2026-07-23T12:30:00.000Z",
          undefined,
          "current"
        ),
      ],
    }),
    // Mixed plans
    buildRecord(byId("a-012"), {
      referralToken: "BCN12",
      activationDate: "2026-02-20T15:25:00.000Z",
      planBreakdown: plans(3, 1, 2, 1),
      totalReferrals: 10,
      successfulReferrals: 7,
      activeVipMembers: 6,
      pendingConversions: 2,
      timeline: [
        event(
          "tl-a012-1",
          "identity_created",
          "system",
          "Referral Identity Created",
          "2026-02-18T15:25:00.000Z"
        ),
        event(
          "tl-a012-2",
          "referral_activated",
          "system",
          "Referral Activated",
          "2026-02-20T15:25:00.000Z"
        ),
        event(
          "tl-a012-3",
          "first_vip_conversion",
          "conversion",
          "First VIP Conversion",
          "2026-03-05T10:00:00.000Z"
        ),
        event(
          "tl-a012-4",
          "yearly_purchased",
          "conversion",
          "Yearly Membership Purchased",
          "2026-04-12T14:00:00.000Z"
        ),
        event(
          "tl-a012-5",
          "lifetime_purchased",
          "conversion",
          "Lifetime Membership Purchased",
          "2026-06-01T09:20:00.000Z"
        ),
      ],
    }),
    // Disabled referral (suspended partner)
    buildRecord(byId("a-005"), {
      referralToken: "EDG05",
      status: "disabled",
      partnershipStatus: "suspended",
      activationDate: "2025-09-22T16:45:00.000Z",
      planBreakdown: plans(2, 1, 0, 0),
      totalReferrals: 5,
      successfulReferrals: 3,
      activeVipMembers: 0,
      pendingConversions: 0,
      timeline: [
        event(
          "tl-a005-1",
          "identity_created",
          "system",
          "Referral Identity Created",
          "2025-09-20T16:45:00.000Z"
        ),
        event(
          "tl-a005-2",
          "referral_activated",
          "system",
          "Referral Activated",
          "2025-09-22T16:45:00.000Z"
        ),
        event(
          "tl-a005-3",
          "first_registration",
          "member",
          "First Registration",
          "2025-10-03T11:00:00.000Z"
        ),
        event(
          "tl-a005-4",
          "quarterly_purchased",
          "conversion",
          "Quarterly Membership Purchased",
          "2025-10-18T08:30:00.000Z"
        ),
        event(
          "tl-a005-5",
          "manually_disabled",
          "administrative",
          "Referral Manually Disabled",
          "2026-07-10T09:00:00.000Z",
          "Paused with partnership suspension.",
          "error"
        ),
      ],
    }),
    // Provisioned but not activated (onboarding Directory)
    buildRecord(byId("a-004"), {
      referralToken: "PRSM4",
      status: "disabled",
      partnershipStatus: "onboarding",
      activationDate: null,
      provisionedAt: "2026-07-01T11:00:00.000Z",
      planBreakdown: emptyPlanBreakdown(),
      totalReferrals: 0,
      successfulReferrals: 0,
      activeVipMembers: 0,
      pendingConversions: 0,
      timeline: [
        event(
          "tl-a004-1",
          "identity_created",
          "system",
          "Referral Identity Created",
          "2026-07-01T11:00:00.000Z",
          "Awaiting Operationally Ready before activation.",
          "current"
        ),
      ],
    }),
    // Archived / expired partnership
    buildRecord(byId("a-011"), {
      referralToken: "TIDE1",
      status: "disabled",
      partnershipStatus: "expired",
      archived: true,
      archiveReason: "expired_partnership",
      activationDate: "2024-12-05T09:00:00.000Z",
      planBreakdown: plans(2, 0, 1, 0),
      totalReferrals: 4,
      successfulReferrals: 3,
      activeVipMembers: 0,
      pendingConversions: 0,
      timeline: [
        event(
          "tl-a011-1",
          "identity_created",
          "system",
          "Referral Identity Created",
          "2024-12-01T09:00:00.000Z"
        ),
        event(
          "tl-a011-2",
          "referral_activated",
          "system",
          "Referral Activated",
          "2024-12-05T09:00:00.000Z"
        ),
        event(
          "tl-a011-3",
          "first_vip_conversion",
          "conversion",
          "First VIP Conversion",
          "2025-01-08T12:00:00.000Z"
        ),
        event(
          "tl-a011-4",
          "referral_disabled",
          "system",
          "Referral Disabled",
          "2025-11-01T10:00:00.000Z",
          "Partnership marked expired."
        ),
        event(
          "tl-a011-5",
          "referral_archived",
          "administrative",
          "Referral Archived",
          "2025-11-02T10:00:00.000Z",
          "Archived with expired partnership.",
          "error"
        ),
      ],
    }),
    // Wave B approval — provisioned, awaiting operational readiness
    buildRecord(byId("a-app-005"), {
      id: "aref-a-app-005",
      referralToken: "SOF05",
      status: "disabled",
      partnershipStatus: "onboarding",
      activationDate: null,
      provisionedAt: "2026-07-02T15:00:00.000Z",
      applicationId: "app-005",
      planBreakdown: emptyPlanBreakdown(),
      totalReferrals: 0,
      successfulReferrals: 0,
      activeVipMembers: 0,
      pendingConversions: 0,
      timeline: [
        event(
          "tl-app005-1",
          "identity_created",
          "system",
          "Referral Identity Created",
          "2026-07-02T15:00:00.000Z",
          "Provisioned at Approve · activates when Operationally Ready.",
          "current"
        ),
      ],
    }),
    // Wave B approval — activated after readiness
    buildRecord(byId("a-app-007"), {
      id: "aref-a-app-007",
      referralToken: "PRY07",
      status: "enabled",
      partnershipStatus: "active",
      activationDate: "2026-07-18T10:00:00.000Z",
      provisionedAt: "2026-05-20T09:00:00.000Z",
      applicationId: "app-007",
      planBreakdown: plans(2, 1, 0, 0),
      totalReferrals: 4,
      successfulReferrals: 3,
      activeVipMembers: 3,
      pendingConversions: 1,
      timeline: [
        event(
          "tl-app007-1",
          "identity_created",
          "system",
          "Referral Identity Created",
          "2026-05-20T09:00:00.000Z"
        ),
        event(
          "tl-app007-2",
          "referral_activated",
          "system",
          "Referral Activated",
          "2026-07-18T10:00:00.000Z",
          "Activated after Operationally Ready."
        ),
        event(
          "tl-app007-3",
          "first_registration",
          "member",
          "First Registration",
          "2026-07-19T13:00:00.000Z"
        ),
        event(
          "tl-app007-4",
          "first_vip_conversion",
          "conversion",
          "First VIP Conversion",
          "2026-07-21T09:45:00.000Z"
        ),
        event(
          "tl-app007-5",
          "quarterly_purchased",
          "conversion",
          "Quarterly Membership Purchased",
          "2026-07-22T17:00:00.000Z"
        ),
      ],
    }),
  ];
}

let STORE: AnalystReferralRecord[] = buildInitialStore();

function clone(row: AnalystReferralRecord): AnalystReferralRecord {
  return {
    ...row,
    planBreakdown: { ...row.planBreakdown },
    timeline: row.timeline.map((entry) => ({ ...entry })),
  };
}

/** Append a timeline event (oldest → newest). Used by mock mutations / NestJS later. */
export function appendAnalystReferralTimelineEvent(
  analystOrRecordId: string,
  entry: Omit<AnalystReferralTimelineEvent, "id"> & { id?: string }
): AnalystReferralRecord | undefined {
  const current = STORE.find(
    (r) => r.id === analystOrRecordId || r.analystId === analystOrRecordId
  );
  if (!current) return undefined;
  const nextEvent: AnalystReferralTimelineEvent = {
    id: entry.id ?? `tl-${current.analystId}-${Date.now()}`,
    type: entry.type,
    category: entry.category,
    title: entry.title,
    description: entry.description,
    timestamp: entry.timestamp,
    status: entry.status ?? "complete",
  };
  current.timeline = [...current.timeline, nextEvent];
  return clone(current);
}

export function listMockAnalystReferrals(): AnalystReferralRecord[] {
  return STORE.map(clone);
}

export function listActiveMockAnalystReferrals(): AnalystReferralRecord[] {
  return STORE.filter((r) => !r.archived).map(clone);
}

export function listArchivedMockAnalystReferrals(): AnalystReferralRecord[] {
  return STORE.filter(
    (r) =>
      r.archived ||
      r.archiveReason === "expired_partnership" ||
      r.partnershipStatus === "expired" ||
      r.partnershipStatus === "closed"
  ).map(clone);
}

export function getMockAnalystReferral(
  id: string
): AnalystReferralRecord | undefined {
  const row = STORE.find((r) => r.id === id);
  return row ? clone(row) : undefined;
}

export function getMockAnalystReferralByAnalystId(
  analystId: string
): AnalystReferralRecord | undefined {
  const row = STORE.find((r) => r.analystId === analystId);
  return row ? clone(row) : undefined;
}

export function upsertMockAnalystReferral(
  record: AnalystReferralRecord
): AnalystReferralRecord {
  const idx = STORE.findIndex(
    (r) => r.id === record.id || r.analystId === record.analystId
  );
  const next = clone(record);
  if (idx >= 0) {
    STORE[idx] = next;
  } else {
    STORE.unshift(next);
  }
  return clone(next);
}

/**
 * Provision referral identity at partnership birth (Approve).
 * Remains Disabled / not activated until Operationally Ready.
 */
export function provisionAnalystReferralIdentity(input: {
  analystId: string;
  displayName: string;
  handle: string;
  email: string;
  avatarTone: DirectoryAnalyst["avatarTone"];
  applicationId: string | null;
  provisionedAt?: string;
}): AnalystReferralRecord {
  const existing = getMockAnalystReferralByAnalystId(input.analystId);
  if (existing) return existing;

  const provisionedAt = input.provisionedAt ?? new Date().toISOString();
  const token = tokenFromId(input.analystId);
  const record: AnalystReferralRecord = {
    id: `aref-${input.analystId}`,
    analystId: input.analystId,
    displayName: input.displayName,
    handle: input.handle,
    email: input.email,
    avatarTone: input.avatarTone,
    referralCode: codeFromToken(token),
    referralToken: token,
    referralLink: linkFromToken(token),
    status: "disabled",
    partnershipStatus: "onboarding",
    activationDate: null,
    provisionedAt,
    archived: false,
    archiveReason: null,
    totalReferrals: 0,
    successfulReferrals: 0,
    activeVipMembers: 0,
    pendingConversions: 0,
    planBreakdown: emptyPlanBreakdown(),
    timeline: [
      event(
        `tl-${input.analystId}-created`,
        "identity_created",
        "system",
        "Referral Identity Created",
        provisionedAt,
        "Provisioned at partnership approval · activates when Operationally Ready.",
        "current"
      ),
    ],
    applicationId: input.applicationId,
    commissionReady: true,
  };
  return upsertMockAnalystReferral(record);
}

/**
 * Activate referral after Operationally Ready (Wave D complete).
 */
export function activateAnalystReferralIdentity(
  analystId: string,
  activatedAt: string = new Date().toISOString()
): AnalystReferralRecord | undefined {
  const current = STORE.find((r) => r.analystId === analystId);
  if (!current) return undefined;
  const alreadyActivated = Boolean(current.activationDate);
  current.status = "enabled";
  current.activationDate = current.activationDate ?? activatedAt;
  current.partnershipStatus =
    current.partnershipStatus === "onboarding"
      ? "active"
      : current.partnershipStatus;
  current.archived = false;
  current.archiveReason = null;
  if (!alreadyActivated) {
    current.timeline = [
      ...current.timeline,
      event(
        `tl-${analystId}-activated-${activatedAt}`,
        "referral_activated",
        "system",
        "Referral Activated",
        activatedAt,
        "Referral identity became available after successful system provisioning."
      ),
    ];
  }
  return clone(current);
}

export function computeAnalystReferralStats(
  rows: AnalystReferralRecord[]
): AnalystReferralDashboardStats {
  const active = rows.filter((r) => !r.archived);
  return {
    totalAnalysts: active.length,
    referralEnabled: active.filter((r) => r.status === "enabled").length,
    referralDisabled: active.filter((r) => r.status === "disabled").length,
    totalReferralsGenerated: active.reduce((n, r) => n + r.totalReferrals, 0),
    successfulReferrals: active.reduce((n, r) => n + r.successfulReferrals, 0),
    vipConversions: active.reduce((n, r) => n + r.activeVipMembers, 0),
    /** Display hint — amounts live in Commission domain (Wave F). */
    pendingCommissionLabel: "See Commission",
  };
}

export function computeAnalystReferralPerformance(
  rows: AnalystReferralRecord[]
): AnalystReferralPerformanceSnapshot {
  const active = rows.filter((r) => !r.archived);
  const bySuccessful = [...active].sort(
    (a, b) => b.successfulReferrals - a.successfulReferrals
  );
  const withSuccess = active
    .filter((r) => r.successfulReferrals > 0)
    .sort((a, b) => {
      const da = a.activationDate ?? a.provisionedAt;
      const db = b.activationDate ?? b.provisionedAt;
      return db.localeCompare(da);
    });
  const recentlyActivated = active
    .filter((r) => r.activationDate)
    .sort((a, b) => (b.activationDate ?? "").localeCompare(a.activationDate ?? ""))
    .slice(0, 5);
  const disabledCodes = active.filter((r) => r.status === "disabled");
  const withoutReferrals = active.filter(
    (r) => r.status === "enabled" && r.totalReferrals === 0
  );

  return {
    topReferring: bySuccessful.slice(0, 5),
    recentSuccessful: withSuccess.slice(0, 5),
    recentlyActivated,
    disabledCodes: disabledCodes.slice(0, 8),
    withoutReferrals: withoutReferrals.slice(0, 8),
  };
}
