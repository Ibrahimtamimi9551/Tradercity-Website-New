import { cn } from "@/lib/admin/cn";

type InfoCardProps = {
  title?: string;
  children: React.ReactNode;
  className?: string;
};

export function InfoCard({ title, children, className }: InfoCardProps) {
  return (
    <div className={cn("rounded-xl border border-white/10 bg-white/[0.03] p-4", className)}>
      {title ? <h3 className="mb-3 text-sm font-medium text-white">{title}</h3> : null}
      {children}
    </div>
  );
}
