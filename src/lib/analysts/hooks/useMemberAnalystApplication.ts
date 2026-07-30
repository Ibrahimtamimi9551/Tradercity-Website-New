"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { subscribeApplicationStore } from "@/lib/analysts/mock/applications";
import { getMemberApplicationSnapshot } from "@/lib/analysts/mock/member-application";
import type { MemberApplicationSnapshot } from "@/types/analysts/member-application";

/**
 * Member dashboard / tracking — resolves the current user's mock application.
 * Re-reads when the Admin mock store mutates or auth hydrates.
 */
export function useMemberAnalystApplication() {
  const { isReady, user } = useAuth();
  const [snapshot, setSnapshot] = useState<MemberApplicationSnapshot | null>(
    null
  );

  const refresh = useCallback(() => {
    if (!user) {
      setSnapshot(null);
      return;
    }
    setSnapshot(getMemberApplicationSnapshot(user.id));
  }, [user]);

  useEffect(() => {
    if (!isReady) return;
    refresh();
    return subscribeApplicationStore(refresh);
  }, [isReady, refresh]);

  return {
    isReady,
    hasApplication: snapshot !== null,
    application: snapshot,
    refresh,
  };
}
