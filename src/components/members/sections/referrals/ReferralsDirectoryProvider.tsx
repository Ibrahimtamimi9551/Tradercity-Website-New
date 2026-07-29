"use client";

import { createContext, useContext, type ReactNode } from "react";
import {
  REFERRALS_LIST_PATH,
  useReferralsDirectory,
  type ReferralsDirectoryState,
} from "@/lib/members/hooks/useReferralsDirectory";

type ReferralsDirectoryContextValue = ReferralsDirectoryState;

const ReferralsDirectoryContext =
  createContext<ReferralsDirectoryContextValue | null>(null);

export function ReferralsDirectoryProvider({ children }: { children: ReactNode }) {
  const directory = useReferralsDirectory({ listPathname: REFERRALS_LIST_PATH });

  return (
    <ReferralsDirectoryContext.Provider value={directory}>
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
