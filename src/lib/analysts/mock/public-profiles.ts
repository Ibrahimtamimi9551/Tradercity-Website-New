import type {
  PublicAnalystProfile,
  PublicProfileStatistic,
} from "@/types/analysts/public-profile";
import { isHomepageEligible } from "@/types/analysts/public-profile";
import { resolvePublicProfileActive } from "@/lib/analysts/mock/public-profile-from-application";
import { MOCK_ANALYST_APPLICATIONS } from "@/lib/analysts/mock/applications";
import { buildPublicProfileDraftFromApplication } from "@/lib/analysts/mock/public-profile-from-application";

function cloneProfile(profile: PublicAnalystProfile): PublicAnalystProfile {
  return {
    ...profile,
    statistics: profile.statistics.map((s) => ({ ...s })),
    researchFocus: [...profile.researchFocus],
    markets: [...profile.markets],
    links: { ...profile.links },
  };
}

function stats(
  enabled: Partial<Record<PublicProfileStatistic["key"], string>>
): PublicProfileStatistic[] {
  const defs: Array<{ key: PublicProfileStatistic["key"]; label: string }> = [
    { key: "experience", label: "Experience" },
    { key: "followers", label: "Followers" },
    { key: "community_rating", label: "Community Rating" },
    { key: "win_rate", label: "Win Rate" },
    { key: "risk_reward", label: "Risk / Reward" },
    { key: "ranking", label: "Ranking" },
  ];
  return defs.map((def) => {
    const value = enabled[def.key]?.trim() ?? "";
    return {
      key: def.key,
      label: def.label,
      value,
      enabled: Boolean(value),
    };
  });
}

/**
 * Homepage showcase seeds — curated Published profiles for active Directory partners.
 * Sofia remains draft (curation). Priya remains published but Directory onboarding
 * (not homepage-eligible) so soft-publish + active filter can be demoed.
 */
function buildHomepageShowcaseProfiles(): PublicAnalystProfile[] {
  const now = "2026-07-20T12:00:00.000Z";

  return [
    {
      id: "pp-home-a-001",
      applicationId: "seed-home-a-001",
      analystId: "a-001",
      status: "published",
      avatarTone: "violet",
      profileImageUrl: null,
      displayName: "Luna Markets",
      analystTitle: "BTC Macro Strategist",
      featured: true,
      verified: true,
      active: true,
      shortIntroduction:
        "Maps Bitcoin against global liquidity, policy calendars, and regime shifts so members trade context — not headlines.",
      publicStatement: "Read the regime before you read the chart.",
      statistics: stats({
        experience: "8+ years",
        followers: "84K+",
        community_rating: "4.9",
        ranking: "Top 3%",
      }),
      researchFocus: [
        "BTC Macro",
        "Liquidity Cycles",
        "Policy Calendar",
        "Risk Regimes",
      ],
      philosophyTitle: "Macro-First Structure",
      philosophyDescription:
        "Start with liquidity and policy, then confirm with market structure. Conviction comes from alignment — not a single timeframe.",
      markets: ["btc", "macro", "crypto"],
      links: {
        website: "https://lunamarkets.example",
        x: "https://twitter.com/luna_markets",
        youtube: "https://youtube.com/@lunamarkets",
        discord: "https://discord.gg/tradercity",
      },
      publicVisibility: true,
      displayOrder: 1,
      createdAt: now,
      updatedAt: now,
      publishedAt: now,
    },
    {
      id: "pp-home-a-002",
      applicationId: "seed-home-a-002",
      analystId: "a-002",
      status: "published",
      avatarTone: "emerald",
      profileImageUrl: null,
      displayName: "Alpha Flow",
      analystTitle: "Narrative & Flow Analyst",
      featured: false,
      verified: true,
      active: true,
      shortIntroduction:
        "Tracks capital rotation, narrative strength, and altseason mechanics so members know when attention is real — and when it is noise.",
      publicStatement: "Follow the flows. Ignore the noise.",
      statistics: stats({
        experience: "6+ years",
        followers: "156K+",
        community_rating: "4.8",
        win_rate: "72%",
        ranking: "Top 5%",
      }),
      researchFocus: [
        "Capital Rotation",
        "Narrative Cycles",
        "Altseason Timing",
        "Sector Flows",
      ],
      philosophyTitle: "Flow-Led Narratives",
      philosophyDescription:
        "Narratives only matter when capital confirms. Research starts with where money is moving — then frames the story members can act on.",
      markets: ["crypto", "eth", "multi_asset"],
      links: {
        website: "https://alphaflow.example",
        x: "https://twitter.com/alpha_flow",
        telegram: "https://t.me/alphaflow",
        youtube: "https://youtube.com/@alphaflow",
      },
      publicVisibility: true,
      displayOrder: 2,
      createdAt: now,
      updatedAt: now,
      publishedAt: now,
    },
    {
      id: "pp-home-a-006",
      applicationId: "seed-home-a-006",
      analystId: "a-006",
      status: "published",
      avatarTone: "discord",
      profileImageUrl: null,
      displayName: "Horizon Desk",
      analystTitle: "On-Chain Research Analyst",
      featured: false,
      verified: true,
      active: true,
      shortIntroduction:
        "Explains whale positioning, exchange flows, and on-chain regime changes in plain language for serious traders.",
      publicStatement: "Chain data before chart dogma.",
      statistics: stats({
        experience: "7+ years",
        followers: "67K+",
        community_rating: "4.7",
        ranking: "Top 8%",
      }),
      researchFocus: [
        "Exchange Flows",
        "Whale Positioning",
        "Stablecoin Supply",
        "On-Chain Regimes",
      ],
      philosophyTitle: "On-Chain Clarity",
      philosophyDescription:
        "Translate raw chain activity into decision-ready context. Members get the signal path — not a dump of dashboards.",
      markets: ["crypto", "btc", "eth"],
      links: {
        x: "https://twitter.com/horizon_desk",
        website: "https://horizondesk.example",
        discord: "https://discord.gg/tradercity",
      },
      publicVisibility: true,
      displayOrder: 3,
      createdAt: now,
      updatedAt: now,
      publishedAt: now,
    },
    {
      id: "pp-home-a-008",
      applicationId: "seed-home-a-008",
      analystId: "a-008",
      status: "published",
      avatarTone: "emerald",
      profileImageUrl: null,
      displayName: "Signal Forge",
      analystTitle: "Swing Structure Specialist",
      featured: false,
      verified: true,
      active: true,
      shortIntroduction:
        "Builds swing frameworks around structure, invalidation, and timing so members plan trades with clear risk boundaries.",
      publicStatement: "Structure first. Timing second. Emotion never.",
      statistics: stats({
        experience: "9+ years",
        followers: "92K+",
        community_rating: "4.9",
        win_rate: "69%",
        ranking: "Top 2%",
      }),
      researchFocus: [
        "Market Structure",
        "Swing Setups",
        "Invalidation Levels",
        "Multi-Timeframe",
      ],
      philosophyTitle: "Structure & Invalidation",
      philosophyDescription:
        "Every idea needs a clear invalidation. Research is useful only when members know when they are wrong.",
      markets: ["crypto", "forex", "stocks"],
      links: {
        website: "https://signalforge.example",
        x: "https://twitter.com/signal_forge",
        youtube: "https://youtube.com/@signalforge",
        telegram: "https://t.me/signalforge",
      },
      publicVisibility: true,
      displayOrder: 4,
      createdAt: now,
      updatedAt: now,
      publishedAt: now,
    },
  ];
}

/**
 * Seed drafts for approved mock applications so Public Profile queue is usable.
 * Sofia = draft (curation pending). Priya = published sample (Directory active still required for homepage).
 */
function buildApplicationSeedProfiles(): PublicAnalystProfile[] {
  const seeds: PublicAnalystProfile[] = [];

  const sofia = MOCK_ANALYST_APPLICATIONS.find((a) => a.id === "app-005");
  if (sofia?.partnershipHandoff) {
    const draft = buildPublicProfileDraftFromApplication(
      sofia,
      sofia.partnershipHandoff.analystId,
      sofia.partnershipHandoff.createdAt
    );
    draft.publicStatement = "Read the calendar. Trade the regime.";
    draft.displayOrder = 10;
    seeds.push(draft);
  }

  const priya = MOCK_ANALYST_APPLICATIONS.find((a) => a.id === "app-007");
  if (priya?.partnershipHandoff) {
    const draft = buildPublicProfileDraftFromApplication(
      priya,
      priya.partnershipHandoff.analystId,
      priya.partnershipHandoff.createdAt
    );
    draft.status = "published";
    draft.publishedAt = "2026-05-22T12:00:00.000Z";
    draft.updatedAt = "2026-05-22T12:00:00.000Z";
    draft.publicStatement = "Follow the flows. Ignore the noise.";
    draft.analystTitle = "On-Chain Research Analyst";
    draft.featured = false;
    draft.displayOrder = 20;
    seeds.push(draft);
  }

  return seeds;
}

function buildSeedProfiles(): PublicAnalystProfile[] {
  return [...buildHomepageShowcaseProfiles(), ...buildApplicationSeedProfiles()];
}

let profileStore: PublicAnalystProfile[] = buildSeedProfiles().map(cloneProfile);

type StoreListener = () => void;
const storeListeners = new Set<StoreListener>();

function notifyPublicProfileStore(): void {
  storeListeners.forEach((listener) => listener());
}

export function subscribePublicProfileStore(listener: StoreListener): () => void {
  storeListeners.add(listener);
  return () => {
    storeListeners.delete(listener);
  };
}

function withSyncedActive(profile: PublicAnalystProfile): PublicAnalystProfile {
  const active = resolvePublicProfileActive(profile.analystId);
  if (profile.active === active) return cloneProfile(profile);
  return cloneProfile({ ...profile, active });
}

export function listMockPublicProfiles(): PublicAnalystProfile[] {
  return profileStore.map(withSyncedActive);
}

export function getMockPublicProfile(id: string): PublicAnalystProfile | null {
  const found = profileStore.find((p) => p.id === id);
  return found ? withSyncedActive(found) : null;
}

export function getMockPublicProfileByApplicationId(
  applicationId: string
): PublicAnalystProfile | null {
  const found = profileStore.find((p) => p.applicationId === applicationId);
  return found ? withSyncedActive(found) : null;
}

export function getMockPublicProfileByAnalystId(
  analystId: string
): PublicAnalystProfile | null {
  const found = profileStore.find((p) => p.analystId === analystId);
  return found ? withSyncedActive(found) : null;
}

export function replaceMockPublicProfile(
  next: PublicAnalystProfile
): PublicAnalystProfile {
  const cloned = cloneProfile(next);
  const idx = profileStore.findIndex((p) => p.id === cloned.id);
  if (idx === -1) {
    profileStore = [cloned, ...profileStore];
  } else {
    profileStore = profileStore.map((p) => (p.id === cloned.id ? cloned : p));
  }
  notifyPublicProfileStore();
  return withSyncedActive(cloned);
}

/**
 * Homepage contract — soft publish query.
 * Meet the Analysts must call this and render PublicAnalystCard only.
 */
export function listPublishedPublicProfiles(): PublicAnalystProfile[] {
  return listMockPublicProfiles()
    .filter(isHomepageEligible)
    .sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return a.displayOrder - b.displayOrder;
    });
}
