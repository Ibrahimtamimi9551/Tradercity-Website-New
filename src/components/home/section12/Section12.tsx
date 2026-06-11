// ======================================================
// SECTION 12
// PURPOSE: Login Page
// ROUTE: /login
// ======================================================

import Section12Background from "./Section12Background";
import Section12Content from "./Section12Content";

export default function Section12() {
  return (
    <section className="relative overflow-hidden">
      <Section12Background />

      <div className="relative z-10">
        <Section12Content />
      </div>
    </section>
  );
}