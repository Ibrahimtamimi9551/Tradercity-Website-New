"use client";

import { createContext, useContext, type ReactNode } from "react";
import {
  REFERRAL_REDEEM_LIST_PATH,
  useReferralRedeemRequestsDirectory,
  type ReferralRedeemRequestsDirectoryState,
} from "@/lib/members/hooks/useReferralRedeemRequestsDirectory";

const ReferralRedeemRequestsDirectoryContext =
  createContext<ReferralRedeemRequestsDirectoryState | null>(null);

export function ReferralRedeemRequestsDirectoryProvider({
  children,
}: {
  children: ReactNode;
}) {
  const directory = useReferralRedeemRequestsDirectory({
    listPathname: REFERRAL_REDEEM_LIST_PATH,
  });

  return (
    <ReferralRedeemRequestsDirectoryContext.Provider value={directory}>
      {children}
    </ReferralRedeemRequestsDirectoryContext.Provider>
  );
}

export function useReferralRedeemRequestsDirectoryContext(): ReferralRedeemRequestsDirectoryState {
  const ctx = useContext(ReferralRedeemRequestsDirectoryContext);
  if (!ctx) {
    throw new Error(
      "useReferralRedeemRequestsDirectoryContext must be used within ReferralRedeemRequestsDirectoryProvider"
    );
  }
  return ctx;
}
