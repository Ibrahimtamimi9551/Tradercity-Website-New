"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CreditCard,
  Gift,
  MessageSquare,
  StickyNote,
  User,
} from "lucide-react";
import {
  AdminRowActionsMenu,
  AdminRowMenuDivider,
  AdminRowMenuItem,
} from "@/components/admin/ui";
import type { DirectoryMember } from "@/types/members/directory";
import { AddInternalNoteModal } from "./AddInternalNoteModal";

type MemberRowActionsProps = {
  member: DirectoryMember;
};

/**
 * Context-aware deep-link into an ops module:
 * search = Discord username → filter to that record → select row → open details.
 */
function moduleFocusHref(
  path: "/admin/subscriptions" | "/admin/discord" | "/admin/referrals",
  member: DirectoryMember
) {
  const params = new URLSearchParams({
    q: member.username,
    member: member.id,
  });
  return `${path}?${params.toString()}`;
}

/**
 * Members directory ⋮ menu — navigation hub only.
 * Operational actions live in Subscriptions / Discord / Referral modules.
 */
export function MemberRowActions({ member }: MemberRowActionsProps) {
  const router = useRouter();
  const [noteOpen, setNoteOpen] = useState(false);

  return (
    <>
      <AdminRowActionsMenu
        ariaLabel={`Actions for ${member.username}`}
        menuLabel="Member directory actions"
      >
        {({ close }) => (
          <>
            <AdminRowMenuItem
              icon={User}
              label="Open User Profile"
              onSelect={() => {
                close();
                router.push(`/admin/members/${member.id}`);
              }}
            />
            <AdminRowMenuDivider />
            <AdminRowMenuItem
              icon={CreditCard}
              label="Subscription"
              onSelect={() => {
                close();
                router.push(moduleFocusHref("/admin/subscriptions", member));
              }}
            />
            <AdminRowMenuItem
              icon={MessageSquare}
              label="Discord"
              onSelect={() => {
                close();
                router.push(moduleFocusHref("/admin/discord", member));
              }}
            />
            <AdminRowMenuItem
              icon={Gift}
              label="Referral"
              onSelect={() => {
                close();
                router.push(moduleFocusHref("/admin/referrals", member));
              }}
            />
            <AdminRowMenuDivider />
            <AdminRowMenuItem
              icon={StickyNote}
              label="Add Internal Note"
              onSelect={() => {
                close();
                setNoteOpen(true);
              }}
            />
          </>
        )}
      </AdminRowActionsMenu>

      <AddInternalNoteModal
        memberId={member.id}
        memberName={member.username}
        open={noteOpen}
        onClose={() => setNoteOpen(false)}
      />
    </>
  );
}
