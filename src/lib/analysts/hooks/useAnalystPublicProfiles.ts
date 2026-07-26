"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { PublicAnalystProfile, PublicProfileStatus } from "@/types/analysts/public-profile";
import {
  setPublicProfileStatusRecord,
  unpublishPublicProfileRecord,
  updatePublicProfileRecord,
  type PublicProfileEditablePatch,
} from "@/lib/analysts/mock/public-profile-mutations";
import {
  getMockPublicProfileByApplicationId,
  listMockPublicProfiles,
  subscribePublicProfileStore,
} from "@/lib/analysts/mock/public-profiles";

/**
 * Public Profile Presentation Manager — list + selected profile + soft publish actions.
 * TODO(NestJS): replace mock store with authenticated public-profiles API.
 */
export function useAnalystPublicProfiles(selectedApplicationId: string | null) {
  const [revision, setRevision] = useState(0);
  const [draftPatch, setDraftPatch] = useState<PublicProfileEditablePatch>({});

  useEffect(() => subscribePublicProfileStore(() => setRevision((n) => n + 1)), []);

  const profiles = useMemo(() => {
    void revision;
    return listMockPublicProfiles().sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return a.displayOrder - b.displayOrder;
    });
  }, [revision]);

  const selectedProfile = useMemo(() => {
    void revision;
    if (!selectedApplicationId) return profiles[0] ?? null;
    return (
      getMockPublicProfileByApplicationId(selectedApplicationId) ??
      profiles[0] ??
      null
    );
  }, [profiles, revision, selectedApplicationId]);

  useEffect(() => {
    setDraftPatch({});
  }, [selectedProfile?.id]);

  const workingProfile = useMemo((): PublicAnalystProfile | null => {
    if (!selectedProfile) return null;
    return {
      ...selectedProfile,
      ...draftPatch,
      statistics: draftPatch.statistics
        ? draftPatch.statistics.map((s) => ({ ...s }))
        : selectedProfile.statistics.map((s) => ({ ...s })),
      researchFocus: draftPatch.researchFocus
        ? [...draftPatch.researchFocus]
        : [...selectedProfile.researchFocus],
      markets: draftPatch.markets
        ? [...draftPatch.markets]
        : [...selectedProfile.markets],
      links: draftPatch.links
        ? { ...selectedProfile.links, ...draftPatch.links }
        : { ...selectedProfile.links },
    };
  }, [draftPatch, selectedProfile]);

  const patchDraft = useCallback((patch: PublicProfileEditablePatch) => {
    setDraftPatch((prev) => ({
      ...prev,
      ...patch,
      links: patch.links ? { ...prev.links, ...patch.links } : prev.links,
    }));
  }, []);

  const saveDraft = useCallback(() => {
    if (!selectedProfile) return null;
    const next = updatePublicProfileRecord(selectedProfile.id, draftPatch);
    setDraftPatch({});
    return next;
  }, [draftPatch, selectedProfile]);

  const setStatus = useCallback(
    (status: PublicProfileStatus) => {
      if (!selectedProfile) return null;
      if (Object.keys(draftPatch).length > 0) {
        updatePublicProfileRecord(selectedProfile.id, draftPatch);
        setDraftPatch({});
      }
      return setPublicProfileStatusRecord(selectedProfile.id, status);
    },
    [draftPatch, selectedProfile]
  );

  const unpublish = useCallback(() => {
    if (!selectedProfile) return null;
    if (Object.keys(draftPatch).length > 0) {
      updatePublicProfileRecord(selectedProfile.id, draftPatch);
      setDraftPatch({});
    }
    return unpublishPublicProfileRecord(selectedProfile.id);
  }, [draftPatch, selectedProfile]);

  const hasUnsavedChanges = Object.keys(draftPatch).length > 0;

  return {
    profiles,
    selectedProfile,
    workingProfile,
    patchDraft,
    saveDraft,
    setStatus,
    unpublish,
    hasUnsavedChanges,
  };
}
