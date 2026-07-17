"use client";

import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/admin/cn";
import { useAdminTheme } from "./AdminThemeProvider";

type AdminThemeToggleProps = {
  className?: string;
  /** Compact text label for sheet menus */
  showLabel?: boolean;
};

/**
 * Single onClick only — pointerup+click double-firing cancels the toggle
 * (looks like “light mode never applies”) on iPhone and Chrome device mode.
 */
export function AdminThemeToggle({ className, showLabel = false }: AdminThemeToggleProps) {
  const { theme, toggleTheme } = useAdminTheme();
  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleTheme();
      }}
      className={cn(
        "admin-ghost-btn relative z-[70] inline-flex shrink-0 cursor-pointer touch-manipulation items-center justify-center rounded-lg border transition-colors select-none",
        showLabel ? "h-11 w-full justify-start gap-3 px-3 text-sm font-medium" : "h-11 w-11",
        className
      )}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      aria-pressed={isLight}
      title={isLight ? "Dark mode" : "Light mode"}
      suppressHydrationWarning
    >
      {isLight ? <Sun className="h-4 w-4 shrink-0" aria-hidden /> : <Moon className="h-4 w-4 shrink-0" aria-hidden />}
      {showLabel ? (
        <span suppressHydrationWarning>{isLight ? "Dark mode" : "Light mode"}</span>
      ) : null}
    </button>
  );
}
