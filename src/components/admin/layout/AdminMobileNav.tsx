"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/admin/cn";
import { MEMBER_MANAGEMENT_NAV, MOBILE_MORE_NAV } from "./nav-config";
import { useState } from "react";

export function AdminMobileNav() {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);
  const primary = MEMBER_MANAGEMENT_NAV.filter((item) => item.mobilePrimary);

  return (
    <>
      {moreOpen ? (
        <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setMoreOpen(false)} aria-hidden />
      ) : null}

      {moreOpen ? (
        <div className="fixed bottom-[calc(4.5rem+env(safe-area-inset-bottom))] left-4 right-4 z-50 rounded-xl border border-white/10 bg-[#0a1020] p-2 shadow-xl lg:hidden">
          {MOBILE_MORE_NAV.map((item) => {
            const Icon = item.icon;
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMoreOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-3 text-sm",
                  active ? "bg-tc-purple/20 text-white" : "text-tc-muted"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </div>
      ) : null}

      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-[#070b18]/95 px-2 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden">
        <ul className="grid grid-cols-4 gap-1 py-2">
          {primary.map((item) => {
            const Icon = item.icon;
            const active =
              item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex flex-col items-center gap-1 rounded-lg px-2 py-2 text-[10px] font-medium",
                    active ? "text-tc-purple" : "text-tc-muted"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              </li>
            );
          })}
          <li>
            <button
              type="button"
              onClick={() => setMoreOpen((v) => !v)}
              className={cn(
                "flex w-full flex-col items-center gap-1 rounded-lg px-2 py-2 text-[10px] font-medium",
                moreOpen ? "text-tc-purple" : "text-tc-muted"
              )}
            >
              <LayoutGrid className="h-4 w-4" />
              More
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}
