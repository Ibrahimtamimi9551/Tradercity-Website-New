import { cn } from "@/lib/admin/cn";

/**
 * Large dashboard panel surfaces — module identity via soft tinted gradients.
 * Same philosophy as statistic widgets; softer borders, unchanged typography.
 */
export type ModulePanelTone = "burgundy" | "navy" | "purple" | "gold" | "emerald";

const panelStyles: Record<
  ModulePanelTone,
  { surface: string; border: string; accent: string }
> = {
  burgundy: {
    surface:
      "bg-[linear-gradient(165deg,rgba(190,50,70,0.22)_0%,rgba(36,12,18,0.96)_40%,rgba(14,10,16,0.99)_100%)]",
    border: "border-rose-500/20",
    accent: "text-rose-300",
  },
  navy: {
    surface:
      "bg-[linear-gradient(165deg,rgba(59,100,220,0.2)_0%,rgba(12,18,40,0.96)_40%,rgba(10,12,22,0.99)_100%)]",
    border: "border-blue-500/20",
    accent: "text-blue-300",
  },
  purple: {
    surface:
      "bg-[linear-gradient(165deg,rgba(139,92,246,0.22)_0%,rgba(22,14,40,0.96)_40%,rgba(12,10,22,0.99)_100%)]",
    border: "border-violet-500/20",
    accent: "text-violet-300",
  },
  gold: {
    surface:
      "bg-[linear-gradient(165deg,rgba(212,175,55,0.18)_0%,rgba(32,26,12,0.96)_40%,rgba(14,12,10,0.99)_100%)]",
    border: "border-amber-400/20",
    accent: "text-[#E8C96A]",
  },
  emerald: {
    surface:
      "bg-[linear-gradient(165deg,rgba(16,185,129,0.18)_0%,rgba(10,28,22,0.96)_40%,rgba(10,14,16,0.99)_100%)]",
    border: "border-emerald-500/20",
    accent: "text-emerald-300",
  },
};

export function modulePanelSurface(tone: ModulePanelTone, className?: string) {
  const styles = panelStyles[tone];
  return cn(
    "rounded-xl border p-5 shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset,0_12px_32px_-18px_rgba(0,0,0,0.65)]",
    styles.surface,
    styles.border,
    className
  );
}

export function modulePanelAccent(tone: ModulePanelTone) {
  return panelStyles[tone].accent;
}
