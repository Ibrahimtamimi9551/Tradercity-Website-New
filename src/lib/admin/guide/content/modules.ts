import type { ModuleGuideContent } from "@/types/admin/guide";

export const dashboardGuide: ModuleGuideContent = {
  id: "dashboard",
  title: "Dashboard",
  purpose:
    "Operations inbox that answers: what needs attention right now? It is not an analytics dashboard.",
  owns: [
    "Nothing — Dashboard monitors and routes only",
    "Presentation of queues, widgets, and System Health rollups",
  ],
  doesNotOwn: [
    "Payment verification or approval",
    "Discord sync execution",
    "Referral redeem decisions",
    "Membership lifecycle writes",
    "Any business rules invented in the frontend",
  ],
  processFlow: [
    { label: "Open Dashboard" },
    { label: "Review Operations Queue & widgets" },
    { label: "Deep-link into filtered module" },
    { label: "Resolve ticket in owning module" },
    { label: "Counters clear after DB update" },
  ],
  crossModuleFlow: [
    { label: "Dashboard surfaces queue item" },
    { label: "Routes to Subscriptions / Discord / Referrals / Members" },
    { label: "Owning module writes source of truth" },
    { label: "Dashboard reflects updated workload" },
  ],
  sourceOfTruth: [
    {
      label: "Queue counts",
      detail: "Derived from backend domain queues — frontend never invents business rules.",
    },
    {
      label: "System Health",
      detail: "Backend-computed rollup (healthy / needs_attention / action_required).",
    },
    {
      label: "Business state",
      detail: "Always owned by Subscriptions, Discord, Referrals, or Membership — never Dashboard.",
    },
  ],
  statuses: [
    {
      label: "Healthy",
      code: "healthy",
      meaning: "No operational attention required for this rollup.",
      adminAction: "No action.",
    },
    {
      label: "Needs Attention",
      code: "needs_attention",
      meaning: "Items waiting or degrading — review soon.",
      adminAction: "Open the related widget deep-link.",
    },
    {
      label: "Action Required",
      code: "action_required",
      meaning: "Admin decision or retry required now.",
      adminAction: "Resolve in the owning module immediately.",
    },
  ],
  adminWorkflow: [
    { label: "Scan Operations Queue" },
    { label: "Click widget / CTA" },
    { label: "Land in pre-filtered module view" },
    { label: "Complete ticket" },
    { label: "Confirm Dashboard count decreases" },
  ],
  relatedModules: [
    { label: "Subscriptions", tab: "subscriptions", href: "/admin/subscriptions" },
    { label: "Discord", tab: "discord", href: "/admin/discord" },
    { label: "Referral", tab: "referrals", href: "/admin/referrals" },
    { label: "Members", tab: "members", href: "/admin/members" },
  ],
};

export const membersGuide: ModuleGuideContent = {
  id: "members",
  title: "Members",
  purpose:
    "Directory and search: which users exist, and who needs attention? Not the primary work queue.",
  owns: [
    "Identity directory UX (email, Discord username link, search, filters)",
    "Presentation of System Health per member",
  ],
  doesNotOwn: [
    "Payment verification",
    "Discord sync actions",
    "Referral validation / redeem",
    "Membership writes",
    "Ticket processing",
  ],
  processFlow: [
    { label: "Open Members directory" },
    { label: "Filter by health / status / search" },
    { label: "Review row System Health" },
    { label: "Open User Profile (Control Center)" },
    { label: "Follow Manage links to owning modules" },
  ],
  crossModuleFlow: [
    { label: "Columns reflect Subscription / Discord / Referral / Membership" },
    { label: "Pending Verification widget → Subscriptions" },
    { label: "Profile reflects cards from writers" },
    { label: "Dashboard aggregates directory health" },
  ],
  sourceOfTruth: [
    {
      label: "Directory columns",
      detail: "Reflections of domain state — do not invent a second VIP flag.",
    },
    {
      label: "System Health",
      detail: "Backend-computed; frontend displays only.",
    },
    {
      label: "Membership access",
      detail: "Owned by Membership domain; Members only presents it.",
    },
  ],
  statuses: [
    {
      label: "VIP / Free",
      meaning: "Membership tier reflection from Membership domain.",
    },
    {
      label: "Subscription statuses",
      meaning:
        "active · pending_verification · verification_required · none — payment ticket reflections.",
    },
    {
      label: "Discord statuses",
      meaning: "connected · disconnected · action_required · suspended.",
    },
    {
      label: "Referral progress",
      meaning: "in_progress · eligible · waiting_admin_approval · completed.",
    },
    {
      label: "Account",
      meaning: "active · suspended — account-level, not Membership.",
    },
  ],
  adminWorkflow: [
    { label: "Search or filter members" },
    { label: "Identify action_required / needs_attention rows" },
    { label: "Open profile for full context" },
    { label: "Resolve in owning module — not in directory" },
  ],
  relatedModules: [
    { label: "User Profile", tab: "profile" },
    { label: "Dashboard", tab: "dashboard", href: "/admin" },
    { label: "Subscriptions", tab: "subscriptions", href: "/admin/subscriptions" },
    { label: "Discord", tab: "discord", href: "/admin/discord" },
    { label: "Referral", tab: "referrals", href: "/admin/referrals" },
  ],
};

export const profileGuide: ModuleGuideContent = {
  id: "profile",
  title: "User Profile",
  purpose:
    "Complete operational state of one member — reflection hub (Control Center), not a management surface.",
  owns: [
    "Internal Notes",
    "Activity Timeline presentation",
    "Layout and Manage deep-links to owning modules",
  ],
  doesNotOwn: [
    "Subscription approve / reject",
    "Discord Sync Now / role changes",
    "Referral redeem decisions",
    "Membership activation or expiry writes",
    "Suspend / delete / activate actions on Profile",
  ],
  processFlow: [
    { label: "Open member from directory or module" },
    { label: "Read Membership, Subscription, Discord, Referral cards" },
    { label: "Use Manage → owning module" },
    { label: "Return to Profile to confirm reflection" },
  ],
  crossModuleFlow: [
    { label: "Writers update database" },
    { label: "Profile cards re-read domain state" },
    { label: "Members health & Dashboard update" },
  ],
  sourceOfTruth: [
    {
      label: "Show ≠ Own",
      detail: "Every card reflects another domain. Membership Activity reads Membership domain.",
    },
    {
      label: "Subscription card",
      detail: "Payment ticket state — not VIP access SoT.",
    },
    {
      label: "Identity",
      detail: "Discord avatar/username + email; no Full Name; one Joined Date.",
    },
  ],
  statuses: [
    {
      label: "Membership reflection",
      meaning: "Active / Expired / Free and related access labels from Membership domain.",
    },
    {
      label: "Payment display",
      meaning: "Current payment ticket / verification state from Subscriptions.",
    },
    {
      label: "Discord connection & role",
      meaning: "Reflected from Discord domain.",
    },
    {
      label: "Referral progress / redeem",
      meaning: "Reflected from Referrals domain.",
    },
  ],
  adminWorkflow: [
    { label: "Read cards for full context" },
    { label: "Never approve / sync / redeem on Profile" },
    { label: "Click Manage on the owning card" },
    { label: "Complete work in module" },
    { label: "Verify Profile updated" },
  ],
  relatedModules: [
    { label: "Members", tab: "members", href: "/admin/members" },
    { label: "Subscriptions", tab: "subscriptions", href: "/admin/subscriptions" },
    { label: "Discord", tab: "discord", href: "/admin/discord" },
    { label: "Referral", tab: "referrals", href: "/admin/referrals" },
  ],
};

export const subscriptionsGuide: ModuleGuideContent = {
  id: "subscriptions",
  title: "Subscriptions",
  purpose:
    "Payment tickets and the mandatory Admin approval gateway before Membership activation. Owns all payment operations: crypto verification, manual payment, and referral-redeem activation paths under this module.",
  owns: [
    "Payment domain: hash, amount, method, wallet, verification, approval",
    "Payment timeline, proof, and disputes",
    "Crypto · Manual · Referral Redeem source views",
    "Gateway that writes Membership on Approve",
  ],
  doesNotOwn: [
    "Discord roles",
    "Membership access as source of truth (only writes on Approve)",
    "Referral ledger / credits",
    "Expired as a Subscription ticket state (expiry lives in Membership)",
  ],
  processFlow: [
    { label: "Payment submitted (crypto / manual / redeem)" },
    { label: "Blockchain / source verification (when applicable)" },
    { label: "Awaiting Admin Approval" },
    { label: "Admin Approve or Reject" },
    { label: "Membership updated on Approve" },
    { label: "Discord sync triggered" },
    { label: "Profile & Dashboard reflect" },
  ],
  crossModuleFlow: [
    { label: "Subscription Approve" },
    { label: "Writes Membership domain" },
    { label: "Membership change triggers Discord sync" },
    { label: "User Profile reflects cards" },
    { label: "Dashboard statistics update" },
  ],
  sourceOfTruth: [
    {
      label: "Payment tickets",
      detail: "Owned here — verification results and approval state.",
    },
    {
      label: "VIP access",
      detail: "Owned by Membership after Approve — payments are not SoT of VIP.",
    },
    {
      label: "Verified ≠ Activated",
      detail: "Auto-verified payments still wait for Admin approval.",
    },
  ],
  statuses: [
    {
      label: "Pending Verification / Blockchain Verifying",
      code: "blockchain_verifying",
      meaning: "Automatic blockchain verification in progress.",
      adminAction: "Wait — no admin action required.",
    },
    {
      label: "Awaiting Admin Approval",
      code: "approval_pending",
      meaning: "Auto-verified; primary Admin queue.",
      adminAction: "Review and Approve or Reject.",
    },
    {
      label: "Verification Required",
      code: "verification_required",
      meaning: "Automatic verification failed or ambiguous.",
      adminAction: "Manual review of hash / amount / network — then Approve or Reject.",
    },
    {
      label: "Approved / Successful",
      code: "approved",
      meaning: "Admin approved; Membership activating or activated.",
      adminAction: "Confirm Membership + Discord follow-through if needed.",
    },
    {
      label: "Rejected",
      code: "rejected",
      meaning: "Admin rejected the payment ticket.",
      adminAction: "No Membership write.",
    },
    {
      label: "Manual: Pending / Activated / Cancelled",
      meaning: "Manual payment sibling lifecycle — no blockchain verification path.",
    },
  ],
  adminWorkflow: [
    { label: "Payment Pending / Verifying → Wait" },
    { label: "Verification Required → Review transaction" },
    { label: "Approval Pending → Approve" },
    { label: "Membership created / extended" },
    { label: "Discord updated" },
  ],
  relatedModules: [
    { label: "Membership (backend)", tab: "architecture" },
    { label: "Discord", tab: "discord", href: "/admin/discord" },
    { label: "Referral", tab: "referrals", href: "/admin/referrals" },
    { label: "User Profile", tab: "profile" },
    { label: "Dashboard", tab: "dashboard", href: "/admin" },
  ],
};

export const discordGuide: ModuleGuideContent = {
  id: "discord",
  title: "Discord",
  purpose:
    "Keep Discord synchronized with TraderCity Membership. Sync tickets — not Discord community moderation.",
  owns: [
    "Role assignment reflection & sync status",
    "Connection state, sync logs, role history",
    "Joined Discord / Discord-side account state",
    "Sync Now / Send Invite operational actions",
  ],
  doesNotOwn: [
    "Payment logic",
    "Membership lifecycle as source of truth",
    "Inventing VIP independently of Membership",
  ],
  processFlow: [
    { label: "Membership access changes" },
    { label: "Sync requested" },
    { label: "Bot executes role update" },
    { label: "Sync status recorded" },
    { label: "Profile & Dashboard reflect" },
  ],
  crossModuleFlow: [
    { label: "Membership writer (Subscriptions / Referral / grant)" },
    { label: "Triggers Discord sync" },
    { label: "Discord never redefines Membership" },
    { label: "User Profile Discord card updates" },
  ],
  sourceOfTruth: [
    {
      label: "VIP access",
      detail: "Membership domain is master. Discord executes roles.",
    },
    {
      label: "Connection & sync",
      detail: "Owned by Discord domain in the database.",
    },
    {
      label: "Backend decides · Discord executes · DB is SoT",
      detail: "Discord is never master of VIP.",
    },
  ],
  statuses: [
    {
      label: "Connection",
      meaning: "connected · disconnected · left_server · suspended.",
    },
    {
      label: "Sync",
      meaning: "synced · pending · sync_failed · not_synced.",
      adminAction: "On sync_failed — Sync Now or investigate bot.",
    },
    {
      label: "Role",
      meaning: "vip · public · analyst · moderator — should match Membership entitlement.",
    },
  ],
  adminWorkflow: [
    { label: "Open Discord sync ticket" },
    { label: "Compare Membership vs Discord role" },
    { label: "Sync Now or Send Invite" },
    { label: "Confirm synced status" },
  ],
  relatedModules: [
    { label: "Subscriptions", tab: "subscriptions", href: "/admin/subscriptions" },
    { label: "User Profile", tab: "profile" },
    { label: "Members", tab: "members", href: "/admin/members" },
    { label: "Dashboard", tab: "dashboard", href: "/admin" },
  ],
};

export const referralsGuide: ModuleGuideContent = {
  id: "referrals",
  title: "Referral",
  purpose:
    "Track referral progress, credits, and redeem validation — what needs Admin validation?",
  owns: [
    "Referral code and successful / pending counts",
    "Credits ledger and redeem requests",
    "Program verification and eligibility",
  ],
  doesNotOwn: [
    "Marketing site referral UX",
    "Membership dates as a parallel store",
    "Payment tickets",
    "Discord roles",
    "Direct subscription changes (emits into Membership on redeem approve)",
  ],
  processFlow: [
    { label: "Referrals complete toward credit goal" },
    { label: "Member requests redeem" },
    { label: "Admin validates redeem request" },
    { label: "Approve → Membership extended" },
    { label: "Discord sync if access changed" },
    { label: "Profile & Dashboard reflect" },
  ],
  crossModuleFlow: [
    { label: "Referral redeem Approve" },
    { label: "Writes Membership extension" },
    { label: "Triggers Discord if needed" },
    { label: "Profile Referral card updates" },
    { label: "Dashboard redeem queue clears" },
  ],
  sourceOfTruth: [
    {
      label: "Credits & redeem queue",
      detail: "Owned by Referrals domain.",
    },
    {
      label: "VIP duration after redeem",
      detail: "Owned by Membership after Approve — Referrals does not store parallel access.",
    },
    {
      label: "Business rules",
      detail: "Credits accumulate; redeem requires Admin validation before Membership write.",
    },
  ],
  statuses: [
    {
      label: "Progress",
      meaning: "in_progress · completed.",
    },
    {
      label: "Redeem request",
      meaning: "none · waiting_admin_approval · approved · rejected · expired · cancelled.",
      adminAction: "waiting_admin_approval — primary Admin queue.",
    },
    {
      label: "Eligibility",
      meaning: "eligible · insufficient_credit · ineligible.",
    },
  ],
  adminWorkflow: [
    { label: "Open redeem request from Dashboard or Referrals" },
    { label: "Validate credits and program rules" },
    { label: "Approve or Reject" },
    { label: "On Approve — confirm Membership extension" },
  ],
  relatedModules: [
    { label: "Subscriptions", tab: "subscriptions", href: "/admin/subscriptions" },
    { label: "User Profile", tab: "profile" },
    { label: "Discord", tab: "discord", href: "/admin/discord" },
    { label: "Dashboard", tab: "dashboard", href: "/admin" },
  ],
};

export const moduleGuides: Record<string, ModuleGuideContent> = {
  dashboard: dashboardGuide,
  members: membersGuide,
  profile: profileGuide,
  subscriptions: subscriptionsGuide,
  discord: discordGuide,
  referrals: referralsGuide,
};
