/**
 * Free Dashboard card surfaces — same visual *logic* as Admin
 * (`modulePanelSurface` / `admin-card-surface`):
 * solid opaque tint via CSS variable, inset highlight, depth shadow.
 *
 * Palette stays Free purple-blue. Do not import Admin UI components.
 */

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Opaque purple panel fills (richer than page `#050308` / old `#0c0814`).
 * Hexes stay in the established Free purple family.
 */
export type FreeCardTone = "purple" | "accent";

const toneStyles: Record<
  FreeCardTone,
  { surface: string; border: string }
> = {
  /** Primary Free cards — rich opaque purple */
  purple: {
    surface: "[--free-card-bg:#141022]",
    border: "border-purple-500/25",
  },
  /**
   * VIP / upgrade emphasis cards — same purple fill family,
   * gold/yellow borders preserved from the approved Free design.
   */
  accent: {
    surface: "[--free-card-bg:#16102a]",
    border: "border-yellow-900/40",
  },
};

/** Nested panels inside a free card (referral columns, price sidebar). */
export function freeInsetSurface(className?: string) {
  return cn(
    "free-card-surface [--free-card-bg:#1a142e] border border-purple-500/20",
    className
  );
}

/** Well / input wells inside cards — solid, no canvas bleed. */
export function freeWellSurface(className?: string) {
  return cn(
    "free-card-surface [--free-card-bg:#0f0a18] border border-purple-500/30",
    className
  );
}

/**
 * Primary Free Dashboard panel/card surface.
 * Fully opaque — no gradient wash, no translucency over the page canvas.
 */
export function freeCardSurface(tone: FreeCardTone = "purple", className?: string) {
  const styles = toneStyles[tone];
  return cn("free-card-surface", styles.surface, styles.border, className);
}
