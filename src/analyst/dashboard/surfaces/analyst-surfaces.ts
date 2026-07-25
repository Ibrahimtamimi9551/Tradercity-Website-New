/**
 * Partner Analyst Dashboard card surfaces.
 * VIP opaque-panel logic — purple is accent, not the only fill.
 */

import { analystTheme } from "@/analyst/dashboard/theme/analyst-theme";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export type AnalystCardTone = "default" | "accent";

const toneStyles: Record<AnalystCardTone, { surface: string; border: string }> =
  {
    default: {
      surface: `[--analyst-card-bg:${analystTheme.charcoal}]`,
      border: "border-white/10",
    },
    accent: {
      surface: "[--analyst-card-bg:#12101f]",
      border: "border-purple-500/25",
    },
  };

export function analystInsetSurface(className?: string) {
  return cn(
    "analyst-card-surface [--analyst-card-bg:#0e1420] border border-white/10",
    className
  );
}

export function analystWellSurface(className?: string) {
  return cn(
    "analyst-card-surface [--analyst-card-bg:#080c14] border border-white/10",
    className
  );
}

export function analystCardSurface(
  tone: AnalystCardTone = "default",
  className?: string
) {
  const styles = toneStyles[tone];
  return cn("analyst-card-surface", styles.surface, styles.border, className);
}
