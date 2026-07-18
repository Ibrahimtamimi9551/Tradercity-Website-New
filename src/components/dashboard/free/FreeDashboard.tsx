// ======================================================
// PURPOSE: Free Dashboard
// ROUTE: /dashboard/free
// DESIGN STATUS: Frozen — do not redesign layout, hierarchy, or UX.
// ======================================================

import "./free-dashboard.css";
import FreeDashboardBackground from "./FreeDashboardBackground";
import FreeDashboardContent from "./FreeDashboardContent";

export default function FreeDashboard() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <FreeDashboardBackground />

      <div className="relative z-10 w-full">
        <FreeDashboardContent />
      </div>
    </section>
  );
}
