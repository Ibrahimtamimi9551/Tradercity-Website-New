//Iteration 2 

import React from 'react';

export default function ResultSection() {
  /*
    TODO: Future Backend Integration States
    - paymentSubmitted
    - verificationStatus
    - membershipStatus
    - discordStatus
    - supportVisible
  */
  
  const membershipStatus = "dormant"; // Toggle to 'active' or 'issue' to preview future states

  if (membershipStatus === "active") {
    return (
      <div className="bg-[#10141D] border border-emerald-500/30 rounded-3xl p-6 md:p-10 shadow-[0_0_50px_rgba(16,185,129,0.05)] relative w-full mb-6 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-emerald-600"></div>
        
        {/* Background glow for success */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-12 items-center relative z-10">
          
          {/* LEFT PANEL: Success Context */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold uppercase tracking-widest py-1 px-2.5 rounded-lg">
                STEP 3
              </span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
              Welcome To<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">TraderCity VIP 🎉</span>
            </h3>
            <p className="text-emerald-100/70 text-sm md:text-base leading-relaxed mb-8 max-w-md">
              Your membership is now completely active. You have full access to our premium ecosystem. Welcome to the winning team.
            </p>
          </div>

          {/* RIGHT PANEL: Activated Features */}
          <div className="bg-[#0A0D14]/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-emerald-500/10 relative shadow-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {/* Feature Cards (Active) */}
              <div className="bg-emerald-500/5 rounded-xl p-5 border border-emerald-500/20 flex items-center gap-4 relative overflow-hidden group">
                <div className="absolute top-2 right-2">
                  <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                </div>
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <span className="text-emerald-400 text-lg">🏆</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-bold text-sm">Membership Active</span>
                </div>
              </div>
              
              <div className="bg-emerald-500/5 rounded-xl p-5 border border-emerald-500/20 flex items-center gap-4 relative overflow-hidden group">
                <div className="absolute top-2 right-2">
                  <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                </div>
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <span className="text-emerald-400 text-lg">💬</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-bold text-sm">Discord Access Ready</span>
                </div>
              </div>
              
              <div className="bg-emerald-500/5 rounded-xl p-5 border border-emerald-500/20 flex items-center gap-4 relative overflow-hidden group">
                <div className="absolute top-2 right-2">
                  <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                </div>
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <span className="text-emerald-400 text-lg">📊</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-bold text-sm">VIP Dashboard Ready</span>
                </div>
              </div>

              <div className="bg-emerald-500/5 rounded-xl p-5 border border-emerald-500/20 flex items-center gap-4 relative overflow-hidden group">
                <div className="absolute top-2 right-2">
                  <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                </div>
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <span className="text-emerald-400 text-lg">✨</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-bold text-sm">Premium Content Unlocked</span>
                </div>
              </div>
            </div>

            {/* TODO: Future Backend Integration - Discord Status Pending Assignment */}
            {/* 
            <div className="mb-6 bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
              <span className="text-blue-400 text-sm font-medium">Discord access is currently being assigned...</span>
            </div> 
            */}

            <button className="w-full mt-2 bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-4 px-8 rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] flex items-center justify-center gap-2 text-lg">
              Enter VIP Dashboard
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
          
        </div>
      </div>
    );
  }

  if (membershipStatus === "issue") {
    return (
      <div className="bg-[#10141D] border border-amber-500/20 rounded-3xl p-6 md:p-10 w-full shadow-lg relative overflow-hidden mb-6">
         <div className="absolute top-0 left-0 w-full h-1 bg-amber-500"></div>
         
         <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-12 items-center">
           <div className="flex flex-col">
             <div className="flex items-center gap-3 mb-4">
               <span className="bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[10px] font-bold uppercase tracking-widest py-1 px-2.5 rounded-lg">
                 ATTENTION
               </span>
             </div>
             <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">Verification Issue</h3>
             <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8 max-w-md">
               We could not automatically verify your transaction. Please recheck the transaction hash or submit a new one to continue.
             </p>
           </div>
           
           <div className="bg-[#0A0D14] rounded-2xl p-6 md:p-8 border border-white/5 relative flex flex-col items-center justify-center text-center">
             <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center mb-6">
               <svg className="w-8 h-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
               </svg>
             </div>
             <h4 className="text-white font-bold text-lg mb-2">Action Required</h4>
             <p className="text-gray-400 text-sm mb-8 max-w-xs">Your premium benefits are paused until the payment hash is validated.</p>
             <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
               <button className="bg-[#10141D] border border-white/10 text-white font-medium py-3 px-6 rounded-xl hover:bg-white/5 transition-colors text-sm w-full sm:w-auto">
                 Recheck Transaction
               </button>
               <button className="bg-amber-500/10 border border-amber-500/30 text-amber-500 font-bold py-3 px-6 rounded-xl hover:bg-amber-500/20 transition-colors text-sm w-full sm:w-auto shadow-[0_0_15px_rgba(245,158,11,0.1)]">
                 Submit New Hash
               </button>
             </div>
           </div>
         </div>
      </div>
    );
  }

  // Dormant State (Awaiting Verification)
  return (
    <div className="bg-[#10141D] border border-white/5 rounded-3xl p-6 md:p-10 shadow-2xl relative w-full mb-6">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-12 items-center">
        
        {/* LEFT PANEL: Journey Context */}
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[10px] font-bold uppercase tracking-widest py-1 px-2.5 rounded-lg">
              STEP 3
            </span>
          </div>
          <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">VIP Access</h3>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8 max-w-md">
            You're one step away from entering the TraderCity VIP ecosystem. Once verification is complete, your membership, Discord access and VIP dashboard will be activated automatically.
          </p>
          
          <div className="flex items-center gap-4 mt-2">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.15)] relative overflow-hidden shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-transparent opacity-50"></div>
              {/* Gold Crown Icon */}
              <svg className="w-7 h-7 text-amber-400 relative z-10 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"/>
              </svg>
            </div>
            <div>
              <h4 className="text-amber-400 font-bold text-sm">Premium Benefits</h4>
              <p className="text-gray-500 text-xs">Awaiting final activation</p>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: Awaiting Unlock Features */}
        <div className="bg-[#0A0D14] rounded-2xl p-6 md:p-8 border border-white/5 relative shadow-inner">
          <div className="mb-6">
            <h4 className="text-white font-bold text-lg mb-1">Activation Ready</h4>
            <p className="text-gray-400 text-sm">Everything is prepared. Verification is the final step.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Feature Cards (Dormant) */}
            <div className="bg-[#10141D] rounded-xl p-5 border border-white/5 opacity-60 flex items-center gap-4 transition-opacity duration-500">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                <span className="text-gray-500 text-lg">🏆</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400 font-medium text-sm">Membership Active</span>
              </div>
            </div>
            
            <div className="bg-[#10141D] rounded-xl p-5 border border-white/5 opacity-60 flex items-center gap-4 transition-opacity duration-500">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                <span className="text-gray-500 text-lg">💬</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400 font-medium text-sm">Discord Access Ready</span>
              </div>
            </div>
            
            <div className="bg-[#10141D] rounded-xl p-5 border border-white/5 opacity-60 flex items-center gap-4 transition-opacity duration-500">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                <span className="text-gray-500 text-lg">📊</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400 font-medium text-sm">VIP Dashboard Unlocked</span>
              </div>
            </div>

            <div className="bg-[#10141D] rounded-xl p-5 border border-white/5 opacity-60 flex items-center gap-4 transition-opacity duration-500">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                <span className="text-gray-500 text-lg">✨</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400 font-medium text-sm">Premium Content Accessible</span>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}



// import React from 'react';

// export default function ResultSection() {
//   /*
//     TODO: Future Backend Integration States
//     - paymentSubmitted
//     - verificationStatus
//     - membershipStatus
//     - discordStatus
//     - supportVisible
//   */
  
// //   const membershipStatus = "dormant"; // Toggle to 'active' or 'issue' to preview future states

// const membershipStatus = "active"; 
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
