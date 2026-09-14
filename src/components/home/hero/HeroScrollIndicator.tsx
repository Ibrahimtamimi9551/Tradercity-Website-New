import React from "react";

export default function HeroScrollIndicator() {
  return (
    <div className="relative mt-12 flex w-full max-w-[1440px] flex-col items-center justify-between gap-4 border-t border-white/[0.04] pt-6 sm:flex-row sm:gap-0 sm:pt-8">
      {/* Left: Community Tagline */}
      <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8F9BB3]/60 sm:text-[11px]">
        A STRONGER TRADING COMMUNITY TOGETHER
      </div>

      {/* Center: Scroll to Explore Indicator */}
      <a
        href="#journey"
        className="group flex flex-col items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#8F9BB3]/80 transition-colors duration-200 hover:text-white"
      >
        <span>SCROLL TO EXPLORE</span>
        {/* Animated vertical line */}
        <div className="relative h-7 w-[1.5px] overflow-hidden rounded-full bg-white/10">
          <div className="h-3 w-full bg-gradient-to-b from-[#38BDF8] to-[#818CF8] animate-bounce" />
        </div>
      </a>

      {/* Right: Brand year */}
      <div className="font-mono text-[10px] font-medium tracking-[0.22em] text-[#8F9BB3]/60 sm:text-[11px]">
        TRADERCITY <span className="text-[#8F9BB3]/30">{"//"}</span> 2026
      </div>
    </div>
  );
}
