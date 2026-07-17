import React from 'react';
import { 
  Bell, ChevronDown, CheckCircle2, Download, FileText, 
  Copy, Share2, User, Gift, Shield, Lock, 
  BookOpen, TrendingUp, Users, Crown, Calendar, 
  Clock, MessageSquare, Folder, BarChart2, 
  Bitcoin, Activity, Target, Check, HeadphonesIcon, Star
} from 'lucide-react';

/**
 * ==========================================
 * MOCK DATA
 * ==========================================
 */
const mockUser = { name: "Ibrahim", avatar: "I", notifications: 3 };

const mockMembership = {
  joinedDate: "08 Jun 2026",
  status: "VIP Active",
  daysRemaining: 23,
  paymentMethod: "Crypto (USDT)",
  paymentSubtext: "via Binance Pay",
  nextBillingDate: "12 Jul 2026",
  accessType: "Intelligence + Community",
  accessSubtext: "Premium reports, learning, analyst access",
  currentPlan: "VIP Monthly"
};

const mockAccessItems = [
  { id: 1, title: "Full Discord Community", icon: MessageSquare, hasAccess: true },
  { id: 2, title: "Complete Report Archive", icon: Folder, hasAccess: true },
  { id: 3, title: "Complete Learning Framework", icon: BookOpen, hasAccess: true },
  { id: 4, title: "All Analyst Sections", icon: Users, hasAccess: true },
  { id: 5, title: "Analyst Analysis & Insights", icon: BarChart2, hasAccess: true },
  { id: 6, title: "Weekly Crypto Market Report", icon: Bitcoin, hasAccess: true },
  { id: 7, title: "Weekly BTC Microstructure Report", icon: Activity, hasAccess: true },
  { id: 8, title: "Weekly Orderflow Report", icon: TrendingUp, hasAccess: true },
  { id: 9, title: "Market Context Intelligence", icon: Target, hasAccess: true },
  { id: 10, title: "VIP Events & Workshops", icon: Calendar, hasAccess: true },
];

const mockReferral = {
  link: "tradercity.com/ref/Ibrahim",
  current: 0,
  target: 5,
  rules: [
    "User registers on TraderCity",
    "User purchases any VIP plan",
    "Payment is successful",
    "Referral is recorded"
  ]
};

/**
 * ==========================================
 * COMPONENT: DashboardHeader
 * ==========================================
 * 1. Purpose: Displays top navigation, branding, and user profile actions.
 * 2. Props Interface: None (uses mockUser)
 * 3. Mock Data Example: { name: "Ibrahim", notifications: 3 }
 */
const DashboardHeader = () => (
  <header className="flex items-center justify-between mb-8">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-yellow-500 rounded flex items-center justify-center font-bold text-black text-xl">TC</div>
      <div>
        <h1 className="text-white font-bold tracking-wider leading-none text-lg">TRADERCITY</h1>
        <span className="text-[10px] text-gray-400 tracking-widest uppercase">Premium Intelligence Community</span>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <button className="hidden md:flex items-center gap-2 border border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/10 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
        <MessageSquare className="w-4 h-4" /> Open Discord
      </button>
      <div className="relative cursor-pointer hover:bg-[#1a1a1a] p-2 rounded-full transition-colors">
        <Bell className="w-5 h-5 text-yellow-500" />
        <span className="absolute top-0 right-0 bg-yellow-500 text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
          {mockUser.notifications}
        </span>
      </div>
      <div className="flex items-center gap-3 bg-[#1a1a1a] border border-[#333] rounded-full p-1 pr-4 cursor-pointer hover:bg-[#222] transition-colors">
        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold">
          {mockUser.avatar}
        </div>
        <span className="text-white text-sm font-medium">{mockUser.name}</span>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </div>
    </div>
  </header>
);

/**
 * ==========================================
 * COMPONENT: VipHeroSection
 * ==========================================
 * 1. Purpose: Displays personalized welcome message and current membership status grid.
 * 2. Props Interface: None (uses mockUser, mockMembership)
 * 3. Mock Data Example: { status: "VIP Active", daysRemaining: 23 }
 */
const VipHeroSection = () => (
  <section className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
    {/* Welcome Panel */}
    <div className="relative bg-[#0c0e14] border border-yellow-900/30 rounded-2xl p-8 overflow-hidden flex flex-col justify-between min-h-[340px]">
      <div className="relative z-10">
        <div className="flex items-center text-yellow-500 text-xs font-bold tracking-widest mb-6 uppercase">
          <Crown className="w-4 h-4 mr-2" /> VIP Member Terminal
        </div>
        <div className="text-gray-400 text-lg">Welcome back,</div>
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-yellow-100 to-yellow-500">
            {mockUser.name}
          </h2>
          <CheckCircle2 className="w-7 h-7 text-yellow-500 mt-1" />
        </div>
        <p className="text-gray-300 text-xl mb-8">You're inside the VIP Community.</p>
        
        <ul className="space-y-3 mb-8">
          <li className="flex items-center text-gray-300"><Target className="w-5 h-5 text-yellow-500 mr-3" /> Market Context.</li>
          <li className="flex items-center text-gray-300"><Activity className="w-5 h-5 text-yellow-500 mr-3" /> Multiple Perspectives.</li>
          <li className="flex items-center text-gray-300"><Users className="w-5 h-5 text-yellow-500 mr-3" /> One Ecosystem.</li>
        </ul>

        <button className="flex items-center gap-2 border border-yellow-500 text-yellow-500 hover:bg-yellow-500/10 px-6 py-2.5 rounded-lg font-medium transition-colors w-fit">
          <MessageSquare className="w-5 h-5" /> Open Discord
        </button>
      </div>

      {/* Decorative 3D Logo Element */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center pointer-events-none">
        <div className="relative w-48 h-48 bg-gradient-to-br from-[#2a2310] to-[#050505] rounded-[2rem] border border-yellow-600/40 flex items-center justify-center shadow-[0_0_60px_rgba(234,179,8,0.15)] overflow-hidden transform rotate-3">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
          <span className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 to-yellow-600 drop-shadow-2xl z-10 skew-x-[-5deg]">TC</span>
        </div>
        {/* Glow Pedestal */}
        <div className="w-56 h-3 mt-8 bg-yellow-500/20 blur-xl rounded-[100%]" />
        <div className="w-40 h-1 mt-1 bg-yellow-500/40 blur-sm rounded-[100%]" />
        <div className="w-20 h-0.5 mt-1 bg-yellow-300/60 blur-[1px] rounded-[100%]" />
      </div>
    </div>

    {/* Membership Overview Card */}
    <div className="bg-[#0c0e14] border border-yellow-900/30 rounded-2xl p-8 flex flex-col min-h-[340px]">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center text-yellow-500 font-bold tracking-widest text-xs uppercase">
          <Crown className="w-4 h-4 mr-2" /> VIP Membership Status
        </div>
        <div className="flex items-center bg-green-950/40 border border-green-900/50 px-3 py-1 rounded-full text-green-500 text-xs font-medium">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 shadow-[0_0_5px_#22c55e]" /> Active
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6 flex-grow">
        <div className="bg-[#12161f]/50 rounded-xl p-4 border border-[#1f2533]">
          <div className="flex items-center text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-2"><Calendar className="w-3.5 h-3.5 mr-2 text-yellow-500" /> Joined Date</div>
          <div className="text-white font-medium">{mockMembership.joinedDate}</div>
        </div>
        <div className="bg-[#12161f]/50 rounded-xl p-4 border border-[#1f2533]">
          <div className="flex items-center text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-2"><Shield className="w-3.5 h-3.5 mr-2 text-yellow-500" /> Membership Status</div>
          <div className="text-white font-medium">{mockMembership.status}</div>
        </div>
        <div className="bg-[#12161f]/50 rounded-xl p-4 border border-[#1f2533]">
          <div className="flex items-center text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-1"><Clock className="w-3.5 h-3.5 mr-2 text-yellow-500" /> Days Remaining</div>
          <div className="text-yellow-500 text-3xl font-bold">{mockMembership.daysRemaining} <span className="text-lg font-medium">Days</span></div>
        </div>
        <div className="bg-[#12161f]/50 rounded-xl p-4 border border-[#1f2533]">
          <div className="flex items-center text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-2"><Bitcoin className="w-3.5 h-3.5 mr-2 text-yellow-500" /> Payment Method</div>
          <div className="text-white font-medium">{mockMembership.paymentMethod}</div>
          <div className="text-gray-500 text-xs">{mockMembership.paymentSubtext}</div>
        </div>
        <div className="bg-[#12161f]/50 rounded-xl p-4 border border-[#1f2533]">
          <div className="flex items-center text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-2"><Calendar className="w-3.5 h-3.5 mr-2 text-yellow-500" /> Next Billing Date</div>
          <div className="text-white font-medium">{mockMembership.nextBillingDate}</div>
        </div>
        <div className="bg-[#12161f]/50 rounded-xl p-4 border border-[#1f2533]">
          <div className="flex items-center text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-2"><Users className="w-3.5 h-3.5 mr-2 text-yellow-500" /> Member Access</div>
          <div className="text-white font-medium">{mockMembership.accessType}</div>
          <div className="text-gray-500 text-[10px] mt-1 leading-tight">{mockMembership.accessSubtext}</div>
        </div>
      </div>
      
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg border border-yellow-500/30 py-2.5 text-sm font-medium text-yellow-500 transition-colors hover:bg-yellow-500/10"
        >
          <Download className="h-4 w-4" /> Download Invoice
        </button>
        <button
          type="button"
          className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg border border-yellow-500/30 py-2.5 text-sm font-medium text-yellow-500 transition-colors hover:bg-yellow-500/10"
        >
          <FileText className="h-4 w-4" /> Billing History
        </button>
      </div>
    </div>
  </section>
);

/**
 * ==========================================
 * COMPONENT: AccessGrid
 * ==========================================
 * 1. Purpose: Displays all premium features the user has access to.
 * 2. Props Interface: None (uses mockAccessItems)
 * 3. Mock Data Example: [{ title: "Full Discord Community", icon: MessageSquare }]
 */
const AccessGrid = () => (
  <section className="mb-8">
    <div className="flex items-center text-yellow-500 text-sm font-bold tracking-widest mb-1 uppercase">
      <Crown className="w-4 h-4 mr-2" /> Everything You Can Access
    </div>
    <p className="text-gray-400 text-sm mb-6">You have full access to all premium content and features.</p>
    
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      {mockAccessItems.map((item) => (
        <div
          key={item.id}
          className="group flex cursor-default flex-col items-center rounded-xl border border-yellow-900/20 bg-[#0c0e14] p-6 text-center transition-all duration-300 hover:border-yellow-700/40 hover:bg-[#12151d]"
        >
          <item.icon
            className="mb-5 h-12 w-12 text-yellow-500 drop-shadow-[0_0_10px_rgba(234,179,8,0.2)] transition-transform duration-300 group-hover:scale-110"
            strokeWidth={1.5}
          />
          <h3 className="mb-4 flex-grow px-2 text-sm font-medium text-white">{item.title}</h3>
          <div className="flex w-full flex-wrap items-center justify-center rounded-full bg-yellow-500/10 px-3 py-1 text-[11px] font-bold text-yellow-500">
            Access Granted <Check className="ml-1 h-3 w-3" strokeWidth={3} />
          </div>
        </div>
      ))}
    </div>
  </section>
);

/**
 * ==========================================
 * COMPONENT: ReferralCentre
 * ==========================================
 * 1. Purpose: Displays the referral link, progress, and reward information.
 * 2. Props Interface: None (uses mockReferral)
 * 3. Mock Data Example: { target: 5, current: 0 }
 */
const ReferralCentre = () => (
  <section className="mb-8 bg-[#060a14] border border-blue-900/40 rounded-2xl p-6 relative overflow-hidden">
    {/* Subtle Background Glow */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

    <div className="flex items-center text-blue-400 text-sm font-bold tracking-widest mb-6 uppercase relative z-10">
      <Users className="w-5 h-5 mr-2" fill="currentColor" /> Referral Centre
      <span className="text-gray-400 text-xs font-normal ml-3 normal-case tracking-normal hidden md:inline">Refer 5 VIP members and unlock your next month free.</span>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
      {/* Link Panel */}
      <div className="border border-blue-900/30 rounded-xl p-5 bg-[#0a101f]/80 backdrop-blur-sm">
        <div className="text-[10px] text-blue-400 font-bold mb-3 uppercase tracking-wider">Your Referral Link</div>
        <div className="flex items-center bg-[#020408] border border-blue-900/50 rounded-lg p-1.5 mb-4">
          <div className="text-gray-500 mx-2"><Lock className="w-4 h-4"/></div>
          <input type="text" readOnly value={mockReferral.link} className="bg-transparent flex-1 text-sm text-gray-300 outline-none" />
          <button
            type="button"
            className="flex min-h-11 min-w-11 items-center justify-center rounded text-gray-400 transition-colors hover:bg-blue-900/30"
            aria-label="Copy referral link"
          >
            <Copy className="h-4 w-4" />
          </button>
        </div>
        <div className="mb-6 flex gap-3">
          <button
            type="button"
            className="min-h-11 flex-1 rounded-lg border border-blue-900/50 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-blue-900/20"
          >
            Edit Link
          </button>
          <button
            type="button"
            className="min-h-11 flex-1 rounded-lg bg-blue-600 py-2 text-sm font-medium text-white shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-colors hover:bg-blue-500"
          >
            Share Link
          </button>
        </div>
        <div className="text-[10px] text-blue-400 font-bold mb-3 uppercase tracking-wider">Referral Rules</div>
        <ul className="space-y-2 text-[13px] text-gray-400">
          {mockReferral.rules.map((rule, idx) => (
            <li key={idx} className="flex items-start">
              <Check className="w-4 h-4 text-green-500 mr-2 shrink-0 mt-0.5" /> {rule}
            </li>
          ))}
          <li className="flex items-start text-xs text-blue-400/80 mt-4 pt-4 border-t border-blue-900/30">
            <div className="w-4 h-4 rounded-full border border-blue-400/80 flex items-center justify-center mr-2 shrink-0 mt-0.5 font-bold">i</div>
            Only completed VIP purchases count toward referral progress.
          </li>
        </ul>
      </div>

      {/* Progress Panel */}
      <div className="border border-blue-900/30 rounded-xl p-5 bg-[#0a101f]/80 backdrop-blur-sm flex flex-col items-center justify-center text-center">
        <div className="text-[10px] text-blue-400 font-bold mb-2 uppercase tracking-wider">Referral Progress</div>
        <div className="text-gray-300 text-sm mb-6">Refer 5 VIP Members</div>
        <div className="text-6xl font-bold text-blue-500 mb-8 tracking-tighter drop-shadow-[0_0_15px_rgba(37,99,235,0.3)]">
          {mockReferral.current}<span className="text-3xl text-blue-800">/{mockReferral.target}</span>
        </div>
        <div className="flex justify-center gap-3 w-full mb-6">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full border border-blue-900/40 bg-[#020408] flex items-center justify-center text-gray-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
                <User className="w-4 h-4" />
              </div>
              <span className="text-[10px] text-gray-500">Pending</span>
            </div>
          ))}
        </div>
        <div className="text-xs text-gray-500">{mockReferral.current} Completed</div>
      </div>

      {/* Reward Panel */}
      <div className="border border-blue-900/30 rounded-xl p-5 bg-[#0a101f]/80 backdrop-blur-sm flex flex-col items-center justify-center text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.1)_0%,transparent_60%)] pointer-events-none" />
        <div className="text-[10px] text-blue-400 font-bold mb-6 uppercase tracking-wider z-10">Reward Unlock</div>
        <div className="relative mb-6 z-10">
          <div className="w-28 h-28 bg-gradient-to-br from-blue-400 via-blue-600 to-blue-900 rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(37,99,235,0.4)] border border-blue-400/30">
            <Gift className="w-14 h-14 text-white drop-shadow-md" strokeWidth={1.5} />
          </div>
        </div>
        <h3 className="text-white font-bold text-lg mb-3 z-10">Unlock Next Month Free</h3>
        <p className="text-gray-400 text-sm z-10 px-4 leading-relaxed">
          Bring 5 friends via your referral link. Once all referral conditions are met, your next month is free.
        </p>
      </div>
    </div>
  </section>
);

/**
 * ==========================================
 * COMPONENT: RenewalCentre
 * ==========================================
 * 1. Purpose: Displays renewal status, CTA, and retention benefits.
 * 2. Props Interface: None (uses mockMembership)
 * 3. Mock Data Example
 * 3. Mock Data Example: { currentPlan: "VIP Monthly", daysRemaining: 23, nextBillingDate: "12 Jul 2026" }
 */
const RenewalCentre = () => (
  <section className="mb-8">
    <div className="flex items-center text-yellow-500 text-sm font-bold tracking-widest mb-6 uppercase">
      <Shield className="w-5 h-5 mr-2" /> Renewal Centre
      <span className="text-gray-400 text-xs font-normal ml-3 normal-case tracking-normal hidden md:inline">Secure your next month before expiration.</span>
    </div>

    <div className="bg-[#0c0e14] border border-yellow-900/30 rounded-2xl p-6">
      {/* Top Info Row */}
      <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-6 border-b border-[#1f2533] pb-6 mb-6">
        <div className="w-full md:w-auto">
          <div className="text-[10px] text-gray-500 font-bold mb-1 uppercase tracking-wider">Current Plan</div>
          <div className="text-white font-medium text-lg">{mockMembership.currentPlan}</div>
        </div>
        
        <div className="hidden md:block w-px h-10 bg-[#1f2533]"></div>
        
        <div className="w-full md:w-auto">
          <div className="text-[10px] text-gray-500 font-bold mb-1 uppercase tracking-wider">Days Remaining</div>
          <div className="text-yellow-500 font-bold text-2xl">{mockMembership.daysRemaining} <span className="text-sm font-medium">Days</span></div>
        </div>

        <div className="hidden md:block w-px h-10 bg-[#1f2533]"></div>

        <div className="w-full md:w-auto">
          <div className="text-[10px] text-gray-500 font-bold mb-1 uppercase tracking-wider">Expires On</div>
          <div className="text-white font-medium">{mockMembership.nextBillingDate}</div>
          <div className="text-gray-500 text-xs">12:00 AM (UTC)</div>
        </div>

        <div className="hidden lg:block w-px h-10 bg-[#1f2533]"></div>

        <div className="w-full lg:w-auto flex-grow flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="text-[10px] text-gray-500 font-bold mb-1 uppercase tracking-wider">Interested in renewing?</div>
            <div className="text-white font-medium text-sm">Secure your next month</div>
            <div className="text-gray-500 text-xs">Before your access expires</div>
          </div>
          <button className="w-full md:w-auto bg-gradient-to-r from-yellow-600 to-yellow-400 hover:from-yellow-500 hover:to-yellow-300 text-black px-8 py-3 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(234,179,8,0.2)]">
            Renew Membership
          </button>
        </div>
      </div>

      {/* Bottom Benefits Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
        <div className="flex items-start gap-3">
          <Star className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
          <div>
            <div className="text-gray-300 text-xs font-bold mb-1">Why renew early?</div>
            <div className="text-gray-500 text-[11px] leading-tight">Keep your intelligence environment uninterrupted.</div>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Lock className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
          <div>
            <div className="text-gray-300 text-xs font-bold mb-1">No interruption in access</div>
            <div className="text-gray-500 text-[11px] leading-tight">Stay connected to reports, analysts, and community.</div>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <BookOpen className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
          <div>
            <div className="text-gray-300 text-xs font-bold mb-1">Continue your learning journey</div>
            <div className="text-gray-500 text-[11px] leading-tight">Maintain continuity across the complete learning framework.</div>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <TrendingUp className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
          <div>
            <div className="text-gray-300 text-xs font-bold mb-1">Keep your progress and history</div>
            <div className="text-gray-500 text-[11px] leading-tight">Preserve your journey, context, and VIP member progression.</div>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Users className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
          <div>
            <div className="text-gray-300 text-xs font-bold mb-1">Support the ecosystem and analysts</div>
            <div className="text-gray-500 text-[11px] leading-tight">Strengthen the intelligence network behind the TraderCity experience.</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/**
 * ==========================================
 * COMPONENT: DashboardFooter
 * ==========================================
 * 1. Purpose: Bottom branding and support links.
 * 2. Props Interface: None
 * 3. Mock Data Example: N/A
 */
const DashboardFooter = () => (
  <footer className="flex flex-col md:flex-row items-center justify-between py-8 mt-8 border-t border-[#1f2533] text-sm">
    <div className="flex items-center gap-3 mb-4 md:mb-0">
      <div className="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center font-bold text-black text-sm">TC</div>
      <div>
        <div className="text-white font-bold tracking-wider leading-none">TRADERCITY</div>
        <div className="text-[10px] text-gray-500 tracking-widest uppercase">VIP Member Terminal</div>
      </div>
    </div>
    <div className="text-gray-500 text-xs mb-4 md:mb-0 text-center">
      One Ecosystem. Multiple Experts. Better Context.
    </div>
    <button className="flex items-center gap-2 text-yellow-500 hover:text-yellow-400 transition-colors font-medium">
      <HeadphonesIcon className="w-4 h-4" /> Contact Support
    </button>
  </footer>
);

/**
 * ==========================================
 * MAIN PAGE: VIPDashboardPage
 * ==========================================
 * 1. Purpose: Orchestrates all sections into the final layout.
 * 2. Props Interface: None
 * 3. Mock Data Example: N/A
 */
export default function VIPDashboardPage() {
  return (
    <div className="min-h-screen bg-[#050505] font-sans selection:bg-yellow-500/30">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-6 md:py-10">
        <DashboardHeader />
        
        <main>
          <VipHeroSection />
          <AccessGrid />
          <ReferralCentre />
          <RenewalCentre />
        </main>
        
        <DashboardFooter />
      </div>
    </div>
  );
}




// export default function Section9Content() {
//   return (
//     <div className="mx-auto max-w-7xl px-6 py-12">
//       <div className="grid gap-8 lg:grid-cols-[1.3fr_0.9fr]">

//         {/* LEFT SIDE */}
//         <div className="rounded-3xl border border-yellow-500/20 bg-black/40 p-8">

//           <div className="mb-4 flex items-center gap-2">
//             <div className="h-2 w-2 rounded-full bg-yellow-400" />
//             <span className="text-xs font-semibold tracking-widest text-yellow-400 uppercase">
//               VIP Member Hero
//             </span>
//           </div>

//           <p className="text-2xl text-zinc-300">
//             Welcome back,
//           </p>

//           <h1 className="mt-2 text-6xl font-bold text-yellow-300">
//             Ibrahim
//           </h1>

//           <h2 className="mt-4 text-3xl font-semibold text-white">
//             You're inside the VIP Community.
//           </h2>

//           <div className="mt-8 space-y-3 text-lg text-zinc-400">
//             <p>Market Context.</p>
//             <p>Multiple Perspectives.</p>
//             <p>One Ecosystem.</p>
//           </div>

//           {/* TC LOGO */}
//           <div className="mt-10 flex justify-center">
//             <div className="flex h-48 w-48 items-center justify-center rounded-3xl bg-yellow-400 text-6xl font-bold text-black shadow-xl">
//               TC
//             </div>
//           </div>

//           <button className="mt-10 rounded-xl border border-yellow-500 px-6 py-3 font-semibold text-yellow-400 hover:bg-yellow-500 hover:text-black transition">
//             Open Discord
//           </button>

//         </div>

//         {/* RIGHT SIDE */}
//         <div className="rounded-3xl border border-yellow-500/20 bg-black/40 p-8">

//           <div className="mb-6 flex items-center justify-between">
//             <div>
//               <p className="text-xs uppercase tracking-widest text-yellow-400">
//                 VIP Membership Status
//               </p>

//               <h3 className="mt-2 text-xl font-bold text-white">
//                 Membership Overview
//               </h3>
//             </div>

//             <div className="rounded-full bg-green-500/20 px-4 py-2 text-sm font-semibold text-green-400">
//               Active
//             </div>
//           </div>

//           <div className="grid gap-4 sm:grid-cols-2">

//             <InfoCard
//               title="Joined Date"
//               value="08 Jun 2026"
//             />

//             <InfoCard
//               title="Membership Status"
//               value="VIP Active"
//             />

//             <InfoCard
//               title="Days Remaining"
//               value="23 Days"
//               highlight
//             />

//             <InfoCard
//               title="Payment Method"
//               value="Crypto (USDT)"
//             />

//             <InfoCard
//               title="Next Billing Date"
//               value="12 Jul 2026"
//             />

//             <InfoCard
//               title="Member Access"
//               value="Intelligence + Community"
//             />

//           </div>

//           <div className="mt-6 flex gap-3">
//             <button className="rounded-xl border border-zinc-700 px-4 py-3 text-white">
//               Download Invoice
//             </button>

//             <button className="rounded-xl border border-zinc-700 px-4 py-3 text-white">
//               Billing History
//             </button>
//           </div>

//         </div>

//       </div>
//     </div>
//   );
// }

// function InfoCard({
//   title,
//   value,
//   highlight = false,
// }: {
//   title: string;
//   value: string;
//   highlight?: boolean;
// }) {
//   return (
//     <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
//       <p className="mb-2 text-xs uppercase tracking-wider text-zinc-500">
//         {title}
//       </p>

//       <p
//         className={`font-bold ${
//           highlight
//             ? "text-4xl text-yellow-300"
//             : "text-2xl text-white"
//         }`}
//       >
//         {value}
//       </p>
//     </div>
//   );
// }

