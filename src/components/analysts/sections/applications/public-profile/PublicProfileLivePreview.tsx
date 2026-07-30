"use client";

import { PublicAnalystCard } from "@/components/analysts/public-profile";
import { cn } from "@/lib/admin/cn";
import { modulePanelSurface } from "@/lib/admin/module-surfaces";
import {
  toPublicAnalystCardProps,
  type PublicAnalystProfile,
} from "@/types/analysts/public-profile";

type PublicProfileLivePreviewProps = {
  profile: PublicAnalystProfile;
  className?: string;
};

export function PublicProfileLivePreview({
  profile,
  className,
}: PublicProfileLivePreviewProps) {
  const cardProps = toPublicAnalystCardProps(profile);

  return (
    <div className={cn("flex h-full min-h-0 flex-col gap-3", className)}>
      <div className={modulePanelSurface("navy", "px-4 py-3")}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">
          Live Homepage Card Preview
        </p>
        <p className="mt-1 text-xs text-tc-muted">
          Same <code className="text-violet-200/90">PublicAnalystCard</code> Meet the Analysts
          renders. Empty sections stay hidden.
        </p>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto rounded-2xl border border-white/10 bg-[#06080d] p-3 sm:p-4">
        <PublicAnalystCard {...cardProps} preview className="mx-auto max-w-2xl" />
      </div>
    </div>
  );
}
