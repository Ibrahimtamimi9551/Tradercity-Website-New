import type {
  AnalystApplication,
  ApplicationDashboardStats,
  CategoryEvaluation,
  EvaluationCategoryId,
} from "@/types/analysts/applications";
import {
  EVALUATION_CATEGORIES,
  computeOverallScore,
} from "@/types/analysts/applications";

function emptyEvaluation(
  partial?: Partial<Record<EvaluationCategoryId, { rating: number; notes?: string }>>
): CategoryEvaluation[] {
  const reviewer = "Admin Ibrahim";
  const now = "2026-07-20T14:00:00.000Z";
  return EVALUATION_CATEGORIES.map(({ id }) => {
    const filled = partial?.[id];
    if (!filled) {
      return {
        categoryId: id,
        rating: null,
        notes: "",
        reviewer: null,
        updatedAt: null,
      };
    }
    return {
      categoryId: id,
      rating: filled.rating,
      notes: filled.notes ?? "",
      reviewer,
      updatedAt: now,
    };
  });
}

/**
 * Mock partnership applications for Wave B — mirrors Analyst Application Form sections.
 * TODO(NestJS): replace with authenticated applications API.
 */
export const MOCK_ANALYST_APPLICATIONS: AnalystApplication[] = [
  {
    id: "app-001",
    email: "maya.chen@example.com",
    avatarTone: "violet",
    appliedAt: "2026-07-22T09:15:00.000Z",
    status: "new",
    archived: false,
    overallScore: null,
    analystName: "Maya Chen",
    shortBio:
      "BTC macro and derivatives educator. Weekly regime notes for intermediate traders.",
    yearsOfExperience: "5–7 years",
    primaryMarkets: ["crypto", "macro"],
    xHandle: "@mayacharts",
    discordUsername: "mayacharts#2041",
    tradingDuration: "7 years",
    primaryTradingStyle: "swing",
    publicTrackRecordUrl: "https://www.tradingview.com/u/mayacharts/",
    tradingWebsite: "https://mayacharts.example",
    primaryAudiencePlatform: "x",
    totalAudienceSize: "10k–25k",
    socialLinks: [
      { id: "s1", label: "X", href: "https://twitter.com/mayacharts" },
      { id: "s2", label: "Telegram", href: "https://t.me/mayacharts" },
      { id: "s3", label: "YouTube", href: "https://youtube.com/@mayacharts" },
    ],
    audienceWebsite: "https://mayacharts.example",
    bestAnalysis: {
      kind: "link",
      label: "BTC regime thread",
      href: "https://example.com/maya-btc-thread",
    },
    bestEducational: {
      kind: "file",
      label: "Research sample.pdf",
      href: "https://example.com/maya-research.pdf",
    },
    motivation:
      "Want infrastructure for research distribution and aligned member acquisition without building a standalone product.",
    evaluation: emptyEvaluation(),
    verificationState: "pending",
    verificationNotes: "",
    internalNotes: "",
    interviewNotes: "",
    stageRating: null,
    decisionReason: null,
    decisionAt: null,
    partnershipHandoff: null,
  },
  {
    id: "app-002",
    email: "jonah.ok@example.com",
    avatarTone: "emerald",
    appliedAt: "2026-07-18T16:40:00.000Z",
    status: "under_review",
    archived: false,
    overallScore: null,
    analystName: "Jonah Okonkwo",
    shortBio: "On-chain and narrative researcher. Member-friendly ETF flow explainers.",
    yearsOfExperience: "3–5 years",
    primaryMarkets: ["crypto"],
    xHandle: "@jonahflows",
    discordUsername: "jonahflows#8812",
    tradingDuration: "5 years",
    primaryTradingStyle: "position",
    publicTrackRecordUrl: "https://www.tradingview.com/u/jonahflows/",
    tradingWebsite: "https://jonahflows.example",
    primaryAudiencePlatform: "multi_platform",
    totalAudienceSize: "5k–10k",
    socialLinks: [
      { id: "s1", label: "X", href: "https://twitter.com/jonahflows" },
      { id: "s2", label: "Telegram", href: "https://t.me/jonahflows" },
    ],
    audienceWebsite: null,
    bestAnalysis: {
      kind: "link",
      label: "Narrative cycle brief",
      href: "https://example.com/jonah-brief",
    },
    bestEducational: {
      kind: "file",
      label: "Sample brief.md",
      href: "https://example.com/jonah-brief.md",
    },
    motivation: "Prefer partnership over launching a paid newsletter alone.",
    evaluation: emptyEvaluation({
      identity: { rating: 8, notes: "Consistent public identity across platforms." },
      trading_knowledge: { rating: 8 },
      research_quality: { rating: 7, notes: "Clear writing; depth varies by week." },
      education_ability: { rating: 8 },
      communication: { rating: 9 },
      professionalism: { rating: 8 },
      social_presence: { rating: 7 },
      community: { rating: 7 },
      brand_compatibility: { rating: 9, notes: "Strong fit with TraderCity tone." },
      long_term_potential: { rating: 8 },
    }),
    verificationState: "verified",
    verificationNotes:
      "Identity confirmed via LinkedIn + prior conference appearance. Intent: long-term partnership.",
    internalNotes: "Strong writer. Pair with macro desk for co-publishing pilots.",
    interviewNotes:
      "Discussed publishing cadence (2×/week). Comfortable with community standards.",
    stageRating: 4,
    decisionReason: null,
    decisionAt: null,
    partnershipHandoff: null,
  },
  {
    id: "app-003",
    email: "elena.varga@example.com",
    avatarTone: "amber",
    appliedAt: "2026-07-12T11:05:00.000Z",
    status: "pending_information",
    archived: false,
    overallScore: 62,
    analystName: "Elena Varga",
    shortBio: "Relative strength and sector rotation notes for altseason.",
    yearsOfExperience: "3–5 years",
    primaryMarkets: ["crypto", "stocks"],
    xHandle: "@elenavolta",
    discordUsername: null,
    tradingDuration: "4 years",
    primaryTradingStyle: "swing",
    publicTrackRecordUrl: "https://www.tradingview.com/u/elenavolta/",
    tradingWebsite: null,
    primaryAudiencePlatform: "x",
    totalAudienceSize: "1k–5k",
    socialLinks: [
      { id: "s1", label: "X", href: "https://twitter.com/elenavolta" },
      { id: "s2", label: "TradingView", href: "https://www.tradingview.com/u/elenavolta/" },
    ],
    audienceWebsite: null,
    bestAnalysis: null,
    bestEducational: null,
    motivation: "Need distribution and credibility scaffold.",
    evaluation: emptyEvaluation({
      identity: { rating: 6, notes: "Thin public footprint." },
      trading_knowledge: { rating: 7 },
      research_quality: { rating: 6 },
      education_ability: { rating: 6 },
      communication: { rating: 7 },
      professionalism: { rating: 7 },
      social_presence: { rating: 5 },
      community: { rating: 5 },
      brand_compatibility: { rating: 7 },
      long_term_potential: { rating: 6 },
    }),
    verificationState: "concerns",
    verificationNotes: "Need portfolio samples and clearer identity trail.",
    internalNotes: "Promising RS framing but incomplete evidence package.",
    interviewNotes: "Requested: 3 research samples + community guidelines acknowledgement.",
    stageRating: 3,
    decisionReason: "Incomplete content package — awaiting samples.",
    decisionAt: "2026-07-14T10:00:00.000Z",
    partnershipHandoff: null,
  },
  {
    id: "app-004",
    email: "chris.patel@example.com",
    avatarTone: "sky",
    appliedAt: "2026-07-08T08:20:00.000Z",
    status: "under_review",
    archived: false,
    overallScore: null,
    analystName: "Chris Patel",
    shortBio: "Intraday liquidity educator with a recorded lesson library.",
    yearsOfExperience: "7–10 years",
    primaryMarkets: ["crypto", "forex"],
    xHandle: "@chrislevels",
    discordUsername: "chrislevels#1100",
    tradingDuration: "9 years",
    primaryTradingStyle: "intraday",
    publicTrackRecordUrl: "https://www.tradingview.com/u/chrislevels/",
    tradingWebsite: "https://chrislevels.example",
    primaryAudiencePlatform: "youtube",
    totalAudienceSize: "25k+",
    socialLinks: [
      { id: "s1", label: "YouTube", href: "https://youtube.com/@chrislevels" },
      { id: "s2", label: "X", href: "https://twitter.com/chrislevels" },
      { id: "s3", label: "Telegram", href: "https://t.me/chrislevels" },
    ],
    audienceWebsite: "https://chrislevels.example",
    bestAnalysis: {
      kind: "link",
      label: "Session liquidity playbook",
      href: "https://example.com/chris-liquidity",
    },
    bestEducational: {
      kind: "file",
      label: "Lesson outline.pdf",
      href: "https://example.com/chris-outline.pdf",
    },
    motivation: "Want premium community distribution without building billing stack.",
    evaluation: emptyEvaluation({
      identity: { rating: 9 },
      trading_knowledge: { rating: 9 },
      research_quality: { rating: 8 },
      education_ability: { rating: 10, notes: "Exceptional teaching clarity." },
      communication: { rating: 9 },
      professionalism: { rating: 9 },
      social_presence: { rating: 9 },
      community: { rating: 8 },
      brand_compatibility: { rating: 8 },
      long_term_potential: { rating: 9 },
    }),
    verificationState: "verified",
    verificationNotes: "Verified via YouTube channel age + prior TC spaces guest.",
    internalNotes: "Likely fast-track after partnership discussion.",
    interviewNotes: "",
    stageRating: 5,
    decisionReason: null,
    decisionAt: null,
    partnershipHandoff: null,
  },
  {
    id: "app-005",
    email: "sofia.almeida@example.com",
    avatarTone: "rose",
    appliedAt: "2026-06-28T13:50:00.000Z",
    status: "approved",
    archived: false,
    overallScore: 88,
    analystName: "Sofia Almeida",
    shortBio: "Cross-asset macro weekly and policy calendar briefs.",
    yearsOfExperience: "5–7 years",
    primaryMarkets: ["macro", "multi_asset"],
    xHandle: "@sofiamacro",
    discordUsername: null,
    tradingDuration: "6 years",
    primaryTradingStyle: "macro",
    publicTrackRecordUrl: "https://www.tradingview.com/u/sofiamacro/",
    tradingWebsite: "https://sofiamacro.example",
    primaryAudiencePlatform: "x",
    totalAudienceSize: "10k–25k",
    socialLinks: [
      { id: "s1", label: "X", href: "https://twitter.com/sofiamacro" },
      { id: "s2", label: "YouTube", href: "https://youtube.com/@sofiamacro" },
    ],
    audienceWebsite: "https://sofiamacro.example",
    bestAnalysis: {
      kind: "file",
      label: "Sample weekly.pdf",
      href: "https://example.com/sofia-weekly.pdf",
    },
    bestEducational: {
      kind: "link",
      label: "Policy calendar explainer",
      href: "https://example.com/sofia-policy",
    },
    motivation: "Aligned incentives with TraderCity member base.",
    evaluation: emptyEvaluation({
      identity: { rating: 9 },
      trading_knowledge: { rating: 9 },
      research_quality: { rating: 9 },
      education_ability: { rating: 8 },
      communication: { rating: 9 },
      professionalism: { rating: 10 },
      social_presence: { rating: 8 },
      community: { rating: 8 },
      brand_compatibility: { rating: 9 },
      long_term_potential: { rating: 9 },
    }),
    verificationState: "verified",
    verificationNotes: "Cleared. Proceed to Discord prep / Control Center.",
    internalNotes: "Approved — partnership handoff ready for Wave C.",
    interviewNotes: "Aligned on cadence and ethics. Commission model accepted in principle.",
    stageRating: 5,
    decisionReason: null,
    decisionAt: "2026-07-02T15:00:00.000Z",
    partnershipHandoff: {
      analystId: "a-app-005",
      createdAt: "2026-07-02T15:00:00.000Z",
      discordPrepStatus: "record_created",
      controlCenterPath: "/admin/analysts/a-app-005",
      directoryCreated: true,
      discordRecordId: "adisc-a-app-005",
      referralRecordId: "aref-a-app-005",
      referralReserved: true,
    },
  },
  {
    id: "app-006",
    email: "derek.holt@example.com",
    avatarTone: "discord",
    appliedAt: "2026-06-10T19:00:00.000Z",
    status: "rejected",
    archived: true,
    overallScore: 41,
    analystName: "Derek Holt",
    shortBio: "Alt signal group operator seeking distribution.",
    yearsOfExperience: "1–3 years",
    primaryMarkets: ["crypto"],
    xHandle: "@dereksignals",
    discordUsername: null,
    tradingDuration: "3 years",
    primaryTradingStyle: "scalping",
    publicTrackRecordUrl: null,
    tradingWebsite: null,
    primaryAudiencePlatform: "telegram",
    totalAudienceSize: "1k–5k",
    socialLinks: [
      { id: "s1", label: "Telegram", href: "https://t.me/dereksignals" },
      { id: "s2", label: "X", href: "https://twitter.com/dereksignals" },
    ],
    audienceWebsite: null,
    bestAnalysis: null,
    bestEducational: null,
    motivation: "Want TC distribution for signals.",
    evaluation: emptyEvaluation({
      identity: { rating: 4 },
      trading_knowledge: { rating: 5 },
      research_quality: { rating: 3 },
      education_ability: { rating: 3 },
      communication: { rating: 5 },
      professionalism: { rating: 4 },
      social_presence: { rating: 5 },
      community: { rating: 4 },
      brand_compatibility: {
        rating: 2,
        notes: "Signal-seller model conflicts with TC philosophy.",
      },
      long_term_potential: { rating: 6 },
    }),
    verificationState: "concerns",
    verificationNotes: "Brand mismatch — signal product orientation.",
    internalNotes: "Rejected — not a research/education partner fit.",
    interviewNotes: "Declined interview after initial scorecard.",
    stageRating: 1,
    decisionReason: "Brand incompatibility — signal-seller model.",
    decisionAt: "2026-06-12T12:00:00.000Z",
    partnershipHandoff: null,
  },
  {
    id: "app-007",
    email: "priya.nair@example.com",
    avatarTone: "violet",
    appliedAt: "2026-05-02T10:00:00.000Z",
    status: "approved",
    archived: true,
    overallScore: 85,
    analystName: "Priya Nair",
    shortBio: "On-chain stablecoin flow explainers and data journalism.",
    yearsOfExperience: "5–7 years",
    primaryMarkets: ["crypto"],
    xHandle: "@priyaonchain",
    discordUsername: null,
    tradingDuration: "5 years",
    primaryTradingStyle: "other",
    publicTrackRecordUrl: null,
    tradingWebsite: "https://priyaonchain.example",
    primaryAudiencePlatform: "x",
    totalAudienceSize: "5k–10k",
    socialLinks: [
      { id: "s1", label: "X", href: "https://twitter.com/priyaonchain" },
      { id: "s2", label: "Website", href: "https://priyaonchain.example" },
    ],
    audienceWebsite: "https://priyaonchain.example",
    bestAnalysis: {
      kind: "file",
      label: "Bylines.zip",
      href: "https://example.com/priya-bylines.zip",
    },
    bestEducational: {
      kind: "link",
      label: "Stablecoin explainer",
      href: "https://example.com/priya-stablecoin",
    },
    motivation: "Earlier cohort applicant (archived sample).",
    evaluation: emptyEvaluation({
      identity: { rating: 9 },
      trading_knowledge: { rating: 8 },
      research_quality: { rating: 9 },
      education_ability: { rating: 8 },
      communication: { rating: 9 },
      professionalism: { rating: 9 },
      social_presence: { rating: 7 },
      community: { rating: 7 },
      brand_compatibility: { rating: 9 },
      long_term_potential: { rating: 10 },
    }),
    verificationState: "verified",
    verificationNotes: "Historical archive — progressed in prior mock cohort.",
    internalNotes: "Archive sample for Wave B Archive view.",
    interviewNotes: "Completed.",
    stageRating: 5,
    decisionReason: null,
    decisionAt: "2026-05-20T09:00:00.000Z",
    partnershipHandoff: {
      analystId: "a-app-007",
      createdAt: "2026-05-20T09:00:00.000Z",
      discordPrepStatus: "record_created",
      controlCenterPath: "/admin/analysts/a-app-007",
      directoryCreated: true,
      discordRecordId: "adisc-a-app-007",
      referralRecordId: "aref-a-app-007",
      referralReserved: true,
    },
  },
  {
    id: "app-008",
    email: "marcus.webb@example.com",
    avatarTone: "emerald",
    appliedAt: "2026-07-21T07:30:00.000Z",
    status: "new",
    archived: false,
    overallScore: null,
    analystName: "Marcus Webb",
    shortBio: "Range and mean-reversion educator for intermediate traders.",
    yearsOfExperience: "7–10 years",
    primaryMarkets: ["crypto", "forex"],
    xHandle: "@marcusrange",
    discordUsername: null,
    tradingDuration: "8 years",
    primaryTradingStyle: "swing",
    publicTrackRecordUrl: "https://www.tradingview.com/u/marcusrange/",
    tradingWebsite: "https://marcusrange.example",
    primaryAudiencePlatform: "multi_platform",
    totalAudienceSize: "5k–10k",
    socialLinks: [
      { id: "s1", label: "X", href: "https://twitter.com/marcusrange" },
      { id: "s2", label: "YouTube", href: "https://youtube.com/@marcusrange" },
      { id: "s3", label: "Telegram", href: "https://t.me/marcusrange" },
    ],
    audienceWebsite: "https://marcusrange.example",
    bestAnalysis: {
      kind: "file",
      label: "Playbook.pdf",
      href: "https://example.com/marcus-playbook.pdf",
    },
    bestEducational: {
      kind: "link",
      label: "Workshop recording",
      href: "https://example.com/marcus-workshop",
    },
    motivation: "Seeking serious partner platform vs Discord-only teaching.",
    evaluation: emptyEvaluation(),
    verificationState: "pending",
    verificationNotes: "",
    internalNotes: "",
    interviewNotes: "",
    stageRating: null,
    decisionReason: null,
    decisionAt: null,
    partnershipHandoff: null,
  },
];

function cloneApp(app: AnalystApplication): AnalystApplication {
  return {
    ...app,
    primaryMarkets: [...app.primaryMarkets],
    socialLinks: app.socialLinks.map((l) => ({ ...l })),
    bestAnalysis: app.bestAnalysis ? { ...app.bestAnalysis } : null,
    bestEducational: app.bestEducational ? { ...app.bestEducational } : null,
    evaluation: app.evaluation.map((c) => ({ ...c })),
    partnershipHandoff: app.partnershipHandoff ? { ...app.partnershipHandoff } : null,
    overallScore: app.overallScore ?? computeOverallScore(app.evaluation),
  };
}

const PUBLIC_APPS_STORAGE_KEY = "tc.dev.publicAnalystApplications";

function readPersistedPublicApps(): AnalystApplication[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(PUBLIC_APPS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as AnalystApplication[];
    return Array.isArray(parsed) ? parsed.map(cloneApp) : [];
  } catch {
    return [];
  }
}

function persistPublicApps(store: AnalystApplication[]): void {
  if (typeof window === "undefined") return;
  const publicApps = store.filter((app) => app.id.startsWith("app-public-"));
  window.localStorage.setItem(PUBLIC_APPS_STORAGE_KEY, JSON.stringify(publicApps));
}

function buildInitialStore(): AnalystApplication[] {
  const seed = MOCK_ANALYST_APPLICATIONS.map(cloneApp);
  const persisted = readPersistedPublicApps();
  const seedIds = new Set(seed.map((a) => a.id));
  const extras = persisted.filter((a) => !seedIds.has(a.id));
  return [...extras, ...seed];
}

/** Mutable working copy for mock decisions / evaluation edits in-session. */
let applicationStore: AnalystApplication[] = buildInitialStore();
let hydratedFromStorage = typeof window !== "undefined";

/** Re-merge localStorage public apps after SSR-created empty store (client only). */
function ensureClientHydration(): void {
  if (hydratedFromStorage || typeof window === "undefined") return;
  applicationStore = buildInitialStore();
  hydratedFromStorage = true;
}

type StoreListener = () => void;
const storeListeners = new Set<StoreListener>();

function notifyApplicationStore(): void {
  storeListeners.forEach((listener) => listener());
}

/** Subscribe to in-memory mock store mutations (create / replace). */
export function subscribeApplicationStore(listener: StoreListener): () => void {
  storeListeners.add(listener);
  return () => {
    storeListeners.delete(listener);
  };
}

export function listMockApplications(): AnalystApplication[] {
  ensureClientHydration();
  return applicationStore;
}

export function getMockApplication(id: string): AnalystApplication | null {
  ensureClientHydration();
  return applicationStore.find((app) => app.id === id) ?? null;
}

export function replaceMockApplication(next: AnalystApplication): AnalystApplication {
  ensureClientHydration();
  applicationStore = applicationStore.map((app) => (app.id === next.id ? next : app));
  persistPublicApps(applicationStore);
  notifyApplicationStore();
  return next;
}

export type CreateMockApplicationInput = Omit<
  AnalystApplication,
  | "id"
  | "appliedAt"
  | "status"
  | "archived"
  | "overallScore"
  | "evaluation"
  | "verificationState"
  | "verificationNotes"
  | "internalNotes"
  | "interviewNotes"
  | "stageRating"
  | "decisionReason"
  | "decisionAt"
  | "partnershipHandoff"
  | "avatarTone"
> & {
  avatarTone?: AnalystApplication["avatarTone"];
};

/**
 * Prepend a newly submitted public application into the Admin queue (status `new`).
 * DEV MOCK ONLY — TODO(NestJS): POST /analysts/applications
 */
export function createMockApplication(
  input: CreateMockApplicationInput
): AnalystApplication {
  ensureClientHydration();
  const id = `app-public-${Date.now().toString(36)}`;
  const tones: AnalystApplication["avatarTone"][] = [
    "violet",
    "emerald",
    "amber",
    "rose",
    "sky",
    "discord",
  ];
  const created: AnalystApplication = {
    ...input,
    id,
    avatarTone: input.avatarTone ?? tones[applicationStore.length % tones.length]!,
    appliedAt: new Date().toISOString(),
    status: "new",
    archived: false,
    overallScore: null,
    evaluation: emptyEvaluation(),
    verificationState: "pending",
    verificationNotes: "",
    internalNotes: "",
    interviewNotes: "",
    stageRating: null,
    decisionReason: null,
    decisionAt: null,
    partnershipHandoff: null,
  };
  applicationStore = [cloneApp(created), ...applicationStore];
  persistPublicApps(applicationStore);
  notifyApplicationStore();
  return created;
}

export function computeApplicationDashboardStats(
  apps: AnalystApplication[] = applicationStore
): ApplicationDashboardStats {
  const active = apps.filter((a) => !a.archived);
  return {
    newCount: active.filter((a) => a.status === "new").length,
    underReviewCount: active.filter((a) => a.status === "under_review").length,
    pendingInformationCount: active.filter((a) => a.status === "pending_information")
      .length,
    approvedCount: active.filter((a) => a.status === "approved").length,
    rejectedCount: apps.filter((a) => a.status === "rejected").length,
    queueOpenCount: active.filter(
      (a) =>
        a.status === "new" ||
        a.status === "under_review" ||
        a.status === "pending_information"
    ).length,
  };
}
