"use client";

import Link from "next/link";
import { ArrowRight, Search, User } from "lucide-react";
import TraderCityLogo from "./TraderCityLogo";
import { NAV_ITEMS, NAV_TRANSITION_MS, type NavItemConfig } from "./navConfig";
import { isNavItemActive, useActiveSection } from "./useActiveSection";
import { useNavCompact } from "./useNavCompact";

const NAV_EASE = "cubic-bezier(0.33, 1, 0.68, 1)";

type NavLinkProps = {
  item: NavItemConfig;
  isActive: boolean;
  isCompact: boolean;
  isTablet: boolean;
};

function NavLink({ item, isActive, isCompact, isTablet }: NavLinkProps) {
  const Icon = item.icon;
  const useCompactStyle = isCompact || isTablet;

  return (
    <a
      href={item.href}
      className={[
        "group relative flex shrink-0 items-center justify-center transition-all duration-300 ease-out",
        "hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tc-purple/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        useCompactStyle
          ? "gap-1 rounded-lg px-2 py-2 md:px-2.5 lg:gap-1.5 xl:px-3"
          : "min-w-[70px] flex-col gap-1 rounded-full px-2.5 py-2 xl:min-w-[78px] xl:px-3",
        isActive
          ? "bg-[#9B5DE5]/20 text-white shadow-[0_0_16px_rgba(155,93,229,0.35)] ring-1 ring-[#9B5DE5]/40"
          : "text-white/80 hover:bg-white/[0.06] hover:text-white",
      ].join(" ")}
      aria-current={isActive ? "page" : undefined}
    >
      <Icon
        className={[
          "shrink-0 transition-colors duration-200",
          useCompactStyle ? "h-3.5 w-3.5 xl:h-4 xl:w-4" : "h-[17px] w-[17px] xl:h-[18px] xl:w-[18px]",
          isActive ? "text-[#C084FC]" : "text-white/75 group-hover:text-white",
        ].join(" ")}
        strokeWidth={1.75}
        aria-hidden="true"
      />

      <span
        className={[
          "font-medium leading-none tracking-wide transition-colors duration-200",
          useCompactStyle ? "text-[10px] md:text-[11px] xl:text-xs" : "text-[10px] xl:text-[11px]",
          isActive ? "text-white font-semibold" : "",
        ].join(" ")}
      >
        {item.label}
      </span>

      {item.showNotification ? (
        <span
          className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-[#FF4D6D] shadow-[0_0_6px_rgba(255,77,109,0.8)]"
          aria-hidden="true"
        />
      ) : null}
    </a>
  );
}

function SearchButton() {
  return (
    <button
      type="button"
      aria-label="Search"
      className="group flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/[0.12] bg-[#0a0c14]/70 text-white/80 shadow-[0_4px_20px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-white/25 hover:bg-[#0c0e16]/85 hover:text-white md:h-10 md:w-10"
    >
      <Search className="h-4 w-4 transition-transform duration-200 group-hover:scale-105" strokeWidth={2} />
    </button>
  );
}

type LoginButtonProps = {
  variant: "external" | "inline";
};

function LoginButton({ variant }: LoginButtonProps) {
  const isExternal = variant === "external";

  return (
    <Link
      href="/login"
      className={[
        "group inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap font-medium text-white transition-all duration-300 ease-out",
        "hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tc-purple/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        isExternal
          ? "rounded-full border border-white/[0.12] bg-[#0a0c14]/70 px-4 py-2 text-sm shadow-[0_4px_20px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md hover:border-white/20 hover:bg-[#0c0e16]/80 md:px-5 md:py-2.5"
          : "rounded-lg px-2 py-2 text-[10px] hover:bg-white/[0.06] md:px-2.5 md:text-[11px] xl:px-3 xl:text-xs",
      ].join(" ")}
    >
      <span
        className={[
          "flex items-center justify-center rounded-full border border-white/15 bg-white/[0.04]",
          isExternal ? "h-6 w-6 md:h-7 md:w-7" : "h-6 w-6",
        ].join(" ")}
      >
        <User className={isExternal ? "h-3 w-3 md:h-3.5 md:w-3.5" : "h-3 w-3"} strokeWidth={1.75} />
      </span>
      <span>Login</span>
      <ArrowRight
        className={[
          "transition-transform duration-200 group-hover:translate-x-0.5",
          isExternal ? "h-3.5 w-3.5 md:h-4 md:w-4" : "h-3.5 w-3.5",
        ].join(" ")}
        strokeWidth={1.75}
        aria-hidden="true"
      />
    </Link>
  );
}

function NavDivider() {
  return <span className="mx-0.5 h-7 w-px shrink-0 bg-white/10 md:h-8" aria-hidden="true" />;
}

export default function TraderCityNavigation() {
  const activeId = useActiveSection();
  const { isCompact, layoutMode, prefersReducedMotion } = useNavCompact();
  const isTablet = layoutMode === "tablet";
  const showHeroBrand = !isCompact && !isTablet;
  const showExternalLogin = !isCompact && !isTablet;
  const showInlineLogin = isCompact || isTablet;

  const transitionStyle = prefersReducedMotion
    ? undefined
    : { transitionDuration: `${NAV_TRANSITION_MS}ms`, transitionTimingFunction: NAV_EASE };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 hidden lg:block">
      <div
        className={[
          "pointer-events-auto mx-auto w-full max-w-[1440px] transition-all",
          isCompact ? "px-6 py-2 xl:px-8" : "px-6 pb-3 pt-5 xl:px-10 xl:pt-7",
        ].join(" ")}
        style={transitionStyle}
      >
        <div
          className={[
            "relative w-full items-center",
            showHeroBrand
              ? "grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-3"
              : "flex justify-center",
          ].join(" ")}
        >
          <div
            className={[
              "flex min-w-0 items-center gap-3 overflow-hidden transition-all",
              showHeroBrand
                ? "max-w-[340px] justify-self-start opacity-100"
                : "pointer-events-none max-w-0 justify-self-start opacity-0",
            ].join(" ")}
            style={transitionStyle}
            aria-hidden={!showHeroBrand}
          >
            <TraderCityLogo className="h-8 w-8 shrink-0 xl:h-9 xl:w-9" showGlow />

            <div className="min-w-0">
              <p className="truncate text-sm font-bold tracking-[0.22em] text-white xl:text-[15px]">
                TRADERCITY
              </p>
              <p className="mt-0.5 truncate text-[10px] leading-snug text-white/70 xl:text-[11px]">
                Multiple Perspectives.{" "}
                <span className="font-medium text-tc-cyan">Better</span> Decisions.
              </p>
            </div>
          </div>

          <nav
            className={[
              "flex items-center justify-center",
              showHeroBrand ? "justify-self-center" : "w-full max-w-[920px]",
            ].join(" ")}
            aria-label="Primary"
          >
            <div
              className={[
                "flex max-w-full items-center overflow-hidden transition-all",
                "rounded-full border border-white/[0.1] bg-[#0a0c14]/80 shadow-[0_4px_24px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-xl",
                isCompact || isTablet
                  ? "gap-0.5 px-1.5 py-1 shadow-[0_6px_28px_rgba(0,0,0,0.4)]"
                  : "gap-0 px-1.5 py-1.5 xl:px-2",
              ].join(" ")}
              style={transitionStyle}
            >
              {NAV_ITEMS.map((item, index) => (
                <div key={item.id} className="flex shrink-0 items-center">
                  {index > 0 ? <NavDivider /> : null}
                  <NavLink
                    item={item}
                    isActive={isNavItemActive(activeId, item.id)}
                    isCompact={isCompact}
                    isTablet={isTablet}
                  />
                </div>
              ))}

              {showInlineLogin ? (
                <div className="flex items-center">
                  <NavDivider />
                  <LoginButton variant="inline" />
                </div>
              ) : null}
            </div>
          </nav>

          {showExternalLogin ? (
            <div className="flex items-center gap-2.5 justify-self-end">
              <SearchButton />
              <LoginButton variant="external" />
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
