
import EcosystemLiteContent from "@/components/home/ecosystem-lite/EcosystemLiteContent";
import React from 'react';

export default function HeroContent() {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20 w-full">
      <div className="max-w-[1200px] w-full flex flex-col items-center text-center">
        
        {/* 1. Top Brand Area */}
        <div className="flex items-center gap-3 mb-8 md:mb-12">
          {/* Hexagon Logo Placeholder */}
          <svg width="24" height="28" viewBox="0 0 80 92" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M40 0L74.641 20V60L40 80L5.35898 60V20L40 0Z" fill="url(#hero-hex-grad)" />
            <path d="M40 15L60.641 27V51L40 63L19.359 51V27L40 15Z" fill="#02030A" />
            <defs>
              <linearGradient id="hero-hex-grad" x1="5" y1="0" x2="75" y2="80" gradientUnits="userSpaceOnUse">
                <stop stopColor="#06D6F7" />
                <stop offset="0.5" stopColor="#0A84FF" />
                <stop offset="1" stopColor="#9B5DE5" />
              </linearGradient>
            </defs>
          </svg>
          <span className="text-white font-bold tracking-[0.25em] text-sm md:text-base uppercase">
            TRADERCITY
          </span>
        </div>

        {/* 2. Main Headline */}
        {/* <h1 className="font-bold text-[42px] sm:text-[64px] md:text-[80px] lg:text-[100px] leading-[1.05] tracking-tight mb-10 md:mb-14">
          <span className="block text-white">
            One Market.
          </span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#9B5DE5] via-[#0A84FF] to-[#06D6F7]">
            Multiple Experts.
          </span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#9B5DE5] via-[#0A84FF] to-[#06D6F7]">
            Better Decisions.
          </span>
        </h1> */}

        {/* 2. Main Headline */}
       <h1 className="font-bold tracking-tight mb-8 md:mb-10">
  <span className="block text-white text-[36px] sm:text-[40px] md:text-[42px] lg:text-[60px] leading-[1]">
    Crypto Is More Than One Market.
  </span>

  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#9B5DE5] via-[#0A84FF] to-[#06D6F7]
    text-[30px] sm:text-[34px] md:text-[36px] lg:text-[40px] leading-[1] mt-3">
    Multiple Experts.
  </span>

  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#9B5DE5] via-[#0A84FF] to-[#06D6F7]
    text-[30px] sm:text-[34px] md:text-[36px] lg:text-[50px] leading-[1]">
    Better Decisions.
  </span>
</h1>

        {/* 3. Supporting Text */}
        <div className="flex flex-col items-center gap-1.5 md:gap-2 text-[#E2E8F0] text-sm sm:text-base md:text-xl lg:text-2xl font-medium tracking-wide mb-6 md:mb-8">
          <p>Different backgrounds.</p>
          {/* <p>Different methodologies.</p> */}
          <p>Different ways of reading the market.</p>
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-[#9B5DE5] via-[#0A84FF] to-[#06D6F7] font-semibold mt-1 md:mt-2">
            All in one place
          </p>
        </div>

        <div className="mt-16">
    <EcosystemLiteContent />
  </div>


        {/* 4. Scroll Indicator */}
        <div className="flex flex-col items-center">
          <div className="relative flex justify-center items-center">
            {/* Subtle glow behind the arrow */}
            <div className="absolute w-12 h-12 bg-[#0A84FF] blur-[20px] rounded-full opacity-40 pointer-events-none" />
            
            {/* Simple downward chevron arrow */}
            {/* <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="36" 
              height="36" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="#5E5CE6" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="relative z-10"
            >
              <path d="M6 9l6 6 6-6" />
            </svg> */}
          </div>
        </div>

      </div>
    </div>
  );
}
