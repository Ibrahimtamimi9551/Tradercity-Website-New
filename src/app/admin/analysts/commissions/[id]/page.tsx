import { CommissionDetailView } from "@/components/analysts/sections/commissions";

type AnalystCommissionDetailRouteProps = {
  params: Promise<{ id: string }>;
};

/**
 * Mobile / narrow viewport Commission Profile.
 * Desktop keeps the inspector on `/admin/analysts/commissions`.
 */
export default async function AnalystCommissionDetailRoute({
  params,
}: AnalystCommissionDetailRouteProps) {
  const { id } = await params;
  return <CommissionDetailView commissionId={id} />;
}
