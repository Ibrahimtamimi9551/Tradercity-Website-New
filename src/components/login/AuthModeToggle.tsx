"use client";

import type { AuthMode } from "@/lib/auth";

interface AuthModeToggleProps {
  mode: AuthMode;
  onChange: (mode: AuthMode) => void;
  disabled?: boolean;
}

export default function AuthModeToggle({
  mode,
  onChange,
  disabled = false,
}: AuthModeToggleProps) {
  return (
    <div
      className="mb-8 grid w-full grid-cols-2 gap-1 rounded-xl border border-[#1F2129] bg-[#0C0E14] p-1 lg:mb-4"
      role="tablist"
      aria-label="Authentication mode"
    >
      {(
        [
          { id: "login", label: "Login" },
          { id: "register", label: "Create Account" },
        ] as const
      ).map((tab) => {
        const active = mode === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={active}
            disabled={disabled}
            onClick={() => onChange(tab.id)}
            className={[
              "rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors lg:py-2",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]/60",
              "disabled:cursor-not-allowed disabled:opacity-60",
              active
                ? "bg-[#141824] text-white shadow-[0_0_0_1px_rgba(59,130,246,0.35)]"
                : "text-[#94A3B8] hover:text-white",
            ].join(" ")}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
