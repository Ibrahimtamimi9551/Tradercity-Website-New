"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Banknote, Coins, Gift } from "lucide-react";
import { cn } from "@/lib/admin/cn";

/**
 * Membership Activation Center — source switcher under Subscriptions.
 * Every tab exists because it can change membership status.
 */
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
  {
    id: "referral_redeem" as const,
    label: "Referral Redeem Requests",
    href: "/admin/subscriptions?source=referral_redeem",
    icon: Gift,
  },
] as const;

export function SubscriptionsSourceNav() {
  const searchParams = useSearchParams();
  const source = searchParams.get("source");
  const active =
    source === "manual"
      ? "manual"
      : source === "referral_redeem"
        ? "referral_redeem"
        : "crypto";

  return (
    <div
      className="inline-flex w-full max-w-3xl flex-wrap rounded-xl border border-white/10 bg-white/[0.03] p-1 sm:w-auto sm:flex-nowrap"
      role="tablist"
      aria-label="Membership activation sources"
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
