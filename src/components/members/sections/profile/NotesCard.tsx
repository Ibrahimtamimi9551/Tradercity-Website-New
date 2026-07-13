"use client";

import { MoreHorizontal, Plus, StickyNote } from "lucide-react";
import { formatProfileDateTime } from "@/lib/members/format-profile";
import type { MemberProfile } from "@/types/members/profile";
import { ReflectionCard } from "./ReflectionCard";

type NotesCardProps = {
  profile: MemberProfile;
  /** When true, show every note (Notes tab). Overview shows a short preview. */
  expanded?: boolean;
};

export function NotesCard({ profile, expanded = false }: NotesCardProps) {
  const notes = expanded ? profile.notes : profile.notes.slice(0, 3);

  return (
    <ReflectionCard
      tone="gold"
      title="Internal Notes"
      icon={StickyNote}
      headerAction={
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-lg border border-amber-400/30 bg-black/20 px-2.5 py-1.5 text-xs font-medium text-[#E8C96A] transition-colors hover:bg-amber-500/10"
        >
          <Plus className="h-3.5 w-3.5" aria-hidden />
          Add Note
        </button>
      }
    >
      {notes.length === 0 ? (
        <p className="text-sm text-tc-muted">No internal notes yet.</p>
      ) : (
        <ul className="divide-y divide-white/10">
          {notes.map((note) => (
            <li key={note.id} className="flex items-start justify-between gap-3 py-3 first:pt-0 last:pb-0">
              <div className="min-w-0">
                <p className="text-sm font-medium leading-snug text-white/90">{note.body}</p>
                <p className="mt-1.5 text-xs text-tc-muted">
                  Added by {note.author} • {formatProfileDateTime(note.createdAt)}
                </p>
              </div>
              <button
                type="button"
                aria-label="Note actions"
                className="shrink-0 rounded p-1 text-tc-muted hover:bg-white/5 hover:text-white"
              >
                <MoreHorizontal className="h-4 w-4" aria-hidden />
              </button>
            </li>
          ))}
        </ul>
      )}
    </ReflectionCard>
  );
}
