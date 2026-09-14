"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  TrendingUp,
  Activity,
  BarChart2,
  Percent,
  Flame,
  Globe,
  Users,
  Layers,
} from "lucide-react";
import BtcTerminalChart from "./BtcTerminalChart";

// Sparkline SVG generator
function MiniSparkline({
  data,
  color,
}: {
  data: number[];
  color: string;
}) {
  const width = 56;
  const height = 18;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data
    .map((val, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((val - min) / range) * (height - 4) - 2;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <svg width={width} height={height} className="overflow-visible">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
}

export default function MainMarketDashboard() {
  const [activeTimeframe, setActiveTimeframe] = useState("15m");
  const [activeTab, setActiveTab] = useState("overview");

  const timeframes = ["15m", "1H", "4H", "1D"];

  const sidebarNav = [
    { id: "overview", label: "Overview", icon: Layers },
    { id: "flow", label: "Market Flow", icon: Activity },
    { id: "oi", label: "Open Interest", icon: BarChart2 },
    { id: "funding", label: "Funding Rates", icon: Percent },
    { id: "liquidations", label: "Liquidations", icon: Flame },
    { id: "macro", label: "Macro View", icon: Globe },
    { id: "analysts", label: "Analyst Insights", icon: Users },
  ];

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-white/[0.12] bg-[#070b18]/92 p-3.5 shadow-[0_25px_60px_rgba(0,0,0,0.7),0_0_50px_rgba(59,130,246,0.08),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl transition-all duration-300 sm:rounded-3xl sm:p-5">
      {/* 1. TOP HEADER BAR */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-3.5 sm:pb-4">
        {/* Left: BTC Asset Info */}
        <div className="flex items-center gap-3">
          {/* BTC Icon */}
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F7931A] text-white shadow-[0_0_12px_rgba(247,147,26,0.4)] sm:h-9 sm:w-9">
            <span className="font-bold text-sm sm:text-base leading-none">₿</span>
          </div>

          {/* Pair Name + Dropdown */}
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-bold text-white sm:text-base">BTC / USDT</span>
            <ChevronDown className="h-3.5 w-3.5 text-white/50" />
          </div>

          {/* Price */}
          <span className="ml-1 text-base font-bold tracking-tight text-white sm:text-xl">
            67,432.18
          </span>

          {/* Percentage badge */}
          <span className="inline-flex items-center gap-1 rounded-md border border-emerald-500/25 bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.15)]">
            +2.41%
            <TrendingUp className="h-3 w-3" />
          </span>
        </div>

        {/* Right: Timeframes */}
        <div className="flex items-center gap-1 rounded-xl border border-white/[0.06] bg-white/[0.03] p-1">
          {timeframes.map((tf) => (
            <button
              key={tf}
              type="button"
              onClick={() => setActiveTimeframe(tf)}
              className={[
                "rounded-lg px-2.5 py-1 text-xs font-medium transition-all duration-200",
                activeTimeframe === tf
                  ? "bg-[#9B5DE5]/25 text-white shadow-[0_0_10px_rgba(155,93,229,0.35)] ring-1 ring-[#9B5DE5]/40"
                  : "text-white/60 hover:text-white",
              ].join(" ")}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* 2. MAIN CENTER CONTENT (Left Nav + Chart + Right Indicators) */}
      <div className="mt-3.5 grid grid-cols-1 gap-3.5 lg:grid-cols-12 sm:mt-4">
        {/* Left Navigation Column inside Dashboard */}
        <div className="hidden flex-col gap-1 rounded-xl border border-white/[0.05] bg-[#050812]/50 p-2 lg:col-span-3 lg:flex">
          {sidebarNav.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={[
                  "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-xs font-medium transition-all duration-150",
                  isActive
                    ? "bg-white/[0.08] text-white shadow-sm ring-1 ring-white/10"
                    : "text-white/60 hover:bg-white/[0.04] hover:text-white/90",
                ].join(" ")}
              >
                <Icon
                  className={[
                    "h-3.5 w-3.5",
                    isActive ? "text-[#C084FC]" : "text-white/40",
                  ].join(" ")}
                />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Center Candlestick Chart */}
        <div className="col-span-1 lg:col-span-6">
          <BtcTerminalChart />
        </div>

        {/* Right Indicators Column */}
        <div className="grid grid-cols-2 gap-2 rounded-xl border border-white/[0.05] bg-[#050812]/50 p-2.5 sm:grid-cols-4 lg:col-span-3 lg:flex lg:flex-col lg:justify-between">
          {/* Indicator 1: Spot CVD */}
          <div className="flex flex-col justify-between rounded-lg bg-white/[0.02] p-2">
            <div className="flex items-center justify-between gap-1">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#8F9BB3]">
                Spot CVD
              </span>
              <MiniSparkline data={[10, 12, 11, 15, 14, 18, 22]} color="#10B981" />
            </div>
            <p className="mt-1 font-mono text-xs font-bold text-emerald-400 sm:text-sm">
              +12.4K
            </p>
          </div>

          {/* Indicator 2: Open Interest */}
          <div className="flex flex-col justify-between rounded-lg bg-white/[0.02] p-2">
            <div className="flex items-center justify-between gap-1">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#8F9BB3]">
                Open Interest
              </span>
              <MiniSparkline data={[14, 13, 16, 15, 18, 19, 21]} color="#A855F7" />
            </div>
            <p className="mt-1 font-mono text-xs font-bold text-purple-400 sm:text-sm">
              +2.8%
            </p>
          </div>

          {/* Indicator 3: Funding Rate */}
          <div className="flex flex-col justify-between rounded-lg bg-white/[0.02] p-2">
            <div className="flex items-center justify-between gap-1">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#8F9BB3]">
                Funding Rate
              </span>
              <MiniSparkline data={[20, 18, 16, 17, 15, 13, 11]} color="#F97316" />
            </div>
            <p className="mt-1 font-mono text-xs font-bold text-amber-400 sm:text-sm">
              -0.006%
            </p>
          </div>

          {/* Indicator 4: Orderbook Depth */}
          <div className="flex flex-col justify-between rounded-lg bg-white/[0.02] p-2">
            <div className="flex items-center justify-between gap-1">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#8F9BB3]">
                Orderbook Depth
              </span>
              <MiniSparkline data={[12, 14, 13, 15, 16, 15, 17]} color="#06D6F7" />
            </div>
            <p className="mt-1 text-xs font-bold text-cyan-400 sm:text-sm">
              Healthy
            </p>
          </div>
        </div>
      </div>

      {/* 3. BOTTOM STATE BAR */}
      <div className="mt-4 grid grid-cols-2 gap-2 border-t border-white/[0.08] pt-3.5 sm:grid-cols-4 sm:gap-4">
        {/* Market State */}
        <div className="flex flex-col">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#8F9BB3]">
            Market State
          </span>
          <span className="mt-0.5 text-xs font-bold text-emerald-400 sm:text-sm">
            ACCUMULATION
          </span>
        </div>

        {/* Liquidity */}
        <div className="flex flex-col">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#8F9BB3]">
            Liquidity
          </span>
          <span className="mt-0.5 text-xs font-bold text-cyan-400 sm:text-sm">
            IN RANGE
          </span>
        </div>

        {/* Trend */}
        <div className="flex flex-col">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#8F9BB3]">
            Trend
          </span>
          <span className="mt-0.5 text-xs font-bold text-white/90 sm:text-sm">
            NEUTRAL
          </span>
        </div>

        {/* Confidence */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-[#8F9BB3]">
              Confidence <ChevronDown className="h-2.5 w-2.5" />
            </span>
            <span className="font-mono text-xs font-bold text-purple-300">
              78%
            </span>
          </div>
          {/* Segmented confidence bars */}
          <div className="mt-1.5 flex items-center gap-1.5">
            <div className="h-1.5 flex-1 rounded-full bg-purple-500 shadow-[0_0_6px_rgba(168,85,247,0.6)]" />
            <div className="h-1.5 flex-1 rounded-full bg-purple-500 shadow-[0_0_6px_rgba(168,85,247,0.6)]" />
            <div className="h-1.5 flex-1 rounded-full bg-purple-500 shadow-[0_0_6px_rgba(168,85,247,0.6)]" />
            <div className="h-1.5 flex-1 rounded-full bg-white/15" />
          </div>
        </div>
      </div>
    </div>
  );
}
