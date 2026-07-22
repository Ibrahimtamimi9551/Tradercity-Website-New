import { ModulePlaceholder } from "@/components/admin/layout/ModulePlaceholder";

const ANALYST_SECTIONS = "src/components/analysts/sections/";

export default function AnalystCommissionsPage() {
  return (
    <ModulePlaceholder
      title="Commissions"
      subtitle="Commission earnings, tiers, and payout requests."
      phase="Commissions"
      domainSectionsPath={ANALYST_SECTIONS}
    />
  );
}
