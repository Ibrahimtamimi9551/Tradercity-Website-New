import { InfoCard } from "@/components/admin/ui/InfoCard";
import { GuideSection } from "./GuideSection";
import type { GlossaryTerm } from "@/types/admin/guide";

type GlossaryListProps = {
  terms: GlossaryTerm[];
};

export function GlossaryList({ terms }: GlossaryListProps) {
  const sorted = [...terms].sort((a, b) => a.term.localeCompare(b.term));

  return (
    <GuideSection
      title="Glossary"
      description="Centralized definitions for TraderCity Admin operational terminology."
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {sorted.map((entry) => (
          <InfoCard key={entry.term} title={entry.term}>
            <p className="text-sm text-tc-muted">{entry.definition}</p>
          </InfoCard>
        ))}
      </div>
    </GuideSection>
  );
}
