// import PaymentActivation from "@/components/payment-activation/PaymentActivation";

// export default function PaymentActivationPage() {
//   return <PaymentActivation />;
// }

import React from 'react';
import PaymentActivation from "@/components/payment-activation/PaymentActivation";

export default function PaymentActivationPage() {
  return (
    <main className="min-h-screen bg-[#0A0D14] text-white relative overflow-hidden font-sans">
      <PaymentActivation />
    </main>
  );
}
