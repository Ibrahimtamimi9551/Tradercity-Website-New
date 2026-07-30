"use client";

import { useEffect, useMemo, useState } from "react";
import type { PublicAnalystProfile } from "@/types/analysts/public-profile";
import {
  listPublishedPublicProfiles,
  subscribePublicProfileStore,
} from "@/lib/analysts/mock/public-profiles";

/**
 * Homepage consumer — Published + visible + verified + active only.
 * No extra filtering. TODO(NestJS): public read API with same contract.
 */
export function usePublishedPublicProfiles(): PublicAnalystProfile[] {
  const [revision, setRevision] = useState(0);

  useEffect(() => subscribePublicProfileStore(() => setRevision((n) => n + 1)), []);

  return useMemo(() => {
    void revision;
    return listPublishedPublicProfiles();
  }, [revision]);
}
