import { cn } from "@/lib/admin/cn";

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-12 text-center">
      <p className="text-sm font-medium text-white">{title}</p>
      {description ? <p className="mt-1 max-w-sm text-sm text-tc-muted">{description}</p> : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}

export function LoadingState({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] px-6 py-12">
      <p className="text-sm text-tc-muted">{label}</p>
    </div>
  );
}

export function ErrorState({
  title = "Something went wrong",
  onRetry,
}: {
  title?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 px-4 py-6 text-center">
      <p className="text-sm text-rose-200">{title}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-3 text-sm font-medium text-white underline-offset-4 hover:underline"
        >
          Try again
        </button>
      ) : null}
    </div>
  );
}
