"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { EmptyState } from "@/components/admin/ui";
import type { DiscordDetailTab } from "@/types/members/discord";
import { useDiscordDirectoryContext } from "./DiscordDirectoryProvider";
import { DiscordDetails } from "./DiscordDetails";

type DiscordMemberDetailPageProps = {
  discordId: string;
};

function DiscordMemberDetailContent({ discordId }: DiscordMemberDetailPageProps) {
  const [detailTab, setDetailTab] = useState<DiscordDetailTab>("overview");
  const {
    findMemberById,
    getListHref,
    onManualSync,
    onSendInvite,
  } = useDiscordDirectoryContext();

  // Route param is the source of selection on detail; hook syncs selectedId from path.
  const member = findMemberById(discordId);
  const listHref = getListHref({ includeMember: false });

  if (!member) {
    return (
      <div className="space-y-4">
        <BackLink href={listHref} />
        <EmptyState
          title="Discord member not found"
          description="This synchronization record may have been removed or the link is invalid."
          action={
            <Link
              href={listHref}
              className="text-sm font-medium text-violet-300 hover:text-violet-200"
            >
              Back to Discord
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <BackLink href={listHref} />
      <DiscordDetails
        member={member}
        activeTab={detailTab}
        onTabChange={setDetailTab}
        onSyncNow={onManualSync}
        onSendInvite={onSendInvite}
        fullPage
      />
    </div>
  );
}

function BackLink({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="admin-muted inline-flex items-center gap-1.5 text-sm transition-colors hover:text-white"
    >
      <ArrowLeft className="h-4 w-4" aria-hidden />
      Back to Discord
    </Link>
  );
}

export function DiscordMemberDetailPage({ discordId }: DiscordMemberDetailPageProps) {
  return <DiscordMemberDetailContent discordId={discordId} />;
}
