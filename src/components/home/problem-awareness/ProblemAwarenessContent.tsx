'use client';

import React from 'react';
import SectionContainer from '../shared/SectionContainer';
import GradientText from '../shared/GradientText';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

type ProblemCard = {
  num: string;
  color: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
};

const PROBLEM_CARDS: ProblemCard[] = [
  {
    num: '01',
    color: '#A855F7',
    title: 'Scattered Knowledge',
    desc: 'Content everywhere.\nNo clear framework.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
  {
    num: '02',
    color: '#F97316',
    title: 'Conflicting Opinions',
    desc: 'Different analysts.\nDifferent narratives.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    num: '03',
    color: '#06D6F7',
    title: 'Fragmented Context',
    desc: 'Signals in isolation.\nHard to connect.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    num: '04',
    color: '#EC4899',
    title: 'Endless Search',
    desc: 'New groups, new analysts.\nSame cycle.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="1 4 1 10 7 10" />
        <path d="M3.51 15a9 9 0 1 0 .49-4.47" />
      </svg>
    ),
  },
  {
    num: '05',
    color: '#F59E0B',
    title: 'Multiple Analysts',
    desc: 'Multiple subscriptions.\nNo unified context.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
  },
  {
    num: '06',
    color: '#6366F1',
    title: 'Lost Time & Confidence',
    desc: 'More noise. More confusion.\nNo real progress.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
        <polyline points="6 14 12 8 15 11 18 6" />
        <line x1="3" y1="20" x2="21" y2="20" />
      </svg>
    ),
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ProblemAwarenessContent() {
  return (
    <SectionContainer band="medium">

      {/* ══════════════════════════════════════════════════════════════
          BLOCK A — UPPER EDITORIAL HEADER
          ══════════════════════════════════════════════════════════════ */}
      <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-12 xl:gap-16 mb-10 lg:mb-12">

        {/* ── LEFT: Eyebrow + Large Headline + supporting copy ────── */}
        <div className="flex flex-col flex-1">
          <div className="flex items-center gap-4 mb-7 opacity-90">
            <span className="font-semibold text-sm tracking-[0.2em] text-[#FF5C7A]">
              02
            </span>
            <div className="w-12 h-px bg-[#FF5C7A]/40" />
            <span className="uppercase text-[13px] sm:text-sm font-semibold tracking-[0.22em] text-[#D07286]">
              The Trader&apos;s Reality
            </span>
          </div>

          {/* EDITORIAL HEADLINE — ~30% smaller than previous implementation */}
          <h2 className="text-[28px] sm:text-[36px] lg:text-[40px] xl:text-[44px] font-bold leading-[1.08] tracking-tight text-white mb-7">
            The market wasn&apos;t the hard part.
            <br />
            <GradientText from="#FF758F" to="#FF3B5C">
              Finding clarity was.
            </GradientText>
          </h2>

          {/* Supporting copy — two compact statements */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 max-w-2xl">
            <p className="text-[#9CA3AF] text-[15px] leading-relaxed">
              Every trader starts with the same goal:{' '}
              <span className="text-white/85">learn, improve, and become consistently profitable.</span>
            </p>
            <p className="text-[#9CA3AF] text-[15px] leading-relaxed">
              Information is everywhere — across analysts, groups, strategies and narratives.
            </p>
          </div>
        </div>

        {/* ── RIGHT: Accent statement ──────────────────────────────── */}
        <div className="flex-shrink-0 lg:w-[220px] xl:w-[240px] flex flex-col justify-end lg:pt-[calc(1.75rem+36px+20px)] xl:pt-[calc(1.75rem+44px+20px)]">
          <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#9AA2B2] leading-relaxed">
            Most traders don&apos;t lack effort.
          </p>
          <p className="text-[18px] sm:text-[20px] font-bold tracking-[0.04em] uppercase leading-snug mt-2">
            <GradientText from="#FF758F" to="#FF3B5C">
              They lack context.
            </GradientText>
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          BLOCK B — 3×2 PROBLEM CARD GRID
          ══════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
        {PROBLEM_CARDS.map((card) => (
          <div
            key={card.num}
            className="relative flex flex-col gap-4 rounded-2xl border border-white/[0.07] bg-[#0B080A]/95 p-6 transition-colors hover:border-white/[0.13] hover:bg-[#110D10]"
          >
            {/* ── Number + Icon ── */}
            <div className="flex items-center justify-between">
              <span
                className="text-[11px] font-bold tracking-[0.25em] uppercase"
                style={{ color: card.color }}
              >
                {card.num}
              </span>
              <span
                className="flex items-center justify-center w-10 h-10 rounded-xl border opacity-90"
                style={{
                  color: card.color,
                  borderColor: `${card.color}30`,
                  backgroundColor: `${card.color}10`,
                }}
              >
                {card.icon}
              </span>
            </div>

            {/* ── Title ── */}
            <h4 className="text-white font-semibold text-[16px] leading-snug tracking-[-0.01em]">
              {card.title}
            </h4>

            {/* ── Description ── */}
            <p className="text-[#9CA3AF] text-[13px] leading-relaxed whitespace-pre-line">
              {card.desc}
            </p>
          </div>
        ))}
      </div>



    </SectionContainer>
  );
}
