import { InfoCard } from "@/components/admin/ui/InfoCard";
import { GuideFlow } from "./GuideFlow";
import { GuideSection } from "./GuideSection";
import type { ArchitectureGuideContent } from "@/types/admin/guide";

type ArchitectureGuideViewProps = {
  content: ArchitectureGuideContent;
};

export function ArchitectureGuideView({ content }: ArchitectureGuideViewProps) {
  return (
    <div className="space-y-8">
      <GuideSection title="Architecture Reference">
        <InfoCard>
          <p className="text-sm leading-relaxed text-tc-muted">{content.intro}</p>
        </InfoCard>
      </GuideSection>

      <GuideSection title="Membership Domain (Backend)">
        <InfoCard>
          <p className="text-sm leading-relaxed text-tc-muted">
            {content.membershipNote}
          </p>
        </InfoCard>
      </GuideSection>

      <div className="space-y-6">
        {content.diagrams.map((diagram) => (
          <GuideSection
            key={diagram.id}
            title={diagram.title}
            description={diagram.description}
          >
            <InfoCard>
              <GuideFlow steps={diagram.steps} />
            </InfoCard>
          </GuideSection>
        ))}
      </div>
    </div>
  );
}
