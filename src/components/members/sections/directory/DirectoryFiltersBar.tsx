"use client";

import { useEffect, useState } from "react";
import { Filter, RotateCcw } from "lucide-react";
import { SearchInput, SelectField } from "@/components/admin/ui";
import { cn } from "@/lib/admin/cn";
import { modulePanelSurface } from "@/lib/admin/module-surfaces";
import type { DirectoryFilters } from "@/types/members/directory";
import type { SystemHealthState } from "@/types/admin/common";

const membershipOptions = [
  { value: "all", label: "Membership (All)" },
  { value: "vip", label: "VIP" },
  { value: "free", label: "Free" },
];

const subscriptionOptions = [
  { value: "all", label: "Subscription (All)" },
  { value: "active", label: "Active" },
  { value: "pending_verification", label: "Pending Verification" },
  { value: "verification_required", label: "Verification Required" },
  { value: "none", label: "N/A" },
];

const discordOptions = [
  { value: "all", label: "Discord (All)" },
  { value: "connected", label: "Connected" },
  { value: "disconnected", label: "Disconnected" },
  { value: "action_required", label: "Action Required" },
  { value: "suspended", label: "Suspended" },
];

const referralOptions = [
  { value: "all", label: "Referral (All)" },
  { value: "in_progress", label: "In Progress" },
  { value: "eligible", label: "Eligible" },
  { value: "redeem_requests", label: "Referral Redeem Requests" },
  { value: "completed", label: "Completed" },
];

const healthOptions = [
  { value: "all", label: "Health (All)" },
  { value: "healthy", label: "Healthy" },
  { value: "needs_attention", label: "Needs Attention" },
  { value: "action_required", label: "Action Required" },
];

type DirectoryFiltersBarProps = {
  filters: DirectoryFilters;
  hasActiveFilters: boolean;
  showAdvanced: boolean;
  onShowAdvancedChange: (open: boolean) => void;
  onSearchChange: (value: string) => void;
  onMembershipChange: (value: DirectoryFilters["membership"]) => void;
  onSubscriptionChange: (value: DirectoryFilters["subscription"]) => void;
  onDiscordChange: (value: DirectoryFilters["discord"]) => void;
  onReferralChange: (value: DirectoryFilters["referral"]) => void;
  onHealthChange: (value: SystemHealthState | "all") => void;
  onReset: () => void;
};

export function DirectoryFiltersBar({
  filters,
  hasActiveFilters,
  showAdvanced,
  onShowAdvancedChange,
  onSearchChange,
  onMembershipChange,
  onSubscriptionChange,
  onDiscordChange,
  onReferralChange,
  onHealthChange,
  onReset,
}: DirectoryFiltersBarProps) {
  const advancedActive = showAdvanced || filters.health !== "all";

  // Local search text — avoids router.replace on every keystroke (breaks mobile keyboard / focus).
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
        placeholder="Search by Discord username or email..."
        className="w-full sm:max-w-md [&_input]:max-sm:h-8 [&_input]:max-sm:pl-8 [&_input]:max-sm:text-xs [&_svg]:max-sm:left-2.5 [&_svg]:max-sm:h-3.5 [&_svg]:max-sm:w-3.5"
      />

      <div className="grid grid-cols-2 gap-1.5 sm:flex sm:flex-wrap sm:items-center sm:gap-2">
        <SelectField
          size="compact"
          aria-label="Membership filter"
          value={filters.membership}
          options={membershipOptions}
          onChange={(v) => onMembershipChange(v as DirectoryFilters["membership"])}
          className="sm:min-w-[9.5rem] sm:[&_select]:h-10 sm:[&_select]:px-3 sm:[&_select]:text-sm"
        />
        <SelectField
          size="compact"
          aria-label="Subscription filter"
          value={filters.subscription}
          options={subscriptionOptions}
          onChange={(v) => onSubscriptionChange(v as DirectoryFilters["subscription"])}
          className="sm:min-w-[9.5rem] sm:[&_select]:h-10 sm:[&_select]:px-3 sm:[&_select]:text-sm"
        />
        <SelectField
          size="compact"
          aria-label="Discord status filter"
          value={filters.discord}
          options={discordOptions}
          onChange={(v) => onDiscordChange(v as DirectoryFilters["discord"])}
          className="sm:min-w-[9.5rem] sm:[&_select]:h-10 sm:[&_select]:px-3 sm:[&_select]:text-sm"
        />
        <SelectField
          size="compact"
          aria-label="Referral status filter"
          value={filters.referral}
          options={referralOptions}
          onChange={(v) => onReferralChange(v as DirectoryFilters["referral"])}
          className="sm:min-w-[9.5rem] sm:[&_select]:h-10 sm:[&_select]:px-3 sm:[&_select]:text-sm"
        />

        <button
          type="button"
          onClick={() => onShowAdvancedChange(!showAdvanced)}
          className={cn(
            "inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border px-3 text-[11px] font-medium transition-colors sm:h-10 sm:gap-2 sm:text-sm",
            advancedActive
              ? "border-tc-purple/40 bg-tc-purple/15 text-violet-200"
              : "border-white/10 text-white/80 active:bg-white/[0.06] sm:hover:bg-white/[0.04]"
          )}
        >
          <Filter className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          Filters
        </button>

        <button
          type="button"
          onClick={onReset}
          disabled={!hasActiveFilters}
          className="inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-white/10 px-3 text-[11px] font-medium text-white/80 disabled:opacity-40 active:bg-white/[0.06] sm:h-10 sm:gap-2 sm:text-sm sm:hover:bg-white/[0.04]"
        >
          <RotateCcw className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          Reset
        </button>
      </div>

      {advancedActive ? (
        <div className="border-t border-white/10 pt-2 sm:pt-3">
          <SelectField
            size="compact"
            aria-label="System health filter"
            value={filters.health}
            options={healthOptions}
            onChange={(v) => onHealthChange(v as SystemHealthState | "all")}
            className="w-full sm:max-w-[12rem] sm:[&_select]:h-10 sm:[&_select]:px-3 sm:[&_select]:text-sm"
          />
        </div>
      ) : null}
    </div>
  );
}
