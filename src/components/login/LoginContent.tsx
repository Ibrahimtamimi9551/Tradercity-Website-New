"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Check,
  Crown,
  DollarSign,
  Gift,
  LayoutGrid,
  Loader2,
  Lock,
  Shield,
  User,
  Users,
} from "lucide-react";
import {
  type AuthMode,
  type MockAuthProvider,
  resolvePostAuthRedirect,
  useAuth,
} from "@/lib/auth";
import AuthFormFields from "./AuthFormFields";
import AuthModeToggle from "./AuthModeToggle";
import AuthStatusBanner from "./AuthStatusBanner";
import MockSignOutButton from "./MockSignOutButton";
import SocialAuthButtons from "./SocialAuthButtons";
import { DiscordIcon, TraderCityLogo } from "./icons";

type BusyState = "idle" | "email" | "google" | "discord";
type BannerState =
  | { tone: "error" | "success" | "info"; message: string }
  | null;

function parseMode(raw: string | null): AuthMode {
  return raw === "register" ? "register" : "login";
}

export default function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, register, logout, isAuthenticated, isReady, user } = useAuth();
  const [, startTransition] = useTransition();

  const returnUrl = searchParams.get("returnUrl") ?? searchParams.get("next");
  const plan = searchParams.get("plan");
  const mode = parseMode(searchParams.get("mode"));
  const continueHref = resolvePostAuthRedirect({ returnUrl, plan });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [busy, setBusy] = useState<BusyState>("idle");
  const [banner, setBanner] = useState<BannerState>(null);
  const [signingOut, setSigningOut] = useState(false);

  /** Redirect only after an explicit auth action — never on page load. */
  const redirectAfterAuth = () => {
    const destination = resolvePostAuthRedirect({ returnUrl, plan });
    setBanner({
      tone: "success",
      message:
        mode === "register"
          ? "Account created (mock). Continuing your journey…"
          : "Signed in (mock). Continuing your journey…",
    });
    startTransition(() => {
      router.push(destination);
    });
  };

  const runAuth = async (provider: MockAuthProvider) => {
    if (busy !== "idle") return;
    setBanner(null);
    setBusy(provider === "email" ? "email" : provider);

    try {
      const credentials = {
        email,
        password,
        displayName: mode === "register" ? displayName : undefined,
      };

      if (mode === "register") {
        await register(credentials, provider);
      } else {
        await login(credentials, provider);
      }
      redirectAfterAuth();
    } catch {
      setBanner({
        tone: "error",
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setBusy("idle");
    }
  };

  const onSignOutHere = async () => {
    if (signingOut) return;
    setSigningOut(true);
    try {
      await logout();
      setBanner({
        tone: "info",
        message: "Signed out (mock). You can sign in again below.",
      });
    } finally {
      setSigningOut(false);
    }
  };

  const onModeChange = (next: AuthMode) => {
    setBanner(null);
    const params = new URLSearchParams(searchParams.toString());
    if (next === "register") params.set("mode", "register");
    else params.delete("mode");
    const query = params.toString();
    router.replace(query ? `/login?${query}` : "/login", { scroll: false });
  };

  const locked = busy !== "idle";

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-x-hidden bg-[#050608] pb-16 pt-24 text-white sm:pb-20 sm:pt-28 lg:pb-10 lg:pt-20">
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/5 via-[#050608] to-[#050608]" />

      <header className="pointer-events-auto absolute top-0 z-50 flex w-full items-center justify-between px-5 py-6 sm:px-6 lg:px-10 lg:py-5">
        <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-90">
          <TraderCityLogo className="h-8 w-8 text-[#3B82F6]" />
          <span className="text-lg font-bold tracking-widest text-white sm:text-xl">
            TRADERCITY
          </span>
        </Link>

        <div className="flex items-center gap-3 text-sm text-[#94A3B8]">
          <MockSignOutButton redirectTo={null} />
          <div className="hidden items-center gap-3 md:flex">
            <div className="flex items-center gap-2 text-white">
              <div className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-700">
                <User className="h-3.5 w-3.5 text-gray-400" />
              </div>
              <span>Login</span>
            </div>
            <div className="flex gap-1">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-[3px] w-[3px] rounded-full bg-gray-700" />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-700">
                <LayoutGrid className="h-3.5 w-3.5 text-gray-400" />
              </div>
              <span>Dashboard</span>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-center px-4 lg:px-6 xl:px-8">
        <div className="flex w-full flex-col items-stretch justify-center gap-6 md:items-center lg:flex-row lg:items-center lg:gap-5 xl:gap-6 lg:[perspective:1400px]">
          {/* Left feature — desktop / tablet */}
          <aside
            className="pointer-events-auto relative hidden w-full max-w-[280px] shrink-0 rounded-[24px] bg-[#090A10] p-6 md:block lg:max-w-[260px] xl:max-w-[280px] lg:translate-x-1 lg:rotate-y-[8deg] lg:rotate-z-[0.5deg]"
            style={{
              background:
                "linear-gradient(#090A10, #090A10) padding-box, linear-gradient(180deg, rgba(56,189,248,0.6), rgba(168,85,247,0.3)) border-box",
              borderWidth: "1px",
              borderColor: "transparent",
              boxShadow: "-10px 10px 40px rgba(56,189,248,0.05)",
            }}
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#A855F7]/20 bg-[#A855F7]/10 lg:mb-3 lg:h-11 lg:w-11">
                <DiscordIcon className="h-7 w-7 text-[#A855F7] lg:h-6 lg:w-6" />
              </div>
              <span className="mb-1.5 text-[9px] font-bold uppercase tracking-[0.15em] text-[#A855F7]">
                Join free
              </span>
              <h3 className="mb-2 text-lg font-bold tracking-tight text-white">
                Discord Community
              </h3>
              <p className="mb-6 text-xs leading-relaxed text-[#94A3B8] lg:mb-4">
                Access our active community, market insights, analysis and connect
                with elite traders.
              </p>
              <div className="flex w-full flex-col gap-3 lg:gap-2.5">
                <div className="group relative overflow-hidden rounded-xl border border-[#3B82F6]/30 bg-[#0C0E14] p-3 text-left transition-colors hover:border-[#3B82F6]/50">
                  <div className="absolute inset-0 bg-[#3B82F6]/5 transition-colors group-hover:bg-[#3B82F6]/10" />
                  <div className="relative z-10 flex gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#3B82F6]/50 bg-[#3B82F6]/10 text-[#3B82F6]">
                      <DollarSign className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-[#3B82F6]">
                        Receive
                      </span>
                      <h4 className="mb-1 text-xs font-bold leading-tight text-white">
                        $10 Credit
                      </h4>
                      <p className="text-[10px] leading-relaxed text-[#64748B]">
                        Get $10 worth of subscription credit instantly after
                        registration.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="group relative overflow-hidden rounded-xl border border-[#A855F7]/30 bg-[#0C0E14] p-3 text-left transition-colors hover:border-[#A855F7]/50">
                  <div className="absolute inset-0 bg-[#A855F7]/5 transition-colors group-hover:bg-[#A855F7]/10" />
                  <div className="relative z-10 flex gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#A855F7]/50 bg-[#A855F7]/10 text-[#A855F7]">
                      <Gift className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-[#A855F7]">
                        Earn with
                      </span>
                      <h4 className="mb-1 text-xs font-bold leading-tight text-white">
                        Referral Rewards
                      </h4>
                      <p className="text-[10px] leading-relaxed text-[#64748B]">
                        Unlock referral potential and earn commissions as you grow.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Center auth card */}
          <div
            className="pointer-events-auto relative z-20 order-first flex w-full max-w-[520px] flex-col items-center rounded-[24px] bg-[#0A0C10] p-6 shadow-[0_0_100px_rgba(59,130,246,0.15)] sm:p-10 lg:order-none lg:max-w-[760px] lg:flex-1 lg:px-10 lg:py-8 xl:max-w-[800px] xl:px-12 xl:py-9"
            style={{
              background:
                "linear-gradient(#0A0C10, #0A0C10) padding-box, linear-gradient(135deg, rgba(56,189,248,0.9), rgba(168,85,247,0.7)) border-box",
              borderWidth: "1.5px",
              borderColor: "transparent",
            }}
          >
            <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#64748B] lg:mb-1">
              Development mock auth
            </p>
            <h1 className="mb-2 text-center text-3xl font-extrabold tracking-tight text-white drop-shadow-md sm:text-4xl md:text-[44px] lg:mb-1.5 lg:text-[40px] xl:text-[42px]">
              {mode === "register" ? "Create Account" : "Welcome back"}
            </h1>
            <p className="mb-6 max-w-sm text-center text-sm text-[#94A3B8] lg:mb-4 lg:max-w-md">
              {mode === "register"
                ? "Join TraderCity and continue to your destination."
                : "Sign in to continue your TraderCity journey."}
            </p>

            <AuthModeToggle mode={mode} onChange={onModeChange} disabled={locked} />

            {isReady && isAuthenticated ? (
              <div className="mb-5 w-full rounded-xl border border-[#3B82F6]/35 bg-[#3B82F6]/10 px-4 py-4 text-left lg:mb-4 lg:px-4 lg:py-3">
                <p className="text-sm font-semibold text-[#BFDBFE]">
                  You are already signed in
                  {user?.displayName ? ` as ${user.displayName}` : ""}.
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[#94A3B8] lg:mt-0.5">
                  Development mock session is active. Stay here to re-test auth,
                  continue your journey, or sign out.
                </p>
                <div className="mt-3 flex flex-wrap gap-2 lg:mt-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      startTransition(() => {
                        router.push(continueHref);
                      });
                    }}
                    className="inline-flex items-center justify-center rounded-lg bg-[#3B82F6] px-3.5 py-2 text-xs font-bold text-white transition-colors hover:bg-[#2563EB] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]/60"
                  >
                    Continue to Dashboard
                  </button>
                  <button
                    type="button"
                    disabled={signingOut}
                    onClick={() => void onSignOutHere()}
                    className="inline-flex items-center justify-center rounded-lg border border-[#1F2129] px-3.5 py-2 text-xs font-bold text-[#94A3B8] transition-colors hover:border-[#3B82F6]/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]/50 disabled:opacity-60"
                  >
                    {signingOut ? "Signing out…" : "Sign Out"}
                  </button>
                </div>
              </div>
            ) : null}

            {banner ? (
              <AuthStatusBanner tone={banner.tone} message={banner.message} />
            ) : null}

            <SocialAuthButtons
              busyProvider={
                busy === "google" || busy === "discord" ? busy : null
              }
              disabled={locked && busy === "email"}
              onGoogle={() => void runAuth("google")}
              onDiscord={() => void runAuth("discord")}
            />

            <form
              className="w-full"
              onSubmit={(e) => {
                e.preventDefault();
                void runAuth("email");
              }}
            >
              <AuthFormFields
                mode={mode}
                email={email}
                password={password}
                displayName={displayName}
                disabled={locked}
                onEmailChange={setEmail}
                onPasswordChange={setPassword}
                onDisplayNameChange={setDisplayName}
              />

              <button
                type="submit"
                disabled={locked}
                className="mb-8 flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-[15px] font-extrabold text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all hover:-translate-y-0.5 hover:opacity-95 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 sm:h-16 sm:text-[16px] lg:mb-5 lg:h-12 lg:text-[15px]"
              >
                {busy === "email" ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>
                      {mode === "register" ? "Creating account…" : "Signing in…"}
                    </span>
                  </>
                ) : (
                  <span>
                    {mode === "register" ? "Create Account" : "Login"}
                  </span>
                )}
              </button>
            </form>

            <div className="mb-8 grid w-full grid-cols-3 gap-2 px-1 sm:gap-4 sm:px-2 lg:mb-5 lg:gap-3">
              <div className="flex min-w-0 flex-col items-center gap-2.5 text-center lg:gap-1.5">
                <Shield className="h-6 w-6 text-[#A855F7] lg:h-5 lg:w-5" />
                <span className="text-[10px] font-medium leading-snug text-white sm:text-xs">
                  Secure &amp; Private
                </span>
              </div>
              <div className="flex min-w-0 flex-col items-center gap-2.5 text-center lg:gap-1.5">
                <Lock className="h-6 w-6 text-[#FACC15] lg:h-5 lg:w-5" />
                <span className="text-[10px] font-medium leading-snug text-white sm:text-xs">
                  Mock session
                </span>
              </div>
              <div className="flex min-w-0 flex-col items-center gap-2.5 text-center lg:gap-1.5">
                <Users className="h-6 w-6 text-[#3B82F6] lg:h-5 lg:w-5" />
                <span className="text-[10px] font-medium leading-snug text-white sm:text-xs">
                  Trusted by Traders
                </span>
              </div>
            </div>

            <p className="max-w-[300px] text-center text-[11px] font-medium text-[#64748B] lg:max-w-none">
              By continuing, you agree to our{" "}
              <a
                href="#"
                className="text-[#FACC15] transition-colors hover:text-[#fde047]"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-[#FACC15] transition-colors hover:text-[#fde047]"
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>

          {/* Right feature — desktop / tablet */}
          <aside
            className="pointer-events-auto relative hidden w-full max-w-[280px] shrink-0 rounded-[24px] bg-[#090A10] p-6 md:block lg:max-w-[260px] xl:max-w-[280px] lg:-translate-x-1 lg:-rotate-y-[8deg] lg:-rotate-z-[0.5deg]"
            style={{
              background:
                "linear-gradient(#090A10, #090A10) padding-box, linear-gradient(180deg, rgba(234,179,8,0.6), rgba(234,179,8,0.1)) border-box",
              borderWidth: "1px",
              borderColor: "transparent",
              boxShadow: "10px 10px 40px rgba(234,179,8,0.05)",
            }}
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#FACC15]/30 bg-[#FACC15]/5 px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest text-[#FACC15] lg:mb-4">
                <Crown className="h-3 w-3" /> VIP Access
              </div>
              <Crown className="mb-4 h-14 w-14 text-[#FACC15] drop-shadow-[0_0_15px_rgba(234,179,8,0.4)] lg:mb-3 lg:h-12 lg:w-12" />
              <h3 className="mb-2 text-lg font-bold tracking-tight text-white">
                VIP Community
              </h3>
              <p className="mb-6 text-xs leading-relaxed text-[#94A3B8] lg:mb-4">
                Premium access to elite tools, advanced education and exclusive
                content.
              </p>
              <div className="mb-6 flex w-full flex-col gap-4 text-left lg:mb-4 lg:gap-3">
                {[
                  "Full Discord Access",
                  "Microstructure Report & Orderflow Analysis",
                  "Complete Education & Report Archive",
                  "Active Discussions with Analysts",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-[#FACC15]">
                      <Check className="h-2.5 w-2.5 text-[#FACC15]" />
                    </div>
                    <span className="text-xs font-medium leading-snug text-[#CBD5E1]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
              <Link
                href="/pricing"
                className="flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FACC15] to-[#EAB308] text-sm font-bold text-black shadow-[0_0_15px_rgba(234,179,8,0.2)] transition-opacity hover:opacity-90"
              >
                <Crown className="h-3.5 w-3.5" />
                Upgrade to VIP
              </Link>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
