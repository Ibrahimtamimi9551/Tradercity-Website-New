"use client";

import { Bell, Menu, Search } from "lucide-react";
import { cn } from "@/lib/admin/cn";
import { adminContentPaddingClass } from "@/lib/admin/layout-gutter";

type AdminHeaderProps = {
  onOpenMobileNav: () => void;
  sidebarCollapsed: boolean;
};

export function AdminHeader({ onOpenMobileNav, sidebarCollapsed }: AdminHeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-30 border-b border-white/10 bg-[#070b18]/80 backdrop-blur-xl",
        adminContentPaddingClass(sidebarCollapsed)
      )}
    >
      <div className="flex h-16 items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileNav}
          className="flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-white/10 text-tc-muted hover:text-white lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-4 w-4" />
        </button>

        <div className="relative hidden min-w-0 flex-1 md:block md:max-w-xl">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-tc-muted" />
          <input
            type="search"
            placeholder="Search by username, email, transaction hash…"
            className="h-10 w-full rounded-lg border border-white/10 bg-white/[0.03] pl-9 pr-16 text-sm text-white placeholder:text-tc-muted focus:border-tc-purple/50 focus:outline-none"
            readOnly
            aria-label="Global search"
          />
          <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded border border-white/10 px-1.5 py-0.5 text-[10px] text-tc-muted sm:inline">
            ⌘K
          </kbd>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            className="relative rounded-lg border border-white/10 p-2 text-tc-muted hover:text-white"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-medium text-white">
              8
            </span>
          </button>
          <div className="hidden items-center gap-3 rounded-lg border border-white/10 px-3 py-1.5 sm:flex">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-tc-purple/20 text-xs font-semibold text-tc-purple">
              IB
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">Ibrahim</p>
              <p className="truncate text-xs text-tc-muted">Super Admin</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
