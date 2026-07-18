"use client";

import { createContext, useContext, type ReactNode } from "react";
import {
  DISCORD_LIST_PATH,
  useDiscordDirectory,
  type DiscordDirectoryState,
} from "@/lib/members/hooks/useDiscordDirectory";
import type { DiscordMember } from "@/types/members/discord";
import {
  queueDiscordManualSync,
  sendDiscordInvite,
} from "./discord-actions";

type DiscordDirectoryContextValue = DiscordDirectoryState & {
  onManualSync: (member: DiscordMember) => void;
  onSendInvite: (member: DiscordMember) => void;
};

const DiscordDirectoryContext = createContext<DiscordDirectoryContextValue | null>(
  null
);

export function DiscordDirectoryProvider({ children }: { children: ReactNode }) {
  const directory = useDiscordDirectory({ listPathname: DISCORD_LIST_PATH });

  const value: DiscordDirectoryContextValue = {
    ...directory,
    onManualSync: queueDiscordManualSync,
    onSendInvite: sendDiscordInvite,
  };

  return (
    <DiscordDirectoryContext.Provider value={value}>
      {children}
    </DiscordDirectoryContext.Provider>
  );
}

export function useDiscordDirectoryContext(): DiscordDirectoryContextValue {
  const ctx = useContext(DiscordDirectoryContext);
  if (!ctx) {
    throw new Error(
      "useDiscordDirectoryContext must be used within DiscordDirectoryProvider"
    );
  }
  return ctx;
}
