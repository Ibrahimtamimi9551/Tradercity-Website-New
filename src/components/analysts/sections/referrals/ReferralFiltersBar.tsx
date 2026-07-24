"use client";

import { Search } from "lucide-react";
import type { AnalystReferralFilters } from "@/types/analysts/referrals";

type ReferralFiltersBarProps = {
  filters: AnalystReferralFilters;
  hasActiveFilters: boolean;
  onSearchChange: (search: string) => void;
  onStatusChange: (status: AnalystReferralFilters["status"]) => void;
  onReset: () => void;
};

export function ReferralFiltersBar({
  filters,
  hasActiveFilters,
  onSearchChange,
  onStatusChange,
  onReset,
}: ReferralFiltersBarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      <label className="relative min-w-0 flex-1 sm:max-w-xs">
        <span className="sr-only">Search referral directory</span>
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-tc-muted"
          aria-hidden
        />
        <input
          type="search"
          value={filters.search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search analyst or code…"
          className="admin-input w-full rounded-xl border border-white/10 bg-black/30 py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-tc-muted"
        />
      </label>

      <select
        value={filters.status}
        onChange={(e) =>
          onStatusChange(e.target.value as AnalystReferralFilters["status"])
        }
        className="admin-input rounded-xl border border-white/10 bg-black/30 px-3 py-2.5 text-sm text-white"
        aria-label="Filter by referral status"
      >
        <option value="all">All statuses</option>
        <option value="enabled">Enabled</option>
        <option value="disabled">Disabled</option>
      </select>

      {hasActiveFilters ? (
        <button
          type="button"
          onClick={onReset}
          className="text-sm font-medium text-violet-300 hover:text-violet-200"
        >
          Reset
        </button>
      ) : null}
    </div>
  );
}
