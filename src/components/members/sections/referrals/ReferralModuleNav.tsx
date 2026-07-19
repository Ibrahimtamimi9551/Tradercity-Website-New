"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, LayoutList } from "lucide-react";
import { cn } from "@/lib/admin/cn";

const TABS = [
  {
    label: "Operations Dashboard",
    href: "/admin/referrals",
    icon: LayoutList,
    match: (pathname: string) =>
      pathname === "/admin/referrals" ||
      (/^\/admin\/referrals\/[^/]+$/.test(pathname) &&
        !pathname.endsWith("/intelligence")),
  },
  {
    label: "Referral Intelligence",
    href: "/admin/referrals/intelligence",
    icon: BarChart3,
    match: (pathname: string) => pathname.startsWith("/admin/referrals/intelligence"),
  },
] as const;

/**
 * In-module switcher — keeps Operations and Intelligence clearly separated
 * without changing the primary Admin sidebar structure.
 */
export function ReferralModuleNav() {
  const pathname = usePathname();

  return (
    <div
      className="inline-flex w-full max-w-xl rounded-xl border border-white/10 bg-white/[0.03] p-1 sm:w-auto"
      role="tablist"
      aria-label="Referral module views"
    >
      {TABS.map((tab) => {
        const active = tab.match(pathname);
        const Icon = tab.icon;

        return (
          <Link
            key={tab.href}
            href={tab.href}
            role="tab"
            aria-selected={active}
            className={cn(
              "flex min-h-10 flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-colors sm:flex-none sm:px-4 sm:text-sm",
              active
                ? "bg-violet-500/20 text-white shadow-[0_0_0_1px_rgba(139,92,246,0.25)]"
                : "text-tc-muted hover:bg-white/[0.04] hover:text-white"
            )}
          >
            <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden />
            <span className="truncate">{tab.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
