"use client";

import React, { useState } from "react";

type Candle = {
  id: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  isSweep?: boolean;
};

// 34 candlestick data points carefully calibrated to reproduce the reference trajectory
const CANDLE_DATA: Candle[] = [
  { id: 1, open: 64200, high: 64500, low: 64100, close: 64450, volume: 42 },
  { id: 2, open: 64450, high: 64800, low: 64350, close: 64700, volume: 55 },
  { id: 3, open: 64700, high: 64900, low: 64500, close: 64600, volume: 38 },
  { id: 4, open: 64600, high: 64750, low: 64300, close: 64350, volume: 45 },
  { id: 5, open: 64350, high: 64500, low: 64000, close: 64100, volume: 60 },
  { id: 6, open: 64100, high: 64400, low: 63900, close: 64300, volume: 52 },
  { id: 7, open: 64300, high: 64650, low: 64200, close: 64550, volume: 48 },
  { id: 8, open: 64550, high: 64800, low: 64400, close: 64750, volume: 58 },
  { id: 9, open: 64750, high: 65100, low: 64650, close: 65000, volume: 72 },
  { id: 10, open: 65000, high: 65050, low: 64600, close: 64700, volume: 40 },
  { id: 11, open: 64700, high: 64800, low: 64250, close: 64300, volume: 50 },
  { id: 12, open: 64300, high: 64600, low: 64150, close: 64500, volume: 45 },
  { id: 13, open: 64500, high: 65000, low: 64400, close: 64950, volume: 68 },
  { id: 14, open: 64950, high: 65400, low: 64800, close: 65300, volume: 80 },
  { id: 15, open: 65300, high: 65800, low: 65200, close: 65750, volume: 92 },
  { id: 16, open: 65750, high: 66300, low: 65650, close: 66200, volume: 110 },
  // Liquidity sweep spike candle
  { id: 17, open: 66200, high: 67950, low: 66100, close: 66800, volume: 160, isSweep: true },
  { id: 18, open: 66800, high: 67100, low: 66350, close: 66450, volume: 95 },
  { id: 19, open: 66450, high: 66600, low: 65900, close: 66050, volume: 88 },
  { id: 20, open: 66050, high: 66400, low: 65800, close: 66300, volume: 70 },
  { id: 21, open: 66300, high: 66850, low: 66200, close: 66750, volume: 85 },
  { id: 22, open: 66750, high: 67200, low: 66600, close: 67100, volume: 98 },
  { id: 23, open: 67100, high: 67450, low: 66900, close: 67350, volume: 90 },
  { id: 24, open: 67350, high: 67400, low: 66850, close: 66950, volume: 65 },
  { id: 25, open: 66950, high: 67300, low: 66800, close: 67200, volume: 74 },
  { id: 26, open: 67200, high: 67700, low: 67100, close: 67600, volume: 105 },
  { id: 27, open: 67600, high: 68100, low: 67500, close: 68000, volume: 120 },
  { id: 28, open: 68000, high: 68350, low: 67800, close: 68250, volume: 115 },
  { id: 29, open: 68250, high: 68600, low: 68100, close: 68500, volume: 130 },
  { id: 30, open: 68500, high: 68900, low: 68400, close: 68800, volume: 145 },
  { id: 31, open: 68800, high: 68750, low: 68200, close: 68300, volume: 90 },
  { id: 32, open: 68300, high: 68800, low: 68250, close: 68700, volume: 100 },
  { id: 33, open: 68700, high: 69200, low: 68600, close: 69150, volume: 155 },
  { id: 34, open: 69150, high: 69100, low: 68450, close: 68550, volume: 110 },
];

export default function BtcTerminalChart() {
  const [hoveredCandle, setHoveredCandle] = useState<Candle | null>(null);

  const svgWidth = 560;
  const svgHeight = 240;
  const chartTop = 28;
  const chartBottom = 185;
  const chartHeight = chartBottom - chartTop;

  // Tighter price range so candles fill the vertical chart area with strong presence
  const minPrice = 63800;
  const maxPrice = 68800;
  const priceRange = maxPrice - minPrice;

  const maxVolume = 170;
  const volumeHeight = 44;
  const volumeBaseY = 238;

  const candleSpacing = svgWidth / (CANDLE_DATA.length + 1);
  const candleBodyWidth = 10;

  const getY = (price: number) => {
    return chartBottom - ((price - minPrice) / priceRange) * chartHeight;
  };

  const sweepCandle = CANDLE_DATA.find((c) => c.isSweep);
  const sweepIndex = sweepCandle ? CANDLE_DATA.indexOf(sweepCandle) : 16;
  const sweepX = (sweepIndex + 1) * candleSpacing;
  const sweepY = sweepCandle ? getY(sweepCandle.high) : 50;

  return (
    <div className="relative w-full select-none overflow-hidden rounded-xl bg-[#060a14]/60 p-1.5 sm:p-2.5">
      {/* Chart Canvas */}
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="h-auto w-full overflow-visible"
        aria-label="BTC/USDT Candlestick Chart"
      >
        <defs>
          <linearGradient id="purpleCandleGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>

          <linearGradient id="orangeCandleGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FB923C" />
            <stop offset="100%" stopColor="#EA580C" />
          </linearGradient>

          <linearGradient id="volumeBarGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366F1" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.12" />
          </linearGradient>

          <filter id="sweepGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Horizontal grid lines */}
        {[64000, 66000, 68000].map((level) => {
          const y = getY(level);
          return (
            <line
              key={level}
              x1="0"
              y1={y}
              x2={svgWidth}
              y2={y}
              stroke="rgba(255,255,255,0.06)"
              strokeDasharray="3 4"
              strokeWidth="0.8"
            />
          );
        })}

        {/* Volume histogram bars */}
        {CANDLE_DATA.map((candle, i) => {
          const x = (i + 1) * candleSpacing - candleBodyWidth / 2;
          const barHeight = (candle.volume / maxVolume) * volumeHeight;
          const y = volumeBaseY - barHeight;
          const isBullish = candle.close >= candle.open;

          return (
            <rect
              key={`vol-${candle.id}`}
              x={x}
              y={y}
              width={candleBodyWidth}
              height={barHeight}
              rx="1"
              fill={isBullish ? "url(#volumeBarGrad)" : "rgba(249,115,22,0.2)"}
            />
          );
        })}

        {/* Candlesticks */}
        {CANDLE_DATA.map((candle, i) => {
          const x = (i + 1) * candleSpacing;
          const isBullish = candle.close >= candle.open;

          const wickTopY = getY(candle.high);
          const wickBottomY = getY(candle.low);
          const bodyTopPrice = Math.max(candle.open, candle.close);
          const bodyBottomPrice = Math.min(candle.open, candle.close);
          const bodyTopY = getY(bodyTopPrice);
          const bodyHeight = Math.max(2.5, getY(bodyBottomPrice) - bodyTopY);

          const candleColor = isBullish ? "url(#purpleCandleGrad)" : "url(#orangeCandleGrad)";
          const wickColor = isBullish ? "#A78BFA" : "#FB923C";

          return (
            <g
              key={`candle-${candle.id}`}
              className="cursor-pointer transition-opacity duration-150 hover:opacity-90"
              onMouseEnter={() => setHoveredCandle(candle)}
              onMouseLeave={() => setHoveredCandle(null)}
            >
              {/* Wick */}
              <line
                x1={x}
                y1={wickTopY}
                x2={x}
                y2={wickBottomY}
                stroke={wickColor}
                strokeWidth="1.5"
                strokeLinecap="round"
              />

              {/* Body */}
              <rect
                x={x - candleBodyWidth / 2}
                y={bodyTopY}
                width={candleBodyWidth}
                height={bodyHeight}
                rx="2"
                fill={candleColor}
                stroke={isBullish ? "rgba(167,139,250,0.5)" : "rgba(251,146,60,0.5)"}
                strokeWidth="0.8"
              />
            </g>
          );
        })}

        {/* Liquidity Sweep Annotation */}
        <g className="pointer-events-none">
          {/* Vertical indicator line to wick peak */}
          <line
            x1={sweepX}
            y1={sweepY}
            x2={sweepX}
            y2={sweepY - 26}
            stroke="#06D6F7"
            strokeWidth="1.2"
            strokeDasharray="2 2"
            opacity="0.9"
          />

          {/* Pulse target beacon */}
          <circle
            cx={sweepX}
            cy={sweepY}
            r="6"
            fill="none"
            stroke="#06D6F7"
            strokeWidth="1"
            opacity="0.6"
            className="animate-ping"
          />
          <circle cx={sweepX} cy={sweepY} r="3.5" fill="#06D6F7" filter="url(#sweepGlow)" />
          <circle cx={sweepX} cy={sweepY} r="1.5" fill="#FFFFFF" />

          {/* Liquidity Sweep Tag Pill */}
          <g transform={`translate(${sweepX - 44}, ${sweepY - 48})`}>
            <rect
              width="88"
              height="22"
              rx="6"
              fill="#080D1A"
              stroke="rgba(6,214,247,0.4)"
              strokeWidth="1"
              className="drop-shadow-[0_4px_12px_rgba(6,214,247,0.25)]"
            />
            <text
              x="44"
              y="14"
              textAnchor="middle"
              className="text-[9.5px] font-semibold tracking-wide fill-cyan-300"
            >
              Liquidity Sweep
            </text>
          </g>
        </g>
      </svg>

      {/* Dynamic Hover Tooltip */}
      {hoveredCandle ? (
        <div className="pointer-events-none absolute right-3 top-3 z-20 flex items-center gap-3 rounded-lg border border-white/10 bg-[#070B18]/90 px-3 py-1.5 text-[11px] text-white/90 shadow-lg backdrop-blur-md">
          <span className="font-mono text-white">
            ${hoveredCandle.close.toLocaleString()}
          </span>
          <span
            className={
              hoveredCandle.close >= hoveredCandle.open
                ? "text-emerald-400 font-medium"
                : "text-amber-400 font-medium"
            }
          >
            {hoveredCandle.close >= hoveredCandle.open ? "+" : ""}
            {(((hoveredCandle.close - hoveredCandle.open) / hoveredCandle.open) * 100).toFixed(2)}%
          </span>
          <span className="text-white/40">Vol: {hoveredCandle.volume}k</span>
        </div>
      ) : null}
    </div>
  );
}
