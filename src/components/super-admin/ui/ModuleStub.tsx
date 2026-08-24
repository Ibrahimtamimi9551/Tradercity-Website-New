import { SUPER_ADMIN_PAGES, type SuperAdminRouteKey } from "@/constants/super-admin";
import { Breadcrumb } from "./Breadcrumb";
import { EmptyState } from "./EmptyState";
import { PageHeader } from "./PageHeader";
import { SectionCard } from "./SectionCard";
import { StatusBadge } from "./StatusBadge";

type ModuleStubProps = {
  pageKey: SuperAdminRouteKey;
};

/**
 * Standard Phase 0 placeholder page — title, description, coming-soon state.
 * No business logic, mocks, or calculations.
 */
export function ModuleStub({ pageKey }: ModuleStubProps) {
  const page = SUPER_ADMIN_PAGES[pageKey];

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumb items={page.breadcrumb} />
        <PageHeader
          title={page.title}
          description={page.description}
          actions={<StatusBadge status="pending" label="Foundation" />}
        />
      </div>

      <SectionCard
        title="Module frame"
        description="This surface is reserved for a future phase. Structure only — no data connected."
      >
        <EmptyState
          title="Coming soon"
          description={`${page.title} will plug into the Company Control Centre architecture in a later phase. Phase 0 establishes routing, layout, and shared primitives only.`}
        />
      </SectionCard>
    </div>
  );
}
