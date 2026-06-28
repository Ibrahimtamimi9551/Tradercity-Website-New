//Gemini Iteration 2 

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
    // Changed -mt-8 to mt-12 on mobile to add clear separation from the screenshot.
    // Preserved negative margin on sm and lg to maintain desktop/tablet overlap composition.
    // <div className="relative z-20 w-full flex flex-col items-center mt-12 sm:-mt-12 lg:-mt-16 pb-24 md:pb-32 lg:pb-40 pointer-events-none">
      <div className="relative z-20 w-full flex flex-col items-center mt-12 sm:-mt+6 lg:-mt+8 pb-24 md:pb-32 lg:pb-40 pointer-events-none">
      {/* Container for the illustration */}
      <motion.div 
        // initial={{ opacity: 0, y: 30 }}
        // whileInView={{ opacity: 1, y: 0 }}
        // viewport={{ once: true, margin: "-100px" }}
        // transition={{ duration: 0.8 }}
        className="w-full max-w-4xl mx-auto flex flex-col items-center px-4 sm:px-6 pointer-events-auto"
      >
        
        {/* Top Row: Analysts - Discord - Traders */}
        <div className="w-full flex items-center justify-center relative">
          
          {/* Left Card: Analysts */}
          {/* Reduced width on mobile (w-20) to shrink the illustration footprint further. Tablet/Desktop unchanged. */}
          <div className="flex flex-col items-center justify-center w-20 sm:w-32 py-3 sm:py-4 rounded-xl sm:rounded-2xl border border-[#A855F7]/30 bg-[#111111]/80 backdrop-blur-md shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.05)]">
            <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[#A855F7] mb-2" />
            <span className="text-[8px] sm:text-[10px] font-bold tracking-widest text-white uppercase">Analysts</span>
          </div>

          {/* Left Connector Line */}
          {/* Increased thickness to 3px and brightness to 90% for stronger visual weight and readability without glowing. */}
          <div className="flex-1 h-[3px] bg-gradient-to-r from-[#A855F7]/90 to-[#3B82F6]/90 min-w-[16px] max-w-[40px] sm:max-w-[100px] lg:max-w-[140px]"></div>

          {/* Center Node: TraderCity Discord */}
          {/* Reduced node size on mobile (w-24 h-24) to reduce dominance and scale footprint down 15-20%. Tablet/Desktop unchanged. */}
          <div className="w-24 h-24 sm:w-40 sm:h-40 flex flex-col items-center justify-center rounded-full border border-[#3B82F6]/40 bg-[#0A0A0A]/90 backdrop-blur-lg shadow-[0_0_30px_rgba(59,130,246,0.15)] relative z-10 shrink-0">
            <DiscordIcon className="w-6 h-6 sm:w-8 sm:h-8 text-[#3B82F6] mb-1 sm:mb-2" />
            <span className="text-[8px] sm:text-[10px] font-bold tracking-[0.15em] text-white uppercase text-center leading-tight">TraderCity<br/>Discord</span>
            
            {/* The vertical line going down */}
            {/* Increased thickness to 3px and increased gradient brightness to 90% for stronger connection. */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-[3px] h-12 sm:h-24 bg-gradient-to-b from-[#3B82F6]/90 to-[#3B82F6]/20"></div>
          </div>

          {/* Right Connector Line */}
          {/* Increased thickness to 3px and brightness to 90%. */}
          <div className="flex-1 h-[3px] bg-gradient-to-r from-[#3B82F6]/90 to-[#10B981]/90 min-w-[16px] max-w-[40px] sm:max-w-[100px] lg:max-w-[140px]"></div>

          {/* Right Card: Traders */}
          {/* Changed icon from Users to TrendingUp for better differentiation. Scaled mobile size down (w-20). */}
          <div className="flex flex-col items-center justify-center w-20 sm:w-32 py-3 sm:py-4 rounded-xl sm:rounded-2xl border border-[#10B981]/30 bg-[#111111]/80 backdrop-blur-md shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.05)]">
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-[#10B981] mb-2" />
            <span className="text-[8px] sm:text-[10px] font-bold tracking-widest text-white uppercase">Traders</span>
          </div>

        </div>

        {/* Vertical Spacing matching the height of the downward line */}
        <div className="h-12 sm:h-24 w-full"></div>

        {/* Bottom Card: Collective Edge */}
        {/* Renamed card and scaled down slightly on mobile (w-52). */}
        <div className="flex flex-col items-center justify-center w-52 sm:w-80 py-4 sm:py-6 rounded-2xl sm:rounded-[2rem] border border-white/10 bg-[#111111]/90 backdrop-blur-xl relative shadow-[0_0_20px_rgba(255,255,255,0.02)]">
          <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
            <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#3B82F6]" />
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-white uppercase">Collective Edge</span>
          </div>
          {/* <span className="text-[8px] sm:text-[10px] text-white/40 uppercase tracking-[0.1em] font-medium text-center mt-1">
            Stronger Network.<br className="sm:hidden" /> Better Trades.
          </span> */}
        </div>

      </motion.div>
      
    </div>
  );
}


//Gemini Iteration 1 

// 'use client';

// import React from 'react';
// import { motion } from 'framer-motion';
// import { Share2, Users } from 'lucide-react';

// function DiscordIcon(props: React.SVGProps<SVGSVGElement>) {
//   return (
//     <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
//       <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
//     </svg>
//   );
// }

// export default function Section6Illustration() {
//   return (
//     <div className="relative z-20 w-full flex flex-col items-center -mt-8 sm:-mt-12 lg:-mt-16 pb-24 md:pb-32 lg:pb-40 pointer-events-none">
      
//       {/* Container for the illustration */}
//       {/* Reduced max-width from 5xl to 4xl to allow the illustration to act as a more compact supporting visual */}
//       <motion.div 
//         // initial={{ opacity: 0, y: 30 }}
//         // whileInView={{ opacity: 1, y: 0 }}
//         // viewport={{ once: true, margin: "-100px" }}
//         // transition={{ duration: 0.8 }}
//         className="w-full max-w-4xl mx-auto flex flex-col items-center px-4 sm:px-6 pointer-events-auto"
//       >
        
//         {/* Top Row: Analysts - Discord - Traders */}
//         <div className="w-full flex items-center justify-center relative">
          
//           {/* Left Card: Analysts */}
//           {/* Reduced width from w-32/w-40 to w-24/w-32 to decrease overall visual footprint and prioritize mobile safety */}
//           <div className="flex flex-col items-center justify-center w-24 sm:w-32 py-3 sm:py-4 rounded-xl sm:rounded-2xl border border-[#A855F7]/30 bg-[#111111]/80 backdrop-blur-md shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.05)]">
//             <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[#A855F7] mb-2" />
//             <span className="text-[9px] sm:text-[10px] font-bold tracking-widest text-white uppercase">Analysts</span>
//           </div>

//           {/* Left Connector Line */}
//           {/* Increased thickness to 2px and opacity to 70% for better readability. Reduced max-width for tighter layout on mobile. */}
//           <div className="flex-1 h-[2px] bg-gradient-to-r from-[#A855F7]/70 to-[#3B82F6]/70 min-w-[16px] max-w-[40px] sm:max-w-[100px] lg:max-w-[140px]"></div>

//           {/* Center Node: TraderCity Discord */}
//           {/* Scaled down to w-28/w-40 to ensure the Discord screenshot remains the primary focus of the section, while staying the main node */}
//           <div className="w-28 h-28 sm:w-40 sm:h-40 flex flex-col items-center justify-center rounded-full border border-[#3B82F6]/40 bg-[#0A0A0A]/90 backdrop-blur-lg shadow-[0_0_30px_rgba(59,130,246,0.15)] relative z-10 shrink-0">
//             <DiscordIcon className="w-6 h-6 sm:w-8 sm:h-8 text-[#3B82F6] mb-2" />
//             <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.15em] text-white uppercase text-center leading-tight">TraderCity<br/>Discord</span>
            
//             {/* The vertical line going down */}
//             {/* Increased width to 2px and brightened the gradient start color for stronger structural connection */}
//             <div className="absolute top-full left-1/2 -translate-x-1/2 w-[2px] h-16 sm:h-24 bg-gradient-to-b from-[#3B82F6]/80 to-[#3B82F6]/10"></div>
//           </div>

//           {/* Right Connector Line */}
//           {/* Increased thickness to 2px and opacity to 70%. Mirrored left connector spacing. */}
//           <div className="flex-1 h-[2px] bg-gradient-to-r from-[#3B82F6]/70 to-[#10B981]/70 min-w-[16px] max-w-[40px] sm:max-w-[100px] lg:max-w-[140px]"></div>

//           {/* Right Card: Traders */}
//           {/* Scaled down proportionally to match the Analysts card */}
//           <div className="flex flex-col items-center justify-center w-24 sm:w-32 py-3 sm:py-4 rounded-xl sm:rounded-2xl border border-[#10B981]/30 bg-[#111111]/80 backdrop-blur-md shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.05)]">
//             <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[#10B981] mb-2" />
//             <span className="text-[9px] sm:text-[10px] font-bold tracking-widest text-white uppercase">Traders</span>
//           </div>

//         </div>

//         {/* Vertical Spacing matching the height of the downward line */}
//         <div className="h-16 sm:h-24 w-full"></div>

//         {/* Bottom Card: Shared Intelligence */}
//         {/* Reduced width from w-72/w-96 to w-60/w-80 to maintain the 15-20% overall scale reduction */}
//         <div className="flex flex-col items-center justify-center w-60 sm:w-80 py-4 sm:py-6 rounded-2xl sm:rounded-[2rem] border border-white/10 bg-[#111111]/90 backdrop-blur-xl relative shadow-[0_0_20px_rgba(255,255,255,0.02)]">
//           <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
//             <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#3B82F6]" />
//             <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-white uppercase">Shared Intelligence</span>
//           </div>
//           <span className="text-[9px] sm:text-[10px] text-white/40 uppercase tracking-[0.1em] font-medium text-center mt-1">
//             Stronger Network.<br className="sm:hidden" /> Better Trades.
//           </span>
//         </div>

//       </motion.div>
      
//     </div>
//   );
// }



// Gemini 
// 'use client';

// import React from 'react';
// import { motion } from 'framer-motion';
// import { Share2, Users } from 'lucide-react';

// function DiscordIcon(props: React.SVGProps<SVGSVGElement>) {
//   return (
//     <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
//       <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
//     </svg>
//   );
// }

// export default function Section6Illustration() {
//   return (
//     // <div className="relative z-20 w-full flex flex-col items-center -mt-8 sm:-mt-12 lg:-mt-16 pb-24 md:pb-32 lg:pb-40 pointer-events-none">
      
//     <div className="relative z-20 w-full flex flex-col items-center mt-8 sm:mt-10 lg:mt-12 pb-24 md:pb-32 lg:pb-40 pointer-events-none">
//       {/* Container for the illustration */}
//       <motion.div 
//         // initial={{ opacity: 0, y: 30 }}
//         // whileInView={{ opacity: 1, y: 0 }}
//         // viewport={{ once: true, margin: "-100px" }}
//         // transition={{ duration: 0.8 }}
//         // className="w-full max-w-5xl mx-auto flex flex-col items-center px-4 sm:px-6 pointer-events-auto"
//         className="w-full max-w-4xl mx-auto flex flex-col items-center px-4 sm:px-6 pointer-events-auto"
//       >
        
//         {/* Top Row: Analysts - Discord - Traders */}
//         <div className="w-full flex items-center justify-center relative">
          
//           {/* Left Card: Analysts */}
//           <div className="flex flex-col items-center justify-center w-32 sm:w-40 py-4 sm:py-5 rounded-xl sm:rounded-2xl border border-[#A855F7]/30 bg-[#111111]/80 backdrop-blur-md shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.05)]">
//             <Users className="w-5 h-5 sm:w-6 sm:h-6 text-[#A855F7] mb-2 sm:mb-3" />
//             <span className="text-[10px] sm:text-xs font-bold tracking-widest text-white uppercase">Analysts</span>
//           </div>

//           {/* Left Connector Line */}
//           <div className="flex-1 h-px bg-gradient-to-r from-[#A855F7]/40 to-[#3B82F6]/40 max-w-[80px] sm:max-w-[140px] lg:max-w-[180px]"></div>

//           {/* Center Node: TraderCity Discord */}
//           <div className="w-40 h-40 sm:w-48 sm:h-48 flex flex-col items-center justify-center rounded-full border border-[#3B82F6]/40 bg-[#0A0A0A]/90 backdrop-blur-lg shadow-[0_0_40px_rgba(59,130,246,0.15)] relative z-10 shrink-0">
//             <DiscordIcon className="w-8 h-8 sm:w-10 sm:h-10 text-[#3B82F6] mb-3" />
//             <span className="text-[10px] sm:text-xs font-bold tracking-[0.15em] text-white uppercase text-center leading-tight">TraderCity<br/>Discord</span>
            
//             {/* The line going down */}
//             <div className="absolute top-full left-1/2 -translate-x-1/2 w-px h-20 sm:h-28 bg-gradient-to-b from-[#3B82F6]/50 to-white/10"></div>
//           </div>

//           {/* Right Connector Line */}
//           <div className="flex-1 h-px bg-gradient-to-r from-[#3B82F6]/40 to-[#10B981]/40 max-w-[80px] sm:max-w-[140px] lg:max-w-[180px]"></div>

//           {/* Right Card: Traders */}
//           <div className="flex flex-col items-center justify-center w-32 sm:w-40 py-4 sm:py-5 rounded-xl sm:rounded-2xl border border-[#10B981]/30 bg-[#111111]/80 backdrop-blur-md shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.05)]">
//             <Users className="w-5 h-5 sm:w-6 sm:h-6 text-[#10B981] mb-2 sm:mb-3" />
//             <span className="text-[10px] sm:text-xs font-bold tracking-widest text-white uppercase">Traders</span>
//           </div>

//         </div>

//         {/* Vertical Spacing for the downward line */}
//         <div className="h-20 sm:h-28 w-full"></div>

//         {/* Bottom Card: Shared Intelligence */}
//         <div className="flex flex-col items-center justify-center w-72 sm:w-96 py-5 sm:py-7 rounded-2xl sm:rounded-[2rem] border border-white/10 bg-[#111111]/90 backdrop-blur-xl relative shadow-[0_0_20px_rgba(255,255,255,0.02)]">
//           <div className="flex items-center gap-2 mb-2 sm:mb-3">
//             <Share2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#3B82F6]" />
//             <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-white uppercase">Shared Intelligence</span>
//           </div>
//           <span className="text-[10px] sm:text-xs text-white/40 uppercase tracking-[0.1em] font-medium text-center mt-1">
//             Stronger Network. Better Trades.
//           </span>
//         </div>

//       </motion.div>
      
//     </div>
//   );
// }




// export default function Section6Illustration() {
//   return (
//     <div
//       className="
//         relative
//         z-20
//         -mt-40
//         mx-auto
//         max-w-5xl
//       "
//     >
//       <div className="flex items-center justify-center gap-12">

//         <div>
//           ANALYSTS
//         </div>

//         <div>
//           DISCORD
//         </div>

//         <div>
//           TRADERS
//         </div>

//       </div>

//       <div className="mt-12 text-center">
//         SHARED INTELLIGENCE
//       </div>
//     </div>
//   );
// }