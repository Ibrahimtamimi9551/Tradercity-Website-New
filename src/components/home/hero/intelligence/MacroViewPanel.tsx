import React from "react";
import { Globe, DollarSign, Percent, Droplets, ArrowLeftRight } from "lucide-react";

export default function MacroViewPanel() {
  const items = [
    { label: "DXY", icon: DollarSign, color: "#A855F7", bg: "rgba(168,85,247,0.15)" },
    { label: "Rates", icon: Percent, color: "#818CF8", bg: "rgba(129,140,248,0.15)" },
    { label: "Liquidity", icon: Droplets, color: "#06D6F7", bg: "rgba(6,214,247,0.15)" },
    { label: "Flows", icon: ArrowLeftRight, color: "#C084FC", bg: "rgba(192,132,252,0.15)" },
  ];

  return (
    <div className="relative flex w-[190px] shrink-0 flex-col rounded-2xl border border-white/[0.1] bg-[#070b16]/80 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl transition-all duration-300 hover:border-white/20 sm:w-[210px]">
      {/* Icon + Title */}
      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 shadow-[0_0_16px_rgba(99,102,241,0.25)]">
        <Globe className="h-5 w-5" strokeWidth={1.75} />
      </div>

      <h3 className="mt-4 text-base font-bold tracking-tight text-white sm:text-lg">
        Macro View
      </h3>
      <p className="mt-1 text-[11px] leading-relaxed text-[#8F9BB3]">
        Global events.
        <br />
        Local opportunities.
      </p>

      {/* List items */}
      <div className="mt-5 flex flex-col gap-2.5">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="group flex items-center gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] px-3 py-2 transition-all duration-200 hover:border-white/[0.12] hover:bg-white/[0.05]"
            >
              <div
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg"
                style={{ backgroundColor: item.bg }}
              >
                <Icon className="h-3.5 w-3.5" style={{ color: item.color }} strokeWidth={2} />
              </div>
              <span className="text-xs font-semibold tracking-wide text-white/90">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
