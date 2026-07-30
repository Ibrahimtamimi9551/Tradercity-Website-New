"use client";

import { PublicProfileEditor } from "./PublicProfileEditor";
import { PublicProfileLivePreview } from "./PublicProfileLivePreview";
import type { PublicProfileEditablePatch } from "@/lib/analysts/mock/public-profile-mutations";
import type { PublicAnalystProfile } from "@/types/analysts/public-profile";
import { cn } from "@/lib/admin/cn";

type PublicProfileWorkspaceProps = {
  profile: PublicAnalystProfile | null;
  onPatch: (patch: PublicProfileEditablePatch) => void;
  onSaveDraft: () => void;
  onMarkPreview: () => void;
  onPublish: () => void;
  onUnpublish: () => void;
  hasUnsavedChanges: boolean;
  className?: string;
  /** Stack editor above preview (mobile page). */
  layout?: "split" | "stack";
};

export function PublicProfileWorkspace({
  profile,
  onPatch,
  onSaveDraft,
  onMarkPreview,
  onPublish,
  onUnpublish,
  hasUnsavedChanges,
  className,
  layout = "split",
}: PublicProfileWorkspaceProps) {
  if (!profile) {
    return (
      <div
        className={cn(
          "flex h-full min-h-[20rem] items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-6 text-center text-sm text-tc-muted",
          className
        )}
      >
        Select an approved analyst to curate their public profile.
      </div>
    );
  }

  return (
    <div
      className={cn(
        layout === "split"
          ? "grid h-full min-h-0 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,24rem)] xl:grid-cols-[minmax(0,1fr)_minmax(20rem,26rem)]"
          : "flex flex-col gap-4",
        className
      )}
    >
      <PublicProfileEditor
        profile={profile}
        onPatch={onPatch}
        onSaveDraft={onSaveDraft}
        onMarkPreview={onMarkPreview}
        onPublish={onPublish}
        onUnpublish={onUnpublish}
        hasUnsavedChanges={hasUnsavedChanges}
        className={layout === "split" ? "min-h-0" : undefined}
      />
      <PublicProfileLivePreview
        profile={profile}
        className={layout === "split" ? "min-h-0 lg:sticky lg:top-4 lg:max-h-[calc(100vh-6rem)]" : undefined}
      />
    </div>
  );
}
