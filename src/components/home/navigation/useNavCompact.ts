"use client";

import { useEffect, useState } from "react";
import {
  DESKTOP_HERO_NAV_MIN_WIDTH,
  DESKTOP_NAV_MIN_WIDTH,
  SCROLL_COMPACT_THRESHOLD,
} from "./navConfig";

export function getScrollY(): number {
  if (typeof window === "undefined") return 0;
  return window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
}

export type NavLayoutMode = "mobile" | "tablet" | "desktop";

export function getNavLayoutMode(width: number): NavLayoutMode {
  if (width < DESKTOP_NAV_MIN_WIDTH) return "mobile";
  if (width < DESKTOP_HERO_NAV_MIN_WIDTH) return "tablet";
  return "desktop";
}

export function shouldUseCompactNav(width: number, scrollY: number): boolean {
  const mode = getNavLayoutMode(width);
  if (mode === "mobile") return false;
  if (mode === "tablet") return true;
  return scrollY >= SCROLL_COMPACT_THRESHOLD;
}

export function useNavCompact() {
  const [isCompact, setIsCompact] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [layoutMode, setLayoutMode] = useState<NavLayoutMode>("desktop");
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const motionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setPrefersReducedMotion(motionMedia.matches);
    updateMotion();
    motionMedia.addEventListener("change", updateMotion);

    const update = () => {
      const width = window.innerWidth;
      const scrollY = getScrollY();
      const mode = getNavLayoutMode(width);

      setLayoutMode(mode);
      const compact = shouldUseCompactNav(width, scrollY);
      setIsCompact(compact);
      setIsScrolled(compact);
    };

    let frame = 0;
    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };

    update();

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    document.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    const sentinel = document.getElementById("nav-scroll-sentinel");
    let sentinelObserver: IntersectionObserver | undefined;

    if (sentinel) {
      sentinelObserver = new IntersectionObserver(
        ([entry]) => {
          const width = window.innerWidth;
          if (width < DESKTOP_HERO_NAV_MIN_WIDTH) return;
          const compact = !entry.isIntersecting;
          setIsCompact(compact);
          setIsScrolled(compact);
        },
        { threshold: 0, rootMargin: `-${SCROLL_COMPACT_THRESHOLD}px 0px 0px 0px` }
      );
      sentinelObserver.observe(sentinel);
    }

    return () => {
      motionMedia.removeEventListener("change", updateMotion);
      window.removeEventListener("scroll", scheduleUpdate);
      document.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frame) window.cancelAnimationFrame(frame);
      sentinelObserver?.disconnect();
    };
  }, []);

  return { isCompact, isScrolled, layoutMode, prefersReducedMotion };
}
