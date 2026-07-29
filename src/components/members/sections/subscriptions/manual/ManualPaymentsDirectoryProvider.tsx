"use client";

import { createContext, useContext, type ReactNode } from "react";
import {
  MANUAL_PAYMENTS_LIST_PATH,
  useManualPaymentsDirectory,
  type ManualPaymentsDirectoryState,
} from "@/lib/members/hooks/useManualPaymentsDirectory";

const ManualPaymentsDirectoryContext =
  createContext<ManualPaymentsDirectoryState | null>(null);

export function ManualPaymentsDirectoryProvider({
  children,
}: {
  children: ReactNode;
}) {
  const directory = useManualPaymentsDirectory({
    listPathname: MANUAL_PAYMENTS_LIST_PATH,
  });

  return (
    <ManualPaymentsDirectoryContext.Provider value={directory}>
      {children}
    </ManualPaymentsDirectoryContext.Provider>
  );
}

export function useManualPaymentsDirectoryContext(): ManualPaymentsDirectoryState {
  const ctx = useContext(ManualPaymentsDirectoryContext);
  if (!ctx) {
    throw new Error(
      "useManualPaymentsDirectoryContext must be used within ManualPaymentsDirectoryProvider"
    );
  }
  return ctx;
}
