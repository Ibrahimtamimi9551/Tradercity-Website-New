
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
      
      {/* Deep Blue/Cyan Glow - Top Right (Increased intensity & scale) */}
      <div 
        className="absolute -top-[10%] -right-[5%] w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] rounded-full opacity-30 blur-[130px]"
        style={{ background: 'radial-gradient(circle, #06D6F7 0%, transparent 70%)' }}
      />

      {/* Atmospheric Depth - Center Right (Enhances text readability area) */}
      <div 
        className="absolute top-[35%] right-[5%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full opacity-15 blur-[140px]"
        style={{ background: 'radial-gradient(circle, #06D6F7 0%, transparent 70%)' }}
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

     {/* Top Light Beam */}
<div
  // className="absolute top-0 left-1/2 -translate-x-1/2
  // w-[400px] h-[70vh]
  // opacity-20 blur-[60px]"
  className="absolute top-0 left-1/2 -translate-x-1/2
  w-[400px] h-full
  opacity-20 blur-[60px]"
  style={{
    background:
      "linear-gradient(to bottom, rgba(10,132,255,0.5), transparent)"
  }}
/>
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
              // Purple on left, Cyan on right. Cyan extended further to the center to increase lower-right visibility
              background: 'linear-gradient(90deg, #9B5DE5 0%, rgba(2,3,10,0) 40%, rgba(2,3,10,0) 55%, #06D6F7 100%)',
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

         {/* Horizon Glow */}
<div
  className="absolute bottom-[15%] left-1/2 -translate-x-1/2
  w-[500px] h-[120px]
  opacity-30 blur-[50px]"
  style={{
    background:
      "radial-gradient(circle, rgba(6,214,247,0.6) 0%, transparent 70%)"
  }}
/>

      {/* =========================================
          3. ORBITAL CURVES & GLOWING NODES
          ========================================= */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="orbit-purple" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#9B5DE5" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#9B5DE5" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="orbit-blue" x1="100%" y1="50%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#06D6F7" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#06D6F7" stopOpacity="0" />
          </linearGradient>
          
          {/* Filters for soft bloom effects */}
          <filter id="glow-purple" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          
          <filter id="glow-blue" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Purple Curve (Top) */}
        {/* Mathematical rx/ry to keep node perfectly aligned regardless of aspect ratio */}
        <ellipse cx="110%" cy="-30%" rx="56.56%" ry="56.56%" fill="none" stroke="url(#orbit-purple)" strokeWidth="1" />
        
        {/* Purple Node */}
        {/* Outer bloom */}
        <circle cx="70%" cy="10%" r="6" fill="#9B5DE5" filter="url(#glow-purple)" className="opacity-80" />
        {/* Inner bright core */}
        <circle cx="70%" cy="10%" r="2" fill="#E9D5FF" />
        <circle cx="70%" cy="10%" r="1" fill="#FFFFFF" />

        {/* Blue Curve (Bottom) */}
        <ellipse cx="130%" cy="10%" rx="57.01%" ry="57.01%" fill="none" stroke="url(#orbit-blue)" strokeWidth="1" />
        
        {/* Blue Node */}
        {/* Outer bloom */}
        <circle cx="85%" cy="45%" r="6" fill="#06D6F7" filter="url(#glow-blue)" className="opacity-80" />
        {/* Inner bright core */}
        <circle cx="85%" cy="45%" r="2" fill="#CFFAFE" />
        <circle cx="85%" cy="45%" r="1" fill="#FFFFFF" />
      </svg>
      
    </div>
  );
}
