"use client";

import { Search } from "lucide-react";
import type { AnalystDiscordFilters } from "@/types/analysts/discord";

type DiscordFiltersBarProps = {
  filters: AnalystDiscordFilters;
  hasActiveFilters: boolean;
  onSearchChange: (search: string) => void;
  onStatusChange: (status: AnalystDiscordFilters["status"]) => void;
  onRoleChange: (role: AnalystDiscordFilters["role"]) => void;
  onSyncChange: (sync: AnalystDiscordFilters["sync"]) => void;
  onReset: () => void;
};

export function DiscordFiltersBar({
  filters,
  hasActiveFilters,
  onSearchChange,
  onStatusChange,
  onRoleChange,
  onSyncChange,
  onReset,
}: DiscordFiltersBarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      <label className="relative min-w-0 flex-1 sm:max-w-xs">
        <span className="sr-only">Search Discord directory</span>
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-tc-muted"
          aria-hidden
        />
        <input
          type="search"
          value={filters.search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search analyst or Discord…"
          className="admin-input w-full rounded-xl border border-white/10 bg-black/30 py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-tc-muted"
        />
      </label>

      <select
        value={filters.status}
        onChange={(e) =>
          onStatusChange(e.target.value as AnalystDiscordFilters["status"])
        }
        className="admin-input rounded-xl border border-white/10 bg-black/30 px-3 py-2.5 text-sm text-white"
        aria-label="Filter by connection status"
      >
        <option value="all">All statuses</option>
        <option value="pending">Pending</option>
        <option value="invited">Invited</option>
        <option value="connected">Connected</option>
        <option value="verified">Verified</option>
        <option value="role_assigned">Role Assigned</option>
        <option value="disconnected">Disconnected</option>
      </select>

      <select
        value={filters.role}
        onChange={(e) =>
          onRoleChange(e.target.value as AnalystDiscordFilters["role"])
        }
        className="admin-input rounded-xl border border-white/10 bg-black/30 px-3 py-2.5 text-sm text-white"
        aria-label="Filter by assigned role"
      >
        <option value="all">All roles</option>
        <option value="analyst">Analyst</option>
        <option value="pending">Pending</option>
        <option value="none">None</option>
      </select>

      <select
        value={filters.sync}
        onChange={(e) =>
          onSyncChange(e.target.value as AnalystDiscordFilters["sync"])
        }
        className="admin-input rounded-xl border border-white/10 bg-black/30 px-3 py-2.5 text-sm text-white"
        aria-label="Filter by sync health"
      >
        <option value="all">All sync</option>
        <option value="ok">Synced</option>
        <option value="pending">Pending</option>
        <option value="error">Error</option>
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
