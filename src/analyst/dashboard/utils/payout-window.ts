/**
 * Calendar helper for mock projection of payout window.
 * NestJS will own authoritative window rules later.
 */

export function isLastWeekOfMonth(date: Date = new Date()): boolean {
  const year = date.getFullYear();
  const month = date.getMonth();
  const lastDay = new Date(year, month + 1, 0).getDate();
  const day = date.getDate();
  return day > lastDay - 7;
}

export function nextPayoutWindowLabel(date: Date = new Date()): string {
  if (isLastWeekOfMonth(date)) return "Open now — last week of this month";
  const next = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  const label = next.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  return `Last week of ${label}`;
}
