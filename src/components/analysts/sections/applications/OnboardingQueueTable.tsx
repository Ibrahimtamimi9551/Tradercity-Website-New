"use client";

import { DataTable, StatusBadge, type DataTableColumn } from "@/components/admin/ui";
import { cn } from "@/lib/admin/cn";
import {
  provisioningOverallPresentation,
  type AnalystSystemProvisioning,
} from "@/types/analysts/onboarding";

const avatarToneStyles: Record<AnalystSystemProvisioning["avatarTone"], string> = {
  discord: "bg-[#5865F2] text-white",
  violet: "bg-violet-500/30 text-violet-200",
  emerald: "bg-emerald-500/30 text-emerald-200",
  amber: "bg-amber-500/30 text-amber-100",
  rose: "bg-rose-500/30 text-rose-200",
  sky: "bg-sky-500/30 text-sky-200",
};

function formatApprovedDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function buildColumns(): DataTableColumn<AnalystSystemProvisioning>[] {
  return [
    {
      key: "analyst",
      header: "Analyst",
      render: (row) => {
        const initials = row.analystName
          .split(" ")
          .map((p) => p[0])
          .join("")
          .slice(0, 2)
          .toUpperCase();
        return (
          <div className="flex items-center gap-2 sm:gap-3">
            <div
              className={cn(
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold sm:h-9 sm:w-9 sm:text-xs",
                avatarToneStyles[row.avatarTone]
              )}
              aria-hidden
            >
              {initials}
            </div>
            <span className="min-w-0">
              <span className="block max-w-[10rem] truncate text-[11px] font-medium text-white sm:max-w-none sm:text-sm">
                {row.analystName}
              </span>
              <span className="block max-w-[10rem] truncate text-[10px] text-tc-muted sm:max-w-none sm:text-xs">
                {row.analystId}
              </span>
            </span>
          </div>
        );
      },
    },
    {
      key: "approved",
      header: "Approved",
      render: (row) => (
        <p className="whitespace-nowrap text-sm text-white/85">
          {formatApprovedDate(row.approvedAt)}
        </p>
      ),
    },
    {
      key: "status",
      header: "Operational Status",
      render: (row) => {
        const presentation = provisioningOverallPresentation(row.overallStatus);
        return <StatusBadge label={presentation.label} tone={presentation.tone} />;
      },
    },
  ];
}

type OnboardingQueueTableProps = {
  rows: AnalystSystemProvisioning[];
  selectedId: string | null;
  onRowSelect: (row: AnalystSystemProvisioning) => void;
};

export function OnboardingQueueTable({
  rows,
  selectedId,
  onRowSelect,
}: OnboardingQueueTableProps) {
  return (
    <DataTable
      columns={buildColumns()}
      data={rows}
      getRowKey={(row) => row.applicationId}
      selectedKey={selectedId}
      onRowClick={onRowSelect}
      emptyTitle="No approved analysts awaiting system provisioning"
      compactMobile
      className="border-white/10 bg-white/[0.015] max-sm:rounded-lg"
    />
  );
}
