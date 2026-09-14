import React from "react";
import HeroBackground from "./HeroBackground";
import HeroLeftContent from "./HeroLeftContent";
import IntelligenceStage from "./intelligence/IntelligenceStage";
import HeroMetricsStrip from "./HeroMetricsStrip";
import HeroScrollIndicator from "./HeroScrollIndicator";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20 md:pt-36 md:pb-24 lg:pt-36 xl:pt-40"
    >
      {/* Untouched existing TraderCity background */}
      <HeroBackground />

      {/* Hero Content Container */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1460px] flex-1 flex-col justify-between px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        {/* Top Split: Left Content + Right 3D Intelligence Stage */}
        <div className="flex w-full flex-col items-center justify-between gap-12 lg:flex-row lg:items-start lg:gap-6 xl:gap-10">
          {/* Left Hero Content */}
          <div className="w-full flex-1 shrink-0 lg:max-w-[390px] xl:max-w-[430px] lg:pt-4">
            <HeroLeftContent />
          </div>

          {/* Right 3D Intelligence Stage */}
          <div className="w-full flex-[1.4] overflow-visible lg:pt-2">
            <IntelligenceStage />
          </div>
        </div>

        {/* Bottom Section: Metrics Strip + Scroll Indicator */}
        <div className="mt-14 flex w-full flex-col items-center sm:mt-18 lg:mt-20">
          <HeroMetricsStrip />
          <HeroScrollIndicator />
        </div>
      </div>
    </section>
  );
}
