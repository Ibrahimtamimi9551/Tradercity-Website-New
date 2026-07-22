import { ModulePlaceholder } from "@/components/admin/layout/ModulePlaceholder";

const ANALYST_SECTIONS = "src/components/analysts/sections/";

export default function AnalystApplicationsPage() {
  return (
    <ModulePlaceholder
      title="Applications"
      subtitle="Review analyst partnership applications and internal scorecards."
      phase="Applications Queue"
      domainSectionsPath={ANALYST_SECTIONS}
    />
  );
}
