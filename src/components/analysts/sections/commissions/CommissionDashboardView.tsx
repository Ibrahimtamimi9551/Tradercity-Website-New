"use client";

import { useMemo, useState } from "react";
import {
  BadgeDollarSign,
  CircleDollarSign,
  Clock3,
  TriangleAlert,
  Users,
  Wallet,
} from "lucide-react";
import { WidgetCard } from "@/components/admin/ui";
import { modulePanelSurface } from "@/lib/admin/module-surfaces";
import { formatCommissionUsd } from "@/lib/analysts/format-commissions";
import type {
  AnalystCommissionCompletePayoutInput,
  AnalystCommissionDashboardStats,
  AnalystCommissionOperation,
  AnalystCommissionRecord,
} from "@/types/analysts/commissions";
import { CommissionWorkspaceView } from "./CommissionWorkspaceView";

type CommissionDashboardViewProps = {
  stats: AnalystCommissionDashboardStats;
  allRows: AnalystCommissionRecord[];
  selectedRecord: AnalystCommissionRecord | null;
  onOpenFocus: (focus: {
    status: "ready" | "overdue" | "paid" | "none";
  }) => void;
  onOpenPayouts: () => void;
  onOpenWorkspace: (commissionId: string) => void;
  onClearWorkspace: () => void;
  onOperation: (
    record: AnalystCommissionRecord,
    operation: AnalystCommissionOperation,
    input?: AnalystCommissionCompletePayoutInput
  ) => void;
};

/**
 * Commission Dashboard — program overview, or full operational workspace
 * when an analyst is selected.
 */
export function CommissionDashboardView({
  stats,
  allRows,
  selectedRecord,
  onOpenFocus,
  onOpenPayouts,
  onOpenWorkspace,
  onClearWorkspace,
  onOperation,
}: CommissionDashboardViewProps) {
  if (selectedRecord) {
    return (
      <CommissionWorkspaceView
        record={selectedRecord}
        onOperation={onOperation}
        onBack={onClearWorkspace}
        onOpenPayouts={onOpenPayouts}
      />
    );
  }

  return (
    <ProgramOverview
      stats={stats}
      allRows={allRows}
      onOpenFocus={onOpenFocus}
      onOpenPayouts={onOpenPayouts}
      onOpenWorkspace={onOpenWorkspace}
    />
  );
}

function ProgramOverview({
  stats,
  allRows,
  onOpenFocus,
  onOpenPayouts,
  onOpenWorkspace,
}: {
  stats: AnalystCommissionDashboardStats;
  allRows: AnalystCommissionRecord[];
  onOpenFocus: CommissionDashboardViewProps["onOpenFocus"];
  onOpenPayouts: () => void;
  onOpenWorkspace: (commissionId: string) => void;
}) {
  const [query, setQuery] = useState("");
  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allRows.slice(0, 8);
    return allRows
      .filter((r) =>
        `${r.displayName} ${r.handle} ${r.email}`.toLowerCase().includes(q)
      )
      .slice(0, 12);
  }, [allRows, query]);

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-2 gap-2 md:gap-3 lg:gap-4 xl:grid-cols-3">
        <WidgetCard
          label="Total Analysts"
          value={stats.totalAnalysts}
          hint="Commission identities"
          icon={Users}
          accent="blue"
          priority="informational"
          compactMobile
          href="/admin/analysts/commissions?view=directory"
          linkText="Open directory"
        />
        <WidgetCard
          label="Analysts Ready for Payment"
          value={stats.readyForPaymentCount}
          hint="Wallet on file · amount due"
          icon={Wallet}
          accent="amber"
          priority={stats.readyForPaymentCount > 0 ? "important" : "informational"}
          compactMobile
          href="/admin/analysts/commissions?view=payouts"
          linkText="Open payouts"
        />
        <WidgetCard
          label="Total Commission Generated"
          value={formatCommissionUsd(stats.totalCommissionGeneratedUsd)}
          hint="All-time gross credits"
          icon={CircleDollarSign}
          accent="gold"
          priority="informational"
          compactMobile
          href="/admin/analysts/commissions?view=directory"
          linkText="View directory"
        />
        <WidgetCard
          label="Total Amount to Pay"
          value={formatCommissionUsd(stats.totalAmountToPayUsd)}
          hint="Analyst share · current + due"
          icon={Clock3}
          accent="teal"
          priority={stats.totalAmountToPayUsd > 0 ? "important" : "informational"}
          compactMobile
          href="/admin/analysts/commissions?view=payouts"
          linkText="Settle now"
        />
        <WidgetCard
          label="Outstanding Due"
          value={formatCommissionUsd(stats.outstandingDueUsd)}
          hint="Prior cycles unpaid"
          icon={TriangleAlert}
          accent="rose"
          priority={stats.outstandingDueUsd > 0 ? "important" : "informational"}
          compactMobile
          href="/admin/analysts/commissions?view=directory&status=overdue"
          linkText="View overdue"
        />
        <WidgetCard
          label="Paid Commission"
          value={formatCommissionUsd(stats.paidCommissionUsd)}
          hint="Settled on ledger"
          icon={BadgeDollarSign}
          accent="green"
          priority="informational"
          compactMobile
          href="/admin/analysts/commissions?view=history"
          linkText="Open history"
        />
      </div>

      <section className={modulePanelSurface("gold", "space-y-4")}>
        <div>
          <h2 className="text-sm font-medium text-white sm:text-base">
            Open analyst workspace
          </h2>
          <p className="mt-1 text-sm text-white/75">
            The Commission Dashboard is the operational center for billing
            cycle, commission summary, breakdown, referral records, timeline,
            and payment details — one analyst at a time.
          </p>
        </div>
        <label className="block space-y-1.5">
          <span className="text-xs font-medium text-tc-muted">
            Search analyst
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Name, handle, email…"
            className="w-full max-w-md rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white placeholder:text-tc-muted/70 focus:border-amber-400/40 focus:outline-none"
          />
        </label>
        <ul className="divide-y divide-white/5 rounded-lg border border-white/10 bg-black/20">
          {matches.length === 0 ? (
            <li className="px-3 py-6 text-center text-sm text-tc-muted">
              No analysts match your search
            </li>
          ) : (
            matches.map((row) => (
              <li key={row.id}>
                <button
                  type="button"
                  onClick={() => onOpenWorkspace(row.id)}
                  className="flex w-full items-center justify-between gap-3 px-3 py-2.5 text-left hover:bg-white/[0.04]"
                >
                  <span>
                    <span className="block text-sm font-medium text-white">
                      {row.displayName}
                    </span>
                    <span className="block text-xs text-tc-muted">
                      @{row.handle} ·{" "}
                      {formatCommissionUsd(row.summary.totalPayableUsd)} payable
                    </span>
                  </span>
                  <span className="shrink-0 text-xs text-amber-200">Open →</span>
                </button>
              </li>
            ))
          )}
        </ul>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onOpenFocus({ status: "ready" })}
            className="rounded-lg border border-amber-400/30 bg-amber-500/10 px-3.5 py-2 text-sm font-medium text-amber-100 hover:bg-amber-500/20"
          >
            Ready for payment
          </button>
          <button
            type="button"
            onClick={() => onOpenFocus({ status: "overdue" })}
            className="rounded-lg border border-rose-400/30 bg-rose-500/10 px-3.5 py-2 text-sm font-medium text-rose-100 hover:bg-rose-500/20"
          >
            Outstanding due
          </button>
          <button
            type="button"
            onClick={onOpenPayouts}
            className="rounded-lg border border-amber-400/40 bg-amber-500/20 px-3.5 py-2 text-sm font-medium text-amber-50 hover:bg-amber-500/30"
          >
            Open payout workspace
          </button>
        </div>
      </section>
    </div>
  );
}
