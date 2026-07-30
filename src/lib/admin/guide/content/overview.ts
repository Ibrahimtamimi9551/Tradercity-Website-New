import type { OverviewGuideContent } from "@/types/admin/guide";

export const overviewContent: OverviewGuideContent = {
  philosophy: [
    "TraderCity Admin is an Operations Center — not a collection of CRUD pages.",
    "The homepage sells TraderCity. The Admin Dashboard operates TraderCity. Those are two different products.",
    "Every screen exists to help administrators resolve operational work — not browse data.",
    "Every module owns one responsibility. Every piece of information has one source of truth: the database.",
  ],
  adminPurpose: [
    "Surface work that needs attention through the Dashboard operations inbox.",
    "Resolve payment, Discord, and referral tickets in their owning modules.",
    "Reflect complete member state in User Profile without duplicating management actions.",
    "Keep Membership access as a backend domain — modules write into it; Profile and Discord react to it.",
  ],
  memberLifecycle: [
    { label: "Registration", description: "Account created; Free access by default." },
    { label: "Payment submitted", description: "Crypto, manual, or referral redeem path begins." },
    { label: "Verification & approval", description: "Auto-verify where possible; Admin approves gateway." },
    { label: "Membership activated", description: "VIP access written by Membership domain." },
    { label: "Discord synchronized", description: "Roles follow Membership — Discord is never master of VIP." },
    { label: "Profile & Dashboard reflect", description: "One Loop: action → DB → Profile → Members health → Dashboard." },
  ],
  operationalLoop: [
    { label: "Admin acts in owning module" },
    { label: "Backend writes database (source of truth)" },
    { label: "User Profile reflects updated state" },
    { label: "Members directory System Health updates" },
    { label: "Dashboard queues and widgets clear" },
  ],
  principles: [
    {
      title: "Management vs Reflection",
      body: "Subscriptions, Discord, and Referrals perform actions. User Profile reflects state and deep-links to owners.",
    },
    {
      title: "Single Source of Truth",
      body: "PostgreSQL / backend decides. Frontend displays. Never invent a second VIP flag or parallel Membership store.",
    },
    {
      title: "Verified ≠ Activated",
      body: "A verified payment still requires Admin approval before Membership is activated.",
    },
    {
      title: "Action-driven navigation",
      body: "Dashboard widgets deep-link into pre-filtered module views so admins resolve work — never hunt for it.",
    },
  ],
};
