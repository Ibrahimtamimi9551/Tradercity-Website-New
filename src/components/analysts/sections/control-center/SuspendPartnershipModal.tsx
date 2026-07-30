"use client";

import { useEffect, useId, useState } from "react";
import { X } from "lucide-react";
import { SelectField } from "@/components/admin/ui";
import type { SuspendPartnershipDraft } from "@/types/analysts/control-center";

const REASON_OPTIONS = [
  { value: "publishing_standards", label: "Publishing standards not met" },
  { value: "communication", label: "Communication / responsiveness" },
  { value: "community_conduct", label: "Community conduct" },
  { value: "performance_review", label: "Performance review" },
  { value: "other", label: "Other" },
];

const DURATION_OPTIONS = [
  { value: "7d", label: "7 days" },
  { value: "14d", label: "14 days" },
  { value: "30d", label: "30 days" },
  { value: "indefinite", label: "Indefinite" },
];

type SuspendPartnershipModalProps = {
  analystName: string;
  open: boolean;
  onClose: () => void;
  onConfirm: (draft: SuspendPartnershipDraft) => void;
};

export function SuspendPartnershipModal({
  analystName,
  open,
  onClose,
  onConfirm,
}: SuspendPartnershipModalProps) {
  const titleId = useId();
  const [reason, setReason] = useState(REASON_OPTIONS[0].value);
  const [notes, setNotes] = useState("");
  const [duration, setDuration] = useState<SuspendPartnershipDraft["duration"]>("14d");
  const [notifyAnalyst, setNotifyAnalyst] = useState(true);

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
      setReason(REASON_OPTIONS[0].value);
      setNotes("");
      setDuration("14d");
      setNotifyAnalyst(true);
    }
  }, [open]);

  if (!open) return null;

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
        className="relative z-[81] max-h-[min(90vh,40rem)] w-full max-w-lg overflow-y-auto rounded-xl border border-rose-400/25 bg-[#120e1c] p-5 shadow-2xl sm:p-6"
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h2 id={titleId} className="text-lg font-semibold text-white">
              Suspend Partnership
            </h2>
            <p className="mt-1 text-sm text-tc-muted">
              Suspend <span className="text-white/85">{analystName}</span>. Mock flow only —
              no backend.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-tc-muted hover:bg-white/5 hover:text-white"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-4">
          <label className="block space-y-1.5">
            <span className="text-xs font-medium uppercase tracking-wide text-tc-muted">
              Reason
            </span>
            <SelectField
              aria-label="Suspension reason"
              value={reason}
              options={REASON_OPTIONS}
              onChange={setReason}
            />
          </label>

          <label className="block space-y-1.5">
            <span className="text-xs font-medium uppercase tracking-wide text-tc-muted">
              Internal Notes
            </span>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Operational context for this suspension…"
              className="w-full resize-y rounded-lg border border-white/10 bg-[#0c101c] px-3 py-2.5 text-sm text-white/90 placeholder:text-tc-muted focus:border-tc-purple/50 focus:outline-none focus:ring-2 focus:ring-tc-purple/20"
            />
          </label>

          <label className="block space-y-1.5">
            <span className="text-xs font-medium uppercase tracking-wide text-tc-muted">
              Duration
            </span>
            <SelectField
              aria-label="Suspension duration"
              value={duration}
              options={DURATION_OPTIONS}
              onChange={(value) =>
                setDuration(value as SuspendPartnershipDraft["duration"])
              }
            />
          </label>

          <label className="flex items-center gap-2.5 text-sm text-white/85">
            <input
              type="checkbox"
              checked={notifyAnalyst}
              onChange={(e) => setNotifyAnalyst(e.target.checked)}
              className="h-4 w-4 rounded border-white/20 bg-black/40"
            />
            Notify analyst
          </label>

          <fieldset className="space-y-2 rounded-lg border border-dashed border-white/10 bg-black/20 p-3">
            <legend className="px-1 text-xs font-medium uppercase tracking-wide text-tc-muted">
              Future options
            </legend>
            <label className="flex items-center gap-2.5 text-sm text-tc-muted">
              <input type="checkbox" disabled className="h-4 w-4 rounded opacity-50" />
              Remove Discord Role (future)
            </label>
            <label className="flex items-center gap-2.5 text-sm text-tc-muted">
              <input type="checkbox" disabled className="h-4 w-4 rounded opacity-50" />
              Pause Commission (future)
            </label>
          </fieldset>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-white/10 bg-black/20 px-4 py-2.5 text-sm font-medium text-white/80 hover:bg-white/5"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() =>
              onConfirm({
                reason,
                notes,
                duration,
                notifyAnalyst,
                removeDiscordRole: false,
                pauseCommission: false,
              })
            }
            className="rounded-lg border border-rose-400/40 bg-rose-500/20 px-4 py-2.5 text-sm font-medium text-rose-100 hover:bg-rose-500/30"
          >
            Confirm Suspension
          </button>
        </div>
      </div>
    </div>
  );
}
