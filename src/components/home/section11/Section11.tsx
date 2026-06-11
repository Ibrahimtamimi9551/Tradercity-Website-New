// ======================================================
// SECTION 11
// PURPOSE: Pricing & Membership Plans
// ROUTE: /pricing
// ======================================================

import Section11Background from "./Section11Background";
import Section11Content from "./Section11Content";

export default function Section11() {
  return (
    <section className="relative overflow-hidden">
      <Section11Background />

      <div className="relative z-10">
      <Section11Content />
      </div>
    </section>
  );
}

