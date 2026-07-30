import type { AnalystApplication, PrimaryMarket } from "@/types/analysts/applications";
import {
  PRIMARY_MARKET_LABELS,
  TRADING_STYLE_LABELS,
} from "@/types/analysts/applications";
import { MOCK_DIRECTORY_ANALYSTS } from "@/lib/analysts/mock/directory-analysts";
import {
  PUBLIC_PROFILE_STATISTIC_DEFS,
  SHORT_INTRODUCTION_MAX,
  type PublicAnalystProfile,
  type PublicProfileLinks,
  type PublicProfileMarket,
  type PublicProfileStatistic,
} from "@/types/analysts/public-profile";

/** Directory statuses considered "active" for homepage eligibility. */
const ACTIVE_DIRECTORY_STATUSES = new Set(["active", "growing"]);

export function resolvePublicProfileActive(analystId: string): boolean {
  const row = MOCK_DIRECTORY_ANALYSTS.find((a) => a.id === analystId);
  if (!row) return false;
  return ACTIVE_DIRECTORY_STATUSES.has(row.status);
}

function trimIntro(bio: string): string {
  const cleaned = bio.trim();
  if (cleaned.length <= SHORT_INTRODUCTION_MAX) return cleaned;
  return `${cleaned.slice(0, SHORT_INTRODUCTION_MAX - 1).trimEnd()}…`;
}

function mapPrimaryMarket(market: PrimaryMarket): PublicProfileMarket {
  return market;
}

function emptyStatistics(experienceValue: string): PublicProfileStatistic[] {
  return PUBLIC_PROFILE_STATISTIC_DEFS.map((def) => {
    if (def.key === "experience" && experienceValue.trim()) {
      return {
        key: def.key,
        label: def.label,
        value: experienceValue.trim(),
        enabled: true,
      };
    }
    return {
      key: def.key,
      label: def.label,
      value: "",
      enabled: false,
    };
  });
}

function extractLinks(app: AnalystApplication): PublicProfileLinks {
  const links: PublicProfileLinks = {};
  const website = app.audienceWebsite || app.tradingWebsite;
  if (website) links.website = website;

  for (const link of app.socialLinks) {
    const label = link.label.toLowerCase();
    const href = link.href.trim();
    if (!href) continue;
    if (label === "x" || label.includes("twitter")) links.x = href;
    else if (label.includes("youtube")) links.youtube = href;
    else if (label.includes("telegram")) links.telegram = href;
    else if (label.includes("discord")) links.discord = href;
    else if (label.includes("website") || label.includes("site")) {
      if (!links.website) links.website = href;
    }
  }

  if (!links.x && app.xHandle) {
    const handle = app.xHandle.replace(/^@/, "");
    links.x = `https://twitter.com/${handle}`;
  }

  return links;
}

function seedResearchFocus(app: AnalystApplication): string[] {
  const fromMarkets = app.primaryMarkets.map((m) => PRIMARY_MARKET_LABELS[m]);
  const style = TRADING_STYLE_LABELS[app.primaryTradingStyle];
  const unique = Array.from(new Set([...fromMarkets, style].filter(Boolean)));
  return unique.slice(0, 4);
}

function seedAnalystTitle(app: AnalystApplication): string {
  if (app.primaryMarkets.length === 0) {
    return `${TRADING_STYLE_LABELS[app.primaryTradingStyle]} Analyst`;
  }
  const first = PRIMARY_MARKET_LABELS[app.primaryMarkets[0]!];
  return `${first} Specialist`;
}

/**
 * Build a Public Profile draft from an approved application.
 * Idempotent callers must not overwrite existing curated profiles.
 */
export function buildPublicProfileDraftFromApplication(
  app: AnalystApplication,
  analystId: string,
  createdAt: string = new Date().toISOString()
): PublicAnalystProfile {
  const markets = app.primaryMarkets.map(mapPrimaryMarket).slice(0, 4);
  const philosophyTitle = TRADING_STYLE_LABELS[app.primaryTradingStyle];

  return {
    id: `pp-${app.id}`,
    applicationId: app.id,
    analystId,
    status: "draft",
    avatarTone: app.avatarTone,
    profileImageUrl: null,
    displayName: app.analystName,
    analystTitle: seedAnalystTitle(app),
    featured: false,
    verified: true,
    active: resolvePublicProfileActive(analystId),
    shortIntroduction: trimIntro(app.shortBio),
    publicStatement: "",
    statistics: emptyStatistics(app.yearsOfExperience),
    researchFocus: seedResearchFocus(app),
    philosophyTitle,
    philosophyDescription: app.motivation.trim(),
    markets,
    links: extractLinks(app),
    publicVisibility: true,
    displayOrder: 100,
    createdAt,
    updatedAt: createdAt,
    publishedAt: null,
  };
}
