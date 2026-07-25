export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-white/[0.06] ${className}`}
      aria-hidden
    />
  );
}

export function ModuleSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[rgba(10,14,24,0.92)] p-5 md:p-6">
      <Skeleton className="mb-5 h-3 w-32" />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
          >
            <Skeleton className="mb-3 h-2.5 w-16" />
            <Skeleton className="h-7 w-20" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ChartSkeleton({ height = 180 }: { height?: number }) {
  const bars = [40, 65, 45, 80, 55, 90];
  return (
    <div
      className="flex items-end gap-2 rounded-xl border border-white/10 bg-black/20 p-4"
      style={{ height }}
    >
      {bars.map((h, i) => (
        <div
          key={i}
          className="flex-1 animate-pulse rounded-t-md bg-white/[0.06]"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}
