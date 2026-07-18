import type { ReactNode } from "react";
import { cn } from "@/lib/admin/cn";
import {
  modulePanelSurface,
  type ModulePanelTone,
} from "@/lib/admin/module-surfaces";

type AdminDirectoryPanelProps = {
  children: ReactNode;
  tone?: ModulePanelTone;
  className?: string;
};

/**
 * List/table surface for Admin directories — edge-bleed on phone, `min-w-0`
 * overflow containment, shared module panel language.
 */
export function AdminDirectoryPanel({
  children,
  tone = "purple",
  className,
}: AdminDirectoryPanelProps) {
  return (
    <div
      className={cn(
        modulePanelSurface(tone, "space-y-3 sm:space-y-4"),
        "!p-1.5 sm:!p-5 max-sm:-mx-2 min-w-0",
        className
      )}
    >
      {children}
    </div>
  );
}
