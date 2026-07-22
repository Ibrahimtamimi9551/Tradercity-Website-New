"use client";

import { useEffect, useState } from "react";
import { Filter, RotateCcw } from "lucide-react";
import { SearchInput, SelectField } from "@/components/admin/ui";
import { cn } from "@/lib/admin/cn";
import { modulePanelSurface } from "@/lib/admin/module-surfaces";
import type { AnalystDirectoryFilters } from "@/types/analysts/directory";
import type { SystemHealthState } from "@/types/admin/common";

const statusOptions = [
  { value: "all", label: "Status (All)" },
  { value: "under_review", label: "Under Review" },
  { value: "verification", label: "Verification" },
  { value: "partnership_discussion", label: "Partnership Discussion" },
  { value: "onboarding", label: "Onboarding" },
  { value: "active", label: "Active" },
  { value: "growing", label: "Growing" },
  { value: "suspended", label: "Suspended" },
  { value: "closed", label: "Closed" },
];

const tierOptions = [
  { value: "all", label: "Tier (All)" },
  { value: "partner", label: "Partner" },
  { value: "growing", label: "Growing" },
  { value: "top_partner", label: "Top Partner" },
  { value: "none", label: "None" },
];

const healthOptions = [
  { value: "all", label: "Health (All)" },
  { value: "healthy", label: "Healthy" },
  { value: "needs_attention", label: "Needs Attention" },
  { value: "action_required", label: "Action Required" },
];

type AnalystDirectoryFiltersBarProps = {
  filters: AnalystDirectoryFilters;
  hasActiveFilters: boolean;
  showAdvanced: boolean;
  onShowAdvancedChange: (open: boolean) => void;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: AnalystDirectoryFilters["status"]) => void;
  onTierChange: (value: AnalystDirectoryFilters["tier"]) => void;
  onHealthChange: (value: SystemHealthState | "all") => void;
  onReset: () => void;
};

export function AnalystDirectoryFiltersBar({
  filters,
  hasActiveFilters,
  showAdvanced,
  onShowAdvancedChange,
  onSearchChange,
  onStatusChange,
  onTierChange,
  onHealthChange,
  onReset,
}: AnalystDirectoryFiltersBarProps) {
  const advancedActive = showAdvanced || filters.health !== "all";
  const [searchDraft, setSearchDraft] = useState(filters.search);

  useEffect(() => {
    setSearchDraft(filters.search);
  }, [filters.search]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (searchDraft !== filters.search) {
        onSearchChange(searchDraft);
      }
    }, 300);
    return () => window.clearTimeout(timer);
  }, [searchDraft, filters.search, onSearchChange]);

  return (
    <div
      className={modulePanelSurface(
        "navy",
        "relative z-20 !p-3 space-y-2 overflow-visible sm:!p-5 sm:space-y-3"
      )}
    >
      <SearchInput
        value={searchDraft}
        onChange={setSearchDraft}
        placeholder="Search analysts by name, handle, or specialization…"
      />

      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
        <SelectField
          value={filters.status}
          onChange={(value) => onStatusChange(value as AnalystDirectoryFilters["status"])}
          options={statusOptions}
          aria-label="Filter by status"
          className="sm:min-w-[11rem]"
        />
        <SelectField
          value={filters.tier}
          onChange={(value) => onTierChange(value as AnalystDirectoryFilters["tier"])}
          options={tierOptions}
          aria-label="Filter by tier"
          className="sm:min-w-[10rem]"
        />

        <div className="flex flex-wrap items-center gap-2 sm:ml-auto">
          <button
            type="button"
            onClick={() => onShowAdvancedChange(!showAdvanced)}
            className={cn(
              "inline-flex min-h-10 items-center gap-2 rounded-lg border px-3 text-xs font-medium transition-colors",
              advancedActive
                ? "border-tc-purple/40 bg-tc-purple/15 text-tc-purple"
                : "border-white/10 text-tc-muted hover:border-white/20 hover:text-white"
            )}
          >
            <Filter className="h-3.5 w-3.5" aria-hidden />
            Advanced
          </button>
          {hasActiveFilters ? (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-white/10 px-3 text-xs font-medium text-tc-muted transition-colors hover:border-white/20 hover:text-white"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden />
              Reset
            </button>
          ) : null}
        </div>
      </div>

      {advancedActive ? (
        <div className="flex flex-wrap gap-2 border-t border-white/10 pt-3">
          <SelectField
            value={filters.health}
            onChange={(value) => onHealthChange(value as SystemHealthState | "all")}
            options={healthOptions}
            aria-label="Filter by health"
            className="sm:min-w-[11rem]"
          />
        </div>
      ) : null}
    </div>
  );
}
