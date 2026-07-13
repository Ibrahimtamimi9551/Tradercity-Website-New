"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { EmptyState, LoadingState } from "@/components/admin/ui";
import {
  parseProfileTab,
  useMemberProfile,
} from "@/lib/members/hooks/useMemberProfile";
import type { ProfileTabId } from "@/types/members/profile";
import { ActivityTimeline } from "./ActivityTimeline";
import { DiscordCard } from "./DiscordCard";
import { MembershipCard } from "./MembershipCard";
import { NotesCard } from "./NotesCard";
import { ProfileBreadcrumb, ProfileHeader } from "./ProfileHeader";
import { ProfileTabs } from "./ProfileTabs";
import { ReferralCard } from "./ReferralCard";
import { SubscriptionCard } from "./SubscriptionCard";

type MemberProfilePageContentProps = {
  memberId: string;
};

export function MemberProfilePageContent({ memberId }: MemberProfilePageContentProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTab = parseProfileTab(searchParams.get("tab"));
  const { profile, isLoading } = useMemberProfile(memberId);

  const setTab = useCallback(
    (tab: ProfileTabId) => {
      const next = new URLSearchParams(searchParams.toString());
      if (tab === "overview") {
        next.delete("tab");
      } else {
        next.set("tab", tab);
      }
      const qs = next.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  if (isLoading) {
    return <LoadingState label="Loading member profile…" />;
  }

  if (!profile) {
    return (
      <div className="space-y-4">
        <ProfileBreadcrumb />
        <EmptyState
          title="Member not found"
          description={`No Control Center data for member “${memberId}”. Return to the directory and try another member.`}
          action={
            <a
              href="/admin/members"
              className="text-sm font-medium text-violet-300 hover:text-violet-200"
            >
              Back to Members →
            </a>
          }
        />
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <ProfileBreadcrumb />
      <ProfileHeader profile={profile} />
      <ProfileTabs active={activeTab} onChange={setTab} />

      <div role="tabpanel" aria-labelledby={`profile-tab-${activeTab}`}>
        {activeTab === "overview" ? (
          <OverviewGrid profile={profile} onSetTab={setTab} />
        ) : null}

        {activeTab === "subscription" ? (
          <div className="mx-auto max-w-xl">
            <SubscriptionCard profile={profile} />
          </div>
        ) : null}

        {activeTab === "discord" ? (
          <div className="mx-auto max-w-xl">
            <DiscordCard profile={profile} />
            <p className="mt-3 text-center text-xs text-tc-muted">
              Extended Discord management ships in Phase 5 — this tab reflects current sync state.
            </p>
          </div>
        ) : null}

        {activeTab === "referral" ? (
          <div className="mx-auto max-w-xl">
            <ReferralCard profile={profile} />
            <p className="mt-3 text-center text-xs text-tc-muted">
              Extended referral management ships in Phase 6 — this tab reflects current progress.
            </p>
          </div>
        ) : null}

        {activeTab === "notes" ? <NotesCard profile={profile} expanded /> : null}

        {activeTab === "activity" ? (
          <ActivityTimeline profile={profile} expanded />
        ) : null}
      </div>

      <p className="border-t border-white/10 pt-4 text-center text-xs leading-relaxed text-tc-muted sm:text-sm">
        This Control Center aggregates the latest state from Membership, Subscriptions, Discord, and
        Referrals. Changes are made in those management modules — not on this page.
      </p>
    </div>
  );
}

function OverviewGrid({
  profile,
  onSetTab,
}: {
  profile: NonNullable<ReturnType<typeof useMemberProfile>["profile"]>;
  onSetTab: (tab: ProfileTabId) => void;
}) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="grid gap-4 sm:gap-5 xl:grid-cols-4">
        <MembershipCard profile={profile} onViewActivity={() => onSetTab("activity")} />
        <SubscriptionCard profile={profile} />
        <DiscordCard profile={profile} />
        <ReferralCard profile={profile} />
      </div>

      <div className="grid gap-4 sm:gap-5 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <NotesCard profile={profile} />
        </div>
        <div className="lg:col-span-3">
          <ActivityTimeline
            profile={profile}
            onViewAll={() => onSetTab("activity")}
          />
        </div>
      </div>
    </div>
  );
}

export function MemberProfileEmpty() {
  return (
    <EmptyState
      title="Select a member"
      description="Open a member from the directory to view their Control Center."
    />
  );
}
