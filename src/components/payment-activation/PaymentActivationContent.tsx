//Decomposition into smaller sections

"use client";

import React from 'react';
import PaymentSection from './sections/PaymentSection';
import VerificationSection from './sections/VerificationSection';
import ResultSection from './sections/ResultSection';

export default function PaymentActivationContent() {
  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto px-4 lg:px-8 pb-24">
      <HeroSection />
      <JourneySection />
      <PaymentSection />
      <VerificationSection />
      <ResultSection />
    </div>
  );
}

function HeroSection() {
  return (
    <div className="flex flex-col items-center text-center w-full mt-12 mb-16">
      <div className="text-blue-500 text-[15px] font-bold tracking-widest uppercase mb-6">
        ACTIVATE VIP ACCESS
      </div>
      <h1 className="text-4xl md:text-3xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-white mb-4">
        Complete your payment to unlock<br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-amber-200">
          exclusive VIP access.
        </span>
      </h1>
      <p className="text-gray-400 text-sm md:text-base max-w-md">
        One final step to join the TraderCity VIP community.
      </p>
    </div>
  );
}

function JourneySection() {
  return (
    <div className="flex items-center justify-between w-full max-w-2xl mx-auto mb-12 relative">
      {/* Background connecting lines */}
      <div className="absolute top-5 left-[16%] right-[16%] h-[1px] flex z-0">
        <div className="w-1/2 h-full bg-gradient-to-r from-purple-500/50 to-gray-800"></div>
        <div className="w-1/2 h-full bg-gray-800 border-t border-dashed border-gray-700"></div>
      </div>
      
      {/* Step 1 */}
      <div className="flex flex-col items-center flex-1 relative z-10">
        <div className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(168,85,247,0.3)] bg-[#0A0D14]">
          <span className="text-purple-400 font-bold text-sm">1</span>
        </div>
        <span className="text-white text-[10px] font-bold tracking-widest text-center uppercase">Payment<br/>Information</span>
      </div>
      
      {/* Step 2 */}
      <div className="flex flex-col items-center flex-1 relative z-10 opacity-40">
        <div className="w-10 h-10 rounded-full bg-[#0A0D14] border border-gray-700 flex items-center justify-center mb-4">
          <span className="text-gray-500 font-bold text-sm">2</span>
        </div>
        <span className="text-gray-400 text-[10px] font-bold tracking-widest text-center uppercase">Verification<br/>Status</span>
      </div>
      
      {/* Step 3 */}
      <div className="flex flex-col items-center flex-1 relative z-10 opacity-40">
        <div className="w-10 h-10 rounded-full bg-[#0A0D14] border border-gray-700 flex items-center justify-center mb-4">
          <span className="text-gray-500 font-bold text-sm">3</span>
        </div>
        <span className="text-gray-400 text-[10px] font-bold tracking-widest text-center uppercase">VIP<br/>Access</span>
      </div>
    </div>
  );
}



// "use client";

// import React, { useState } from 'react';

// // --- CONFIGURATION & DATA OBJECTS ---
// const membershipData = {
//   plan: "VIP Monthly",
//   price: "$60",
//   network: "BNB Smart Chain (BEP20)",
//   currency: "USDT",
//   walletAddress: "0xA43D...7aB8c9DaE7F8a9B0c3D5e6F7a889c",
//   fullWalletAddress: "0xA43D7aB8c9DaE7F8a9B0c3D5e6F7a889c"
// };

// // --- FUTURE STATE PREPARATION ---
// /*
//   TODO: Backend Integration States
//   const [paymentSubmitted, setPaymentSubmitted] = useState(false);
//   const [verificationStatus, setVerificationStatus] = useState<'dormant' | 'active'>('dormant');
//   const [membershipStatus, setMembershipStatus] = useState<'dormant' | 'active' | 'issue'>('dormant');
//   const [discordStatus, setDiscordStatus] = useState<'unlinked' | 'linked'>('unlinked');
//   const [supportVisible, setSupportVisible] = useState(false);
// */

// export default function PaymentActivationContent() {
//   return (
//     <div className="flex flex-col w-full max-w-4xl mx-auto px-4 lg:px-8 pb-24">
//       <HeroSection />
//       <JourneySection />
//       <PaymentSection />
//       <VerificationSection />
//       <ResultSection />
//       <NeedHelpSection />
//     </div>
//   );
// }

// // ---------------------------
// // INTERNAL COMPONENTS
// // ---------------------------

// function HeroSection() {
//   return (
//     <div className="flex flex-col items-center text-center w-full mt-12 mb-16">
//       <div className="text-blue-500 text-[10px] font-bold tracking-widest uppercase mb-6">
//         ACTIVATE VIP ACCESS
//       </div>
//       <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-white mb-6">
//         Complete your payment to unlock<br />
//         <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-amber-200">
//           exclusive VIP access.
//         </span>
//       </h1>
//       <p className="text-gray-400 text-sm md:text-base max-w-md">
//         One final step to join the TraderCity VIP community.
//       </p>
//     </div>
//   );
// }

// function JourneySection() {
//   return (
//     <div className="flex items-center justify-between w-full max-w-2xl mx-auto mb-16 relative">
//       {/* Background connecting lines */}
//       <div className="absolute top-5 left-[16%] right-[16%] h-[1px] flex z-0">
//         <div className="w-1/2 h-full bg-gradient-to-r from-purple-500/50 to-gray-800"></div>
//         <div className="w-1/2 h-full bg-gray-800 border-t border-dashed border-gray-700"></div>
//       </div>
      
//       {/* Step 1 */}
//       <div className="flex flex-col items-center flex-1 relative z-10">
//         <div className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(168,85,247,0.3)] bg-[#0A0D14]">
//           <span className="text-purple-400 font-bold text-sm">1</span>
//         </div>
//         <span className="text-white text-[10px] font-bold tracking-widest text-center uppercase">Payment<br/>Information</span>
//       </div>
      
//       {/* Step 2 */}
//       <div className="flex flex-col items-center flex-1 relative z-10 opacity-40">
//         <div className="w-10 h-10 rounded-full bg-[#0A0D14] border border-gray-700 flex items-center justify-center mb-4">
//           <span className="text-gray-500 font-bold text-sm">2</span>
//         </div>
//         <span className="text-gray-400 text-[10px] font-bold tracking-widest text-center uppercase">Verification<br/>Status</span>
//       </div>
      
//       {/* Step 3 */}
//       <div className="flex flex-col items-center flex-1 relative z-10 opacity-40">
//         <div className="w-10 h-10 rounded-full bg-[#0A0D14] border border-gray-700 flex items-center justify-center mb-4">
//           <span className="text-gray-500 font-bold text-sm">3</span>
//         </div>
//         <span className="text-gray-400 text-[10px] font-bold tracking-widest text-center uppercase">VIP<br/>Access</span>
//       </div>
//     </div>
//   );
// }

// function PaymentSection() {
//   return (
//     <div className="bg-[#10141D] border border-white/5 rounded-3xl p-6 md:p-10 shadow-2xl relative w-full mb-6">
//       <div className="flex flex-col md:flex-row gap-12 items-center justify-between mb-12">
        
//         {/* HUGE QR Code Area (Hero of the section) */}
//         <div className="flex flex-col items-center justify-center w-full md:w-1/2">
//           <div className="text-gray-400 text-[10px] font-bold tracking-widest mb-4 w-full max-w-[280px] text-center md:text-left">SCAN TO PAY</div>
//           <div className="bg-white p-4 rounded-3xl w-full max-w-[280px] aspect-square flex items-center justify-center relative shadow-[0_0_50px_rgba(38,161,123,0.15)]">
//             {/* SVG QR Placeholder */}
//             <svg viewBox="0 0 100 100" className="w-full h-full opacity-90" fill="#000">
//               <path d="M0 0h30v30H0zM10 10h10v10H10zM70 0h30v30H70zM80 10h10v10H80zM0 70h30v30H0zM10 80h10v10H10zM40 0h20v10H40zM40 20h20v10H40zM40 40h10v10H40zM60 40h10v10H60zM40 60h20v10H40zM40 80h10v10H40zM60 80h20v10H60zM80 60h20v10H80z"/>
//               <rect x="30" y="30" width="10" height="10"/>
//               <rect x="50" y="30" width="10" height="10"/>
//               <rect x="70" y="40" width="10" height="10"/>
//               <rect x="80" y="40" width="10" height="10"/>
//               <rect x="90" y="50" width="10" height="10"/>
//               <rect x="10" y="40" width="10" height="10"/>
//               <rect x="20" y="50" width="10" height="10"/>
//               <rect x="10" y="60" width="10" height="10"/>
//             </svg>
//             <div className="absolute inset-0 flex items-center justify-center">
//               <div className="w-14 h-14 bg-[#26A17B] rounded-full border-[4px] border-white flex items-center justify-center shadow-lg">
//                 <span className="text-white text-xl font-bold font-sans">T</span>
//               </div>
//             </div>
//           </div>
//           <div className="text-gray-400 text-xs mt-5 text-center">
//             Send exactly <span className="text-white font-bold">{membershipData.price}</span> to this address
//           </div>
//         </div>

//         {/* Info & Details */}
//         <div className="flex flex-col w-full md:w-1/2">
//           {/* Membership Info */}
//           <div className="mb-8 text-center md:text-left">
//             <div className="text-gray-500 text-[10px] font-bold tracking-widest mb-2">ACTIVATING</div>
//             <div className="text-4xl font-bold text-white tracking-tight">{membershipData.plan}</div>
//           </div>

//           {/* Network Details (Secondary) */}
//           <div className="flex flex-col gap-4">
//             <div className="bg-[#0A0D14] rounded-2xl p-5 border border-white/5">
//               <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
//                 <span className="text-gray-500 text-sm font-medium">Network</span>
//                 <span className="text-white font-bold text-sm">{membershipData.network}</span>
//               </div>
//               <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
//                 <span className="text-gray-500 text-sm font-medium">Currency</span>
//                 <span className="text-white font-bold text-sm">{membershipData.currency}</span>
//               </div>
//               <div className="flex flex-col gap-3">
//                 <span className="text-gray-500 text-sm font-medium">Wallet Address</span>
//                 <div className="flex items-center justify-between bg-[#10141D] py-3 px-4 rounded-xl border border-white/5 group hover:border-amber-500/30 transition-colors cursor-pointer">
//                   <span className="text-gray-300 font-mono text-sm truncate mr-4">{membershipData.walletAddress}</span>
//                   <button className="text-amber-500 hover:text-amber-400 text-[11px] font-bold uppercase tracking-wider shrink-0 transition-colors">Copy</button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Forms & Inputs */}
//       <div className="bg-[#0A0D14] rounded-2xl p-6 border border-white/5 mb-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           <div className="flex flex-col">
//             <label className="text-gray-400 text-[10px] font-bold tracking-widest mb-3">
//               DISCORD USERNAME
//             </label>
//             <input 
//               type="text" 
//               placeholder="Enter your Discord username" 
//               className="w-full bg-[#10141D] border border-white/5 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 transition-colors text-sm" 
//             />
//             <div className="text-gray-500 text-[10px] mt-3">VIP access will be assigned to this account.</div>
//           </div>

//           <div className="flex flex-col">
//             <label className="text-gray-400 text-[10px] font-bold tracking-widest mb-3">
//               TRANSACTION HASH (TXID)
//             </label>
//             <input 
//               type="text" 
//               placeholder="Enter transaction hash" 
//               className="w-full bg-[#10141D] border border-white/5 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 transition-colors text-sm" 
//             />
//           </div>
//         </div>
//       </div>

//       {/* Primary Button */}
//       <button className="w-full py-5 rounded-xl bg-gradient-to-r from-blue-600 via-purple-500 to-amber-500 text-white font-bold text-base tracking-wide flex items-center justify-center hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(168,85,247,0.2)]">
//         I've Completed Payment
//       </button>
//     </div>
//   );
// }

// function VerificationSection() {
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const verificationStatus = "dormant"; // Toggle to 'active' to preview future state

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

// function ResultSection() {
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const membershipStatus = "dormant"; // Toggle to 'active' or 'issue' to preview future states

//   if (membershipStatus === "active") {
//     return (
//       <div className="bg-[#10141D] border border-emerald-500/20 rounded-3xl p-8 w-full shadow-[0_0_40px_rgba(16,185,129,0.05)] text-center relative overflow-hidden">
//         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-emerald-600"></div>
//         <h2 className="text-2xl font-bold text-white mb-2 mt-4">Welcome To TraderCity VIP</h2>
//         <div className="flex flex-col gap-2 mb-8 mt-8 max-w-sm mx-auto text-sm bg-[#0A0D14] rounded-2xl p-6 border border-white/5">
//           <div className="flex items-center justify-between py-3 border-b border-white/5">
//             <span className="text-gray-400">Membership</span>
//             <span className="text-emerald-400 font-bold">Active</span>
//           </div>
//           <div className="flex items-center justify-between py-3 border-b border-white/5">
//             <span className="text-gray-400">Discord Access</span>
//             <span className="text-emerald-400 font-bold">Ready</span>
//           </div>
//           <div className="flex items-center justify-between py-3">
//             <span className="text-gray-400">VIP Dashboard</span>
//             <span className="text-emerald-400 font-bold">Ready</span>
//           </div>
//         </div>
//         <button className="bg-emerald-500 text-black font-bold py-4 px-10 rounded-xl hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20 w-full max-w-sm">
//           Enter VIP Dashboard
//         </button>
//       </div>
//     );
//   }

//   if (membershipStatus === "issue") {
//     return (
//       <div className="bg-[#10141D] border border-amber-500/20 rounded-3xl p-8 w-full shadow-lg text-center relative overflow-hidden">
//          <div className="absolute top-0 left-0 w-full h-1 bg-amber-500"></div>
//          <h3 className="text-amber-500 font-bold text-xl mb-3 mt-2">Verification Needs Attention</h3>
//          <p className="text-gray-400 text-sm mb-8">We could not automatically verify your transaction.</p>
//          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
//            <button className="bg-[#0A0D14] border border-white/10 text-white font-medium py-3 px-6 rounded-xl hover:bg-white/5 transition-colors text-sm w-full sm:w-auto">
//              Recheck Transaction
//            </button>
//            <button className="bg-amber-500/10 border border-amber-500/30 text-amber-500 font-bold py-3 px-6 rounded-xl hover:bg-amber-500/20 transition-colors text-sm w-full sm:w-auto">
//              Submit New Hash
//            </button>
//          </div>
//       </div>
//     );
//   }

//   // Premium Locked State (Dormant)
//   return (
//     <div className="bg-[#10141D]/40 border border-white/5 rounded-2xl p-5 w-full flex items-center gap-4 opacity-60">
//       <div className="w-10 h-10 rounded-full bg-[#0A0D14] border border-white/5 flex items-center justify-center shrink-0">
//         <span className="text-gray-500 text-sm">🔒</span>
//       </div>
//       <div className="flex flex-col">
//         <span className="text-white font-medium text-sm mb-0.5">VIP Access</span>
//         <span className="text-gray-500 text-xs">Result will appear after verification.</span>
//       </div>
//     </div>
//   );
// }

// function NeedHelpSection() {
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const supportVisible = false; // Hidden by default. Toggle to true to see in development

//   // Completely removed from page flow until activated
//   if (!supportVisible) return null;

//   return (
//     <div className="bg-[#10141D] border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 mt-8">
//       <div>
//         <h4 className="text-white font-bold text-lg mb-1">Need help?</h4>
//         <p className="text-gray-400 text-sm">Our support team is here if you need us.</p>
//       </div>
//       <button className="px-8 py-3 rounded-xl border border-white/10 text-white text-sm font-medium hover:bg-white/5 transition-colors">
//         Contact Support
//       </button>
//     </div>
//   );
// }
