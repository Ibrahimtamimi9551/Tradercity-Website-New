"use client";

import { cn } from "@/lib/admin/cn";

export type SelectOption = {
  value: string;
  label: string;
};

type SelectFieldProps = {
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  "aria-label": string;
  className?: string;
  /** Tighter control — used on mobile directory filters */
  size?: "default" | "compact";
};

/**
 * Native select with forced dark color-scheme so OS pickers stay readable on mobile.
 * (Custom menus were unreliable with mobile touch / overflow.)
 */
export function SelectField({
  value,
  options,
  onChange,
  "aria-label": ariaLabel,
  className,
  size = "default",
}: SelectFieldProps) {
  return (
    <div className={cn("relative min-w-0", className)}>
      <select
        aria-label={ariaLabel}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        style={{ colorScheme: "dark" }}
        className={cn(
          "w-full appearance-none rounded-lg border border-white/10 bg-[#0c101c] text-white/90",
          "focus:border-tc-purple/50 focus:outline-none focus:ring-2 focus:ring-tc-purple/20",
          "bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%238F9BB3%22 stroke-width=%222.5%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22%3E%3Cpolyline points=%226 9 12 15 18 9%22/%3E%3C/svg%3E')] bg-[length:12px] bg-[right_0.65rem_center] bg-no-repeat pr-8",
          size === "compact" ? "h-8 px-2.5 text-[11px]" : "h-10 px-3 text-sm"
        )}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            style={{ backgroundColor: "#0c101c", color: "#f8fafc" }}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
