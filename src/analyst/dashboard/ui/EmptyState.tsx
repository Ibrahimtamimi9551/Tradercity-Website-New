import type { LucideIcon } from "lucide-react";
import { Button } from "@/analyst/dashboard/ui/Button";
import { analystTheme } from "@/analyst/dashboard/theme/analyst-theme";

type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  accent?: string;
};

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  accent = analystTheme.accentMuted,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center px-3 py-10 text-center sm:px-6">
      <div
        className="relative mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border"
        style={{
          borderColor: `${accent}55`,
          background: `radial-gradient(circle at 30% 30%, ${accent}33, ${accent}10)`,
          color: accent,
          boxShadow: `0 0 32px ${accent}22`,
        }}
      >
        <div
          className="pointer-events-none absolute -inset-3 rounded-3xl opacity-40 blur-xl"
          style={{ background: accent }}
        />
        <Icon className="relative h-7 w-7" strokeWidth={1.5} />
      </div>
      <p className="text-base font-semibold text-white">{title}</p>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/45">
        {description}
      </p>
      {actionLabel && onAction ? (
        <Button variant="outline" className="mt-5" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
