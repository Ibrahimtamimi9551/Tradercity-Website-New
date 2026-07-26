import type { AnalystApplication } from "@/types/analysts/applications";
import type {
  PublicAnalystProfile,
  PublicProfileStatus,
} from "@/types/analysts/public-profile";
import {
  MARKETS_MAX,
  RESEARCH_FOCUS_MAX,
  SHORT_INTRODUCTION_MAX,
} from "@/types/analysts/public-profile";
import { buildPublicProfileDraftFromApplication } from "@/lib/analysts/mock/public-profile-from-application";
import {
  getMockPublicProfile,
  getMockPublicProfileByApplicationId,
  replaceMockPublicProfile,
} from "@/lib/analysts/mock/public-profiles";

export type PublicProfileEditablePatch = Partial<
  Pick<
    PublicAnalystProfile,
    | "profileImageUrl"
    | "displayName"
    | "analystTitle"
    | "featured"
    | "shortIntroduction"
    | "publicStatement"
    | "statistics"
    | "researchFocus"
    | "philosophyTitle"
    | "philosophyDescription"
    | "markets"
    | "links"
    | "publicVisibility"
    | "displayOrder"
  >
>;

/**
 * Create a draft from an approved application if none exists.
 * Idempotent — never overwrites curated content.
 */
export function ensurePublicProfileDraftFromApplication(
  app: AnalystApplication,
  analystId: string,
  createdAt: string = new Date().toISOString()
): PublicAnalystProfile {
  const existing = getMockPublicProfileByApplicationId(app.id);
  if (existing) return existing;

  const draft = buildPublicProfileDraftFromApplication(app, analystId, createdAt);
  return replaceMockPublicProfile(draft);
}

function normalizePatch(
  current: PublicAnalystProfile,
  patch: PublicProfileEditablePatch
): PublicProfileEditablePatch {
  const next: PublicProfileEditablePatch = { ...patch };

  if (typeof next.shortIntroduction === "string") {
    next.shortIntroduction = next.shortIntroduction.slice(0, SHORT_INTRODUCTION_MAX);
  }
  if (next.researchFocus) {
    next.researchFocus = next.researchFocus
      .map((t) => t.trim())
      .filter(Boolean)
      .slice(0, RESEARCH_FOCUS_MAX);
  }
  if (next.markets) {
    next.markets = next.markets.slice(0, MARKETS_MAX);
  }
  if (next.statistics) {
    next.statistics = next.statistics.map((s) => ({ ...s }));
  }
  if (next.links) {
    next.links = { ...current.links, ...next.links };
  }
  if (typeof next.displayOrder === "number" && Number.isNaN(next.displayOrder)) {
    next.displayOrder = current.displayOrder;
  }

  return next;
}

export function updatePublicProfileRecord(
  id: string,
  patch: PublicProfileEditablePatch
): PublicAnalystProfile | null {
  const current = getMockPublicProfile(id);
  if (!current) return null;
  const normalized = normalizePatch(current, patch);
  const now = new Date().toISOString();
  return replaceMockPublicProfile({
    ...current,
    ...normalized,
    verified: true,
    statistics: normalized.statistics
      ? normalized.statistics.map((s) => ({ ...s }))
      : current.statistics.map((s) => ({ ...s })),
    researchFocus: normalized.researchFocus
      ? [...normalized.researchFocus]
      : [...current.researchFocus],
    markets: normalized.markets ? [...normalized.markets] : [...current.markets],
    links: normalized.links ? { ...normalized.links } : { ...current.links },
    updatedAt: now,
  });
}

export function setPublicProfileStatusRecord(
  id: string,
  status: PublicProfileStatus
): PublicAnalystProfile | null {
  const current = getMockPublicProfile(id);
  if (!current) return null;
  const now = new Date().toISOString();
  return replaceMockPublicProfile({
    ...current,
    status,
    updatedAt: now,
    publishedAt: status === "published" ? current.publishedAt ?? now : current.publishedAt,
  });
}

/** Soft unpublish — returns to draft for further curation. */
export function unpublishPublicProfileRecord(
  id: string
): PublicAnalystProfile | null {
  const current = getMockPublicProfile(id);
  if (!current) return null;
  const now = new Date().toISOString();
  return replaceMockPublicProfile({
    ...current,
    status: "draft",
    updatedAt: now,
  });
}
