"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, User } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2527-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
    </svg>
  );
}

export default function HeroLeftContent() {
  const shouldReduceMotion = useReducedMotion();

  const transition = (delay: number) =>
    shouldReduceMotion
      ? { duration: 0.01 }
      : { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <div className="flex w-full flex-col items-start text-left lg:max-w-[460px] xl:max-w-[500px]">
      {/* Eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transition(0.1)}
        className="flex items-center gap-2"
      >
        <span
          className="h-2 w-2 rounded-full bg-[#A855F7] shadow-[0_0_10px_rgba(168,85,247,0.9)]"
          aria-hidden="true"
        />
        <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C084FC] sm:text-xs">
          MULTIPLE PERSPECTIVES
        </span>
      </motion.div>

      {/* Main Headline */}
      <motion.h1
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transition(0.22)}
        className="mt-5 font-bold tracking-[-0.035em]"
      >
        <span className="block text-[44px] leading-[1.02] text-white min-[420px]:text-[50px] sm:text-[58px] md:text-[66px] lg:text-[68px] xl:text-[76px]">
          Crypto
        </span>
        <span className="mt-1 block text-[44px] leading-[1.02] min-[420px]:text-[50px] sm:text-[58px] md:text-[66px] lg:text-[68px] xl:text-[76px]">
          <span className="bg-gradient-to-r from-[#9333EA] via-[#D946EF] to-[#F97316] bg-clip-text text-transparent drop-shadow-[0_4px_24px_rgba(217,70,239,0.25)]">
            Differently.
          </span>
        </span>
      </motion.h1>

      {/* Subheadline */}
      <motion.p
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transition(0.34)}
        className="mt-5 text-[17px] font-normal leading-[1.4] text-white/80 sm:text-[19px] md:text-[20px]"
      >
        Same Market. More Angles.
        <br />
        Better Decisions.
      </motion.p>

      {/* Category Tagline */}
      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transition(0.44)}
        className="mt-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8F9BB3]/80 sm:text-xs"
      >
        <span>MARKETS</span>
        <span className="h-1 w-1 rounded-full bg-[#8F9BB3]/50" />
        <span>PEOPLE</span>
        <span className="h-1 w-1 rounded-full bg-[#8F9BB3]/50" />
        <span>INSIGHTS</span>
      </motion.div>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transition(0.54)}
        className="mt-8 flex w-full flex-col gap-3.5 sm:w-auto sm:min-w-[280px]"
      >
        {/* Primary CTA: Join Discord */}
        <a
          href="/login?plan=free"
          className="group relative inline-flex min-h-[52px] w-full items-center justify-between gap-3 rounded-2xl bg-gradient-to-r from-[#7C3AED] via-[#6366F1] to-[#4F46E5] px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_0_28px_rgba(124,58,237,0.45),inset_0_1px_0_rgba(255,255,255,0.2)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_0_36px_rgba(124,58,237,0.6)] hover:brightness-110 sm:min-h-[56px] sm:px-7 sm:text-base"
        >
          <span className="flex items-center gap-3">
            <DiscordIcon className="h-5 w-5 shrink-0" />
            <span>Join Discord</span>
          </span>
          <ArrowRight
            className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
            strokeWidth={2}
          />
        </a>

        {/* Secondary CTA: Explore Analysts */}
        <Link
          href="#analysts"
          className="group inline-flex min-h-[50px] w-full items-center justify-between gap-3 rounded-2xl border border-white/[0.12] bg-[#0c101d]/60 px-6 py-3.5 text-[15px] font-semibold text-white/90 shadow-[0_4px_20px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-white/25 hover:bg-[#0f1528]/80 hover:text-white sm:min-h-[54px] sm:px-7 sm:text-base"
        >
          <span className="flex items-center gap-3">
            <User className="h-5 w-5 shrink-0 text-white/70 group-hover:text-white" strokeWidth={1.75} />
            <span>Explore Analysts</span>
          </span>
          <ArrowRight
            className="h-4 w-4 shrink-0 opacity-60 transition-transform duration-200 group-hover:translate-x-1 group-hover:opacity-100"
            strokeWidth={2}
          />
        </Link>
      </motion.div>
    </div>
  );
}
