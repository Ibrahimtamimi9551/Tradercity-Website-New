"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import HeroCTAGroup from "./HeroCTAGroup";

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

      {/* CTAs â€” desktop only; on mobile these appear below the card via Hero.tsx */}
      <HeroCTAGroup className="mt-8 hidden lg:flex" />
    </div>
  );
}


