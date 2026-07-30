import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/admin/cn";

/**
 * Widget accent drives the whole card surface (gradient wash + border + icon + CTA).
 * Matches the Operations Center priority reference:
 * Critical = amber / rose, Important = purple, Informational = cooler accents.
 */
export type WidgetAccent =
  | "purple"
  | "amber"
  | "rose"
  | "gold"
  | "green"
  | "blue"
  | "teal";

type WidgetCardProps = {
  label: string;
  value: string | number;
  hint?: string;
  icon?: React.ElementType;
  href?: string;
  linkText?: string;
  accent?: WidgetAccent;
  /** critical = stronger wash; important = medium; informational = softer */
  priority?: "critical" | "important" | "informational";
  /**
   * Denser mobile typography/padding. md+ and lg+ still scale up for tablet/desktop.
   * Prefer enabling on management dashboards for consistent mobile-first widgets.
   */
  compactMobile?: boolean;
  trend?: {
    value: number;
    label: string;
    direction: "up" | "down";
  };
  className?: string;
};

const accentStyles: Record<
  WidgetAccent,
  {
    surface: string;
    surfaceCritical: string;
    border: string;
    borderCritical: string;
    icon: string;
    link: string;
  }
> = {
  purple: {
    surface:
      "bg-[linear-gradient(165deg,rgba(139,92,246,0.18)_0%,rgba(18,24,39,0.97)_42%,rgba(12,16,28,0.99)_100%)]",
    surfaceCritical:
      "bg-[linear-gradient(165deg,rgba(139,92,246,0.28)_0%,rgba(24,16,48,0.95)_40%,rgba(12,16,28,0.99)_100%)]",
    border: "border-violet-500/25",
    borderCritical: "border-violet-400/45",
    icon: "bg-violet-500 text-white shadow-[0_0_16px_rgba(139,92,246,0.35)]",
    link: "text-violet-300 group-hover:text-violet-200",
  },
  amber: {
    surface:
      "bg-[linear-gradient(165deg,rgba(245,158,11,0.16)_0%,rgba(28,20,12,0.96)_42%,rgba(12,16,28,0.99)_100%)]",
    surfaceCritical:
      "bg-[linear-gradient(165deg,rgba(245,158,11,0.32)_0%,rgba(42,24,8,0.94)_38%,rgba(12,16,28,0.99)_100%)]",
    border: "border-amber-500/30",
    borderCritical: "border-amber-400/50",
    icon: "bg-amber-500 text-white shadow-[0_0_18px_rgba(245,158,11,0.4)]",
    link: "text-amber-300 group-hover:text-amber-200",
  },
  rose: {
    surface:
      "bg-[linear-gradient(165deg,rgba(244,63,94,0.16)_0%,rgba(32,12,18,0.96)_42%,rgba(12,16,28,0.99)_100%)]",
    surfaceCritical:
      "bg-[linear-gradient(165deg,rgba(244,63,94,0.32)_0%,rgba(48,12,20,0.94)_38%,rgba(12,16,28,0.99)_100%)]",
    border: "border-rose-500/30",
    borderCritical: "border-rose-400/50",
    icon: "bg-rose-500 text-white shadow-[0_0_18px_rgba(244,63,94,0.4)]",
    link: "text-rose-300 group-hover:text-rose-200",
  },
  gold: {
    surface:
      "bg-[linear-gradient(165deg,rgba(212,175,55,0.16)_0%,rgba(28,24,12,0.96)_42%,rgba(12,16,28,0.99)_100%)]",
    surfaceCritical:
      "bg-[linear-gradient(165deg,rgba(212,175,55,0.26)_0%,rgba(36,28,10,0.95)_40%,rgba(12,16,28,0.99)_100%)]",
    border: "border-amber-400/25",
    borderCritical: "border-amber-300/40",
    icon: "bg-[#D4AF37] text-[#1a1408] shadow-[0_0_16px_rgba(212,175,55,0.35)]",
    link: "text-[#E8C96A] group-hover:text-[#F0D78A]",
  },
  green: {
    surface:
      "bg-[linear-gradient(165deg,rgba(16,185,129,0.14)_0%,rgba(12,28,22,0.96)_42%,rgba(12,16,28,0.99)_100%)]",
    surfaceCritical:
      "bg-[linear-gradient(165deg,rgba(16,185,129,0.24)_0%,rgba(10,36,26,0.95)_40%,rgba(12,16,28,0.99)_100%)]",
    border: "border-emerald-500/25",
    borderCritical: "border-emerald-400/40",
    icon: "bg-emerald-500 text-white shadow-[0_0_16px_rgba(16,185,129,0.35)]",
    link: "text-emerald-300 group-hover:text-emerald-200",
  },
  blue: {
    surface:
      "bg-[linear-gradient(165deg,rgba(59,130,246,0.16)_0%,rgba(12,20,36,0.96)_42%,rgba(12,16,28,0.99)_100%)]",
    surfaceCritical:
      "bg-[linear-gradient(165deg,rgba(59,130,246,0.26)_0%,rgba(10,24,48,0.95)_40%,rgba(12,16,28,0.99)_100%)]",
    border: "border-blue-500/25",
    borderCritical: "border-blue-400/40",
    icon: "bg-blue-500 text-white shadow-[0_0_16px_rgba(59,130,246,0.35)]",
    link: "text-blue-300 group-hover:text-blue-200",
  },
  teal: {
    surface:
      "bg-[linear-gradient(165deg,rgba(20,184,166,0.14)_0%,rgba(10,28,28,0.96)_42%,rgba(12,16,28,0.99)_100%)]",
    surfaceCritical:
      "bg-[linear-gradient(165deg,rgba(20,184,166,0.24)_0%,rgba(8,36,34,0.95)_40%,rgba(12,16,28,0.99)_100%)]",
    border: "border-teal-500/25",
    borderCritical: "border-teal-400/40",
    icon: "bg-teal-500 text-white shadow-[0_0_16px_rgba(20,184,166,0.35)]",
    link: "text-teal-300 group-hover:text-teal-200",
  },
};

/**
 * Responsive scale: mobile → tablet (md) → desktop (lg).
 * Avoids jumping to full desktop proportions at the `sm` breakpoint.
 */
export function WidgetCard({
  label,
  value,
  hint,
  icon: Icon,
  href,
  linkText = "View details",
  accent = "purple",
  priority = "informational",
  compactMobile = false,
  trend,
  className,
}: WidgetCardProps) {
  const styles = accentStyles[accent];
  const isCritical = priority === "critical";
  const isImportant = priority === "important";

  const content = (
    <div
      className={cn(
        "group flex h-full flex-col justify-between rounded-xl border shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset,0_10px_28px_-16px_rgba(0,0,0,0.65)] transition-[border-color,filter]",
        compactMobile ? "p-2 md:p-3.5 lg:p-5" : "p-2.5 md:p-3.5 lg:p-5",
        isCritical || isImportant ? styles.surfaceCritical : styles.surface,
        isCritical || isImportant ? styles.borderCritical : styles.border,
        isCritical && "ring-1 ring-inset",
        isCritical && accent === "amber" && "ring-amber-500/20",
        isCritical && accent === "rose" && "ring-rose-500/20",
        isImportant && "ring-1 ring-inset ring-violet-500/15",
        href && "cursor-pointer hover:brightness-[1.04]",
        className
      )}
    >
      <div>
        <div
          className={cn(
            "flex items-center gap-1.5 md:gap-2.5 lg:gap-3",
            compactMobile && "gap-1.5"
          )}
        >
          {Icon ? (
            <div
              className={cn(
                "shrink-0 rounded-full p-1.5 md:p-2 lg:p-2.5",
                compactMobile && "p-1 md:p-2 lg:p-2.5",
                styles.icon
              )}
            >
              <Icon
                className={cn(
                  "h-3 w-3 md:h-3.5 md:w-3.5 lg:h-4 lg:w-4",
                  compactMobile && "h-2.5 w-2.5 md:h-3.5 md:w-3.5 lg:h-4 lg:w-4"
                )}
                aria-hidden
              />
            </div>
          ) : null}
          <p
            className={cn(
              "min-w-0 font-medium leading-snug text-[11px] md:text-xs lg:text-sm",
              compactMobile && "text-[10px] md:text-xs lg:text-sm",
              isCritical || isImportant ? "text-white" : "text-white/85"
            )}
          >
            {label}
          </p>
        </div>

        <div className={cn("mt-2.5 md:mt-3.5 lg:mt-5", compactMobile && "mt-2 md:mt-3.5 lg:mt-5")}>
          <p
            className={cn(
              "font-semibold tracking-tight text-white tabular-nums leading-none",
              compactMobile
                ? isCritical
                  ? "text-lg md:text-3xl lg:text-[2.5rem]"
                  : "text-lg md:text-3xl lg:text-4xl"
                : isCritical
                  ? "text-xl md:text-3xl lg:text-[2.5rem]"
                  : "text-xl md:text-3xl lg:text-4xl"
            )}
          >
            {value}
          </p>
          {hint ? (
            <p
              className={cn(
                "mt-1 line-clamp-2 leading-snug text-tc-muted text-[10px] md:mt-1.5 md:text-[11px] lg:mt-2 lg:text-xs lg:leading-normal",
                compactMobile && "mt-1 text-[9px] md:mt-1.5 md:text-[11px] lg:mt-2 lg:text-xs"
              )}
            >
              {hint}
            </p>
          ) : null}
        </div>

        {trend ? (
          <div
            className={cn(
              "mt-2 flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[10px] md:mt-3 md:gap-2 md:text-[11px] lg:mt-4 lg:text-xs",
              compactMobile && "mt-1.5 text-[9px] md:mt-3 md:text-[11px] lg:mt-4 lg:text-xs"
            )}
          >
            <span
              className={cn(
                "flex items-center font-medium",
                trend.direction === "up" ? "text-emerald-400" : "text-rose-400"
              )}
            >
              {trend.direction === "up" ? (
                <ArrowUpRight className="mr-0.5 h-3 w-3" />
              ) : (
                <ArrowDownRight className="mr-0.5 h-3 w-3" />
              )}
              {trend.value}%
            </span>
            <span className="hidden text-tc-muted md:inline">{trend.label}</span>
          </div>
        ) : null}
      </div>

      {href ? (
        <div
          className={cn(
            "mt-2.5 border-t pt-2 md:mt-4 md:pt-3 lg:mt-5 lg:pt-4",
            compactMobile && "mt-2 pt-1.5 md:mt-4 md:pt-3 lg:mt-5 lg:pt-4",
            isCritical && accent === "amber" && "border-amber-500/25",
            isCritical && accent === "rose" && "border-rose-500/25",
            isImportant && "border-violet-500/20",
            priority === "informational" && "border-white/10"
          )}
        >
          <p
            className={cn(
              "font-medium transition-colors text-[11px] md:text-xs lg:text-sm",
              compactMobile && "text-[10px] md:text-xs lg:text-sm",
              styles.link
            )}
          >
            {linkText} <span aria-hidden="true">&rarr;</span>
          </p>
        </div>
      ) : null}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full">
        {content}
      </Link>
    );
  }

  return content;
}
