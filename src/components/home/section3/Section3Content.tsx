//Iteration 1 

import React from 'react';
import {
  IconBook,
  IconUsers,
  IconLock,
  IconRefresh,
  IconWallet,
  IconCurrencyDollar
} from '@tabler/icons-react';

const journeySteps = [
  {
    num: "01",
    icon: IconBook,
    title: "Scattered Knowledge",
    desc: (
      <>
        Tons of content, courses, and strategies.<br />
        You try to piece it together—still no clear edge.
      </>
    )
  },
  {
    num: "02",
    icon: IconUsers,
    title: "Join Random Groups",
    desc: (
      <>
        Dozens of groups, endless noise,<br />
        distractions and zero real context.
      </>
    )
  },
  {
    num: "03",
    icon: IconLock,
    title: "Private Groups & One Perspective",
    desc: (
      <>
        Most are either dead, inconsistent,<br />
        or worse—scams in disguise.
      </>
    )
  },
  {
    num: "04",
    icon: IconRefresh,
    title: "Move On & Start Over",
    desc: (
      <>
        You leave, search again, and hope<br />
        the next group is different.
      </>
    )
  },
  {
    num: "05",
    icon: IconWallet,
    title: "Pay Multiple Analysts",
    desc: (
      <>
        Multiple subscriptions, conflicting views,<br />
        no unified context—just more confusion.
      </>
    )
  },
  {
    num: "06",
    icon: IconCurrencyDollar,
    title: "Money Lost. Clarity Missing.",
    desc: (
      <>
        Time, money, and confidence drain away.<br />
        No central credibility. No real progress.
      </>
    )
  }
];

export default function Section3Content() {
  return (
    // <div className="max-w-[1300px] mx-auto w-full px-6 py-20 lg:py-32 relative z-10 flex flex-col font-sans">
      <div className="max-w-[1300px] mx-auto w-full px-6 py-20 lg:py-32 relative z-10 flex flex-col font-sans">

  {/* New Intro Headline */}
  <div className="flex flex-col items-center text-center mb-10 lg:mb-10">
    
    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
      EVERY TRADER STARTS HERE.
    </h2>

    <p className="mt-5 text-base md:text-lg lg:text-xl text-white/60 font-medium">
      The same ambition. The same mistakes.
    </p>

  </div>
      
      {/* =========================================
          AREA 1 & 2: TWO COLUMN LAYOUT
          ========================================= */}
      {/* <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 mb-8"> */}
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-14 mb-8">
        
        {/* AREA 1: LEFT COLUMN */}
        {/* <div className="flex-1 lg:max-w-md xl:max-w-lg flex flex-col pt-4"> */}
        <div className="flex-1 lg:max-w-[520px] xl:max-w-[580px] flex flex-col pt-4">

          
          {/* Eyebrow */}
          <div className="flex items-center gap-4 mb-10 opacity-80">
            <span className="text-[#A855F7] font-semibold text-sm">03</span>
            <div className="w-12 h-[1px] bg-[#A855F7]/30" />
            <span className="text-[#8F9BB3] uppercase text-[11px] font-semibold tracking-[0.2em]">
              The Trader's Reality
            </span>
          </div>

          {/* Large Heading */}
          <h2 className="text-[36px] md:text-5xl lg:text-[56px] font-bold text-white leading-[1.15] tracking-tight mb-10">
            The market <br />
            wasn't the hard part.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C084FC] to-[#A855F7]">
              Finding clarity was.
            </span>
          </h2>

          {/* Supporting Copy */}
          <div className="text-[#8F9BB3] text-[15px] leading-[1.8] space-y-6">
            <p>
              Every trader starts with the same goal:<br />
              learn, improve, and become consistently profitable.
            </p>
            <p>
              But the journey is filled with noise,<br />
              dead ends, and costly mistakes.<br />
              Most traders don't lack effort.
            </p>
            {/* <p className="text-[#A855F7]/90 font-medium">
              They lack a place where it all comes together.
            </p> */}
            <p className="text-[#A855F7]/95 font-semibold uppercase tracking-[0.08em] leading-[1.8]">
             MOST TRADERS DON'T FAIL FROM LACK OF EFFORT.
            <br />
             THEY FAIL FROM LACK OF CONTEXT.
            </p>
          </div>
        </div>

        {/* Vertical Divider (Desktop only) */}
        <div className="hidden lg:block w-px bg-white/5" />

        {/* AREA 2: JOURNEY COLUMN */}
        <div className="flex-1 lg:max-w-[600px] xl:max-w-2xl">
          <div className="flex flex-col">
            {journeySteps.map((step, index) => (
              <div 
                key={step.num} 
                className={`flex flex-col sm:flex-row sm:items-start lg:items-center py-7 gap-4 lg:gap-8 ${
                  index !== journeySteps.length - 1 ? 'border-b border-white/5' : ''
                }`}
              >
                {/* Left Part (Number, Dot, Icon, Title) */}
                <div className="flex items-center gap-4 sm:w-[45%] shrink-0">
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 text-[13px] font-medium shrink-0">
                    {step.num}
                  </div>
                  <div className="w-1 h-1 rounded-full bg-[#F59E0B]/70 shrink-0" />
                  <step.icon className="w-5 h-5 text-[#A855F7]/80 shrink-0" stroke={1.5} />
                  <h4 className="text-white/90 font-medium text-[15px]">{step.title}</h4>
                </div>
                
                {/* Right Part (Description) */}
                <div className="sm:w-[55%] text-[#8F9BB3] text-[13px] leading-[1.6]">
                  {step.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* =========================================
          AREA 3: CONCLUSION
          ========================================= */}
      <div className="flex flex-col items-center text-center w-full">
        
        {/* Horizontal Line with X icon */}
        <div className="flex items-center justify-center w-full max-w-2xl mb-4 opacity-60">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/10" />
          <div className="mx-4 w-9 h-9 rounded-full border border-white/10 flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8F9BB3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/10" />
        </div>

        {/* Large Typography */}
        <h3 className="text-[28px] sm:text-4xl md:text-5xl lg:text-[56px] font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] leading-tight flex flex-col items-center">
          <span className="text-white/90 mb-2 pl-[0.3em] md:pl-[0.4em]">
            FRAGMENTED
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F59E0B] to-[#F97316] pl-[0.3em] md:pl-[0.4em] opacity-90">
            INTELLIGENCE.
          </span>
        </h3>

        {/* Subtext */}
        <p className="text-[#8F9BB3] text-[10px] sm:text-xs font-medium tracking-[0.2em] md:tracking-[0.3em] uppercase mt-8 pl-[0.2em] md:pl-[0.3em]">
          Information everywhere. Confidence nowhere.
        </p>

      </div>

    </div>
  );
}



// Gemini First created 


// import React from 'react';
// import {
//   IconBook,
//   IconUsers,
//   IconLock,
//   IconRefresh,
//   IconWallet,
//   IconCurrencyDollar
// } from '@tabler/icons-react';

// const journeySteps = [
//   {
//     num: "01",
//     icon: IconBook,
//     title: "Scattered Knowledge",
//     desc: (
//       <>
//         Tons of content, courses, and strategies.<br />
//         You try to piece it together—still no clear edge.
//       </>
//     )
//   },
//   {
//     num: "02",
//     icon: IconUsers,
//     title: "Join Random Groups",
//     desc: (
//       <>
//         Dozens of groups, endless noise,<br />
//         distractions and zero real context.
//       </>
//     )
//   },
//   {
//     num: "03",
//     icon: IconLock,
//     title: "Private Groups & One Perspective",
//     desc: (
//       <>
//         Most are either dead, inconsistent,<br />
//         or worse—scams in disguise.
//       </>
//     )
//   },
//   {
//     num: "04",
//     icon: IconRefresh,
//     title: "Move On & Start Over",
//     desc: (
//       <>
//         You leave, search again, and hope<br />
//         the next group is different.
//       </>
//     )
//   },
//   {
//     num: "05",
//     icon: IconWallet,
//     title: "Pay Multiple Analysts",
//     desc: (
//       <>
//         Multiple subscriptions, conflicting views,<br />
//         no unified context—just more confusion.
//       </>
//     )
//   },
//   {
//     num: "06",
//     icon: IconCurrencyDollar,
//     title: "Money Lost. Clarity Missing.",
//     desc: (
//       <>
//         Time, money, and confidence drain away.<br />
//         No central credibility. No real progress.
//       </>
//     )
//   }
// ];

// export default function Section3Content() {
//   return (
//     <div className="max-w-[1300px] mx-auto w-full px-6 py-20 lg:py-32 relative z-10 flex flex-col font-sans">
      
//       {/* =========================================
//           AREA 1 & 2: TWO COLUMN LAYOUT
//           ========================================= */}
//       <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 mb-32">
        
//         {/* AREA 1: LEFT COLUMN */}
//         <div className="flex-1 lg:max-w-md xl:max-w-lg flex flex-col pt-4">
          
//           {/* Eyebrow */}
//           <div className="flex items-center gap-4 mb-10">
//             <span className="text-[#9B5DE5] font-semibold text-sm">03</span>
//             <div className="w-12 h-[1px] bg-[#9B5DE5]/40" />
//             <span className="text-[#8F9BB3] uppercase text-[11px] font-semibold tracking-[0.2em]">
//               The Trader's Reality
//             </span>
//           </div>

//           {/* Large Heading */}
//           <h2 className="text-[36px] md:text-5xl lg:text-[56px] font-bold text-white leading-[1.15] tracking-tight mb-10">
//             The market <br />
//             wasn't the hard part.<br />
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9B5DE5] to-[#06D6F7]">
//               Finding clarity was.
//             </span>
//           </h2>

//           {/* Supporting Copy */}
//           <div className="text-[#8F9BB3] text-[15px] leading-[1.8] space-y-6">
//             <p>
//               Every trader starts with the same goal:<br />
//               learn, improve, and become consistently profitable.
//             </p>
//             <p>
//               But the journey is filled with noise,<br />
//               dead ends, and costly mistakes.<br />
//               Most traders don't lack effort.
//             </p>
//             <p className="text-[#9B5DE5] font-medium">
//               They lack a place where it all comes together.
//             </p>
//           </div>
//         </div>

//         {/* Vertical Divider (Desktop only) */}
//         <div className="hidden lg:block w-px bg-white/5" />

//         {/* AREA 2: JOURNEY COLUMN */}
//         <div className="flex-1 lg:max-w-[600px] xl:max-w-2xl">
//           <div className="flex flex-col">
//             {journeySteps.map((step, index) => (
//               <div 
//                 key={step.num} 
//                 className={`flex flex-col sm:flex-row sm:items-start lg:items-center py-7 gap-4 lg:gap-8 ${
//                   index !== journeySteps.length - 1 ? 'border-b border-white/5' : ''
//                 }`}
//               >
//                 {/* Left Part (Number, Dot, Icon, Title) */}
//                 <div className="flex items-center gap-4 sm:w-[45%] shrink-0">
//                   <div className="w-10 h-10 rounded-full border border-[#9B5DE5]/30 flex items-center justify-center text-white text-[13px] font-medium shrink-0">
//                     {step.num}
//                   </div>
//                   <div className="w-1 h-1 rounded-full bg-[#06D6F7] shrink-0" />
//                   <step.icon className="w-5 h-5 text-white shrink-0" stroke={1.5} />
//                   <h4 className="text-white font-medium text-[15px]">{step.title}</h4>
//                 </div>
                
//                 {/* Right Part (Description) */}
//                 <div className="sm:w-[55%] text-[#8F9BB3] text-[13px] leading-[1.6]">
//                   {step.desc}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* =========================================
//           AREA 3: CONCLUSION
//           ========================================= */}
//       <div className="flex flex-col items-center text-center w-full mt-10">
        
//         {/* Horizontal Line with X icon */}
//         <div className="flex items-center justify-center w-full max-w-2xl mb-12 opacity-80">
//           <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#9B5DE5]/30" />
//           <div className="mx-4 w-9 h-9 rounded-full border border-[#9B5DE5]/30 flex items-center justify-center">
//             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9B5DE5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
//               <line x1="18" y1="6" x2="6" y2="18"></line>
//               <line x1="6" y1="6" x2="18" y2="18"></line>
//             </svg>
//           </div>
//           <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#9B5DE5]/30" />
//         </div>

//         {/* Large Typography */}
//         <h3 className="text-[28px] sm:text-4xl md:text-5xl lg:text-[56px] font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] leading-tight flex flex-col items-center">
//           <span className="text-white mb-2 pl-[0.3em] md:pl-[0.4em]">
//             FRAGMENTED
//           </span>
//           <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9B5DE5] to-[#06D6F7] pl-[0.3em] md:pl-[0.4em]">
//             INTELLIGENCE.
//           </span>
//         </h3>

//         {/* Subtext */}
//         <p className="text-[#8F9BB3] text-[10px] sm:text-xs font-semibold tracking-[0.2em] md:tracking-[0.3em] uppercase mt-8 pl-[0.2em] md:pl-[0.3em]">
//           Too many places. Too many voices. No real clarity.
//         </p>

//       </div>

//     </div>
//   );
// }
