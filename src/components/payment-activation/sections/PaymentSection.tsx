import React from 'react';

const membershipData = {
  plan: "VIP Monthly",
  price: "$60",
  network: "BNB Smart Chain (BEP20)",
  currency: "USDT",
  walletAddress: "0xA43D...7aB8c9DaE7F8a9B0c3D5e6F7a889c",
  fullWalletAddress: "0xA43D7aB8c9DaE7F8a9B0c3D5e6F7a889c"
};

export default function PaymentSection() {
  /*
    TODO: Future Backend Integration States
    - paymentSubmitted
    - verificationStatus
    - membershipStatus
    - discordStatus
    - supportVisible
  */

  return (
    <div className="bg-[#10141D] border border-white/5 rounded-3xl p-6 md:p-10 shadow-2xl relative w-full mb-6">
      <div className="flex flex-col md:flex-row gap-12 items-center justify-between mb-12">
        
        {/* HUGE QR Code Area (Hero of the section) */}
        <div className="flex flex-col items-center justify-center w-full md:w-1/2">
          <div className="text-gray-400 text-[10px] font-bold tracking-widest mb-4 w-full max-w-[280px] text-center md:text-left">SCAN TO PAY</div>
          <div className="bg-white p-4 rounded-3xl w-full max-w-[280px] aspect-square flex items-center justify-center relative shadow-[0_0_50px_rgba(38,161,123,0.15)]">
            {/* SVG QR Placeholder */}
            <svg viewBox="0 0 100 100" className="w-full h-full opacity-90" fill="#000">
              <path d="M0 0h30v30H0zM10 10h10v10H10zM70 0h30v30H70zM80 10h10v10H80zM0 70h30v30H0zM10 80h10v10H10zM40 0h20v10H40zM40 20h20v10H40zM40 40h10v10H40zM60 40h10v10H60zM40 60h20v10H40zM40 80h10v10H40zM60 80h20v10H60zM80 60h20v10H80z"/>
              <rect x="30" y="30" width="10" height="10"/>
              <rect x="50" y="30" width="10" height="10"/>
              <rect x="70" y="40" width="10" height="10"/>
              <rect x="80" y="40" width="10" height="10"/>
              <rect x="90" y="50" width="10" height="10"/>
              <rect x="10" y="40" width="10" height="10"/>
              <rect x="20" y="50" width="10" height="10"/>
              <rect x="10" y="60" width="10" height="10"/>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 bg-[#26A17B] rounded-full border-[4px] border-white flex items-center justify-center shadow-lg">
                <span className="text-white text-xl font-bold font-sans">T</span>
              </div>
            </div>
          </div>
          <div className="text-gray-400 text-xs mt-5 text-center">
            Send exactly <span className="text-white font-bold">{membershipData.price}</span> to this address
          </div>
        </div>

        {/* Info & Details */}
        <div className="flex flex-col w-full md:w-1/2">
          {/* Membership Info */}
          <div className="mb-8 text-center md:text-left">
            <div className="text-gray-500 text-[10px] font-bold tracking-widest mb-2">ACTIVATING</div>
            <div className="text-4xl font-bold text-white tracking-tight">{membershipData.plan}</div>
          </div>

          {/* Network Details (Secondary) */}
          <div className="flex flex-col gap-4">
            <div className="bg-[#0A0D14] rounded-2xl p-5 border border-white/5">
              <div className="mb-4 flex flex-col gap-1 border-b border-white/5 pb-4 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-sm font-medium text-gray-500">Network</span>
                <span className="min-w-0 break-words text-sm font-bold text-white sm:text-right">
                  {membershipData.network}
                </span>
              </div>
              <div className="mb-4 flex flex-col gap-1 border-b border-white/5 pb-4 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-sm font-medium text-gray-500">Currency</span>
                <span className="text-sm font-bold text-white sm:text-right">
                  {membershipData.currency}
                </span>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-sm font-medium text-gray-500">Wallet Address</span>
                <div className="group flex cursor-pointer items-center justify-between rounded-xl border border-white/5 bg-[#10141D] px-4 py-3 transition-colors hover:border-amber-500/30">
                  <span className="mr-4 min-w-0 truncate font-mono text-sm text-gray-300">
                    {membershipData.walletAddress}
                  </span>
                  <button
                    type="button"
                    className="min-h-11 shrink-0 px-2 text-[11px] font-bold uppercase tracking-wider text-amber-500 transition-colors hover:text-amber-400"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Forms & Inputs */}
      <div className="bg-[#0A0D14] rounded-2xl p-6 border border-white/5 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col">
            <label className="text-gray-400 text-[10px] font-bold tracking-widest mb-3">
              DISCORD USERNAME
            </label>
            <input 
              type="text" 
              placeholder="Enter your Discord username" 
              className="w-full bg-[#10141D] border border-white/5 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 transition-colors text-sm" 
            />
            <div className="text-gray-500 text-[10px] mt-3">VIP access will be assigned to this account.</div>
          </div>

          <div className="flex flex-col">
            <label className="text-gray-400 text-[10px] font-bold tracking-widest mb-3">
              TRANSACTION HASH (TXID)
            </label>
            <input 
              type="text" 
              placeholder="Enter transaction hash" 
              className="w-full bg-[#10141D] border border-white/5 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 transition-colors text-sm" 
            />
          </div>
        </div>
      </div>

      {/* Primary Button */}
      <button className="w-full py-5 rounded-xl bg-gradient-to-r from-blue-600 via-purple-500 to-amber-500 text-white font-bold text-base tracking-wide flex items-center justify-center hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(168,85,247,0.2)]">
        I've Completed Payment
      </button>
    </div>
  );
}
