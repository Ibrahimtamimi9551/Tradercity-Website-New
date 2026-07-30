"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  DataTable,
  StatusBadge,
  type DataTableColumn,
} from "@/components/admin/ui";
import { cn } from "@/lib/admin/cn";
import {
  analystCommissionLifecyclePresentation,
  analystCommissionPlanLabel,
  filterCommissionLines,
  formatCommissionDateShort,
  formatCommissionUsd,
  memberProfileHref,
} from "@/lib/analysts/format-commissions";
import type {
  AnalystCommissionLineFilter,
  AnalystCommissionLineItem,
} from "@/types/analysts/commissions";

const FILTERS: { id: AnalystCommissionLineFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "monthly", label: "Monthly" },
  { id: "quarterly", label: "Quarterly" },
  { id: "yearly", label: "Yearly" },
  { id: "ready", label: "Ready for Payment" },
  { id: "paid", label: "Paid" },
  { id: "this_month", label: "This Month" },
  { id: "last_month", label: "Last Month" },
];

type CommissionReferralTableProps = {
  lines: AnalystCommissionLineItem[];
  compact?: boolean;
};

/**
 * Referral Commission Records — which members generated commission.
 * Links to Member Management; does not duplicate member data.
 */
export function CommissionReferralTable({
  lines,
  compact = false,
}: CommissionReferralTableProps) {
  const [filter, setFilter] = useState<AnalystCommissionLineFilter>("all");
  const filtered = useMemo(
    () => filterCommissionLines(lines, filter),
    [lines, filter]
  );

  const columns: DataTableColumn<AnalystCommissionLineItem>[] = [
    {
      key: "member",
      header: "Referral User",
      className: "min-w-[8rem]",
      render: (row) => (
        <span className="font-medium text-white">
          {row.conversion.memberDisplayName}
        </span>
      ),
    },
    {
      key: "plan",
      header: "Membership",
      render: (row) => (
        <span className="text-white/85">
          {analystCommissionPlanLabel(row.conversion.membershipPlan).replace(
            " Plan",
            ""
          )}
        </span>
      ),
    },
    {
      key: "date",
      header: "Purchase Date",
      render: (row) => (
        <span className="text-tc-muted">
          {formatCommissionDateShort(row.conversion.purchaseDate)}
        </span>
      ),
    },
    {
      key: "credit",
      header: "Commission Earned",
      render: (row) => (
        <span className="tabular-nums text-amber-100">
          {formatCommissionUsd(row.grossUsd)}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row) => {
        const p = analystCommissionLifecyclePresentation(row.status);
        return <StatusBadge label={p.label} tone={p.tone} />;
      },
    },
    {
      key: "open",
      header: "Open Member",
      stopRowClick: true,
      render: (row) => (
        <Link
          href={memberProfileHref(row.conversion.memberId)}
          className="text-xs font-medium text-violet-300 hover:text-violet-200"
        >
          Open →
        </Link>
      ),
    },
  ];

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-1.5">
        {FILTERS.map((f) => {
          const active = filter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={cn(
                "rounded-md border px-2.5 py-1 text-[11px] font-medium transition-colors",
                active
                  ? "border-amber-400/40 bg-amber-500/20 text-amber-50"
                  : "border-white/10 bg-black/20 text-tc-muted hover:border-white/20 hover:text-white/80"
              )}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        getRowKey={(row) => row.id}
        emptyTitle={
          filter === "all"
            ? "No referral commissions yet"
            : "No commissions match this filter"
        }
        compactMobile
        className={
          compact
            ? "border-white/10 bg-black/15 max-sm:rounded-lg"
            : "border-white/10 bg-white/[0.015] max-sm:rounded-lg"
        }
      />
    </div>
  );
}
