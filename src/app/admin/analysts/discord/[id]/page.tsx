import { DiscordDetailView } from "@/components/analysts/sections/discord";

type AnalystDiscordDetailRouteProps = {
  params: Promise<{ id: string }>;
};

/**
 * Mobile / narrow viewport Discord details.
 * Desktop keeps the inspector on `/admin/analysts/discord`.
 */
export default async function AnalystDiscordDetailRoute({
  params,
}: AnalystDiscordDetailRouteProps) {
  const { id } = await params;
  return <DiscordDetailView discordId={id} />;
}
