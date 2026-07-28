import { SubscriptionMemberDetailPage } from "@/components/members/sections/subscriptions";

type SubscriptionDetailRouteProps = {
  params: Promise<{ id: string }>;
};

/**
 * Mobile / narrow viewport details for a subscription payment ticket.
 * Desktop keeps the side panel on `/admin/subscriptions`.
 */
export default async function SubscriptionDetailRoute({
  params,
}: SubscriptionDetailRouteProps) {
  const { id } = await params;
  return <SubscriptionMemberDetailPage ticketId={id} />;
}
