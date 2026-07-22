"use client";

import { useCallback, useMemo, useState } from "react";
import {
  getAnalystControlCenter,
  mockAddAnalystNote,
  mockSuspendAnalyst,
} from "@/lib/analysts/mock/control-center";
import type {
  AnalystControlCenter,
  AnalystControlCenterTabId,
  SuspendPartnershipDraft,
} from "@/types/analysts/control-center";

const VALID_TABS: AnalystControlCenterTabId[] = [
  "overview",
  "timeline",
  "administration",
  "performance",
  "discord",
  "commissions",
  "notes",
];

export function parseControlCenterTab(
  value: string | null
): AnalystControlCenterTabId {
  if (value && (VALID_TABS as string[]).includes(value)) {
    return value as AnalystControlCenterTabId;
  }
  return "overview";
}

/**
 * Analyst Control Center aggregate — mock until NestJS GET /admin/analysts/:id.
 * TODO(NestJS): replace mock reads/mutations with authenticated Admin APIs.
 */
export function useAnalystControlCenter(analystId: string): {
  profile: AnalystControlCenter | undefined;
  isLoading: boolean;
  suspendPartnership: (draft: SuspendPartnershipDraft) => void;
  addNote: (body: string) => void;
  revision: number;
} {
  const [revision, setRevision] = useState(0);

  const profile = useMemo(() => {
    void revision;
    return getAnalystControlCenter(analystId);
  }, [analystId, revision]);

  const suspendPartnership = useCallback(
    (draft: SuspendPartnershipDraft) => {
      mockSuspendAnalyst(analystId, draft.notes);
      setRevision((n) => n + 1);
    },
    [analystId]
  );

  const addNote = useCallback(
    (body: string) => {
      mockAddAnalystNote(analystId, body);
      setRevision((n) => n + 1);
    },
    [analystId]
  );

  return {
    profile,
    isLoading: false,
    suspendPartnership,
    addNote,
    revision,
  };
}

export { VALID_TABS };
