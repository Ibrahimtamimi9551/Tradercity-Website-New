import Link from "next/link";
import { Timeline, type TimelineItem } from "@/components/admin/ui";
import { cn } from "@/lib/admin/cn";
import type { ModulePanelTone } from "@/lib/admin/module-surfaces";

type ModuleTimelineSectionProps = {
  title: string;
  items: TimelineItem[];
  viewAllHref: string;
  tone: ModulePanelTone;
  /** Max events shown in the reflection preview. */
  previewCount?: number;
  emptyMessage?: string;
};

const viewAllTone: Record<ModulePanelTone, string> = {
  navy: "text-blue-300 hover:text-blue-200",
  purple: "text-violet-300 hover:text-violet-200",
  emerald: "text-emerald-300 hover:text-emerald-200",
  gold: "text-[#E8C96A] hover:text-[#f0d78a]",
  burgundy: "text-rose-300 hover:text-rose-200",
};

/**
 * Shared Current Status → Historical Timeline block for profile reflection cards.
 * Preview shows the most recent events in chronological order.
 */
export function ModuleTimelineSection({
  title,
  items,
  viewAllHref,
  tone,
  previewCount = 4,
  emptyMessage = "No timeline events yet.",
}: ModuleTimelineSectionProps) {
  const preview =
    items.length <= previewCount ? items : items.slice(items.length - previewCount);

  return (
    <div className="mt-4 border-t border-white/10 pt-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <p className="text-xs font-medium uppercase tracking-wide text-tc-muted">{title}</p>
        <Link
          href={viewAllHref}
          className={cn("shrink-0 text-xs font-medium transition-colors", viewAllTone[tone])}
        >
          View All →
        </Link>
      </div>
      {preview.length === 0 ? (
        <p className="text-sm text-tc-muted">{emptyMessage}</p>
      ) : (
        <Timeline items={preview} />
      )}
    </div>
  );
}
