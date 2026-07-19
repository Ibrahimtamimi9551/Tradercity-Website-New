"use client";

import { useId } from "react";
import { cn } from "@/lib/admin/cn";
import type { TrendPoint } from "@/types/members/referral-intelligence";

type TrendChartProps = {
  points: TrendPoint[];
  /** CSS color for stroke / bars */
  color?: string;
  variant?: "line" | "bar";
  valueFormatter?: (value: number) => string;
  className?: string;
};

/**
 * Lightweight SVG chart — plot + X-axis labels are one visualization.
 * Labels sit directly under the baseline and share each point's X coordinate.
 */
export function TrendChart({
  points,
  color = "rgb(167, 139, 250)",
  variant = "line",
  valueFormatter = (v) => v.toLocaleString(),
  className,
}: TrendChartProps) {
  const gradId = useId();
  const width = 400;
  const plotHeight = 168;
  const axisGap = 6;
  const labelBlock = 34;
  const height = plotHeight + axisGap + labelBlock;
  const padX = 18;
  const padTop = 10;
  const baselineY = plotHeight;
  const max = Math.max(...points.map((p) => p.value), 1);
  const min = 0;
  const innerW = width - padX * 2;
  const innerH = plotHeight - padTop - 4;

  const coords = points.map((p, i) => {
    const x =
      points.length === 1
        ? padX + innerW / 2
        : padX + (i / (points.length - 1)) * innerW;
    const y = padTop + innerH - ((p.value - min) / (max - min)) * innerH;
    return { ...p, x, y };
  });

  const linePath = coords
    .map((c, i) => `${i === 0 ? "M" : "L"} ${c.x.toFixed(1)} ${c.y.toFixed(1)}`)
    .join(" ");

  const areaPath = `${linePath} L ${coords[coords.length - 1]?.x ?? padX} ${baselineY.toFixed(1)} L ${coords[0]?.x ?? padX} ${baselineY.toFixed(1)} Z`;

  const labelY = baselineY + axisGap + 12;
  const valueY = labelY + 14;

  return (
    <div className={cn("w-full", className)}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-[13.5rem] w-full sm:h-[15.5rem]"
        role="img"
        aria-label="Trend chart"
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.35" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>

        {[0.25, 0.5, 0.75].map((t) => {
          const y = padTop + innerH * (1 - t);
          return (
            <line
              key={t}
              x1={padX}
              x2={width - padX}
              y1={y}
              y2={y}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1"
            />
          );
        })}

        {variant === "line" ? (
          <>
            <path d={areaPath} fill={`url(#${gradId})`} />
            <path
              d={linePath}
              fill="none"
              stroke={color}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {coords.map((c) => (
              <circle
                key={c.label}
                cx={c.x}
                cy={c.y}
                r="3.5"
                fill="#0c101c"
                stroke={color}
                strokeWidth="1.75"
              />
            ))}
          </>
        ) : (
          coords.map((c) => {
            const barW = Math.max(innerW / points.length - 10, 10);
            const barH = baselineY - c.y;
            return (
              <rect
                key={c.label}
                x={c.x - barW / 2}
                y={c.y}
                width={barW}
                height={Math.max(barH, 2)}
                rx="4"
                fill={color}
                opacity={0.85}
              />
            );
          })
        )}

        {/* Baseline — labels attach immediately below */}
        <line
          x1={padX}
          x2={width - padX}
          y1={baselineY}
          y2={baselineY}
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1"
        />

        {coords.map((c) => (
          <g key={`axis-${c.label}`}>
            <text
              x={c.x}
              y={labelY}
              textAnchor="middle"
              fill="rgba(148,163,184,0.95)"
              fontSize="11"
              fontFamily="inherit"
            >
              {c.label}
            </text>
            <text
              x={c.x}
              y={valueY}
              textAnchor="middle"
              fill="rgba(255,255,255,0.72)"
              fontSize="10.5"
              fontFamily="inherit"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {valueFormatter(c.value)}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
