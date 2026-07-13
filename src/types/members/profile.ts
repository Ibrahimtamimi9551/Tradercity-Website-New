import type { StatusTone } from "@/types/admin/common";
import type {
  DirectoryMember,
  DiscordStatus,
  MembershipTier,
} from "@/types/members/directory";

export type ProfileTabId =
  | "overview"
  | "subscription"
  | "discord"
  | "referral"
  | "notes"
  | "activity";

export type ProfileActivityKind =
  | "registered"
  | "joined_discord"
  | "payment_submitted"
  | "payment_verified"
  | "vip_activated"
  | "membership_renewed"
  | "membership_expired"
  | "referral_redeemed"
  | "discord_role"
  | "note";

export type ProfileActivityItem = {
  id: string;
  title: string;
  timestamp: string;
  kind: ProfileActivityKind;
};

export type ProfileNote = {
  id: string;
  body: string;
  author: string;
  createdAt: string;
};

export type DiscordRoleHistoryItem = {
  id: string;
  title: string;
  timestamp: string;
  status?: "complete" | "current" | "pending" | "error";
};

export type MemberProfile = {
  id: string;
  username: string;
  email: string;
  avatarTone: DirectoryMember["avatarTone"];
  membershipTier: MembershipTier;
  discordStatus: DiscordStatus;
  joinedAt: string;
  discordProfileUrl: string;

  header: {
    membershipLabel: string;
    membershipTone: StatusTone;
    discordLabel: string;
    discordTone: StatusTone;
    discordRole: string | null;
    online: boolean;
  };

  membership: {
    currentPlan: string;
    statusLabel: string;
    statusTone: StatusTone;
    planStartedOn: string;
    expiryDate: string | null;
    daysRemaining: number | null;
    renewalCount: number;
    activatedVia: string | null;
    totalDuration: string;
  };

  subscription: {
    plan: string;
    statusLabel: string;
    statusTone: StatusTone;
    paymentDate: string | null;
    expiryDate: string | null;
    daysRemaining: number | null;
    renewalCount: number;
    activatedVia: string | null;
    transactionHash: string | null;
    explorerUrl: string | null;
    paymentMethod: string | null;
    amountPaid: string | null;
  };

  discord: {
    role: string | null;
    connectionLabel: string;
    connectionTone: StatusTone;
    joinedAt: string | null;
    updatedAt: string | null;
    accountStatus: string;
    communityAccess: string;
    roleHistory: DiscordRoleHistoryItem[];
  };

  referral: {
    target: number;
    completed: number;
    pending: number;
    creditsEarned: number;
    creditPerReferral: number;
    redemptionLabel: string;
    redemptionTone: StatusTone;
  };

  notes: ProfileNote[];
  activity: ProfileActivityItem[];
};
