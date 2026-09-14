"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Layers, BarChart3, Globe, Users } from "lucide-react";

export default function FloatingIntelligenceCards() {
  const shouldReduceMotion = useReducedMotion();

  const floatAnim = (duration: number, delay = 0) =>
    shouldReduceMotion
      ? {}
      : {
          animate: { y: [0, -5, 0] },
          transition: {
            duration,
            repeat: Infinity,
            ease: "easeInOut" as const,
            delay,
          },
        };

  return (
    <>
      {/* 1. TOP-LEFT CARD: On-Chain Flow */}
      <motion.div
        {...floatAnim(4.6, 0)}
        className="absolute -top-12 left-6 z-20 hidden md:flex items-center gap-3 rounded-2xl border border-white/[0.12] bg-[#090e1f]/90 px-4 py-2.5 shadow-[0_12px_32px_rgba(0,0,0,0.5),0_0_24px_rgba(99,102,241,0.25)] backdrop-blur-xl transition-transform duration-300 hover:scale-105"
      >
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-indigo-500/30 bg-indigo-500/20 text-indigo-300 shadow-[0_0_12px_rgba(99,102,241,0.3)]">
          <Layers className="h-4 w-4" strokeWidth={1.75} />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-bold text-white">On-Chain Flow</span>
          <span className="text-[10px] text-[#8F9BB3]">See the Bigger Picture</span>
        </div>
      </motion.div>

      {/* 2. TOP-CENTER BADGE: Market Intelligence */}
      <motion.div
        {...floatAnim(3.8, 0.7)}
        className="absolute -top-16 left-1/2 z-20 hidden -translate-x-1/2 md:flex flex-col items-center"
      >
        <div className="flex flex-col items-center justify-center rounded-2xl border border-white/[0.12] bg-[#090e1f]/90 px-5 py-2.5 shadow-[0_12px_32px_rgba(0,0,0,0.5),0_0_24px_rgba(168,85,247,0.3)] backdrop-blur-xl transition-transform duration-300 hover:scale-105">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-500/20 text-purple-300">
            <BarChart3 className="h-4 w-4" strokeWidth={2} />
          </div>
          <span className="mt-1 text-xs font-bold text-white">Market Intelligence</span>
        </div>
      </motion.div>

      {/* 3. TOP-RIGHT CARD: Global Markets */}
      <motion.div
        {...floatAnim(5.2, 1.4)}
        className="absolute -top-10 right-28 z-20 hidden md:flex items-center gap-3 rounded-2xl border border-white/[0.12] bg-[#090e1f]/90 px-4 py-2.5 shadow-[0_12px_32px_rgba(0,0,0,0.5),0_0_24px_rgba(124,58,237,0.25)] backdrop-blur-xl transition-transform duration-300 hover:scale-105"
      >
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-purple-500/30 bg-purple-500/20 text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.3)]">
          <Globe className="h-4 w-4" strokeWidth={1.75} />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-bold text-white">Global Markets</span>
          <span className="text-[10px] text-[#8F9BB3]">Multiple Angles</span>
        </div>
      </motion.div>

      {/* 4. FAR-RIGHT BADGE: Analyst Network */}
      <motion.div
        {...floatAnim(4.2, 0.9)}
        className="absolute -top-4 -right-2 z-20 hidden xl:flex items-center gap-2 rounded-xl border border-white/[0.12] bg-[#090e1f]/90 px-3.5 py-2 shadow-[0_10px_25px_rgba(0,0,0,0.4),0_0_20px_rgba(59,130,246,0.2)] backdrop-blur-md transition-transform duration-300 hover:scale-105"
      >
        <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-500/20 text-blue-300">
          <Users className="h-3.5 w-3.5" strokeWidth={2} />
        </div>
        <span className="text-xs font-bold text-white">Analyst Network</span>
      </motion.div>

      {/* 5. SVG CONNECTOR LINES */}
      <svg
        className="pointer-events-none absolute -top-16 inset-x-0 h-28 w-full hidden md:block overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="connectorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#A855F7" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Left arc */}
        <path
          d="M 160 30 C 220 50, 260 70, 320 85"
          fill="none"
          stroke="url(#connectorGrad)"
          strokeWidth="1.2"
          strokeDasharray="3 3"
        />

        {/* Center line down */}
        <path
          d="M 500 40 C 500 65, 500 75, 500 90"
          fill="none"
          stroke="url(#connectorGrad)"
          strokeWidth="1.2"
        />

        {/* Right arc */}
        <path
          d="M 720 30 C 660 55, 620 75, 580 88"
          fill="none"
          stroke="url(#connectorGrad)"
          strokeWidth="1.2"
          strokeDasharray="3 3"
        />
      </svg>

      {/* 6. HANDWRITTEN EXPLORE NOTE WITH ARROW (Right-side annotation) */}
      <div className="absolute -bottom-10 right-4 z-20 hidden lg:flex items-center gap-2 select-none">
        <div className="relative">
          {/* Curved hand-drawn arrow pointing up-left */}
          <svg
            width="40"
            height="36"
            viewBox="0 0 40 36"
            fill="none"
            className="text-blue-300/80 -translate-y-1"
          >
            <path
              d="M32 28 C26 14, 18 8, 8 10"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M13 5 L7 10 L14 14"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>
        <span
          className="text-sm italic text-blue-200/90 font-serif tracking-wide"
          style={{ fontStyle: "italic" }}
        >
          Explore
          <br />
          <span className="text-xs text-blue-300/70">what moves the market</span>
        </span>
      </div>
    </>
  );
}
