import Link from "next/link";
import SectionEyebrow from "../shared/SectionEyebrow";

/**
 * Lightweight homepage CTA — Analyst opportunity teaser.
 * Full narrative lives on `/analysts`.
 */
export default function BecomeAnalyst() {
  return (
    <section
      id="become-analyst"
      className="relative overflow-hidden bg-[#050816] border-t border-white/[0.04]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.12),transparent_60%)]" />
      <div className="relative z-10 mx-auto max-w-[900px] px-6 py-16 text-center sm:px-8 sm:py-20 lg:py-24">
        <div className="mb-6 flex justify-center">
          <SectionEyebrow
            number="09"
            label="Analyst Program"
            accentColor="#A78BFA"
          />
        </div>
        <h2 className="font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Become a TraderCity Analyst
        </h2>
        <div className="mx-auto mt-6 max-w-lg space-y-2 font-sans text-base text-white/55 sm:text-lg">
          <p>Share your research.</p>
          <p>Build your personal brand.</p>
          <p>Reach thousands of traders.</p>
          <p>Publish through TraderCity.</p>
        </div>
        <div className="mt-10">
          <Link
            href="/analysts"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-violet-500 to-indigo-500 px-8 py-3.5 text-sm font-semibold text-white shadow-[0_0_24px_rgba(139,92,246,0.35)] transition hover:brightness-110"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
