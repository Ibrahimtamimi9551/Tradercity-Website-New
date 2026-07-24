"use client";

import {
  CheckCircle2,
  ClipboardList,
  FileWarning,
  Inbox,
  XCircle,
} from "lucide-react";
import { WidgetCard } from "@/components/admin/ui";
import { modulePanelSurface } from "@/lib/admin/module-surfaces";
import type {
  ApplicationDashboardStats,
  ApplicationQueueStatus,
} from "@/types/analysts/applications";

type ApplicationDashboardViewProps = {
  stats: ApplicationDashboardStats;
  onOpenStatus: (status: ApplicationQueueStatus | "all") => void;
};

export function ApplicationDashboardView({
  stats,
  onOpenStatus,
}: ApplicationDashboardViewProps) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-2 gap-2 md:gap-3 lg:gap-4 xl:grid-cols-5">
        <WidgetCard
          label="New Applications"
          value={stats.newCount}
          hint="Awaiting first review"
          icon={Inbox}
          accent="blue"
          priority={stats.newCount > 0 ? "important" : "informational"}
          compactMobile
          href="/admin/analysts/applications?view=queue&status=new"
          linkText="Open queue"
        />
        <WidgetCard
          label="Under Review"
          value={stats.underReviewCount}
          hint="Active evaluation"
          icon={ClipboardList}
          accent="amber"
          priority="informational"
          compactMobile
          href="/admin/analysts/applications?view=queue&status=under_review"
          linkText="Open queue"
        />
        <WidgetCard
          label="Pending Information"
          value={stats.pendingInformationCount}
          hint="Waiting on applicant"
          icon={FileWarning}
          accent="rose"
          priority={stats.pendingInformationCount > 0 ? "critical" : "informational"}
          compactMobile
          href="/admin/analysts/applications?view=queue&status=pending_information"
          linkText="Open queue"
        />
        <WidgetCard
          label="Approved"
          value={stats.approvedCount}
          hint="Eligible / advanced"
          icon={CheckCircle2}
          accent="green"
          priority="informational"
          compactMobile
          href="/admin/analysts/applications?view=queue&status=approved"
          linkText="Open queue"
        />
        <WidgetCard
          label="Rejected"
          value={stats.rejectedCount}
          hint="Not eligible"
          icon={XCircle}
          accent="purple"
          priority="informational"
          compactMobile
          href="/admin/analysts/applications?view=queue&status=rejected"
          linkText="Open queue"
          className="col-span-2 xl:col-span-1"
        />
      </div>

      <section className={modulePanelSurface("navy", "space-y-4")}>
        <div>
          <h2 className="text-sm font-medium text-white sm:text-base">Review pipeline</h2>
          <p className="mt-1 text-sm text-white/75">
            Application → Verification → Evaluation stays in one domain. Open the Review Queue
            to work a full case without leaving Applications.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onOpenStatus("all")}
            className="rounded-lg border border-violet-400/30 bg-violet-500/10 px-3.5 py-2 text-sm font-medium text-violet-200 hover:bg-violet-500/20"
          >
            Open Review Queue · {stats.queueOpenCount} open
          </button>
          <button
            type="button"
            onClick={() => onOpenStatus("new")}
            className="rounded-lg border border-white/10 bg-black/20 px-3.5 py-2 text-sm text-white/80 hover:bg-white/5"
          >
            New only
          </button>
          <button
            type="button"
            onClick={() => onOpenStatus("pending_information")}
            className="rounded-lg border border-white/10 bg-black/20 px-3.5 py-2 text-sm text-white/80 hover:bg-white/5"
          >
            Pending information
          </button>
        </div>
      </section>
    </div>
  );
}
