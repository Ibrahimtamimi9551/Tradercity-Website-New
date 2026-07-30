"use client";

import Link from "next/link";
import { InfoCard } from "@/components/admin/ui/InfoCard";
import { GuideFlow } from "./GuideFlow";
import { GuideSection } from "./GuideSection";
import type { GuideTabId, TroubleshootingScenario } from "@/types/admin/guide";

type TroubleshootingListProps = {
  scenarios: TroubleshootingScenario[];
  onSelectTab: (tab: GuideTabId) => void;
};

export function TroubleshootingList({
  scenarios,
  onSelectTab,
}: TroubleshootingListProps) {
  return (
    <div className="space-y-6">
      <GuideSection
        title="Troubleshooting"
        description="Common operational scenarios — causes, expected behavior, and resolution workflow."
      >
        <div className="space-y-4">
          {scenarios.map((scenario) => (
            <InfoCard key={scenario.id} title={scenario.title}>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-tc-muted/80">
                    Possible causes
                  </p>
                  <ul className="mt-1.5 list-disc space-y-1 pl-4 text-sm text-tc-muted">
                    {scenario.possibleCauses.map((cause) => (
                      <li key={cause}>{cause}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-tc-muted/80">
                    Expected behavior
                  </p>
                  <p className="mt-1.5 text-sm text-tc-muted">
                    {scenario.expectedBehavior}
                  </p>
                </div>

                <div>
                  <p className="mb-2 text-xs font-medium uppercase tracking-wider text-tc-muted/80">
                    Resolution workflow
                  </p>
                  <GuideFlow steps={scenario.resolution} />
                </div>

                <div className="flex flex-wrap items-center gap-2 border-t border-white/10 pt-3 text-sm">
                  <span className="text-tc-muted">Responsible module:</span>
                  <span className="font-medium text-white">
                    {scenario.responsibleModule}
                  </span>
                  {scenario.relatedTab ? (
                    <button
                      type="button"
                      onClick={() => onSelectTab(scenario.relatedTab!)}
                      className="ml-auto rounded-lg border border-white/10 px-2.5 py-1 text-xs text-violet-200 hover:bg-violet-500/10"
                    >
                      Open guide
                    </button>
                  ) : null}
                  {scenario.relatedHref ? (
                    <Link
                      href={scenario.relatedHref}
                      className="rounded-lg border border-white/10 px-2.5 py-1 text-xs text-tc-muted hover:bg-white/[0.04] hover:text-white"
                    >
                      Open module
                    </Link>
                  ) : null}
                </div>
              </div>
            </InfoCard>
          ))}
        </div>
      </GuideSection>
    </div>
  );
}
