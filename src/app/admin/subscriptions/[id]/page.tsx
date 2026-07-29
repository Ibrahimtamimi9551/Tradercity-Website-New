import { SubscriptionDetailRouter } from "@/components/members/sections/subscriptions/SubscriptionDetailRouter";

type SubscriptionDetailRouteProps = {
  params: Promise<{ id: string }>;
};

/**
 * Mobile / narrow viewport details for Crypto or Manual payment records.
 * Desktop keeps the side panel on `/admin/subscriptions`.
 */
export default async function SubscriptionDetailRoute({
  params,
}: SubscriptionDetailRouteProps) {
  const { id } = await params;
  return <SubscriptionDetailRouter id={id} />;
}
