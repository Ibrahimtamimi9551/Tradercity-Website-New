"use client";

import { createContext, useContext, type ReactNode } from "react";
import {
  SUBSCRIPTIONS_LIST_PATH,
  useSubscriptionsDirectory,
  type SubscriptionsDirectoryState,
} from "@/lib/members/hooks/useSubscriptionsDirectory";
import type { SubscriptionTicket } from "@/types/members/subscription";
import {
  approveSubscriptionTicket,
  openSubscriptionExplorer,
  rejectSubscriptionTicket,
} from "./subscription-actions";

type SubscriptionsDirectoryContextValue = SubscriptionsDirectoryState & {
  onOpenExplorer: (ticket: SubscriptionTicket) => void;
  onApprove: (ticket: SubscriptionTicket) => void;
  onReject: (ticket: SubscriptionTicket) => void;
};

const SubscriptionsDirectoryContext =
  createContext<SubscriptionsDirectoryContextValue | null>(null);

export function SubscriptionsDirectoryProvider({
  children,
}: {
  children: ReactNode;
}) {
  const directory = useSubscriptionsDirectory({
    listPathname: SUBSCRIPTIONS_LIST_PATH,
  });

  const value: SubscriptionsDirectoryContextValue = {
    ...directory,
    onOpenExplorer: openSubscriptionExplorer,
    onApprove: approveSubscriptionTicket,
    onReject: rejectSubscriptionTicket,
  };

  return (
    <SubscriptionsDirectoryContext.Provider value={value}>
      {children}
    </SubscriptionsDirectoryContext.Provider>
  );
}

export function useSubscriptionsDirectoryContext(): SubscriptionsDirectoryContextValue {
  const ctx = useContext(SubscriptionsDirectoryContext);
  if (!ctx) {
    throw new Error(
      "useSubscriptionsDirectoryContext must be used within SubscriptionsDirectoryProvider"
    );
  }
  return ctx;
}
