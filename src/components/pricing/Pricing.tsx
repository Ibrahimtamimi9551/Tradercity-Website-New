// ======================================================
// SECTION 11
// PURPOSE: Pricing & Membership Plans
// ROUTE: /pricing
// ======================================================

import PricingBackground from "./PricingBackground";
import PricingContent from "./PricingContent";

export default function Pricing() {
  return (
    <section className="relative overflow-hidden">
      <PricingBackground />

      <div className="relative z-10">
      <PricingContent />
      </div>
    </section>
  );
}

