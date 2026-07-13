"use client";

import { Suspense } from "react";
import { useRouter } from "next/navigation";
import { Users } from "lucide-react";
import { LoadingState, PageTitle, Pagination } from "@/components/admin/ui";
import { cn } from "@/lib/admin/cn";
import { modulePanelSurface } from "@/lib/admin/module-surfaces";
import { useMembersDirectory } from "@/lib/members/hooks/useMembersDirectory";
import type { DirectoryMember } from "@/types/members/directory";
import { DirectoryFiltersBar } from "./DirectoryFiltersBar";
import { DirectoryWidgets } from "./DirectoryWidgets";
import { MembersTable } from "./MembersTable";

function MembersDirectoryContent() {
  const router = useRouter();
  const {
    stats,
    filters,
    setFilters,
    resetFilters,
    showAdvanced,
    setShowAdvanced,
    hasActiveFilters,
    rows,
    total,
    page,
    pageSize,
    setPage,
    setPageSize,
    setMembership,
    setSubscription,
    setDiscord,
    setReferral,
    setHealth,
  } = useMembersDirectory();

  const navigateToMember = (member: DirectoryMember) => {
    router.push(`/admin/members/${member.id}`);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <PageTitle
        title="Members"
        subtitle="View and manage all TraderCity members and their overall status."
        icon={Users}
      />

      <DirectoryWidgets stats={stats} />

      <DirectoryFiltersBar
        filters={filters}
        hasActiveFilters={hasActiveFilters}
        showAdvanced={showAdvanced}
        onShowAdvancedChange={setShowAdvanced}
        onSearchChange={(search) => setFilters({ search })}
        onMembershipChange={setMembership}
        onSubscriptionChange={setSubscription}
        onDiscordChange={setDiscord}
        onReferralChange={setReferral}
        onHealthChange={setHealth}
        onReset={resetFilters}
      />

      {/* Mobile: pull table edge-to-edge within shell padding for max column visibility */}
      <div
        className={cn(
          modulePanelSurface("purple", "space-y-3 sm:space-y-4"),
          "!p-1.5 sm:!p-5 max-sm:-mx-2"
        )}
      >
        <MembersTable rows={rows} onRowNavigate={navigateToMember} />
        <div className="px-1.5 sm:px-0">
          <Pagination
            page={page}
            pageSize={pageSize}
            total={total}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
            itemLabel="members"
            className="max-sm:gap-2 max-sm:text-xs"
          />
        </div>
      </div>
    </div>
  );
}

export function MembersDirectoryPage() {
  return (
    <Suspense fallback={<LoadingState label="Loading members directory…" />}>
      <MembersDirectoryContent />
    </Suspense>
  );
}
