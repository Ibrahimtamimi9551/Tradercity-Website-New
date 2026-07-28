import type { SubscriptionTicket } from "@/types/members/subscription";

/**
 * Shared Subscriptions directory action handlers.
 *
 * TODO(NestJS):
 *   POST /admin/subscriptions/:id/approve
 *   POST /admin/subscriptions/:id/reject
 */
export function openSubscriptionExplorer(ticket: SubscriptionTicket): void {
  if (!ticket.explorerUrl) {
    window.alert("No blockchain explorer link available for this ticket.");
    return;
  }
  window.open(ticket.explorerUrl, "_blank", "noopener,noreferrer");
}

export function approveSubscriptionTicket(ticket: SubscriptionTicket): void {
  window.alert(
    `Approve subscription for @${ticket.username}\n\n` +
      `Plan: ${ticket.planLabel}\n` +
      `TX: ${ticket.transactionHash.slice(0, 18)}…\n\n` +
      "Triggers Membership activation → Discord sync → " +
      "Dashboard / Profile reflection → Audit.\n\n" +
      `Wire to NestJS: POST /admin/subscriptions/${ticket.id}/approve`
  );
}

export function rejectSubscriptionTicket(ticket: SubscriptionTicket): void {
  window.alert(
    `Reject subscription for @${ticket.username}\n\n` +
      "Ticket closed — Membership unchanged.\n\n" +
      `Wire to NestJS: POST /admin/subscriptions/${ticket.id}/reject`
  );
}
