"use client";

import { useMemo, useState } from "react";
import type { ChartPoint } from "@/analyst/dashboard/types";
import { analystTheme } from "@/analyst/dashboard/theme/analyst-theme";

type AreaChartProps = {
  points: ChartPoint[];
  height?: number;
  accent?: string;
  valuePrefix?: string;
};

function buildSmoothPath(coords: { x: number; y: number }[]): string {
  if (coords.length === 0) return "";
  if (coords.length === 1) return `M ${coords[0].x} ${coords[0].y}`;

  let d = `M ${coords[0].x} ${coords[0].y}`;
  for (let i = 0; i < coords.length - 1; i++) {
    const c0 = coords[i === 0 ? i : i - 1];
    const c1 = coords[i];
    const c2 = coords[i + 1];
    const c3 = coords[i + 2] ?? c2;
    const cp1x = c1.x + (c2.x - c0.x) / 6;
    const cp1y = c1.y + (c2.y - c0.y) / 6;
    const cp2x = c2.x - (c3.x - c1.x) / 6;
    const cp2y = c2.y - (c3.y - c1.y) / 6;
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${c2.x} ${c2.y}`;
  }
  return d;
}

export function AreaChart({
  points,
  height = 200,
  accent = analystTheme.accentMuted,
  valuePrefix = "",
}: AreaChartProps) {
  const [hover, setHover] = useState<number | null>(null);

  const width = 640;
  const padX = 28;
  const padY = 24;

  const { coords, line, area, max } = useMemo(() => {
    if (points.length === 0) {
      return { coords: [], line: "", area: "", max: 1 };
    }
    const maxVal = Math.max(...points.map((p) => p.value), 1) * 1.08;
    const innerW = width - padX * 2;
    const innerH = height - padY * 2;
    const c = points.map((p, i) => {
      const x =
        padX +
        (points.length === 1 ? innerW / 2 : (i / (points.length - 1)) * innerW);
      const y = padY + innerH - (p.value / maxVal) * innerH;
      return { x, y, label: p.label, value: p.value };
    });
    const linePath = buildSmoothPath(c);
    const areaPath = `${linePath} L ${c[c.length - 1].x} ${padY + innerH} L ${c[0].x} ${padY + innerH} Z`;
    return { coords: c, line: linePath, area: areaPath, max: maxVal };
  }, [points, height]);

  if (points.length === 0) {
    return (
      <div
        className="flex items-center justify-center rounded-xl border text-sm text-white/40"
        style={{
          height,
          borderColor: analystTheme.insetBorder,
          background: "rgba(0,0,0,0.25)",
        }}
      >
        No trend data yet
      </div>
    );
  }

  const activeIndex = hover ?? coords.length - 1;
  const active = coords[activeIndex];
  const gradId = `area-${accent.replace("#", "")}`;
  const tooltipLeft = Math.min(
    Math.max((active.x / width) * 100, 12),
    88
  );

  return (
    <div
      className="relative w-full overflow-hidden rounded-xl border p-2 sm:p-3"
      style={{
        borderColor: `${accent}40`,
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0.35) 100%)",
      }}
    >
      {active ? (
        <div
          className="pointer-events-none absolute top-3 z-10 -translate-x-1/2 rounded-lg border border-white/15 bg-black/80 px-3 py-1.5 text-[11px] shadow-lg backdrop-blur-md"
          style={{ left: `${tooltipLeft}%` }}
        >
          <span className="font-semibold text-white/90">{active.label}</span>
          <span className="ml-2 font-bold" style={{ color: accent }}>
            {valuePrefix}
            {active.value.toLocaleString()}
          </span>
        </div>
      ) : null}

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-auto w-full max-w-full analyst-chart-draw"
        role="img"
        aria-label="Trend chart"
        onMouseLeave={() => setHover(null)}
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={accent} stopOpacity="0.5" />
            <stop offset="70%" stopColor={accent} stopOpacity="0.12" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </linearGradient>
        </defs>

        {[0, 0.25, 0.5, 0.75, 1].map((t) => (
          <line
            key={t}
            x1={padX}
            x2={width - padX}
            y1={padY + (height - padY * 2) * t}
            y2={padY + (height - padY * 2) * t}
            stroke="rgba(255,255,255,0.06)"
            strokeDasharray="3 5"
          />
        ))}

        {/* Active month highlight band */}
        {active ? (
          <rect
            x={active.x - 18}
            y={padY}
            width={36}
            height={height - padY * 2}
            fill={accent}
            opacity="0.06"
            rx="8"
          />
        ) : null}

        <path d={area} fill={`url(#${gradId})`} className="analyst-chart-area" />
        <path
          d={line}
          fill="none"
          stroke={accent}
          strokeWidth="2.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="analyst-chart-line"
        />

        {coords.map((c, i) => {
          const isActive = i === activeIndex;
          return (
            <g key={c.label}>
              <circle
                cx={c.x}
                cy={c.y}
                r={isActive ? 6 : 3.5}
                fill={isActive ? accent : "#0a0e18"}
                stroke={accent}
                strokeWidth={isActive ? 2.5 : 2}
                className="transition-all duration-200"
                style={{
                  filter: isActive ? `drop-shadow(0 0 6px ${accent})` : undefined,
                  cursor: "pointer",
                }}
                onMouseEnter={() => setHover(i)}
              />
              <rect
                x={c.x - 28}
                y={padY}
                width={56}
                height={height - padY * 2}
                fill="transparent"
                onMouseEnter={() => setHover(i)}
              />
            </g>
          );
        })}
      </svg>

      <div className="mt-1.5 flex justify-between gap-1 px-1 text-[10px] uppercase tracking-wider">
        {points.map((p, i) => (
          <span
            key={p.label}
            className={`min-w-0 truncate text-center transition-colors ${
              i === activeIndex ? "font-semibold text-white/80" : "text-white/35"
            }`}
          >
            {p.label}
          </span>
        ))}
      </div>
      <p className="sr-only">Chart scale max {Math.round(max)}</p>
    </div>
  );
}
