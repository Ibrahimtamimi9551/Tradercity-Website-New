/** DEV MOCK ONLY — clear local mock session. Remove when real auth ships. */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, LogOut } from "lucide-react";
import { useAuth } from "@/lib/auth";

interface MockSignOutButtonProps {
  className?: string;
  /**
   * Where to send the user after logout.
   * Defaults to `/login`. Pass `null` to stay on the current page.
   */
  redirectTo?: string | null;
}

export default function MockSignOutButton({
  className,
  redirectTo = "/login",
}: MockSignOutButtonProps) {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  if (!isAuthenticated) return null;

  return (
    <button
      type="button"
      disabled={busy}
      onClick={() => {
        void (async () => {
          setBusy(true);
          try {
            await logout();
            if (redirectTo) router.push(redirectTo);
          } finally {
            setBusy(false);
          }
        })();
      }}
      className={
        className ??
        "inline-flex items-center gap-2 rounded-lg border border-[#1F2129] px-3 py-2 text-xs font-semibold text-[#94A3B8] transition-colors hover:border-[#3B82F6]/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]/50 disabled:opacity-60"
      }
    >
      {busy ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      ) : (
        <LogOut className="h-3.5 w-3.5" />
      )}
      Sign out
    </button>
  );
}
