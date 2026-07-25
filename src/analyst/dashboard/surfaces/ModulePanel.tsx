import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import {
  analystTheme,
  modulePersonalityStyles,
  type ModulePersonality,
} from "@/analyst/dashboard/theme/analyst-theme";
import { CountUp } from "@/analyst/dashboard/ui/CountUp";
import { SectionHeader } from "@/analyst/dashboard/ui/SectionHeader";

type ModulePanelProps = {
  title: string;
  icon: LucideIcon;
  personality?: ModulePersonality;
  subtitle?: string;
  children: ReactNode;
  action?: ReactNode;
  className?: string;
};

export function ModulePanel({
  title,
  icon,
  personality = "default",
  subtitle,
  children,
  action,
  className = "",
}: ModulePanelProps) {
  const style = modulePersonalityStyles[personality];

  return (
    <section
      className={`analyst-module analyst-glass group relative overflow-hidden rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_48px_-20px_rgba(155,93,229,0.28)] md:p-6 ${className}`}
      style={{
        borderColor: style.border,
        background: style.background,
        boxShadow: analystTheme.shadowPanel,
      }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-70"
        style={{
          background: `linear-gradient(90deg, transparent, ${style.titleColor}66, transparent)`,
        }}
      />
      <SectionHeader
        icon={icon}
        title={title}
        color={style.titleColor}
        subtitle={subtitle}
        action={action}
      />
      {children}
    </section>
  );
}

type MetricCellProps = {
  label: string;
  value: string;
  /** When set, animates numeric count-up (value string still used as fallback label). */
  numericValue?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  hint?: string;
  accent?: string;
  trend?: string;
  trendPositive?: boolean;
};

export function MetricCell({
  label,
  value,
  numericValue,
  prefix = "",
  suffix = "",
  decimals = 0,
  hint,
  accent,
  trend,
  trendPositive,
}: MetricCellProps) {
  return (
    <div
      className="rounded-xl border p-4 transition-all duration-200 hover:border-white/15 hover:bg-white/[0.04] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
      style={{
        borderColor: analystTheme.insetBorder,
        background: analystTheme.insetBg,
      }}
    >
      <div className="mb-2 flex items-center gap-2">
        {accent ? (
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: accent, boxShadow: `0 0 8px ${accent}` }}
          />
        ) : null}
        <p className="text-[10px] font-bold uppercase tracking-wider text-white/40">
          {label}
        </p>
      </div>
      <p className="text-xl font-bold tracking-tight text-white md:text-2xl">
        {typeof numericValue === "number" ? (
          <CountUp
            value={numericValue}
            prefix={prefix}
            suffix={suffix}
            decimals={decimals}
          />
        ) : (
          value
        )}
      </p>
      {hint ? <p className="mt-1 text-[11px] text-white/40">{hint}</p> : null}
      {trend ? (
        <p
          className="mt-1.5 text-xs font-medium"
          style={{
            color: trendPositive
              ? analystTheme.success
              : trend === "—" || trend === "n/a"
                ? analystTheme.neutral
                : analystTheme.warning,
          }}
        >
          {trend} vs last month
        </p>
      ) : null}
    </div>
  );
}

export function ModuleLoading({ label }: { label: string }) {
  return (
    <div
      className="rounded-2xl border p-6"
      style={{
        borderColor: analystTheme.cardBorder,
        background: analystTheme.panelBg,
      }}
    >
      <div className="flex items-center gap-3">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-purple-300" />
        <p className="text-sm text-white/50">{label}</p>
      </div>
    </div>
  );
}
