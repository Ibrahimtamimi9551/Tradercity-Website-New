/**
 * TraderCity marketing background surfaces.
 * Exact values from Hedged Haus — Website Background System.
 * Section-owned: do not paint as one full-page gradient.
 */

/** Hero / marketing canvas — deep navy + blue upper glow + subtle purple lower-right. */
export const MARKETING_HERO_SURFACE_BG =
  "radial-gradient(ellipse 85% 45% at 50% -8%, rgba(59,130,246,0.28), transparent 55%), radial-gradient(ellipse 50% 40% at 85% 70%, rgba(139,92,246,0.08), transparent 50%), #020617";

/** Shared mid-page marketing surface for homepage sections below the hero. */
export const MARKETING_SURFACE_BG =
  "radial-gradient(ellipse 70% 40% at 50% 18%, rgba(59,130,246,0.10), transparent 58%), radial-gradient(ellipse 40% 35% at 0% 70%, rgba(59,130,246,0.06), transparent 50%), #020617";

/** Footer / closing CTA surface. */
export const MARKETING_FOOTER_SURFACE_BG =
  "radial-gradient(ellipse 70% 55% at 50% 100%, rgba(59,130,246,0.10), transparent 58%), radial-gradient(ellipse 45% 40% at 12% 25%, rgba(59,130,246,0.07), transparent 52%), radial-gradient(ellipse 40% 35% at 88% 35%, rgba(139,92,246,0.06), transparent 50%), #020617";

/** Marketing base / gradient terminal color. */
export const MARKETING_BASE = "#020617";

/** Footer top fade overlay (absolute inset layer). */
export const MARKETING_FOOTER_TOP_FADE =
  "linear-gradient(to bottom, rgba(255, 255, 255, 0.02), transparent 28%)";
