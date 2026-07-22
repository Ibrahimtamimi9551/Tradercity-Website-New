"use client";

import { Calendar, Download } from "lucide-react";
import { PageTitle } from "@/components/admin/ui";
import { AnalystOperationalWidgets } from "./AnalystOperationalWidgets";
import { AnalystOperationsQueueSection } from "./AnalystOperationsQueueSection";
import { AnalystRecentActivity } from "./AnalystRecentActivity";

export function AnalystDashboardPage() {
  return (
    <div className="space-y-6">
      <PageTitle
        title="Analyst Dashboard"
        subtitle="Operations overview for TraderCity analyst partnerships."
        actions={
          <>
            <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white/80">
              <span className="tabular-nums">15 Jul 2026 - 22 Jul 2026</span>
              <Calendar className="h-4 w-4 text-tc-muted" />
            </div>
            <button
              type="button"
              className="flex items-center gap-2 rounded-lg bg-tc-purple px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-tc-purple/90"
            >
              <Download className="h-4 w-4" />
              Export Report
            </button>
          </>
        }
      />

      <AnalystOperationalWidgets />

      <div className="grid gap-6 lg:grid-cols-2">
        <AnalystOperationsQueueSection />
        <AnalystRecentActivity />
      </div>
    </div>
  );
}
