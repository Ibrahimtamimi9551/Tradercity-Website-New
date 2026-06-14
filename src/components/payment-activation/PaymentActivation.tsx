// import PaymentActivationBackground from "./PaymentActivationBackground";
// import PaymentActivationContent from "./PaymentActivationContent";

// export default function PaymentActivation() {
//   return (
//     <section className="relative min-h-screen overflow-hidden">
//       <PaymentActivationBackground />
//       <PaymentActivationContent />
//     </section>
//   );
// }

import React from 'react';
import PaymentActivationBackground from "./PaymentActivationBackground";
import PaymentActivationContent from "./PaymentActivationContent";

export default function PaymentActivation() {
  return (
    <div className="relative min-h-screen w-full flex flex-col pt-10 pb-20">
      {/* Ecosystem Background */}
      <PaymentActivationBackground />
      
      {/* Main Content */}
      <div className="relative z-10 w-full">
        <PaymentActivationContent />
      </div>
    </div>
  );
}
