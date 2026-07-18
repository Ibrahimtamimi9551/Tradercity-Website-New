/**
 * Free Dashboard content — DESIGN FROZEN.
 * Preserve layout, hierarchy, spacing, typography, and UX.
 * Card surfaces use freeCardSurface (Admin-equivalent opaque logic).
 */
import {
  Bell,
  ChevronDown,
  Check,
  Lock,
  Gift,
  Users,
  BookOpen,
  MessageSquare,
  Clock,
  ShieldCheck,
  User,
  Crown,
  Share2,
  Copy,
  Eye,
  Star,
  Calendar,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import TraderCityLogo from "@/components/home/navigation/TraderCityLogo";
import { MEMBERSHIP_PLANS } from "@/lib/membership/plans";
import {
  MONTHLY_WELCOME_UPGRADE_CTA,
  WELCOME_CREDIT,
} from "@/lib/membership/pricing";
import {
  freeCardSurface,
  freeInsetSurface,
  freeWellSurface,
} from "./free-surfaces";

// --- MOCK DATA ---
const mockUser = { name: "Ibrahim", avatar: "I", notifications: 2 };

const mockHeroStatus = {
  memberSince: "08 Jun 2026",
  daysAgo: "7 Days Ago",
  currentPlan: "Free Member",
  welcomeCredit: WELCOME_CREDIT.amountUsd,
  creditExpiry: "1D : 16H : 32M : 16S",
  discordStatus: "Activated",
};

const mockComparison = {
  free: [
    { id: 1, title: "Free Discord Access", desc: "Access to free discord channels", type: "check" },
    { id: 2, title: "Community Discussions", desc: "Participate in public discussions", type: "check" },
    { id: 3, title: "Public Market Analysis", desc: "Access to public analysis & updates", type: "check" },
    { id: 4, title: "Limited Reports", desc: "Access to limited reports", type: "count", value: "15", total: "400", label: "Reports" },
    { id: 5, title: "Limited Lessons", desc: "Access to limited lessons", type: "count", value: "15", total: "200", label: "Lessons" },
  ],
  vip: [
    { id: 1, title: "Full Discord Access", desc: "All VIP channels & analyst rooms" },
    { id: 2, title: "Full Education Framework", desc: "200+ lessons across all levels" },
    { id: 3, title: "Full Report Library", desc: "400+ premium reports" },
    { id: 4, title: "Weekly BTC Microstructure Report", desc: "Published weekly by our lead analysts" },
    { id: 5, title: "Weekly Quant Research Report", desc: "Advanced quantitative market insights" },
    { id: 6, title: "Multiple Market Perspectives", desc: "Different analysts, different edge" },
    { id: 7, title: "VIP Events & Workshops", desc: "Live sessions, Q&A and workshops" },
    { id: 8, title: "30 Days Full Access", desc: "Full access for the entire month" },
  ],
};

const mockReferral = {
  link: "tradercity.com/ref/Ibrahim",
  current: 0,
  target: 5,
  rules: [
    "User registers on TraderCity",
    "User purchases any VIP plan",
    "Payment is successful",
    "Referral is recorded",
  ],
};

// --- COMPONENTS ---

function DashboardHeader() {
  return (
    <header className="mb-8 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <TraderCityLogo className="h-10 w-10" showGlow />
        <div className="min-w-0">
          <h1 className="truncate text-[15px] font-bold tracking-[0.22em] text-white">
            TRADERCITY
          </h1>
          <p className="mt-0.5 truncate text-[10px] leading-snug text-white/65">
            Multiple Perspectives.{" "}
            <span className="font-medium text-tc-cyan">Better</span> Decisions.
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="hidden items-center gap-2 rounded-lg border border-purple-500/50 px-4 py-2 text-sm font-medium text-purple-400 transition-colors hover:bg-purple-500/10 md:flex"
        >
          <MessageSquare className="h-4 w-4" /> Open Discord{" "}
          <ArrowRight className="ml-1 h-4 w-4" />
        </button>
        <div className="relative cursor-pointer rounded-full p-2 transition-colors hover:bg-[#1a1423]">
          <Bell className="h-5 w-5 text-purple-400" />
          <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            {mockUser.notifications}
          </span>
        </div>
        <div className="flex cursor-pointer items-center gap-3 rounded-full border border-[#2d1b4e] bg-[#110a1a] p-1 pr-4 transition-colors hover:bg-[#1a0f2e]">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-700 font-bold text-white">
            {mockUser.avatar}
          </div>
          <span className="text-sm font-medium text-white">{mockUser.name}</span>
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </div>
      </div>
    </header>
  );
}

function FreeHeroSection() {
  return (
    <section className="mb-6 grid grid-cols-1 items-start gap-5 xl:grid-cols-2">
      {/* Welcome hero — premium two-column card */}
      <div
        className={freeCardSurface(
          "purple",
          "relative overflow-hidden rounded-3xl border-purple-500/20 px-7 py-6 md:px-8 md:py-7"
        )}
      >
        {/* Soft purple ambient light */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 top-0 h-48 w-48 rounded-full bg-purple-600/[0.12] blur-[80px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 bottom-0 h-40 w-40 rounded-full bg-purple-500/[0.08] blur-[70px]"
        />
        {/* Low-opacity grid on card surface */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(155,93,229,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(155,93,229,0.9) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative z-10 grid grid-cols-1 items-center gap-6 md:grid-cols-[1.65fr_1fr] md:gap-6">
          {/* Left — copy */}
          <div className="min-w-0 text-left">
            <p className="mb-1.5 text-sm font-medium text-purple-400">
              Welcome back,
            </p>
            <h2 className="mb-3 text-4xl font-bold tracking-tight text-white md:text-5xl">
              {mockUser.name}.
            </h2>
            <div>
              <p className="text-2xl font-bold leading-tight text-white md:text-[1.85rem]">
                You&apos;re exploring
              </p>
              <p className="mt-0.5 bg-gradient-to-r from-[#C084FC] via-[#A78BFA] to-[#9B5DE5] bg-clip-text text-2xl font-bold leading-tight text-transparent md:text-[2rem]">
                the Free Community.
              </p>
            </div>
          </div>

          {/* Right — illustration panel */}
          <div className="flex justify-center md:justify-end">
            <div
              className="relative flex h-[140px] w-[140px] items-center justify-center overflow-hidden rounded-2xl border border-purple-500/30 md:h-[152px] md:w-[152px]"
              style={{
                background:
                  "linear-gradient(165deg, #12101f 0%, #0c0a16 55%, #0a0812 100%)",
                boxShadow: "0 0 32px rgba(155, 93, 229, 0.08)",
              }}
            >
              {/* Panel grid */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.12]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(167,139,250,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.55) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />
              {/* Soft symbol glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute h-20 w-20 rounded-full bg-purple-500/25 blur-2xl"
              />
              <TraderCityLogo
                className="relative z-10 h-14 w-14 drop-shadow-[0_0_16px_rgba(155,93,229,0.45)] md:h-16 md:w-16"
                showGlow
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <div
          className={freeCardSurface(
            "purple",
            "flex flex-col justify-center rounded-xl px-4 py-3.5"
          )}
        >
          <div className="mb-1.5 flex items-center text-[10px] font-bold uppercase tracking-wider text-gray-400">
            <Calendar className="mr-2 h-3.5 w-3.5 text-purple-400" /> Member Since
          </div>
          <div className="text-base font-medium text-white">
            {mockHeroStatus.memberSince}
          </div>
          <div className="mt-0.5 text-xs text-gray-500">{mockHeroStatus.daysAgo}</div>
        </div>

        <div
          className={freeCardSurface(
            "purple",
            "flex flex-col justify-center rounded-xl px-4 py-3.5"
          )}
        >
          <div className="mb-1.5 flex items-center text-[10px] font-bold uppercase tracking-wider text-gray-400">
            <User className="mr-2 h-3.5 w-3.5 text-purple-400" /> Membership
          </div>
          <div className="text-base font-medium text-white">
            {mockHeroStatus.currentPlan}
          </div>
          <div className="mt-1.5 w-fit rounded border border-purple-500/20 bg-purple-900/30 px-2 py-0.5 text-[10px] font-bold uppercase text-purple-400">
            Current Plan
          </div>
        </div>

        <div
          className={freeCardSurface(
            "purple",
            "relative flex flex-col justify-center overflow-hidden rounded-xl px-4 py-3.5"
          )}
        >
          <div className="pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-full bg-yellow-500/5 blur-[40px]" />
          <div className="mb-1.5 flex items-center justify-between gap-2">
            <div className="flex items-center text-[10px] font-bold uppercase tracking-wider text-gray-400">
              <Gift className="mr-2 h-3.5 w-3.5 text-yellow-500" /> Welcome Credit
            </div>
            <div className="shrink-0 text-right">
              <div className="text-[9px] font-bold uppercase text-gray-500">
                Expires In
              </div>
              <div className="font-mono text-[10px] font-bold text-yellow-500">
                {mockHeroStatus.creditExpiry}
              </div>
            </div>
          </div>
          <div className="mb-0.5 text-2xl font-bold text-yellow-500">
            ${mockHeroStatus.welcomeCredit}
          </div>
          <div className="text-xs text-gray-500">Available To Use</div>
        </div>

        <div
          className={freeCardSurface(
            "purple",
            "flex flex-col justify-center rounded-xl px-4 py-3.5"
          )}
        >
          <div className="mb-1.5 flex items-center text-[10px] font-bold uppercase tracking-wider text-gray-400">
            <MessageSquare className="mr-2 h-3.5 w-3.5 text-[#5865F2]" /> Discord
            Access
          </div>
          <div className="mb-0.5 flex items-center text-base font-medium text-green-500">
            {mockHeroStatus.discordStatus}{" "}
            <CheckCircle2 className="ml-2 h-4 w-4" />
          </div>
          <div className="text-xs text-gray-500">
            You can now join our Discord server.
          </div>
        </div>
      </div>
    </section>
  );
}

function AccessComparisonSection() {
  return (
    <section className="relative mb-8 mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* VS Badge */}
      <div className="absolute left-1/2 top-1/2 z-10 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-yellow-900/50 bg-[#1a1423] text-sm font-bold text-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.2)] lg:flex">
        VS
      </div>

      {/* Free Card */}
      <div
        className={freeCardSurface("purple", "rounded-2xl p-6 md:p-8")}
      >
        <div className="mb-4 flex w-fit items-center rounded-full border border-purple-500/20 bg-purple-900/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-purple-400">
          <Eye className="mr-2 h-3.5 w-3.5" /> Your Current Access
        </div>
        <h3 className="mb-1 text-2xl font-bold text-white">Free Community</h3>
        <p className="mb-8 text-sm text-gray-400">Open Access. Real Value.</p>

        <div className="space-y-6">
          {mockComparison.free.map((item) => (
            <div key={item.id} className="group flex items-center justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-purple-500/10 bg-purple-900/20">
                  <Users className="h-4 w-4 text-purple-400" />
                </div>
                <div>
                  <div className="mb-0.5 text-sm font-medium text-white">
                    {item.title}
                  </div>
                  <div className="text-xs text-gray-500">{item.desc}</div>
                </div>
              </div>
              {item.type === "check" ? (
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded border border-purple-500/20 bg-purple-900/30">
                  <Check className="h-3.5 w-3.5 text-purple-400" />
                </div>
              ) : (
                <div className="shrink-0 text-right">
                  <div className="text-sm font-bold text-purple-400">
                    {item.value}{" "}
                    <span className="font-normal text-gray-500">
                      / {item.total}
                    </span>
                  </div>
                  <div className="text-[10px] uppercase text-gray-500">
                    {item.label}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* VIP Card */}
      <div
        className={freeCardSurface(
          "accent",
          "relative overflow-hidden rounded-2xl p-6 md:p-8"
        )}
      >
        <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-yellow-500/5 blur-[80px]" />
        <div className="relative z-10 mb-4 flex w-fit items-center rounded-full border border-yellow-500/20 bg-yellow-900/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-yellow-500">
          <Lock className="mr-2 h-3.5 w-3.5" /> Upgrade To Unlock
        </div>
        <h3 className="relative z-10 mb-1 text-2xl font-bold text-white">
          VIP Community
        </h3>
        <p className="relative z-10 mb-8 text-sm text-gray-400">
          Deeper Access. Higher Edge.
        </p>

        <div className="relative z-10 space-y-6">
          {mockComparison.vip.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between opacity-80 transition-opacity hover:opacity-100"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-yellow-500/20 bg-yellow-900/10">
                  <Crown className="h-4 w-4 text-yellow-500" />
                </div>
                <div>
                  <div className="mb-0.5 text-sm font-medium text-gray-200">
                    {item.title}
                  </div>
                  <div className="text-xs text-gray-500">{item.desc}</div>
                </div>
              </div>
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded border border-yellow-500/20 bg-yellow-900/20">
                <Lock className="h-3.5 w-3.5 text-yellow-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function JourneySection() {
  return (
    <section className="mb-10 border-t border-purple-900/20 pt-8">
      <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
        <div className="max-w-xs">
          <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-purple-400">
            Your Journey To VIP
          </div>
          <h3 className="mb-3 text-3xl font-bold leading-tight text-white">
            Every step brings you closer.
          </h3>
          <p className="text-sm text-gray-400">
            Complete 5 more referrals or upgrade anytime using your credit.
          </p>
        </div>

        <div className="relative w-full flex-1">
          {/* Connecting Line */}
          <div className="absolute left-10 right-10 top-6 z-0 hidden h-px bg-[#1f1633] md:block" />

          <div className="relative z-10 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-2">
            <div className="flex flex-col items-center bg-[#050308] px-2">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-purple-500 bg-purple-900/20 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                <Eye className="h-5 w-5" />
              </div>
              <div className="mb-1 text-center text-xs font-bold uppercase tracking-wider text-white">
                1. Observe
              </div>
              <div className="max-w-[6.5rem] text-center text-[10px] text-gray-500">
                You&apos;re here
                <br />
                Exploring the ecosystem
              </div>
            </div>

            <div className="flex flex-col items-center bg-[#050308] px-2">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-gray-700 bg-[#111] text-gray-500">
                <BookOpen className="h-5 w-5" />
              </div>
              <div className="mb-1 text-center text-xs font-bold uppercase tracking-wider text-gray-400">
                2. Learn
              </div>
              <div className="max-w-[6.5rem] text-center text-[10px] text-gray-600">
                Gain knowledge
                <br />
                from elite traders
              </div>
            </div>

            <div className="flex flex-col items-center bg-[#050308] px-2">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-gray-700 bg-[#111] text-gray-500">
                <Users className="h-5 w-5" />
              </div>
              <div className="mb-1 text-center text-xs font-bold uppercase tracking-wider text-gray-400">
                3. Participate
              </div>
              <div className="max-w-[6.5rem] text-center text-[10px] text-gray-600">
                Join discussions
                <br />
                and engage
              </div>
            </div>

            <div className="flex flex-col items-center bg-[#050308] px-2">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-yellow-900 bg-yellow-900/10 text-yellow-600">
                <Crown className="h-5 w-5" />
              </div>
              <div className="mb-1 text-center text-xs font-bold uppercase tracking-wider text-yellow-600">
                4. Upgrade
              </div>
              <div className="max-w-[6.5rem] text-center text-[10px] text-gray-600">
                Unlock full access
                <br />
                and grow faster
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ReferralCentre() {
  return (
    <section
      className={freeCardSurface(
        "purple",
        "relative mb-10 overflow-hidden rounded-2xl p-6 md:p-8"
      )}
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-purple-600/5 blur-[120px]" />

      <div className="relative z-10 mb-6 flex items-center text-sm font-bold uppercase tracking-widest text-purple-400">
        <Users className="mr-2 h-5 w-5" /> Referral Centre
        <span className="ml-3 hidden text-xs font-normal normal-case tracking-normal text-gray-400 md:inline">
          Refer 5 VIP members and unlock your next month free.
        </span>
      </div>

      <div className="relative z-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className={freeInsetSurface("rounded-xl p-5")}>
          <div className="mb-3 text-[10px] font-bold uppercase tracking-wider text-purple-400">
            Your Referral Link
          </div>
          <div
            className={freeWellSurface(
              "mb-4 flex items-center rounded-lg p-1.5"
            )}
          >
            <div className="mx-2 text-gray-500">
              <Lock className="h-4 w-4" />
            </div>
            <input
              type="text"
              readOnly
              value={mockReferral.link}
              className="flex-1 bg-transparent text-sm text-gray-300 outline-none"
            />
            <button
              type="button"
              className="flex min-h-11 min-w-11 items-center justify-center rounded text-gray-400 transition-colors hover:bg-purple-900/30"
              aria-label="Copy referral link"
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>
          <div className="mb-6 flex gap-3">
            <button
              type="button"
              className="min-h-11 flex-1 rounded-lg border border-purple-900/50 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-purple-900/20"
            >
              Edit Link
            </button>
            <button
              type="button"
              className="min-h-11 flex-1 rounded-lg bg-purple-600 py-2 text-sm font-medium text-white shadow-[0_0_15px_rgba(147,51,234,0.3)] transition-colors hover:bg-purple-500"
            >
              Share Link
            </button>
          </div>
          <div className="mb-3 text-[10px] font-bold uppercase tracking-wider text-purple-400">
            Referral Rules
          </div>
          <ul className="space-y-2 text-[12px] text-gray-400">
            {mockReferral.rules.map((rule, idx) => (
              <li key={idx} className="flex items-start">
                <Check className="mr-2 mt-0.5 h-3.5 w-3.5 shrink-0 text-green-500" />{" "}
                {rule}
              </li>
            ))}
            <li className="mt-4 flex items-start border-t border-purple-900/30 pt-4 text-[11px] text-purple-400/80">
              <div className="mr-2 mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-purple-400/80 font-bold">
                i
              </div>
              Only completed VIP purchases count toward referral progress.
            </li>
          </ul>
        </div>

        <div
          className={freeInsetSurface(
            "flex flex-col items-center justify-center rounded-xl p-5 text-center"
          )}
        >
          <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-purple-400">
            Referral Progress
          </div>
          <div className="mb-6 text-sm text-gray-300">Refer 5 VIP Members</div>
          <div className="mb-8 text-6xl font-bold tracking-tighter text-purple-500 drop-shadow-[0_0_15px_rgba(147,51,234,0.2)]">
            {mockReferral.current}
            <span className="text-3xl text-purple-900">/{mockReferral.target}</span>
          </div>
          <div className="mb-6 flex w-full justify-center gap-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-purple-900/40 bg-[#0f0a18] text-gray-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
                  <User className="h-4 w-4" />
                </div>
                <span className="text-[10px] text-gray-500">Pending</span>
              </div>
            ))}
          </div>
          <div className="text-xs text-gray-500">
            {mockReferral.current} Completed
          </div>
        </div>

        <div
          className={freeInsetSurface(
            "relative flex flex-col items-center justify-center overflow-hidden rounded-xl p-5 text-center"
          )}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.1)_0%,transparent_60%)]" />
          <div className="z-10 mb-6 text-[10px] font-bold uppercase tracking-wider text-purple-400">
            Reward Unlock
          </div>
          <div className="relative z-10 mb-6">
            <div className="flex h-28 w-28 items-center justify-center rounded-2xl border border-purple-400/30 bg-gradient-to-br from-purple-400 via-purple-600 to-purple-900 shadow-[0_0_40px_rgba(147,51,234,0.3)]">
              <Gift className="h-14 w-14 text-white drop-shadow-md" strokeWidth={1.5} />
            </div>
          </div>
          <h3 className="z-10 mb-3 text-lg font-bold text-white">
            Unlock Next Month Free
          </h3>
          <p className="z-10 px-4 text-sm leading-relaxed text-gray-400">
            Bring 5 friends via your referral link. Once all referral conditions
            are met, your next month is free.
          </p>
        </div>
      </div>
    </section>
  );
}

function UpgradeCTASection() {
  return (
    <section
      className={freeCardSurface(
        "accent",
        "relative mb-10 flex flex-col gap-8 overflow-hidden rounded-2xl p-6 md:p-8 lg:flex-row"
      )}
    >
      <div className="pointer-events-none absolute right-0 top-0 h-full w-[500px] bg-gradient-to-l from-yellow-900/10 to-transparent" />

      <div className="relative z-10 flex-1">
        <div className="mb-8 flex items-start gap-6">
          <div className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 text-black shadow-[0_0_30px_rgba(234,179,8,0.2)] md:flex">
            <Crown className="h-8 w-8" />
          </div>
          <div>
            <h2 className="mb-2 text-2xl font-bold leading-tight text-gray-300 md:text-3xl">
              Most communities give you information.
              <br />
              <span className="text-white">TraderCity gives you context.</span>
            </h2>
          </div>
        </div>

        <div className="mb-4 text-[10px] font-bold uppercase tracking-widest text-yellow-500">
          Unlock Everything In VIP
        </div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-3 md:grid-cols-2">
          {[
            "Full Discord Access",
            "Complete Education Framework",
            "Weekly BTC Microstructure Report",
            "All Premium Market Perspectives",
            "Weekly Quant Research Report",
            "VIP Events & Workshops",
            "Full Report Library (400+)",
            "30 Days Full Access",
          ].map((feature, i) => (
            <div key={i} className="flex items-center text-sm text-gray-300">
              <CheckCircle2 className="mr-3 h-4 w-4 shrink-0 text-green-500" />{" "}
              {feature}
            </div>
          ))}
        </div>
      </div>

      <div
        className={freeCardSurface(
          "accent",
          "relative z-10 flex w-full flex-col justify-between rounded-xl p-6 lg:w-[350px]"
        )}
      >
        <div>
          <div className="mb-3 flex items-center justify-between">
            <div className="text-xs uppercase tracking-wider text-gray-400">
              {MONTHLY_WELCOME_UPGRADE_CTA.standardPriceLabel}
            </div>
            <div className="text-sm font-medium text-gray-300">
              {MONTHLY_WELCOME_UPGRADE_CTA.standardPriceDisplay}
            </div>
          </div>
          <div className="mb-6 flex items-center justify-between border-b border-purple-900/30 pb-6">
            <div className="text-xs font-bold uppercase tracking-wider text-purple-400">
              {MONTHLY_WELCOME_UPGRADE_CTA.adjustmentLabel}
            </div>
            <div className="text-sm font-bold text-green-400">
              {MONTHLY_WELCOME_UPGRADE_CTA.adjustmentAmountDisplay}
            </div>
          </div>
          <div className="mb-6 flex items-end justify-between">
            <div className="text-sm font-bold uppercase tracking-wider text-gray-300">
              {MONTHLY_WELCOME_UPGRADE_CTA.amountPayableLabel}
            </div>
            <div className="text-4xl font-bold leading-none text-yellow-500">
              {MONTHLY_WELCOME_UPGRADE_CTA.finalPayableDisplay}
            </div>
          </div>
          <p className="mb-4 text-[11px] leading-relaxed text-gray-500">
            {MONTHLY_WELCOME_UPGRADE_CTA.footnote}
          </p>
        </div>

        <div>
          <button
            type="button"
            className="mb-3 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-yellow-600 to-yellow-400 py-3.5 font-bold text-black shadow-[0_0_20px_rgba(234,179,8,0.2)] transition-all hover:from-yellow-500 hover:to-yellow-300"
          >
            <Lock className="h-4 w-4" /> Upgrade to VIP Now
          </button>
          <div className="mb-4 flex items-center justify-center text-[10px] text-gray-500">
            <Clock className="mr-1.5 h-3 w-3" /> {MONTHLY_WELCOME_UPGRADE_CTA.chip}
          </div>
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-purple-800/50 bg-purple-900/20 py-3 text-sm font-medium text-purple-400 transition-all hover:bg-purple-900/40"
          >
            Invite Friends <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

function PricingPlansSection() {
  const monthly = MEMBERSHIP_PLANS.monthly;
  const quarterly = MEMBERSHIP_PLANS.quarterly;
  const yearly = MEMBERSHIP_PLANS.yearly;

  const quarterlyCompareUsd = monthly.priceUsd * 3;
  const yearlyCompareUsd = monthly.priceUsd * 12;
  const quarterlySaveUsd = quarterlyCompareUsd - quarterly.priceUsd;
  const yearlySaveUsd = yearlyCompareUsd - yearly.priceUsd;

  return (
    <section className="mb-10 text-center">
      <div className="mb-2 text-[10px] font-bold uppercase tracking-widest text-purple-400">
        Pricing Plans
      </div>
      <h2 className="mb-2 text-2xl font-bold text-white md:text-3xl">
        Choose the plan that fits your{" "}
        <span className="text-purple-400">journey</span>
      </h2>
      <p className="mb-6 text-sm text-gray-400">
        All plans include full access to our VIP community and premium content.
      </p>

      <div
        className={freeCardSurface(
          "purple",
          "mx-auto mb-10 flex w-fit items-center justify-center gap-2 rounded-full px-4 py-2 text-xs text-gray-400"
        )}
      >
        <ShieldCheck className="h-4 w-4 text-purple-400" />
        Not satisfied? Get a full refund within 30 days.
      </div>

      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 text-left md:grid-cols-2">
        {/* Quarterly Plan */}
        <div
          className={freeCardSurface(
            "accent",
            "relative flex flex-col rounded-2xl border-2 border-yellow-500/80 p-8 shadow-[0_0_30px_rgba(234,179,8,0.05)] transition-transform duration-300 hover:-translate-y-1"
          )}
        >
          <div className="absolute -top-3.5 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-yellow-500 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-black shadow-md">
            <Star className="h-3 w-3 fill-black" /> Most Popular
          </div>

          <div className="mb-6 flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-yellow-500/30 bg-yellow-900/20">
              <Calendar className="h-6 w-6 text-yellow-500" />
            </div>
            <div>
              <h3 className="mb-1 text-sm font-bold uppercase tracking-wider text-gray-300">
                {quarterly.label}
              </h3>
              <div className="mb-1 flex items-end gap-1">
                <span className="text-4xl font-bold leading-none text-white">
                  {quarterly.priceDisplay}
                </span>
                <span className="mb-1 text-sm text-gray-500">
                  {quarterly.periodLabel}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded border border-yellow-500/20 bg-yellow-500/20 px-2 py-0.5 text-[10px] font-bold text-yellow-500">
                  Save ${quarterlySaveUsd}
                </span>
                <span className="text-xs text-gray-600 line-through">
                  ${quarterlyCompareUsd}
                </span>
              </div>
            </div>
          </div>

          <div className="mb-8 flex-grow space-y-3">
            <div className="flex items-center text-sm text-gray-300">
              <CheckCircle2 className="mr-3 h-4 w-4 shrink-0 text-green-500" />{" "}
              Full Discord Access
            </div>
            <div className="flex items-center text-sm text-gray-300">
              <CheckCircle2 className="mr-3 h-4 w-4 shrink-0 text-green-500" />{" "}
              Complete Education Framework
            </div>
          </div>

          <button
            type="button"
            className="mb-3 w-full rounded-xl bg-yellow-500 py-3.5 text-sm font-bold text-black transition-all hover:bg-yellow-400"
          >
            Choose {quarterly.label} Plan
          </button>
          <div className="text-center text-[10px] text-gray-500">
            Billed every 3 months.
          </div>
        </div>

        {/* Yearly Plan */}
        <div
          className={freeCardSurface(
            "purple",
            "flex flex-col rounded-2xl border-purple-600/50 p-8 transition-transform duration-300 hover:-translate-y-1"
          )}
        >
          <div className="mb-6 flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-purple-500/30 bg-purple-900/20">
              <Calendar className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <h3 className="mb-1 text-sm font-bold uppercase tracking-wider text-gray-300">
                {yearly.label}
              </h3>
              <div className="mb-1 flex items-end gap-1">
                <span className="text-4xl font-bold leading-none text-white">
                  {yearly.priceDisplay}
                </span>
                <span className="mb-1 text-sm text-gray-500">
                  {yearly.periodLabel}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded border border-purple-500/30 bg-purple-900/50 px-2 py-0.5 text-[10px] font-bold text-purple-400">
                  Save ${yearlySaveUsd}
                </span>
                <span className="text-xs text-gray-600 line-through">
                  ${yearlyCompareUsd}
                </span>
              </div>
            </div>
          </div>

          <div className="mb-8 flex-grow space-y-3">
            <div className="flex items-center text-sm text-gray-300">
              <CheckCircle2 className="mr-3 h-4 w-4 shrink-0 text-green-500" />{" "}
              Full Discord Access
            </div>
            <div className="flex items-center text-sm text-gray-300">
              <CheckCircle2 className="mr-3 h-4 w-4 shrink-0 text-green-500" /> All
              Premium Reports
            </div>
          </div>

          <button
            type="button"
            className="mb-3 w-full rounded-xl border border-purple-600/80 bg-purple-900/20 py-3.5 text-sm font-bold text-purple-300 transition-all hover:bg-purple-900/40"
          >
            Choose {yearly.label} Plan
          </button>
          <div className="text-center text-[10px] text-gray-500">
            Billed once per year.
          </div>
        </div>
      </div>
    </section>
  );
}

export default function FreeDashboardContent() {
  return (
    <div className="min-h-screen bg-[#050308] font-sans selection:bg-purple-500/30">
      <div className="mx-auto max-w-[1200px] px-4 py-6 md:px-8 md:py-10">
        <DashboardHeader />
        <main>
          <FreeHeroSection />
          <AccessComparisonSection />
          <JourneySection />
          <ReferralCentre />
          <UpgradeCTASection />
          <PricingPlansSection />
        </main>
      </div>
    </div>
  );
}
