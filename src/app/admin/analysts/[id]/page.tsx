import { AnalystControlCenterView } from "@/components/analysts/sections/control-center";

type AnalystControlCenterRouteProps = {
  params: Promise<{ id: string }>;
};

/**
 * Wave A — Analyst Control Center.
 * Operational headquarters for one partnership (mock-first).
 */
export default async function AnalystControlCenterRoute({
  params,
}: AnalystControlCenterRouteProps) {
  const { id } = await params;
  return <AnalystControlCenterView analystId={id} />;
}
