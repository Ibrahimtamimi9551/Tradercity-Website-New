"use client";

import { useEffect, useId, useState } from "react";
import { Banknote, X } from "lucide-react";
import { DateTimePicker, SelectField } from "@/components/admin/ui";
import {
  datetimeLocalIstToStored,
  formatAdminDateTimeIst,
  getCurrentDatetimeLocalIst,
} from "@/lib/members/ist-datetime";
import { MANUAL_PAYMENT_PLAN_OPTIONS } from "@/lib/members/mock/manual-payments";
import {
  MANUAL_PAYMENT_CURRENCY_OPTIONS,
  MANUAL_PAYMENT_METHOD_OPTIONS,
  MANUAL_PAYMENT_REASON_OPTIONS,
  type ManualPaymentCreateInput,
  type ManualPaymentCurrency,
  type ManualPaymentMethod,
  type ManualPaymentReason,
} from "@/types/members/manual-payment";
import type { SubscriptionPlanKey } from "@/types/members/subscription";

type ManualPaymentFormProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (input: ManualPaymentCreateInput) => void;
};

const fieldClass =
  "w-full rounded-lg border border-white/10 bg-[#070b18]/80 px-3 py-2.5 text-sm text-white/90 placeholder:text-tc-muted focus:border-amber-500/45 focus:outline-none focus:ring-2 focus:ring-amber-500/20";

/**
 * Create Manual Payment drawer — free-text Discord username (no member dropdown),
 * payment + administration fields, then a review step before submit (Pending).
 */
export function ManualPaymentForm({
  open,
  onClose,
  onSubmit,
}: ManualPaymentFormProps) {
  const titleId = useId();
  const [step, setStep] = useState<"form" | "review">("form");
  const [saving, setSaving] = useState(false);

  const [username, setUsername] = useState("");
  const [planKey, setPlanKey] = useState<SubscriptionPlanKey>("monthly");
  const [amount, setAmount] = useState("60.00");
  const [currency, setCurrency] = useState<ManualPaymentCurrency>("USD");
  const [paymentMethod, setPaymentMethod] =
    useState<ManualPaymentMethod>("bank_transfer");
  const [receivedAt, setReceivedAt] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [receivedBy, setReceivedBy] = useState("Admin · Ibrahim");
  const [reason, setReason] = useState<ManualPaymentReason>("new_membership");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    setStep("form");
    setSaving(false);
    setUsername("");
    setPlanKey("monthly");
    setAmount("60.00");
    setCurrency("USD");
    setPaymentMethod("bank_transfer");
    setReceivedAt(getCurrentDatetimeLocalIst());
    setReferenceNumber("");
    setReceivedBy("Admin · Ibrahim");
    setReason("new_membership");
    setNotes("");
  }, [open]);

  const selectedPlan = MANUAL_PAYMENT_PLAN_OPTIONS.find(
    (p) => p.value === planKey
  );
  const methodLabel =
    MANUAL_PAYMENT_METHOD_OPTIONS.find((m) => m.value === paymentMethod)
      ?.label ?? paymentMethod;
  const reasonLabel =
    MANUAL_PAYMENT_REASON_OPTIONS.find((r) => r.value === reason)?.label ??
    reason;

  const normalizedUsername = username.trim().replace(/^@+/, "");
  const displayUsername = normalizedUsername
    ? `@${normalizedUsername}`
    : "—";

  const canContinue =
    Boolean(normalizedUsername) &&
    Boolean(amount.trim()) &&
    Boolean(receivedAt) &&
    Boolean(receivedBy.trim()) &&
    !saving;

  if (!open) return null;

  const buildInput = (): ManualPaymentCreateInput => ({
    username,
    planKey,
    amount: amount.trim(),
    currency,
    paymentMethod,
    receivedAt: datetimeLocalIstToStored(receivedAt),
    referenceNumber,
    receivedBy,
    reason,
    notes,
  });

  const onPlanChange = (value: SubscriptionPlanKey) => {
    setPlanKey(value);
    const plan = MANUAL_PAYMENT_PLAN_OPTIONS.find((p) => p.value === value);
    if (plan) setAmount(plan.amount);
  };

  const onSave = () => {
    if (!canContinue) return;
    setSaving(true);
    // TODO(NestJS): POST /admin/subscriptions/manual-payments
    window.setTimeout(() => {
      onSubmit(buildInput());
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
        className="relative z-[81] flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-[10px] border border-white/10 bg-[#0c101c]/95 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.65)] backdrop-blur-xl"
      >
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-white/10 px-4 py-3.5 sm:px-5">
          <div className="flex min-w-0 items-start gap-2.5">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-amber-500/25 bg-amber-500/10 text-amber-100">
              <Banknote className="h-4 w-4" aria-hidden />
            </span>
            <div className="min-w-0">
              <h2 id={titleId} className="text-base font-semibold text-white">
                {step === "form"
                  ? "Create Manual Payment"
                  : "Review Manual Payment"}
              </h2>
              <p className="mt-0.5 text-xs text-tc-muted">
                {step === "form"
                  ? "Record an offline or assisted payment — username can be entered before the member exists."
                  : "Confirm details before creating the payment record."}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-tc-muted transition-colors hover:bg-amber-500/15 hover:text-amber-100"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4 sm:px-5">
          {step === "form" ? (
            <>
              <FieldGroup title="Member Information">
                <label className="block space-y-1.5">
                  <span className="text-xs font-medium uppercase tracking-wide text-tc-muted">
                    Discord Username
                  </span>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoFocus
                    autoComplete="off"
                    spellCheck={false}
                    placeholder="Enter or paste Discord username"
                    aria-label="Discord username"
                    className={fieldClass}
                  />
                  <span className="block text-[11px] leading-relaxed text-tc-muted">
                    Free text — works for new or existing members. Format is
                    flexible (@optional).
                  </span>
                </label>
                <label className="block space-y-1.5">
                  <span className="text-xs font-medium uppercase tracking-wide text-tc-muted">
                    Membership Plan
                  </span>
                  <SelectField
                    aria-label="Membership plan"
                    value={planKey}
                    options={MANUAL_PAYMENT_PLAN_OPTIONS.map((p) => ({
                      value: p.value,
                      label: p.label,
                    }))}
                    onChange={(v) => onPlanChange(v as SubscriptionPlanKey)}
                    className="w-full [&_select]:h-10 [&_select]:px-3 [&_select]:text-sm"
                  />
                </label>
              </FieldGroup>

              <FieldGroup title="Payment Information">
                <div className="grid grid-cols-2 gap-3">
                  <label className="block space-y-1.5">
                    <span className="text-xs font-medium uppercase tracking-wide text-tc-muted">
                      Amount
                    </span>
                    <input
                      type="text"
                      inputMode="decimal"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className={fieldClass}
                    />
                  </label>
                  <label className="block space-y-1.5">
                    <span className="text-xs font-medium uppercase tracking-wide text-tc-muted">
                      Currency
                    </span>
                    <SelectField
                      aria-label="Currency"
                      value={currency}
                      options={MANUAL_PAYMENT_CURRENCY_OPTIONS}
                      onChange={(v) =>
                        setCurrency(v as ManualPaymentCurrency)
                      }
                      className="w-full [&_select]:h-10 [&_select]:px-3 [&_select]:text-sm"
                    />
                  </label>
                </div>
                <label className="block space-y-1.5">
                  <span className="text-xs font-medium uppercase tracking-wide text-tc-muted">
                    Payment Method
                  </span>
                  <SelectField
                    aria-label="Payment method"
                    value={paymentMethod}
                    options={MANUAL_PAYMENT_METHOD_OPTIONS}
                    onChange={(v) =>
                      setPaymentMethod(v as ManualPaymentMethod)
                    }
                    className="w-full [&_select]:h-10 [&_select]:px-3 [&_select]:text-sm"
                  />
                </label>
                <label className="block space-y-1.5">
                  <span className="text-xs font-medium uppercase tracking-wide text-tc-muted">
                    Payment Date
                  </span>
                  <DateTimePicker
                    value={receivedAt}
                    onChange={setReceivedAt}
                    aria-label="Payment date and time (IST)"
                    accent="gold"
                  />
                  <span className="block text-[11px] leading-relaxed text-tc-muted">
                    Defaults to current IST. Use the calendar and time controls
                    to record when payment was actually received.
                  </span>
                </label>
                <label className="block space-y-1.5">
                  <span className="text-xs font-medium uppercase tracking-wide text-tc-muted">
                    Reference Number{" "}
                    <span className="normal-case text-tc-muted/70">(optional)</span>
                  </span>
                  <input
                    type="text"
                    value={referenceNumber}
                    onChange={(e) => setReferenceNumber(e.target.value)}
                    placeholder="Bank / UPI / transfer reference"
                    className={fieldClass}
                  />
                </label>
              </FieldGroup>

              <FieldGroup title="Administration">
                <label className="block space-y-1.5">
                  <span className="text-xs font-medium uppercase tracking-wide text-tc-muted">
                    Received By
                  </span>
                  <input
                    type="text"
                    value={receivedBy}
                    onChange={(e) => setReceivedBy(e.target.value)}
                    className={fieldClass}
                  />
                </label>
                <label className="block space-y-1.5">
                  <span className="text-xs font-medium uppercase tracking-wide text-tc-muted">
                    Reason
                  </span>
                  <SelectField
                    aria-label="Reason"
                    value={reason}
                    options={MANUAL_PAYMENT_REASON_OPTIONS}
                    onChange={(v) => setReason(v as ManualPaymentReason)}
                    className="w-full [&_select]:h-10 [&_select]:px-3 [&_select]:text-sm"
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
                    placeholder="Private operational context…"
                    className={`${fieldClass} resize-y`}
                  />
                </label>
              </FieldGroup>
            </>
          ) : (
            <div className="space-y-3 rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <ReviewRow label="Discord Username" value={displayUsername} />
              <ReviewRow
                label="Membership Plan"
                value={selectedPlan?.label ?? planKey}
              />
              <ReviewRow label="Payment Method" value={methodLabel} />
              <ReviewRow
                label="Amount"
                value={`${amount} ${currency}`}
              />
              <ReviewRow
                label="Payment Date (IST)"
                value={formatAdminDateTimeIst(
                  datetimeLocalIstToStored(receivedAt)
                )}
              />
              <ReviewRow
                label="Reference"
                value={referenceNumber.trim() || "—"}
              />
              <ReviewRow label="Received By" value={receivedBy} />
              <ReviewRow label="Reason" value={reasonLabel} />
              <ReviewRow label="Notes" value={notes.trim() || "—"} />
              <p className="pt-2 text-xs leading-relaxed text-tc-muted">
                Creating this record sets status to{" "}
                <span className="text-amber-100">Pending</span>. The username
                can be linked to a Member ID later by the backend.
              </p>
            </div>
          )}
        </div>

        <div className="flex shrink-0 items-center justify-end gap-2 border-t border-white/10 px-4 py-3.5 sm:px-5">
          {step === "review" ? (
            <button
              type="button"
              onClick={() => setStep("form")}
              className="mr-auto rounded-lg border border-white/12 px-3.5 py-2 text-sm font-medium text-white/75 transition-colors hover:bg-white/[0.05] hover:text-white"
            >
              Back
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-white/12 px-3.5 py-2 text-sm font-medium text-white/75 transition-colors hover:bg-white/[0.05] hover:text-white"
            >
              Cancel
            </button>
          )}
          {step === "form" ? (
            <button
              type="button"
              disabled={!canContinue}
              onClick={() => setStep("review")}
              className="rounded-lg border border-amber-500/40 bg-amber-500/15 px-3.5 py-2 text-sm font-medium text-amber-100 transition-colors hover:bg-amber-500/25 disabled:opacity-40"
            >
              Continue to Review
            </button>
          ) : (
            <button
              type="button"
              disabled={!canContinue}
              onClick={onSave}
              className="rounded-lg border border-emerald-500/40 bg-emerald-500/15 px-3.5 py-2 text-sm font-medium text-emerald-100 transition-colors hover:bg-emerald-500/25 disabled:opacity-40"
            >
              {saving ? "Creating…" : "Create Payment"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function FieldGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-amber-100/80">
        {title}
      </h3>
      {children}
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-white/5 pb-2 last:border-0 last:pb-0">
      <span className="shrink-0 text-xs text-tc-muted">{label}</span>
      <span className="min-w-0 text-right text-sm text-white/90">{value}</span>
    </div>
  );
}
