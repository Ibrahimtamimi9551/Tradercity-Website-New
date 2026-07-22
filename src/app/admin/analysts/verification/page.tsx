import { ModulePlaceholder } from "@/components/admin/layout/ModulePlaceholder";

const ANALYST_SECTIONS = "src/components/analysts/sections/";

export default function AnalystVerificationPage() {
  return (
    <ModulePlaceholder
      title="Verification"
      subtitle="Confirm analyst authenticity and partnership intent."
      phase="Verification Queue"
      domainSectionsPath={ANALYST_SECTIONS}
    />
  );
}
