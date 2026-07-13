import { cn } from "@/lib/admin/cn";

/** Admin Control Center datetime display — matches Members directory style. */
export function formatProfileDateTime(iso: string | null | undefined): string {
  if (!iso) return "—";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";

  const day = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const time = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return `${day}, ${time}`;
}

export function formatDaysRemaining(days: number | null | undefined): string {
  if (days == null) return "—";
  return `${days} day${days === 1 ? "" : "s"}`;
}

export function daysRemainingClass(days: number | null | undefined): string {
  if (days == null) return "text-white/80";
  if (days <= 7) return "text-rose-300";
  if (days <= 14) return "text-amber-200";
  return "text-emerald-300";
}

export function profileFieldLabel(className?: string) {
  return cn("text-xs text-tc-muted", className);
}

export function profileFieldValue(className?: string) {
  return cn("text-sm font-medium text-white/90", className);
}
