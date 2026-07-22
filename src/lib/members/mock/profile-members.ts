import { MOCK_DIRECTORY_MEMBERS } from "@/lib/members/mock/directory-members";
import { MOCK_REFERRAL_MEMBERS } from "@/lib/members/mock/referral-members";
import { MEMBERSHIP_PLANS } from "@/lib/membership/plans";
import type { DirectoryMember } from "@/types/members/directory";
import type { MemberProfile, ProfileTimelineItem } from "@/types/members/profile";

/**
 * Mock Control Center aggregates — UI-only until NestJS GET /admin/members/:id.
 * Identity/status seeded from directory rows; Overview fields match Phase 3 specs.
 * Plan amounts use official membership pricing (src/lib/membership/plans.ts).
 */

const TX_SAMPLES = [
  "0x8f2a9c1d4e7b...a3f1",
  "0x1b4c8e2f9a0d...c7e2",
  "0x9d3a7f1e5b2c...d4a8",
];

function formatHeaderMembership(member: DirectoryMember): MemberProfile["header"] {
  if (member.membership === "vip") {
    return {
      membershipLabel: "VIP Active",
      membershipTone: "success",
      discordLabel:
        member.discord === "connected"
          ? "Connected"
          : member.discord === "action_required"
            ? "Action Required"
            : member.discord === "suspended"
              ? "Suspended"
              : "Disconnected",
      discordTone:
        member.discord === "connected"
          ? "success"
          : member.discord === "disconnected"
            ? "neutral"
            : "danger",
      discordRole: member.discord === "connected" || member.discord === "action_required" ? "VIP" : null,
      online: member.discord === "connected",
    };
  }

  return {
    membershipLabel: "Free",
    membershipTone: "neutral",
    discordLabel:
      member.discord === "connected"
        ? "Connected"
        : member.discord === "action_required"
          ? "Action Required"
          : member.discord === "suspended"
            ? "Suspended"
            : "Disconnected",
    discordTone:
      member.discord === "connected"
        ? "success"
        : member.discord === "disconnected"
          ? "neutral"
          : "danger",
    discordRole: member.discord === "connected" ? "Free Member" : null,
    online: member.discord === "connected",
  };
}

function subscriptionFields(member: DirectoryMember, index: number): MemberProfile["subscription"] {
  // Cycle official paid plans so admin UIs show Monthly $60 / Quarterly $150 / Yearly $500
  const paidPlans = [
    MEMBERSHIP_PLANS.monthly,
    MEMBERSHIP_PLANS.quarterly,
    MEMBERSHIP_PLANS.yearly,
  ] as const;
  const plan = paidPlans[index % paidPlans.length];
  const vipPlanLabel = `VIP ${plan.label}`;

  if (member.subscription === "active") {
    return {
      plan: vipPlanLabel,
      statusLabel: "Successful",
      statusTone: "success",
      paymentDate: member.joinedAt,
      expiryDate: "2026-07-08T10:22:00",
      daysRemaining: plan.durationDays - (index % 12),
      renewalCount: 1,
      activatedVia: "Auto Verification",
      transactionHash: TX_SAMPLES[index % TX_SAMPLES.length],
      explorerUrl: "https://bscscan.com/",
      paymentMethod: "Crypto USDT - BEP20",
      amountPaid: plan.amountPaidDisplay,
    };
  }

  if (member.subscription === "pending_verification") {
    return {
      plan: vipPlanLabel,
      statusLabel: "Pending Verification",
      statusTone: "warning",
      paymentDate: member.joinedAt,
      expiryDate: null,
      daysRemaining: null,
      renewalCount: 0,
      activatedVia: null,
      transactionHash: TX_SAMPLES[index % TX_SAMPLES.length],
      explorerUrl: "https://bscscan.com/",
      paymentMethod: "Crypto USDT - BEP20",
      amountPaid: plan.amountPaidDisplay,
    };
  }

  if (member.subscription === "verification_required") {
    return {
      plan: vipPlanLabel,
      statusLabel: "Verification Required",
      statusTone: "danger",
      paymentDate: member.joinedAt,
      expiryDate: null,
      daysRemaining: null,
      renewalCount: 0,
      activatedVia: null,
      transactionHash: TX_SAMPLES[index % TX_SAMPLES.length],
      explorerUrl: "https://bscscan.com/",
      paymentMethod: "Crypto USDT - BEP20",
      amountPaid: plan.amountPaidDisplay,
    };
  }

  return {
    plan: "Free",
    statusLabel: "None",
    statusTone: "neutral",
    paymentDate: null,
    expiryDate: null,
    daysRemaining: null,
    renewalCount: 0,
    activatedVia: null,
    transactionHash: null,
    explorerUrl: null,
    paymentMethod: null,
    amountPaid: null,
  };
}

function membershipFields(
  member: DirectoryMember,
  sub: MemberProfile["subscription"]
): MemberProfile["membership"] {
  if (member.membership === "vip") {
    return {
      currentPlan: sub.plan === "Free" ? `VIP ${MEMBERSHIP_PLANS.monthly.label}` : sub.plan,
      statusLabel: member.subscription === "active" ? "Active" : "VIP (payment pending)",
      statusTone: member.subscription === "active" ? "success" : "warning",
      planStartedOn: member.joinedAt,
      expiryDate: sub.expiryDate,
      daysRemaining: sub.daysRemaining,
      renewalCount: sub.renewalCount,
      activatedVia: sub.activatedVia,
      totalDuration: "1 Month",
    };
  }

  return {
    currentPlan: "Free",
    statusLabel: "Free",
    statusTone: "neutral",
    planStartedOn: member.joinedAt,
    expiryDate: null,
    daysRemaining: null,
    renewalCount: 0,
    activatedVia: null,
    totalDuration: "—",
  };
}

function buildDiscordTimeline(
  member: DirectoryMember,
  role: string | null
): ProfileTimelineItem[] {
  if (member.discord === "disconnected") return [];

  const base = member.joinedAt;
  const events: ProfileTimelineItem[] = [
    {
      id: `${member.id}-dt-1`,
      title: "Discord Connection Created",
      timestamp: base,
      status: "complete",
    },
    {
      id: `${member.id}-dt-2`,
      title: "Discord Account Linked",
      timestamp: base,
      status: "complete",
    },
    {
      id: `${member.id}-dt-3`,
      title: "Joined TraderCity Discord",
      timestamp: base,
      status: "complete",
    },
    {
      id: `${member.id}-dt-4`,
      title: "Initial Sync Completed",
      timestamp: base,
      status: "complete",
    },
  ];

  if (role === "VIP") {
    events.push({
      id: `${member.id}-dt-5`,
      title: "VIP Role Assigned",
      timestamp: base,
      status: "complete",
    });
  }

  events.push({
    id: `${member.id}-dt-6`,
    title: "Last Successful Sync",
    timestamp: base,
    status: "complete",
  });

  if (member.discord === "action_required") {
    events.push({
      id: `${member.id}-dt-7`,
      title: "Sync Failed",
      description: "Manual repair required",
      timestamp: base,
      status: "error",
      badge: "Failed",
    });
  }

  return events;
}

function discordFields(member: DirectoryMember): MemberProfile["discord"] {
  const joined = member.discord !== "disconnected" ? member.joinedAt : null;
  const role =
    member.membership === "vip" && member.discord !== "disconnected"
      ? "VIP"
      : member.discord === "connected"
        ? "Free Member"
        : null;

  return {
    role,
    connectionLabel:
      member.discord === "connected"
        ? "Connected"
        : member.discord === "action_required"
          ? "Action Required"
          : member.discord === "suspended"
            ? "Suspended"
            : "Disconnected",
    connectionTone:
      member.discord === "connected"
        ? "success"
        : member.discord === "disconnected"
          ? "neutral"
          : "danger",
    joinedAt: joined,
    updatedAt: joined,
    accountStatus: member.discord === "suspended" ? "Suspended" : "Active",
    communityAccess:
      member.membership === "vip" && member.discord === "connected"
        ? "Full Access"
        : member.discord === "connected"
          ? "Limited Access"
          : "No Access",
    timeline: buildDiscordTimeline(member, role),
  };
}

function buildReferralTimeline(member: DirectoryMember): ProfileTimelineItem[] {
  const fromOps = MOCK_REFERRAL_MEMBERS.find((row) => row.memberId === member.id);
  if (fromOps) {
    return fromOps.timeline.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      timestamp: item.timestamp,
      status: item.status ?? "complete",
    }));
  }

  const events: ProfileTimelineItem[] = [
    {
      id: `${member.id}-rt-1`,
      title: "Referral Link Created",
      timestamp: member.joinedAt,
      status: "complete",
    },
  ];

  if (member.referralCurrent > 0) {
    events.push(
      {
        id: `${member.id}-rt-2`,
        title: "Referral Registered",
        description: "Referee joined TraderCity",
        timestamp: member.joinedAt,
        status: "complete",
      },
      {
        id: `${member.id}-rt-3`,
        title: "Membership Activated",
        timestamp: member.joinedAt,
        status: "complete",
      },
      {
        id: `${member.id}-rt-4`,
        title: "Referral Credit Issued",
        description: `+$${member.referralCurrent * 10}`,
        timestamp: member.joinedAt,
        status: "complete",
      }
    );
  }

  if (member.referralEligible) {
    events.push({
      id: `${member.id}-rt-5`,
      title: "Credit Redeemed",
      timestamp: member.joinedAt,
      status: "complete",
    });
  } else if (member.referralCurrent > 0) {
    events.push({
      id: `${member.id}-rt-5`,
      title: "Credit Pending",
      description: "Awaiting redemption eligibility",
      timestamp: member.joinedAt,
      status: "pending",
      badge: "Pending",
    });
  }

  return events;
}

function referralFields(member: DirectoryMember): MemberProfile["referral"] {
  const pending = Math.max(0, Math.min(2, member.referralTarget - member.referralCurrent));
  return {
    target: member.referralTarget,
    completed: member.referralCurrent,
    pending,
    creditsEarned: member.referralCurrent * 10,
    creditPerReferral: 10,
    redemptionLabel: member.referralEligible ? "Eligible" : "In Progress",
    redemptionTone: member.referralEligible ? "vip" : "warning",
    timeline: buildReferralTimeline(member),
  };
}

function buildNotes(member: DirectoryMember): MemberProfile["notes"] {
  if (member.id === "m-001") {
    return [
      {
        id: "n-001",
        body: "VIP activated via successful automatic verification",
        author: "Ibrahim",
        createdAt: "2026-06-08T10:25:00",
      },
      {
        id: "n-002",
        body: "User is active and engaged with the community",
        author: "Ibrahim",
        createdAt: "2026-06-08T10:30:00",
      },
    ];
  }

  if (member.systemHealth === "action_required") {
    return [
      {
        id: `${member.id}-n1`,
        body: "Needs attention — follow up on Discord / subscription mismatch",
        author: "Ibrahim",
        createdAt: member.joinedAt,
      },
    ];
  }

  if (member.subscription === "pending_verification") {
    return [
      {
        id: `${member.id}-n1`,
        body: "Waiting for payment proof verification",
        author: "System",
        createdAt: member.joinedAt,
      },
    ];
  }

  return [
    {
      id: `${member.id}-n1`,
      body: "Member profile reviewed — no outstanding issues",
      author: "Ibrahim",
      createdAt: member.joinedAt,
    },
  ];
}

function buildActivity(member: DirectoryMember): MemberProfile["activity"] {
  if (member.id === "m-001") {
    return [
      {
        id: "a-001",
        title: "Payment verified successfully",
        timestamp: "2026-06-08T10:25:00",
        kind: "payment_verified",
      },
      {
        id: "a-002",
        title: "Joined Discord server",
        timestamp: "2026-06-08T10:23:00",
        kind: "joined_discord",
      },
      {
        id: "a-003",
        title: "Payment initiated",
        timestamp: "2026-06-08T10:20:00",
        kind: "payment_submitted",
      },
      {
        id: "a-004",
        title: "Account registered",
        timestamp: "2026-06-08T10:22:00",
        kind: "registered",
      },
      {
        id: "a-005",
        title: "VIP role assigned on Discord",
        timestamp: "2026-06-08T10:26:00",
        kind: "discord_role",
      },
      {
        id: "a-006",
        title: "VIP membership activated",
        timestamp: "2026-06-08T10:25:30",
        kind: "vip_activated",
      },
    ];
  }

  const items: MemberProfile["activity"] = [
    {
      id: `${member.id}-a1`,
      title: "Account registered",
      timestamp: member.joinedAt,
      kind: "registered",
    },
  ];

  if (member.discord !== "disconnected") {
    items.push({
      id: `${member.id}-a2`,
      title: "Joined Discord server",
      timestamp: member.joinedAt,
      kind: "joined_discord",
    });
  }

  if (member.subscription !== "none") {
    items.push({
      id: `${member.id}-a3`,
      title: "Payment initiated",
      timestamp: member.joinedAt,
      kind: "payment_submitted",
    });
  }

  if (member.subscription === "active") {
    items.push(
      {
        id: `${member.id}-a4`,
        title: "Payment verified successfully",
        timestamp: member.joinedAt,
        kind: "payment_verified",
      },
      {
        id: `${member.id}-a5`,
        title: "VIP membership activated",
        timestamp: member.joinedAt,
        kind: "vip_activated",
      }
    );
  }

  return items;
}

function buildProfile(member: DirectoryMember, index: number): MemberProfile {
  const subscription = subscriptionFields(member, index);
  const header = formatHeaderMembership(member);

  return {
    id: member.id,
    username: member.username,
    email: member.email,
    avatarTone: member.avatarTone,
    membershipTier: member.membership,
    discordStatus: member.discord,
    joinedAt: member.joinedAt,
    discordProfileUrl: `https://discord.com/users/${member.username}`,
    header,
    membership: membershipFields(member, subscription),
    subscription,
    discord: discordFields(member),
    referral: referralFields(member),
    notes: buildNotes(member),
    activity: buildActivity(member),
  };
}

/** Rich override matching Control Center reference for m-001 */
const M001_OVERRIDE: Partial<MemberProfile> = {
  email: "ibrahim@example.com",
  membership: {
    currentPlan: `VIP ${MEMBERSHIP_PLANS.monthly.label}`,
    statusLabel: "Active",
    statusTone: "success",
    planStartedOn: "2026-06-08T10:22:00",
    expiryDate: "2026-07-08T10:22:00",
    daysRemaining: 30,
    renewalCount: 1,
    activatedVia: "Auto Verification",
    totalDuration: "1 Month",
  },
  subscription: {
    plan: `VIP ${MEMBERSHIP_PLANS.monthly.label}`,
    statusLabel: "Successful",
    statusTone: "success",
    paymentDate: "2026-06-08T10:22:00",
    expiryDate: "2026-07-08T10:22:00",
    daysRemaining: 30,
    renewalCount: 1,
    activatedVia: "Auto Verification",
    transactionHash: "0x8f2a9c1d4e7b...a3f1",
    explorerUrl: "https://bscscan.com/",
    paymentMethod: "Crypto USDT - BEP20",
    amountPaid: MEMBERSHIP_PLANS.monthly.amountPaidDisplay,
  },
  discord: {
    role: "VIP",
    connectionLabel: "Connected",
    connectionTone: "success",
    joinedAt: "2026-06-08T10:22:00",
    updatedAt: "2026-06-08T10:25:00",
    accountStatus: "Active",
    communityAccess: "Full Access",
    timeline: [
      {
        id: "dt-1",
        title: "Discord Connection Created",
        timestamp: "2026-06-08T10:21:00",
        status: "complete",
      },
      {
        id: "dt-2",
        title: "Discord Account Linked",
        timestamp: "2026-06-08T10:22:00",
        status: "complete",
      },
      {
        id: "dt-3",
        title: "Joined TraderCity Discord",
        timestamp: "2026-06-08T10:23:00",
        status: "complete",
      },
      {
        id: "dt-4",
        title: "Initial Sync Completed",
        timestamp: "2026-06-08T10:24:00",
        status: "complete",
      },
      {
        id: "dt-5",
        title: "VIP Role Assigned",
        timestamp: "2026-06-08T10:25:00",
        status: "complete",
      },
      {
        id: "dt-6",
        title: "Last Successful Sync",
        timestamp: "2026-07-18T09:14:00",
        status: "complete",
      },
    ],
  },
  referral: {
    target: 6,
    completed: 3,
    pending: 2,
    creditsEarned: 30,
    creditPerReferral: 10,
    redemptionLabel: "Eligible",
    redemptionTone: "vip",
    timeline: [
      {
        id: "rt-1",
        title: "Referral Link Created",
        description: "Link IBRAHIM10 activated",
        timestamp: "2024-03-01T09:00:00",
        status: "complete",
      },
      {
        id: "rt-2",
        title: "Referral Registered",
        description: "Referee joined TraderCity",
        timestamp: "2026-07-15T08:20:00",
        status: "complete",
      },
      {
        id: "rt-3",
        title: "Membership Activated",
        description: "VIP Monthly — $60",
        timestamp: "2026-07-16T09:45:00",
        status: "complete",
      },
      {
        id: "rt-4",
        title: "Referral Credit Issued",
        description: "+$10 Referral Credit",
        timestamp: "2026-07-16T10:00:00",
        status: "complete",
      },
      {
        id: "rt-5",
        title: "Credit Redeemed",
        description: "$60 applied to renewal",
        timestamp: "2026-07-18T11:30:00",
        status: "complete",
      },
    ],
  },
};

export const MOCK_MEMBER_PROFILES: MemberProfile[] = MOCK_DIRECTORY_MEMBERS.map((member, index) => {
  const base = buildProfile(member, index);
  if (member.id === "m-001") {
    return { ...base, ...M001_OVERRIDE, header: formatHeaderMembership(member) };
  }
  return base;
});

export function getMemberProfile(id: string): MemberProfile | undefined {
  return MOCK_MEMBER_PROFILES.find((profile) => profile.id === id);
}
