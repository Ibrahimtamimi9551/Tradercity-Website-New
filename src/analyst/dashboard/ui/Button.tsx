import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";
import { analystTheme } from "@/analyst/dashboard/theme/analyst-theme";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "danger";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
  loading?: boolean;
};

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 text-sm font-medium transition-all duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:active:scale-100";

export function Button({
  children,
  variant = "primary",
  loading = false,
  className = "",
  disabled,
  style,
  ...rest
}: ButtonProps) {
  const variantStyle: CSSProperties =
    variant === "primary"
      ? {
          background: analystTheme.accentStrong,
          color: "#fff",
          boxShadow: "0 0 18px rgba(124, 58, 237, 0.35)",
          border: "1px solid rgba(167, 139, 250, 0.35)",
        }
      : variant === "secondary"
        ? {
            background: "rgba(255,255,255,0.04)",
            color: "rgba(255,255,255,0.85)",
            border: "1px solid rgba(255,255,255,0.15)",
          }
        : variant === "outline"
          ? {
              background: "transparent",
              color: "rgba(255,255,255,0.8)",
              border: `1px solid ${analystTheme.accentBorder}`,
            }
          : variant === "danger"
            ? {
                background: analystTheme.errorSoft,
                color: analystTheme.error,
                border: "1px solid rgba(239,68,68,0.35)",
              }
            : {
                background: "transparent",
                color: "rgba(255,255,255,0.7)",
                border: "1px solid transparent",
              };

  return (
    <button
      type="button"
      className={`${base} ${
        variant === "primary"
          ? "hover:brightness-110"
          : variant === "ghost"
            ? "hover:bg-white/[0.06]"
            : "hover:bg-white/[0.06]"
      } ${className}`}
      style={{ ...variantStyle, ...style }}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
      ) : null}
      {children}
    </button>
  );
}
