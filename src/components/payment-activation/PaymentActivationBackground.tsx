// import Section4Background from "../home/section4/Section4Background";

// export default function PaymentActivationBackground() {
//   return <Section4Background />;
// }

// import React from 'react';
// import Section4Background from "../home/section4/Section4Background";

// export default function PaymentActivationBackground() {
//   return (
//     <div className="fixed inset-0 z-0 pointer-events-none">
//       <Section4Background />
//     </div>
//   );
// }

//GLOBAL BACKGROUND 

import React from 'react';

export default function PaymentActivationBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      
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
