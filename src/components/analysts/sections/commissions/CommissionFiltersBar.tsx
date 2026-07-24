"use client";

import type { AnalystCommissionFilters } from "@/types/analysts/commissions";

type CommissionFiltersBarProps = {
  filters: AnalystCommissionFilters;
  hasActiveFilters: boolean;
  onSearchChange: (search: string) => void;
  onStatusChange: (status: AnalystCommissionFilters["status"]) => void;
  onReset: () => void;
};

export function CommissionFiltersBar({
  filters,
  hasActiveFilters,
  onSearchChange,
  onStatusChange,
  onReset,
}: CommissionFiltersBarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div className="grid flex-1 gap-3 sm:grid-cols-2 lg:max-w-xl">
        <label className="block space-y-1.5">
          <span className="text-xs font-medium text-tc-muted">Search</span>
          <input
            type="search"
            value={filters.search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Analyst, handle, email…"
            className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white placeholder:text-tc-muted/70 focus:border-amber-400/40 focus:outline-none"
          />
        </label>
        <label className="block space-y-1.5">
          <span className="text-xs font-medium text-tc-muted">
            Commission Status
          </span>
          <select
            value={filters.status}
            onChange={(e) =>
              onStatusChange(
                e.target.value as AnalystCommissionFilters["status"]
              )
            }
            className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm text-white focus:border-amber-400/40 focus:outline-none"
          >
            <option value="all">All statuses</option>
            <option value="none">No earnings</option>
            <option value="ready">Ready for Payment</option>
            <option value="overdue">Overdue</option>
            <option value="paid">Paid</option>
          </select>
        </label>
      </div>
      {hasActiveFilters ? (
        <button
          type="button"
          onClick={onReset}
          className="rounded-lg border border-white/10 px-3.5 py-2 text-sm text-tc-muted hover:border-white/20 hover:text-white"
        >
          Reset
        </button>
      ) : null}
    </div>
  );
}
