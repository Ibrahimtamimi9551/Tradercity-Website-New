
// test

// export default function Section6Discord() {
//   return (
//     <div className="text-red-500 text-6xl">
//       SECTION 6 TEST
//     </div>
//   );
// }

//Antigravity Iteration 2 

'use client';

import React from 'react';
import { motion } from 'framer-motion';

function UsersIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export default function Section6Discord() {
  return (
    <div className="relative z-10 w-full flex flex-col items-center pt-20 lg:pt-28">
      
      {/* Header Section */}
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-16 mb-16 lg:mb-24 flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-16">
        <div 
        //   initial={{ opacity: 0, y: 20 }}
        //   whileInView={{ opacity: 1, y: 0 }}
        //   viewport={{ once: true }}
        //   transition={{ duration: 0.6 }}
          className="w-full lg:max-w-3xl"
        >
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[#3B82F6] font-semibold tracking-[0.3em] text-sm">06</span>
            <div className="h-px w-16 bg-[#3B82F6]"></div>
            <span className="text-[#3B82F6] font-semibold tracking-[0.2em] text-sm uppercase">Community</span>
          </div>
          
          {/* <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1]"> */}
           <h2 className="text-[20px] sm:text-[30px] lg:text-[48px] font-bold text-white tracking-tight leading-[1.1]">
            One Community.<br />
            Real Traders.<br />
            {/* <span className="text-[#3B82F6]">Real Connections.</span> */}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#06B6D4]">
            Real Connections.
            </span>
          </h2>
        </div>

        <div 
        //   initial={{ opacity: 0, y: 20 }}
        //   whileInView={{ opacity: 1, y: 0 }}
        //   viewport={{ once: true }}
        //   transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-start lg:justify-end gap-6 lg:gap-8 lg:mt-8 w-full lg:w-auto"
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-[#3B82F6]/30 flex items-center justify-center shrink-0">
            <UsersIcon className="w-8 h-8 sm:w-10 sm:h-10 text-[#3B82F6]" />
          </div>
          <div className="text-white/80 text-xl lg:text-2xl leading-relaxed">
            <p>Different traders.</p>
            <p>Different analysts.</p>
            <p className="text-[#3B82F6] mt-2 font-medium">One place where ideas<br className="hidden sm:block" />converge and everyone grows.</p>
          </div>
        </div>
      </div>

      {/* Discord Screenshot with Bottom Fade */}
      <div 
        // initial={{ opacity: 0, y: 40 }}
        // whileInView={{ opacity: 1, y: 0 }}
        // viewport={{ once: true }}
        // transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16 relative"
      >
        <div 
          className="w-full rounded-2xl sm:rounded-[2rem] border border-white/5 overflow-hidden relative"
        //   style={{
        //     WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 75%, transparent 100%)',
        //     maskImage: 'linear-gradient(to bottom, black 0%, black 75%, transparent 100%)'
        //   }}
 style={{
  WebkitMaskImage: `
    linear-gradient(
      to bottom,
      black 0%,
      black 35%,
      rgba(0,0,0,0.95) 50%,
      rgba(0,0,0,0.8) 65%,
      rgba(0,0,0,0.55) 78%,
      rgba(0,0,0,0.25) 90%,
      transparent 100%
    )
  `,
  maskImage: `
    linear-gradient(
      to bottom,
      black 0%,
      black 35%,
      rgba(0,0,0,0.95) 50%,
      rgba(0,0,0,0.8) 65%,
      rgba(0,0,0,0.55) 78%,
      rgba(0,0,0,0.25) 90%,
      transparent 100%
    )
  `
}}
        >
          <img
   src="/images/Community/Discord.png"
   alt="TraderCity Discord Community"
   className="w-full h-auto object-cover block"
 />  
       </div>
      </div>

    </div>
  );
}




//Antigravity created version 

// 'use client';

// import React from 'react';
// import { motion } from 'framer-motion';

// export default function Section6Discord() {
//   return (
//     <div className="relative z-10 w-full flex flex-col items-center pt-24 md:pt-32 lg:pt-40">
      
//       {/* Header Section */}
//       <motion.div 
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.6 }}
//         className="w-full max-w-4xl mx-auto px-6 text-center mb-16 lg:mb-24"
//       >
//         <div className="mb-6 lg:mb-8">
//           <span className="text-[#3B82F6] font-semibold tracking-[0.3em] text-sm uppercase">Community</span>
//         </div>
        
//         <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 lg:mb-8 tracking-tight leading-[1.1]">
//           One Community.<br />
//           Real Traders. <span className="text-[#3B82F6]">Real Connections.</span>
//         </h2>
        
//         <p className="text-white/60 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto font-medium">
//           Join hundreds of traders and analysts inside our Discord community to share ideas, learn, and grow together.
//         </p>
//       </motion.div>

//       {/* Discord Screenshot with Bottom Fade */}
//       <motion.div 
//         initial={{ opacity: 0, y: 40 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.8, delay: 0.2 }}
//         className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16 relative"
//       >
//         <div 
//           className="w-full rounded-2xl sm:rounded-[2rem] border border-white/5 overflow-hidden relative"
//           style={{
//             WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 75%, transparent 100%)',
//             maskImage: 'linear-gradient(to bottom, black 0%, black 75%, transparent 100%)'
//           }}
//         >
//           {/* <img 
//             src="/community/discord-preview.webp" 
//             alt="TraderCity Discord Community" 
//             className="w-full h-auto object-cover block"
//           /> */}
//         <img
//   src="/images/Community/Discord.png"
//   alt="TraderCity Discord Community"
//   className="w-full h-auto object-cover block"
// />  

//         </div>
//       </motion.div>

//     </div>
//   );
// }





// export default function Section6Discord() {
//   return (
//     <div className="relative mx-auto max-w-7xl px-6 pt-32">

//       {/* Headline */}
//       <div className="mt-16 h-[700px] rounded-3xl border border-white/10 bg-white/[0.02]" />
//       <div className="text-center">
//         <p className="mb-4 text-sm tracking-[0.3em] text-blue-400">
//           COMMUNITY
//         </p>

//         <h2 className="text-6xl font-semibold">
//           One Community.
//           <br />
//           Real Traders.
//           <span className="text-blue-400">
//             {" "}
//             Real Connections.
//           </span>
//         </h2>
//       </div>
    

//       {/* Discord Screenshot */}

//       <div className="relative mt-20">
//         <img
//           src="/community/discord-preview.webp"
//           alt=""
//           className="w-full"
//         />

//         {/* Natural Fade */}

//         <div
//           className="
//             absolute
//             bottom-0
//             left-0
//             right-0
//             h-[35%]
//             bg-gradient-to-b
//             from-transparent
//             via-[#050816]/40
//             to-[#050816]
//           "
//         />
//       </div>
//     </div>
//   );
// }