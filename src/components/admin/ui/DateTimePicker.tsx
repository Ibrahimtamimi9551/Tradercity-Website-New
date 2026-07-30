"use client";

import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/admin/cn";
import {
  datetimeLocalIstToStored,
  formatAdminDateTimeIst,
  getCurrentDatetimeLocalIst,
} from "@/lib/members/ist-datetime";

type DateTimePickerProps = {
  value: string;
  onChange: (value: string) => void;
  "aria-label"?: string;
  className?: string;
  /** Accent aligned with Subscriptions gold tone by default. */
  accent?: "gold" | "violet";
};

type Parts = {
  year: number;
  month: number; // 1-12
  day: number;
  hour24: number;
  minute: number;
};

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function parseValue(value: string): Parts {
  const fallback = getCurrentDatetimeLocalIst();
  const raw = value.trim() || fallback;
  const match = raw.match(
    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::\d{2})?/
  );
  if (!match) {
    return parseValue(fallback);
  }
  return {
    year: Number(match[1]),
    month: Number(match[2]),
    day: Number(match[3]),
    hour24: Number(match[4]),
    minute: Number(match[5]),
  };
}

function toValue(parts: Parts): string {
  return `${parts.year}-${pad(parts.month)}-${pad(parts.day)}T${pad(parts.hour24)}:${pad(parts.minute)}`;
}

function daysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

function clampDay(year: number, month: number, day: number): number {
  return Math.min(day, daysInMonth(year, month));
}

function to12Hour(hour24: number): { hour12: number; period: "AM" | "PM" } {
  const period = hour24 >= 12 ? "PM" : "AM";
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return { hour12, period };
}

function to24Hour(hour12: number, period: "AM" | "PM"): number {
  if (period === "AM") return hour12 === 12 ? 0 : hour12;
  return hour12 === 12 ? 12 : hour12 + 12;
}

/**
 * Admin Date & Time picker — calendar popup + independent time controls.
 * Value format: `YYYY-MM-DDTHH:mm` (IST wall-clock for Manual Payments).
 */
export function DateTimePicker({
  value,
  onChange,
  "aria-label": ariaLabel = "Date and time",
  className,
  accent = "gold",
}: DateTimePickerProps) {
  const parts = parseValue(value);
  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState(parts.year);
  const [viewMonth, setViewMonth] = useState(parts.month);
  const [panelPos, setPanelPos] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  const accentBorder =
    accent === "gold" ? "border-amber-500/40" : "border-violet-500/40";
  const accentBg =
    accent === "gold"
      ? "bg-amber-500/15 text-amber-100"
      : "bg-violet-500/15 text-violet-100";
  const accentSelected =
    accent === "gold"
      ? "bg-amber-500/30 text-amber-50 ring-1 ring-amber-400/40"
      : "bg-violet-500/30 text-violet-50 ring-1 ring-violet-400/40";
  const accentFocus =
    accent === "gold"
      ? "focus:border-amber-500/45 focus:ring-amber-500/20"
      : "focus:border-violet-500/45 focus:ring-violet-500/20";

  useEffect(() => {
    if (!open) return;
    setViewYear(parts.year);
    setViewMonth(parts.month);
  }, [open, parts.year, parts.month]);

  useLayoutEffect(() => {
    if (!open || !rootRef.current) {
      setPanelPos(null);
      return;
    }

    const update = () => {
      const rect = rootRef.current?.getBoundingClientRect();
      if (!rect) return;
      const width = Math.min(328, Math.max(rect.width, 280));
      const left = Math.min(
        Math.max(8, rect.left),
        window.innerWidth - width - 8
      );
      const estimatedHeight = 420;
      const spaceBelow = window.innerHeight - rect.bottom;
      const openUp = spaceBelow < estimatedHeight && rect.top > spaceBelow;
      const top = openUp
        ? Math.max(8, rect.top - estimatedHeight - 8)
        : rect.bottom + 8;
      setPanelPos({ top, left, width });
    };

    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (rootRef.current?.contains(target)) return;
      if (panelRef.current?.contains(target)) return;
      setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const calendarCells = useMemo(() => {
    const firstDow = new Date(viewYear, viewMonth - 1, 1).getDay();
    const total = daysInMonth(viewYear, viewMonth);
    const cells: Array<number | null> = [];
    for (let i = 0; i < firstDow; i++) cells.push(null);
    for (let d = 1; d <= total; d++) cells.push(d);
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  }, [viewYear, viewMonth]);

  const { hour12, period } = to12Hour(parts.hour24);
  const display = formatAdminDateTimeIst(datetimeLocalIstToStored(value));

  const patch = (next: Partial<Parts>) => {
    const merged: Parts = {
      year: next.year ?? parts.year,
      month: next.month ?? parts.month,
      day: next.day ?? parts.day,
      hour24: next.hour24 ?? parts.hour24,
      minute: next.minute ?? parts.minute,
    };
    merged.day = clampDay(merged.year, merged.month, merged.day);
    onChange(toValue(merged));
  };

  const shiftMonth = (delta: number) => {
    const date = new Date(viewYear, viewMonth - 1 + delta, 1);
    setViewYear(date.getFullYear());
    setViewMonth(date.getMonth() + 1);
  };

  const shiftYear = (delta: number) => {
    setViewYear((y) => y + delta);
  };

  const setToday = () => {
    const now = parseValue(getCurrentDatetimeLocalIst());
    onChange(
      toValue({
        year: now.year,
        month: now.month,
        day: now.day,
        hour24: parts.hour24,
        minute: parts.minute,
      })
    );
    setViewYear(now.year);
    setViewMonth(now.month);
  };

  const hourOptions = Array.from({ length: 12 }, (_, i) => i + 1);
  const minuteOptions = Array.from({ length: 60 }, (_, i) => i);

  const panel =
    open && panelPos ? (
      <div
        ref={panelRef}
        id={panelId}
        role="dialog"
        aria-label="Choose date and time"
        style={{
          position: "fixed",
          top: panelPos.top,
          left: panelPos.left,
          width: panelPos.width,
          zIndex: 90,
        }}
        className="overflow-hidden rounded-xl border border-white/10 bg-[#0c101c] shadow-[0_16px_48px_-12px_rgba(0,0,0,0.7)]"
      >
        <div className="border-b border-white/10 px-3 py-2.5">
          <div className="flex items-center justify-between gap-1">
            <button
              type="button"
              onClick={() => shiftYear(-1)}
              className="rounded-md p-1.5 text-tc-muted transition-colors hover:bg-white/[0.06] hover:text-white"
              aria-label="Previous year"
            >
              <ChevronsLeft className="h-4 w-4" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => shiftMonth(-1)}
              className="rounded-md p-1.5 text-tc-muted transition-colors hover:bg-white/[0.06] hover:text-white"
              aria-label="Previous month"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden />
            </button>
            <div className="min-w-0 flex-1 text-center">
              <p className="text-sm font-semibold text-white">
                {MONTHS[viewMonth - 1]} {viewYear}
              </p>
            </div>
            <button
              type="button"
              onClick={() => shiftMonth(1)}
              className="rounded-md p-1.5 text-tc-muted transition-colors hover:bg-white/[0.06] hover:text-white"
              aria-label="Next month"
            >
              <ChevronRight className="h-4 w-4" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => shiftYear(1)}
              className="rounded-md p-1.5 text-tc-muted transition-colors hover:bg-white/[0.06] hover:text-white"
              aria-label="Next year"
            >
              <ChevronsRight className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>

        <div className="px-3 pt-2.5">
          <div className="mb-1 grid grid-cols-7 gap-0.5">
            {WEEKDAYS.map((day) => (
              <div
                key={day}
                className="py-1 text-center text-[10px] font-medium uppercase tracking-wide text-tc-muted"
              >
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-0.5 pb-2">
            {calendarCells.map((day, index) => {
              if (day == null) {
                return <div key={`empty-${index}`} className="h-8" />;
              }
              const selected =
                day === parts.day &&
                viewMonth === parts.month &&
                viewYear === parts.year;
              return (
                <button
                  key={`${viewYear}-${viewMonth}-${day}`}
                  type="button"
                  onClick={() =>
                    patch({
                      year: viewYear,
                      month: viewMonth,
                      day,
                    })
                  }
                  className={cn(
                    "h-8 rounded-lg text-sm tabular-nums transition-colors",
                    selected
                      ? accentSelected
                      : "text-white/85 hover:bg-white/[0.06]"
                  )}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        <div className="border-t border-white/10 px-3 py-3">
          <div className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-tc-muted">
            <Clock className="h-3.5 w-3.5" aria-hidden />
            Time (IST)
          </div>
          <div className="flex items-center gap-2">
            <select
              aria-label="Hour"
              value={hour12}
              onChange={(e) =>
                patch({
                  hour24: to24Hour(Number(e.target.value), period),
                })
              }
              style={{ colorScheme: "dark" }}
              className="h-9 flex-1 rounded-lg border border-white/10 bg-[#070b18] px-2 text-sm text-white/90 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
            >
              {hourOptions.map((h) => (
                <option key={h} value={h}>
                  {pad(h)}
                </option>
              ))}
            </select>
            <span className="text-tc-muted">:</span>
            <select
              aria-label="Minute"
              value={parts.minute}
              onChange={(e) => patch({ minute: Number(e.target.value) })}
              style={{ colorScheme: "dark" }}
              className="h-9 flex-1 rounded-lg border border-white/10 bg-[#070b18] px-2 text-sm text-white/90 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
            >
              {minuteOptions.map((m) => (
                <option key={m} value={m}>
                  {pad(m)}
                </option>
              ))}
            </select>
            <select
              aria-label="AM or PM"
              value={period}
              onChange={(e) =>
                patch({
                  hour24: to24Hour(hour12, e.target.value as "AM" | "PM"),
                })
              }
              style={{ colorScheme: "dark" }}
              className="h-9 w-[4.5rem] rounded-lg border border-white/10 bg-[#070b18] px-2 text-sm text-white/90 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 border-t border-white/10 px-3 py-2.5">
          <button
            type="button"
            onClick={setToday}
            className={cn(
              "rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors",
              accentBorder,
              accentBg
            )}
          >
            Today
          </button>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-lg border border-emerald-500/40 bg-emerald-500/15 px-3 py-1.5 text-xs font-medium text-emerald-100 transition-colors hover:bg-emerald-500/25"
          >
            Done
          </button>
        </div>
      </div>
    ) : null;

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "flex w-full items-center gap-2.5 rounded-lg border border-white/10 bg-[#070b18]/80 px-3 py-2.5 text-left text-sm text-white/90 transition-colors",
          "hover:border-white/20 hover:bg-[#070b18]",
          "focus:outline-none focus:ring-2",
          accentFocus,
          open && accentBorder
        )}
      >
        <Calendar className="h-4 w-4 shrink-0 text-tc-muted" aria-hidden />
        <span className="min-w-0 flex-1 truncate tabular-nums">
          {display === "—" ? "Select date and time" : display}
        </span>
        <Clock className="h-3.5 w-3.5 shrink-0 text-tc-muted" aria-hidden />
      </button>

      {typeof document !== "undefined" && panel
        ? createPortal(panel, document.body)
        : null}
    </div>
  );
}
