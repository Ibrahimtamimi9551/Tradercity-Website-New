"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  User,
  LayoutGrid,
  Mail,
  Send,
  Lock,
  DollarSign,
  Gift,
  Crown,
  Check,
  ArrowRight,
} from "lucide-react";

// ==========================================
// Custom SVG Icons (Matches Reference)
// ==========================================
const TraderCityLogo = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.5L20 7v9l-8 4.5L4 16V7l8-4.5zM12 5.5L7 8.5v6l5 3 5-3v-6l-5-3z" />
  </svg>
);

const DiscordIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

const GoogleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

// ==========================================
// Main Component
// ==========================================
export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#050608] text-white font-sans overflow-x-hidden relative flex flex-col justify-center pb-20 pt-28">
      
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-[#050608] to-[#050608]"></div>

      {/* ========================================== */}
      {/* TOP HEADER */}
      {/* ========================================== */}
      <header className="absolute top-0 w-full px-6 lg:px-12 py-8 flex justify-between items-center z-50">
        <div className="flex items-center gap-3">
          <TraderCityLogo className="w-8 h-8 text-[#3B82F6]" />
          <span className="text-xl font-bold tracking-widest text-white">
            TRADERCITY
          </span>
        </div>

        <div className="hidden md:flex items-center gap-3 text-sm text-[#94A3B8]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full border border-gray-700 flex items-center justify-center">
              <User className="w-3.5 h-3.5 text-gray-400" />
            </div>
            <span>Login</span>
          </div>
          
          <div className="flex gap-1">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-[3px] h-[3px] rounded-full bg-gray-700" />
            ))}
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full border border-gray-700 flex items-center justify-center">
              <LayoutGrid className="w-3.5 h-3.5 text-gray-400" />
            </div>
            <span>Dashboard</span>
          </div>

          <div className="flex gap-1">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-[3px] h-[3px] rounded-full bg-gray-700" />
            ))}
          </div>
          
          <div className="flex items-center gap-2 text-white font-medium">
            <div className="relative flex items-center justify-center w-7 h-7 bg-[#5865F2] rounded-full">
              <DiscordIcon className="w-4 h-4 text-white" />
              <div className="absolute -top-1.5 -right-1.5 bg-[#A855F7] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-[#050608]">
                2
              </div>
            </div>
            <span>Join Discord</span>
          </div>
        </div>
      </header>

      {/* ========================================== */}
      {/* 3D PERSPECTIVE LAYOUT */}
      {/* ========================================== */}
      <main className="relative z-10 max-w-[1200px] w-full mx-auto px-4 lg:px-8 flex flex-col items-center">
        
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8 xl:gap-12 w-full perspective-[1400px]">
          
          {/* -------------------------------------- */}
          {/* LEFT FEATURE CARD */}
          {/* -------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-full max-w-[320px] rounded-[24px] p-7 lg:rotate-y-[12deg] lg:rotate-z-[1deg] lg:translate-x-6 relative bg-[#090A10]"
            style={{
              background: "linear-gradient(#090A10, #090A10) padding-box, linear-gradient(180deg, rgba(56,189,248,0.6), rgba(168,85,247,0.3)) border-box",
              borderWidth: "1px",
              borderColor: "transparent",
              boxShadow: "-10px 10px 40px rgba(56,189,248,0.05)",
            }}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-[#A855F7]/10 rounded-2xl flex items-center justify-center mb-5 border border-[#A855F7]/20">
                <DiscordIcon className="w-8 h-8 text-[#A855F7]" />
              </div>
              <span className="text-[#A855F7] text-[10px] font-bold tracking-[0.15em] uppercase mb-1.5">
                JOIN FREE
              </span>
              <h3 className="text-white text-xl font-bold tracking-tight mb-3">
                DISCORD COMMUNITY
              </h3>
              <p className="text-[#94A3B8] text-[13px] mb-8 leading-relaxed">
                Access our active community, market insights, analysis and connect with elite traders.
              </p>

              <div className="w-full flex flex-col gap-4">
                {/* Feature 1 */}
                <div className="rounded-xl border border-[#3B82F6]/30 bg-[#0C0E14] p-4 text-left relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[#3B82F6]/5 group-hover:bg-[#3B82F6]/10 transition-colors"></div>
                  <div className="relative z-10 flex gap-4">
                    <div className="w-10 h-10 shrink-0 rounded-full border border-[#3B82F6]/50 bg-[#3B82F6]/10 flex items-center justify-center text-[#3B82F6]">
                      <DollarSign className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[#3B82F6] text-[10px] font-bold tracking-wider uppercase">RECEIVE</span>
                      <h4 className="text-white font-bold text-sm mb-1 leading-tight">$10 CREDIT</h4>
                      <p className="text-[#64748B] text-[11px] leading-relaxed">
                        Get $10 worth of subscription credit instantly after registration.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="rounded-xl border border-[#A855F7]/30 bg-[#0C0E14] p-4 text-left relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[#A855F7]/5 group-hover:bg-[#A855F7]/10 transition-colors"></div>
                  <div className="relative z-10 flex gap-4">
                    <div className="w-10 h-10 shrink-0 rounded-full border border-[#A855F7]/50 bg-[#A855F7]/10 flex items-center justify-center text-[#A855F7]">
                      <Gift className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[#A855F7] text-[10px] font-bold tracking-wider uppercase">EARN WITH</span>
                      <h4 className="text-white font-bold text-sm mb-1 leading-tight">REFERRAL REWARDS</h4>
                      <p className="text-[#64748B] text-[11px] leading-relaxed">
                        Unlock referral potential and earn commissions as you grow with TraderCity.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* -------------------------------------- */}
          {/* CENTER LOGIN CARD */}
          {/* -------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-[420px] rounded-[24px] p-8 lg:p-10 z-20 bg-[#0A0C10] relative shadow-[0_0_50px_rgba(59,130,246,0.1)]"
            style={{
              background: "linear-gradient(#0A0C10, #0A0C10) padding-box, linear-gradient(135deg, rgba(56,189,248,0.7), rgba(168,85,247,0.5)) border-box",
              borderWidth: "1.5px",
              borderColor: "transparent",
            }}
          >
            <div className="flex flex-col items-center">
              <TraderCityLogo className="w-14 h-14 text-[#3B82F6] mb-6 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
              
              <h2 className="text-[26px] font-bold text-white mb-2 tracking-tight">
                Welcome to TraderCity
              </h2>
              <p className="text-[#94A3B8] text-[15px] mb-8 font-medium">
                Register to activate your <span className="text-[#3B82F6]">Discord</span> link.
              </p>

              <button className="w-full h-12 bg-white hover:bg-gray-50 text-black font-semibold rounded-xl flex items-center justify-center gap-3 mb-7 transition-colors">
                <GoogleIcon className="w-5 h-5" />
                Continue with Google
              </button>

              <div className="flex items-center gap-4 w-full mb-7">
                <div className="h-px bg-[#1F2129] flex-1"></div>
                <span className="text-[#64748B] text-xs font-medium tracking-widest">OR</span>
                <div className="h-px bg-[#1F2129] flex-1"></div>
              </div>

              <div className="w-full mb-6">
                <label className="text-[#94A3B8] text-xs font-medium mb-2 block">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                  <input
                    type="email"
                    className="w-full bg-[#0E1016] border border-[#1F2129] hover:border-[#2D313E] focus:border-[#3B82F6] transition-colors rounded-xl py-3.5 pl-12 pr-4 text-white text-sm outline-none"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              <button className="w-full h-12 bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] hover:opacity-90 text-white font-semibold rounded-xl flex items-center justify-center gap-2 mb-5 shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-opacity">
                <Send className="w-4 h-4" />
                Send 4 Digit Code
              </button>

              <div className="flex items-center gap-2 text-[#64748B] text-xs mb-8">
                <Lock className="w-3.5 h-3.5" />
                <span>We'll send you a 4 digit code to your email</span>
              </div>

              <p className="text-[#94A3B8] text-[13px] font-medium">
                Already have an account?{" "}
                <a href="#" className="text-[#3B82F6] hover:text-[#60A5FA] transition-colors">
                  Login &rarr;
                </a>
              </p>
            </div>
          </motion.div>

          {/* -------------------------------------- */}
          {/* RIGHT FEATURE CARD */}
          {/* -------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-full max-w-[320px] rounded-[24px] p-7 lg:-rotate-y-[12deg] lg:-rotate-z-[1deg] lg:-translate-x-6 relative bg-[#090A10]"
            style={{
              background: "linear-gradient(#090A10, #090A10) padding-box, linear-gradient(180deg, rgba(234,179,8,0.6), rgba(234,179,8,0.1)) border-box",
              borderWidth: "1px",
              borderColor: "transparent",
              boxShadow: "10px 10px 40px rgba(234,179,8,0.05)",
            }}
          >
            <div className="flex flex-col items-center text-center">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#FACC15]/30 bg-[#FACC15]/5 text-[#FACC15] text-[10px] font-bold tracking-widest uppercase mb-7">
                <Crown className="w-3 h-3" /> VIP ACCESS
              </div>
              
              <Crown className="w-16 h-16 text-[#FACC15] mb-5 drop-shadow-[0_0_15px_rgba(234,179,8,0.4)]" />
              
              <h3 className="text-white text-xl font-bold tracking-tight mb-3">
                VIP COMMUNITY
              </h3>
              <p className="text-[#94A3B8] text-[13px] mb-8 leading-relaxed">
                Premium access to elite tools, advanced education and exclusive content.
              </p>

              <div className="w-full flex flex-col gap-5 text-left mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-[18px] h-[18px] shrink-0 rounded-full border border-[#FACC15] flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-[#FACC15]" />
                  </div>
                  <span className="text-[#CBD5E1] text-[13px] font-medium">Premium Reports & Research</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-[18px] h-[18px] shrink-0 rounded-full border border-[#FACC15] flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-[#FACC15]" />
                  </div>
                  <span className="text-[#CBD5E1] text-[13px] font-medium">Advanced Education & Modules</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-[18px] h-[18px] shrink-0 rounded-full border border-[#FACC15] flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-[#FACC15]" />
                  </div>
                  <span className="text-[#CBD5E1] text-[13px] font-medium">VIP Events & Analyst Access</span>
                </div>
              </div>

              <button className="w-full h-12 bg-gradient-to-r from-[#FACC15] to-[#EAB308] hover:opacity-90 text-black font-bold rounded-xl flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(234,179,8,0.2)] transition-opacity">
                <Crown className="w-4 h-4" />
                Upgrade to VIP
              </button>
            </div>
          </motion.div>
        </div>

        {/* ========================================== */}
        {/* BOTTOM COMMUNITY BANNER */}
        {/* ========================================== */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full max-w-[800px] mt-12 rounded-[20px] border border-[#14B8A6]/20 bg-[#0A0C10]/80 p-5 lg:p-6 flex flex-col sm:flex-row justify-between items-center gap-6 backdrop-blur-md"
        >
          <div className="flex items-center gap-5 text-center sm:text-left flex-col sm:flex-row">
            <div className="w-[52px] h-[52px] shrink-0 rounded-full bg-[#14B8A6]/10 border border-[#14B8A6]/20 flex items-center justify-center">
              <DiscordIcon className="w-7 h-7 text-[#14B8A6]" />
            </div>
            <div>
              <h3 className="text-[#14B8A6] font-bold tracking-[0.1em] text-[13px] mb-1.5 uppercase">
                DISCORD ACCESS
              </h3>
              <p className="text-[#94A3B8] text-[13px] leading-relaxed max-w-[380px]">
                Join our active community, get insights, analysis and connect with elite traders.
              </p>
            </div>
          </div>
          <button className="shrink-0 border border-[#14B8A6]/40 hover:bg-[#14B8A6]/10 text-[#14B8A6] font-medium rounded-xl px-6 py-3 flex items-center gap-2 transition-colors text-[13px]">
            Learn More <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

      </main>
    </div>
  );
}
