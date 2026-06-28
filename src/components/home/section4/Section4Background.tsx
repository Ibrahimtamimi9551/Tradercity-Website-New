//GLOBAL BACKGROUND 

import React from 'react';

export default function Section4Background() {
  return (
    <div className="absolute inset-0 bg-[#03040C] pointer-events-none overflow-hidden">
      
      {/* 1. Base dark layer (provided by parent bg color) */}
      
      {/* 2. Vertical grid layer */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px]" 
      />

      {/* 3. Horizontal grid layer */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px]" 
      />
      
    </div>
  );
}

// Iteration 1
// export default function Section4Background() {
//   return (
//     <div
//       className="absolute inset-0 pointer-events-none"
//       style={{
//         backgroundImage: "url('/images/Backgrounds/Section4Background4.png')",
//         backgroundSize: "100% 100%",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//       }}
//     />
//   );
// }

// import Section3Background from "../section3/Section3Background";

// export default function Section5Background() {
//   return <Section3Background />;
// }