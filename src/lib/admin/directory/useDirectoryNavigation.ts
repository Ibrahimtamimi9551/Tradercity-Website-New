"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { isAdminDesktop } from "./breakpoints";
import {
  getDirectoryReturnHref,
  rememberDirectoryContext,
} from "./context-storage";

type AppRouter = ReturnType<typeof useRouter>;

export type PushDirectoryDetailOptions = {
  /** Module key for sessionStorage return context (e.g. "members", "discord"). */
  moduleKey: string;
  /** List route base, e.g. `/admin/members`. */
  listPathname: string;
  /** Detail route, e.g. `/admin/members/abc`. */
  detailHref: string;
  /**
   * When true (default), remember list href + scroll before navigating.
   * Use for Control Center routes that unmount the list hook.
   */
  rememberContext?: boolean;
  /**
   * When true, only navigate below `lg`. Desktop callers handle selection in-panel.
   * Default false — always navigate (Members Control Center).
   */
  mobileOnly?: boolean;
};

/**
 * Build a list href from the current location when already on the list route,
 * otherwise fall back to listPathname.
 */
export function buildListHref(
  listPathname: string,
  search: string,
  options?: { omitKeys?: string[] }
): string {
  const params = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
  for (const key of options?.omitKeys ?? []) {
    params.delete(key);
  }
  const query = params.toString();
  return query ? `${listPathname}?${query}` : listPathname;
}

/**
 * Append current list query onto a detail path so refresh on detail keeps filters.
 */
export function buildDetailHrefWithQuery(
  detailPath: string,
  listSearch: string,
  options?: { omitKeys?: string[] }
): string {
  const params = new URLSearchParams(
    listSearch.startsWith("?") ? listSearch.slice(1) : listSearch
  );
  for (const key of options?.omitKeys ?? ["member", "memberId"]) {
    params.delete(key);
  }
  const query = params.toString();
  return query ? `${detailPath}?${query}` : detailPath;
}

export function pushDirectoryDetail(
  router: AppRouter,
  options: PushDirectoryDetailOptions & { listHref?: string }
): boolean {
  const {
    moduleKey,
    listPathname,
    detailHref,
    rememberContext = true,
    mobileOnly = false,
    listHref,
  } = options;

  if (mobileOnly && isAdminDesktop()) {
    return false;
  }

  const returnHref = listHref ?? listPathname;
  if (rememberContext) {
    rememberDirectoryContext(moduleKey, {
      href: returnHref,
      scrollY: typeof window !== "undefined" ? window.scrollY : 0,
    });
  }

  router.push(detailHref);
  return true;
}

/**
 * Hook helpers for directory → detail navigation and return hrefs.
 */
export function useDirectoryNavigation(moduleKey: string, listPathname: string) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentListHref = useCallback(() => {
    if (pathname === listPathname || pathname.startsWith(`${listPathname}/`)) {
      // Prefer live list query when on list; when on detail, searchParams may still carry filters.
      return buildListHref(listPathname, searchParams.toString(), {
        omitKeys: pathname === listPathname ? [] : ["member", "memberId"],
      });
    }
    return listPathname;
  }, [listPathname, pathname, searchParams]);

  const returnHref = useCallback(
    (fallback?: string) =>
      getDirectoryReturnHref(moduleKey, fallback ?? listPathname),
    [listPathname, moduleKey]
  );

  const openDetail = useCallback(
    (
      detailPath: string,
      options?: Omit<
        PushDirectoryDetailOptions,
        "moduleKey" | "listPathname" | "detailHref"
      > & { omitQueryKeys?: string[] }
    ) => {
      const listHref = currentListHref();
      const detailHref = buildDetailHrefWithQuery(
        detailPath,
        searchParams.toString(),
        { omitKeys: options?.omitQueryKeys }
      );
      return pushDirectoryDetail(router, {
        moduleKey,
        listPathname,
        detailHref,
        listHref,
        rememberContext: options?.rememberContext,
        mobileOnly: options?.mobileOnly,
      });
    },
    [currentListHref, listPathname, moduleKey, router, searchParams]
  );

  return {
    router,
    currentListHref,
    returnHref,
    openDetail,
    isDesktop: isAdminDesktop,
  };
}
