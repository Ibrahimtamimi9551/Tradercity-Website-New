import { ModulePlaceholder } from "@/components/admin/layout/ModulePlaceholder";

const ANALYST_SECTIONS = "src/components/analysts/sections/";

export default function AnalystReferralsPage() {
  return (
    <ModulePlaceholder
      title="Analyst Referrals"
      subtitle="Analyst referral attribution and conversion performance."
      phase="Analyst Referrals"
      domainSectionsPath={ANALYST_SECTIONS}
    />
  );
}
