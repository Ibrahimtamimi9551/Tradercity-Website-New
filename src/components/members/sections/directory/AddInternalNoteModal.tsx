"use client";

import { useEffect, useId, useState } from "react";
import { StickyNote, X } from "lucide-react";

type AddInternalNoteModalProps = {
  memberId: string;
  memberName: string;
  open: boolean;
  onClose: () => void;
};

/**
 * Lightweight "Add Internal Note" flow from Members directory.
 * Mock-only until NestJS notes API — does not invent backend contracts.
 */
export function AddInternalNoteModal({
  memberId,
  memberName,
  open,
  onClose,
}: AddInternalNoteModalProps) {
  const titleId = useId();
  const [body, setBody] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      setBody("");
      setSaving(false);
    }
  }, [open, memberId]);

  if (!open) return null;

  const canSave = body.trim().length > 0 && !saving;

  const onSave = () => {
    if (!canSave) return;
    setSaving(true);
    // TODO(NestJS): POST internal note for memberId
    window.setTimeout(() => {
      setSaving(false);
      onClose();
    }, 280);
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center p-3 sm:items-center sm:p-6">
      <button
        type="button"
        aria-label="Close dialog backdrop"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-[81] w-full max-w-md overflow-hidden rounded-[10px] border border-white/10 bg-[#0c101c]/95 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.65)] backdrop-blur-xl"
      >
        <div className="flex items-start justify-between gap-3 border-b border-white/10 px-4 py-3.5 sm:px-5">
          <div className="flex min-w-0 items-start gap-2.5">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white/70">
              <StickyNote className="h-4 w-4" aria-hidden />
            </span>
            <div className="min-w-0">
              <h2 id={titleId} className="text-base font-semibold text-white">
                Add Internal Note
              </h2>
              <p className="mt-0.5 truncate text-xs text-tc-muted">
                For <span className="text-white/80">{memberName}</span>
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-tc-muted transition-colors hover:bg-violet-500/15 hover:text-violet-100"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-4 px-4 py-4 sm:px-5">
          <label className="block space-y-1.5">
            <span className="text-xs font-medium uppercase tracking-wide text-tc-muted">
              Note
            </span>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={4}
              autoFocus
              placeholder="Private operational context for administrators…"
              className="w-full resize-y rounded-lg border border-white/10 bg-[#070b18]/80 px-3 py-2.5 text-sm text-white/90 placeholder:text-tc-muted focus:border-violet-500/45 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
            />
          </label>

          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-white/12 px-3.5 py-2 text-sm font-medium text-white/75 transition-colors hover:bg-white/[0.05] hover:text-white"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!canSave}
              onClick={onSave}
              className="rounded-lg bg-violet-500/90 px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {saving ? "Saving…" : "Save Note"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
