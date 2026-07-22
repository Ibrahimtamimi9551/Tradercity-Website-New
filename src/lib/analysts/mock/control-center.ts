import { MOCK_DIRECTORY_ANALYSTS } from "@/lib/analysts/mock/directory-analysts";
import type {
  AnalystActivityStatus,
  AnalystControlCenter,
  AnalystLifecycleStage,
} from "@/types/analysts/control-center";
import type { AnalystLifecycleStatus } from "@/types/analysts/directory";

/**
 * Mock Analyst Control Center projections — UI-only until NestJS.
 * TODO(NestJS): replace with GET /admin/analysts/:id
 */

const ACTIVITY_BY_ID: Record<string, AnalystActivityStatus> = {
  "a-001": "active_today",
  "a-002": "active",
  "a-003": "quiet",
  "a-004": "active",
  "a-005": "critical",
  "a-006": "active_today",
  "a-007": "inactive",
  "a-008": "active",
  "a-009": "quiet",
  "a-010": "active",
  "a-011": "critical",
  "a-012": "active_today",
};

const SUMMARY_BY_STATUS: Record<AnalystLifecycleStatus, string> = {
  under_review: "Application under evaluation. Awaiting structured scorecard completion.",
  verification: "Verification in progress. Confirm identity intent via text channels.",
  partnership_discussion: "Mutual-fit discussion open. Publishing expectations not finalized.",
  onboarding: "Onboarding checklist in progress. Discord Analyst role not yet assigned.",
  active: "Healthy partnership. Publishing consistently. Discord synchronized. No operational issues.",
  growing: "Strong growth trajectory. Merit signals improving. Monitor publishing cadence.",
  suspended: "Partnership suspended. Review Administration tab before reactivation.",
  closed: "Partnership closed. History retained for audit. No active operations.",
};

function buildLifecycleStages(status: AnalystLifecycleStatus): AnalystLifecycleStage[] {
  const order = [
    "application",
    "verification",
    "partnership",
    "agreement",
    "onboarding",
    "active",
    "growing",
  ] as const;

  const currentIndex: Record<AnalystLifecycleStatus, number> = {
    under_review: 0,
    verification: 1,
    partnership_discussion: 2,
    onboarding: 4,
    active: 5,
    growing: 6,
    suspended: 5,
    closed: 5,
  };

  const idx = currentIndex[status];

  const labels: Record<(typeof order)[number], string> = {
    application: "Application",
    verification: "Verification",
    partnership: "Partnership",
    agreement: "Agreement",
    onboarding: "Onboarding",
    active: "Active",
    growing: "Growing",
  };

  return order.map((id, i) => ({
    id,
    label: labels[id],
    state: i < idx ? "complete" : i === idx ? "current" : "upcoming",
  }));
}

function enrich(id: string): AnalystControlCenter | undefined {
  const row = MOCK_DIRECTORY_ANALYSTS.find((a) => a.id === id);
  if (!row) return undefined;

  const activityStatus = ACTIVITY_BY_ID[id] ?? "quiet";

  return {
    ...row,
    activityStatus,
    lastActivityAt:
      activityStatus === "active_today"
        ? "2026-07-23T08:12:00"
        : activityStatus === "active"
          ? "2026-07-20T14:00:00"
          : activityStatus === "quiet"
            ? "2026-07-18T11:30:00"
            : activityStatus === "inactive"
              ? "2026-07-14T09:00:00"
              : "2026-07-08T16:45:00",
    operationalSummary: SUMMARY_BY_STATUS[row.status],
    stats: {
      reportsPublished: row.status === "growing" || row.tier === "top_partner" ? 28 : 12,
      lessons: row.tier === "top_partner" ? 16 : 6,
      communitySize: row.reachFollowers,
      commissionEarned:
        row.tier === "top_partner" ? "$4,820" : row.tier === "growing" ? "$2,140" : "$680",
      memberReferrals: row.tier === "top_partner" ? 41 : 14,
      recentActivityLabel:
        activityStatus === "active_today"
          ? "Published report · today"
          : activityStatus === "critical"
            ? "No activity · 15 days"
            : "Last Discord message · 3 days ago",
    },
    lifecycleStages: buildLifecycleStages(row.status),
    discord: {
      account: `${row.handle}`,
      currentRole:
        row.status === "active" || row.status === "growing"
          ? "Analyst"
          : row.status === "suspended"
            ? "None (removed)"
            : "Pending",
      lastSync: "2026-07-22T19:40:00",
      roleStatus:
        row.status === "active" || row.status === "growing"
          ? "Synced"
          : row.status === "suspended"
            ? "Role removed"
            : "Not assigned",
    },
    notes:
      row.id === "a-005"
        ? [
            {
              id: "n-001",
              body: "Publishing cadence dropped below partnership standard. Warning issued 2026-07-10.",
              author: "Ops Admin",
              createdAt: "2026-07-10T12:00:00",
            },
            {
              id: "n-002",
              body: "Suspended pending performance review. Await Discord + content response.",
              author: "Ops Admin",
              createdAt: "2026-07-18T09:30:00",
            },
          ]
        : row.id === "a-002"
          ? [
              {
                id: "n-003",
                body: "Top Partner candidate — consistent research quality and strong referrals.",
                author: "Partnership Lead",
                createdAt: "2026-06-01T10:15:00",
              },
            ]
          : [
              {
                id: "n-000",
                body: "Initial partnership note. Monitor onboarding and first publishing cycle.",
                author: "Ops Admin",
                createdAt: row.partneredAt,
              },
            ],
  };
}

const CACHE = new Map<string, AnalystControlCenter>();

export function getAnalystControlCenter(id: string): AnalystControlCenter | undefined {
  if (!CACHE.has(id)) {
    const built = enrich(id);
    if (built) CACHE.set(id, built);
  }
  return CACHE.get(id);
}

/** Mock-only mutation helper for Suspend flow UI. */
export function mockSuspendAnalyst(
  id: string,
  notes: string
): AnalystControlCenter | undefined {
  const current = getAnalystControlCenter(id);
  if (!current) return undefined;

  const directoryRow = MOCK_DIRECTORY_ANALYSTS.find((a) => a.id === id);
  if (directoryRow) {
    directoryRow.status = "suspended";
    directoryRow.systemHealth = "action_required";
  }

  const next: AnalystControlCenter = {
    ...current,
    status: "suspended",
    systemHealth: "action_required",
    operationalSummary: SUMMARY_BY_STATUS.suspended,
    discord: {
      ...current.discord,
      currentRole: "None (removed)",
      roleStatus: "Role removed",
    },
    lifecycleStages: buildLifecycleStages("suspended"),
    notes: [
      {
        id: `n-suspend-${Date.now()}`,
        body: notes.trim() || "Partnership suspended via Control Center Administration.",
        author: "Ops Admin",
        createdAt: new Date().toISOString(),
      },
      ...current.notes,
    ],
  };

  CACHE.set(id, next);
  return next;
}

export function mockAddAnalystNote(
  id: string,
  body: string
): AnalystControlCenter | undefined {
  const current = getAnalystControlCenter(id);
  if (!current || !body.trim()) return current;

  const next: AnalystControlCenter = {
    ...current,
    notes: [
      {
        id: `n-${Date.now()}`,
        body: body.trim(),
        author: "Ops Admin",
        createdAt: new Date().toISOString(),
      },
      ...current.notes,
    ],
  };
  CACHE.set(id, next);
  return next;
}
