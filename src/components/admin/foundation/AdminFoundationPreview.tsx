"use client";

import { Users, AlertTriangle, CreditCard } from "lucide-react";
import {
  DataTable,
  PageTitle,
  Pagination,
  SectionHeader,
  StatusBadge,
  SystemHealthBadge,
  WidgetCard,
} from "@/components/admin/ui";

type PreviewRow = {
  id: string;
  username: string;
  membership: string;
  subscription: string;
  health: "healthy" | "needs_attention" | "action_required";
};

const previewRows: PreviewRow[] = [
  {
    id: "1",
    username: "ibrahim_trader",
    membership: "VIP",
    subscription: "Active",
    health: "healthy",
  },
  {
    id: "2",
    username: "usman_hodler",
    membership: "Free",
    subscription: "Pending Verification",
    health: "needs_attention",
  },
  {
    id: "3",
    username: "sara_crypto",
    membership: "VIP",
    subscription: "Verification Required",
    health: "action_required",
  },
];

export function AdminFoundationPreview() {
  return (
    <div className="space-y-8">
      <PageTitle
        title="Admin Foundation"
        subtitle="Phase 0 shell preview — shared layout and UI primitives. Dashboard inbox ships in Phase 1."
      />

      <section>
        <SectionHeader title="Widget preview" description="Composable KPI cards for operational modules." />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <WidgetCard
            label="Total Members"
            value="1,248"
            hint="All registered"
            icon={Users}
            accent="purple"
            href="/admin/members"
          />
          <WidgetCard
            label="Pending Verification"
            value={24}
            hint="Requires review"
            icon={CreditCard}
            accent="amber"
            priority="critical"
            href="/admin/subscriptions?status=pending_verification"
          />
          <WidgetCard
            label="Action Required"
            value={18}
            hint="System health critical"
            icon={AlertTriangle}
            accent="rose"
            priority="critical"
            href="/admin/members?health=action_required"
          />
        </div>
      </section>

      <section>
        <SectionHeader title="Table preview" description="Shared DataTable with status and health badges." />
        <DataTable<PreviewRow>
          data={previewRows}
          getRowKey={(row) => row.id}
          columns={[
            {
              key: "username",
              header: "Discord Username",
              render: (row) => <span className="font-medium text-tc-purple">{row.username}</span>,
            },
            {
              key: "membership",
              header: "Membership",
              render: (row) => (
                <StatusBadge label={row.membership} tone={row.membership === "VIP" ? "vip" : "neutral"} />
              ),
            },
            {
              key: "subscription",
              header: "Subscription",
              render: (row) => {
                const tone =
                  row.subscription === "Active"
                    ? "success"
                    : row.subscription === "Pending Verification"
                      ? "warning"
                      : "danger";
                return <StatusBadge label={row.subscription} tone={tone} />;
              },
            },
            {
              key: "health",
              header: "System Health",
              render: (row) => <SystemHealthBadge state={row.health} />,
            },
          ]}
        />
        <Pagination page={1} pageSize={10} total={1248} className="mt-4" />
      </section>
    </div>
  );
}
