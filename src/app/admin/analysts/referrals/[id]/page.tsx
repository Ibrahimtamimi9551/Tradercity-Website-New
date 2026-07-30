import { ReferralDetailView } from "@/components/analysts/sections/referrals";

type AnalystReferralDetailRouteProps = {
  params: Promise<{ id: string }>;
};

/**
 * Mobile / narrow viewport Referral Profile.
 * Desktop keeps the inspector on `/admin/analysts/referrals`.
 */
export default async function AnalystReferralDetailRoute({
  params,
}: AnalystReferralDetailRouteProps) {
  const { id } = await params;
  return <ReferralDetailView referralId={id} />;
}
