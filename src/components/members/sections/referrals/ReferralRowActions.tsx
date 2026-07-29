"use client";

import { useRouter } from "next/navigation";
import { History, ScrollText, User } from "lucide-react";
import {
  AdminRowActionsMenu,
  AdminRowMenuItem,
} from "@/components/admin/ui";
import type { ReferralMember } from "@/types/members/referral";

type ReferralRowActionsProps = {
  member: ReferralMember;
};

/**
 * Referral Operations ⋮ menu — lightweight contextual actions only.
 * Redeem approval lives in Membership Activation Center (Subscriptions).
 * Referral never activates memberships.
 */
export function ReferralRowActions({ member }: ReferralRowActionsProps) {
  const router = useRouter();

  return (
    <AdminRowActionsMenu
      ariaLabel={`Actions for ${member.displayName}`}
      menuLabel="Referral member actions"
    >
      {({ close }) => (
        <>
          <AdminRowMenuItem
            icon={User}
            label="Open Member Profile"
            onSelect={() => {
              close();
              router.push(`/admin/members/${member.memberId}`);
            }}
          />
          <AdminRowMenuItem
            icon={History}
            label="Wallet History"
            onSelect={() => {
              close();
              window.alert("Wallet History — coming in Part 2 / NestJS.");
            }}
          />
          <AdminRowMenuItem
            icon={ScrollText}
            label="Audit Log"
            onSelect={() => {
              close();
              window.alert("Audit Log — deferred system module.");
            }}
          />
        </>
      )}
    </AdminRowActionsMenu>
  );
}
