"use client";

import { useEffect, useState } from "react";
import { RotateCcw } from "lucide-react";
import { SearchInput, SelectField } from "@/components/admin/ui";
import { modulePanelSurface } from "@/lib/admin/module-surfaces";
import type { ApplicationQueueFilters } from "@/types/analysts/applications";

const statusOptions = [
  { value: "all", label: "Status (All)" },
  { value: "new", label: "New" },
  { value: "under_review", label: "Under Review" },
  { value: "pending_information", label: "Pending Information" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
];

type ApplicationQueueFiltersBarProps = {
  filters: ApplicationQueueFilters;
  hasActiveFilters: boolean;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: ApplicationQueueFilters["status"]) => void;
  onReset: () => void;
};

export function ApplicationQueueFiltersBar({
  filters,
  hasActiveFilters,
  onSearchChange,
  onStatusChange,
  onReset,
}: ApplicationQueueFiltersBarProps) {
  const [searchDraft, setSearchDraft] = useState(filters.search);

  useEffect(() => {
    setSearchDraft(filters.search);
  }, [filters.search]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (searchDraft !== filters.search) onSearchChange(searchDraft);
    }, 300);
    return () => window.clearTimeout(timer);
  }, [searchDraft, filters.search, onSearchChange]);

  return (
    <div className={modulePanelSurface("navy", "space-y-3 p-3 sm:p-4")}>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <SearchInput
          value={searchDraft}
          onChange={setSearchDraft}
          placeholder="Search name, handle, specialization…"
          className="lg:max-w-md"
        />
        <SelectField
          aria-label="Filter by status"
          value={filters.status}
          options={statusOptions}
          onChange={(value) =>
            onStatusChange(value as ApplicationQueueFilters["status"])
          }
          className="lg:w-56"
        />
        {hasActiveFilters ? (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 self-start rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-xs font-medium text-tc-muted hover:text-white lg:ml-auto"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden />
            Reset
          </button>
        ) : null}
      </div>
    </div>
  );
}
