// ======================================================
// SECTION 9
// PURPOSE: VIP Dashboard
// ROUTE: /dashboard/vip
// ======================================================

import VipDashboardBackground from "./VipDashboardBackground";
import VipDashboardContent from "./VipDashboardContent";

export default function VipDashboard() {
  return (
    <section className="relative overflow-hidden">
      <VipDashboardBackground />

      <div className="relative z-10 w-full">
        <VipDashboardContent />
      </div>
    </section>
  );
}

// import Section9Content from "./Section9Content";

// export default function Section9() {
//   return (
//     <section
//       className="relative min-h-screen"
//       style={{
//         background: "blue",
//         border: "10px solid yellow",
//       }}
//     >
//       <Section9Content />
//     </section>
//   );
// }