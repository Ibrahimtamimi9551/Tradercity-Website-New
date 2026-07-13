"use client";

import { useMemo } from "react";
import { getMemberProfile } from "@/lib/members/mock/profile-members";
import type { MemberProfile, ProfileTabId } from "@/types/members/profile";

const VALID_TABS: ProfileTabId[] = [
  "overview",
  "subscription",
  "discord",
  "referral",
  "notes",
  "activity",
];

export function parseProfileTab(value: string | null): ProfileTabId {
  if (value && (VALID_TABS as string[]).includes(value)) {
    return value as ProfileTabId;
  }
  return "overview";
}

/**
 * Phase 3 profile aggregate — mock until NestJS GET /admin/members/:id.
 */
export function useMemberProfile(memberId: string): {
  profile: MemberProfile | undefined;
  isLoading: boolean;
} {
  const profile = useMemo(() => getMemberProfile(memberId), [memberId]);

  return {
    profile,
    isLoading: false,
  };
}

export { VALID_TABS };
