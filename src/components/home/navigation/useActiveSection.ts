"use client";

import { useEffect, useState } from "react";
import { getScrollY } from "./useNavCompact";
import { SCROLL_COMPACT_THRESHOLD, SECTION_IDS } from "./navConfig";

export function useActiveSection() {
  const [activeId, setActiveId] = useState("home");

  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (section): section is HTMLElement => section !== null
    );

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-35% 0px -40% 0px",
        threshold: [0, 0.15, 0.35, 0.55, 0.75, 1],
      }
    );

    sections.forEach((section) => observer.observe(section));

    const handleScrollTop = () => {
      if (getScrollY() < SCROLL_COMPACT_THRESHOLD) {
        setActiveId("home");
      }
    };

    window.addEventListener("scroll", handleScrollTop, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScrollTop);
    };
  }, []);

  return activeId;
}

export function isNavItemActive(activeId: string, itemId: string): boolean {
  if (itemId === "team") return activeId === "analysts";
  return activeId === itemId;
}

export function isMoreMenuActive(activeId: string): boolean {
  return ["analysts", "pricing"].includes(activeId);
}
