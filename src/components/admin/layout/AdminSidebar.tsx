"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PanelLeftClose, PanelLeftOpen, X } from "lucide-react";
import { cn } from "@/lib/admin/cn";
import {
  ADMIN_NAV_DOMAINS,
  isAdminNavItemActive,
} from "./nav-config";
import type { AdminNavItem } from "@/types/admin/navigation";

type AdminSidebarProps = {
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
};

function NavItemLink({
  item,
  collapsed,
  onNavigate,
}: {
  item: AdminNavItem;
  collapsed: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const Icon = item.icon;

  if (item.comingSoon) {
    return (
      <div
        className={cn(
          "flex min-h-11 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-tc-muted/50",
          collapsed && "justify-center px-0"
        )}
        title={`${item.label} — Coming soon`}
        aria-disabled
      >
        <Icon className="h-4 w-4 shrink-0" aria-hidden />
        {!collapsed ? (
          <span className="flex min-w-0 flex-1 items-center justify-between gap-2">
            <span className="truncate">{item.label}</span>
            <span className="shrink-0 text-[10px] uppercase tracking-wide text-tc-muted/40">
              Soon
            </span>
          </span>
        ) : null}
      </div>
    );
  }

  const isActive = isAdminNavItemActive(pathname, item);

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={cn(
        "flex min-h-11 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
        collapsed && "justify-center px-0",
        isActive
          ? "bg-tc-purple/20 text-white"
          : "text-tc-muted hover:bg-white/[0.04] hover:text-white"
      )}
      title={collapsed ? item.label : undefined}
    >
      <Icon className="h-4 w-4 shrink-0" aria-hidden />
      {!collapsed ? <span>{item.label}</span> : null}
    </Link>
  );
}

function NavLinks({
  collapsed,
  onNavigate,
}: {
  collapsed: boolean;
  onNavigate?: () => void;
}) {
  return (
    <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
      {ADMIN_NAV_DOMAINS.map((domain, domainIndex) => (
        <div key={domain.id} className={cn(domainIndex > 0 && "mt-3")}>
          {!collapsed ? (
            <>
              {domainIndex > 0 ? (
                <div className="mb-3 border-t border-white/10" aria-hidden />
              ) : null}
              <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-tc-muted/70">
                {domain.label}
              </p>
            </>
          ) : domainIndex > 0 ? (
            <div className="mx-auto mb-2 h-px w-6 bg-white/10" aria-hidden />
          ) : null}

          <div className="flex flex-col gap-1">
            {domain.items.map((item) => (
              <NavItemLink
                key={`${domain.id}-${item.label}-${item.href}`}
                item={item}
                collapsed={collapsed}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
}

export function AdminSidebar({
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onMobileClose,
}: AdminSidebarProps) {
  // Mobile drawer always shows labels; desktop respects collapse.
  const navCollapsed = mobileOpen ? false : collapsed;

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-[45] bg-black/60 backdrop-blur-sm lg:hidden",
          mobileOpen ? "pointer-events-auto" : "pointer-events-none hidden"
        )}
        onClick={onMobileClose}
        aria-hidden
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 flex-col border-r border-white/10 bg-[#070b18]/95 backdrop-blur-xl",
          // Closed on mobile: not in the layout/hit-test tree. Desktop always shown.
          mobileOpen ? "flex" : "hidden lg:flex",
          collapsed ? "lg:w-[72px]" : "lg:w-64"
        )}
        {...(mobileOpen
          ? { role: "dialog", "aria-modal": true, "aria-label": "Admin navigation" }
          : {})}
      >
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-tc-purple/20 text-xs font-bold text-tc-purple">
              TC
            </div>
            {!navCollapsed ? (
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">TraderCity</p>
                <p className="truncate text-[10px] uppercase tracking-wider text-tc-muted">
                  Admin Panel
                </p>
              </div>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onMobileClose}
            className="min-h-11 min-w-11 rounded-lg p-2 text-tc-muted hover:bg-white/5 hover:text-white lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <NavLinks collapsed={navCollapsed} onNavigate={onMobileClose} />

        <div className="hidden border-t border-white/10 p-3 lg:block">
          <button
            type="button"
            onClick={onToggleCollapse}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs text-tc-muted hover:text-white"
          >
            {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
            {!collapsed ? <span>Collapse</span> : null}
          </button>
        </div>
      </aside>
    </>
  );
}
