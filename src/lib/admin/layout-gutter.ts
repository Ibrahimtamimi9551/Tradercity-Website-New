import { cn } from "@/lib/admin/cn";

/**
 * Global Admin content gutter — space between sidebar rail and workspace canvas.
 * Desktop preferred: 32px (2rem). Applied via shell + header so all modules align.
 */
export const ADMIN_CONTENT_GUTTER = "2rem"; // 32px

/** Sidebar widths (must match AdminSidebar). */
export const ADMIN_SIDEBAR_EXPANDED = "16rem"; // 256px / lg:w-64
export const ADMIN_SIDEBAR_COLLAPSED = "4.5rem"; // 72px

/**
 * Left offset = sidebar width + content gutter.
 * Use on `<main>` and sticky header so titles/KPIs/search share one boundary.
 */
export function adminContentOffsetClass(collapsed: boolean) {
  return collapsed
    ? "lg:pl-[calc(4.5rem+2rem)]"
    : "lg:pl-[calc(16rem+2rem)]";
}

/** Horizontal padding for the workspace (right edge + mobile/tablet). */
export function adminContentPaddingClass(collapsed: boolean) {
  return cn(
    // Mobile 16px · tablet 24px · desktop right 32px (left = sidebar + 32px gutter)
    "px-4 md:px-6 lg:pr-8",
    adminContentOffsetClass(collapsed)
  );
}
