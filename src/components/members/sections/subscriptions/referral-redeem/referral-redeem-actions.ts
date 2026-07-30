import type { ReferralMember } from "@/types/members/referral";

/**
 * Activation Center — Referral Redeem action stubs.
 *
 * Approve cascade:
 * Waiting Admin Approval → Approve → Membership Activated →
 * Credits Deducted → Wallet Updated → Audit Log → Timeline Updated
 *
 * TODO(NestJS):
 *   POST /admin/subscriptions/referral-redeem/:id/approve
 *   POST /admin/subscriptions/referral-redeem/:id/reject
 */
export function confirmApproveRedeem(member: ReferralMember): boolean {
  const required = member.creditsRequired ?? 0;
  const remaining = member.availableCredit - required;
  return window.confirm(
    `Approve redeem request for @${member.username}?\n\n` +
      `Requested plan: ${member.requestedPlanLabel ?? "—"}\n` +
      `Credits required: $${required}\n` +
      `Remaining after: $${remaining}\n\n` +
      "Cascade: Membership Activated → Credits Deducted → " +
      "Wallet Updated → Audit → Timeline.\n\n" +
      `Wire to NestJS: POST /admin/subscriptions/referral-redeem/${member.id}/approve`
  );
}

export function confirmRejectRedeem(member: ReferralMember): boolean {
  return window.confirm(
    `Reject redeem request for @${member.username}?\n\n` +
      "Membership unchanged · credits retained.\n\n" +
      `Wire to NestJS: POST /admin/subscriptions/referral-redeem/${member.id}/reject`
  );
}
