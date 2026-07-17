import { DiscordMemberDetailPage } from "@/components/members/sections/discord";

type DiscordDetailRouteProps = {
  params: Promise<{ id: string }>;
};

/**
 * Mobile / narrow viewport details for a Discord sync record.
 * Desktop keeps the side panel on `/admin/discord`.
 */
export default async function DiscordDetailRoute({ params }: DiscordDetailRouteProps) {
  const { id } = await params;
  return <DiscordMemberDetailPage discordId={id} />;
}
