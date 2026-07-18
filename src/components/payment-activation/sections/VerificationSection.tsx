// ITERTION 2 

import React from 'react';

export default function VerificationSection() {
  /*
    TODO: Future Backend Integration States (capabilities — backend owns implementation)
    - paymentSubmitted
    - verificationStatus → PaymentVerificationOutcome (src/lib/membership/verification/)
    - membershipStatus
    - discordStatus
    - supportVisible
    - transactionHash
    - expectedPayableUsd from Payment Quote (never assume plan list price; never live-recalculate)
    - Compare quote.expectedAmountUsd vs payment received (verification capability)
  */
  
  // Product outcomes: pending | verifying | successful | underpaid | overpaid |
  //   expired | failed | cancelled | refund_required
  // UI currently renders PENDING only. Backend will drive outcome. 

  return (
    <div className="bg-[#10141D] border border-white/5 rounded-3xl p-6 md:p-10 shadow-2xl relative w-full mb-6 overflow-hidden">
      
      {/* Background ambient glow matching the style - Reduced intensity */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* --- LAYER 1: HEADER AREA --- */}
      <div className="flex flex-col md:flex-row md:items-start justify-between mb-10 pb-6 border-b border-white/5 gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3 mb-1">
            <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[10px] font-bold uppercase tracking-widest py-1 px-2.5 rounded-lg">
              STEP 2
            </span>
            <h3 className="text-white font-bold text-xl md:text-2xl tracking-tight">Verification Status</h3>
          </div>
          <p className="text-gray-400 text-sm">
            We are verifying your payment.<br className="hidden sm:block" />
            This usually takes a few minutes.
          </p>
          
          {/* TODO: Future Backend Integration - Replace hardcoded hash with actual state */}
          <div className="mt-2 flex items-center gap-2">
            <span className="text-gray-600 text-[10px] font-bold uppercase tracking-widest">TX</span>
            <span className="text-gray-400 text-xs font-mono bg-[#0A0D14] px-2.5 py-1 rounded-md border border-white/5">
              0x4A3D...8B9C
            </span>
          </div>
        </div>
        
        <div className="shrink-0">
          <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-bold uppercase tracking-widest py-2 px-4 rounded-full flex items-center gap-2 shadow-[0_0_15px_rgba(59,130,246,0.15)] w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
            PENDING
          </span>
        </div>
      </div>

      {/* --- LAYER 2: MAIN CONTENT AREA --- */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-8 md:gap-12 mb-8">
        
        {/* LEFT COLUMN: Visual Anchor */}
        <div className="flex flex-col items-center justify-center py-6 md:py-10">
          {/* Glowing Icon Container - Reduced purple intensity */}
          <div className="relative w-32 h-32 flex items-center justify-center mb-6">
            {/* Outer spinning/dashed ring (simulating progress) */}
            <div className="absolute inset-0 rounded-full border border-dashed border-purple-500/20 animate-[spin_12s_linear_infinite]"></div>
            
            {/* Inner glowing circle */}
            <div className="absolute inset-2 bg-purple-500/5 rounded-full border border-purple-500/10 shadow-[0_0_20px_rgba(168,85,247,0.1)]"></div>
            
            {/* Icon (Shield Check for Verification) */}
            <div className="relative z-10 text-purple-400">
              <svg className="w-10 h-10 drop-shadow-[0_0_8px_rgba(168,85,247,0.3)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
          </div>
          
          {/* Removed text drop-shadow to reduce neon feel */}
          <h4 className="text-purple-400 font-bold text-lg mb-2 text-center">
            Verification In Progress
          </h4>
          <p className="text-gray-400 text-sm text-center max-w-[200px]">
            Please wait while we confirm your payment.
          </p>
        </div>

        {/* RIGHT COLUMN: Timeline Card with improved depth */}
        <div className="bg-gradient-to-br from-[#0D1017] to-[#0A0D14] rounded-2xl p-6 md:p-8 border border-white/10 relative shadow-lg shadow-black/40 ring-1 ring-white/5 inset-0">
          <h4 className="text-white font-bold text-base mb-6">Latest Updates</h4>
          
          <div className="flex flex-col relative">
            {/* Continuous vertical line for the timeline */}
            <div className="absolute left-2.5 top-3 bottom-8 w-[1px] bg-white/5"></div>
            
            {/* Timeline Item 1: Completed / Current */}
            <div className="relative flex gap-5 pb-8 group">
              {/* Dot */}
              <div className="relative z-10 w-5 h-5 mt-1 rounded-full bg-[#0A0D14] border border-purple-500/80 flex items-center justify-center shadow-[0_0_8px_rgba(168,85,247,0.2)] shrink-0">
                <div className="w-2.5 h-2.5 rounded-full bg-purple-400"></div>
              </div>
              
              <div className="flex-1 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-4">
                <div>
                  <h5 className="text-white font-medium text-sm mb-1">Transaction Submitted</h5>
                  <p className="text-gray-400 text-xs">We've received your submission.</p>
                </div>
                <span className="text-gray-400 text-xs shrink-0 font-medium">Just now</span>
              </div>
            </div>

            {/* Timeline Item 2: Future / Inactive */}
            <div className="relative flex gap-5 pb-8 group">
              {/* Dot */}
              <div className="relative z-10 w-5 h-5 mt-1 rounded-full bg-[#0A0D14] border border-gray-700 flex items-center justify-center shrink-0">
              </div>
              
              <div className="flex-1 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-4 opacity-50">
                <div>
                  <h5 className="text-white font-medium text-sm mb-1">Transaction Detected</h5>
                  <p className="text-gray-500 text-xs">Waiting for blockchain confirmation.</p>
                </div>
                <span className="text-gray-600 text-xs shrink-0 font-medium">--</span>
              </div>
            </div>

            {/* Timeline Item 3: Future / Inactive (Last Item) */}
            <div className="relative flex gap-5 group">
              {/* Dot */}
              <div className="relative z-10 w-5 h-5 mt-1 rounded-full bg-[#0A0D14] border border-gray-700 flex items-center justify-center shrink-0">
              </div>
              
              <div className="flex-1 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-4 opacity-50">
                <div>
                  <h5 className="text-white font-medium text-sm mb-1">Awaiting Verification</h5>
                  <p className="text-gray-500 text-xs">Our team is verifying your payment.</p>
                </div>
                <span className="text-gray-600 text-xs shrink-0 font-medium">--</span>
              </div>
            </div>
            
          </div>
        </div>
      </div>

      {/* --- LAYER 3: INFORMATION BAR --- */}
      <div className="bg-[#0A0D14] rounded-xl p-4 border border-white/5 flex flex-col sm:flex-row items-center justify-center gap-3 text-center sm:text-left transition-colors hover:border-white/10">
        <svg className="w-4 h-4 text-gray-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-gray-400 text-xs sm:text-sm">
          We'll automatically update this page as verification progresses.
        </span>
      </div>

    </div>
  );
}




// iteration 1

// import React from 'react';

// export default function VerificationSection() {
//   /*
//     TODO: Future Backend Integration States
//     - paymentSubmitted
//     - verificationStatus
//     - membershipStatus
//     - discordStatus
//     - supportVisible
//   */
  
//   // Future state control: PENDING | PROCESSING | VERIFIED | FAILED
//   // Currently only rendering the 'PENDING' state as instructed.
//   // const verificationStatus = "PENDING"; 

//   return (
//     <div className="bg-[#10141D] border border-white/5 rounded-3xl p-6 md:p-10 shadow-2xl relative w-full mb-6 overflow-hidden">
      
//       {/* Background ambient glow matching the style */}
//       <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] pointer-events-none"></div>

//       {/* --- LAYER 1: HEADER AREA --- */}
//       <div className="flex flex-col md:flex-row md:items-start justify-between mb-10 pb-6 border-b border-white/5 gap-6">
//         <div className="flex flex-col gap-2">
//           <div className="flex items-center gap-3 mb-1">
//             <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[10px] font-bold uppercase tracking-widest py-1 px-2.5 rounded-lg">
//               STEP 2
//             </span>
//             <h3 className="text-white font-bold text-xl md:text-2xl tracking-tight">Verification Status</h3>
//           </div>
//           <p className="text-gray-400 text-sm">
//             We are verifying your payment.<br className="hidden sm:block" />
//             This usually takes a few minutes.
//           </p>
//         </div>
        
//         <div className="shrink-0">
//           <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-bold uppercase tracking-widest py-2 px-4 rounded-full flex items-center gap-2 shadow-[0_0_15px_rgba(59,130,246,0.15)] w-fit">
//             <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
//             PENDING
//           </span>
//         </div>
//       </div>

//       {/* --- LAYER 2: MAIN CONTENT AREA --- */}
//       <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-8 md:gap-12 mb-8">
        
//         {/* LEFT COLUMN: Visual Anchor */}
//         <div className="flex flex-col items-center justify-center py-6 md:py-10">
//           {/* Glowing Icon Container */}
//           <div className="relative w-32 h-32 flex items-center justify-center mb-6">
//             {/* Outer spinning/dashed ring (simulating progress) */}
//             <div className="absolute inset-0 rounded-full border border-dashed border-purple-500/40 animate-[spin_10s_linear_infinite]"></div>
            
//             {/* Inner glowing circle */}
//             <div className="absolute inset-2 bg-purple-500/10 rounded-full border border-purple-500/20 shadow-[0_0_40px_rgba(168,85,247,0.2)]"></div>
            
//             {/* Icon (Calendar/Verification placeholder) */}
//             <div className="relative z-10 text-purple-400">
//               <svg className="w-10 h-10 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//               </svg>
//             </div>
//           </div>
          
//           <h4 className="text-purple-400 font-bold text-lg mb-2 shadow-purple-500/20 drop-shadow-md text-center">
//             Verification In Progress
//           </h4>
//           <p className="text-gray-400 text-sm text-center max-w-[200px]">
//             Please wait while we confirm your payment.
//           </p>
//         </div>

//         {/* RIGHT COLUMN: Timeline Card */}
//         <div className="bg-[#0A0D14] rounded-2xl p-6 md:p-8 border border-white/5 relative">
//           <h4 className="text-white font-bold text-base mb-6">Latest Updates</h4>
          
//           <div className="flex flex-col relative">
//             {/* Continuous vertical line for the timeline */}
//             <div className="absolute left-2.5 top-3 bottom-8 w-[1px] bg-white/5"></div>
            
//             {/* Timeline Item 1: Completed / Current */}
//             <div className="relative flex gap-5 pb-8 group">
//               {/* Dot */}
//               <div className="relative z-10 w-5 h-5 mt-1 rounded-full bg-[#0A0D14] border border-purple-500 flex items-center justify-center shadow-[0_0_10px_rgba(168,85,247,0.3)] shrink-0">
//                 <div className="w-2.5 h-2.5 rounded-full bg-purple-500"></div>
//               </div>
              
//               <div className="flex-1 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-4">
//                 <div>
//                   <h5 className="text-white font-medium text-sm mb-1">Transaction Submitted</h5>
//                   <p className="text-gray-400 text-xs">We've received your submission.</p>
//                 </div>
//                 <span className="text-gray-400 text-xs shrink-0 font-medium">Just now</span>
//               </div>
//             </div>

//             {/* Timeline Item 2: Future / Inactive */}
//             <div className="relative flex gap-5 pb-8 group">
//               {/* Dot */}
//               <div className="relative z-10 w-5 h-5 mt-1 rounded-full bg-[#0A0D14] border border-gray-700 flex items-center justify-center shrink-0">
//               </div>
              
//               <div className="flex-1 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-4 opacity-50">
//                 <div>
//                   <h5 className="text-white font-medium text-sm mb-1">Transaction Detected</h5>
//                   <p className="text-gray-500 text-xs">Waiting for blockchain confirmation.</p>
//                 </div>
//                 <span className="text-gray-600 text-xs shrink-0 font-medium">--</span>
//               </div>
//             </div>

//             {/* Timeline Item 3: Future / Inactive (Last Item) */}
//             <div className="relative flex gap-5 group">
//               {/* Dot */}
//               <div className="relative z-10 w-5 h-5 mt-1 rounded-full bg-[#0A0D14] border border-gray-700 flex items-center justify-center shrink-0">
//               </div>
              
//               <div className="flex-1 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-4 opacity-50">
//                 <div>
//                   <h5 className="text-white font-medium text-sm mb-1">Awaiting Verification</h5>
//                   <p className="text-gray-500 text-xs">Our team is verifying your payment.</p>
//                 </div>
//                 <span className="text-gray-600 text-xs shrink-0 font-medium">--</span>
//               </div>
//             </div>
            
//           </div>
//         </div>
//       </div>

//       {/* --- LAYER 3: INFORMATION BAR --- */}
//       <div className="bg-[#0A0D14] rounded-xl p-4 border border-white/5 flex flex-col sm:flex-row items-center justify-center gap-3 text-center sm:text-left transition-colors hover:border-white/10">
//         <svg className="w-4 h-4 text-gray-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//         </svg>
//         <span className="text-gray-400 text-xs sm:text-sm">
//           Don't worry, you'll be notified here once verification is complete.
//         </span>
//       </div>

//     </div>
//   );
// }




// import React from 'react';

// export default function VerificationSection() {
//   /*
//     TODO: Future Backend Integration States
//     - paymentSubmitted
//     - verificationStatus
//     - membershipStatus
//     - discordStatus
//     - supportVisible
//   */
  
//   const verificationStatus = "active"; // Toggle to 'active' to preview future state

//   if (verificationStatus === "active") {
//     return (
//       <div className="bg-[#10141D] border border-white/5 rounded-3xl p-6 w-full mb-4 shadow-xl">
//         <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
//           <h3 className="text-white font-bold text-lg">Verification In Progress</h3>
//           <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-bold uppercase tracking-widest py-1.5 px-3 rounded-full">Pending</span>
//         </div>
        
//         <div className="text-gray-500 text-[10px] font-bold tracking-widest mb-4">LATEST UPDATES</div>
//         <div className="flex flex-col gap-4">
//           <div className="flex items-center gap-4">
//             <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
//             <span className="text-gray-300 text-sm">Transaction Submitted</span>
//           </div>
//           <div className="flex items-center gap-4">
//             <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
//             <span className="text-white font-medium text-sm">Transaction Detected</span>
//           </div>
//           <div className="flex items-center gap-4">
//             <div className="w-2 h-2 rounded-full bg-gray-700"></div>
//             <span className="text-gray-500 text-sm">Awaiting Verification</span>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Minimal Dormant State
//   return (
//     <div className="bg-[#10141D]/40 border border-white/5 rounded-2xl p-5 w-full mb-4 flex items-center justify-between opacity-70">
//       <div>
//         <h3 className="text-white font-medium text-sm mb-1">Verification Status</h3>
//         <p className="text-gray-500 text-xs">Verification will begin after payment submission.</p>
//       </div>
//       <div className="bg-[#0A0D14] border border-white/5 text-gray-500 text-[10px] font-bold uppercase tracking-widest py-1.5 px-3 rounded-full">
//         Waiting
//       </div>
//     </div>
//   );
// }
