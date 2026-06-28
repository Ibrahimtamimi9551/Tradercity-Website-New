import EcosystemLiteBackground from "../ecosystem-lite/EcosystemLiteBackground";

export default function Section3Background() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">

      {/* Reuse Ecosystem Lite background */}
      <EcosystemLiteBackground />

      {/* Section 3 specific effects go here later */}

    </div>
  );
}



// // import React from 'react';

// export default function Section3Background() {
//   return (
//     <div className="absolute inset-0 bg-[#03040C] pointer-events-none overflow-hidden">
      
//       {/* 1. Base dark layer (provided by parent bg color) */}
      
//       {/* 2. Vertical grid layer */}
//       <div 
//         className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px]" 
//       />

//       {/* 3. Horizontal grid layer */}
//       <div 
//         className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px]" 
//       />
      
//     </div>
//   );
// }


// export default function Section3Background() {
//   return (
//     <div
//       className="absolute inset-0 pointer-events-none"
//       style={{
//         backgroundImage: "url('/images/Backgrounds/Section3Background4.png')",
//         backgroundSize: "100% 100%",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//       }}
//     />
//   );
// }

/**
 * TraderCity Background System: "The Problem"
 * 
 * Instructions:
 * 1. Place this component at the very beginning of your section container.
 * 2. Ensure your parent section has `position: relative` and `overflow: hidden`.
 * 3. Ensure your actual content has `position: relative` and `z-index: 10` (or higher) to sit above the background.
 */
