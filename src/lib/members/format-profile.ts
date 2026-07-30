import { cn } from "@/lib/admin/cn";
import { formatAdminDateTimeIst } from "@/lib/members/ist-datetime";

/** Admin Control Center datetime display — Indian Standard Time (Asia/Kolkata). */
export function formatProfileDateTime(iso: string | null | undefined): string {
  const formatted = formatAdminDateTimeIst(iso);
  if (formatted === "—") return "—";
  // Keep profile card punctuation style: "29 Jul 2026, 02:10 PM"
  const match = formatted.match(/^(.+?)\s+(\d{1,2}:\d{2}\s?[AP]M)$/i);
  if (match) return `${match[1]}, ${match[2]}`;
  return formatted;
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
