
// Herobackground Grid Resolution from Antigravity , updating whole code here - iteration 2 , 4/6/26 ,4:26pm

import React from 'react';

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#02030A]">
      
      {/* =========================================
          1. AMBIENT LIGHTING
          ========================================= */}
      {/* Deep Purple Glow - Bottom Left (Reduced dominance) */}
      <div 
        className="absolute -bottom-[20%] -left-[10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full opacity-25 blur-[130px]"
        style={{ background: 'radial-gradient(circle, #9B5DE5 0%, transparent 70%)' }}
      />
      
      {/* Soft purple glow — top left, supports typography */}
      <div
        className="absolute -top-[5%] left-[10%] h-[45vw] w-[45vw] max-h-[600px] max-w-[600px] rounded-full opacity-15 blur-[140px]"
        style={{ background: "radial-gradient(circle, #A855F7 0%, transparent 70%)" }}
      />
      
      {/* Center Spotlight */}
     {/* <div
       className="absolute top-[15%] left-1/2 -translate-x-1/2
       w-[800px] h-[800px]
       opacity-20 blur-[120px]"
       style={{
       background:
       "radial-gradient(circle, rgba(10,132,255,0.5) 0%, transparent 70%)",
     }}
/> */}

      {/* =========================================
          2. PERSPECTIVE GRID FLOOR
          ========================================= */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {/* 
          Wrapper for horizon fade. 
          Takes up the bottom 70% of the screen and smoothly fades to transparent at the top,
          eliminating any hard lines or black bands.
        */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[70vh]"
          style={{
            maskImage: 'linear-gradient(to top, white 10%, transparent 90%)',
            WebkitMaskImage: 'linear-gradient(to top, white 10%, transparent 90%)', 
          }}
        >
          {/* 3D Grid Lines */}
          <div 
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[250%] h-[150%] origin-bottom opacity-60"
            style={{
              // Relaxed perspective (1000px) and rotation (60deg) for a natural, uncompressed depth
              transform: 'perspective(1000px) rotateX(60deg) translateY(5%)',
              background: 'linear-gradient(90deg, rgba(168,85,247,0.35) 0%, rgba(2,3,10,0) 50%, rgba(2,3,10,0) 100%)',
              WebkitMaskImage: `
                linear-gradient(to right, black 1px, transparent 1px),
                linear-gradient(to bottom, black 1px, transparent 1px)
              `,
              WebkitMaskSize: '60px 60px',
              maskImage: `
                linear-gradient(to right, black 1px, transparent 1px),
                linear-gradient(to bottom, black 1px, transparent 1px)
              `,
              maskSize: '60px 60px'
            }}
          />
        </div>
      </div>

    </div>
  );
}
