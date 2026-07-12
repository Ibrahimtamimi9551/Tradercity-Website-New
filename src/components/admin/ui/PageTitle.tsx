import { cn } from "@/lib/admin/cn";

type PageTitleProps = {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
};

export function PageTitle({ title, subtitle, actions }: PageTitleProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-white">{title}</h1>
        {subtitle ? (
          <p className="mt-1 max-w-2xl text-sm text-tc-muted">{subtitle}</p>
        ) : null}
      </div>
      {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
    </div>
  );
}

type SectionHeaderProps = {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
};

export function SectionHeader({ title, description, action, className }: SectionHeaderProps) {
  return (
    <div className={cn("mb-4 flex items-start justify-between gap-4", className)}>
      <div>
        <h2 className="text-sm font-medium uppercase tracking-wider text-white/90">{title}</h2>
        {description ? <p className="mt-1 text-sm text-tc-muted">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}
