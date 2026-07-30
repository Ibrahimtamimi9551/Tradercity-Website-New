import type { StatusTone } from "@/types/admin/common";

/**
 * Public Profile — curated homepage presentation for an approved analyst.
 * Distinct from AnalystApplication (evaluation) and DirectoryAnalyst (ops roster).
 *
 * Soft publish: Published = eligible for homepage consumption.
 * Homepage must only read Published + visible profiles — never applications.
 */

export type PublicProfileStatus = "draft" | "preview" | "published";

export type PublicProfileStatisticKey =
  | "experience"
  | "followers"
  | "community_rating"
  | "win_rate"
  | "risk_reward"
  | "ranking";

export type PublicProfileStatistic = {
  key: PublicProfileStatisticKey;
  label: string;
  value: string;
  /** When false or value empty, the card omits this statistic. */
  enabled: boolean;
};

export type PublicProfileMarket =
  | "crypto"
  | "btc"
  | "eth"
  | "forex"
  | "stocks"
  | "macro"
  | "multi_asset";

export type PublicProfileAvatarTone =
  | "discord"
  | "violet"
  | "emerald"
  | "amber"
  | "rose"
  | "sky";

export type PublicProfileLinks = {
  website?: string;
  x?: string;
  youtube?: string;
  telegram?: string;
  discord?: string;
};

export type PublicAnalystProfile = {
  id: string;
  applicationId: string;
  analystId: string;
  status: PublicProfileStatus;
  /** Presentation avatar fallback when profileImageUrl is null. */
  avatarTone: PublicProfileAvatarTone;
  profileImageUrl: string | null;
  displayName: string;
  analystTitle: string;
  featured: boolean;
  /** Always true for profiles created from an approved application. */
  verified: true;
  /**
   * Soft homepage filter — mirrors Directory active/growing when available.
   * Editable later; draft seed uses Directory status when present.
   */
  active: boolean;
  shortIntroduction: string;
  publicStatement: string;
  statistics: PublicProfileStatistic[];
  /** Max 4 focus areas. */
  researchFocus: string[];
  philosophyTitle: string;
  philosophyDescription: string;
  /** Max 4 markets. */
  markets: PublicProfileMarket[];
  links: PublicProfileLinks;
  publicVisibility: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
};

/** Adaptive card props — only populated sections should render. */
export type PublicAnalystCardProps = {
  profileImageUrl: string | null;
  avatarTone: PublicProfileAvatarTone;
  displayName: string;
  analystTitle: string;
  featured: boolean;
  verified: boolean;
  active: boolean;
  shortIntroduction: string;
  publicStatement: string;
  statistics: Array<{ key: string; label: string; value: string }>;
  researchFocus: string[];
  philosophyTitle: string;
  philosophyDescription: string;
  markets: Array<{ id: PublicProfileMarket; label: string }>;
  links: PublicProfileLinks;
};

export const PUBLIC_PROFILE_STATISTIC_DEFS: {
  key: PublicProfileStatisticKey;
  label: string;
}[] = [
  { key: "experience", label: "Experience" },
  { key: "followers", label: "Followers" },
  { key: "community_rating", label: "Community Rating" },
  { key: "win_rate", label: "Win Rate" },
  { key: "risk_reward", label: "Risk / Reward" },
  { key: "ranking", label: "Ranking" },
];

export const PUBLIC_PROFILE_MARKET_LABELS: Record<PublicProfileMarket, string> = {
  crypto: "Crypto",
  btc: "BTC",
  eth: "ETH",
  forex: "Forex",
  stocks: "Stocks",
  macro: "Macro",
  multi_asset: "Multi-Asset",
};

export const PUBLIC_PROFILE_MARKET_OPTIONS: PublicProfileMarket[] = [
  "crypto",
  "btc",
  "eth",
  "forex",
  "stocks",
  "macro",
  "multi_asset",
];

export const SHORT_INTRODUCTION_MAX = 220;
export const SHORT_INTRODUCTION_SOFT_MIN = 180;
export const RESEARCH_FOCUS_MAX = 4;
export const MARKETS_MAX = 4;

/** Homepage / spotlight card — single row, excludes Risk / Reward. */
export const PUBLIC_CARD_STATS_MAX = 4;
export const PUBLIC_CARD_STAT_ORDER: PublicProfileStatisticKey[] = [
  "experience",
  "followers",
  "community_rating",
  "ranking",
  "win_rate",
];

export function publicProfileStatusBadge(
  status: PublicProfileStatus
): { label: string; tone: StatusTone } {
  const map: Record<PublicProfileStatus, { label: string; tone: StatusTone }> = {
    draft: { label: "Draft", tone: "neutral" },
    preview: { label: "Preview", tone: "info" },
    published: { label: "Published", tone: "success" },
  };
  return map[status];
}

export function displayNameInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function hasLinkValue(value: string | undefined): value is string {
  return Boolean(value && value.trim());
}

/** Pure mapper — card consumes only presentation fields. */
export function toPublicAnalystCardProps(
  profile: PublicAnalystProfile
): PublicAnalystCardProps {
  const enabledStats = profile.statistics
    .filter((s) => s.enabled && s.value.trim())
    .map((s) => ({ key: s.key, label: s.label, value: s.value.trim() }));

  // Spotlight layout: max 4 metrics, never Risk / Reward, stable priority order.
  const byKey = new Map(enabledStats.map((s) => [s.key, s]));
  const statistics = PUBLIC_CARD_STAT_ORDER.map((key) => byKey.get(key))
    .filter(Boolean)
    .slice(0, PUBLIC_CARD_STATS_MAX) as Array<{
    key: string;
    label: string;
    value: string;
  }>;

  const researchFocus = profile.researchFocus
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, RESEARCH_FOCUS_MAX);

  const markets = profile.markets.slice(0, MARKETS_MAX).map((id) => ({
    id,
    label: PUBLIC_PROFILE_MARKET_LABELS[id],
  }));

  const links: PublicProfileLinks = {};
  if (hasLinkValue(profile.links.website)) links.website = profile.links.website.trim();
  if (hasLinkValue(profile.links.x)) links.x = profile.links.x.trim();
  if (hasLinkValue(profile.links.youtube)) links.youtube = profile.links.youtube.trim();
  if (hasLinkValue(profile.links.telegram)) links.telegram = profile.links.telegram.trim();
  if (hasLinkValue(profile.links.discord)) links.discord = profile.links.discord.trim();

  return {
    profileImageUrl: profile.profileImageUrl?.trim() || null,
    avatarTone: profile.avatarTone,
    displayName: profile.displayName.trim(),
    analystTitle: profile.analystTitle.trim(),
    featured: profile.featured,
    verified: profile.verified,
    active: profile.active,
    shortIntroduction: profile.shortIntroduction.trim(),
    publicStatement: profile.publicStatement.trim(),
    statistics,
    researchFocus,
    philosophyTitle: profile.philosophyTitle.trim(),
    philosophyDescription: profile.philosophyDescription.trim(),
    markets,
    links,
  };
}

/**
 * Homepage contract filter (soft publish).
 * Used by listPublishedPublicProfiles — homepage must not invent extra rules.
 */
export function isHomepageEligible(profile: PublicAnalystProfile): boolean {
  return (
    profile.status === "published" &&
    profile.publicVisibility &&
    profile.verified &&
    profile.active
  );
}
