"use client";

import { useState } from "react";
import { Plus, StickyNote } from "lucide-react";
import { modulePanelSurface } from "@/lib/admin/module-surfaces";
import { formatControlCenterDateTime } from "@/lib/analysts/format-control-center";
import type { AnalystControlCenter } from "@/types/analysts/control-center";

type ControlCenterNotesProps = {
  profile: AnalystControlCenter;
  onAddNote: (body: string) => void;
};

export function ControlCenterNotes({ profile, onAddNote }: ControlCenterNotesProps) {
  const [draft, setDraft] = useState("");
  const [composing, setComposing] = useState(false);

  const submit = () => {
    if (!draft.trim()) return;
    onAddNote(draft);
    setDraft("");
    setComposing(false);
  };

  return (
    <section className={modulePanelSurface("gold", "space-y-4")}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-amber-400/30 bg-black/25 text-[#E8C96A]">
            <StickyNote className="h-4 w-4" aria-hidden />
          </div>
          <div>
            <h2 className="text-sm font-medium text-white sm:text-base">Internal Notes</h2>
            <p className="text-xs text-tc-muted">Admin-only partnership notes · mock storage</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setComposing((v) => !v)}
          className="inline-flex items-center gap-1.5 rounded-lg border border-amber-400/30 bg-black/20 px-2.5 py-1.5 text-xs font-medium text-[#E8C96A] transition-colors hover:bg-amber-500/10"
        >
          <Plus className="h-3.5 w-3.5" aria-hidden />
          Add Note
        </button>
      </div>

      {composing ? (
        <div className="space-y-2 rounded-lg border border-white/10 bg-black/20 p-3">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={3}
            placeholder="Internal operational note…"
            className="w-full resize-y rounded-lg border border-white/10 bg-[#0c101c] px-3 py-2 text-sm text-white/90 placeholder:text-tc-muted focus:border-tc-purple/50 focus:outline-none focus:ring-2 focus:ring-tc-purple/20"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setComposing(false);
                setDraft("");
              }}
              className="rounded-lg px-3 py-1.5 text-xs text-tc-muted hover:text-white"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={submit}
              className="rounded-lg border border-amber-400/35 bg-amber-500/10 px-3 py-1.5 text-xs font-medium text-[#E8C96A] hover:bg-amber-500/20"
            >
              Save Note
            </button>
          </div>
        </div>
      ) : null}

      {profile.notes.length === 0 ? (
        <p className="text-sm text-tc-muted">No internal notes yet.</p>
      ) : (
        <ul className="divide-y divide-white/10">
          {profile.notes.map((note) => (
            <li key={note.id} className="py-3 first:pt-0 last:pb-0">
              <p className="text-sm font-medium leading-snug text-white/90">{note.body}</p>
              <p className="mt-1.5 text-xs text-tc-muted">
                Added by {note.author} · {formatControlCenterDateTime(note.createdAt)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
