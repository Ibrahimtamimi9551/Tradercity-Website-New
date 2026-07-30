/** DEV MOCK ONLY — soft client guard for UX validation; replace with real auth later. */

"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "./AuthProvider";
import { buildLoginHref } from "./redirects";

interface RequireAuthProps {
  children: ReactNode;
  /** Optional fallback while session hydrates. */
  fallback?: ReactNode;
}

/**
 * Soft client-side gate. Redirects unauthenticated users to `/login`
 * with `returnUrl` set to the current path (+ query).
 */
export function RequireAuth({ children, fallback = null }: RequireAuthProps) {
  const { isReady, isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!isReady || isAuthenticated) return;
    const query = searchParams.toString();
    const returnUrl = query ? `${pathname}?${query}` : pathname;
    router.replace(buildLoginHref({ returnUrl }));
  }, [isReady, isAuthenticated, pathname, searchParams, router]);

  if (!isReady) return <>{fallback}</>;
  if (!isAuthenticated) return <>{fallback}</>;
  return <>{children}</>;
}
