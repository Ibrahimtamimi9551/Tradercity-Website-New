import { ReferralMemberDetailPage } from "@/components/members/sections/referrals";

type ReferralDetailRouteProps = {
  params: Promise<{ id: string }>;
};

/**
 * Mobile / narrow viewport details for a referral member.
 * Desktop keeps the full-height side panel on `/admin/referrals`.
 */
export default async function ReferralDetailRoute({
  params,
}: ReferralDetailRouteProps) {
  const { id } = await params;
  return <ReferralMemberDetailPage referralId={id} />;
}
