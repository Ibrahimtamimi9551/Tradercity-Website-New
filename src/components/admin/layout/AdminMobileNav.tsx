"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid } from "lucide-react";
import { cn } from "@/lib/admin/cn";
import { MEMBER_MANAGEMENT_NAV, MOBILE_MORE_NAV } from "./nav-config";
import { useEffect, useState } from "react";

type AdminMobileNavProps = {
  /** When the hamburger drawer is open, suppress bottom-nav hit targets. */
  drawerOpen?: boolean;
};

export function AdminMobileNav({ drawerOpen = false }: AdminMobileNavProps) {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);
  const primary = MEMBER_MANAGEMENT_NAV.filter((item) => item.mobilePrimary);

  useEffect(() => {
    setMoreOpen(false);
  }, [pathname, drawerOpen]);

  useEffect(() => {
    if (!moreOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMoreOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [moreOpen]);

  return (
    <>
      {moreOpen ? (
        <div
          className="fixed inset-0 z-[45] bg-black/60 lg:hidden"
          onClick={() => setMoreOpen(false)}
          aria-hidden
        />
      ) : null}

      {moreOpen ? (
        <div
          className="fixed bottom-[calc(4.5rem+env(safe-area-inset-bottom))] left-4 right-4 z-50 rounded-xl border border-white/10 bg-[#0a1020] p-2 shadow-xl lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="More admin modules"
        >
          {MOBILE_MORE_NAV.map((item) => {
            const Icon = item.icon;
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMoreOpen(false)}
                className={cn(
                  "flex min-h-11 items-center gap-3 rounded-lg px-3 py-3 text-sm",
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

      <nav
        className={cn(
          "fixed bottom-0 left-0 right-0 z-30 border-t border-white/10 bg-[#070b18]/95 px-2 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden",
          drawerOpen && "pointer-events-none"
        )}
        aria-hidden={drawerOpen || undefined}
      >
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
                    "flex min-h-11 flex-col items-center justify-center gap-1 rounded-lg px-2 py-2 text-[10px] font-medium",
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
                "flex min-h-11 w-full flex-col items-center justify-center gap-1 rounded-lg px-2 py-2 text-[10px] font-medium",
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
