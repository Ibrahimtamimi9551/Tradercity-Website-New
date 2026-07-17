import type { DiscordMember } from "@/types/members/discord";

/**
 * Shared Discord directory action handlers — single implementation for
 * list page, side panel, and full-page detail.
 *
 * TODO(NestJS): POST /admin/discord/:id/sync | invite
 */
export function queueDiscordManualSync(member: DiscordMember): void {
  window.alert(
    `Sync queued for @${member.username}.\n\nDiscord roles will be updated to match TraderCity membership. Membership and payments are unchanged.`
  );
}

export function sendDiscordInvite(member: DiscordMember): void {
  window.alert(
    `Discord invite sent to @${member.username}.\n\nInvite delivery is handled by the Discord integration service.`
  );
}
