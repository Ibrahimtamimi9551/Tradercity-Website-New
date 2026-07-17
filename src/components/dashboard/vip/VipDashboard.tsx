// ======================================================
// PURPOSE: VIP Dashboard
// ROUTE: /dashboard/vip
// ======================================================

import VipDashboardBackground from "./VipDashboardBackground";
import VipDashboardContent from "./VipDashboardContent";

export default function VipDashboard() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <VipDashboardBackground />

      <div className="relative z-10 w-full">
        <VipDashboardContent />
      </div>
    </section>
  );
}
