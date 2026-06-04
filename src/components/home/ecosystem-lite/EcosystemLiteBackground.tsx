import React from 'react';

export default function EcosystemLiteBackground() {
  return (
    <div className="absolute inset-0 bg-[#03040C] pointer-events-none overflow-hidden">
      
      {/* =========================================
          1. RESIDUAL LIGHTING CARRY-OVER
          ========================================= */}
      {/* 
        Faint, ultra-soft bleed from the Hero section.
        No distinct circles, just a structural atmospheric wash.
      */}
      <div 
        className="absolute top-0 left-0 right-0 h-[20vh] bg-gradient-to-b from-[#06D6F7]/[0.03] via-[#9B5DE5]/[0.01] to-transparent blur-[80px]"
      />

      {/* =========================================
          2. ARCHITECTURAL FOLD (TOP 30vh)
          ========================================= */}
      {/* 
        Creates the illusion that the Hero floor grid has folded downward.
        Strengthened near the boundary, fading naturally downward into the dark.
      */}
      <div 
        className="absolute top-0 left-0 right-0 h-[30vh]"
        style={{
          maskImage: 'linear-gradient(to bottom, white 0%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, white 0%, transparent 100%)',
        }}
      >
        {/* 3D Folded Grid Lines */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[250%] h-[150%] origin-top opacity-70"
          style={{
            // Negative rotation combined with origin-top swings the grid downward 
            // into the Z-axis, perfectly mirroring the Hero's upward floor convergence.
            transform: 'perspective(1000px) rotateX(-60deg) translateY(-5%)',
            background: 'linear-gradient(90deg, #9B5DE5 0%, rgba(2,3,10,0) 40%, rgba(2,3,10,0) 60%, #06D6F7 100%)',
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

      {/* =========================================
          3. BASE TECHNICAL GRID (Unfolding Effect)
          ========================================= */}
      
      {/* 
        VERTICAL LINES: Emerge first.
        Invisible at the absolute top seam (0-5%), then fade in quickly by 25%.
        This simulates the folded 3D vertical lines straightening out into 2D smoothly,
        bridging the gap between the folded face and the flat wall.
      */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px]" 
        style={{
          maskImage: 'linear-gradient(to bottom, transparent 0%, transparent 5%, white 25%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, transparent 5%, white 25%)'
        }}
      />

      {/* 
        HORIZONTAL LINES: Emerge later.
        Invisible at the top 15%, fading in slowly by 40%.
        Delaying these lines prevents them from clashing with the compressed 
        horizontal lines of the 3D folded grid above it.
      */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px]" 
        style={{
          maskImage: 'linear-gradient(to bottom, transparent 0%, transparent 15%, white 40%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, transparent 15%, white 40%)'
        }}
      />
      
    </div>
  );
}



// import React from 'react';

// export default function EcosystemLiteBackground() {
//   return (
//     <div className="absolute inset-0 bg-[#03040C] pointer-events-none overflow-hidden">
      
//       {/* =========================================
//           1. RESIDUAL LIGHTING CARRY-OVER
//           ========================================= */}
//       {/* 
//         Faint, ultra-soft bleed from the Hero section.
//         No distinct circles, just a structural atmospheric wash.
//       */}
//       <div 
//         className="absolute top-0 left-0 right-0 h-[20vh] bg-gradient-to-b from-[#06D6F7]/[0.03] via-[#9B5DE5]/[0.01] to-transparent blur-[80px]"
//       />

//       {/* =========================================
//           2. ARCHITECTURAL FOLD (TOP 25vh)
//           ========================================= */}
//       {/* 
//         Creates the illusion that the Hero floor grid has folded downward.
//         Mask fades exactly as requested: 100% at top, 0% at 25vh.
//       */}
//       <div 
//         className="absolute top-0 left-0 right-0 h-[25vh]"
//         style={{
//           maskImage: 'linear-gradient(to bottom, white 0%, transparent 100%)',
//           WebkitMaskImage: 'linear-gradient(to bottom, white 0%, transparent 100%)',
//         }}
//       >
//         {/* 3D Folded Grid Lines */}
//         <div 
//           className="absolute top-0 left-1/2 -translate-x-1/2 w-[250%] h-[150%] origin-top opacity-40"
//           style={{
//             // Negative rotation combined with origin-top swings the grid downward 
//             // into the Z-axis, perfectly mirroring the Hero's upward floor convergence.
//             transform: 'perspective(1000px) rotateX(-60deg) translateY(-5%)',
//             background: 'linear-gradient(90deg, #9B5DE5 0%, rgba(2,3,10,0) 40%, rgba(2,3,10,0) 60%, #06D6F7 100%)',
//             WebkitMaskImage: `
//               linear-gradient(to right, black 1px, transparent 1px),
//               linear-gradient(to bottom, black 1px, transparent 1px)
//             `,
//             WebkitMaskSize: '60px 60px',
//             maskImage: `
//               linear-gradient(to right, black 1px, transparent 1px),
//               linear-gradient(to bottom, black 1px, transparent 1px)
//             `,
//             maskSize: '60px 60px'
//           }}
//         />
//       </div>

//       {/* =========================================
//           3. BASE TECHNICAL GRID
//           ========================================= */}
//       {/* 
//         The faint, flat 2D grid that covers the entire background,
//         ensuring the structure feels connected even after the 3D fold fades out.
//       */}
//       <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px]" />
      
//     </div>
//   );
// }





// // EcosystemLiteBackground.tsx
// // import React from 'react';

// // export default function EcosystemLiteBackground() {
// //   return (
// //     <div className="absolute inset-0 bg-[#03040C] pointer-events-none">
// //       {/* Minimal Technical Grid */}
// //       <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px]" />
// //     </div>
// //   );
// // }
