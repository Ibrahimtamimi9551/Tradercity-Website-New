"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Banknote, Coins } from "lucide-react";
import { cn } from "@/lib/admin/cn";

const TABS = [
  {
    id: "crypto" as const,
    label: "Crypto Payments",
    href: "/admin/subscriptions",
    icon: Coins,
  },
  {
    id: "manual" as const,
    label: "Manual Payments",
    href: "/admin/subscriptions?source=manual",
    icon: Banknote,
  },
] as const;

/**
 * In-module source switcher — keeps Crypto and Manual under Subscriptions
 * without adding a sidebar item.
 */
export function SubscriptionsSourceNav() {
  const searchParams = useSearchParams();
  const active =
    searchParams.get("source") === "manual" ? "manual" : "crypto";

  return (
    <div
      className="inline-flex w-full max-w-xl rounded-xl border border-white/10 bg-white/[0.03] p-1 sm:w-auto"
      role="tablist"
      aria-label="Subscription activation sources"
    >
      {TABS.map((tab) => {
        const isActive = active === tab.id;
        const Icon = tab.icon;

        return (
          <Link
            key={tab.id}
            href={tab.href}
            role="tab"
            aria-selected={isActive}
            className={cn(
              "flex min-h-10 flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-colors sm:flex-none sm:px-4 sm:text-sm",
              isActive
                ? "bg-amber-500/20 text-white shadow-[0_0_0_1px_rgba(245,158,11,0.25)]"
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
