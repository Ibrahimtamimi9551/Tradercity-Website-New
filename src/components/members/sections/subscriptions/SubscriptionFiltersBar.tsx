"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Download, Filter, RotateCcw } from "lucide-react";
import { SearchInput, SelectField } from "@/components/admin/ui";
import { cn } from "@/lib/admin/cn";
import { modulePanelSurface } from "@/lib/admin/module-surfaces";
import type { SubscriptionFilters } from "@/types/members/subscription";

const statusOptions = [
  { value: "all", label: "Status (All)" },
  { value: "blockchain_verifying", label: "Blockchain Verifying" },
  { value: "approval_pending", label: "Approval Pending" },
  { value: "verification_required", label: "Verification Required" },
  { value: "rejected", label: "Rejected" },
  { value: "approved", label: "Approved" },
];

const planOptions = [
  { value: "all", label: "Plan (All)" },
  { value: "monthly", label: "VIP Monthly" },
  { value: "quarterly", label: "VIP Quarterly" },
  { value: "yearly", label: "VIP Yearly" },
];

const networkOptions = [
  { value: "all", label: "Network (All)" },
  { value: "bep20", label: "BEP20" },
  { value: "erc20", label: "ERC20" },
  { value: "trc20", label: "TRC20" },
];

const verificationOptions = [
  { value: "all", label: "Verification (All)" },
  { value: "pending", label: "Pending" },
  { value: "verifying", label: "Verifying" },
  { value: "verified", label: "Verified" },
  { value: "failed", label: "Failed" },
  { value: "underpaid", label: "Underpaid" },
  { value: "overpaid", label: "Overpaid" },
  { value: "ambiguous", label: "Ambiguous" },
];

type SubscriptionFiltersBarProps = {
  filters: SubscriptionFilters;
  hasActiveFilters: boolean;
  showAdvanced: boolean;
  onShowAdvancedChange: (open: boolean) => void;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: SubscriptionFilters["status"]) => void;
  onPlanChange: (value: SubscriptionFilters["plan"]) => void;
  onNetworkChange: (value: SubscriptionFilters["network"]) => void;
  onVerificationChange: (value: SubscriptionFilters["verification"]) => void;
  onReset: () => void;
};

export function SubscriptionFiltersBar({
  filters,
  hasActiveFilters,
  showAdvanced,
  onShowAdvancedChange,
  onSearchChange,
  onStatusChange,
  onPlanChange,
  onNetworkChange,
  onVerificationChange,
  onReset,
}: SubscriptionFiltersBarProps) {
  const advancedActive =
    showAdvanced ||
    filters.status !== "all" ||
    filters.plan !== "all" ||
    filters.network !== "all" ||
    filters.verification !== "all";

  const [searchDraft, setSearchDraft] = useState(filters.search);
  const [exportOpen, setExportOpen] = useState(false);
  const exportRef = useRef<HTMLDivElement>(null);
  const exportMenuId = useId();

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

  useEffect(() => {
    if (!exportOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!exportRef.current?.contains(event.target as Node)) {
        setExportOpen(false);
      }
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
        "gold",
        "relative z-20 !p-3 space-y-2 overflow-visible sm:!p-5 sm:space-y-3"
      )}
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
        <SearchInput
          value={searchDraft}
          onChange={setSearchDraft}
          placeholder="Search by username, TX hash, or wallet…"
          className="w-full sm:max-w-md [&_input]:max-sm:h-8 [&_input]:max-sm:pl-8 [&_input]:max-sm:text-xs [&_svg]:max-sm:left-2.5 [&_svg]:max-sm:h-3.5 [&_svg]:max-sm:w-3.5"
        />

        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
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
                    window.alert(
                      "Export CSV — wire to NestJS Subscriptions export later."
                    );
                  }}
                />
                <ExportItem
                  label="Excel"
                  onSelect={() => {
                    setExportOpen(false);
                    window.alert(
                      "Export Excel — wire to NestJS Subscriptions export later."
                    );
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

      {advancedActive ? (
        <div className="admin-divider grid grid-cols-2 gap-1.5 border-t pt-2 sm:flex sm:flex-wrap sm:items-center sm:gap-2 sm:pt-3">
          <SelectField
            size="compact"
            aria-label="Status filter"
            value={filters.status}
            options={statusOptions}
            onChange={(v) => onStatusChange(v as SubscriptionFilters["status"])}
            className="sm:min-w-[12rem] sm:[&_select]:h-10 sm:[&_select]:px-3 sm:[&_select]:text-sm"
          />
          <SelectField
            size="compact"
            aria-label="Plan filter"
            value={filters.plan}
            options={planOptions}
            onChange={(v) => onPlanChange(v as SubscriptionFilters["plan"])}
            className="sm:min-w-[10rem] sm:[&_select]:h-10 sm:[&_select]:px-3 sm:[&_select]:text-sm"
          />
          <SelectField
            size="compact"
            aria-label="Network filter"
            value={filters.network}
            options={networkOptions}
            onChange={(v) => onNetworkChange(v as SubscriptionFilters["network"])}
            className="sm:min-w-[10rem] sm:[&_select]:h-10 sm:[&_select]:px-3 sm:[&_select]:text-sm"
          />
          <SelectField
            size="compact"
            aria-label="Verification status filter"
            value={filters.verification}
            options={verificationOptions}
            onChange={(v) =>
              onVerificationChange(v as SubscriptionFilters["verification"])
            }
            className="sm:min-w-[11rem] sm:[&_select]:h-10 sm:[&_select]:px-3 sm:[&_select]:text-sm"
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
