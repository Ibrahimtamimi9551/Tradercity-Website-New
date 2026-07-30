import type { ReactNode } from "react";
import Link from "next/link";

const WHY = [
  {
    title: "Infrastructure, not isolation",
    body: "Publish research without building payments, Discord, or member systems yourself.",
  },
  {
    title: "Aligned distribution",
    body: "Reach traders who already trust TraderCity — without chasing cold audiences alone.",
  },
  {
    title: "Partnership, not employment",
    body: "Keep your voice and brand. TraderCity provides the platform; you provide the edge.",
  },
];

const BENEFITS = [
  "Personal brand amplification",
  "Commission on referred members",
  "Discord Analyst role & channels",
  "Research publishing infrastructure",
  "Member audience access",
  "Operational support from TraderCity",
];

const REQUIREMENTS = [
  "Credible public trading / research footprint",
  "Clear communication and professional standards",
  "Alignment with TraderCity philosophy",
  "Willingness to publish consistently",
  "Active Discord presence when onboarded",
];

const STEPS = [
  { n: "01", title: "Apply", body: "Submit your profile, track record, and content samples." },
  { n: "02", title: "Review", body: "Verification, evaluation, and partnership discussion." },
  { n: "03", title: "Activate", body: "Onboarding, Discord role, and Analyst Dashboard unlock." },
];

const FAQ = [
  {
    q: "Do I need a VIP membership to apply?",
    a: "You need a TraderCity member account. Free membership is enough to start an application.",
  },
  {
    q: "Is this a job?",
    a: "No. Analysts are independent partners who publish through TraderCity infrastructure.",
  },
  {
    q: "When do I get paid?",
    a: "Commission structures activate after partnership approval and onboarding — not at application.",
  },
  {
    q: "How long does review take?",
    a: "Timing varies. Track status from your Member Dashboard after you submit.",
  },
];

function SectionShell({
  id,
  eyebrow,
  title,
  children,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="border-t border-white/[0.06] px-6 py-14 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-300/80">
          {eyebrow}
        </p>
        <h2 className="mt-3 font-sans text-2xl font-bold tracking-tight text-white sm:text-3xl">
          {title}
        </h2>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

export function AnalystLandingPage() {
  return (
    <main className="min-h-screen bg-[#050816] font-sans text-white">
      <div className="border-b border-white/[0.06] px-6 py-4 sm:px-8">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <Link href="/" className="text-sm text-white/50 transition hover:text-white">
            ← TraderCity
          </Link>
          <Link
            href="/analysts/apply"
            className="rounded-lg bg-violet-500/20 px-3 py-1.5 text-xs font-semibold text-violet-200 ring-1 ring-violet-400/30 transition hover:bg-violet-500/30"
          >
            Apply
          </Link>
        </div>
      </div>

      <section className="relative overflow-hidden px-6 pb-16 pt-16 sm:px-8 sm:pt-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.18),transparent_55%)]" />
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-300/90">
            Analyst Program
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Become a TraderCity Analyst
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-white/55 sm:text-lg">
            Share research. Build your brand. Reach traders who want clarity — through
            TraderCity&apos;s publishing and membership infrastructure.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/analysts/apply"
              className="inline-flex rounded-xl bg-gradient-to-r from-violet-500 to-indigo-500 px-7 py-3 text-sm font-semibold text-white shadow-[0_0_24px_rgba(139,92,246,0.35)] transition hover:brightness-110"
            >
              Apply as Analyst
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex rounded-xl border border-white/15 px-7 py-3 text-sm font-semibold text-white/80 transition hover:border-white/30 hover:text-white"
            >
              How it works
            </a>
          </div>
        </div>
      </section>

      <SectionShell eyebrow="Why" title="Why partner with TraderCity">
        <ul className="space-y-5">
          {WHY.map((item) => (
            <li key={item.title}>
              <h3 className="text-base font-semibold text-white">{item.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-white/50">{item.body}</p>
            </li>
          ))}
        </ul>
      </SectionShell>

      <SectionShell eyebrow="Benefits" title="What you get">
        <ul className="grid gap-3 sm:grid-cols-2">
          {BENEFITS.map((item) => (
            <li
              key={item}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm text-white/70"
            >
              {item}
            </li>
          ))}
        </ul>
      </SectionShell>

      <SectionShell eyebrow="Requirements" title="What we look for">
        <ul className="space-y-2.5">
          {REQUIREMENTS.map((item) => (
            <li key={item} className="flex gap-3 text-sm text-white/65">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />
              {item}
            </li>
          ))}
        </ul>
      </SectionShell>

      <SectionShell id="how-it-works" eyebrow="Process" title="How it works">
        <ol className="space-y-6">
          {STEPS.map((step) => (
            <li key={step.n} className="flex gap-4">
              <span className="font-mono text-sm font-semibold text-violet-300/80">
                {step.n}
              </span>
              <div>
                <h3 className="text-base font-semibold text-white">{step.title}</h3>
                <p className="mt-1 text-sm text-white/50">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </SectionShell>

      <SectionShell eyebrow="FAQ" title="Common questions">
        <dl className="space-y-6">
          {FAQ.map((item) => (
            <div key={item.q}>
              <dt className="text-sm font-semibold text-white">{item.q}</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-white/50">{item.a}</dd>
            </div>
          ))}
        </dl>
      </SectionShell>

      <section className="border-t border-white/[0.06] px-6 py-16 text-center sm:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Ready to apply?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-white/50">
            You&apos;ll need a TraderCity account. If you&apos;re not logged in, we&apos;ll
            bring you straight back to the form after authentication.
          </p>
          <Link
            href="/analysts/apply"
            className="mt-8 inline-flex rounded-xl bg-gradient-to-r from-violet-500 to-indigo-500 px-8 py-3.5 text-sm font-semibold text-white shadow-[0_0_24px_rgba(139,92,246,0.35)] transition hover:brightness-110"
          >
            Apply as Analyst
          </Link>
        </div>
      </section>
    </main>
  );
}
