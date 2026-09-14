"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import MainMarketDashboard from "./MainMarketDashboard";
import MacroViewPanel from "./MacroViewPanel";
import AnalystInsightsPanel from "./AnalystInsightsPanel";
import FloatingIntelligenceCards from "./FloatingIntelligenceCards";
import HeroCarouselControls from "../HeroCarouselControls";

export default function IntelligenceStage() {
  const shouldReduceMotion = useReducedMotion();

  const transition = (delay: number, duration = 0.65) =>
    shouldReduceMotion
      ? { duration: 0.01 }
      : { duration, delay, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <div className="relative flex w-full flex-col items-center justify-center">
      {/* 3D Perspective Stage Container */}
      <div className="relative w-full max-w-[800px] lg:max-w-[860px] xl:max-w-[920px] pt-12 pb-4">
        {/* Orbiting Floating Node Cards & Connectors */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={transition(0.65)}
        >
          <FloatingIntelligenceCards />
        </motion.div>

        {/* 3D Perspective Layer */}
        <div
          className="relative flex items-center justify-center"
          style={{ perspective: "1500px" }}
        >
          {/* 1. LEFT PANEL: Macro View (Layered behind left edge) */}
          <motion.div
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={transition(0.48, 0.7)}
            className="absolute -left-14 top-[10%] z-0 hidden lg:block xl:-left-18"
            style={{
              transform: "rotateY(16deg) rotateX(1.5deg) translateZ(-40px) scale(0.92)",
              transformOrigin: "right center",
            }}
          >
            <MacroViewPanel />
          </motion.div>

          {/* 2. CENTRAL MAIN BTC DASHBOARD */}
          <motion.div
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={transition(0.35, 0.75)}
            className="relative z-10 w-full"
            style={{
              transform: "rotateY(-2deg) rotateX(2deg) translateZ(10px)",
              transformOrigin: "center center",
            }}
          >
            <MainMarketDashboard />
          </motion.div>

          {/* 3. RIGHT PANEL: Analyst Insights (Layered behind right edge) */}
          <motion.div
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={transition(0.55, 0.7)}
            className="absolute -right-14 top-[8%] z-0 hidden lg:block xl:-right-18"
            style={{
              transform: "rotateY(-16deg) rotateX(1.5deg) translateZ(-40px) scale(0.92)",
              transformOrigin: "left center",
            }}
          >
            <AnalystInsightsPanel />
          </motion.div>
        </div>

        {/* Mobile / Tablet View: Secondary panels shown below dashboard if needed */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 lg:hidden">
          <MacroViewPanel />
          <AnalystInsightsPanel />
        </div>
      </div>

      {/* Carousel Controls */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={transition(0.75)}
        className="mt-8 flex justify-center w-full"
      >
        <HeroCarouselControls currentSlide={1} totalSlides={4} />
      </motion.div>
    </div>
  );
}
