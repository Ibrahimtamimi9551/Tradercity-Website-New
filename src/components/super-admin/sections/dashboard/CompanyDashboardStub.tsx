import {
  Breadcrumb,
  EmptyState,
  PageHeader,
  SectionCard,
  StatCard,
  StatusBadge,
} from "@/components/super-admin/ui";
import { SUPER_ADMIN_PAGES } from "@/constants/super-admin";

/**
 * Company Control Centre home — structural frame only.
 * Stat cards show em dashes; no financial calculations.
 */
export function CompanyDashboardStub() {
  const page = SUPER_ADMIN_PAGES.dashboard;

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumb items={page.breadcrumb} />
        <PageHeader
          title={page.title}
          description={page.description}
          actions={<StatusBadge status="pending" label="Phase 0" />}
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Revenue" value="—" hint="Financial Command Centre" />
        <StatCard label="Members" value="—" hint="Member revenue module" />
        <StatCard label="Analysts" value="—" hint="Analyst revenue module" />
        <StatCard label="Wallets" value="—" hint="Wallet treasury module" />
      </div>

      <SectionCard
        title="Company Control Centre"
        description="Master operating console for TraderCity. Finance is one major domain inside this shell."
      >
        <EmptyState
          title="Foundation ready"
          description="Navigation, layout, and shared primitives are in place. Connect Financial Command Centre modules in later phases — no business logic in Phase 0."
        />
      </SectionCard>
    </div>
  );
}
