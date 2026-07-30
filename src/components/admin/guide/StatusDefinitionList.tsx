import { InfoCard } from "@/components/admin/ui/InfoCard";
import type { GuideStatusDefinition } from "@/types/admin/guide";

type StatusDefinitionListProps = {
  statuses: GuideStatusDefinition[];
};

export function StatusDefinitionList({ statuses }: StatusDefinitionListProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {statuses.map((status) => (
        <InfoCard key={`${status.label}-${status.code ?? ""}`}>
          <div className="space-y-2">
            <div>
              <p className="text-sm font-medium text-white">{status.label}</p>
              {status.code ? (
                <p className="mt-0.5 font-mono text-[11px] text-tc-muted/70">
                  {status.code}
                </p>
              ) : null}
            </div>
            <div className="border-t border-white/10 pt-2">
              <p className="text-sm text-tc-muted">{status.meaning}</p>
              {status.adminAction ? (
                <p className="mt-2 text-xs text-violet-200/90">
                  Admin: {status.adminAction}
                </p>
              ) : null}
            </div>
          </div>
        </InfoCard>
      ))}
    </div>
  );
}
