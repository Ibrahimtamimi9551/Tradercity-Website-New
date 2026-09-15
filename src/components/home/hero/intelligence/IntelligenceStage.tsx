"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import MainMarketDashboard from "./MainMarketDashboard";
import MacroViewPanel from "./MacroViewPanel";
import AnalystInsightsPanel from "./AnalystInsightsPanel";

export default function IntelligenceStage() {
  const shouldReduceMotion = useReducedMotion();

  const transition = (delay: number, duration = 0.65) =>
    shouldReduceMotion
      ? { duration: 0.01 }
      : { duration, delay, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <div className="relative flex w-full flex-col items-center justify-center">
      {/* Stage container — wider (+40%) and shorter (-20% vertical padding) */}
      <div className="relative w-full max-w-[1120px] lg:max-w-[1200px] xl:max-w-[1290px] pt-4 pb-2">

        {/* 3D Perspective Layer */}
        <div
          className="relative flex items-center justify-center"
          style={{ perspective: "1500px" }}
        >
          {/* 1. LEFT PANEL: Macro View */}
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

          {/* 3. RIGHT PANEL: Analyst Insights */}
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


      </div>
    </div>
  );
}
