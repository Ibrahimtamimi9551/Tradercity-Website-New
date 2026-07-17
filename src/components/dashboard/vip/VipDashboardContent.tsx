import {
  Bell,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Download,
  FileText,
  Copy,
  Share2,
  User,
  Gift,
  Shield,
  Lock,
  BookOpen,
  TrendingUp,
  Users,
  Crown,
  Calendar,
  Clock,
  MessageSquare,
  Folder,
  BarChart2,
  Check,
  HeadphonesIcon,
  Star,
  ArrowRight,
  GraduationCap,
  Eye,
  Activity,
  Target,
} from "lucide-react";
import { Cormorant_Garamond } from "next/font/google";
import TraderCityLogo from "@/components/home/navigation/TraderCityLogo";
import { MEMBERSHIP_PLANS } from "@/lib/membership/plans";

/**
 * VIP Dashboard — presentation layer aligned to Jul 2026 design reference.
 * Functionality and mock contracts preserved; UI fully refactored.
 */

const displaySerif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

/* ─── Design tokens (premium VIP palette) ─── */
const gold = "#F5D76E";
const goldSoft = "rgba(245, 215, 110, 0.14)";
const green = "#22C55E";
const cardBorder = "rgba(255,255,255,0.10)";
const panelBg = "rgba(10, 14, 24, 0.92)";

/**
 * ==========================================
 * MOCK DATA
 * ==========================================
 */
const mockUser = {
  name: "Ibrahim",
  avatar: "I",
  notifications: 3,
  tierLabel: "Prime VIP Member",
};

const mockMembership = {
  joinedDate: "08 Jun 2026",
  status: "VIP Active",
  daysRemaining: 23,
  paymentMethod: "Crypto (USDT)",
  paymentSubtext: "via Binance Pay",
  nextBillingDate: "12 Jul 2026",
  accessType: "Intelligence + Community",
  accessSubtext: "Premium reports, learning, analyst access",
  currentPlan: "VIP Monthly",
};

const mockAccessItems = [
  {
    id: 1,
    title: "Full Discord Community",
    description: "Join private channels, analyst rooms, and VIP discussions.",
    icon: MessageSquare,
    hasAccess: true,
  },
  {
    id: 2,
    title: "Complete Report Archive",
    description: "Access the full library of market research reports.",
    icon: Folder,
    hasAccess: true,
  },
  {
    id: 3,
    title: "Complete Learning Framework",
    description: "Structured learning path from beginner to advanced.",
    icon: GraduationCap,
    hasAccess: true,
  },
  {
    id: 4,
    title: "All Analyst Sections",
    description: "Follow every analyst perspective across the ecosystem.",
    icon: Users,
    hasAccess: true,
  },
  {
    id: 5,
    title: "Analyst Analysis & Insights",
    description: "Deep-dive analysis and weekly market intelligence.",
    icon: BarChart2,
    hasAccess: true,
  },
];

const mockQuickActions = [
  {
    id: 1,
    title: "View Latest Report",
    description: "Open the newest market intelligence drop.",
    icon: Eye,
  },
  {
    id: 2,
    title: "Join Discord Community",
    description: "Enter VIP channels and live discussion rooms.",
    icon: MessageSquare,
  },
  {
    id: 3,
    title: "Open Learning Hub",
    description: "Continue your structured learning path.",
    icon: BookOpen,
  },
  {
    id: 4,
    title: "Browse Analyst Insights",
    description: "Explore multi-perspective market views.",
    icon: BarChart2,
  },
  {
    id: 5,
    title: "Explore Events & Workshops",
    description: "See upcoming VIP sessions and workshops.",
    icon: Calendar,
  },
];

const mockReferral = {
  link: "tradercity.com/ref/Ibrahim",
  current: 2,
  target: 6,
  creditEarned: 20,
  rules: [
    "User registers on TraderCity",
    "User purchases any VIP plan",
    "Payment is successful",
    "Referral is recorded",
  ],
};

const mockCredits = [
  { id: 1, source: "Welcome Credit", amount: 0, expires: "—", status: "Used" },
  { id: 2, source: "Referral Credit", amount: 20, expires: "12 Aug 2026", status: "Available" },
  { id: 3, source: "Promotional Credit", amount: 0, expires: "—", status: "None" },
];

const monthlyPrice = MEMBERSHIP_PLANS.monthly.priceUsd;
const totalCredit = mockReferral.creditEarned;
const amountDue = Math.max(monthlyPrice - totalCredit, 0);

/**
 * ==========================================
 * COMPONENT: DashboardHeader
 * ==========================================
 */
function DashboardHeader() {
  return (
    <header className="mb-8 grid grid-cols-1 items-center gap-5 lg:grid-cols-[1fr_auto_1fr]">
      {/* Brand */}
      <div className="flex items-center gap-3 justify-self-start">
        <TraderCityLogo className="h-10 w-10" showGlow />
        <div className="min-w-0">
          <p
            className="truncate text-[15px] font-bold tracking-[0.22em]"
            style={{ color: gold }}
          >
            TRADERCITY
          </p>
          <p className="mt-0.5 truncate text-[10px] leading-snug text-white/65">
            Multiple Perspectives.{" "}
            <span className="font-medium text-tc-cyan">Better</span> Decisions.
          </p>
        </div>
      </div>

      {/* Center title */}
      <div className="hidden items-center gap-4 justify-self-center lg:flex">
        <span className="h-px w-16 bg-gradient-to-r from-transparent to-[#F5D76E]/70" />
        <h1
          className={`${displaySerif.className} text-[22px] font-semibold tracking-wide`}
          style={{ color: gold }}
        >
          VIP Dashboard
        </h1>
        <span className="h-px w-16 bg-gradient-to-l from-transparent to-[#F5D76E]/70" />
      </div>

      {/* Actions + profile */}
      <div className="flex items-center gap-3 justify-self-end sm:gap-4">
        <button
          type="button"
          className="hidden items-center gap-2 rounded-lg border border-tc-purple/40 bg-[#3B2A6B]/80 px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#4A3780] md:inline-flex"
        >
          <MessageSquare className="h-4 w-4 text-[#A78BFA]" />
          Open Discord
        </button>

        <button
          type="button"
          className="relative rounded-full p-2 text-white/70 transition-colors hover:bg-white/[0.06] hover:text-white"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          {mockUser.notifications > 0 ? (
            <span
              className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full"
              style={{ background: gold, boxShadow: `0 0 8px ${gold}` }}
            />
          ) : null}
        </button>

        <button
          type="button"
          className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] py-1 pl-1 pr-3 transition-colors hover:bg-white/[0.07]"
        >
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-black"
            style={{ background: gold }}
          >
            {mockUser.avatar}
          </div>
          <div className="hidden text-left sm:block">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-medium text-white">{mockUser.name}</span>
              <ChevronDown className="h-3.5 w-3.5 text-white/45" />
            </div>
            <div className="mt-0.5 flex items-center gap-1 text-[10px]" style={{ color: gold }}>
              <Crown className="h-3 w-3" />
              <span>{mockUser.tierLabel}</span>
            </div>
          </div>
        </button>
      </div>

      {/* Mobile title */}
      <div className="col-span-full flex items-center justify-center gap-3 lg:hidden">
        <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#F5D76E]/70" />
        <h1
          className={`${displaySerif.className} text-lg font-semibold tracking-wide`}
          style={{ color: gold }}
        >
          VIP Dashboard
        </h1>
        <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#F5D76E]/70" />
      </div>
    </header>
  );
}

/**
 * ==========================================
 * COMPONENT: WelcomeCard
 * ==========================================
 */
function WelcomeCard() {
  return (
    <div
      className="relative flex min-h-[340px] flex-col overflow-hidden rounded-2xl border p-7 md:p-8"
      style={{
        borderColor: "rgba(155, 93, 229, 0.35)",
        background:
          "radial-gradient(ellipse 90% 80% at 30% 20%, rgba(90, 40, 180, 0.55) 0%, transparent 55%), radial-gradient(ellipse 70% 70% at 80% 80%, rgba(10, 80, 200, 0.35) 0%, transparent 50%), linear-gradient(160deg, #1a1240 0%, #0a1630 45%, #06101f 100%)",
        boxShadow: "0 0 60px rgba(90, 40, 180, 0.18), inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-tc-purple/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-blue-500/15 blur-3xl" />

      <div className="relative z-10 flex flex-1 flex-col items-center text-center">
        <Crown className="mb-5 h-8 w-8" style={{ color: gold }} strokeWidth={1.5} />

        <div className="mb-4 flex flex-wrap items-baseline justify-center gap-x-2 gap-y-1">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-white/55">
            Welcome back,
          </span>
          <h2
            className={`${displaySerif.className} text-4xl font-semibold tracking-tight text-white md:text-5xl`}
          >
            {mockUser.name}
          </h2>
          <CheckCircle2 className="h-6 w-6 shrink-0 self-center text-[#5B9BFF] md:h-7 md:w-7" />
        </div>

        <span className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/30 px-3.5 py-1.5 text-[11px] font-medium text-white/85 backdrop-blur-sm">
          <Crown className="h-3 w-3" style={{ color: gold }} />
          {mockUser.tierLabel}
        </span>

        <p className="max-w-[280px] text-sm leading-relaxed text-white/70">
          You&apos;re inside the VIP Community. Explore. Learn. Execute.
        </p>
      </div>

      <div className="relative z-10 mt-8 grid grid-cols-3 gap-2 border-t border-white/10 pt-5">
        {[
          { icon: Target, label: "Market Context." },
          { icon: Activity, label: "Multiple Perspectives." },
          { icon: Users, label: "One Ecosystem." },
        ].map((item) => (
          <div key={item.label} className="flex flex-col items-center gap-2 text-center">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-tc-cyan/40 text-tc-cyan">
              <item.icon className="h-4 w-4" strokeWidth={1.6} />
            </div>
            <span className="text-[10px] leading-tight text-white/60">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * ==========================================
 * COMPONENT: MembershipOverview
 * ==========================================
 */
function MembershipOverview() {
  const fields = [
    {
      label: "Joined On",
      icon: Calendar,
      value: mockMembership.joinedDate,
    },
    {
      label: "Membership Status",
      icon: Shield,
      value: mockMembership.status,
      status: true,
    },
    {
      label: "Days Remaining",
      icon: Clock,
      value: `${mockMembership.daysRemaining} Days`,
      highlight: true,
    },
    {
      label: "Payment Method",
      icon: TrendingUp,
      value: mockMembership.paymentMethod,
      sub: mockMembership.paymentSubtext,
    },
    {
      label: "Next Billing Date",
      icon: Calendar,
      value: mockMembership.nextBillingDate,
    },
    {
      label: "Member Access",
      icon: User,
      value: mockMembership.accessType,
      sub: mockMembership.accessSubtext,
    },
  ];

  return (
    <div
      className="flex min-h-[340px] flex-col rounded-2xl border p-6 md:p-7"
      style={{ borderColor: cardBorder, background: panelBg }}
    >
      <div className="mb-5 flex items-center gap-2">
        <Crown className="h-4 w-4 text-tc-purple" />
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-tc-purple">
          Membership Overview
        </h3>
      </div>

      <div className="mb-5 grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2">
        {fields.map((field) => (
          <div
            key={field.label}
            className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-4"
          >
            <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-white/40">
              <field.icon className="h-3.5 w-3.5" style={{ color: gold }} />
              {field.label}
            </div>

            {"status" in field && field.status ? (
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-medium text-white">{field.value}</span>
                <span
                  className="inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-semibold"
                  style={{
                    color: green,
                    borderColor: "rgba(34,197,94,0.35)",
                    background: "rgba(34,197,94,0.1)",
                  }}
                >
                  <span
                    className="h-1.5 w-1.5 animate-pulse rounded-full"
                    style={{ background: green, boxShadow: `0 0 6px ${green}` }}
                  />
                  Active
                </span>
              </div>
            ) : (
              <div
                className={
                  "highlight" in field && field.highlight
                    ? "text-2xl font-bold md:text-3xl"
                    : "text-[15px] font-medium text-white"
                }
                style={"highlight" in field && field.highlight ? { color: gold } : undefined}
              >
                {field.value}
              </div>
            )}

            {"sub" in field && field.sub ? (
              <p className="mt-1 text-[11px] leading-snug text-white/40">{field.sub}</p>
            ) : null}
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/15 py-2.5 text-sm font-medium text-white/85 transition-colors hover:border-white/25 hover:bg-white/[0.04]"
        >
          <Download className="h-4 w-4" />
          Download Invoice
        </button>
        <button
          type="button"
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/15 py-2.5 text-sm font-medium text-white/85 transition-colors hover:border-white/25 hover:bg-white/[0.04]"
        >
          <FileText className="h-4 w-4" />
          Billing History
        </button>
      </div>
    </div>
  );
}

/**
 * ==========================================
 * COMPONENT: YourAccess
 * ==========================================
 */
function YourAccess() {
  return (
    <section
      className="rounded-2xl border p-5 md:p-6"
      style={{ borderColor: cardBorder, background: panelBg }}
    >
      <div className="mb-4 flex items-center gap-2">
        <Shield className="h-4 w-4 text-tc-purple" />
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-tc-purple">
          Your Access
        </h3>
      </div>

      <ul className="space-y-2">
        {mockAccessItems.map((item) => (
          <li key={item.id}>
            <div className="group flex items-center gap-3 rounded-xl border border-transparent px-3 py-3 transition-colors hover:border-white/[0.06] hover:bg-white/[0.03]">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#5B9BFF]/25 bg-[#5B9BFF]/10 text-[#7EB6FF]">
                <item.icon className="h-5 w-5" strokeWidth={1.6} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-white">{item.title}</p>
                <p className="truncate text-[11px] text-white/45">{item.description}</p>
              </div>
              <div
                className="hidden shrink-0 items-center gap-1.5 text-[11px] font-semibold sm:flex"
                style={{ color: green }}
              >
                <Check className="h-3.5 w-3.5" strokeWidth={3} />
                Access Granted
                <ChevronRight className="h-3.5 w-3.5 text-white/25" />
              </div>
              <Check
                className="h-4 w-4 shrink-0 sm:hidden"
                style={{ color: green }}
                strokeWidth={3}
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * ==========================================
 * COMPONENT: QuickActions
 * ==========================================
 */
function QuickActions() {
  return (
    <section
      className="rounded-2xl border p-5 md:p-6"
      style={{ borderColor: cardBorder, background: panelBg }}
    >
      <div className="mb-4 flex items-center gap-2">
        <Star className="h-4 w-4" style={{ color: gold }} />
        <h3 className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: gold }}>
          Quick Actions
        </h3>
      </div>

      <ul className="space-y-2">
        {mockQuickActions.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              className="group flex w-full items-center gap-3 rounded-xl border border-transparent px-3 py-3 text-left transition-colors hover:border-white/[0.08] hover:bg-white/[0.04]"
            >
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border"
                style={{
                  borderColor: "rgba(245, 215, 110, 0.25)",
                  background: goldSoft,
                  color: gold,
                }}
              >
                <item.icon className="h-5 w-5" strokeWidth={1.6} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-white">{item.title}</p>
                <p className="truncate text-[11px] text-white/45">{item.description}</p>
              </div>
              <ChevronRight className="h-4 w-4 shrink-0 text-white/30 transition-transform group-hover:translate-x-0.5 group-hover:text-white/55" />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * ==========================================
 * COMPONENT: ReferralCentre
 * ==========================================
 */
function ReferralCentre() {
  const remaining = mockReferral.target - mockReferral.current;

  return (
    <section
      className="relative mb-6 overflow-hidden rounded-2xl border p-5 md:p-6"
      style={{
        borderColor: "rgba(59, 130, 246, 0.28)",
        background:
          "radial-gradient(ellipse 60% 80% at 50% 0%, rgba(37, 99, 235, 0.12) 0%, transparent 55%), rgba(6, 10, 22, 0.95)",
      }}
    >
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <Users className="h-4 w-4 text-[#60A5FA]" />
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#60A5FA]">
          Referral Centre
        </h3>
        <span className="hidden text-xs text-white/45 md:inline">
          Refer {mockReferral.target} VIP members and unlock your next month free.
        </span>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="rounded-xl border border-blue-500/20 bg-[#080e1c]/80 p-5">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-[#60A5FA]">
            Your Referral Link
          </p>
          <div className="mb-4 flex items-center rounded-lg border border-blue-500/25 bg-[#02060f] p-1.5">
            <Lock className="mx-2 h-4 w-4 shrink-0 text-white/35" />
            <input
              type="text"
              readOnly
              value={mockReferral.link}
              className="min-w-0 flex-1 bg-transparent text-sm text-white/75 outline-none"
            />
            <button
              type="button"
              className="rounded p-2 text-white/45 transition-colors hover:bg-blue-500/20 hover:text-white"
              aria-label="Copy referral link"
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>

          <div className="mb-5 flex gap-3">
            <button
              type="button"
              className="flex-1 rounded-lg border border-blue-500/30 py-2 text-sm font-medium text-white/75 transition-colors hover:bg-blue-500/15"
            >
              Edit Link
            </button>
            <button
              type="button"
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#2563EB] py-2 text-sm font-medium text-white shadow-[0_0_18px_rgba(37,99,235,0.35)] transition-colors hover:bg-[#3B82F6]"
            >
              <Share2 className="h-3.5 w-3.5" />
              Share Link
            </button>
          </div>

          <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-[#60A5FA]">
            Referral Rules
          </p>
          <ul className="space-y-2">
            {mockReferral.rules.map((rule) => (
              <li key={rule} className="flex items-start gap-2 text-[13px] text-white/55">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: green }} strokeWidth={3} />
                {rule}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-center justify-center rounded-xl border border-blue-500/20 bg-[#080e1c]/80 p-5 text-center">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[#60A5FA]">
            Your Progress
          </p>
          <p className="mb-6 text-lg font-semibold text-white md:text-xl">
            <span style={{ color: gold }}>{mockReferral.current}</span>
            <span className="text-white/40"> / {mockReferral.target}</span>
            <span className="block text-sm font-normal text-white/55 md:ml-2 md:inline">
              VIP Referrals Completed
            </span>
          </p>

          <div className="mb-6 flex flex-wrap justify-center gap-2.5">
            {Array.from({ length: mockReferral.target }).map((_, i) => {
              const filled = i < mockReferral.current;
              return (
                <div
                  key={i}
                  className="flex h-11 w-11 items-center justify-center rounded-full border"
                  style={{
                    borderColor: filled ? "rgba(59,130,246,0.7)" : "rgba(255,255,255,0.12)",
                    background: filled
                      ? "linear-gradient(145deg, #3B82F6, #1D4ED8)"
                      : "#02060f",
                    boxShadow: filled ? "0 0 14px rgba(59,130,246,0.4)" : undefined,
                  }}
                >
                  <User className={`h-4 w-4 ${filled ? "text-white" : "text-white/30"}`} />
                </div>
              );
            })}
          </div>

          <div className="grid w-full grid-cols-3 gap-2">
            {[
              { label: "Successful Referrals", value: String(mockReferral.current) },
              {
                label: "Referral Credits",
                value: `$${mockReferral.creditEarned.toFixed(2)}`,
              },
              { label: "Referrals Remaining", value: String(remaining) },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-2 py-2.5"
              >
                <p className="text-sm font-bold text-white">{stat.value}</p>
                <p className="mt-0.5 text-[9px] leading-tight text-white/40">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-xl border border-blue-400/30 bg-[#080e1c]/80 p-5 text-center">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.18)_0%,transparent_60%)]" />
          <p className="relative z-10 mb-5 text-[10px] font-bold uppercase tracking-wider text-[#60A5FA]">
            Reward Unlock
          </p>
          <div className="relative z-10 mb-5 flex h-24 w-24 items-center justify-center rounded-2xl border border-blue-300/30 bg-gradient-to-br from-blue-400 via-blue-600 to-blue-900 shadow-[0_0_40px_rgba(37,99,235,0.45)]">
            <Gift className="h-12 w-12 text-white" strokeWidth={1.4} />
          </div>
          <h4 className="relative z-10 mb-2 text-lg font-bold text-white">
            Unlock Next Month Free
          </h4>
          <p className="relative z-10 text-sm text-white/50">
            {mockReferral.current} / {mockReferral.target} Completed
          </p>
        </div>
      </div>
    </section>
  );
}

/**
 * ==========================================
 * COMPONENT: RenewalCentre
 * ==========================================
 */
function RenewalCentre() {
  return (
    <section className="mb-6">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Shield className="h-4 w-4" style={{ color: gold }} />
        <h3 className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: gold }}>
          Renewal Centre
        </h3>
        <span className="hidden text-xs text-white/45 md:inline">
          Secure your next month before expiration.
        </span>
      </div>

      <div
        className="rounded-2xl border p-5 md:p-6"
        style={{
          borderColor: "rgba(245, 215, 110, 0.28)",
          background: panelBg,
          boxShadow: "0 0 40px rgba(245, 215, 110, 0.06)",
        }}
      >
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-white/[0.08] pb-5">
          <div>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-white/40">
              Current Plan
            </p>
            <p className="text-lg font-semibold text-white">{mockMembership.currentPlan}</p>
          </div>
          <div>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-white/40">
              Days Remaining
            </p>
            <p className="text-2xl font-bold" style={{ color: gold }}>
              {mockMembership.daysRemaining} Days
            </p>
          </div>
          <div>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-white/40">
              Expires On
            </p>
            <p className="text-lg font-medium text-white">{mockMembership.nextBillingDate}</p>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 md:p-5">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-wider text-white/45">
              Credit Breakdown
            </p>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[280px] text-left text-sm">
                <thead>
                  <tr className="border-b border-white/[0.08] text-[10px] uppercase tracking-wider text-white/35">
                    <th className="pb-2 font-semibold">Source</th>
                    <th className="pb-2 font-semibold">Amount</th>
                    <th className="pb-2 font-semibold">Expires</th>
                    <th className="pb-2 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockCredits.map((row) => (
                    <tr key={row.id} className="border-b border-white/[0.05] text-white/70">
                      <td className="py-2.5">{row.source}</td>
                      <td className="py-2.5">
                        {row.amount > 0 ? `$${row.amount.toFixed(2)}` : "—"}
                      </td>
                      <td className="py-2.5 text-white/45">{row.expires}</td>
                      <td className="py-2.5">
                        <span
                          className={
                            row.status === "Available" ? "font-medium" : "text-white/40"
                          }
                          style={row.status === "Available" ? { color: green } : undefined}
                        >
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div
              className="mt-4 flex items-center justify-between rounded-lg border px-3 py-2.5"
              style={{
                borderColor: "rgba(34,197,94,0.3)",
                background: "rgba(34,197,94,0.08)",
              }}
            >
              <span className="text-xs font-medium text-white/70">Total Available Credit</span>
              <span className="text-lg font-bold" style={{ color: green }}>
                ${totalCredit.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="flex flex-col rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 md:p-5">
            <div
              className="mb-4 rounded-xl border px-4 py-3"
              style={{
                borderColor: "rgba(34,197,94,0.3)",
                background: "rgba(34,197,94,0.08)",
              }}
            >
              <p className="text-[10px] font-bold uppercase tracking-wider text-white/45">
                Total Available Credit
              </p>
              <p className="mt-1 text-3xl font-bold" style={{ color: green }}>
                ${totalCredit.toFixed(2)}
              </p>
            </div>

            <div className="mb-4 space-y-2.5 rounded-xl border border-white/[0.08] bg-black/20 px-4 py-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/50">Standard Price</span>
                <span className="text-white">${monthlyPrice.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/50">Total Discounts</span>
                <span style={{ color: green }}>-${totalCredit.toFixed(2)}</span>
              </div>
              <div className="border-t border-white/[0.08] pt-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white/70">Amount After Credit</span>
                  <span className="text-2xl font-bold" style={{ color: gold }}>
                    ${amountDue.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="mt-auto flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-black transition-opacity hover:opacity-90"
              style={{
                background: `linear-gradient(90deg, #E8C24A, ${gold})`,
                boxShadow: "0 0 28px rgba(245, 215, 110, 0.28)",
              }}
            >
              Renew Membership
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="border-t border-white/[0.08] pt-5">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-wider text-white/40">
            Why Renew Early?
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Lock,
                title: "No interruption in access",
                desc: "Stay connected to reports, analysts, and community.",
              },
              {
                icon: BookOpen,
                title: "Continue your learning journey",
                desc: "Maintain continuity across the complete framework.",
              },
              {
                icon: TrendingUp,
                title: "Keep your progress and history",
                desc: "Preserve your journey and VIP member progression.",
              },
              {
                icon: Users,
                title: "Support the ecosystem",
                desc: "Strengthen the intelligence network behind TraderCity.",
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <item.icon
                  className="mt-0.5 h-5 w-5 shrink-0"
                  style={{ color: gold }}
                  strokeWidth={1.6}
                />
                <div>
                  <p className="text-xs font-semibold text-white/85">{item.title}</p>
                  <p className="mt-0.5 text-[11px] leading-snug text-white/40">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * ==========================================
 * COMPONENT: DashboardFooter
 * ==========================================
 */
function DashboardFooter() {
  return (
    <footer className="mt-4 flex flex-col items-center justify-between gap-4 border-t border-white/[0.08] py-8 text-sm md:flex-row">
      <div className="flex items-center gap-2.5">
        <TraderCityLogo className="h-7 w-7 opacity-80" />
        <div>
          <p className="text-xs font-bold tracking-[0.2em] text-white/80">TRADERCITY</p>
          <p className="text-[10px] text-white/40">Multiple Perspectives. Better Decisions.</p>
        </div>
      </div>

      <p className="text-center text-xs text-white/40">
        One Ecosystem. Multiple Experts. Better Context.
      </p>

      <button
        type="button"
        className="flex items-center gap-2 font-medium transition-colors hover:opacity-80"
        style={{ color: gold }}
      >
        <HeadphonesIcon className="h-4 w-4" />
        Contact Support
      </button>
    </footer>
  );
}

/**
 * ==========================================
 * MAIN: VIP Dashboard Content
 * ==========================================
 */
export default function VipDashboardContent() {
  return (
    <div className="min-h-screen font-sans selection:bg-[#F5D76E]/25">
      <div className="mx-auto max-w-[1400px] px-4 py-6 md:px-8 md:py-8">
        <DashboardHeader />

        <main>
          <section className="mb-6 grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.35fr)]">
            <WelcomeCard />
            <MembershipOverview />
          </section>

          <section className="mb-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
            <YourAccess />
            <QuickActions />
          </section>

          <ReferralCentre />
          <RenewalCentre />
        </main>

        <DashboardFooter />
      </div>
    </div>
  );
}
