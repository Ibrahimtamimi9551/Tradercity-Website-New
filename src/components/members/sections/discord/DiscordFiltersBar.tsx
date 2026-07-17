"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Download, Filter, RotateCcw } from "lucide-react";
import { SearchInput, SelectField } from "@/components/admin/ui";
import { cn } from "@/lib/admin/cn";
import { modulePanelSurface } from "@/lib/admin/module-surfaces";
import type { DiscordFilters } from "@/types/members/discord";

const roleOptions = [
  { value: "all", label: "Discord Role (All)" },
  { value: "vip", label: "VIP" },
  { value: "public", label: "Public" },
  { value: "analyst", label: "Analyst" },
  { value: "moderator", label: "Moderator" },
];

const connectionOptions = [
  { value: "all", label: "Connection (All)" },
  { value: "connected", label: "Connected" },
  { value: "disconnected", label: "Disconnected" },
  { value: "left_server", label: "Left Server" },
  { value: "suspended", label: "Suspended" },
];

const syncOptions = [
  { value: "all", label: "Sync Status (All)" },
  { value: "synced", label: "Synced" },
  { value: "pending", label: "Pending" },
  { value: "sync_failed", label: "Sync Failed" },
  { value: "not_synced", label: "Not Synced" },
];

const membershipOptions = [
  { value: "all", label: "Membership (All)" },
  { value: "vip", label: "VIP" },
  { value: "free", label: "Free" },
];

type DiscordFiltersBarProps = {
  filters: DiscordFilters;
  hasActiveFilters: boolean;
  showAdvanced: boolean;
  onShowAdvancedChange: (open: boolean) => void;
  onSearchChange: (value: string) => void;
  onRoleChange: (value: DiscordFilters["role"]) => void;
  onConnectionChange: (value: DiscordFilters["connection"]) => void;
  onSyncChange: (value: DiscordFilters["sync"]) => void;
  onMembershipChange: (value: DiscordFilters["membership"]) => void;
  onReset: () => void;
};

export function DiscordFiltersBar({
  filters,
  hasActiveFilters,
  showAdvanced,
  onShowAdvancedChange,
  onSearchChange,
  onRoleChange,
  onConnectionChange,
  onSyncChange,
  onMembershipChange,
  onReset,
}: DiscordFiltersBarProps) {
  const advancedActive =
    showAdvanced ||
    filters.membership !== "all" ||
    filters.role !== "all" ||
    filters.connection !== "all" ||
    filters.sync !== "all";

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
        "navy",
        "relative z-20 !p-3 space-y-2 overflow-visible sm:!p-5 sm:space-y-3"
      )}
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
        <SearchInput
          value={searchDraft}
          onChange={setSearchDraft}
          placeholder="Search by Discord Username or Discord ID..."
          className="w-full sm:max-w-md [&_input]:max-sm:h-8 [&_input]:max-sm:pl-8 [&_input]:max-sm:text-xs [&_svg]:max-sm:left-2.5 [&_svg]:max-sm:h-3.5 [&_svg]:max-sm:w-3.5"
        />

        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => onShowAdvancedChange(!showAdvanced)}
            aria-expanded={advancedActive}
            className={cn(
              "admin-ghost-btn inline-flex h-8 touch-manipulation items-center justify-center gap-1.5 rounded-lg border px-3 text-[11px] font-medium transition-colors sm:h-10 sm:gap-2 sm:text-sm",
              advancedActive && "border-tc-purple/40 bg-tc-purple/15 text-violet-200"
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
                    window.alert("Export CSV — wire to NestJS Discord export later.");
                  }}
                />
                <ExportItem
                  label="Excel"
                  onSelect={() => {
                    setExportOpen(false);
                    window.alert("Export Excel — wire to NestJS Discord export later.");
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
            aria-label="Discord role filter"
            value={filters.role}
            options={roleOptions}
            onChange={(v) => onRoleChange(v as DiscordFilters["role"])}
            className="sm:min-w-[10rem] sm:[&_select]:h-10 sm:[&_select]:px-3 sm:[&_select]:text-sm"
          />
          <SelectField
            size="compact"
            aria-label="Connection status filter"
            value={filters.connection}
            options={connectionOptions}
            onChange={(v) => onConnectionChange(v as DiscordFilters["connection"])}
            className="sm:min-w-[10rem] sm:[&_select]:h-10 sm:[&_select]:px-3 sm:[&_select]:text-sm"
          />
          <SelectField
            size="compact"
            aria-label="Sync status filter"
            value={filters.sync}
            options={syncOptions}
            onChange={(v) => onSyncChange(v as DiscordFilters["sync"])}
            className="sm:min-w-[10rem] sm:[&_select]:h-10 sm:[&_select]:px-3 sm:[&_select]:text-sm"
          />
          <SelectField
            size="compact"
            aria-label="Membership filter"
            value={filters.membership}
            options={membershipOptions}
            onChange={(v) => onMembershipChange(v as DiscordFilters["membership"])}
            className="sm:min-w-[10rem] sm:[&_select]:h-10 sm:[&_select]:px-3 sm:[&_select]:text-sm"
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
