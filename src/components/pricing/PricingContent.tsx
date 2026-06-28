"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  ShieldCheck,
  Zap,
  CalendarDays,
  Crown,
  ArrowRight,
  Circle,
} from "lucide-react";
import Link from "next/link";

export default function PricingSection() {
  const [selectedPlan, setSelectedPlan] = useState("quarterly");

  const features = [
    "Full Discord Access",
    "Daily Micro-structure and Orderflow Analysis",
    "Weekly BTC Quant Reports",
    "Complete (400+) Microstructure Report Archive",
    "Complete (100+) Learning Framework",
    "Access All Analysts Calls and Context",
  ];

  const plans = [
    // {
    //   id: "monthly",
    //   name: "MONTHLY",
    //   price: "$60",
    //   period: "/ month",
    //   duration: "30 DAYS",
    //   accent: "purple",
    // },
        {
  id: "monthly",
  name: "MONTHLY",
  price: "$50",
  period: "/ month",
  duration: "30 DAYS",
  oldPrice: "$60",
  badge: "FIRST MEMBERSHIP OFFER",
  helper: "Save $10 on your first membership",
  accent: "gold",
},
    {
      id: "quarterly",
      name: "QUARTERLY",
      price: "$150",
      period: "/ 3 months",
      duration: "90 DAYS",
      save: "Save $30",
      oldPrice: "$180",
      isPopular: true,
      accent: "gold",
    },
    {
      id: "yearly",
      name: "YEARLY",
      price: "$500",
      period: "/ year",
      duration: "365 DAYS",
      save: "Save $220",
      oldPrice: "$720",
      accent: "purple",
    },
  ];

  return (
    // <section className="min-h-screen bg-[#0A0A0A] py-16 px-4 font-sans selection:bg-yellow-500/30">
    <section className="min-h-screen py-16 px-4 font-sans selection:bg-yellow-500/30">
      <div className="max-w-[1080px] mx-auto">
        
        {/* ========================================== */}
        {/* SECTION HEADER (MANDATORY)                 */}
        {/* ========================================== */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-[1px] w-24 bg-gradient-to-l from-yellow-500 to-transparent opacity-60"></div>
          <span className="text-yellow-500 text-[13px] font-bold tracking-[0.2em] uppercase">
            Pricing Plans
          </span>
          <div className="h-[1px] w-24 bg-gradient-to-r from-yellow-500 to-transparent opacity-60"></div>
        </div>

        {/* ========================================== */}
        {/* MAIN PRICING CONTAINER                     */}
        {/* ========================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 bg-[#0C0D12] border border-[#1F2129] rounded-[24px] p-8 lg:p-12">
          
          {/* ========================================== */}
          {/* LEFT COLUMN - VALUE PROPOSITION            */}
          {/* ========================================== */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Top Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-yellow-500/30 bg-yellow-500/5 text-yellow-500 text-[11px] font-bold tracking-widest uppercase mb-6">
                <Crown className="w-3.5 h-3.5" />
                VIP MEMBERSHIP
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl lg:text-[44px] font-bold tracking-tight text-white mb-4 leading-[1.1]">
                Choose Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] to-[#FACC15]">
                  Membership Term
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-[#94A3B8] text-[15px] mb-10 leading-relaxed">
                One VIP membership. <br className="hidden lg:block" />
                Choose the duration that fits your journey.
              </p>

              {/* Divider */}
              <div className="h-[1px] w-full bg-gradient-to-r from-[#1F2129] to-transparent mb-10" />

              {/* Features List */}
              <div className="mb-10">
                <h3 className="text-yellow-500 text-[13px] font-bold tracking-widest uppercase mb-6">
                  INCLUDED IN EVERY VIP MEMBERSHIP
                </h3>
                <ul className="space-y-4">
                  {features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-yellow-500 shrink-0" />
                      <span className="text-[#CBD5E1] text-[15px]">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Benefits Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 border-t border-[#1F2129]">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-6 h-6 text-yellow-500 shrink-0" />
                <div>
                  <h4 className="text-white font-semibold mb-0.5 text-sm">Secure Payments</h4>
                  <p className="text-[#94A3B8] text-[13px] leading-relaxed">Your payment is safe and encrypted.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Zap className="w-6 h-6 text-yellow-500 shrink-0" />
                <div>
                  <h4 className="text-white font-semibold mb-0.5 text-sm">Instant Access</h4>
                  <p className="text-[#94A3B8] text-[13px] leading-relaxed">Get access immediately after payment.</p>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================== */}
          {/* RIGHT COLUMN - PLAN SELECTION              */}
          {/* ========================================== */}
          <div className="lg:col-span-7 flex flex-col mt-10 lg:mt-0">
            
            {/* Choose Your Duration Separator */}
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#1F2129]" />
              <span className="text-[#94A3B8] text-[11px] font-bold tracking-widest uppercase">
                Choose Your Duration
              </span>
              <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#1F2129]" />
            </div>

            {/* Duration Selection Cards */}
            <div className="flex flex-col gap-5 flex-1">
              {plans.map((plan) => {
                const isSelected = selectedPlan === plan.id;
                const isGold = plan.accent === "gold";

                return (
                  <motion.div
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan.id)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={`relative cursor-pointer rounded-2xl border p-5 lg:p-6 transition-all duration-300 flex items-center justify-between group ${
                      isSelected
                        ? "bg-[#111216] border-yellow-500 shadow-[0_0_30px_rgba(234,179,8,0.12)]"
                        : "bg-[#0F1117] border-[#1F2129] hover:border-[#2D313E]"
                    }`}
                  >
                    {/* Inner gold glow ambient background for selected card */}
                    {isSelected && (
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-500/5 to-transparent pointer-events-none" />
                    )}

                    <div className="flex items-center gap-5 relative z-10 w-full sm:w-auto">
                      
                      {/* Radio Circle */}
                      <div className="shrink-0 flex items-center justify-center">
                        {isSelected ? (
                          <div className="w-[22px] h-[22px] rounded-full border-2 border-yellow-500 flex items-center justify-center">
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                          </div>
                        ) : (
                          <Circle className="w-[22px] h-[22px] text-[#A855F7] opacity-60 group-hover:opacity-100 transition-opacity" />
                        )}
                      </div>

                      {/* Calendar Icon Container */}
                      <div className={`hidden sm:flex w-[52px] h-[52px] rounded-xl border flex-col items-center justify-center shrink-0 transition-colors ${
                        isGold 
                          ? 'border-yellow-500/20 bg-yellow-500/5 text-yellow-500' 
                          : 'border-purple-500/20 bg-purple-500/5 text-[#A855F7]'
                      }`}>
                        <CalendarDays className="w-6 h-6" />
                      </div>

                      {/* Plan Text Details */}
                      <div className="flex flex-col flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className={`text-[13px] font-bold tracking-widest ${isGold ? 'text-yellow-500' : 'text-[#A855F7]'}`}>
                            {plan.name}
                          </span>
                          {plan.isPopular && (
                            <span className="px-2 py-0.5 rounded-[4px] text-[10px] font-bold bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 flex items-center gap-1.5 uppercase">
                              <Crown className="w-3 h-3" /> Most Popular
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-baseline gap-2">
                          <span className="text-[34px] font-bold text-white tracking-tight leading-none">
                            {plan.price}
                          </span>
                          <span className="text-[#94A3B8] text-[15px] font-medium">{plan.period}</span>
                        </div>

                        {/* Pricing Savings (if any) */}
                        {(plan.save || plan.oldPrice) && (
                          <div className="flex items-center gap-2 mt-2.5">
                            {plan.save && (
                              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-[4px] uppercase tracking-wider ${
                                isGold ? 'bg-yellow-500/20 text-yellow-500' : 'bg-purple-500/20 text-[#A855F7]'
                              }`}>
                                {plan.save}
                              </span>
                            )}
                            {plan.oldPrice && (
                              <span className="text-[13px] text-[#64748B] line-through font-medium">
                                {plan.oldPrice}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right side Access Duration */}
                    <div className="text-right flex-col items-end justify-center relative z-10 border-l border-[#1F2129] pl-8 ml-4 hidden md:flex shrink-0 min-w-[120px]">
                      <span className={`font-bold text-[17px] mb-0.5 ${isSelected ? 'text-yellow-500' : 'text-white'}`}>
                        {plan.duration}
                      </span>
                      <span className="text-[#94A3B8] text-[14px]">Access</span>
                    </div>

                  </motion.div>
                );
              })}
            </div>

            {/* CTA Button */}
            <div className="mt-8">
              <Link href="/login?plan=free">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full h-[60px] flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FACC15] to-[#EAB308] text-black font-bold text-[17px] shadow-[0_0_20px_rgba(234,179,8,0.15)] transition-all duration-300"
              >
                <Crown className="w-5 h-5" />
                <span>Become a VIP Member</span>
                <ArrowRight className="w-5 h-5 ml-1" />
              </motion.button>
              </Link>
            </div>
            
            {/* Community Footer */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* Local Placeholder Avatars */}
              <div className="flex -space-x-3 shrink-0">
                <div className="w-[38px] h-[38px] rounded-full border-2 border-[#0C0D12] bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center text-white text-[10px] font-bold shadow-sm">
                  TC
                </div>
                <div className="w-[38px] h-[38px] rounded-full border-2 border-[#0C0D12] bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-[10px] font-bold shadow-sm">
                  VIP
                </div>
                <div className="w-[38px] h-[38px] rounded-full border-2 border-[#0C0D12] bg-gradient-to-br from-[#A855F7] to-[#FACC15] flex items-center justify-center text-white text-[10px] font-bold shadow-sm">
                  PRO
                </div>
              </div>
              <p className="text-[14px] text-[#94A3B8] text-center sm:text-left leading-relaxed">
                Join 800+ traders growing together <br className="hidden sm:block" />
                in the <span className="text-[#A855F7] font-semibold">TraderCity</span> VIP community.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}


// "use client";

// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import {
//   CheckCircle2,
//   ShieldCheck,
//   Zap,
//   CalendarDays,
//   Crown,
//   ArrowRight,
//   Circle,
// } from "lucide-react";

// export default function PricingSection() {
//   const [selectedPlan, setSelectedPlan] = useState("quarterly");

//   const features = [
//     "Full Discord Access",
//     "Daily Micro-structure and Orderflow Analysis",
//     "Weekly BTC Quant Reports",
//     "Complete (400+) Microstructure Report Archive",
//     "Complete (100+) Learning Framework",
//     "Access All Analysts Calls and Context",
//   ];

//   const plans = [
//     {
//       id: "monthly",
//       name: "MONTHLY",
//       price: "$60",
//       period: "/ month",
//       duration: "30 DAYS",
//       accent: "blue",
//     },
//     {
//       id: "quarterly",
//       name: "QUARTERLY",
//       price: "$150",
//       period: "/ 3 months",
//       duration: "90 DAYS",
//       save: "Save $30",
//       oldPrice: "$180",
//       isPopular: true,
//       accent: "gold",
//     },
//     {
//       id: "yearly",
//       name: "YEARLY",
//       price: "$500",
//       period: "/ year",
//       duration: "365 DAYS",
//       save: "Save $220",
//       oldPrice: "$720",
//       accent: "blue",
//     },
//   ];

//   return (
//     <section className="min-h-screen bg-[#0A0B10] text-slate-200 py-20 px-4 font-sans selection:bg-yellow-500/30">
//       <div className="max-w-[1100px] mx-auto">
        
//         {/* Main Pricing Container */}
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 bg-[#11131E]/60 border border-slate-800/80 rounded-3xl p-6 lg:p-12 backdrop-blur-md">
          
//           {/* ========================================== */}
//           {/* LEFT COLUMN - VALUE PROPOSITION */}
//           {/* ========================================== */}
//           <div className="lg:col-span-5 flex flex-col justify-between">
//             <div>
//               {/* Top Badge */}
//               <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-[11px] font-bold tracking-widest uppercase mb-8">
//                 <Crown className="w-3.5 h-3.5" />
//                 VIP MEMBERSHIP
//               </div>

//               {/* Main Heading */}
//               <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 leading-[1.15]">
//                 Choose Your <br />
//                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-yellow-500">
//                   Membership Term
//                 </span>
//               </h1>

//               {/* Subheading */}
//               <p className="text-slate-400 text-lg mb-10 leading-relaxed font-medium">
//                 One VIP membership. <br className="hidden lg:block" />
//                 Choose the duration that fits your journey.
//               </p>

//               {/* Divider */}
//               <div className="h-px w-full bg-gradient-to-r from-slate-800 to-transparent mb-10" />

//               {/* Features List */}
//               <div className="mb-10">
//                 <h3 className="text-yellow-500 text-sm font-bold tracking-widest uppercase mb-6">
//                   INCLUDED IN EVERY VIP MEMBERSHIP
//                 </h3>
//                 <ul className="space-y-4">
//                   {features.map((feature, idx) => (
//                     <li key={idx} className="flex items-start gap-3">
//                       <CheckCircle2 className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
//                       <span className="text-slate-200 font-medium">{feature}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>

//             {/* Bottom Benefits Row */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 border-t border-slate-800/60">
//               <div className="flex items-start gap-3">
//                 <ShieldCheck className="w-6 h-6 text-yellow-500 shrink-0" />
//                 <div>
//                   <h4 className="text-white font-semibold mb-1 text-sm">Secure Payments</h4>
//                   <p className="text-slate-400 text-[13px] leading-relaxed">Your payment is safe and encrypted.</p>
//                 </div>
//               </div>
//               <div className="flex items-start gap-3">
//                 <Zap className="w-6 h-6 text-yellow-500 shrink-0" />
//                 <div>
//                   <h4 className="text-white font-semibold mb-1 text-sm">Instant Access</h4>
//                   <p className="text-slate-400 text-[13px] leading-relaxed">Get access immediately after payment.</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* ========================================== */}
//           {/* RIGHT COLUMN - PLAN SELECTION */}
//           {/* ========================================== */}
//           <div className="lg:col-span-7 flex flex-col h-full mt-8 lg:mt-0">
            
//             {/* Choose Your Duration Separator */}
//             <div className="flex items-center gap-4 mb-8">
//               <div className="h-px bg-slate-800/80 flex-1" />
//               <span className="text-slate-400 text-[11px] font-bold tracking-widest uppercase">
//                 Choose Your Duration
//               </span>
//               <div className="h-px bg-slate-800/80 flex-1" />
//             </div>

//             {/* Duration Selection Cards */}
//             <div className="flex flex-col gap-4 flex-1">
//               {plans.map((plan) => {
//                 const isSelected = selectedPlan === plan.id;
//                 return (
//                   <motion.div
//                     key={plan.id}
//                     onClick={() => setSelectedPlan(plan.id)}
//                     whileHover={{ scale: 1.01 }}
//                     whileTap={{ scale: 0.99 }}
//                     className={`relative cursor-pointer rounded-2xl border p-5 transition-all duration-300 flex items-center justify-between group ${
//                       isSelected
//                         ? "bg-[#181B26] border-yellow-500/50 shadow-[0_0_20px_rgba(234,179,8,0.12)]"
//                         : "bg-[#13151D] border-slate-800 hover:border-slate-700"
//                     }`}
//                   >
//                     {/* Gold glow ambient background for selected card */}
//                     {isSelected && (
//                       <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-500/5 to-transparent pointer-events-none" />
//                     )}

//                     <div className="flex items-center gap-4 sm:gap-6 relative z-10 w-full sm:w-auto">
                      
//                       {/* Radio Circle */}
//                       <div className="shrink-0 flex items-center justify-center">
//                         {isSelected ? (
//                           <div className="w-6 h-6 rounded-full border-2 border-yellow-500 flex items-center justify-center">
//                             <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
//                           </div>
//                         ) : (
//                           <Circle className="w-6 h-6 text-slate-600 group-hover:text-slate-500 transition-colors" />
//                         )}
//                       </div>

//                       {/* Calendar Icon Container */}
//                       <div className={`hidden sm:flex w-14 h-14 rounded-xl border flex-col items-center justify-center shrink-0 transition-colors ${
//                         isSelected 
//                           ? 'border-yellow-500/20 bg-yellow-500/10 text-yellow-500' 
//                           : 'border-indigo-500/20 bg-indigo-500/10 text-indigo-400'
//                       }`}>
//                         <CalendarDays className="w-6 h-6" />
//                       </div>

//                       {/* Plan Text Details */}
//                       <div className="flex flex-col flex-1">
//                         <div className="flex items-center gap-3 mb-1.5">
//                           <span className={`text-sm font-bold tracking-wider ${isSelected ? 'text-yellow-500' : 'text-indigo-400'}`}>
//                             {plan.name}
//                           </span>
//                           {plan.isPopular && (
//                             <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 flex items-center gap-1.5 uppercase">
//                               <Crown className="w-3 h-3" /> Most Popular
//                             </span>
//                           )}
//                         </div>
                        
//                         <div className="flex items-end gap-2">
//                           <span className="text-3xl font-bold text-white tracking-tight leading-none">
//                             {plan.price}
//                           </span>
//                           <span className="text-slate-400 text-sm mb-0.5">{plan.period}</span>
//                         </div>

//                         {/* Pricing Savings (if any) */}
//                         {(plan.save || plan.oldPrice) && (
//                           <div className="flex items-center gap-2 mt-2">
//                             {plan.save && (
//                               <span className="text-[11px] font-bold text-indigo-300 bg-indigo-500/15 px-2 py-0.5 rounded uppercase tracking-wider">
//                                 {plan.save}
//                               </span>
//                             )}
//                             {plan.oldPrice && (
//                               <span className="text-[13px] text-slate-500 line-through font-medium">
//                                 {plan.oldPrice}
//                               </span>
//                             )}
//                           </div>
//                         )}
//                       </div>
//                     </div>

//                     {/* Right side Access Duration (Hidden on very small screens) */}
//                     <div className="text-right flex-col items-end justify-center relative z-10 border-l border-slate-800/80 pl-6 hidden md:flex shrink-0 w-[120px]">
//                       <span className={`font-bold text-lg mb-0.5 ${isSelected ? 'text-yellow-500' : 'text-white'}`}>
//                         {plan.duration}
//                       </span>
//                       <span className="text-slate-400 text-sm font-medium">Access</span>
//                     </div>

//                   </motion.div>
//                 );
//               })}
//             </div>

//             {/* CTA Button */}
//             <div className="mt-8">
//               <motion.button
//                 whileHover={{ scale: 1.015 }}
//                 whileTap={{ scale: 0.985 }}
//                 className="w-full flex items-center justify-center gap-3 py-4 sm:py-5 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-yellow-950 font-bold text-lg shadow-[0_0_20px_rgba(234,179,8,0.25)] transition-all duration-300"
//               >
//                 <Crown className="w-6 h-6" />
//                 <span>Become a VIP Member</span>
//                 <ArrowRight className="w-5 h-5 ml-1" />
//               </motion.button>
//             </div>
            
//             {/* Community Footer */}
//             <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 pb-2">
//               <div className="flex -space-x-3 shrink-0">
//                 {/* Replace src with your actual trader avatar images */}
//                 <img className="w-10 h-10 rounded-full border-2 border-[#11131E] object-cover" src="https://i.pravatar.cc/100?img=11" alt="Trader 1" />
//                 <img className="w-10 h-10 rounded-full border-2 border-[#11131E] object-cover" src="https://i.pravatar.cc/100?img=12" alt="Trader 2" />
//                 <img className="w-10 h-10 rounded-full border-2 border-[#11131E] object-cover" src="https://i.pravatar.cc/100?img=33" alt="Trader 3" />
//                 <div className="w-10 h-10 rounded-full border-2 border-[#11131E] bg-slate-800 flex items-center justify-center text-xs font-bold text-white relative z-10">
//                   +
//                 </div>
//               </div>
//               <p className="text-[13px] text-slate-400 text-center sm:text-left leading-relaxed">
//                 Join 800+ traders growing together <br className="hidden sm:block" />
//                 in the <span className="text-indigo-400 font-semibold">TraderCity</span> VIP community.
//               </p>
//             </div>

//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
