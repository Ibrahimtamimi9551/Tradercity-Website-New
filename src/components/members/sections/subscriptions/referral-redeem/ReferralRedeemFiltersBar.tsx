"use client";

import { useEffect, useState } from "react";
import { Filter, RotateCcw } from "lucide-react";
import { SearchInput, SelectField } from "@/components/admin/ui";
import { cn } from "@/lib/admin/cn";
import { modulePanelSurface } from "@/lib/admin/module-surfaces";
import type { ReferralRedeemFilters } from "@/types/members/referral";

const statusOptions = [
  { value: "queue", label: "Waiting Admin Approval" },
  { value: "all", label: "Status (All Requests)" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
  { value: "expired", label: "Expired" },
  { value: "cancelled", label: "Cancelled" },
];

const planOptions = [
  { value: "all", label: "Membership Plan (All)" },
  { value: "monthly", label: "Monthly VIP" },
  { value: "quarterly", label: "Quarterly VIP" },
  { value: "yearly", label: "Yearly VIP" },
  { value: "free", label: "Free" },
];

const creditOptions = [
  { value: "all", label: "Available Credit (All)" },
  { value: "has_credit", label: "Has Credit" },
  { value: "no_credit", label: "No Credit" },
];

type ReferralRedeemFiltersBarProps = {
  filters: ReferralRedeemFilters;
  hasActiveFilters: boolean;
  showAdvanced: boolean;
  onShowAdvancedChange: (open: boolean) => void;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: ReferralRedeemFilters["status"]) => void;
  onMembershipPlanChange: (
    value: ReferralRedeemFilters["membershipPlan"]
  ) => void;
  onCreditChange: (value: ReferralRedeemFilters["credit"]) => void;
  onReset: () => void;
};

export function ReferralRedeemFiltersBar({
  filters,
  hasActiveFilters,
  showAdvanced,
  onShowAdvancedChange,
  onSearchChange,
  onStatusChange,
  onMembershipPlanChange,
  onCreditChange,
  onReset,
}: ReferralRedeemFiltersBarProps) {
  const filtersVisible =
    showAdvanced ||
    filters.membershipPlan !== "all" ||
    filters.credit !== "all" ||
    filters.status !== "queue";

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
          placeholder="Search by username, referral ID, code or Discord…"
          className="w-full sm:max-w-lg [&_input]:max-sm:h-8 [&_input]:max-sm:pl-8 [&_input]:max-sm:text-xs [&_svg]:max-sm:left-2.5 [&_svg]:max-sm:h-3.5 [&_svg]:max-sm:w-3.5"
        />

        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => onShowAdvancedChange(!showAdvanced)}
            aria-expanded={filtersVisible}
            className={cn(
              "admin-ghost-btn inline-flex h-8 touch-manipulation items-center justify-center gap-1.5 rounded-lg border px-3 text-[11px] font-medium transition-colors sm:h-10 sm:gap-2 sm:text-sm",
              filtersVisible && "border-amber-500/40 bg-amber-500/15 text-amber-100"
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

      {filtersVisible ? (
        <div className="admin-divider grid grid-cols-1 gap-1.5 border-t pt-2 sm:grid-cols-3 sm:gap-2 sm:pt-3">
          <SelectField
            size="compact"
            aria-label="Redeem request status filter"
            value={filters.status}
            options={statusOptions}
            onChange={(v) =>
              onStatusChange(v as ReferralRedeemFilters["status"])
            }
            className="sm:[&_select]:h-10 sm:[&_select]:px-3 sm:[&_select]:text-sm"
          />
          <SelectField
            size="compact"
            aria-label="Membership plan filter"
            value={filters.membershipPlan}
            options={planOptions}
            onChange={(v) =>
              onMembershipPlanChange(
                v as ReferralRedeemFilters["membershipPlan"]
              )
            }
            className="sm:[&_select]:h-10 sm:[&_select]:px-3 sm:[&_select]:text-sm"
          />
          <SelectField
            size="compact"
            aria-label="Available credit filter"
            value={filters.credit}
            options={creditOptions}
            onChange={(v) =>
              onCreditChange(v as ReferralRedeemFilters["credit"])
            }
            className="sm:[&_select]:h-10 sm:[&_select]:px-3 sm:[&_select]:text-sm"
          />
        </div>
      ) : null}
    </div>
  );
}
