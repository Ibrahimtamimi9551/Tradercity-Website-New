import { Suspense, type ReactNode } from "react";
import { LoadingState } from "@/components/admin/ui";
import { DiscordDirectoryProvider } from "@/components/members/sections/discord/DiscordDirectoryProvider";

/**
 * Keeps `useDiscordDirectory` mounted across list ↔ detail so filters,
 * pagination, and selection survive mobile full-page navigation.
 */
export default function DiscordLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<LoadingState label="Loading Discord synchronization…" />}>
      <DiscordDirectoryProvider>{children}</DiscordDirectoryProvider>
    </Suspense>
  );
}
