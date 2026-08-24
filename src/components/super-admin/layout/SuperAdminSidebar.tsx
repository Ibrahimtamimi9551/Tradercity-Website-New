"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, PanelLeftClose, PanelLeftOpen, X } from "lucide-react";
import {
  SUPER_ADMIN_NAV_SECTIONS,
  SUPER_ADMIN_ROUTES,
  isSuperAdminNavItemActive,
} from "@/constants/super-admin";
import { cn } from "@/lib/super-admin/cn";
import type { SuperAdminNavItem, SuperAdminNavSection } from "@/types/super-admin";

type SuperAdminSidebarProps = {
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
};

function NavItemLink({
  item,
  collapsed,
  nested,
  onNavigate,
}: {
  item: SuperAdminNavItem;
  collapsed: boolean;
  nested?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const Icon = item.icon;

  if (item.comingSoon) {
    return (
      <div
        className={cn(
          "flex min-h-10 items-center gap-3 rounded-lg px-3 py-2 text-sm text-zinc-600",
          collapsed && "justify-center px-0",
          nested && !collapsed && "pl-4"
        )}
        title={`${item.label} — Coming soon`}
        aria-disabled
      >
        <Icon className="h-4 w-4 shrink-0" aria-hidden />
        {!collapsed ? (
          <span className="flex min-w-0 flex-1 items-center justify-between gap-2">
            <span className="truncate">{item.label}</span>
            <span className="shrink-0 text-[10px] uppercase tracking-wide text-zinc-600">
              Soon
            </span>
          </span>
        ) : null}
      </div>
    );
  }

  const isActive = isSuperAdminNavItemActive(pathname, item);

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={cn(
        "flex min-h-10 items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        collapsed && "justify-center px-0",
        nested && !collapsed && "pl-4",
        isActive
          ? "bg-white/[0.08] text-zinc-50"
          : "text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-100"
      )}
      title={collapsed ? item.label : undefined}
    >
      <Icon className="h-4 w-4 shrink-0" aria-hidden />
      {!collapsed ? (
        <span className="flex min-w-0 flex-1 items-center justify-between gap-2">
          <span className="truncate">{item.label}</span>
          {item.stub ? (
            <span className="shrink-0 text-[10px] uppercase tracking-wide text-zinc-600">
              Stub
            </span>
          ) : null}
        </span>
      ) : null}
    </Link>
  );
}

function NavSection({
  section,
  collapsed,
  onNavigate,
}: {
  section: SuperAdminNavSection;
  collapsed: boolean;
  onNavigate?: () => void;
}) {
  const [open, setOpen] = useState(section.defaultOpen ?? true);
  const isCollapsible = Boolean(section.collapsible);

  return (
    <div className="mt-3 first:mt-0">
      {!collapsed ? (
        <div className="mb-1.5 flex items-center justify-between px-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
            {section.label}
          </p>
          {isCollapsible ? (
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="rounded p-1 text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-300"
              aria-expanded={open}
              aria-label={open ? `Collapse ${section.label}` : `Expand ${section.label}`}
            >
              <ChevronDown
                className={cn("h-3.5 w-3.5 transition-transform", !open && "-rotate-90")}
              />
            </button>
          ) : null}
        </div>
      ) : (
        <div className="mx-auto mb-2 h-px w-6 bg-white/10" aria-hidden />
      )}

      {(collapsed || !isCollapsible || open) &&
        section.items.map((item) => (
          <NavItemLink
            key={item.id}
            item={item}
            collapsed={collapsed}
            nested={isCollapsible}
            onNavigate={onNavigate}
          />
        ))}
    </div>
  );
}

export function SuperAdminSidebar({
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onMobileClose,
}: SuperAdminSidebarProps) {
  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity lg:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onMobileClose}
        aria-hidden
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-white/[0.06] bg-[#0A0A0C]",
          "w-[17rem] transition-[transform,width] duration-200",
          collapsed ? "lg:w-[4.5rem]" : "lg:w-[17rem]",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div
          className={cn(
            "flex h-16 items-center border-b border-white/[0.06] px-4",
            collapsed && "lg:justify-center lg:px-0"
          )}
        >
          <Link
            href={SUPER_ADMIN_ROUTES.root}
            onClick={onMobileClose}
            className={cn("min-w-0", collapsed && "lg:hidden")}
          >
            <p className="truncate text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
              TraderCity
            </p>
            <p className="truncate text-sm font-semibold text-zinc-100">
              Company Control Centre
            </p>
          </Link>
          {collapsed ? (
            <Link
              href={SUPER_ADMIN_ROUTES.root}
              className="hidden h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-xs font-semibold text-zinc-200 lg:flex"
              title="Company Control Centre"
            >
              CC
            </Link>
          ) : null}
          <button
            type="button"
            onClick={onMobileClose}
            className="ml-auto rounded-lg border border-white/10 p-2 text-zinc-400 hover:text-zinc-100 lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-4">
          {SUPER_ADMIN_NAV_SECTIONS.map((section) => (
            <NavSection
              key={section.id}
              section={section}
              collapsed={collapsed}
              onNavigate={onMobileClose}
            />
          ))}
        </nav>

        <div className="space-y-2 border-t border-white/[0.06] p-3">
          {!collapsed || mobileOpen ? (
            <Link
              href="/admin"
              onClick={onMobileClose}
              className="flex min-h-10 items-center gap-3 rounded-lg px-3 text-sm text-zinc-500 transition-colors hover:bg-white/[0.04] hover:text-zinc-200"
            >
              ← Admin Portal
            </Link>
          ) : null}
          <button
            type="button"
            onClick={onToggleCollapse}
            className={cn(
              "hidden w-full min-h-10 items-center gap-3 rounded-lg px-3 text-sm text-zinc-400 transition-colors hover:bg-white/[0.04] hover:text-zinc-100 lg:flex",
              collapsed && "justify-center px-0"
            )}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <PanelLeftOpen className="h-4 w-4" />
            ) : (
              <>
                <PanelLeftClose className="h-4 w-4" />
                <span>Collapse</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
