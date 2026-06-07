//Gemini Iteration 1 

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { learningFrameworks } from './learningFrameworks';
import { microstructureReports } from './microstructureReports';

// ─── Icons ────────────────────────────────────────────────────────────────────

function LockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function BookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

function FileTextIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );
}

function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function CheckCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function ExternalLinkIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function ShieldIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function TrendingUpIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}

function UsersIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

type ActiveMode = 'frameworks' | 'reports';

function levelBadgeClass(level: string): string {
  switch (level) {
    case 'Beginner':     return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/25';
    case 'Intermediate': return 'text-amber-400 bg-amber-400/10 border-amber-400/25';
    case 'Advanced':     return 'text-rose-400 bg-rose-400/10 border-rose-400/25';
    default:             return 'text-white/45 bg-white/5 border-white/10';
  }
}

// ─── Closing ribbon data ──────────────────────────────────────────────────────

const ribbonCards = [
  {
    icon: BookIcon,
    title: 'Curated By\nActive Traders',
    desc: 'Real market experience.\nReal frameworks.',
  },
  {
    icon: ShieldIcon,
    title: 'Institutional\nGrade Research',
    desc: 'Data-driven.\nProcess-tested.\nRepeatable.',
  },
  {
    icon: LockIcon,
    title: 'Members Get\nFull Access',
    desc: 'Deep reports, frameworks\n& exclusive insights.',
  },
  {
    icon: TrendingUpIcon,
    title: 'Built For\nSerious Traders',
    desc: 'Clarity over noise.\nProcess over emotion.',
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function Section8Content() {
  const [activeMode, setActiveMode] = useState<ActiveMode>('frameworks');
  const [activeModuleIdx, setActiveModuleIdx] = useState(0);
  const [activeTopicIdx, setActiveTopicIdx] = useState(0);
  const [activeCategoryIdx, setActiveCategoryIdx] = useState(0);
  const [activeReportIdx, setActiveReportIdx] = useState(0);

  const currentModule   = learningFrameworks[activeModuleIdx];
  const currentTopic    = currentModule?.topics[activeTopicIdx];
  const currentCategory = microstructureReports[activeCategoryIdx];
  const currentReport   = currentCategory?.reports[activeReportIdx];

  const handleModeSwitch = (mode: ActiveMode) => {
    setActiveMode(mode);
    setActiveModuleIdx(0);
    setActiveTopicIdx(0);
    setActiveCategoryIdx(0);
    setActiveReportIdx(0);
  };

  const handlePrev = () => {
    if (activeMode === 'frameworks') {
      if (activeTopicIdx > 0) {
        setActiveTopicIdx(i => i - 1);
      } else if (activeModuleIdx > 0) {
        const newMod = activeModuleIdx - 1;
        setActiveModuleIdx(newMod);
        setActiveTopicIdx(learningFrameworks[newMod].topics.length - 1);
      }
    } else {
      if (activeReportIdx > 0) {
        setActiveReportIdx(i => i - 1);
      } else if (activeCategoryIdx > 0) {
        const newCat = activeCategoryIdx - 1;
        setActiveCategoryIdx(newCat);
        setActiveReportIdx(microstructureReports[newCat].reports.length - 1);
      }
    }
  };

  const handleNext = () => {
    if (activeMode === 'frameworks') {
      const topics = currentModule?.topics ?? [];
      if (activeTopicIdx < topics.length - 1) {
        setActiveTopicIdx(i => i + 1);
      } else if (activeModuleIdx < learningFrameworks.length - 1) {
        setActiveModuleIdx(i => i + 1);
        setActiveTopicIdx(0);
      }
    } else {
      const reports = currentCategory?.reports ?? [];
      if (activeReportIdx < reports.length - 1) {
        setActiveReportIdx(i => i + 1);
      } else if (activeCategoryIdx < microstructureReports.length - 1) {
        setActiveCategoryIdx(i => i + 1);
        setActiveReportIdx(0);
      }
    }
  };

  const terminalLabel = activeMode === 'frameworks'
    ? 'TRADERCITY RESEARCH FRAMEWORK PREVIEW'
    : 'TRADERCITY MICROSTRUCTURE REPORT ARCHIVE';

  return (
    <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16 py-16 lg:py-24">

      {/* ── Main layout ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row gap-8 xl:gap-10 items-start">

        {/* ── LEFT COLUMN ──────────────────────────────────────────────────── */}
        <div className="w-full lg:w-[288px] xl:w-[308px] shrink-0 flex flex-col gap-6">

          {/* Section label */}
          <div className="flex items-center gap-3">
            <span className="text-[#D4AF37] font-semibold tracking-[0.3em] text-sm">08</span>
            <div className="h-px w-4 bg-[#D4AF37]" />
            <span className="text-[#D4AF37] font-semibold tracking-[0.2em] text-xs uppercase">Knowledge Vault</span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl xl:text-[2.75rem] font-bold text-white leading-[1.1] tracking-tight">
            Research.
            <br />
            Frameworks.
            <br />
            <span className="text-[#D4AF37]">Context.</span>
          </h2>

          {/* Description */}
          <p className="text-white/50 text-sm leading-relaxed">
            Hundreds of educational lessons.
            <br />
            Hundreds of research publications.
            <br />
            <br />
            Created by active traders who document what they learn, so you can trade with more clarity and confidence.
          </p>

          {/* Mode switcher */}
          <div className="flex flex-col gap-2">
            {(
              [
                {
                  mode: 'frameworks' as ActiveMode,
                  icon: BookIcon,
                  label: 'Educational Frameworks',
                  sub: '50+ lessons across multiple modules',
                },
                {
                  mode: 'reports' as ActiveMode,
                  icon: FileTextIcon,
                  label: 'Market Microstructure Reports',
                  sub: '400+ reports across all market cycles',
                },
              ] as const
            ).map(({ mode, icon: Icon, label, sub }) => {
              const active = activeMode === mode;
              return (
                <button
                  key={mode}
                  onClick={() => handleModeSwitch(mode)}
                  className={`w-full flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl border text-left transition-all duration-200 ${
                    active
                      ? 'border-[#D4AF37]/30 bg-[#D4AF37]/[0.04]'
                      : 'border-white/8 bg-white/[0.012] hover:border-white/15 hover:bg-white/[0.02]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 transition-colors ${active ? 'border-[#D4AF37]/28 text-[#D4AF37]' : 'border-white/10 text-white/30'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className={`text-[13px] font-semibold leading-tight transition-colors ${active ? 'text-white' : 'text-white/52'}`}>
                        {label}
                      </p>
                      <p className="text-[10px] text-white/28 mt-0.5">{sub}</p>
                    </div>
                  </div>
                  <ChevronDownIcon className={`w-4 h-4 shrink-0 transition-all duration-200 ${active ? 'rotate-180 text-[#D4AF37]' : 'text-white/18'}`} />
                </button>
              );
            })}
          </div>

          {/* Preview box */}
          <div className="border border-white/8 rounded-xl p-4 bg-white/[0.01] flex flex-col gap-3">
            <p className="text-[#D4AF37] text-[10px] font-bold tracking-[0.22em] uppercase">
              This Is Just A Preview
            </p>
            <p className="text-white/38 text-xs">The complete archive contains:</p>
            <ul className="flex flex-col gap-1.5">
              {[
                '50+ Educational Lessons',
                '400+ Research Reports',
                'Weekly Intelligence Reports',
                'Monthly BTC & Altcoin Outlooks',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircleIcon className="w-3.5 h-3.5 text-[#D4AF37]/55 shrink-0" />
                  <span className="text-white/52 text-xs">{item}</span>
                </li>
              ))}
            </ul>
            <motion.a
              href="#"
              whileHover={{ x: 3 }}
              transition={{ duration: 0.14 }}
              className="inline-flex items-center gap-2 text-[#D4AF37] text-xs font-semibold mt-1 hover:text-[#F5CC5A] transition-colors"
            >
              <ArrowRightIcon className="w-3 h-3 shrink-0" />
              Explore Educational &amp; Research Library
            </motion.a>
          </div>
        </div>

        {/* ── TERMINAL ─────────────────────────────────────────────────────── */}
        <div className="flex-1 min-w-0 border border-white/10 rounded-2xl overflow-hidden flex flex-col bg-[#07070F]/55 backdrop-blur-sm lg:h-[840px]">

          {/* Terminal header */}
          <div className="flex items-center justify-between px-5 py-2.5 border-b border-white/8 bg-black/15 shrink-0">
            <AnimatePresence mode="wait">
              <motion.span
                key={terminalLabel}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="text-[#D4AF37] text-[9px] sm:text-[10px] font-bold tracking-[0.28em] uppercase truncate mr-4"
              >
                {terminalLabel}
              </motion.span>
            </AnimatePresence>
            <div className="flex items-center gap-1.5 shrink-0">
              <motion.button
                onClick={handlePrev}
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.93 }}
                transition={{ duration: 0.11 }}
                aria-label="Previous"
                className="w-7 h-7 rounded border border-white/10 flex items-center justify-center text-white/30 hover:text-white/65 hover:border-white/20 transition-colors"
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </motion.button>
              <motion.button
                onClick={handleNext}
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.93 }}
                transition={{ duration: 0.11 }}
                aria-label="Next"
                className="w-7 h-7 rounded border border-white/10 flex items-center justify-center text-white/30 hover:text-white/65 hover:border-white/20 transition-colors"
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </motion.button>
            </div>
          </div>

          {/* Module / Category tab row — compact */}
          <div
            className="flex border-b border-white/8 bg-black/10 shrink-0 overflow-x-auto"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <AnimatePresence mode="wait">
              {activeMode === 'frameworks'
                ? learningFrameworks.map((mod, i) => {
                    const isActive = activeModuleIdx === i;
                    return (
                      <button
                        key={mod.id}
                        onClick={() => { setActiveModuleIdx(i); setActiveTopicIdx(0); }}
                        className={`relative flex flex-col items-start justify-center px-4 xl:px-5 py-2 border-r border-white/8 shrink-0 min-w-[130px] xl:min-w-[145px] transition-all duration-200 ${
                          isActive ? 'bg-[#D4AF37]/[0.04]' : 'hover:bg-white/[0.02]'
                        }`}
                      >
                        <span className={`text-[8px] font-bold tracking-[0.28em] uppercase mb-0.5 transition-colors ${isActive ? 'text-[#D4AF37]' : 'text-white/22'}`}>
                          MODULE {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className={`text-[11px] font-semibold leading-tight transition-colors ${isActive ? 'text-[#D4AF37]' : 'text-white/52'}`}>
                          {mod.title}
                        </span>
                        {isActive && (
                          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4AF37]" />
                        )}
                      </button>
                    );
                  })
                : microstructureReports.map((cat, i) => {
                    const isActive = activeCategoryIdx === i;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => { setActiveCategoryIdx(i); setActiveReportIdx(0); }}
                        className={`relative flex flex-col items-start justify-center px-4 xl:px-5 py-2 border-r border-white/8 shrink-0 min-w-[130px] xl:min-w-[145px] transition-all duration-200 ${
                          isActive ? 'bg-[#D4AF37]/[0.04]' : 'hover:bg-white/[0.02]'
                        }`}
                      >
                        <span className={`text-[8px] font-bold tracking-[0.28em] uppercase mb-0.5 transition-colors ${isActive ? 'text-[#D4AF37]' : 'text-white/22'}`}>
                          CATEGORY {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className={`text-[11px] font-semibold leading-tight transition-colors ${isActive ? 'text-[#D4AF37]' : 'text-white/52'}`}>
                          {cat.title}
                        </span>
                        {isActive && (
                          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4AF37]" />
                        )}
                      </button>
                    );
                  })
              }
            </AnimatePresence>
          </div>

          {/* Content area: list panel + viewer */}
          <div className="flex flex-col lg:flex-row flex-1 min-h-0 overflow-hidden">

            {/* ── List panel ── */}
            <div className="w-full lg:w-[196px] xl:w-[218px] shrink-0 border-b lg:border-b-0 lg:border-r border-white/8 flex flex-col max-h-[260px] lg:max-h-none overflow-hidden">
              <div className="px-4 py-2 border-b border-white/8 bg-black/10 shrink-0">
                <span className="text-[9px] font-bold tracking-[0.28em] uppercase text-[#D4AF37]/65">
                  {activeMode === 'frameworks' ? 'Lessons Preview' : 'Reports'}
                </span>
              </div>

              <div className="flex-1 overflow-y-auto">
                <AnimatePresence mode="wait">
                  {activeMode === 'frameworks' ? (
                    <motion.div
                      key={`lf-list-${activeModuleIdx}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      {currentModule?.topics.map((topic, i) => {
                        const isActive = activeTopicIdx === i;
                        return (
                          <button
                            key={topic.id}
                            onClick={() => setActiveTopicIdx(i)}
                            className={`relative w-full flex items-start gap-3 px-4 py-2 border-b border-white/[0.035] text-left transition-all duration-150 ${
                              isActive ? 'bg-[#D4AF37]/[0.055]' : 'hover:bg-white/[0.02]'
                            }`}
                          >
                            {isActive && (
                              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#D4AF37]" />
                            )}
                            <span className={`text-[9px] font-bold tracking-wide shrink-0 mt-0.5 w-4 ${isActive ? 'text-[#D4AF37]' : 'text-white/20'}`}>
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            <div className="flex-1 min-w-0">
                              <p className={`text-[11px] font-semibold leading-snug ${isActive ? 'text-white' : 'text-white/52'}`}>
                                {topic.title}
                              </p>
                              <p className="text-[10px] text-white/26 mt-0.5">{topic.readTime}</p>
                            </div>
                            {topic.locked && (
                              <LockIcon className="w-3 h-3 text-white/20 shrink-0 mt-0.5" />
                            )}
                          </button>
                        );
                      })}
                      <div className="flex items-center gap-2 px-4 py-2.5">
                        <LockIcon className="w-3 h-3 text-white/18 shrink-0" />
                        <p className="text-[10px] text-white/26 leading-relaxed">
                          Additional lessons are for VIP members.
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={`mr-list-${activeCategoryIdx}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      {currentCategory?.reports.map((report, i) => {
                        const isActive = activeReportIdx === i;
                        return (
                          <button
                            key={report.id}
                            onClick={() => setActiveReportIdx(i)}
                            className={`relative w-full flex items-start gap-3 px-4 py-2 border-b border-white/[0.035] text-left transition-all duration-150 ${
                              isActive ? 'bg-[#D4AF37]/[0.055]' : 'hover:bg-white/[0.02]'
                            }`}
                          >
                            {isActive && (
                              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#D4AF37]" />
                            )}
                            <span className={`text-[9px] font-bold tracking-wide shrink-0 mt-0.5 w-4 ${isActive ? 'text-[#D4AF37]' : 'text-white/20'}`}>
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            <div className="flex-1 min-w-0">
                              <p className={`text-[11px] font-semibold leading-snug ${isActive ? 'text-white' : 'text-white/52'}`}>
                                {report.title}
                              </p>
                              <p className="text-[10px] text-white/26 mt-0.5">{report.date}</p>
                              <p className="text-[10px] text-white/22 mt-0.5">{report.analyst}</p>
                            </div>
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* ── Content viewer ── */}
            <div className="flex-1 min-w-0 min-h-0 flex flex-col overflow-hidden">
              {/* Viewer sub-header */}
              <div className="flex items-center justify-between px-5 py-2 border-b border-white/8 bg-black/10 shrink-0">
                <span className="text-[9px] font-bold tracking-[0.28em] uppercase text-white/28">
                  {activeMode === 'frameworks' ? 'Concept Breakdown' : 'Report Overview'}
                </span>
                <motion.a
                  href="#"
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.12 }}
                  className="inline-flex items-center gap-1.5 text-[#D4AF37]/75 text-[10px] font-semibold hover:text-[#D4AF37] transition-colors"
                >
                  {activeMode === 'frameworks' ? 'Open Full Lesson' : 'Open Full Report'}
                  <ExternalLinkIcon className="w-3 h-3" />
                </motion.a>
              </div>

              {/* Scrollable content */}
              <div className="flex-1 overflow-y-auto min-h-0 px-6 py-5">
                <AnimatePresence mode="wait">
                  {activeMode === 'frameworks' && currentTopic ? (
                    <motion.div
                      key={currentTopic.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      className="max-w-2xl"
                    >
                      {/* Lesson image */}
                      {currentTopic.image && (
                        <div className="w-full h-36 rounded-xl overflow-hidden mb-5 bg-white/[0.025] border border-white/8">
                          <img
                            src={currentTopic.image}
                            alt={currentTopic.title}
                            className="w-full h-full object-cover opacity-60"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).parentElement!.style.display = 'none';
                            }}
                          />
                        </div>
                      )}

                      {/* Title */}
                      <h3 className="text-xl sm:text-2xl lg:text-[1.7rem] font-bold text-white mb-3 leading-tight">
                        {currentTopic.title}
                      </h3>

                      {/* Meta row */}
                      <div className="flex items-center gap-3 mb-4 flex-wrap">
                        <div className="flex items-center gap-1.5 text-white/38">
                          <ClockIcon className="w-3.5 h-3.5" />
                          <span className="text-xs">{currentTopic.readTime}</span>
                        </div>
                        <span className={`text-[10px] font-bold tracking-[0.12em] uppercase border rounded px-2 py-0.5 ${levelBadgeClass(currentTopic.level)}`}>
                          {currentTopic.level}
                        </span>
                      </div>

                      <div className="w-full h-px bg-white/8 mb-4" />

                      {/* Introduction */}
                      <p className="text-white/58 text-sm leading-relaxed mb-5">
                        {currentTopic.content.introduction}
                      </p>

                      {/* Sections */}
                      {currentTopic.content.sections.map((section, si) => (
                        <div key={si} className="mb-5">
                          <h4 className="text-white/88 text-[13px] font-bold mb-2.5 leading-snug">
                            {section.heading}
                          </h4>
                          {section.paragraphs.map((p, pi) => (
                            <p key={pi} className="text-white/52 text-sm leading-relaxed mb-2.5">
                              {p}
                            </p>
                          ))}
                          {section.bullets && section.bullets.length > 0 && (
                            <ul className="flex flex-col gap-1.5 mt-2.5 ml-1">
                              {section.bullets.map((b, bi) => (
                                <li key={bi} className="flex items-start gap-2.5">
                                  <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/48 mt-1.5 shrink-0" />
                                  <span className="text-white/48 text-sm leading-relaxed">{b}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}

                      {/* Key takeaways */}
                      {currentTopic.content.takeaways.length > 0 && (
                        <div className="border border-[#D4AF37]/12 rounded-xl bg-[#D4AF37]/[0.022] p-4 mt-1">
                          <h4 className="text-[#D4AF37] text-[9px] font-bold tracking-[0.28em] uppercase mb-2.5">
                            Key Takeaways
                          </h4>
                          <ul className="flex flex-col gap-2">
                            {currentTopic.content.takeaways.map((t, ti) => (
                              <li key={ti} className="flex items-start gap-2.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/42 mt-1.5 shrink-0" />
                                <span className="text-white/52 text-xs leading-relaxed">{t}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </motion.div>
                  ) : activeMode === 'reports' && currentReport ? (
                    <motion.div
                      key={currentReport.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      className="max-w-2xl"
                    >
                      {/* Thumbnail */}
                      {currentReport.thumbnail && (
                        <div className="w-full h-36 rounded-xl overflow-hidden mb-5 bg-white/[0.025] border border-white/8">
                          <img
                            src={currentReport.thumbnail}
                            alt={currentReport.title}
                            className="w-full h-full object-cover opacity-60"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).parentElement!.style.display = 'none';
                            }}
                          />
                        </div>
                      )}

                      {/* Title */}
                      <h3 className="text-xl sm:text-2xl lg:text-[1.7rem] font-bold text-white mb-3 leading-tight">
                        {currentReport.title}
                      </h3>

                      {/* Meta row */}
                      <div className="flex items-center gap-3 mb-4 flex-wrap">
                        <div className="flex items-center gap-1.5 text-white/38">
                          <CalendarIcon className="w-3.5 h-3.5" />
                          <span className="text-xs">{currentReport.date}</span>
                        </div>
                        <span className="text-[10px] font-bold text-[#D4AF37]/78 border border-[#D4AF37]/18 bg-[#D4AF37]/[0.04] rounded px-2 py-0.5">
                          {currentReport.analyst}
                        </span>
                      </div>

                      <div className="w-full h-px bg-white/8 mb-4" />

                      {/* Summary */}
                      <p className="text-white/60 text-sm leading-relaxed mb-4">
                        {currentReport.summary}
                      </p>

                      {/* Introduction note */}
                      {currentReport.content.introduction && (
                        <p className="text-white/42 text-sm leading-relaxed mb-4 border-l-2 border-[#D4AF37]/18 pl-4 italic">
                          {currentReport.content.introduction}
                        </p>
                      )}

                      {/* Sections */}
                      {currentReport.content.sections.map((section, si) => (
                        <div key={si} className="mb-4">
                          <h4 className="text-white/88 text-[13px] font-bold mb-2 leading-snug">
                            {section.heading}
                          </h4>
                          {section.paragraphs.map((p, pi) => (
                            <p key={pi} className="text-white/48 text-sm leading-relaxed mb-2">{p}</p>
                          ))}
                        </div>
                      ))}

                      {/* Key points */}
                      {currentReport.content.takeaways.length > 0 && (
                        <div className="border border-[#D4AF37]/12 rounded-xl bg-[#D4AF37]/[0.022] p-4 mt-1">
                          <h4 className="text-[#D4AF37] text-[9px] font-bold tracking-[0.28em] uppercase mb-2.5">
                            Key Points
                          </h4>
                          <ul className="flex flex-col gap-2">
                            {currentReport.content.takeaways.map((t, ti) => (
                              <li key={ti} className="flex items-start gap-2.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/42 mt-1.5 shrink-0" />
                                <span className="text-white/48 text-xs leading-relaxed">{t}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* HTML report note */}
                      {currentReport.reportUrl && (
                        // TODO: Replace local report content with backend report content
                        // TODO: Support standalone HTML reports loaded via reportUrl
                        // TODO: Future report endpoint — GET /reports/:id
                        <div className="mt-4 border border-white/8 rounded-xl p-3.5 flex items-start gap-3 bg-white/[0.008]">
                          <FileTextIcon className="w-4 h-4 text-white/22 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-white/42 text-xs">Full report available as standalone HTML document</p>
                            <p className="text-white/20 text-[10px] font-mono mt-1">{currentReport.reportUrl}</p>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── CLOSING RIBBON ───────────────────────────────────────────────────── */}
      <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 border border-white/8 rounded-xl overflow-hidden">
        {ribbonCards.map(({ icon: Icon, title, desc }, i) => (
          <div
            key={i}
            className={`flex items-center gap-4 px-5 py-5 border-white/8 hover:bg-white/[0.02] transition-colors duration-200 ${
              i < ribbonCards.length - 1
                ? 'border-b lg:border-b-0 lg:border-r col-span-1'
                : ''
            } ${i === 1 ? 'border-b lg:border-b-0' : ''}`}
          >
            <div className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center shrink-0 text-white/30">
              <Icon className="w-4 h-4" />
            </div>
            <div>
              <p className="text-white/85 text-[13px] font-bold leading-tight whitespace-pre-line mb-1">
                {title}
              </p>
              <p className="text-white/35 text-[11px] leading-relaxed whitespace-pre-line">
                {desc}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}




// // export default function Section8Content() {
// //   return (
// //     <div className="relative z-10 mx-auto flex min-h-[1000px] w-full max-w-[1440px] items-center justify-center px-6">
// //       <div className="rounded-3xl border border-[#D4AF37]/30 bg-[#050816]/80 px-12 py-10 text-center backdrop-blur-sm">
// //         <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#D4AF37]">
// //           08 • KNOWLEDGE VAULT
// //         </p>

// //         <h2 className="text-5xl font-semibold text-white">
// //           TraderCity Research Framework Preview
// //         </h2>

// //         <p className="mt-4 text-white/60">
// //           Section8Content.tsx is rendering successfully.
// //         </p>
// //       </div>
// //     </div>
// //   );
// // }


// 'use client';

// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { learningFrameworks } from './learningFrameworks';
// import { microstructureReports } from './microstructureReports';

// // ─── Icons ────────────────────────────────────────────────────────────────────

// function LockIcon(props: React.SVGProps<SVGSVGElement>) {
//   return (
//     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
//       <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
//       <path d="M7 11V7a5 5 0 0 1 10 0v4" />
//     </svg>
//   );
// }

// function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
//   return (
//     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
//       <circle cx="12" cy="12" r="10" />
//       <polyline points="12 6 12 12 16 14" />
//     </svg>
//   );
// }

// function BookIcon(props: React.SVGProps<SVGSVGElement>) {
//   return (
//     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
//       <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
//       <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
//     </svg>
//   );
// }

// function FileTextIcon(props: React.SVGProps<SVGSVGElement>) {
//   return (
//     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
//       <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
//       <polyline points="14 2 14 8 20 8" />
//       <line x1="16" y1="13" x2="8" y2="13" />
//       <line x1="16" y1="17" x2="8" y2="17" />
//     </svg>
//   );
// }

// function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
//   return (
//     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
//       <polyline points="6 9 12 15 18 9" />
//     </svg>
//   );
// }

// function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
//   return (
//     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
//       <line x1="5" y1="12" x2="19" y2="12" />
//       <polyline points="12 5 19 12 12 19" />
//     </svg>
//   );
// }

// function CheckCircleIcon(props: React.SVGProps<SVGSVGElement>) {
//   return (
//     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
//       <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
//       <polyline points="22 4 12 14.01 9 11.01" />
//     </svg>
//   );
// }

// function ExternalLinkIcon(props: React.SVGProps<SVGSVGElement>) {
//   return (
//     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
//       <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
//       <polyline points="15 3 21 3 21 9" />
//       <line x1="10" y1="14" x2="21" y2="3" />
//     </svg>
//   );
// }

// function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
//   return (
//     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
//       <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
//       <line x1="16" y1="2" x2="16" y2="6" />
//       <line x1="8" y1="2" x2="8" y2="6" />
//       <line x1="3" y1="10" x2="21" y2="10" />
//     </svg>
//   );
// }

// function PrevIcon() {
//   return (
//     <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//       <polyline points="15 18 9 12 15 6" />
//     </svg>
//   );
// }

// function NextIcon() {
//   return (
//     <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//       <polyline points="9 18 15 12 9 6" />
//     </svg>
//   );
// }

// // ─── Helpers ──────────────────────────────────────────────────────────────────

// type ActiveMode = 'frameworks' | 'reports';

// function levelBadgeClass(level: string): string {
//   switch (level) {
//     case 'Beginner':     return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/25';
//     case 'Intermediate': return 'text-amber-400 bg-amber-400/10 border-amber-400/25';
//     case 'Advanced':     return 'text-rose-400 bg-rose-400/10 border-rose-400/25';
//     default:             return 'text-white/45 bg-white/5 border-white/10';
//   }
// }

// // ─── Component ────────────────────────────────────────────────────────────────

// export default function Section8Content() {
//   const [activeMode, setActiveMode] = useState<ActiveMode>('frameworks');
//   const [activeModuleIdx, setActiveModuleIdx] = useState(0);
//   const [activeTopicIdx, setActiveTopicIdx] = useState(0);
//   const [activeCategoryIdx, setActiveCategoryIdx] = useState(0);
//   const [activeReportIdx, setActiveReportIdx] = useState(0);

//   const currentModule   = learningFrameworks[activeModuleIdx];
//   const currentTopic    = currentModule?.topics[activeTopicIdx];
//   const currentCategory = microstructureReports[activeCategoryIdx];
//   const currentReport   = currentCategory?.reports[activeReportIdx];

//   const handleModeSwitch = (mode: ActiveMode) => {
//     setActiveMode(mode);
//     setActiveModuleIdx(0);
//     setActiveTopicIdx(0);
//     setActiveCategoryIdx(0);
//     setActiveReportIdx(0);
//   };

//   const handlePrev = () => {
//     if (activeMode === 'frameworks') {
//       if (activeTopicIdx > 0) {
//         setActiveTopicIdx(i => i - 1);
//       } else if (activeModuleIdx > 0) {
//         const newMod = activeModuleIdx - 1;
//         setActiveModuleIdx(newMod);
//         setActiveTopicIdx(learningFrameworks[newMod].topics.length - 1);
//       }
//     } else {
//       if (activeReportIdx > 0) {
//         setActiveReportIdx(i => i - 1);
//       } else if (activeCategoryIdx > 0) {
//         const newCat = activeCategoryIdx - 1;
//         setActiveCategoryIdx(newCat);
//         setActiveReportIdx(microstructureReports[newCat].reports.length - 1);
//       }
//     }
//   };

//   const handleNext = () => {
//     if (activeMode === 'frameworks') {
//       const topics = currentModule?.topics ?? [];
//       if (activeTopicIdx < topics.length - 1) {
//         setActiveTopicIdx(i => i + 1);
//       } else if (activeModuleIdx < learningFrameworks.length - 1) {
//         setActiveModuleIdx(i => i + 1);
//         setActiveTopicIdx(0);
//       }
//     } else {
//       const reports = currentCategory?.reports ?? [];
//       if (activeReportIdx < reports.length - 1) {
//         setActiveReportIdx(i => i + 1);
//       } else if (activeCategoryIdx < microstructureReports.length - 1) {
//         setActiveCategoryIdx(i => i + 1);
//         setActiveReportIdx(0);
//       }
//     }
//   };

//   const terminalLabel = activeMode === 'frameworks'
//     ? 'TRADERCITY RESEARCH FRAMEWORK PREVIEW'
//     : 'TRADERCITY MICROSTRUCTURE REPORT ARCHIVE';

//   return (
//     <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16 py-16 lg:py-24">
//       <div className="flex flex-col lg:flex-row gap-8 xl:gap-10 items-start min-h-[1200px]">

//         {/* ── LEFT COLUMN ──────────────────────────────────────────────────── */}
//         <div className="w-full lg:w-[250px] xl:w-[268px] shrink-0 flex flex-col gap-6">

//           {/* Section label */}
//           <div className="flex items-center gap-3">
//             <span className="text-[#D4AF37] font-semibold tracking-[0.3em] text-sm">08</span>
//             <div className="h-px w-4 bg-[#D4AF37]" />
//             <span className="text-[#D4AF37] font-semibold tracking-[0.2em] text-xs uppercase">Knowledge Vault</span>
//           </div>

//           {/* Headline */}
//           <h2 className="text-3xl sm:text-4xl xl:text-[2.75rem] font-bold text-white leading-[1.1] tracking-tight">
//             Research.
//             <br />
//             Frameworks.
//             <br />
//             <span className="text-[#D4AF37]">Context.</span>
//           </h2>

//           {/* Description */}
//           <p className="text-white/50 text-sm leading-relaxed">
//             Hundreds of educational lessons.
//             <br />
//             Hundreds of research publications.
//             <br />
//             <br />
//             Created by active traders who document what they learn, so you can trade with more clarity and confidence.
//           </p>

//           {/* Mode switcher */}
//           <div className="flex flex-col gap-2">
//             {(
//               [
//                 {
//                   mode: 'frameworks' as ActiveMode,
//                   icon: BookIcon,
//                   label: 'Educational Frameworks',
//                   sub: '50+ lessons across multiple modules',
//                 },
//                 {
//                   mode: 'reports' as ActiveMode,
//                   icon: FileTextIcon,
//                   label: 'Market Microstructure Reports',
//                   sub: '400+ reports across all market cycles',
//                 },
//               ] as const
//             ).map(({ mode, icon: Icon, label, sub }) => {
//               const active = activeMode === mode;
//               return (
//                 <button
//                   key={mode}
//                   onClick={() => handleModeSwitch(mode)}
//                   className={`w-full flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl border text-left transition-all duration-200 ${
//                     active
//                       ? 'border-[#D4AF37]/30 bg-[#D4AF37]/[0.04]'
//                       : 'border-white/8 bg-white/[0.012] hover:border-white/15 hover:bg-white/[0.02]'
//                   }`}
//                 >
//                   <div className="flex items-center gap-3 min-w-0">
//                     <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 transition-colors ${active ? 'border-[#D4AF37]/28 text-[#D4AF37]' : 'border-white/10 text-white/30'}`}>
//                       <Icon className="w-4 h-4" />
//                     </div>
//                     <div className="min-w-0">
//                       <p className={`text-[13px] font-semibold leading-tight transition-colors ${active ? 'text-white' : 'text-white/52'}`}>
//                         {label}
//                       </p>
//                       <p className="text-[10px] text-white/28 mt-0.5">{sub}</p>
//                     </div>
//                   </div>
//                   <ChevronDownIcon className={`w-4 h-4 shrink-0 transition-all duration-200 ${active ? 'rotate-180 text-[#D4AF37]' : 'text-white/18'}`} />
//                 </button>
//               );
//             })}
//           </div>

//           {/* Preview box */}
//           <div className="border border-white/8 rounded-xl p-4 bg-white/[0.01] flex flex-col gap-3">
//             <p className="text-[#D4AF37] text-[10px] font-bold tracking-[0.22em] uppercase">
//               This Is Just A Preview
//             </p>
//             <p className="text-white/38 text-xs">The complete archive contains:</p>
//             <ul className="flex flex-col gap-1.5">
//               {[
//                 '50+ Educational Lessons',
//                 '400+ Research Reports',
//                 'Weekly Intelligence Reports',
//                 'Monthly BTC & Altcoin Outlooks',
//               ].map((item) => (
//                 <li key={item} className="flex items-center gap-2">
//                   <CheckCircleIcon className="w-3.5 h-3.5 text-[#D4AF37]/55 shrink-0" />
//                   <span className="text-white/52 text-xs">{item}</span>
//                 </li>
//               ))}
//             </ul>
//             <motion.a
//               href="#"
//               whileHover={{ x: 3 }}
//               transition={{ duration: 0.14 }}
//               className="inline-flex items-center gap-2 text-[#D4AF37] text-xs font-semibold mt-1 hover:text-[#F5CC5A] transition-colors"
//             >
//               <ArrowRightIcon className="w-3 h-3 shrink-0" />
//               Explore Educational &amp; Research Library
//             </motion.a>
//           </div>
//         </div>

//         {/* ── TERMINAL ─────────────────────────────────────────────────────── */}
//         <div className="flex-1 min-w-0 border border-white/10 rounded-2xl overflow-hidden flex flex-col bg-[#07070F]/55 backdrop-blur-sm lg:h-[1100px]">

//           {/* Terminal header bar */}
//           <div className="flex items-center justify-between px-5 py-2.5 border-b border-white/8 bg-black/15 shrink-0">
//             <AnimatePresence mode="wait">
//               <motion.span
//                 key={terminalLabel}
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ duration: 0.15 }}
//                 className="text-[#D4AF37] text-[9px] sm:text-[10px] font-bold tracking-[0.28em] uppercase truncate mr-4"
//               >
//                 {terminalLabel}
//               </motion.span>
//             </AnimatePresence>
//             <div className="flex items-center gap-1.5 shrink-0">
//               <motion.button
//                 onClick={handlePrev}
//                 whileHover={{ scale: 1.07 }}
//                 whileTap={{ scale: 0.93 }}
//                 transition={{ duration: 0.11 }}
//                 aria-label="Previous"
//                 className="w-7 h-7 rounded border border-white/10 flex items-center justify-center text-white/30 hover:text-white/65 hover:border-white/20 transition-colors"
//               >
//                 <PrevIcon />
//               </motion.button>
//               <motion.button
//                 onClick={handleNext}
//                 whileHover={{ scale: 1.07 }}
//                 whileTap={{ scale: 0.93 }}
//                 transition={{ duration: 0.11 }}
//                 aria-label="Next"
//                 className="w-7 h-7 rounded border border-white/10 flex items-center justify-center text-white/30 hover:text-white/65 hover:border-white/20 transition-colors"
//               >
//                 <NextIcon />
//               </motion.button>
//             </div>
//           </div>

//           {/* Module / Category tab row */}
//           <div
//             className="flex border-b border-white/8 bg-black/10 shrink-0 overflow-x-auto"
//             style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
//           >
//             <AnimatePresence mode="wait">
//               {activeMode === 'frameworks'
//                 ? learningFrameworks.map((mod, i) => {
//                     const isActive = activeModuleIdx === i;
//                     return (
//                       <button
//                         key={mod.id}
//                         onClick={() => { setActiveModuleIdx(i); setActiveTopicIdx(0); }}
//                         className={`relative flex flex-col items-start justify-center px-4 xl:px-5 py-3 border-r border-white/8 shrink-0 min-w-[130px] xl:min-w-[148px] transition-all duration-200 ${
//                           isActive ? 'bg-[#D4AF37]/[0.04]' : 'hover:bg-white/[0.02]'
//                         }`}
//                       >
//                         <span className={`text-[8px] font-bold tracking-[0.28em] uppercase mb-0.5 transition-colors ${isActive ? 'text-[#D4AF37]' : 'text-white/22'}`}>
//                           MODULE {String(i + 1).padStart(2, '0')}
//                         </span>
//                         <span className={`text-[11px] font-semibold leading-tight transition-colors ${isActive ? 'text-[#D4AF37]' : 'text-white/52'}`}>
//                           {mod.title}
//                         </span>
//                         {isActive && (
//                           <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4AF37]" />
//                         )}
//                       </button>
//                     );
//                   })
//                 : microstructureReports.map((cat, i) => {
//                     const isActive = activeCategoryIdx === i;
//                     return (
//                       <button
//                         key={cat.id}
//                         onClick={() => { setActiveCategoryIdx(i); setActiveReportIdx(0); }}
//                         className={`relative flex flex-col items-start justify-center px-4 xl:px-5 py-3 border-r border-white/8 shrink-0 min-w-[130px] xl:min-w-[148px] transition-all duration-200 ${
//                           isActive ? 'bg-[#D4AF37]/[0.04]' : 'hover:bg-white/[0.02]'
//                         }`}
//                       >
//                         <span className={`text-[8px] font-bold tracking-[0.28em] uppercase mb-0.5 transition-colors ${isActive ? 'text-[#D4AF37]' : 'text-white/22'}`}>
//                           CATEGORY {String(i + 1).padStart(2, '0')}
//                         </span>
//                         <span className={`text-[11px] font-semibold leading-tight transition-colors ${isActive ? 'text-[#D4AF37]' : 'text-white/52'}`}>
//                           {cat.title}
//                         </span>
//                         {isActive && (
//                           <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4AF37]" />
//                         )}
//                       </button>
//                     );
//                   })
//               }
//             </AnimatePresence>
//           </div>

//           {/* Content area: list panel + viewer */}
//           <div className="flex flex-col lg:flex-row flex-1 min-h-0 overflow-hidden">

//             {/* ── List panel ── */}
//             <div className="w-full lg:w-[210px] xl:w-[238px] shrink-0 border-b lg:border-b-0 lg:border-r border-white/8 flex flex-col max-h-[270px] lg:max-h-none overflow-hidden">
//               {/* Panel header */}
//               <div className="px-4 py-2.5 border-b border-white/8 bg-black/10 shrink-0">
//                 <span className="text-[9px] font-bold tracking-[0.28em] uppercase text-[#D4AF37]/65">
//                   {activeMode === 'frameworks' ? 'Lessons Preview' : 'Reports'}
//                 </span>
//               </div>

//               {/* Scrollable list */}
//               <div className="flex-1 overflow-y-auto">
//                 <AnimatePresence mode="wait">
//                   {activeMode === 'frameworks' ? (
//                     <motion.div
//                       key={`lf-list-${activeModuleIdx}`}
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       exit={{ opacity: 0 }}
//                       transition={{ duration: 0.15 }}
//                     >
//                       {currentModule?.topics.map((topic, i) => {
//                         const isActive = activeTopicIdx === i;
//                         return (
//                           <button
//                             key={topic.id}
//                             onClick={() => setActiveTopicIdx(i)}
//                             className={`relative w-full flex items-start gap-3 px-4 py-2.5 border-b border-white/[0.035] text-left transition-all duration-150 ${
//                               isActive ? 'bg-[#D4AF37]/[0.055]' : 'hover:bg-white/[0.02]'
//                             }`}
//                           >
//                             {isActive && (
//                               <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#D4AF37]" />
//                             )}
//                             <span className={`text-[9px] font-bold tracking-wide shrink-0 mt-0.5 w-4 ${isActive ? 'text-[#D4AF37]' : 'text-white/20'}`}>
//                               {String(i + 1).padStart(2, '0')}
//                             </span>
//                             <div className="flex-1 min-w-0">
//                               <p className={`text-[11px] font-semibold leading-snug ${isActive ? 'text-white' : 'text-white/52'}`}>
//                                 {topic.title}
//                               </p>
//                               <p className="text-[10px] text-white/26 mt-0.5">{topic.readTime}</p>
//                             </div>
//                             {topic.locked && (
//                               <LockIcon className="w-3 h-3 text-white/20 shrink-0 mt-0.5" />
//                             )}
//                           </button>
//                         );
//                       })}
//                       <div className="flex items-center gap-2 px-4 py-3">
//                         <LockIcon className="w-3 h-3 text-white/18 shrink-0" />
//                         <p className="text-[10px] text-white/26 leading-relaxed">
//                           Additional lessons are for VIP members.
//                         </p>
//                       </div>
//                     </motion.div>
//                   ) : (
//                     <motion.div
//                       key={`mr-list-${activeCategoryIdx}`}
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       exit={{ opacity: 0 }}
//                       transition={{ duration: 0.15 }}
//                     >
//                       {currentCategory?.reports.map((report, i) => {
//                         const isActive = activeReportIdx === i;
//                         return (
//                           <button
//                             key={report.id}
//                             onClick={() => setActiveReportIdx(i)}
//                             className={`relative w-full flex items-start gap-3 px-4 py-2.5 border-b border-white/[0.035] text-left transition-all duration-150 ${
//                               isActive ? 'bg-[#D4AF37]/[0.055]' : 'hover:bg-white/[0.02]'
//                             }`}
//                           >
//                             {isActive && (
//                               <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#D4AF37]" />
//                             )}
//                             <span className={`text-[9px] font-bold tracking-wide shrink-0 mt-0.5 w-4 ${isActive ? 'text-[#D4AF37]' : 'text-white/20'}`}>
//                               {String(i + 1).padStart(2, '0')}
//                             </span>
//                             <div className="flex-1 min-w-0">
//                               <p className={`text-[11px] font-semibold leading-snug ${isActive ? 'text-white' : 'text-white/52'}`}>
//                                 {report.title}
//                               </p>
//                               <p className="text-[10px] text-white/26 mt-0.5">{report.date}</p>
//                               <p className="text-[10px] text-white/22 mt-0.5">{report.analyst}</p>
//                             </div>
//                           </button>
//                         );
//                       })}
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             </div>

//             {/* ── Content viewer ── */}
//             <div className="flex-1 min-w-0 min-h-0 flex flex-col overflow-hidden">
//               {/* Viewer sub-header */}
//               <div className="flex items-center justify-between px-5 py-2.5 border-b border-white/8 bg-black/10 shrink-0">
//                 <span className="text-[9px] font-bold tracking-[0.28em] uppercase text-white/28">
//                   {activeMode === 'frameworks' ? 'Concept Breakdown' : 'Report Overview'}
//                 </span>
//                 <motion.a
//                   href="#"
//                   whileHover={{ x: 2 }}
//                   transition={{ duration: 0.12 }}
//                   className="inline-flex items-center gap-1.5 text-[#D4AF37]/75 text-[10px] font-semibold hover:text-[#D4AF37] transition-colors"
//                 >
//                   {activeMode === 'frameworks' ? 'Open Full Lesson' : 'Open Full Report'}
//                   <ExternalLinkIcon className="w-3 h-3" />
//                 </motion.a>
//               </div>

//               {/* Scrollable content */}
//               <div className="flex-1 overflow-y-auto min-h-0 px-6 py-6">
//                 <AnimatePresence mode="wait">
//                   {activeMode === 'frameworks' && currentTopic ? (
//                     <motion.div
//                       key={currentTopic.id}
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       exit={{ opacity: 0 }}
//                       transition={{ duration: 0.18 }}
//                       className="max-w-2xl"
//                     >
//                       {/* Lesson image */}
//                       {currentTopic.image && (
//                         <div className="w-full h-40 rounded-xl overflow-hidden mb-6 bg-white/[0.025] border border-white/8">
//                           <img
//                             src={currentTopic.image}
//                             alt={currentTopic.title}
//                             className="w-full h-full object-cover opacity-60"
//                             onError={(e) => {
//                               (e.currentTarget as HTMLImageElement).parentElement!.style.display = 'none';
//                             }}
//                           />
//                         </div>
//                       )}

//                       {/* Title */}
//                       <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 leading-tight">
//                         {currentTopic.title}
//                       </h3>

//                       {/* Meta row */}
//                       <div className="flex items-center gap-3 mb-5 flex-wrap">
//                         <div className="flex items-center gap-1.5 text-white/38">
//                           <ClockIcon className="w-3.5 h-3.5" />
//                           <span className="text-xs">{currentTopic.readTime}</span>
//                         </div>
//                         <span className={`text-[10px] font-bold tracking-[0.12em] uppercase border rounded px-2 py-0.5 ${levelBadgeClass(currentTopic.level)}`}>
//                           {currentTopic.level}
//                         </span>
//                       </div>

//                       <div className="w-full h-px bg-white/8 mb-5" />

//                       {/* Introduction */}
//                       <p className="text-white/58 text-sm leading-relaxed mb-6">
//                         {currentTopic.content.introduction}
//                       </p>

//                       {/* Sections */}
//                       {currentTopic.content.sections.map((section, si) => (
//                         <div key={si} className="mb-6">
//                           <h4 className="text-white/88 text-[13px] font-bold mb-3 leading-snug">
//                             {section.heading}
//                           </h4>
//                           {section.paragraphs.map((p, pi) => (
//                             <p key={pi} className="text-white/52 text-sm leading-relaxed mb-3">
//                               {p}
//                             </p>
//                           ))}
//                           {section.bullets && section.bullets.length > 0 && (
//                             <ul className="flex flex-col gap-2 mt-3 ml-1">
//                               {section.bullets.map((b, bi) => (
//                                 <li key={bi} className="flex items-start gap-2.5">
//                                   <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/48 mt-1.5 shrink-0" />
//                                   <span className="text-white/48 text-sm leading-relaxed">{b}</span>
//                                 </li>
//                               ))}
//                             </ul>
//                           )}
//                         </div>
//                       ))}

//                       {/* Key takeaways */}
//                       {currentTopic.content.takeaways.length > 0 && (
//                         <div className="border border-[#D4AF37]/12 rounded-xl bg-[#D4AF37]/[0.022] p-5 mt-2">
//                           <h4 className="text-[#D4AF37] text-[9px] font-bold tracking-[0.28em] uppercase mb-3">
//                             Key Takeaways
//                           </h4>
//                           <ul className="flex flex-col gap-2.5">
//                             {currentTopic.content.takeaways.map((t, ti) => (
//                               <li key={ti} className="flex items-start gap-2.5">
//                                 <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/42 mt-1.5 shrink-0" />
//                                 <span className="text-white/52 text-xs leading-relaxed">{t}</span>
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       )}
//                     </motion.div>
//                   ) : activeMode === 'reports' && currentReport ? (
//                     <motion.div
//                       key={currentReport.id}
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       exit={{ opacity: 0 }}
//                       transition={{ duration: 0.18 }}
//                       className="max-w-2xl"
//                     >
//                       {/* Thumbnail */}
//                       {currentReport.thumbnail && (
//                         <div className="w-full h-40 rounded-xl overflow-hidden mb-6 bg-white/[0.025] border border-white/8">
//                           <img
//                             src={currentReport.thumbnail}
//                             alt={currentReport.title}
//                             className="w-full h-full object-cover opacity-60"
//                             onError={(e) => {
//                               (e.currentTarget as HTMLImageElement).parentElement!.style.display = 'none';
//                             }}
//                           />
//                         </div>
//                       )}

//                       {/* Title */}
//                       <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 leading-tight">
//                         {currentReport.title}
//                       </h3>

//                       {/* Meta row */}
//                       <div className="flex items-center gap-3 mb-5 flex-wrap">
//                         <div className="flex items-center gap-1.5 text-white/38">
//                           <CalendarIcon className="w-3.5 h-3.5" />
//                           <span className="text-xs">{currentReport.date}</span>
//                         </div>
//                         <span className="text-[10px] font-bold text-[#D4AF37]/78 border border-[#D4AF37]/18 bg-[#D4AF37]/[0.04] rounded px-2 py-0.5">
//                           {currentReport.analyst}
//                         </span>
//                       </div>

//                       <div className="w-full h-px bg-white/8 mb-5" />

//                       {/* Summary */}
//                       <p className="text-white/60 text-sm leading-relaxed mb-5">
//                         {currentReport.summary}
//                       </p>

//                       {/* Introduction note */}
//                       {currentReport.content.introduction && (
//                         <p className="text-white/42 text-sm leading-relaxed mb-5 border-l-2 border-[#D4AF37]/18 pl-4 italic">
//                           {currentReport.content.introduction}
//                         </p>
//                       )}

//                       {/* Sections */}
//                       {currentReport.content.sections.map((section, si) => (
//                         <div key={si} className="mb-5">
//                           <h4 className="text-white/88 text-[13px] font-bold mb-2 leading-snug">
//                             {section.heading}
//                           </h4>
//                           {section.paragraphs.map((p, pi) => (
//                             <p key={pi} className="text-white/48 text-sm leading-relaxed mb-2">{p}</p>
//                           ))}
//                         </div>
//                       ))}

//                       {/* Key points */}
//                       {currentReport.content.takeaways.length > 0 && (
//                         <div className="border border-[#D4AF37]/12 rounded-xl bg-[#D4AF37]/[0.022] p-5 mt-2">
//                           <h4 className="text-[#D4AF37] text-[9px] font-bold tracking-[0.28em] uppercase mb-3">
//                             Key Points
//                           </h4>
//                           <ul className="flex flex-col gap-2.5">
//                             {currentReport.content.takeaways.map((t, ti) => (
//                               <li key={ti} className="flex items-start gap-2.5">
//                                 <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/42 mt-1.5 shrink-0" />
//                                 <span className="text-white/48 text-xs leading-relaxed">{t}</span>
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       )}

//                       {/* HTML report support note */}
//                       {currentReport.reportUrl && (
//                         // TODO: Replace local report content with backend report content
//                         // TODO: Support standalone HTML reports loaded via reportUrl
//                         // TODO: Future report endpoint — GET /reports/:id
//                         <div className="mt-5 border border-white/8 rounded-xl p-4 flex items-start gap-3 bg-white/[0.008]">
//                           <FileTextIcon className="w-4 h-4 text-white/22 shrink-0 mt-0.5" />
//                           <div>
//                             <p className="text-white/42 text-xs">Full report available as standalone HTML document</p>
//                             <p className="text-white/20 text-[10px] font-mono mt-1">{currentReport.reportUrl}</p>
//                           </div>
//                         </div>
//                       )}
//                     </motion.div>
//                   ) : null}
//                 </AnimatePresence>
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
