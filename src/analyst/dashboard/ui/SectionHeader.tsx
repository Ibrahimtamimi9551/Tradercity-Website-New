import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type SectionHeaderProps = {
  icon: LucideIcon;
  title: string;
  color: string;
  subtitle?: string;
  action?: ReactNode;
};

export function SectionHeader({
  icon: Icon,
  title,
  color,
  subtitle,
  action,
}: SectionHeaderProps) {
  return (
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
      <div className="flex min-w-0 flex-wrap items-center gap-2">
        <Icon className="h-4 w-4 shrink-0" style={{ color }} strokeWidth={1.75} />
        <h2
          className="text-xs font-bold uppercase tracking-[0.2em]"
          style={{ color }}
        >
          {title}
        </h2>
        {subtitle ? (
          <span className="hidden text-xs text-white/40 md:inline">
            {subtitle}
          </span>
        ) : null}
      </div>
      {action}
    </div>
  );
}
