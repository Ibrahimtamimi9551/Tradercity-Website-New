"use client";

import Link from "next/link";
import { User } from "lucide-react";
import TraderCityLogo from "./TraderCityLogo";
import {
  MOBILE_NAV_ITEMS,
  MOBILE_NAV_TRANSITION_MS,
  type NavItemConfig,
} from "./navConfig";
import { isNavItemActive, useActiveSection } from "./useActiveSection";

function scrollToSection(href: string) {
  const id = href.replace("#", "");
  const target = document.getElementById(id);
  if (!target) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  target.scrollIntoView({
    behavior: prefersReducedMotion ? "auto" : "smooth",
    block: "start",
  });

  window.history.replaceState(null, "", href);
}

function MobileTopHeader() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-[90] text-white lg:hidden">
      <div className="pointer-events-auto px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
        <div className="flex items-center justify-between gap-3">
          <a
            href="#home"
            onClick={(event) => {
              event.preventDefault();
              scrollToSection("#home");
            }}
            className="group flex min-w-0 flex-1 touch-manipulation items-center gap-3 rounded-2xl py-1 pr-2 transition-opacity active:opacity-80"
            aria-label="TraderCity home"
          >
            <TraderCityLogo className="h-9 w-9" showGlow />
            <div className="min-w-0">
              <p className="truncate text-[13px] font-bold tracking-[0.24em] text-white">
                TRADERCITY
              </p>
              <p className="mt-0.5 truncate text-[10px] text-white/70">
                Multiple Perspectives.{" "}
                <span className="text-tc-cyan">Better</span> Decisions.
              </p>
            </div>
          </a>

          <Link
            href="/login"
            className="inline-flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center rounded-full border border-white/15 bg-[#0c0e16]/55 text-white shadow-[0_4px_16px_rgba(0,0,0,0.28)] backdrop-blur-md transition-all duration-200 active:scale-95"
            aria-label="Login"
          >
            <User className="h-[18px] w-[18px] text-white" strokeWidth={2} />
          </Link>
        </div>
      </div>
    </header>
  );
}

type BottomNavItemProps = {
  item: NavItemConfig;
  isActive: boolean;
};

function BottomNavItem({ item, isActive }: BottomNavItemProps) {
  const Icon = item.icon;
  const iconColor = isActive ? "text-tc-purple" : "text-white/85";
  const labelColor = isActive ? "text-tc-purple" : "text-white/70";

  return (
    <a
      href={item.href}
      onClick={(event) => {
        event.preventDefault();
        scrollToSection(item.href);
      }}
      className={[
        "group relative flex min-h-[56px] min-w-0 flex-1 touch-manipulation flex-col items-center justify-center gap-1 px-0.5 py-2",
        "transition-all duration-[180ms] ease-out active:scale-95",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tc-purple/50",
      ].join(" ")}
      aria-current={isActive ? "page" : undefined}
      aria-label={item.label}
    >
      {isActive ? (
        <span
          className="pointer-events-none absolute inset-x-1.5 top-0 h-[2.5px] rounded-full bg-gradient-to-r from-tc-purple via-[#5E5CE6] to-tc-cyan shadow-[0_0_10px_rgba(155,93,229,0.65)]"
          aria-hidden="true"
        />
      ) : null}

      <span
        className={[
          "flex h-8 w-8 items-center justify-center rounded-xl transition-all duration-[180ms] sm:h-9 sm:w-9",
          isActive ? "-translate-y-0.5 bg-tc-purple/20" : "bg-white/[0.04]",
        ].join(" ")}
      >
        <Icon
          className={`h-[17px] w-[17px] sm:h-[19px] sm:w-[19px] ${iconColor}`}
          strokeWidth={2}
          aria-hidden="true"
        />
      </span>

      <span className={`text-[9px] font-semibold leading-none sm:text-[10px] ${labelColor}`}>
        {item.label}
      </span>
    </a>
  );
}

export default function MobileBottomNavigation() {
  const activeId = useActiveSection();

  return (
    <>
      <MobileTopHeader />

      <nav
        className={[
          "fixed inset-x-3 bottom-[max(0.5rem,env(safe-area-inset-bottom))] z-[100] lg:hidden",
          "flex rounded-[22px] border border-white/[0.12]",
          "bg-[#0a0c14]/40 shadow-[0_8px_28px_rgba(0,0,0,0.28),0_0_0_1px_rgba(255,255,255,0.04),inset_0_1px_0_rgba(255,255,255,0.08)]",
          "backdrop-blur-2xl backdrop-saturate-150",
          "touch-manipulation",
        ].join(" ")}
        aria-label="Mobile primary"
        style={{ transitionDuration: `${MOBILE_NAV_TRANSITION_MS}ms` }}
      >
        <div className="flex w-full items-stretch px-0.5 py-1.5">
          {MOBILE_NAV_ITEMS.map((item) => (
            <BottomNavItem
              key={item.id}
              item={item}
              isActive={isNavItemActive(activeId, item.id)}
            />
          ))}
        </div>
      </nav>
    </>
  );
}
