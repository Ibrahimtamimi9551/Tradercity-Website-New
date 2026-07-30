"use client";

import { InfoCard } from "@/components/admin/ui/InfoCard";
import { GuideFlow } from "./GuideFlow";
import { GuideSection } from "./GuideSection";
import { OwnsDoesNotOwn } from "./OwnsDoesNotOwn";
import { RelatedModules } from "./RelatedModules";
import { StatusDefinitionList } from "./StatusDefinitionList";
import type { GuideTabId, ModuleGuideContent } from "@/types/admin/guide";

type ModuleGuideViewProps = {
  guide: ModuleGuideContent;
  onSelectTab: (tab: GuideTabId) => void;
};

export function ModuleGuideView({ guide, onSelectTab }: ModuleGuideViewProps) {
  return (
    <div className="space-y-8">
      <GuideSection title="1. Module Purpose">
        <InfoCard>
          <p className="text-sm leading-relaxed text-tc-muted">{guide.purpose}</p>
        </InfoCard>
      </GuideSection>

      <GuideSection title="2. Responsibilities">
        <OwnsDoesNotOwn owns={guide.owns} doesNotOwn={guide.doesNotOwn} />
      </GuideSection>

      <GuideSection title="3. Process Flow">
        <InfoCard>
          <GuideFlow steps={guide.processFlow} />
        </InfoCard>
      </GuideSection>

      <GuideSection title="4. Cross Module Relationships">
        <InfoCard>
          <GuideFlow steps={guide.crossModuleFlow} />
        </InfoCard>
      </GuideSection>

      <GuideSection title="5. Source of Truth">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {guide.sourceOfTruth.map((item) => (
            <InfoCard key={item.label} title={item.label}>
              <p className="text-sm text-tc-muted">{item.detail}</p>
            </InfoCard>
          ))}
        </div>
      </GuideSection>

      <GuideSection title="6. Status Definitions">
        <StatusDefinitionList statuses={guide.statuses} />
      </GuideSection>

      <GuideSection title="7. Admin Workflow">
        <InfoCard>
          <GuideFlow steps={guide.adminWorkflow} />
        </InfoCard>
      </GuideSection>

      <GuideSection title="8. Related Modules">
        <RelatedModules
          modules={guide.relatedModules}
          onSelectTab={onSelectTab}
        />
      </GuideSection>
    </div>
  );
}
