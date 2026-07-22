import { ModulePlaceholder } from "@/components/admin/layout/ModulePlaceholder";

const ANALYST_SECTIONS = "src/components/analysts/sections/";

export default function AnalystPartnershipsPage() {
  return (
    <ModulePlaceholder
      title="Partnerships"
      subtitle="Partnership discussions, agreements, and onboarding status."
      phase="Partnerships"
      domainSectionsPath={ANALYST_SECTIONS}
    />
  );
}
