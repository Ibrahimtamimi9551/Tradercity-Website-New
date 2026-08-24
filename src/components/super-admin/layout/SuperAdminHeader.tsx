"use client";

import { Menu } from "lucide-react";
import { cn } from "@/lib/super-admin/cn";
import { superAdminContentPaddingClass } from "@/lib/super-admin/layout-gutter";
import { SearchBar } from "@/components/super-admin/ui/SearchBar";

type SuperAdminHeaderProps = {
  onOpenMobileNav: () => void;
  sidebarCollapsed: boolean;
};

export function SuperAdminHeader({
  onOpenMobileNav,
  sidebarCollapsed,
}: SuperAdminHeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-30 border-b border-white/[0.06] bg-[#0A0A0C]/85 backdrop-blur-xl",
        superAdminContentPaddingClass(sidebarCollapsed)
      )}
    >
      <div className="flex h-16 items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileNav}
          className="flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-white/[0.08] text-zinc-400 hover:text-zinc-100 lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-4 w-4" />
        </button>

        <div className="hidden min-w-0 flex-1 md:block md:max-w-md">
          <SearchBar placeholder="Search Company Control Centre…" readOnly />
        </div>

        <div className="ml-auto flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-xs font-medium text-zinc-200">Super Admin</p>
            <p className="text-[11px] text-zinc-500">Executive access</p>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-xs font-semibold text-zinc-200">
            SA
          </div>
        </div>
      </div>
    </header>
  );
}
