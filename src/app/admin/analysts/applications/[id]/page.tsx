import { ApplicationDetailView } from "@/components/analysts/sections/applications";

type ApplicationDetailRouteProps = {
  params: Promise<{ id: string }>;
};

/**
 * Wave B — mobile / deep Application Viewer.
 * Desktop Review Queue uses the wider side panel instead.
 */
export default async function AnalystApplicationDetailRoute({
  params,
}: ApplicationDetailRouteProps) {
  const { id } = await params;
  return <ApplicationDetailView applicationId={id} />;
}
