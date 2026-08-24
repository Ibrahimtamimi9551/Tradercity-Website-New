import { cn } from "@/lib/super-admin/cn";

/** Sidebar widths — must match SuperAdminSidebar. */
export const SUPER_ADMIN_SIDEBAR_EXPANDED = "17rem";
export const SUPER_ADMIN_SIDEBAR_COLLAPSED = "4.5rem";

export function superAdminContentOffsetClass(collapsed: boolean) {
  return collapsed
    ? "lg:pl-[calc(4.5rem+1.5rem)]"
    : "lg:pl-[calc(17rem+1.5rem)]";
}

export function superAdminContentPaddingClass(collapsed: boolean) {
  return cn("px-4 md:px-6 lg:pr-8", superAdminContentOffsetClass(collapsed));
}
