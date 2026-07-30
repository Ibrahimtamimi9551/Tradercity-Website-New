import "@/analyst/dashboard/analyst-dashboard.css";
import AnalystDashboardBackground from "@/analyst/dashboard/AnalystDashboardBackground";
import AnalystDashboardContent from "@/analyst/dashboard/AnalystDashboardContent";
import { AnalystDashboardProvider } from "@/analyst/dashboard/context/AnalystDashboardProvider";

export default function AnalystDashboard() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <AnalystDashboardBackground />
      <div className="relative z-10 w-full">
        <AnalystDashboardProvider>
          <AnalystDashboardContent />
        </AnalystDashboardProvider>
      </div>
    </section>
  );
}
