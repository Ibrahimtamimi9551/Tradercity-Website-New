"use client";

import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Users } from "lucide-react";
import {
  AdminDirectoryPanel,
  AdminMasterDetail,
} from "@/components/admin/directory";
import { LoadingState, PageTitle, Pagination } from "@/components/admin/ui";
import { isAdminDesktop } from "@/lib/admin/directory/breakpoints";
import { useMembersDirectory } from "@/lib/members/hooks/useMembersDirectory";
import type { DirectoryMember } from "@/types/members/directory";
import { DirectoryFiltersBar } from "./DirectoryFiltersBar";
import { DirectoryWidgets } from "./DirectoryWidgets";
import { MemberDirectoryDetails } from "./MemberDirectoryDetails";
import { MembersTable } from "./MembersTable";

function MembersDirectoryContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
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

  const memberFromUrl = searchParams.get("member") ?? searchParams.get("memberId");
  const [selectedId, setSelectedId] = useState<string | null>(memberFromUrl);

  useEffect(() => {
    setSelectedId(memberFromUrl);
  }, [memberFromUrl]);

  const selectedMember = useMemo(() => {
    if (selectedId) {
      const match = rows.find((m) => m.id === selectedId);
      if (match) return match;
    }
    return rows[0] ?? null;
  }, [rows, selectedId]);

  const writeMemberParam = useCallback(
    (id: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (id) params.set("member", id);
      else params.delete("member");
      params.delete("memberId");
      const query = params.toString();
      router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const onSelectMember = useCallback(
    (member: DirectoryMember) => {
      if (!isAdminDesktop()) {
        router.push(`/admin/members/${member.id}`);
        return;
      }
      setSelectedId(member.id);
      writeMemberParam(member.id);
    },
    [router, writeMemberParam]
  );

  const listStack = (
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

      <AdminDirectoryPanel tone="purple">
        <MembersTable
          rows={rows}
          selectedId={selectedMember?.id ?? null}
          onRowSelect={onSelectMember}
        />
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
      </AdminDirectoryPanel>
    </div>
  );

  return (
    <AdminMasterDetail
      layout="page"
      list={listStack}
      detail={
        <MemberDirectoryDetails
          member={selectedMember}
          className="h-full"
        />
      }
    />
  );
}

export function MembersDirectoryPage() {
  return (
    <Suspense fallback={<LoadingState label="Loading members directory…" />}>
      <MembersDirectoryContent />
    </Suspense>
  );
}
