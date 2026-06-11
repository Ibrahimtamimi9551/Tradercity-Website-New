// ======================================================
// SECTION 10
// PURPOSE: Free Dashboard
// ROUTE: /dashboard/free
// ======================================================


import FreeDashboardBackground from "./FreeDashboardBackground";
import FreeDashboardContent from "./FreeDashboardContent";

export default function FreeDashboard() {
  return (
    <section className="relative overflow-hidden">
      <FreeDashboardBackground />

      <div className="relative z-10 w-full">
       <FreeDashboardContent />
      </div>
    </section>
  );
}