// import Section4Background from "../home/section4/Section4Background";

// export default function PaymentActivationBackground() {
//   return <Section4Background />;
// }

import React from 'react';
import Section4Background from "../home/section4/Section4Background";

export default function PaymentActivationBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Section4Background />
    </div>
  );
}
