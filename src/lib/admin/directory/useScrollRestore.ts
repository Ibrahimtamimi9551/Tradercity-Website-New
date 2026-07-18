"use client";

import { useEffect, useRef } from "react";
import { consumeDirectoryContext } from "./context-storage";

/**
 * Restore window scroll after returning to a directory list from a detail route.
 * Consumes the sessionStorage snapshot so it only runs once per return.
 */
export function useScrollRestore(moduleKey: string, enabled = true): void {
  const restoredRef = useRef(false);

  useEffect(() => {
    if (!enabled || restoredRef.current) return;
    const snapshot = consumeDirectoryContext(moduleKey);
    if (!snapshot || typeof snapshot.scrollY !== "number") return;

    restoredRef.current = true;
    const y = snapshot.scrollY;

    // Wait a frame so list content can paint before scrolling.
    const id = window.requestAnimationFrame(() => {
      window.scrollTo({ top: y, behavior: "auto" });
    });
    return () => window.cancelAnimationFrame(id);
  }, [enabled, moduleKey]);
}
