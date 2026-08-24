import type { ReactNode } from "react";
import { cn } from "@/lib/super-admin/cn";

type SectionCardProps = {
  title?: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
};

export function SectionCard({
  title,
  description,
  actions,
  children,
  className,
  bodyClassName,
}: SectionCardProps) {
  return (
    <section
      className={cn(
        "rounded-xl border border-white/[0.07] bg-zinc-950/60 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)]",
        className
      )}
    >
      {title || description || actions ? (
        <div className="flex flex-col gap-3 border-b border-white/[0.06] px-5 py-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 space-y-1">
            {title ? (
              <h2 className="text-sm font-semibold tracking-wide text-zinc-100">{title}</h2>
            ) : null}
            {description ? (
              <p className="text-xs leading-relaxed text-zinc-500">{description}</p>
            ) : null}
          </div>
          {actions ? <div className="flex shrink-0 flex-wrap gap-2">{actions}</div> : null}
        </div>
      ) : null}
      <div className={cn("px-5 py-5", bodyClassName)}>{children}</div>
    </section>
  );
}
