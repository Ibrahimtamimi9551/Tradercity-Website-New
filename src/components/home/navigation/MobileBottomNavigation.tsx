"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ChevronRight, User } from "lucide-react";
import TraderCityLogo from "./TraderCityLogo";
import {
  MOBILE_NAV_ITEMS,
  MOBILE_NAV_TRANSITION_MS,
  MORE_MENU_ITEMS,
  type MoreMenuItemConfig,
  type NavItemConfig,
} from "./navConfig";
import { isMoreMenuActive, isNavItemActive, useActiveSection } from "./useActiveSection";

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
            className="inline-flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center rounded-full border border-white/15 bg-[#0c0e16] text-white shadow-[0_4px_16px_rgba(0,0,0,0.35)] transition-all duration-200 active:scale-95"
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
  isMoreOpen?: boolean;
  onMorePress: () => void;
  onNavigate: () => void;
};

function BottomNavItem({ item, isActive, isMoreOpen = false, onMorePress, onNavigate }: BottomNavItemProps) {
  const Icon = item.icon;
  const isMore = item.id === "more";
  const iconColor = isActive ? "text-tc-purple" : "text-white/85";
  const labelColor = isActive ? "text-tc-purple" : "text-white/70";

  const content = (
    <>
      {isActive ? (
        <span
          className="pointer-events-none absolute inset-x-2 top-0 h-[2.5px] rounded-full bg-gradient-to-r from-tc-purple via-[#5E5CE6] to-tc-cyan shadow-[0_0_10px_rgba(155,93,229,0.65)]"
          aria-hidden="true"
        />
      ) : null}

      <span
        className={[
          "flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-[180ms]",
          isActive ? "-translate-y-0.5 bg-tc-purple/20" : "bg-white/[0.04]",
        ].join(" ")}
      >
        <Icon className={`h-[19px] w-[19px] ${iconColor}`} strokeWidth={2} aria-hidden="true" />
      </span>

      <span className={`text-[10px] font-semibold leading-none ${labelColor}`}>{item.label}</span>
    </>
  );

  const sharedClassName = [
    "group relative flex min-h-[56px] min-w-0 flex-1 touch-manipulation flex-col items-center justify-center gap-1 px-1 py-2",
    "transition-all duration-[180ms] ease-out active:scale-95",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tc-purple/50",
  ].join(" ");

  if (isMore) {
    return (
      <button
        type="button"
        onClick={onMorePress}
        className={sharedClassName}
        aria-current={isActive ? "page" : undefined}
        aria-label={item.label}
        aria-haspopup="dialog"
        aria-expanded={isMoreOpen}
      >
        {content}
      </button>
    );
  }

  return (
    <a
      href={item.href}
      onClick={(event) => {
        event.preventDefault();
        onNavigate();
        scrollToSection(item.href);
      }}
      className={sharedClassName}
      aria-current={isActive ? "page" : undefined}
      aria-label={item.label}
    >
      {content}
    </a>
  );
}

type MoreSheetProps = {
  open: boolean;
  onClose: () => void;
};

function MoreSheet({ open, onClose }: MoreSheetProps) {
  useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[110] touch-manipulation text-white lg:hidden" role="presentation">
      <button
        type="button"
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
        onClick={onClose}
        aria-label="Close menu"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-more-title"
        className={[
          "absolute inset-x-0 bottom-0",
          "rounded-t-[24px] border border-white/10 border-b-0",
          "bg-[#0c0e16] shadow-[0_-12px_48px_rgba(0,0,0,0.5)]",
          "pb-[max(1rem,env(safe-area-inset-bottom))]",
          "animate-[slideUp_280ms_cubic-bezier(0.33,1,0.68,1)]",
        ].join(" ")}
      >
        <div className="flex justify-center pt-3 pb-1">
          <span className="h-1 w-10 rounded-full bg-white/25" aria-hidden="true" />
        </div>

        <div className="px-5 pb-2 pt-1">
          <h2 id="mobile-more-title" className="text-lg font-semibold text-white">
            More
          </h2>
        </div>

        <nav className="flex flex-col gap-0.5 px-3 pb-4" aria-label="More navigation">
          {MORE_MENU_ITEMS.map((item) => (
            <MoreSheetRow key={item.id} item={item} onNavigate={onClose} />
          ))}
        </nav>
      </div>
    </div>
  );
}

function MoreSheetRow({
  item,
  onNavigate,
}: {
  item: MoreMenuItemConfig;
  onNavigate: () => void;
}) {
  const Icon = item.icon;
  const isExternal = item.href.startsWith("/");
  const className = [
    "flex min-h-[56px] touch-manipulation items-center gap-3.5 rounded-2xl px-3 py-3.5 transition-colors",
    item.disabled
      ? "cursor-not-allowed opacity-40"
      : "active:bg-white/[0.06] hover:bg-white/[0.04]",
  ].join(" ");

  const content = (
    <>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.08]">
        <Icon className="h-[18px] w-[18px] text-tc-purple" strokeWidth={2} aria-hidden="true" />
      </span>

      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="text-sm font-semibold text-white">{item.label}</span>
          {item.badge ? (
            <span className="rounded-full bg-tc-purple/20 px-2 py-0.5 text-[10px] font-bold tracking-wide text-tc-purple">
              {item.badge}
            </span>
          ) : null}
        </span>
        <span className="mt-0.5 block text-xs text-white/60">{item.description}</span>
      </span>

      {!item.disabled ? (
        <ChevronRight className="h-4 w-4 shrink-0 text-white/40" strokeWidth={2} aria-hidden="true" />
      ) : null}
    </>
  );

  if (item.disabled) {
    return <div className={className}>{content}</div>;
  }

  if (isExternal) {
    return (
      <Link href={item.href} onClick={onNavigate} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <a
      href={item.href}
      onClick={(event) => {
        event.preventDefault();
        onNavigate();
        scrollToSection(item.href);
      }}
      className={className}
    >
      {content}
    </a>
  );
}

export default function MobileBottomNavigation() {
  const activeId = useActiveSection();
  const [moreOpen, setMoreOpen] = useState(false);

  const closeMore = useCallback(() => setMoreOpen(false), []);
  const openMore = useCallback(() => setMoreOpen(true), []);

  const moreIsActive = moreOpen || isMoreMenuActive(activeId);

  return (
    <>
      <MobileTopHeader />

      <nav
        className={[
          "fixed inset-x-3 bottom-[max(0.5rem,env(safe-area-inset-bottom))] z-[100] lg:hidden",
          "flex rounded-[22px] border border-white/10",
          "bg-[#0c0e16] shadow-[0_8px_32px_rgba(0,0,0,0.5)]",
          "touch-manipulation",
        ].join(" ")}
        aria-label="Mobile primary"
        style={{ transitionDuration: `${MOBILE_NAV_TRANSITION_MS}ms` }}
      >
        <div className="flex w-full items-stretch px-1 py-1.5">
          {MOBILE_NAV_ITEMS.map((item) => (
            <BottomNavItem
              key={item.id}
              item={item}
              isActive={
                item.id === "more"
                  ? moreIsActive
                  : isNavItemActive(activeId, item.id)
              }
              onMorePress={openMore}
              onNavigate={closeMore}
              isMoreOpen={item.id === "more" ? moreOpen : false}
            />
          ))}
        </div>
      </nav>

      <MoreSheet open={moreOpen} onClose={closeMore} />
    </>
  );
}
