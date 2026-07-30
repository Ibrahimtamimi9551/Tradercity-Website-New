import type { ManualPayment } from "@/types/members/manual-payment";

/**
 * Shared Manual Payment action stubs.
 *
 * TODO(NestJS):
 *   POST /admin/subscriptions/manual-payments
 *   POST /admin/subscriptions/manual-payments/:id/activate
 *   POST /admin/subscriptions/manual-payments/:id/cancel
 */
export function confirmActivateManualPayment(payment: ManualPayment): boolean {
  return window.confirm(
    `Activate membership for @${payment.username}?\n\n` +
      `Plan: ${payment.planLabel}\n` +
      `Method: ${payment.paymentMethodLabel}\n` +
      `Amount: ${payment.amount} ${payment.currency}\n\n` +
      "Triggers Membership activation → Discord sync → " +
      "Dashboard / Profile reflection → Audit.\n\n" +
      `Wire to NestJS: POST /admin/subscriptions/manual-payments/${payment.id}/activate`
  );
}

export function confirmCancelManualPayment(payment: ManualPayment): boolean {
  return window.confirm(
    `Cancel manual payment for @${payment.username}?\n\n` +
      "Record closed — Membership unchanged.\n\n" +
      `Wire to NestJS: POST /admin/subscriptions/manual-payments/${payment.id}/cancel`
  );
}
