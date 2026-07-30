import type {
  ArchitectureGuideContent,
  GlossaryTerm,
  TroubleshootingScenario,
} from "@/types/admin/guide";

export const architectureContent: ArchitectureGuideContent = {
  intro:
    "Visual reference for TraderCity operational architecture. Membership is a backend domain — not a sidebar page. Modules write; Profile reflects; Discord executes roles.",
  membershipNote:
    "Membership Domain owns plan, VIP/access status, activation/expiry, days remaining, and renewals. Writers: Subscriptions (Approve), Referral redeem, Manual activation, future grants. Readers: Dashboard, Members, Profile, Discord triggers. Never create a sidebar Membership page or editable VIP fields on Profile.",
  diagrams: [
    {
      id: "registration",
      title: "Registration Lifecycle",
      description: "Account creation through Free baseline access.",
      steps: [
        { label: "User registers" },
        { label: "Account created (active)" },
        { label: "Membership = Free" },
        { label: "Discord public (if connected)" },
        { label: "Appears in Members directory" },
      ],
    },
    {
      id: "membership",
      title: "Membership Lifecycle",
      description: "Access source of truth — written only by approved writers.",
      steps: [
        { label: "Writer Approve (Subscription / Redeem / Grant)" },
        { label: "Membership domain updates access" },
        { label: "VIP Active with expiry" },
        { label: "Discord sync requested" },
        { label: "Profile Membership Activity reflects" },
        { label: "Expiry job → Free / Expired → Discord demote" },
      ],
    },
    {
      id: "subscription",
      title: "Subscription Lifecycle",
      description: "Crypto / manual / referral-redeem payment paths under Subscriptions.",
      steps: [
        { label: "Payment submitted" },
        { label: "Blockchain / source verification" },
        { label: "Awaiting Admin Approval" },
        { label: "Admin Approve" },
        { label: "Membership write" },
        { label: "Discord sync" },
        { label: "Profile & Dashboard update" },
      ],
    },
    {
      id: "discord-sync",
      title: "Discord Synchronization Flow",
      steps: [
        { label: "Membership access changes" },
        { label: "Sync ticket created" },
        { label: "Bot applies role" },
        { label: "Sync status = synced or sync_failed" },
        { label: "Admin Sync Now on failure" },
      ],
    },
    {
      id: "referral",
      title: "Referral Flow",
      steps: [
        { label: "Successful referrals accrue credits" },
        { label: "Eligible for redeem" },
        { label: "Member requests redeem" },
        { label: "Admin validates" },
        { label: "Approve → Membership extended" },
        { label: "Discord sync if access changed" },
      ],
    },
    {
      id: "profile-reflection",
      title: "User Profile Reflection",
      steps: [
        { label: "Domain writers update DB" },
        { label: "Profile cards re-read domains" },
        { label: "Manage links open owners" },
        { label: "No management actions on Profile" },
      ],
    },
    {
      id: "cross-module",
      title: "Cross Module Data Synchronization",
      steps: [
        { label: "Action in owning module" },
        { label: "Database write (SoT)" },
        { label: "Dependent domains notified (e.g. Discord)" },
        { label: "Profile reflects" },
        { label: "Members System Health updates" },
        { label: "Dashboard queues clear" },
      ],
    },
    {
      id: "ssot",
      title: "Single Source of Truth Architecture",
      description: "One owner per fact. Reflections never become writers.",
      steps: [
        { label: "Payments → Subscriptions" },
        { label: "Access / VIP → Membership domain" },
        { label: "Roles / sync → Discord" },
        { label: "Credits / redeem → Referrals" },
        { label: "Directory / Profile / Dashboard → read & route only" },
      ],
    },
  ],
};

export const glossaryTerms: GlossaryTerm[] = [
  {
    term: "Membership",
    definition:
      "Backend domain that owns VIP/access, plan, activation, and expiry. Not an Admin sidebar page.",
  },
  {
    term: "Subscription",
    definition:
      "Payment ticket domain under Subscriptions — crypto, manual, and referral-redeem sources. Owns verification and Admin approval gateway.",
  },
  {
    term: "Blockchain Verification",
    definition:
      "Automatic on-chain check of a crypto payment (hash, amount, network, wallet).",
  },
  {
    term: "Pending Verification",
    definition:
      "Display label for blockchain_verifying — auto verification in progress; no Admin action.",
  },
  {
    term: "Verification Required",
    definition:
      "Auto verification failed or ambiguous; Admin must manually review before Approve/Reject.",
  },
  {
    term: "Awaiting Admin Approval",
    definition:
      "Code approval_pending — payment verified; Membership not yet activated until Admin Approves.",
  },
  {
    term: "Membership Domain",
    definition:
      "Canonical access source of truth. Writers: Subscriptions Approve, Referral redeem, grants.",
  },
  {
    term: "Source of Truth",
    definition:
      "The single module or backend domain that owns a fact. Others reflect or react — never duplicate.",
  },
  {
    term: "Synchronization",
    definition:
      "Process of aligning Discord roles (and other dependents) with Membership after a write.",
  },
  {
    term: "Referral Credit",
    definition:
      "Ledger unit earned from successful referrals; redeem requires Admin validation.",
  },
  {
    term: "Operations Queue",
    definition:
      "Dashboard inbox of tickets needing Admin attention across domains.",
  },
  {
    term: "Manual Activation",
    definition:
      "Admin-driven activation path without blockchain verification (manual payment source).",
  },
  {
    term: "Auto Verification",
    definition:
      "System attempt to verify a crypto payment before it enters the Admin approval queue.",
  },
  {
    term: "Verified ≠ Activated",
    definition:
      "A verified payment still requires Admin approval before Membership is written.",
  },
  {
    term: "System Health",
    definition:
      "Backend-computed member rollup: healthy · needs_attention · action_required.",
  },
  {
    term: "Reflection",
    definition:
      "Read-only presentation of another domain’s state (e.g. User Profile cards).",
  },
  {
    term: "Management Module",
    definition:
      "Module that performs writes: Subscriptions, Discord, Referrals.",
  },
];

export const troubleshootingScenarios: TroubleshootingScenario[] = [
  {
    id: "paid-not-vip",
    title: "Payment verified but VIP not activated",
    possibleCauses: [
      "Admin has not Approved (Verified ≠ Activated)",
      "Membership writer failed after Approve",
      "Looking at payment status instead of Membership",
    ],
    expectedBehavior:
      "After Approve, Membership becomes Active/VIP and Profile Membership Activity updates.",
    resolution: [
      { label: "Open Subscriptions ticket" },
      { label: "Confirm status is approval_pending or approved" },
      { label: "Approve if still pending" },
      { label: "If approved but not VIP — re-check Membership write / escalate writer failure" },
    ],
    responsibleModule: "Subscriptions",
    relatedHref: "/admin/subscriptions",
    relatedTab: "subscriptions",
  },
  {
    id: "discord-role",
    title: "Discord role not updated",
    possibleCauses: [
      "Sync pending or sync_failed",
      "Member left server / disconnected",
      "Membership changed but sync never ran",
    ],
    expectedBehavior:
      "Discord role matches Membership entitlement after sync completes.",
    resolution: [
      { label: "Compare Membership vs Discord role on Profile" },
      { label: "Open Discord module ticket" },
      { label: "Sync Now or Send Invite" },
      { label: "Confirm sync = synced" },
    ],
    responsibleModule: "Discord",
    relatedHref: "/admin/discord",
    relatedTab: "discord",
  },
  {
    id: "referral-credits",
    title: "Referral credits missing",
    possibleCauses: [
      "Referral not counted as successful yet",
      "Ledger vs display cache mismatch (mock/dev)",
      "Wrong member / code",
    ],
    expectedBehavior:
      "Successful referrals increment credits and progress toward eligibility.",
    resolution: [
      { label: "Open Referrals for the member" },
      { label: "Verify successful vs pending counts" },
      { label: "Confirm eligibility rules" },
      { label: "Do not invent credits outside Referrals domain" },
    ],
    responsibleModule: "Referrals",
    relatedHref: "/admin/referrals",
    relatedTab: "referrals",
  },
  {
    id: "vip-access",
    title: "Member cannot access VIP",
    possibleCauses: [
      "Membership expired or Free",
      "Payment never Approved",
      "Discord role wrong (product still gates on Membership)",
      "Account suspended",
    ],
    expectedBehavior:
      "VIP product access follows Membership domain — not Discord alone.",
    resolution: [
      { label: "Check Membership on User Profile" },
      { label: "If Free with paid ticket — resolve in Subscriptions" },
      { label: "If VIP but Discord wrong — Discord Sync" },
      { label: "If account suspended — account status workflow" },
    ],
    responsibleModule: "Membership (via Subscriptions / Profile)",
    relatedTab: "profile",
  },
  {
    id: "auto-verify-failed",
    title: "Auto verification failed",
    possibleCauses: [
      "Amount / network / wallet / hash mismatch",
      "Duplicate or unknown transaction",
      "Timeout or chain failure",
    ],
    expectedBehavior:
      "Ticket moves to Verification Required for manual Admin review.",
    resolution: [
      { label: "Open ticket in Subscriptions" },
      { label: "Review failure reason and transaction proof" },
      { label: "Approve or Reject" },
      { label: "On Approve — Membership write proceeds" },
    ],
    responsibleModule: "Subscriptions",
    relatedHref: "/admin/subscriptions",
    relatedTab: "subscriptions",
  },
  {
    id: "sync-failed",
    title: "Sync failed",
    possibleCauses: [
      "Bot outage or permission issue",
      "Member left Discord",
      "Transient API failure",
    ],
    expectedBehavior:
      "sync_failed surfaces on Dashboard / Discord queue until resolved.",
    resolution: [
      { label: "Open Discord ticket" },
      { label: "Confirm connection state" },
      { label: "Retry Sync Now" },
      { label: "If repeated failure — escalate bot / permissions" },
    ],
    responsibleModule: "Discord",
    relatedHref: "/admin/discord",
    relatedTab: "discord",
  },
  {
    id: "orphan-discord-vip",
    title: "Membership Free but Discord still VIP",
    possibleCauses: [
      "Expiry demote sync failed",
      "Manual Discord role drift",
    ],
    expectedBehavior:
      "Discord VIP role is removed when Membership is Free/Expired.",
    resolution: [
      { label: "Confirm Membership is Free/Expired" },
      { label: "Open Discord sync ticket" },
      { label: "Sync Now to demote" },
    ],
    responsibleModule: "Discord",
    relatedHref: "/admin/discord",
    relatedTab: "discord",
  },
  {
    id: "redeem-not-extended",
    title: "Redeem approved but Membership not extended",
    possibleCauses: [
      "Membership writer gap after redeem Approve",
      "Looking at Referral card instead of Membership Activity",
    ],
    expectedBehavior:
      "Redeem Approve extends Membership; Profile Membership Activity updates.",
    resolution: [
      { label: "Confirm redeem status = approved" },
      { label: "Check Membership Activity on Profile" },
      { label: "If missing — escalate Membership writer failure" },
    ],
    responsibleModule: "Referrals → Membership",
    relatedHref: "/admin/referrals",
    relatedTab: "referrals",
  },
];
