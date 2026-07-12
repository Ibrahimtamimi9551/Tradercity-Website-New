import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/admin/cn";

type WidgetCardProps = {
  label: string;
  value: string | number;
  hint?: string;
  icon?: React.ElementType;
  href?: string;
  linkText?: string;
  tone?: "default" | "success" | "warning" | "danger" | "purple";
  iconTone?: "default" | "success" | "warning" | "danger" | "purple" | "blue";
  trend?: {
    value: number;
    label: string;
    direction: "up" | "down";
  };
  className?: string;
};

const toneMap = {
  default: "text-white",
  success: "text-emerald-300",
  warning: "text-amber-200",
  danger: "text-rose-300",
  purple: "text-tc-purple",
};

const iconToneMap = {
  default: "bg-white/10 text-white",
  success: "bg-emerald-500 text-white",
  warning: "bg-amber-500 text-white",
  danger: "bg-rose-500 text-white",
  purple: "bg-tc-purple text-white",
  blue: "bg-blue-500 text-white",
};

export function WidgetCard({
  label,
  value,
  hint,
  icon: Icon,
  href,
  linkText = "View details",
  tone = "default",
  iconTone = "default",
  trend,
  className,
}: WidgetCardProps) {
  const content = (
    <div
      className={cn(
        "group flex flex-col justify-between rounded-xl border border-white/10 bg-[#0A0A0A] p-5 transition-colors hover:border-white/20",
        href && "cursor-pointer",
        className
      )}
    >
      <div>
        <div className="flex items-center gap-3">
          {Icon ? (
            <div className={cn("rounded-full p-2", iconToneMap[iconTone])}>
              <Icon className="h-4 w-4" aria-hidden />
            </div>
          ) : null}
          <p className="text-sm font-medium text-white/80">{label}</p>
        </div>
        
        <div className="mt-4">
          <p className={cn("text-3xl font-semibold tabular-nums", toneMap[tone])}>{value}</p>
          {hint ? <p className="mt-1 text-xs text-tc-muted">{hint}</p> : null}
        </div>

        {trend ? (
          <div className="mt-4 flex items-center gap-2 text-xs">
            <span
              className={cn(
                "flex items-center font-medium",
                trend.direction === "up" ? "text-emerald-400" : "text-rose-400"
              )}
            >
              {trend.direction === "up" ? (
                <ArrowUpRight className="mr-1 h-3 w-3" />
              ) : (
                <ArrowDownRight className="mr-1 h-3 w-3" />
              )}
              {trend.value}%
            </span>
            <span className="text-tc-muted">{trend.label}</span>
          </div>
        ) : null}
      </div>

      {href ? (
        <div className="mt-5 border-t border-white/5 pt-4">
          <p className={cn(
            "text-sm font-medium transition-colors",
            tone === "warning" ? "text-amber-400 group-hover:text-amber-300" :
            tone === "danger" ? "text-rose-400 group-hover:text-rose-300" :
            "text-tc-purple group-hover:text-purple-300"
          )}>
            {linkText} <span aria-hidden="true">&rarr;</span>
          </p>
        </div>
      ) : null}
    </div>
  );

  if (href) {
    return <Link href={href} className="block h-full">{content}</Link>;
  }

  return content;
}
