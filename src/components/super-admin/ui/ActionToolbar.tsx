import type { ReactNode } from "react";
import { cn } from "@/lib/super-admin/cn";

type ActionToolbarProps = {
  children: ReactNode;
  className?: string;
};

/** Presentational action row — no domain actions wired in Phase 0. */
export function ActionToolbar({ children, className }: ActionToolbarProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>{children}</div>
  );
}
