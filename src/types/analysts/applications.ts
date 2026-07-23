import type { StatusTone } from "@/types/admin/common";

/** Queue / dashboard status for partnership applications. */
export type ApplicationQueueStatus =
  | "new"
  | "under_review"
  | "pending_information"
  | "approved"
  | "rejected";

export type ApplicationDomainView = "dashboard" | "queue" | "archive";

export type ApplicationViewerTabId =
  | "application"
  | "verification"
  | "evaluation"
  | "notes"
  | "decision";

export type PrimaryMarket =
  | "crypto"
  | "forex"
  | "stocks"
  | "macro"
  | "multi_asset";

export type TradingStyle =
  | "scalping"
  | "intraday"
  | "swing"
  | "position"
  | "macro"
  | "other";

export type AudiencePlatform =
  | "x"
  | "telegram"
  | "youtube"
  | "discord"
  | "instagram"
  | "multi_platform";

export type EvaluationCategoryId =
  | "identity"
  | "trading_knowledge"
  | "research_quality"
  | "education_ability"
  | "communication"
  | "professionalism"
  | "social_presence"
  | "community"
  | "brand_compatibility"
  | "long_term_potential";

export type CategoryEvaluation = {
  categoryId: EvaluationCategoryId;
  rating: number | null;
  notes: string;
  reviewer: string | null;
  updatedAt: string | null;
};

export type ApplicationVerificationState = "pending" | "verified" | "concerns";

export type ApplicationSocialLink = {
  id: string;
  label: string;
  href: string;
};

export type ApplicationContentSubmission = {
  kind: "link" | "file";
  label: string;
  href: string;
};

/**
 * Mock handoff created on Approve — Applicant → Partner birth event.
 * Applications record how the analyst entered; operational domains own records after this.
 *
 * Create Analyst Identity → Directory → Control Center → Discord → Referral reserved
 * → Ready For Onboarding
 */
export type ApplicationPartnershipHandoff = {
  analystId: string;
  createdAt: string;
  /** @deprecated Prefer discordRecordId — retained for Wave B mocks. */
  discordPrepStatus: "ready" | "record_created";
  controlCenterPath: string;
  directoryCreated: boolean;
  discordRecordId: string | null;
  /** Wave E will materialize referral ops; reserved at activation. */
  referralReserved: boolean;
};

/**
 * Analyst Application record — mirrors public Analyst Application Form sections
 * plus admin review fields. Not a Control Center profile.
 */
export type AnalystApplication = {
  id: string;
  /** Ops contact — not on public form; retained for admin follow-up */
  email: string;
  avatarTone: "discord" | "violet" | "emerald" | "amber" | "rose" | "sky";
  appliedAt: string;
  status: ApplicationQueueStatus;
  /** Historical archive — rejects land here; Archive view */
  archived: boolean;
  overallScore: number | null;

  // —— 01 Analyst Profile ——
  analystName: string;
  shortBio: string;
  yearsOfExperience: string;
  primaryMarkets: PrimaryMarket[];
  xHandle: string;
  discordUsername: string | null;

  // —— 02 Trading Background ——
  tradingDuration: string;
  primaryTradingStyle: TradingStyle;
  publicTrackRecordUrl: string | null;
  tradingWebsite: string | null;

  // —— 03 Audience & Community ——
  primaryAudiencePlatform: AudiencePlatform;
  totalAudienceSize: string;
  socialLinks: ApplicationSocialLink[];
  audienceWebsite: string | null;

  // —— 04 Content & Application ——
  bestAnalysis: ApplicationContentSubmission | null;
  bestEducational: ApplicationContentSubmission | null;
  motivation: string;

  // —— Admin review ——
  evaluation: CategoryEvaluation[];
  verificationState: ApplicationVerificationState;
  verificationNotes: string;
  internalNotes: string;
  interviewNotes: string;
  stageRating: number | null;
  decisionReason: string | null;
  decisionAt: string | null;
  partnershipHandoff: ApplicationPartnershipHandoff | null;
};

export type ApplicationQueueFilters = {
  search: string;
  status: ApplicationQueueStatus | "all";
};

export type ApplicationDashboardStats = {
  newCount: number;
  underReviewCount: number;
  pendingInformationCount: number;
  approvedCount: number;
  rejectedCount: number;
  queueOpenCount: number;
};

export type ApplicationDecisionAction = "approve" | "reject" | "request_information";

export const PRIMARY_MARKET_LABELS: Record<PrimaryMarket, string> = {
  crypto: "Crypto",
  forex: "Forex",
  stocks: "Stocks",
  macro: "Macro",
  multi_asset: "Multi-Asset",
};

export const TRADING_STYLE_LABELS: Record<TradingStyle, string> = {
  scalping: "Scalping",
  intraday: "Intraday",
  swing: "Swing",
  position: "Position",
  macro: "Macro",
  other: "Other",
};

export const AUDIENCE_PLATFORM_LABELS: Record<AudiencePlatform, string> = {
  x: "X (Twitter)",
  telegram: "Telegram",
  youtube: "YouTube",
  discord: "Discord",
  instagram: "Instagram",
  multi_platform: "Multi-platform",
};

export const EVALUATION_CATEGORIES: {
  id: EvaluationCategoryId;
  label: string;
  hint: string;
}[] = [
  { id: "identity", label: "Identity", hint: "Can we verify who they are?" },
  {
    id: "trading_knowledge",
    label: "Trading Knowledge",
    hint: "Credible market skill?",
  },
  {
    id: "research_quality",
    label: "Research Quality",
    hint: "Can they produce valuable research?",
  },
  {
    id: "education_ability",
    label: "Education Ability",
    hint: "Can they teach clearly?",
  },
  {
    id: "communication",
    label: "Communication",
    hint: "Professional behaviour?",
  },
  {
    id: "professionalism",
    label: "Professionalism",
    hint: "Standards, ethics, reliability?",
  },
  {
    id: "social_presence",
    label: "Social Presence",
    hint: "Credible public footprint?",
  },
  {
    id: "community",
    label: "Community",
    hint: "Audience / contribution potential?",
  },
  {
    id: "brand_compatibility",
    label: "Brand Compatibility",
    hint: "Fit with TraderCity philosophy? (critical)",
  },
  {
    id: "long_term_potential",
    label: "Long-term Potential",
    hint: "Partnership durability?",
  },
];

/** Product example threshold — Eligible / Approve path. */
export const APPLICATION_SCORE_THRESHOLD = 80;

export function applicationStatusBadge(
  status: ApplicationQueueStatus
): { label: string; tone: StatusTone } {
  const map: Record<ApplicationQueueStatus, { label: string; tone: StatusTone }> = {
    new: { label: "New", tone: "info" },
    under_review: { label: "Under Review", tone: "warning" },
    pending_information: { label: "Pending Information", tone: "warning" },
    approved: { label: "Approved", tone: "success" },
    rejected: { label: "Rejected", tone: "danger" },
  };
  return map[status];
}

export function formatPrimaryMarkets(markets: PrimaryMarket[]): string {
  return markets.map((m) => PRIMARY_MARKET_LABELS[m]).join(" · ");
}

export function computeOverallScore(evaluation: CategoryEvaluation[]): number | null {
  const rated = evaluation.filter((c) => c.rating !== null && c.rating !== undefined);
  if (rated.length === 0) return null;
  const sum = rated.reduce((acc, c) => acc + (c.rating ?? 0), 0);
  return Math.round(sum);
}

/** Handle derived from X for roster identity (no separate public handle field on form). */
export function applicationHandle(app: Pick<AnalystApplication, "xHandle">): string {
  return app.xHandle.replace(/^@/, "").toLowerCase();
}
