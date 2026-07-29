"use client";

import { useEffect, useState } from "react";
import { Filter, Plus, RotateCcw } from "lucide-react";
import { SearchInput, SelectField } from "@/components/admin/ui";
import { cn } from "@/lib/admin/cn";
import { modulePanelSurface } from "@/lib/admin/module-surfaces";
import {
  MANUAL_PAYMENT_METHOD_OPTIONS,
  type ManualPaymentFilters,
} from "@/types/members/manual-payment";

const statusOptions = [
  { value: "all", label: "Status (All)" },
  { value: "pending", label: "Pending" },
  { value: "activated", label: "Activated" },
  { value: "cancelled", label: "Cancelled" },
];

const planOptions = [
  { value: "all", label: "Plan (All)" },
  { value: "monthly", label: "VIP Monthly" },
  { value: "quarterly", label: "VIP Quarterly" },
  { value: "yearly", label: "VIP Yearly" },
];

const methodOptions = [
  { value: "all", label: "Method (All)" },
  ...MANUAL_PAYMENT_METHOD_OPTIONS.map((o) => ({
    value: o.value,
    label: o.label,
  })),
];

type ManualPaymentFiltersBarProps = {
  filters: ManualPaymentFilters;
  hasActiveFilters: boolean;
  showAdvanced: boolean;
  onShowAdvancedChange: (open: boolean) => void;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: ManualPaymentFilters["status"]) => void;
  onPlanChange: (value: ManualPaymentFilters["plan"]) => void;
  onMethodChange: (value: ManualPaymentFilters["paymentMethod"]) => void;
  onDateFromChange: (value: string) => void;
  onDateToChange: (value: string) => void;
  onReset: () => void;
  onCreate: () => void;
};

export function ManualPaymentFiltersBar({
  filters,
  hasActiveFilters,
  showAdvanced,
  onShowAdvancedChange,
  onSearchChange,
  onStatusChange,
  onPlanChange,
  onMethodChange,
  onDateFromChange,
  onDateToChange,
  onReset,
  onCreate,
}: ManualPaymentFiltersBarProps) {
  const advancedActive =
    showAdvanced ||
    filters.status !== "all" ||
    filters.plan !== "all" ||
    filters.paymentMethod !== "all" ||
    filters.dateFrom !== "" ||
    filters.dateTo !== "";

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
        "gold",
        "relative z-20 !p-3 space-y-2 overflow-visible sm:!p-5 sm:space-y-3"
      )}
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
        <SearchInput
          value={searchDraft}
          onChange={setSearchDraft}
          placeholder="Search by username, email, or reference…"
          className="w-full sm:max-w-md [&_input]:max-sm:h-8 [&_input]:max-sm:pl-8 [&_input]:max-sm:text-xs [&_svg]:max-sm:left-2.5 [&_svg]:max-sm:h-3.5 [&_svg]:max-sm:w-3.5"
        />

        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={onCreate}
            className="inline-flex h-8 touch-manipulation items-center justify-center gap-1.5 rounded-lg border border-amber-500/40 bg-amber-500/15 px-3 text-[11px] font-medium text-amber-100 transition-colors hover:bg-amber-500/25 sm:h-10 sm:gap-2 sm:text-sm"
          >
            <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden />
            Create Manual Payment
          </button>

          <button
            type="button"
            onClick={() => onShowAdvancedChange(!showAdvanced)}
            aria-expanded={advancedActive}
            className={cn(
              "admin-ghost-btn inline-flex h-8 touch-manipulation items-center justify-center gap-1.5 rounded-lg border px-3 text-[11px] font-medium transition-colors sm:h-10 sm:gap-2 sm:text-sm",
              advancedActive && "border-amber-500/40 bg-amber-500/15 text-amber-100"
            )}
          >
            <Filter className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            Filters
          </button>

          <button
            type="button"
            onClick={onReset}
            disabled={!hasActiveFilters}
            className="admin-ghost-btn inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border px-3 text-[11px] font-medium disabled:opacity-40 sm:h-10 sm:gap-2 sm:text-sm"
          >
            <RotateCcw className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            Reset
          </button>
        </div>
      </div>

      {advancedActive ? (
        <div className="admin-divider grid grid-cols-2 gap-1.5 border-t pt-2 sm:flex sm:flex-wrap sm:items-center sm:gap-2 sm:pt-3">
          <SelectField
            size="compact"
            aria-label="Status filter"
            value={filters.status}
            options={statusOptions}
            onChange={(v) => onStatusChange(v as ManualPaymentFilters["status"])}
            className="sm:min-w-[11rem] sm:[&_select]:h-10 sm:[&_select]:px-3 sm:[&_select]:text-sm"
          />
          <SelectField
            size="compact"
            aria-label="Plan filter"
            value={filters.plan}
            options={planOptions}
            onChange={(v) => onPlanChange(v as ManualPaymentFilters["plan"])}
            className="sm:min-w-[10rem] sm:[&_select]:h-10 sm:[&_select]:px-3 sm:[&_select]:text-sm"
          />
          <SelectField
            size="compact"
            aria-label="Payment method filter"
            value={filters.paymentMethod}
            options={methodOptions}
            onChange={(v) =>
              onMethodChange(v as ManualPaymentFilters["paymentMethod"])
            }
            className="sm:min-w-[12rem] sm:[&_select]:h-10 sm:[&_select]:px-3 sm:[&_select]:text-sm"
          />
          <label className="flex min-w-0 flex-col gap-0.5 sm:min-w-[9rem]">
            <span className="sr-only">Date from</span>
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => onDateFromChange(e.target.value)}
              aria-label="Received date from"
              className="h-8 rounded-lg border border-white/10 bg-[#070b18]/80 px-2 text-[11px] text-white/85 focus:border-amber-500/40 focus:outline-none focus:ring-2 focus:ring-amber-500/20 sm:h-10 sm:px-3 sm:text-sm"
            />
          </label>
          <label className="flex min-w-0 flex-col gap-0.5 sm:min-w-[9rem]">
            <span className="sr-only">Date to</span>
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => onDateToChange(e.target.value)}
              aria-label="Received date to"
              className="h-8 rounded-lg border border-white/10 bg-[#070b18]/80 px-2 text-[11px] text-white/85 focus:border-amber-500/40 focus:outline-none focus:ring-2 focus:ring-amber-500/20 sm:h-10 sm:px-3 sm:text-sm"
            />
          </label>
        </div>
      ) : null}
    </div>
  );
}
