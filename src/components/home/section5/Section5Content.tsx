// gemini Iteration 2 

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  ShieldCheck,
  Check,
  Layers,
  Target,
  Send,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  );
}

function DiscordIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
    </svg>
  );
}

export default function Section5Content() {
  const [activeIndex, setActiveIndex] = useState(1);

  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + 3) % 3);
  const handleNext = () => setActiveIndex((prev) => (prev + 1) % 3);

  return (
    <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 py-8 md:py-10 lg:py-12 flex flex-col items-center">
      
      {/* Top Row / Header */}
      <div className="w-full flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-16 mb-12 lg:mb-16">
        <motion.div className="w-full lg:max-w-3xl">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[#D4AF37] font-semibold tracking-[0.3em] text-sm">05</span>
            <div className="h-px w-16 bg-[#D4AF37]"></div>
            <span className="text-[#D4AF37] font-semibold tracking-[0.2em] text-sm uppercase">The Analysts</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-8 tracking-tight leading-[1.1]">
            The Analysts<br />
            Behind The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] via-[#F472B6] to-[#D4AF37]">Conviction.</span>
          </h2>

          <p className="text-[#D4AF37] text-base md:text-lg font-semibold tracking-[0.15em] uppercase leading-relaxed max-w-2xl">
            No single trader sees the entire market.<br className="hidden md:block" />
            Together, they cover every dimension that matters.
          </p>
        </motion.div>

        <motion.div className="flex flex-col sm:flex-row items-start lg:justify-end gap-6 lg:gap-8 lg:mt-8 w-full lg:w-auto">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
            <Users className="w-8 h-8 sm:w-10 sm:h-10 text-[#D4AF37]" />
          </div>
          <div className="text-white/80 text-xl lg:text-2xl leading-relaxed">
            <p className="text-white">Different expertise.</p>
            <p className="text-white">Different perspectives.</p>
            <p className="mt-2 font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] via-[#F472B6] to-[#D4AF37]">
              One ecosystem built<br />for smarter decisions.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Carousel Section */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[18%_minmax(0,1fr)_18%] lg:items-center gap-6 lg:gap-8 mb-16 relative">

        {/* Connection Lines between cards (Desktop Only) */}
        <div className="hidden lg:block absolute top-1/2 left-[10%] right-[10%] h-[2px] -translate-y-1/2 z-0 pointer-events-none">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent relative">
            <div className="absolute left-[15%] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#A855F7]/30 shadow-[0_0_10px_rgba(168,85,247,0.3)]"></div>
            <div className="absolute right-[15%] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#3B82F6]/30 shadow-[0_0_10px_rgba(59,130,246,0.3)]"></div>
          </div>
        </div>

        {/* Left Arrow (Desktop Only) */}
        <button onClick={handlePrev} className="hidden xl:flex absolute -left-16 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full border border-[#A855F7]/30 items-center justify-center text-[#A855F7] hover:bg-[#A855F7]/10 transition-all hover:scale-105 bg-black/50 backdrop-blur-sm z-20">
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Left Card: Mattertrade (Selector Card) */}
        <motion.div
          onClick={() => setActiveIndex(0)}
          className="order-2 col-span-1 lg:order-1 w-full bg-black/40 backdrop-blur-md border border-white/20 rounded-3xl p-6 flex flex-col items-center text-center justify-center h-auto min-h-[280px] lg:h-[320px] cursor-pointer group shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(168,85,247,0.15)] hover:border-[#A855F7]/50 transition-all duration-300 z-10"
        >
          <div className="w-14 h-14 rounded-xl border border-[#A855F7]/40 flex items-center justify-center mb-6 bg-[#A855F7]/10 text-[#A855F7] font-bold text-xl group-hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all">
            MT
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">Mattertrade</h3>
          <div className="w-8 h-px bg-white/10 mb-4"></div>
          <p className="text-[#A855F7] text-base font-medium mb-8 leading-relaxed">
            Macro &<br />Market Structure
          </p>
          <div className="mt-auto">
            <div className="w-12 h-12 rounded-lg border border-[#A855F7]/20 flex items-center justify-center group-hover:border-[#A855F7]/50 transition-colors">
              <Layers className="w-6 h-6 text-[#A855F7]" />
            </div>
          </div>
        </motion.div>

        {/* Center Card: ChartInDepth (Active Card) */}
        <motion.div
          onClick={() => setActiveIndex(1)}
          className="order-1 md:col-span-2 lg:col-span-1 lg:order-2 w-full bg-[#0A0A0A]/80 backdrop-blur-xl border border-[#D4AF37]/60 rounded-[2rem] p-8 sm:p-10 lg:p-14 shadow-[0_0_80px_rgba(212,175,55,0.15)] ring-1 ring-inset ring-[#D4AF37]/20 relative overflow-hidden z-10 transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.005] hover:shadow-[0_10px_100px_rgba(212,175,55,0.25)] hover:border-[#D4AF37]/80 hover:ring-[#D4AF37]/40 cursor-pointer"
        >
          {/* Top Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 lg:gap-8 mb-12">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border border-[#D4AF37] flex items-center justify-center bg-[#D4AF37]/10 text-[#D4AF37] font-bold text-2xl sm:text-3xl shrink-0 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
              CID
            </div>
            <div>
              <h3 className="text-4xl sm:text-5xl font-bold text-white mb-3">ChartInDepth</h3>
              <p className="text-[#D4AF37] text-lg sm:text-xl font-medium mb-3">Market Structure Specialist</p>
              <div className="flex items-center gap-3 text-white/60 text-sm sm:text-base">
                <ShieldCheck className="w-5 h-5 text-white/40" />
                <span>8+ Years Experience</span>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-white/10 mb-12"></div>

          {/* Grid Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 lg:gap-16 mb-12 relative">
            <div className="hidden sm:block absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2"></div>

            <div className="sm:pr-6 lg:pr-10">
              <h4 className="text-white/40 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase mb-6 lg:mb-8">Focus Areas</h4>
              <ul className="space-y-4 lg:space-y-5">
                {['Market Structure', 'Futures', 'Sentiment', 'Positioning'].map((item) => (
                  <li key={item} className="flex items-center gap-4 text-white/90 text-sm sm:text-base lg:text-lg">
                    <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-[#D4AF37] shrink-0"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="sm:pl-6 lg:pl-10">
              <h4 className="text-white/40 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase mb-6 lg:mb-8">Inside TraderCity</h4>
              <ul className="space-y-4 lg:space-y-5">
                {['Weekly Market Reports', 'Trade Reviews', 'Educational Breakdowns', 'Market Outlooks'].map((item) => (
                  <li key={item} className="flex items-center gap-4 text-white/90 text-sm sm:text-base lg:text-lg">
                    <Check className="w-4 h-4 lg:w-5 lg:h-5 text-[#D4AF37] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="text-white/70 leading-relaxed text-sm sm:text-base lg:text-lg max-w-3xl">
            "Specializes in high timeframe structure, perpetual positioning and market sentiment to identify high probability opportunities."
          </p>

          {/* Social Strip */}
          <div className="mt-8 lg:mt-12 bg-[#1A1A1A]/80 border border-white/10 rounded-2xl p-5 flex items-center justify-between sm:justify-center sm:gap-12 w-full max-w-sm mx-auto sm:mx-0">
            <button className="text-white/70 hover:text-white transition-colors flex items-center justify-center">
              <XIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button className="text-white/70 hover:text-[#3B82F6] transition-colors flex items-center justify-center">
              <Send className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button className="text-white/70 hover:text-[#EF4444] transition-colors flex items-center justify-center font-bold text-base sm:text-lg tracking-wide">
              YT
            </button>
            <button className="text-white/70 hover:text-white transition-colors flex items-center justify-center">
              <DiscordIcon className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>
          </div>
        </motion.div>

        {/* Right Card: Heavyweight (Selector Card) */}
        <motion.div
          onClick={() => setActiveIndex(2)}
          className="order-3 col-span-1 lg:order-3 w-full bg-black/40 backdrop-blur-md border border-white/20 rounded-3xl p-6 flex flex-col items-center text-center justify-center h-auto min-h-[280px] lg:h-[320px] cursor-pointer group shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(59,130,246,0.15)] hover:border-[#3B82F6]/50 transition-all duration-300 z-10"
        >
          <div className="w-14 h-14 rounded-xl border border-[#3B82F6]/40 flex items-center justify-center mb-6 bg-[#3B82F6]/10 text-[#3B82F6] font-bold text-xl group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all">
            HW
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">Heavyweight</h3>
          <div className="w-8 h-px bg-white/10 mb-4"></div>
          <p className="text-[#3B82F6] text-base font-medium mb-8 leading-relaxed">
            Orderflow &<br />Execution
          </p>
          <div className="mt-auto">
            <div className="w-12 h-12 rounded-lg border border-[#3B82F6]/20 flex items-center justify-center group-hover:border-[#3B82F6]/50 transition-colors">
              <Target className="w-6 h-6 text-[#3B82F6]" />
            </div>
          </div>
        </motion.div>

        {/* Right Arrow (Desktop Only) */}
        <button onClick={handleNext} className="hidden xl:flex absolute -right-16 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full border border-[#3B82F6]/30 items-center justify-center text-[#3B82F6] hover:bg-[#3B82F6]/10 transition-all hover:scale-105 bg-black/50 backdrop-blur-sm z-20">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Navigation */}
      <motion.div className="w-full max-w-4xl mx-auto mt-16">
        
        {/* Desktop & Tablet Nav */}
        <div className="hidden sm:flex items-center justify-between px-4 md:px-0">
          
          {/* Left Item */}
          <button onClick={() => setActiveIndex(0)} className={`flex items-center gap-4 shrink-0 transition-all duration-300 ${activeIndex === 0 ? 'opacity-100' : 'opacity-50 hover:opacity-80'}`}>
            <span className={`text-sm font-bold tracking-widest uppercase transition-all duration-300 ${activeIndex === 0 ? 'text-[#A855F7] drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]' : 'text-white'}`}>Mattertrade</span>
            <div className={`w-6 h-6 rounded-full bg-black border-2 flex items-center justify-center transition-all duration-300 ${activeIndex === 0 ? 'border-[#A855F7] shadow-[0_0_15px_rgba(168,85,247,0.4)]' : 'border-white/20'}`}>
              <div className={`w-2 h-2 rounded-full transition-all duration-300 ${activeIndex === 0 ? 'bg-[#A855F7] shadow-[0_0_8px_rgba(168,85,247,0.8)]' : 'bg-transparent'}`}></div>
            </div>
          </button>

          {/* Connector 1 */}
          <div className={`flex-1 h-[2px] mx-2 sm:mx-4 transition-all duration-300 ${activeIndex === 0 ? 'bg-gradient-to-r from-[#A855F7]/80 to-transparent' : 'bg-white/10'}`}></div>
          <div className={`w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-300 ${activeIndex === 0 || activeIndex === 1 ? 'bg-white/60 shadow-[0_0_8px_rgba(255,255,255,0.4)]' : 'bg-white/20'}`}></div>
          <div className={`flex-1 h-[2px] mx-2 sm:mx-4 transition-all duration-300 ${activeIndex === 1 ? 'bg-gradient-to-l from-[#D4AF37]/80 to-transparent' : 'bg-white/10'}`}></div>

          {/* Center Item */}
          <button onClick={() => setActiveIndex(1)} className={`flex items-center gap-4 shrink-0 transition-all duration-300 ${activeIndex === 1 ? 'opacity-100' : 'opacity-50 hover:opacity-80'}`}>
            <span className={`text-sm font-bold tracking-widest uppercase transition-all duration-300 ${activeIndex === 1 ? 'text-[#D4AF37] drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]' : 'text-white'}`}>ChartInDepth</span>
            <div className={`w-6 h-6 rounded-full bg-black border-2 flex items-center justify-center relative transition-all duration-300 ${activeIndex === 1 ? 'border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.4)]' : 'border-white/20'}`}>
              <div className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${activeIndex === 1 ? 'bg-[#D4AF37]' : 'bg-transparent'}`}></div>
              {activeIndex === 1 && <div className="absolute inset-0 rounded-full border border-[#D4AF37] animate-ping opacity-20"></div>}
            </div>
          </button>

          {/* Connector 2 */}
          <div className={`flex-1 h-[2px] mx-2 sm:mx-4 transition-all duration-300 ${activeIndex === 1 ? 'bg-gradient-to-r from-[#D4AF37]/80 to-transparent' : 'bg-white/10'}`}></div>
          <div className={`w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-300 ${activeIndex === 1 || activeIndex === 2 ? 'bg-white/60 shadow-[0_0_8px_rgba(255,255,255,0.4)]' : 'bg-white/20'}`}></div>
          <div className={`flex-1 h-[2px] mx-2 sm:mx-4 transition-all duration-300 ${activeIndex === 2 ? 'bg-gradient-to-l from-[#3B82F6]/80 to-transparent' : 'bg-white/10'}`}></div>

          {/* Right Item */}
          <button onClick={() => setActiveIndex(2)} className={`flex items-center gap-4 shrink-0 transition-all duration-300 ${activeIndex === 2 ? 'opacity-100' : 'opacity-50 hover:opacity-80'}`}>
            <div className={`w-6 h-6 rounded-full bg-black border-2 flex items-center justify-center transition-all duration-300 ${activeIndex === 2 ? 'border-[#3B82F6] shadow-[0_0_15px_rgba(59,130,246,0.4)]' : 'border-white/20'}`}>
              <div className={`w-2 h-2 rounded-full transition-all duration-300 ${activeIndex === 2 ? 'bg-[#3B82F6] shadow-[0_0_8px_rgba(59,130,246,0.8)]' : 'bg-transparent'}`}></div>
            </div>
            <span className={`text-sm font-bold tracking-widest uppercase transition-all duration-300 ${activeIndex === 2 ? 'text-[#3B82F6] drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]' : 'text-white'}`}>Heavyweight</span>
          </button>

        </div>

        {/* Mobile Nav */}
        <div className="flex sm:hidden flex-col items-center">
          <div className="flex items-start justify-between w-full max-w-xs mx-auto">
            
            <button onClick={() => setActiveIndex(0)} className={`flex flex-col items-center gap-3 w-1/3 transition-all duration-300 ${activeIndex === 0 ? 'opacity-100' : 'opacity-50'}`}>
              <div className={`w-5 h-5 rounded-full bg-black border-2 flex items-center justify-center transition-all duration-300 ${activeIndex === 0 ? 'border-[#A855F7] shadow-[0_0_15px_rgba(168,85,247,0.4)]' : 'border-white/20'}`}>
                <div className={`w-2 h-2 rounded-full transition-all duration-300 ${activeIndex === 0 ? 'bg-[#A855F7]' : 'bg-transparent'}`}></div>
              </div>
              <span className={`text-[10px] font-bold tracking-widest uppercase text-center leading-tight transition-colors duration-300 ${activeIndex === 0 ? 'text-[#A855F7]' : 'text-white'}`}>Matter<br />trade</span>
            </button>

            <button onClick={() => setActiveIndex(1)} className={`flex flex-col items-center gap-3 w-1/3 transition-all duration-300 ${activeIndex === 1 ? 'opacity-100' : 'opacity-50'}`}>
              <div className={`w-6 h-6 rounded-full bg-black border-2 flex items-center justify-center relative transition-all duration-300 ${activeIndex === 1 ? 'border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.4)]' : 'border-white/20'}`}>
                <div className={`w-2 h-2 rounded-full transition-all duration-300 ${activeIndex === 1 ? 'bg-[#D4AF37]' : 'bg-transparent'}`}></div>
                {activeIndex === 1 && <div className="absolute inset-0 rounded-full border border-[#D4AF37] animate-ping opacity-20"></div>}
              </div>
              <span className={`text-[10px] font-bold tracking-widest uppercase text-center leading-tight transition-colors duration-300 ${activeIndex === 1 ? 'text-[#D4AF37]' : 'text-white'}`}>ChartIn<br />Depth</span>
            </button>

            <button onClick={() => setActiveIndex(2)} className={`flex flex-col items-center gap-3 w-1/3 transition-all duration-300 ${activeIndex === 2 ? 'opacity-100' : 'opacity-50'}`}>
              <div className={`w-5 h-5 rounded-full bg-black border-2 flex items-center justify-center transition-all duration-300 ${activeIndex === 2 ? 'border-[#3B82F6] shadow-[0_0_15px_rgba(59,130,246,0.4)]' : 'border-white/20'}`}>
                <div className={`w-2 h-2 rounded-full transition-all duration-300 ${activeIndex === 2 ? 'bg-[#3B82F6]' : 'bg-transparent'}`}></div>
              </div>
              <span className={`text-[10px] font-bold tracking-widest uppercase text-center leading-tight transition-colors duration-300 ${activeIndex === 2 ? 'text-[#3B82F6]' : 'text-white'}`}>Heavy<br />weight</span>
            </button>

          </div>
        </div>
      </motion.div>

    </div>
  );
}



// Gemini Iteration 1 
// 'use client';

// import React from 'react';
// import { motion } from 'framer-motion';
// import { 
//   Users, 
//   ShieldCheck, 
//   Check, 
//   Layers, 
//   Target,
//   Send,
//   ChevronLeft,
//   ChevronRight
// } from 'lucide-react';

// function XIcon(props: React.SVGProps<SVGSVGElement>) {
//   return (
//     <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
//       <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
//     </svg>
//   );
// }

// function DiscordIcon(props: React.SVGProps<SVGSVGElement>) {
//   return (
//     <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
//       <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
//     </svg>
//   );
// }

// export default function Section5Content() {
//   return (
//     // <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 py-24 md:py-32 lg:py-40 flex flex-col items-center">
//     <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 py-8 md:py-10 lg:py-12 flex flex-col items-center">
//       {/* // If you want Section 5 to almost touch Section 4 */}
//    {/* <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 pt-4 pb-12 md:pt-6 md:pb-16 lg:pt-8 lg:pb-20 flex flex-col items-center"></div>    */}
      
//       {/* Top Row / Header */}
//       {/* Not affecting the gap above Section 5, but later it will create excessive spacing inside Section 5. */}
//       {/* <div className="w-full flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-16 mb-20 lg:mb-32"> */}

//       {/* So changed to this  */}
//       <div className="w-full flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-16 mb-12 lg:mb-16">
//         <motion.div 
//           // initial={{ opacity: 0, y: 20 }}
//           // whileInView={{ opacity: 1, y: 0 }}
//           // viewport={{ once: true }}
//           // transition={{ duration: 0.6 }}
//           className="w-full lg:max-w-3xl"
//         >
//           <div className="flex items-center gap-4 mb-8">
//             <span className="text-[#D4AF37] font-semibold tracking-[0.3em] text-sm">05</span>
//             <div className="h-px w-16 bg-[#D4AF37]"></div>
//             <span className="text-[#D4AF37] font-semibold tracking-[0.2em] text-sm uppercase">The Analysts</span>
//           </div>
          
//           <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-8 tracking-tight leading-[1.1]">
//             Meet The Analysts
//           </h2>
          
//           <p className="text-[#D4AF37] text-base md:text-lg font-semibold tracking-[0.15em] uppercase leading-relaxed max-w-2xl">
//             No single trader sees the entire market.<br className="hidden md:block" />
//             Together, they cover every dimension that matters.
//           </p>
//         </motion.div>

//         <motion.div 
//           // initial={{ opacity: 0, y: 20 }}
//           // whileInView={{ opacity: 1, y: 0 }}
//           // viewport={{ once: true }}
//           // transition={{ duration: 0.6, delay: 0.2 }}
//           className="flex flex-col sm:flex-row items-start lg:justify-end gap-6 lg:gap-8 lg:mt-8 w-full lg:w-auto"
//         >
//           <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
//             <Users className="w-8 h-8 sm:w-10 sm:h-10 text-[#D4AF37]" />
//           </div>
//           <div className="text-white/80 text-xl lg:text-2xl leading-relaxed">
//             <p>Different expertise.</p>
//             <p>Different perspectives.</p>
//             <p className="text-[#D4AF37] mt-2 font-medium">One ecosystem built<br className="hidden sm:block" />for smarter decisions.</p>
//           </div>
//         </motion.div>
//       </div>

//       {/* Carousel Section */}
//       <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[18%_minmax(0,1fr)_18%] lg:items-center gap-6 lg:gap-8 mb-16 relative">
        
//         {/* Left Arrow (Desktop Only) */}
//         <button className="hidden xl:flex absolute -left-16 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full border border-[#A855F7]/30 items-center justify-center text-[#A855F7] hover:bg-[#A855F7]/10 transition-all hover:scale-105 bg-black/50 backdrop-blur-sm z-20">
//           <ChevronLeft className="w-6 h-6" />
//         </button>

//         {/* Left Card: Mattertrade (Selector Card) */}
//         <motion.div 
//           // initial={{ opacity: 0, x: -20 }}
//           // whileInView={{ opacity: 1, x: 0 }}
//           // viewport={{ once: true }}
//           // transition={{ duration: 0.6 }}
//           whileHover={{ y: -5 }}
//           className="order-2 col-span-1 lg:order-1 w-full bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex flex-col items-center text-center justify-center h-auto min-h-[280px] lg:h-[320px] cursor-pointer group hover:border-[#A855F7]/40 transition-colors"
//         >
//           <div className="w-14 h-14 rounded-xl border border-[#A855F7]/40 flex items-center justify-center mb-6 bg-[#A855F7]/10 text-[#A855F7] font-bold text-xl group-hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all">
//             MT
//           </div>
//           <h3 className="text-2xl font-bold text-white mb-4">Mattertrade</h3>
//           <div className="w-8 h-px bg-white/10 mb-4"></div>
//           <p className="text-[#A855F7] text-base font-medium mb-8 leading-relaxed">
//             Macro &<br />Market Structure
//           </p>
//           <div className="mt-auto">
//             <div className="w-12 h-12 rounded-lg border border-[#A855F7]/20 flex items-center justify-center group-hover:border-[#A855F7]/50 transition-colors">
//               <Layers className="w-6 h-6 text-[#A855F7]" />
//             </div>
//           </div>
//         </motion.div>

//         {/* Center Card: ChartInDepth (Active Card) */}
//         <motion.div 
//           // initial={{ opacity: 0, y: 20 }}
//           // whileInView={{ opacity: 1, y: 0 }}
//           // viewport={{ once: true }}
//           // transition={{ duration: 0.6, delay: 0.2 }}
//           className="order-1 md:col-span-2 lg:col-span-1 lg:order-2 w-full bg-[#0A0A0A]/80 backdrop-blur-xl border border-[#D4AF37]/40 rounded-[2rem] p-8 sm:p-10 lg:p-14 shadow-[0_0_50px_rgba(212,175,55,0.1)] relative overflow-hidden z-10"
//         >
//           {/* Top Header */}
//           <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 lg:gap-8 mb-12">
//             <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border border-[#D4AF37] flex items-center justify-center bg-[#D4AF37]/10 text-[#D4AF37] font-bold text-2xl sm:text-3xl shrink-0 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
//               CID
//             </div>
//             <div>
//               <h3 className="text-4xl sm:text-5xl font-bold text-white mb-3">ChartInDepth</h3>
//               <p className="text-[#D4AF37] text-lg sm:text-xl font-medium mb-3">Market Structure Specialist</p>
//               <div className="flex items-center gap-3 text-white/60 text-sm sm:text-base">
//                 <ShieldCheck className="w-5 h-5 text-white/40" />
//                 <span>8+ Years Experience</span>
//               </div>
//             </div>
//           </div>

//           <div className="w-full h-px bg-white/10 mb-12"></div>

//           {/* Grid Content */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 lg:gap-16 mb-12 relative">
//             <div className="hidden sm:block absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2"></div>
            
//             <div className="sm:pr-6 lg:pr-10">
//               <h4 className="text-white/40 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase mb-6 lg:mb-8">Focus Areas</h4>
//               <ul className="space-y-4 lg:space-y-5">
//                 {['Market Structure', 'Futures', 'Sentiment', 'Positioning'].map((item) => (
//                   <li key={item} className="flex items-center gap-4 text-white/90 text-sm sm:text-base lg:text-lg">
//                     <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-[#D4AF37] shrink-0"></div>
//                     {item}
//                   </li>
//                 ))}
//               </ul>
//             </div>
            
//             <div className="sm:pl-6 lg:pl-10">
//               <h4 className="text-white/40 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase mb-6 lg:mb-8">Inside TraderCity</h4>
//               <ul className="space-y-4 lg:space-y-5">
//                 {['Weekly Market Reports', 'Trade Reviews', 'Educational Breakdowns', 'Market Outlooks'].map((item) => (
//                   <li key={item} className="flex items-center gap-4 text-white/90 text-sm sm:text-base lg:text-lg">
//                     <Check className="w-4 h-4 lg:w-5 lg:h-5 text-[#D4AF37] shrink-0" />
//                     {item}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>

//           <p className="text-white/70 leading-relaxed text-sm sm:text-base lg:text-lg max-w-3xl">
//             "Specializes in high timeframe structure, perpetual positioning and market sentiment to identify high probability opportunities."
//           </p>

//           {/* Social Strip */}
//           <div className="mt-8 lg:mt-12 bg-[#1A1A1A]/80 border border-white/10 rounded-2xl p-5 flex items-center justify-between sm:justify-center sm:gap-12 w-full max-w-sm mx-auto sm:mx-0">
//             <button className="text-white/70 hover:text-white transition-colors flex items-center justify-center">
//               <XIcon className="w-5 h-5 sm:w-6 sm:h-6" />
//             </button>
//             <button className="text-white/70 hover:text-[#3B82F6] transition-colors flex items-center justify-center">
//               <Send className="w-5 h-5 sm:w-6 sm:h-6" />
//             </button>
//             <button className="text-white/70 hover:text-[#EF4444] transition-colors flex items-center justify-center font-bold text-base sm:text-lg tracking-wide">
//               YT
//             </button>
//             <button className="text-white/70 hover:text-white transition-colors flex items-center justify-center">
//               <DiscordIcon className="w-6 h-6 sm:w-7 sm:h-7" />
//             </button>
//           </div>
//         </motion.div>

//         {/* Right Card: Heavyweight (Selector Card) */}
//         <motion.div 
//           // initial={{ opacity: 0, x: 20 }}
//           // whileInView={{ opacity: 1, x: 0 }}
//           // viewport={{ once: true }}
//           // transition={{ duration: 0.6 }}
//           whileHover={{ y: -5 }}
//           className="order-3 col-span-1 lg:order-3 w-full bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex flex-col items-center text-center justify-center h-auto min-h-[280px] lg:h-[320px] cursor-pointer group hover:border-[#3B82F6]/40 transition-colors"
//         >
//           <div className="w-14 h-14 rounded-xl border border-[#3B82F6]/40 flex items-center justify-center mb-6 bg-[#3B82F6]/10 text-[#3B82F6] font-bold text-xl group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all">
//             HW
//           </div>
//           <h3 className="text-2xl font-bold text-white mb-4">Heavyweight</h3>
//           <div className="w-8 h-px bg-white/10 mb-4"></div>
//           <p className="text-[#3B82F6] text-base font-medium mb-8 leading-relaxed">
//             Orderflow &<br />Execution
//           </p>
//           <div className="mt-auto">
//             <div className="w-12 h-12 rounded-lg border border-[#3B82F6]/20 flex items-center justify-center group-hover:border-[#3B82F6]/50 transition-colors">
//               <Target className="w-6 h-6 text-[#3B82F6]" />
//             </div>
//           </div>
//         </motion.div>

//         {/* Right Arrow (Desktop Only) */}
//         <button className="hidden xl:flex absolute -right-16 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full border border-[#3B82F6]/30 items-center justify-center text-[#3B82F6] hover:bg-[#3B82F6]/10 transition-all hover:scale-105 bg-black/50 backdrop-blur-sm z-20">
//           <ChevronRight className="w-6 h-6" />
//         </button>
//       </div>

//       {/* Bottom Navigation */}
//       <motion.div 
//         // initial={{ opacity: 0 }}
//         // whileInView={{ opacity: 1 }}
//         // viewport={{ once: true }}
//         // transition={{ duration: 0.8, delay: 0.6 }}
//         className="w-full max-w-4xl mx-auto mt-16"
//       >
//         {/* Desktop & Tablet Nav */}
//         <div className="hidden sm:flex items-center justify-between px-4 md:px-0">
//           {/* Left Item */}
//           <div className="flex items-center gap-4 shrink-0">
//             <span className="text-[#A855F7] text-sm font-bold tracking-widest uppercase">Mattertrade</span>
//             <div className="w-6 h-6 rounded-full bg-black border-2 border-[#A855F7] flex items-center justify-center">
//               <div className="w-2 h-2 rounded-full bg-[#A855F7]"></div>
//             </div>
//           </div>

//           <div className="flex-1 h-px bg-white/10 mx-6"></div>
//           <div className="w-1.5 h-1.5 rounded-full bg-white/20 shrink-0"></div>
//           <div className="flex-1 h-px bg-white/10 mx-6"></div>

//           {/* Center Item */}
//           <div className="flex items-center gap-4 shrink-0">
//             <span className="text-[#D4AF37] text-sm font-bold tracking-widest uppercase">ChartInDepth</span>
//             <div className="w-6 h-6 rounded-full bg-black border-2 border-[#D4AF37] flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.4)] relative">
//               <div className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]"></div>
//               <div className="absolute inset-0 rounded-full border border-[#D4AF37] animate-ping opacity-20"></div>
//             </div>
//           </div>

//           <div className="flex-1 h-px bg-white/10 mx-6"></div>
//           <div className="w-1.5 h-1.5 rounded-full bg-white/20 shrink-0"></div>
//           <div className="flex-1 h-px bg-white/10 mx-6"></div>

//           {/* Right Item */}
//           <div className="flex items-center gap-4 shrink-0">
//             <div className="w-6 h-6 rounded-full bg-black border-2 border-[#3B82F6] flex items-center justify-center">
//               <div className="w-2 h-2 rounded-full bg-[#3B82F6]"></div>
//             </div>
//             <span className="text-[#3B82F6] text-sm font-bold tracking-widest uppercase">Heavyweight</span>
//           </div>
//         </div>

//         {/* Mobile Nav */}
//         <div className="flex sm:hidden flex-col items-center">
//           <div className="flex items-start justify-between w-full max-w-xs mx-auto">
//             <div className="flex flex-col items-center gap-3 w-1/3">
//               <div className="w-5 h-5 rounded-full bg-black border-2 border-[#A855F7] flex items-center justify-center">
//                 <div className="w-2 h-2 rounded-full bg-[#A855F7]"></div>
//               </div>
//               <span className="text-[#A855F7] text-[10px] font-bold tracking-widest uppercase text-center leading-tight">Matter<br/>trade</span>
//             </div>
            
//             <div className="flex flex-col items-center gap-3 w-1/3">
//               <div className="w-6 h-6 rounded-full bg-black border-2 border-[#D4AF37] flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.4)] relative">
//                 <div className="w-2 h-2 rounded-full bg-[#D4AF37]"></div>
//                 <div className="absolute inset-0 rounded-full border border-[#D4AF37] animate-ping opacity-20"></div>
//               </div>
//               <span className="text-[#D4AF37] text-[10px] font-bold tracking-widest uppercase text-center leading-tight">ChartIn<br/>Depth</span>
//             </div>
            
//             <div className="flex flex-col items-center gap-3 w-1/3">
//               <div className="w-5 h-5 rounded-full bg-black border-2 border-[#3B82F6] flex items-center justify-center">
//                 <div className="w-2 h-2 rounded-full bg-[#3B82F6]"></div>
//               </div>
//               <span className="text-[#3B82F6] text-[10px] font-bold tracking-widest uppercase text-center leading-tight">Heavy<br/>weight</span>
//             </div>
//           </div>
//         </div>
//       </motion.div>

//     </div>
//   );
// }




// Section5Content.tsx

// export default function Section5Content() {
//   return (
//     <div className="relative z-10 mx-auto max-w-[1440px] px-8 lg:px-16 py-24">

//       {/* Header */}
//       <div className="grid lg:grid-cols-2 gap-16 mb-20">

//         {/* Left */}
//         <div>
//           <div className="flex items-center gap-4 mb-6">
//             <span className="text-[#D4AF37] text-sm tracking-[0.3em]">
//               05
//             </span>

//             <div className="w-10 h-px bg-[#D4AF37]" />

//             <span className="text-[#D4AF37] text-sm tracking-[0.2em] uppercase">
//               The Analysts
//             </span>
//           </div>

//           <h2 className="text-white text-6xl lg:text-7xl font-bold leading-none mb-8">
//             Meet The Analysts
//           </h2>

//           <p className="text-[#D4AF37] text-lg uppercase tracking-[0.15em] leading-relaxed">
//             No single trader sees the entire market.
//             <br />
//             Together, they cover every dimension that matters.
//           </p>
//         </div>

//         {/* Right */}
//         <div className="flex justify-end">
//           <div className="max-w-sm">
//             <p className="text-white text-2xl leading-relaxed">
//               Different expertise.
//               <br />
//               Different perspectives.
//               <br />
//               <span className="text-[#D4AF37]">
//                 One ecosystem built
//                 <br />
//                 for smarter decisions.
//               </span>
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Cards Row */}
//       <div className="flex items-center justify-center gap-8">

//         {/* Left Card */}
//         <div className="w-[260px] h-[420px] border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center">

//           <div className="w-16 h-16 rounded-xl border border-purple-500 flex items-center justify-center text-purple-400 text-2xl font-bold mb-8">
//             MT
//           </div>

//           <h3 className="text-white text-3xl font-semibold mb-4">
//             Mattertrade
//           </h3>

//           <p className="text-purple-400 text-center">
//             Macro & Market Structure
//           </p>

//         </div>

//         {/* Main Card */}
//         <div className="w-[560px] min-h-[620px] border border-[#D4AF37] rounded-3xl p-10">

//           <div className="flex gap-6 mb-10">

//             <div className="w-20 h-20 rounded-2xl border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] text-3xl font-bold">
//               CID
//             </div>

//             <div>
//               <h3 className="text-white text-5xl font-bold">
//                 ChartInDepth
//               </h3>

//               <p className="text-[#D4AF37] text-xl mt-2">
//                 Market Structure Specialist
//               </p>

//               <p className="text-white/70 mt-4">
//                 8+ Years Experience
//               </p>
//             </div>
//           </div>

//           <div className="border-t border-white/10 pt-8">

//             <div className="grid grid-cols-2 gap-10">

//               <div>
//                 <h4 className="text-white uppercase tracking-widest text-sm mb-4">
//                   Focus Areas
//                 </h4>

//                 <ul className="space-y-3 text-white/80">
//                   <li>• Market Structure</li>
//                   <li>• Futures</li>
//                   <li>• Sentiment</li>
//                   <li>• Positioning</li>
//                 </ul>
//               </div>

//               <div>
//                 <h4 className="text-white uppercase tracking-widest text-sm mb-4">
//                   Inside TraderCity
//                 </h4>

//                 <ul className="space-y-3 text-white/80">
//                   <li>✓ Weekly Reports</li>
//                   <li>✓ Trade Reviews</li>
//                   <li>✓ Education</li>
//                   <li>✓ Market Outlooks</li>
//                 </ul>
//               </div>

//             </div>

//             <p className="mt-10 text-white/70 leading-relaxed">
//               Specializes in high timeframe structure,
//               perpetual positioning and market sentiment
//               to identify high probability opportunities.
//             </p>

//             {/* Social Strip */}
//             <div className="mt-10 border border-white/10 rounded-2xl h-16 flex items-center justify-center gap-12">
//               <span>X</span>
//               <span>Telegram</span>
//               <span>YouTube</span>
//               <span>Discord</span>
//             </div>

//           </div>

//         </div>

//         {/* Right Card */}
//         <div className="w-[260px] h-[420px] border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center">

//           <div className="w-16 h-16 rounded-xl border border-blue-500 flex items-center justify-center text-blue-400 text-2xl font-bold mb-8">
//             HW
//           </div>

//           <h3 className="text-white text-3xl font-semibold mb-4">
//             Heavyweight
//           </h3>

//           <p className="text-blue-400 text-center">
//             Orderflow & Execution
//           </p>

//         </div>

//       </div>

//       {/* Bottom Navigation */}
//       <div className="mt-16 flex items-center justify-center gap-12 text-sm uppercase tracking-[0.2em]">

//         <span className="text-purple-400">
//           Mattertrade
//         </span>

//         <div className="w-32 h-px bg-white/20" />

//         <span className="text-[#D4AF37]">
//           ChartInDepth
//         </span>

//         <div className="w-32 h-px bg-white/20" />

//         <span className="text-blue-400">
//           Heavyweight
//         </span>

//       </div>

//     </div>
//   );
// }