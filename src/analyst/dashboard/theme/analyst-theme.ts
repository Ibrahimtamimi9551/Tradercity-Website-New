/**
 * Partner Analyst Dashboard tokens.
 * VIP visual language — purple is the primary accent, not the whole palette.
 */

export const analystTheme = {
  canvas: "#03040C",
  panelBg: "rgba(10, 14, 24, 0.92)",
  panelBgElevated: "rgba(14, 18, 32, 0.96)",
  cardBorder: "rgba(255,255,255,0.10)",
  insetBg: "rgba(255,255,255,0.025)",
  insetBorder: "rgba(255,255,255,0.07)",

  /* Brand accent (replaces VIP blue as primary identity) */
  accent: "#9B5DE5",
  accentSoft: "rgba(155, 93, 229, 0.14)",
  accentBorder: "rgba(155, 93, 229, 0.35)",
  accentStrong: "#7C3AED",
  accentMuted: "#A78BFA",
  gradientPurple:
    "linear-gradient(135deg, #9B5DE5 0%, #6D28D9 55%, #4C1D95 100%)",

  /* Secondary / atmosphere */
  violet: "#6D28D9",
  navy: "#0a1630",
  charcoal: "#0a0e18",

  /* Semantic */
  success: "#22C55E",
  successSoft: "rgba(34, 197, 94, 0.12)",
  successBorder: "rgba(34, 197, 94, 0.35)",
  warning: "#F59E0B",
  warningSoft: "rgba(245, 158, 11, 0.12)",
  warningBorder: "rgba(245, 158, 11, 0.35)",
  error: "#EF4444",
  errorSoft: "rgba(239, 68, 68, 0.12)",
  info: "#06D6F7",
  infoSoft: "rgba(6, 214, 247, 0.12)",
  infoBorder: "rgba(6, 214, 247, 0.35)",
  neutral: "#8F9BB3",

  /* Module personalities */
  analytics: "#5B9BFF",
  analyticsSoft: "rgba(91, 155, 255, 0.12)",
  analyticsBorder: "rgba(91, 155, 255, 0.28)",
  growth: "#34D399",
  growthSoft: "rgba(52, 211, 153, 0.12)",
  finance: "#22C55E",
  financeGold: "#F5D76E",

  /* Tier achievement */
  bronze: "#CD7F32",
  silver: "#C0C0C0",
  gold: "#F5D76E",
  diamond: "#A78BFA",

  /* Membership plan accents */
  planMonthly: "#60A5FA",
  planQuarterly: "#A78BFA",
  planYearly: "#F5D76E",

  textPrimary: "#F4F4F8",
  textMuted: "rgba(255,255,255,0.55)",
  textDim: "rgba(255,255,255,0.40)",

  glowAccent: "rgba(155, 93, 229, 0.18)",
  glowInfo: "rgba(6, 214, 247, 0.12)",
  shadowPanel: "0 12px 40px -18px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.06)",
} as const;

export type AnalystTheme = typeof analystTheme;

export type ModulePersonality =
  | "default"
  | "hero"
  | "overview"
  | "analytics"
  | "growth"
  | "referral"
  | "achievement"
  | "finance"
  | "payout"
  | "support";

export const modulePersonalityStyles: Record<
  ModulePersonality,
  { border: string; background: string; titleColor: string }
> = {
  default: {
    border: analystTheme.cardBorder,
    background: analystTheme.panelBg,
    titleColor: analystTheme.accentMuted,
  },
  hero: {
    border: analystTheme.accentBorder,
    background:
      "radial-gradient(ellipse 90% 80% at 30% 20%, rgba(90, 40, 180, 0.45) 0%, transparent 55%), radial-gradient(ellipse 70% 70% at 85% 75%, rgba(6, 214, 247, 0.12) 0%, transparent 50%), linear-gradient(160deg, #1a1240 0%, #0a1630 45%, #06101f 100%)",
    titleColor: analystTheme.accentMuted,
  },
  overview: {
    border: analystTheme.cardBorder,
    background: analystTheme.panelBg,
    titleColor: analystTheme.accent,
  },
  analytics: {
    border: analystTheme.analyticsBorder,
    background:
      "radial-gradient(ellipse 55% 70% at 50% 0%, rgba(91, 155, 255, 0.10) 0%, transparent 55%), rgba(6, 10, 22, 0.95)",
    titleColor: analystTheme.analytics,
  },
  growth: {
    border: "rgba(52, 211, 153, 0.28)",
    background:
      "radial-gradient(ellipse 55% 70% at 40% 0%, rgba(52, 211, 153, 0.10) 0%, transparent 55%), rgba(6, 14, 18, 0.95)",
    titleColor: analystTheme.growth,
  },
  referral: {
    border: "rgba(96, 165, 250, 0.28)",
    background:
      "radial-gradient(ellipse 60% 80% at 50% 0%, rgba(37, 99, 235, 0.12) 0%, transparent 55%), rgba(6, 10, 22, 0.95)",
    titleColor: "#60A5FA",
  },
  achievement: {
    border: "rgba(245, 215, 110, 0.22)",
    background:
      "radial-gradient(ellipse 50% 60% at 80% 0%, rgba(245, 215, 110, 0.08) 0%, transparent 50%), rgba(12, 14, 22, 0.95)",
    titleColor: analystTheme.gold,
  },
  finance: {
    border: analystTheme.successBorder,
    background:
      "radial-gradient(ellipse 50% 60% at 20% 0%, rgba(34, 197, 94, 0.08) 0%, transparent 50%), rgba(8, 14, 16, 0.95)",
    titleColor: analystTheme.success,
  },
  payout: {
    border: "rgba(245, 215, 110, 0.25)",
    background:
      "radial-gradient(ellipse 55% 70% at 70% 0%, rgba(155, 93, 229, 0.10) 0%, transparent 55%), rgba(10, 12, 22, 0.96)",
    titleColor: analystTheme.financeGold,
  },
  support: {
    border: "rgba(167, 139, 250, 0.25)",
    background: analystTheme.panelBg,
    titleColor: analystTheme.accentMuted,
  },
};
