"use client";

import { Calendar, Download } from "lucide-react";
import { PageTitle } from "@/components/admin/ui";
import { OperationalWidgets } from "./OperationalWidgets";
import { OperationsQueueSection } from "./OperationsQueueSection";
import { RecentActivity } from "./RecentActivity";
import { QuickActions } from "./QuickActions";
import { RevenueOverview } from "./RevenueOverview";
import { PlatformHealth } from "./PlatformHealth";

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageTitle
        title="Dashboard"
        subtitle="Overview of TraderCity platform operations and key metrics."
        actions={
          <>
            <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white/80">
              <span className="tabular-nums">01 Jun 2026 - 08 Jun 2026</span>
              <Calendar className="h-4 w-4 text-tc-muted" />
            </div>
            <button className="flex items-center gap-2 rounded-lg bg-tc-purple px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-tc-purple/90">
              <Download className="h-4 w-4" />
              Export Report
            </button>
          </>
        }
      />

      <OperationalWidgets />

      <div className="grid gap-6 lg:grid-cols-2">
        <OperationsQueueSection />
        <RecentActivity />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <QuickActions />
        <RevenueOverview />
      </div>

      <PlatformHealth />
    </div>
  );
}
