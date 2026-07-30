"use client";

import Link from "next/link";
import { InfoCard } from "@/components/admin/ui/InfoCard";
import type { GuideRelatedModule, GuideTabId } from "@/types/admin/guide";

type RelatedModulesProps = {
  modules: GuideRelatedModule[];
  onSelectTab?: (tab: GuideTabId) => void;
};

export function RelatedModules({ modules, onSelectTab }: RelatedModulesProps) {
  return (
    <InfoCard title="Related Modules">
      <div className="flex flex-wrap gap-2">
        {modules.map((mod) => {
          const className =
            "rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-tc-muted transition-colors hover:border-violet-500/30 hover:bg-violet-500/10 hover:text-violet-100";

          if (mod.tab && onSelectTab) {
            return (
              <button
                key={`${mod.label}-${mod.tab}`}
                type="button"
                onClick={() => onSelectTab(mod.tab!)}
                className={className}
              >
                {mod.label}
              </button>
            );
          }

          if (mod.href) {
            return (
              <Link
                key={`${mod.label}-${mod.href}`}
                href={mod.href}
                className={className}
              >
                {mod.label}
              </Link>
            );
          }

          return (
            <span
              key={mod.label}
              className="rounded-lg border border-white/10 px-3 py-1.5 text-sm text-tc-muted/60"
            >
              {mod.label}
            </span>
          );
        })}
      </div>
    </InfoCard>
  );
}
