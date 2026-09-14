"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Users,
  UserCheck,
  FileText,
  BookOpen,
  TrendingUp,
  ChevronRight,
  BarChart2,
} from "lucide-react";

export default function HeroMetricsStrip() {
  const shouldReduceMotion = useReducedMotion();

  const metrics = [
    {
      id: "members",
      icon: Users,
      value: "1,248+",
      growth: "+12%",
      label: "Active Members",
    },
    {
      id: "analysts",
      icon: UserCheck,
      value: "5",
      label: "Expert Analysts",
    },
    {
      id: "reports",
      icon: FileText,
      value: "420+",
      growth: "+18%",
      label: "Reports & Analysis",
    },
    {
      id: "lessons",
      icon: BookOpen,
      value: "50+",
      label: "Educational Lessons",
    },
    {
      id: "insights",
      icon: BarChart2,
      value: "Daily",
      label: "Market Insights",
      hasAction: true,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        shouldReduceMotion
          ? { duration: 0.01 }
          : { duration: 0.75, delay: 0.85, ease: [0.22, 1, 0.36, 1] }
      }
      className="w-full max-w-[1440px] overflow-hidden rounded-2xl border border-white/[0.08] bg-[#070b16]/75 shadow-[0_16px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-xl sm:rounded-3xl"
    >
      <div className="grid grid-cols-1 divide-y divide-white/[0.06] min-[480px]:grid-cols-2 min-[480px]:divide-y-0 min-[480px]:divide-x lg:grid-cols-5">
        {metrics.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className={`flex items-center justify-between p-4 sm:p-5 lg:p-6 ${
                index === 4 ? "min-[480px]:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="flex items-center gap-3.5">
                {/* Purple Icon Box */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-purple-500/25 bg-purple-500/10 text-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.2)] sm:h-11 sm:w-11">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>

                {/* Metric Content */}
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                      {item.value}
                    </span>
                    {item.growth ? (
                      <span className="inline-flex items-center gap-0.5 rounded-md border border-emerald-500/25 bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-400 sm:text-[11px]">
                        <TrendingUp className="h-2.5 w-2.5" />
                        {item.growth}
                      </span>
                    ) : null}
                  </div>
                  <span className="mt-0.5 text-xs text-[#8F9BB3] sm:text-[13px]">
                    {item.label}
                  </span>
                </div>
              </div>

              {/* Action arrow for Daily Insights */}
              {item.hasAction ? (
                <a
                  href="#research"
                  aria-label="View daily market insights"
                  className="group flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 transition-all duration-200 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                >
                  <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </a>
              ) : null}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
