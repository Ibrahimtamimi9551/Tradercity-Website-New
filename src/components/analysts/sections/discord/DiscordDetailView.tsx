"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { EmptyState, LoadingState, PageTitle } from "@/components/admin/ui";
import { getMockAnalystDiscord } from "@/lib/analysts/mock/discord";
import { applyAnalystDiscordOperation } from "@/lib/analysts/mock/discord-mutations";
import { useCallback, useMemo, useState } from "react";
import type { AnalystDiscordOperation } from "@/types/analysts/discord";
import { DiscordDetails } from "./DiscordDetails";

type DiscordDetailViewProps = {
  discordId: string;
};

/**
 * Mobile / narrow Discord detail route.
 * Desktop keeps the Directory inspector on `/admin/analysts/discord`.
 */
export function DiscordDetailView({ discordId }: DiscordDetailViewProps) {
  const [tick, setTick] = useState(0);
  const record = useMemo(() => {
    void tick;
    return getMockAnalystDiscord(discordId) ?? null;
  }, [discordId, tick]);

  const onOperation = useCallback(
    (_record: NonNullable<typeof record>, operation: AnalystDiscordOperation) => {
      applyAnalystDiscordOperation(discordId, operation);
      setTick((t) => t + 1);
    },
    [discordId]
  );

  if (!record && tick === 0) {
    return <LoadingState label="Loading Discord record…" />;
  }

  if (!record) {
    return (
      <div className="space-y-4">
        <Link
          href="/admin/analysts/discord?view=directory"
          className="inline-flex items-center gap-1.5 text-sm text-violet-300 hover:text-violet-200"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to Discord
        </Link>
        <EmptyState
          title="Discord record not found"
          description={`No Analyst Discord record for “${discordId}”.`}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <Link
          href="/admin/analysts/discord?view=directory"
          className="inline-flex items-center gap-1.5 text-sm text-violet-300 hover:text-violet-200"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to Discord
        </Link>
      </div>
      <PageTitle
        title={record.displayName}
        subtitle="Discord connection details"
      />
      <DiscordDetails record={record} onOperation={onOperation} fullPage />
    </div>
  );
}
