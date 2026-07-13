import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/admin/cn";
import {
  modulePanelAccent,
  modulePanelSurface,
  type ModulePanelTone,
} from "@/lib/admin/module-surfaces";
import { profileFieldLabel, profileFieldValue } from "@/lib/members/format-profile";

type ReflectionCardProps = {
  tone: ModulePanelTone;
  title: string;
  icon: React.ElementType;
  badge?: React.ReactNode;
  headerAction?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
};

export function ReflectionCard({
  tone,
  title,
  icon: Icon,
  badge,
  headerAction,
  children,
  footer,
  className,
}: ReflectionCardProps) {
  return (
    <section className={cn("flex h-full flex-col", modulePanelSurface(tone), className)}>
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <div
            className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-black/25",
              modulePanelAccent(tone)
            )}
          >
            <Icon className="h-4 w-4" aria-hidden />
          </div>
          <h3 className="truncate text-sm font-medium text-white sm:text-base">{title}</h3>
          {badge}
        </div>
        {headerAction}
      </div>

      <div className="flex-1">{children}</div>

      {footer ? <div className="mt-5 pt-1">{footer}</div> : null}
    </section>
  );
}

type FieldRowProps = {
  label: string;
  children: React.ReactNode;
  className?: string;
};

export function FieldRow({ label, children, className }: FieldRowProps) {
  return (
    <div className={cn("flex items-start justify-between gap-3 py-1.5", className)}>
      <span className={profileFieldLabel()}>{label}</span>
      <div className={cn(profileFieldValue(), "max-w-[60%] text-right")}>{children}</div>
    </div>
  );
}

type ManageLinkProps = {
  href: string;
  label: string;
  tone: ModulePanelTone;
};

export function ManageLink({ href, label, tone }: ManageLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex w-full items-center justify-center gap-2 rounded-lg border bg-black/20 px-3 py-2.5 text-sm font-medium transition-colors",
        "hover:bg-white/5",
        tone === "purple" && "border-violet-400/35 text-violet-200 hover:border-violet-400/50",
        tone === "navy" && "border-blue-400/35 text-blue-200 hover:border-blue-400/50",
        tone === "emerald" && "border-emerald-400/35 text-emerald-200 hover:border-emerald-400/50",
        tone === "gold" && "border-amber-400/35 text-[#E8C96A] hover:border-amber-400/50",
        tone === "burgundy" && "border-rose-400/35 text-rose-200 hover:border-rose-400/50"
      )}
    >
      {label}
      <ArrowRight className="h-4 w-4" aria-hidden />
    </Link>
  );
}
