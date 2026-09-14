import React from "react";
import { Users, Layers } from "lucide-react";

export default function AnalystInsightsPanel() {
  const analysts = [
    { name: "BTC Structure", initials: "BS", color: "#3B82F6", avatarBg: "from-blue-600 to-indigo-700" },
    { name: "Altcoin Rotation", initials: "AR", color: "#EC4899", avatarBg: "from-pink-600 to-rose-700" },
    { name: "Macro View", initials: "MV", color: "#06D6F7", avatarBg: "from-cyan-600 to-teal-700" },
    { name: "Options Flow", initials: "OF", color: "#A855F7", avatarBg: "from-purple-600 to-indigo-800" },
  ];

  return (
    <div className="relative flex w-[190px] shrink-0 flex-col rounded-2xl border border-white/[0.1] bg-[#070b16]/80 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl transition-all duration-300 hover:border-white/20 sm:w-[210px]">
      {/* Icon + Title */}
      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-purple-500/30 bg-purple-500/10 text-purple-400 shadow-[0_0_16px_rgba(168,85,247,0.25)]">
        <Users className="h-5 w-5" strokeWidth={1.75} />
      </div>

      <h3 className="mt-4 text-base font-bold tracking-tight text-white sm:text-lg">
        Analyst
        <br />
        Insights
      </h3>

      {/* Analyst list */}
      <div className="mt-5 flex flex-col gap-2.5">
        {analysts.map((item) => (
          <div
            key={item.name}
            className="group flex items-center gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] px-3 py-2 transition-all duration-200 hover:border-white/[0.12] hover:bg-white/[0.05]"
          >
            <div
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr ${item.avatarBg} text-[10px] font-bold text-white shadow-sm ring-1 ring-white/20`}
            >
              {item.initials}
            </div>
            <span className="truncate text-xs font-semibold tracking-wide text-white/90">
              {item.name}
            </span>
          </div>
        ))}

        {/* 5+ Analysts badge */}
        <div className="mt-1 flex items-center justify-between rounded-xl border border-purple-500/25 bg-purple-500/10 px-3 py-2 text-xs font-semibold text-purple-300">
          <span className="flex items-center gap-2">
            <Layers className="h-3.5 w-3.5 text-purple-400" />
            <span>5+ Analysts</span>
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
