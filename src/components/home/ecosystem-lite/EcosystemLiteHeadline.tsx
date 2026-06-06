// EcosystemLiteHeadline.tsx
// EcosystemLiteHeadline.tsx
'use client';

import React from 'react';

export default function EcosystemLiteHeadline() {
  return (
    <div className="relative z-10 w-full flex flex-col items-center text-center px-4 sm:px-6 md:px-8 -mt-8 md:-mt-12 lg:-mt-16 pb-8 md:pb-10 lg:pb-12">

      {/* Line 1 — Main statement, flanked by decorative lines */}
      <div className="flex items-center justify-center w-full max-w-5xl mx-auto gap-3 md:gap-5 mb-5 md:mb-7">

        {/* Left decorative line */}
        <div className="hidden md:flex items-center gap-3 flex-1 justify-end opacity-70">
          <div className="w-1.5 h-1.5 rounded-full bg-[#9B5DE5] shrink-0" />
          <div className="h-[1px] w-12 lg:w-24 bg-gradient-to-r from-transparent to-[#9B5DE5]" />
        </div>

        <h2 className="text-[26px] sm:text-[32px] md:text-[40px] lg:text-[48px] xl:text-[54px] font-black tracking-tight text-white leading-[1.08] uppercase px-2 shrink-0">
          Crypto Is More Than<br className="hidden sm:block" /> One Market.
        </h2>

        {/* Right decorative line */}
        <div className="hidden md:flex items-center gap-3 flex-1 justify-start opacity-70">
          <div className="h-[1px] w-12 lg:w-24 bg-gradient-to-l from-transparent to-[#06D6F7]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#06D6F7] shrink-0" />
        </div>

      </div>

      {/* Line 2 — Secondary statement */}
      <p className="text-lg sm:text-xl md:text-[18px] lg:text-[20px] font-black tracking-[0.2em] text-white leading-tight uppercase mb-4 md:mb-5">
        Different Perspectives Exists.
      </p>

      {/* Line 3 — Supporting label */}
      <p className="text-[#0A84FF] tracking-[0.45em] text-[12px] md:text-[10px] font-bold uppercase">
        One Intelligence Layer.
      </p>

    </div>
  );
}

