import type { StatusTone } from "@/types/admin/common";
import type { MembershipActivationSource } from "@/types/members/activation-source";
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

/** Shared lifecycle event shape for module timelines on the User Profile. */
export type ProfileTimelineItem = {
  id: string;
  title: string;
  description?: string;
  timestamp: string;
  status?: "complete" | "current" | "pending" | "error";
  badge?: string;
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
    /** Display label for activation source (Membership reflection). */
    activatedVia: string | null;
    activationSource: MembershipActivationSource | null;
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
    /** @deprecated Prefer activationSource — kept for Membership card label sync. */
    activatedVia: string | null;
    /** How this membership period was activated / extended. */
    activationSource: MembershipActivationSource | null;
    transactionHash: string | null;
    explorerUrl: string | null;
    paymentMethod: string | null;
    amountPaid: string | null;
    /** Manual / grant notes (source-specific). */
    notes: string | null;
    approvedBy: string | null;
    activationDate: string | null;
    /** Manual Payment — bank/UPI/cash reference when available. */
    referenceNumber: string | null;
    /** Manual Payment — when funds were received (may differ from activation). */
    receivedDate: string | null;
    /** Manual Payment — administrator who recorded receipt. */
    receivedBy: string | null;
    /** Manual Payment — business reason label. */
    reason: string | null;
    /** Referral Redeem — credits applied on approval. */
    creditsRedeemed: string | null;
    /** Crypto — network display label. */
    networkLabel: string | null;
    /** Crypto — verification result label. */
    verificationLabel: string | null;
    verificationTone: StatusTone | null;
    /** Crypto — approval decision label. */
    approvalLabel: string | null;
  };

  discord: {
    role: string | null;
    connectionLabel: string;
    connectionTone: StatusTone;
    joinedAt: string | null;
    updatedAt: string | null;
    accountStatus: string;
    communityAccess: string;
    /** Discord lifecycle — single source of truth on the profile card. */
    timeline: ProfileTimelineItem[];
  };

  referral: {
    target: number;
    completed: number;
    pending: number;
    creditsEarned: number;
    creditPerReferral: number;
    redemptionLabel: string;
    redemptionTone: StatusTone;
    /** Referral lifecycle — single source of truth on the profile card. */
    timeline: ProfileTimelineItem[];
  };

  notes: ProfileNote[];
  activity: ProfileActivityItem[];
};
