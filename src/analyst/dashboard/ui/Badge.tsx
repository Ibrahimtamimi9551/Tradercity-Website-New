import type { ReactNode } from "react";
import { analystTheme } from "@/analyst/dashboard/theme/analyst-theme";

export type BadgeTone =
  | "accent"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "neutral"
  | "gold";

const tones: Record<
  BadgeTone,
  { color: string; border: string; background: string }
> = {
  accent: {
    color: analystTheme.accentMuted,
    border: analystTheme.accentBorder,
    background: analystTheme.accentSoft,
  },
  success: {
    color: analystTheme.success,
    border: analystTheme.successBorder,
    background: analystTheme.successSoft,
  },
  warning: {
    color: analystTheme.warning,
    border: analystTheme.warningBorder,
    background: analystTheme.warningSoft,
  },
  error: {
    color: analystTheme.error,
    border: "rgba(239,68,68,0.35)",
    background: analystTheme.errorSoft,
  },
  info: {
    color: analystTheme.info,
    border: analystTheme.infoBorder,
    background: analystTheme.infoSoft,
  },
  neutral: {
    color: "rgba(255,255,255,0.75)",
    border: "rgba(255,255,255,0.15)",
    background: "rgba(0,0,0,0.30)",
  },
  gold: {
    color: analystTheme.gold,
    border: "rgba(245,215,110,0.35)",
    background: "rgba(245,215,110,0.12)",
  },
};

type BadgeProps = {
  children: ReactNode;
  tone?: BadgeTone;
  pulse?: boolean;
  className?: string;
};

export function Badge({
  children,
  tone = "neutral",
  pulse = false,
  className = "",
}: BadgeProps) {
  const t = tones[tone];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold backdrop-blur-sm ${className}`}
      style={{ color: t.color, borderColor: t.border, background: t.background }}
    >
      {pulse ? (
        <span
          className="h-1.5 w-1.5 animate-pulse rounded-full"
          style={{ background: t.color, boxShadow: `0 0 6px ${t.color}` }}
        />
      ) : null}
      {children}
    </span>
  );
}
