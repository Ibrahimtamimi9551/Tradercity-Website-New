import { cn } from "@/lib/admin/cn";

type IntelligencePanelMetricProps = {
  label: string;
  value: string;
  hint?: string;
  className?: string;
  /** Emphasize as the primary figure inside a section. */
  emphasize?: boolean;
  /** Use tabular numerals for currency / counts. Default true. */
  tabular?: boolean;
};

/**
 * Inline metric cell for grouped BI panels — not a standalone WidgetCard.
 */
export function IntelligencePanelMetric({
  label,
  value,
  hint,
  className,
  emphasize = false,
  tabular = true,
}: IntelligencePanelMetricProps) {
  return (
    <div className={cn("min-w-0", className)}>
      <p
        className={cn(
          "font-medium uppercase tracking-wider text-tc-muted",
          emphasize ? "text-[11px]" : "text-[10px]"
        )}
      >
        {label}
      </p>
      <p
        className={cn(
          "mt-1.5 truncate font-semibold tracking-tight text-white",
          tabular && "tabular-nums",
          emphasize ? "text-3xl sm:text-4xl" : "text-xl sm:text-2xl"
        )}
      >
        {value}
      </p>
      {hint ? (
        <p className="mt-1 text-[11px] leading-snug text-tc-muted">{hint}</p>
      ) : null}
    </div>
  );
}
