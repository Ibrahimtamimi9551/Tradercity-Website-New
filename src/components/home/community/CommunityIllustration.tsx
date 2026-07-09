'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Share2, Users, TrendingUp } from 'lucide-react';

function DiscordIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
    </svg>
  );
}

export default function CommunityIllustration() {
  return (
    <div className="relative z-20 w-full flex flex-col items-center mt-12 sm:-mt-6 lg:-mt-8 pb-24 md:pb-32 lg:pb-40 pointer-events-none">
      <motion.div className="w-full max-w-4xl mx-auto flex flex-col items-center px-4 sm:px-6 pointer-events-auto">
        <div className="w-full flex items-center justify-center relative">
          <div className="flex flex-col items-center justify-center w-20 sm:w-32 py-3 sm:py-4 rounded-xl sm:rounded-2xl border border-[#A855F7]/30 bg-[#111111]/80 backdrop-blur-md shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.05)]">
            <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[#A855F7] mb-2" />
            <span className="text-[8px] sm:text-[10px] font-bold tracking-widest text-white uppercase">Analysts</span>
          </div>

          <div className="flex-1 h-[3px] bg-gradient-to-r from-[#A855F7]/90 to-[#3B82F6]/90 min-w-[16px] max-w-[40px] sm:max-w-[100px] lg:max-w-[140px]" />

          <div className="w-24 h-24 sm:w-40 sm:h-40 flex flex-col items-center justify-center rounded-full border border-[#3B82F6]/40 bg-[#0A0A0A]/90 backdrop-blur-lg shadow-[0_0_30px_rgba(59,130,246,0.15)] relative z-10 shrink-0">
            <DiscordIcon className="w-6 h-6 sm:w-8 sm:h-8 text-[#3B82F6] mb-1 sm:mb-2" />
            <span className="text-[8px] sm:text-[10px] font-bold tracking-[0.15em] text-white uppercase text-center leading-tight">
              TraderCity
              <br />
              Discord
            </span>
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-[3px] h-12 sm:h-24 bg-gradient-to-b from-[#3B82F6]/90 to-[#3B82F6]/20" />
          </div>

          <div className="flex-1 h-[3px] bg-gradient-to-r from-[#3B82F6]/90 to-[#10B981]/90 min-w-[16px] max-w-[40px] sm:max-w-[100px] lg:max-w-[140px]" />

          <div className="flex flex-col items-center justify-center w-20 sm:w-32 py-3 sm:py-4 rounded-xl sm:rounded-2xl border border-[#10B981]/30 bg-[#111111]/80 backdrop-blur-md shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.05)]">
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-[#10B981] mb-2" />
            <span className="text-[8px] sm:text-[10px] font-bold tracking-widest text-white uppercase">Traders</span>
          </div>
        </div>

        <div className="h-12 sm:h-24 w-full" />

        <div className="flex flex-col items-center justify-center w-52 sm:w-80 py-4 sm:py-6 rounded-2xl sm:rounded-[2rem] border border-white/10 bg-[#111111]/90 backdrop-blur-xl relative shadow-[0_0_20px_rgba(255,255,255,0.02)]">
          <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
            <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#3B82F6]" />
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-white uppercase">Collective Edge</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
