"use client";

import { createContext, useContext, type ReactNode } from "react";
import {
  REFERRALS_LIST_PATH,
  useReferralsDirectory,
  type ReferralsDirectoryState,
} from "@/lib/members/hooks/useReferralsDirectory";
import type { ReferralMember } from "@/types/members/referral";

type ReferralsDirectoryContextValue = ReferralsDirectoryState & {
  onCopyReferralLink: (member: ReferralMember) => void;
  onCopyReferralCode: (member: ReferralMember) => void;
};

const ReferralsDirectoryContext =
  createContext<ReferralsDirectoryContextValue | null>(null);

function copyText(value: string, label: string) {
  void navigator.clipboard?.writeText(value).then(
    () => window.alert(`${label} copied.`),
    () => window.alert(`Could not copy ${label.toLowerCase()}.`)
  );
}

export function ReferralsDirectoryProvider({ children }: { children: ReactNode }) {
  const directory = useReferralsDirectory({ listPathname: REFERRALS_LIST_PATH });

  const value: ReferralsDirectoryContextValue = {
    ...directory,
    onCopyReferralLink: (member) => copyText(member.referralLink, "Referral link"),
    onCopyReferralCode: (member) => copyText(member.referralCode, "Referral code"),
  };

  return (
    <ReferralsDirectoryContext.Provider value={value}>
      {children}
    </ReferralsDirectoryContext.Provider>
  );
}

export function useReferralsDirectoryContext(): ReferralsDirectoryContextValue {
  const ctx = useContext(ReferralsDirectoryContext);
  if (!ctx) {
    throw new Error(
      "useReferralsDirectoryContext must be used within ReferralsDirectoryProvider"
    );
  }
  return ctx;
}
