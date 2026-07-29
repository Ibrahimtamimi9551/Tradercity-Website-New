/**
 * Admin datetime helpers — Indian Standard Time (Asia/Kolkata).
 * Used for Manual Payment receipt timestamps and Admin display.
 */

export const ADMIN_TIMEZONE = "Asia/Kolkata";
export const ADMIN_TIMEZONE_OFFSET = "+05:30";

const IST_PARTS = new Intl.DateTimeFormat("en-GB", {
  timeZone: ADMIN_TIMEZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

function istParts(date: Date = new Date()) {
  const bag: Record<string, string> = {};
  for (const part of IST_PARTS.formatToParts(date)) {
    if (part.type !== "literal") bag[part.type] = part.value;
  }
  return {
    year: bag.year,
    month: bag.month,
    day: bag.day,
    hour: bag.hour === "24" ? "00" : bag.hour,
    minute: bag.minute,
    second: bag.second ?? "00",
  };
}

/** `datetime-local` value (`YYYY-MM-DDTHH:mm`) in current IST — editable default. */
export function getCurrentDatetimeLocalIst(date: Date = new Date()): string {
  const p = istParts(date);
  return `${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}`;
}

/**
 * Convert a `datetime-local` IST wall-clock value to a stored ISO string
 * with an explicit +05:30 offset (seconds included).
 */
export function datetimeLocalIstToStored(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return trimmed;
  const base = trimmed.length === 16 ? `${trimmed}:00` : trimmed;
  if (/[zZ]|[+-]\d{2}:\d{2}$/.test(base)) return base;
  return `${base}${ADMIN_TIMEZONE_OFFSET}`;
}

/** Parse stored timestamps; naive values are treated as IST wall-clock. */
export function parseAdminDateTime(iso: string): Date | null {
  if (!iso || iso === "—") return null;
  const normalized = /[zZ]|[+-]\d{2}:\d{2}$/.test(iso)
    ? iso
    : `${iso}${ADMIN_TIMEZONE_OFFSET}`;
  const date = new Date(normalized);
  return Number.isNaN(date.getTime()) ? null : date;
}

/** Admin-facing display — always Asia/Kolkata. */
export function formatAdminDateTimeIst(
  iso: string | null | undefined
): string {
  if (!iso || iso === "—") return "—";
  const date = parseAdminDateTime(iso);
  if (!date) return iso;

  const day = date.toLocaleDateString("en-GB", {
    timeZone: ADMIN_TIMEZONE,
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const time = date.toLocaleTimeString("en-US", {
    timeZone: ADMIN_TIMEZONE,
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return `${day} ${time}`;
}
