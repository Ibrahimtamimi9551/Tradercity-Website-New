import { InfoCard } from "@/components/admin/ui/InfoCard";
import { GuideFlow } from "./GuideFlow";
import { GuideSection } from "./GuideSection";
import type { OverviewGuideContent } from "@/types/admin/guide";

type OverviewGuideViewProps = {
  content: OverviewGuideContent;
};

export function OverviewGuideView({ content }: OverviewGuideViewProps) {
  return (
    <div className="space-y-8">
      <GuideSection title="Platform Philosophy">
        <InfoCard>
          <ul className="space-y-2">
            {content.philosophy.map((line) => (
              <li key={line} className="text-sm leading-relaxed text-tc-muted">
                {line}
              </li>
            ))}
          </ul>
        </InfoCard>
      </GuideSection>

      <GuideSection title="Admin Dashboard Purpose">
        <InfoCard>
          <ul className="list-disc space-y-2 pl-4">
            {content.adminPurpose.map((line) => (
              <li key={line} className="text-sm leading-relaxed text-tc-muted">
                {line}
              </li>
            ))}
          </ul>
        </InfoCard>
      </GuideSection>

      <GuideSection
        title="Member Lifecycle Overview"
        description="High-level path from registration to synchronized VIP access."
      >
        <InfoCard>
          <GuideFlow steps={content.memberLifecycle} />
        </InfoCard>
      </GuideSection>

      <GuideSection
        title="High-Level Operational Workflow"
        description="The One Loop — every Admin action should complete this cycle."
      >
        <InfoCard>
          <GuideFlow steps={content.operationalLoop} />
        </InfoCard>
      </GuideSection>

      <GuideSection title="Core Principles">
        <div className="grid gap-3 sm:grid-cols-2">
          {content.principles.map((principle) => (
            <InfoCard key={principle.title} title={principle.title}>
              <p className="text-sm text-tc-muted">{principle.body}</p>
            </InfoCard>
          ))}
        </div>
      </GuideSection>
    </div>
  );
}
