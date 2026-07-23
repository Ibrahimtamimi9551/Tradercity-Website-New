"use client";

import { useCallback, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { EmptyState, LoadingState } from "@/components/admin/ui";
import {
  parseControlCenterTab,
  useAnalystControlCenter,
} from "@/lib/analysts/hooks/useAnalystControlCenter";
import type {
  AnalystControlCenterTabId,
  SuspendPartnershipDraft,
} from "@/types/analysts/control-center";
import { ControlCenterAdministration } from "./ControlCenterAdministration";
import {
  ControlCenterBreadcrumb,
  ControlCenterHeader,
} from "./ControlCenterHeader";
import { ControlCenterNotes } from "./ControlCenterNotes";
import { ControlCenterOverview } from "./ControlCenterOverview";
import {
  ControlCenterCommissionsPlaceholder,
  ControlCenterPerformancePlaceholder,
  ControlCenterTimelinePlaceholder,
} from "./ControlCenterPlaceholders";
import { ControlCenterDiscordPanel } from "./ControlCenterDiscordPanel";
import { ControlCenterTabs } from "./ControlCenterTabs";
import { SuspendPartnershipModal } from "./SuspendPartnershipModal";

type AnalystControlCenterPageContentProps = {
  analystId: string;
};

export function AnalystControlCenterPageContent({
  analystId,
}: AnalystControlCenterPageContentProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTab = parseControlCenterTab(searchParams.get("tab"));
  const { profile, isLoading, suspendPartnership, addNote } =
    useAnalystControlCenter(analystId);
  const [suspendOpen, setSuspendOpen] = useState(false);

  const setTab = useCallback(
    (tab: AnalystControlCenterTabId) => {
      const next = new URLSearchParams(searchParams.toString());
      if (tab === "overview") next.delete("tab");
      else next.set("tab", tab);
      const qs = next.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const openAdministration = useCallback(() => setTab("administration"), [setTab]);

  const openSuspend = useCallback(() => {
    setTab("administration");
    setSuspendOpen(true);
  }, [setTab]);

  const onConfirmSuspend = useCallback(
    (draft: SuspendPartnershipDraft) => {
      suspendPartnership(draft);
      setSuspendOpen(false);
    },
    [suspendPartnership]
  );

  if (isLoading) {
    return <LoadingState label="Loading analyst Control Center…" />;
  }

  if (!profile) {
    return (
      <div className="space-y-4">
        <ControlCenterBreadcrumb />
        <EmptyState
          title="Analyst not found"
          description={`No Control Center data for analyst “${analystId}”. Return to the directory and try another partner.`}
          action={
            <a
              href="/admin/analysts/directory"
              className="text-sm font-medium text-violet-300 hover:text-violet-200"
            >
              Back to Directory →
            </a>
          }
        />
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <ControlCenterBreadcrumb displayName={profile.displayName} />
      <ControlCenterHeader
        profile={profile}
        onOpenAdministration={openAdministration}
        onOpenSuspend={openSuspend}
      />
      <ControlCenterTabs active={activeTab} onChange={setTab} />

      <div role="tabpanel" aria-labelledby={`control-center-tab-${activeTab}`}>
        {activeTab === "overview" ? <ControlCenterOverview profile={profile} /> : null}
        {activeTab === "timeline" ? <ControlCenterTimelinePlaceholder /> : null}
        {activeTab === "administration" ? (
          <ControlCenterAdministration profile={profile} onSuspend={openSuspend} />
        ) : null}
        {activeTab === "performance" ? <ControlCenterPerformancePlaceholder /> : null}
        {activeTab === "discord" ? (
          <ControlCenterDiscordPanel profile={profile} />
        ) : null}
        {activeTab === "commissions" ? <ControlCenterCommissionsPlaceholder /> : null}
        {activeTab === "notes" ? (
          <ControlCenterNotes profile={profile} onAddNote={addNote} />
        ) : null}
      </div>

      <p className="border-t border-white/10 pt-4 text-center text-xs leading-relaxed text-tc-muted sm:text-sm">
        Analyst Control Center is the operational headquarters for this partnership. Business
        actions run from Administration — Directory Inspector remains quick preview only.
      </p>

      <SuspendPartnershipModal
        analystName={profile.displayName}
        open={suspendOpen}
        onClose={() => setSuspendOpen(false)}
        onConfirm={onConfirmSuspend}
      />
    </div>
  );
}
