"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Download, Filter, RotateCcw } from "lucide-react";
import { SearchInput, SelectField } from "@/components/admin/ui";
import { cn } from "@/lib/admin/cn";
import { modulePanelSurface } from "@/lib/admin/module-surfaces";
import type { ReferralFilters } from "@/types/members/referral";

const planOptions = [
  { value: "all", label: "Membership Plan (All)" },
  { value: "monthly", label: "Monthly VIP" },
  { value: "quarterly", label: "Quarterly VIP" },
  { value: "yearly", label: "Yearly VIP" },
  { value: "free", label: "Free" },
];

const progressOptions = [
  { value: "all", label: "Referral Progress (All)" },
  { value: "in_progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "redeem_requests", label: "Referral Redeem Requests" },
];

const creditOptions = [
  { value: "all", label: "Available Credit (All)" },
  { value: "has_credit", label: "Has Credit" },
  { value: "no_credit", label: "No Credit" },
];

type ReferralFiltersBarProps = {
  filters: ReferralFilters;
  hasActiveFilters: boolean;
  showAdvanced: boolean;
  onShowAdvancedChange: (open: boolean) => void;
  onSearchChange: (value: string) => void;
  onMembershipPlanChange: (value: ReferralFilters["membershipPlan"]) => void;
  onProgressChange: (value: ReferralFilters["progress"]) => void;
  onCreditChange: (value: ReferralFilters["credit"]) => void;
  onReset: () => void;
};

export function ReferralFiltersBar({
  filters,
  hasActiveFilters,
  showAdvanced,
  onShowAdvancedChange,
  onSearchChange,
  onMembershipPlanChange,
  onProgressChange,
  onCreditChange,
  onReset,
}: ReferralFiltersBarProps) {
  const filtersVisible =
    showAdvanced ||
    filters.membershipPlan !== "all" ||
    filters.progress !== "all" ||
    filters.credit !== "all" ||
    filters.pendingOnly;

  const [searchDraft, setSearchDraft] = useState(filters.search);
  const [exportOpen, setExportOpen] = useState(false);
  const exportRef = useRef<HTMLDivElement>(null);
  const exportMenuId = useId();

  useEffect(() => {
    setSearchDraft(filters.search);
  }, [filters.search]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (searchDraft !== filters.search) onSearchChange(searchDraft);
    }, 300);
    return () => window.clearTimeout(timer);
  }, [searchDraft, filters.search, onSearchChange]);

  useEffect(() => {
    if (!exportOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!exportRef.current?.contains(event.target as Node)) setExportOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExportOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [exportOpen]);

  return (
    <div
      className={modulePanelSurface(
        "navy",
        "relative z-20 !p-3 space-y-2 overflow-visible sm:!p-5 sm:space-y-3"
      )}
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
        <SearchInput
          value={searchDraft}
          onChange={setSearchDraft}
          placeholder="Search by username, referral ID, referral code or Discord..."
          className="w-full sm:max-w-lg [&_input]:max-sm:h-8 [&_input]:max-sm:pl-8 [&_input]:max-sm:text-xs [&_svg]:max-sm:left-2.5 [&_svg]:max-sm:h-3.5 [&_svg]:max-sm:w-3.5"
        />

        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => onShowAdvancedChange(!showAdvanced)}
            aria-expanded={filtersVisible}
            className={cn(
              "admin-ghost-btn inline-flex h-8 touch-manipulation items-center justify-center gap-1.5 rounded-lg border px-3 text-[11px] font-medium transition-colors sm:h-10 sm:gap-2 sm:text-sm",
              filtersVisible && "border-tc-purple/40 bg-tc-purple/15 text-violet-200"
            )}
          >
            <Filter className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            Filters
          </button>

          <div ref={exportRef} className="relative">
            <button
              type="button"
              onClick={() => setExportOpen((prev) => !prev)}
              aria-expanded={exportOpen}
              aria-haspopup="menu"
              aria-controls={exportMenuId}
              className="admin-ghost-btn inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border px-3 text-[11px] font-medium sm:h-10 sm:gap-2 sm:text-sm"
            >
              <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Export
            </button>
            {exportOpen ? (
              <div
                id={exportMenuId}
                role="menu"
                className="admin-card-surface absolute right-0 top-full z-50 mt-1 min-w-[9rem] overflow-hidden rounded-xl border py-1"
              >
                <ExportItem
                  label="CSV"
                  onSelect={() => {
                    setExportOpen(false);
                    window.alert("Export CSV — wire to NestJS referral export later.");
                  }}
                />
                <ExportItem
                  label="Excel"
                  onSelect={() => {
                    setExportOpen(false);
                    window.alert("Export Excel — wire to NestJS referral export later.");
                  }}
                />
              </div>
            ) : null}
          </div>

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

      {filtersVisible ? (
        <div className="admin-divider grid grid-cols-1 gap-1.5 border-t pt-2 sm:grid-cols-3 sm:gap-2 sm:pt-3">
          <SelectField
            size="compact"
            aria-label="Membership plan filter"
            value={filters.membershipPlan}
            options={planOptions}
            onChange={(v) =>
              onMembershipPlanChange(v as ReferralFilters["membershipPlan"])
            }
            className="sm:[&_select]:h-10 sm:[&_select]:px-3 sm:[&_select]:text-sm"
          />
          <SelectField
            size="compact"
            aria-label="Referral progress filter"
            value={filters.progress}
            options={progressOptions}
            onChange={(v) => onProgressChange(v as ReferralFilters["progress"])}
            className="sm:[&_select]:h-10 sm:[&_select]:px-3 sm:[&_select]:text-sm"
          />
          <SelectField
            size="compact"
            aria-label="Available credit filter"
            value={filters.credit}
            options={creditOptions}
            onChange={(v) => onCreditChange(v as ReferralFilters["credit"])}
            className="sm:[&_select]:h-10 sm:[&_select]:px-3 sm:[&_select]:text-sm"
          />
        </div>
      ) : null}
    </div>
  );
}

function ExportItem({ label, onSelect }: { label: string; onSelect: () => void }) {
  return (
    <button
      type="button"
      role="menuitem"
      onClick={onSelect}
      className="admin-fg-soft flex w-full px-3 py-2 text-left text-sm transition-colors hover:bg-[var(--admin-row-hover)]"
    >
      {label}
    </button>
  );
}
