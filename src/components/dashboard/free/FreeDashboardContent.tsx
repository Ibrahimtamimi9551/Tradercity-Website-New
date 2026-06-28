import React from 'react';
import { 
  Bell, ChevronDown, Check, Lock, Gift, Users, BookOpen, 
  Target, BarChart2, MessageSquare, Shield, Clock, ShieldCheck,User,
  Crown, FileText, Share2, Copy, Eye, Star, Calendar,
  ArrowRight, Activity, CheckCircle2
} from 'lucide-react';

// --- MOCK DATA ---
const mockUser = { name: "Ibrahim", avatar: "I", notifications: 2 };

const mockHeroStatus = {
  memberSince: "08 Jun 2026",
  daysAgo: "7 Days Ago",
  currentPlan: "Free Member",
  welcomeCredit: 10,
  creditExpiry: "1D : 16H : 32M : 16S",
  discordStatus: "Activated"
};

const mockComparison = {
  free: [
    { id: 1, title: "Free Discord Access", desc: "Access to free discord channels", type: "check" },
    { id: 2, title: "Community Discussions", desc: "Participate in public discussions", type: "check" },
    { id: 3, title: "Public Market Analysis", desc: "Access to public analysis & updates", type: "check" },
    { id: 4, title: "Limited Reports", desc: "Access to limited reports", type: "count", value: "15", total: "400", label: "Reports" },
    { id: 5, title: "Limited Lessons", desc: "Access to limited lessons", type: "count", value: "15", total: "200", label: "Lessons" }
  ],
  vip: [
    { id: 1, title: "Full Discord Access", desc: "All VIP channels & analyst rooms" },
    { id: 2, title: "Full Education Framework", desc: "200+ lessons across all levels" },
    { id: 3, title: "Full Report Library", desc: "400+ premium reports" },
    { id: 4, title: "Weekly BTC Microstructure Report", desc: "Published weekly by our lead analysts" },
    { id: 5, title: "Weekly Quant Research Report", desc: "Advanced quantitative market insights" },
    { id: 6, title: "Multiple Market Perspectives", desc: "Different analysts, different edge" },
    { id: 7, title: "VIP Events & Workshops", desc: "Live sessions, Q&A and workshops" },
    { id: 8, title: "30 Days Full Access", desc: "Full access for the entire month" }
  ]
};

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

// --- COMPONENTS ---

const DashboardHeader = () => (
  <header className="flex items-center justify-between mb-8">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-purple-600 rounded flex items-center justify-center font-bold text-white text-xl">TC</div>
      <div>
        <h1 className="text-white font-bold tracking-wider leading-none text-lg">TRADERCITY</h1>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <button className="hidden md:flex items-center gap-2 border border-purple-500/50 text-purple-400 hover:bg-purple-500/10 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
        <MessageSquare className="w-4 h-4" /> Open Discord <ArrowRight className="w-4 h-4 ml-1" />
      </button>
      <div className="relative cursor-pointer hover:bg-[#1a1423] p-2 rounded-full transition-colors">
        <Bell className="w-5 h-5 text-purple-400" />
        <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
          {mockUser.notifications}
        </span>
      </div>
      <div className="flex items-center gap-3 bg-[#110a1a] border border-[#2d1b4e] rounded-full p-1 pr-4 cursor-pointer hover:bg-[#1a0f2e] transition-colors">
        <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-white font-bold">
          {mockUser.avatar}
        </div>
        <span className="text-white text-sm font-medium">{mockUser.name}</span>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </div>
    </div>
  </header>
);

const FreeHeroSection = () => (
  <section className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
    <div className="relative bg-[#0c0814] border border-purple-900/40 rounded-2xl p-8 overflow-hidden flex flex-col justify-between min-h-[280px]">
      <div className="relative z-10">
        <div className="text-purple-400 text-sm mb-1">Welcome back,</div>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">{mockUser.name}.</h2>
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
          You're exploring <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">the Free Community.</span>
        </h3>
        <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
          You've unlocked the door. Explore, learn and connect. Upgrade when you're ready for deeper insights and full access.
        </p>
      </div>
      {/* Decorative Right Graphic */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 pointer-events-none hidden md:flex items-center justify-center">
        <div className="relative w-32 h-48 border border-purple-500/30 rounded-xl flex items-center justify-center shadow-[0_0_50px_rgba(168,85,247,0.15)] bg-gradient-to-b from-purple-900/10 to-transparent">
          <Target className="w-12 h-12 text-purple-400/50" />
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-[#0c0814] border border-purple-900/20 rounded-xl p-5 flex flex-col justify-center">
        <div className="flex items-center text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-2">
          <Calendar className="w-3.5 h-3.5 mr-2 text-purple-400" /> Member Since
        </div>
        <div className="text-white font-medium text-lg">{mockHeroStatus.memberSince}</div>
        <div className="text-gray-500 text-xs mt-1">{mockHeroStatus.daysAgo}</div>
      </div>
      
      <div className="bg-[#0c0814] border border-purple-900/20 rounded-xl p-5 flex flex-col justify-center">
        <div className="flex items-center text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-2">
          <User className="w-3.5 h-3.5 mr-2 text-purple-400" /> Membership
        </div>
        <div className="text-white font-medium text-lg">{mockHeroStatus.currentPlan}</div>
        <div className="bg-purple-900/30 text-purple-400 text-[10px] px-2 py-0.5 rounded border border-purple-500/20 w-fit mt-2 uppercase font-bold">Current Plan</div>
      </div>

      <div className="bg-[#0c0814] border border-purple-900/20 rounded-xl p-5 flex flex-col justify-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 blur-[50px] rounded-full pointer-events-none" />
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center text-gray-400 text-[10px] uppercase font-bold tracking-wider">
            <Gift className="w-3.5 h-3.5 mr-2 text-yellow-500" /> Welcome Credit
          </div>
          <div className="text-right">
            <div className="text-[9px] text-gray-500 uppercase font-bold">Expires In</div>
            <div className="text-yellow-500 text-[10px] font-mono font-bold">{mockHeroStatus.creditExpiry}</div>
          </div>
        </div>
        <div className="text-yellow-500 font-bold text-3xl mb-1">${mockHeroStatus.welcomeCredit}</div>
        <div className="text-gray-500 text-xs">Available To Use</div>
      </div>

      <div className="bg-[#0c0814] border border-purple-900/20 rounded-xl p-5 flex flex-col justify-center">
        <div className="flex items-center text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-2">
          <MessageSquare className="w-3.5 h-3.5 mr-2 text-[#5865F2]" /> Discord Access
        </div>
        <div className="flex items-center text-green-500 font-medium text-lg mb-1">
          {mockHeroStatus.discordStatus} <CheckCircle2 className="w-5 h-5 ml-2" />
        </div>
        <div className="text-gray-500 text-xs">You can now join our Discord server.</div>
      </div>
    </div>
  </section>
);

const AccessComparisonSection = () => (
  <section className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 mt-10">
    {/* VS Badge */}
    <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[#1a1423] border border-yellow-900/50 rounded-full items-center justify-center text-yellow-500 font-bold text-sm z-10 shadow-[0_0_15px_rgba(234,179,8,0.2)]">
      VS
    </div>

    {/* Free Card */}
    <div className="bg-[#0c0814] border border-purple-900/30 rounded-2xl p-6 md:p-8">
      <div className="flex items-center text-purple-400 text-[10px] font-bold tracking-widest mb-4 uppercase bg-purple-900/20 w-fit px-3 py-1 rounded-full border border-purple-500/20">
        <Eye className="w-3.5 h-3.5 mr-2" /> Your Current Access
      </div>
      <h3 className="text-white font-bold text-2xl mb-1">Free Community</h3>
      <p className="text-gray-400 text-sm mb-8">Open Access. Real Value.</p>

      <div className="space-y-6">
        {mockComparison.free.map(item => (
          <div key={item.id} className="flex items-center justify-between group">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-purple-900/20 flex items-center justify-center border border-purple-500/10 shrink-0">
                <Users className="w-4 h-4 text-purple-400" />
              </div>
              <div>
                <div className="text-white font-medium text-sm mb-0.5">{item.title}</div>
                <div className="text-gray-500 text-xs">{item.desc}</div>
              </div>
            </div>
            {item.type === 'check' ? (
              <div className="w-6 h-6 rounded bg-purple-900/30 flex items-center justify-center shrink-0 border border-purple-500/20">
                <Check className="w-3.5 h-3.5 text-purple-400" />
              </div>
            ) : (
              <div className="text-right shrink-0">
                <div className="text-purple-400 font-bold text-sm">{item.value} <span className="text-gray-500 font-normal">/ {item.total}</span></div>
                <div className="text-gray-500 text-[10px] uppercase">{item.label}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>

    {/* VIP Card */}
    <div className="bg-[#0c0814] border border-yellow-900/40 rounded-2xl p-6 md:p-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/5 blur-[80px] rounded-full pointer-events-none" />
      <div className="flex items-center text-yellow-500 text-[10px] font-bold tracking-widest mb-4 uppercase bg-yellow-900/20 w-fit px-3 py-1 rounded-full border border-yellow-500/20 relative z-10">
        <Lock className="w-3.5 h-3.5 mr-2" /> Upgrade To Unlock
      </div>
      <h3 className="text-white font-bold text-2xl mb-1 relative z-10">VIP Community</h3>
      <p className="text-gray-400 text-sm mb-8 relative z-10">Deeper Access. Higher Edge.</p>

      <div className="space-y-6 relative z-10">
        {mockComparison.vip.map(item => (
          <div key={item.id} className="flex items-center justify-between opacity-80 hover:opacity-100 transition-opacity">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-yellow-900/10 flex items-center justify-center border border-yellow-500/20 shrink-0">
                <Crown className="w-4 h-4 text-yellow-500" />
              </div>
              <div>
                <div className="text-gray-200 font-medium text-sm mb-0.5">{item.title}</div>
                <div className="text-gray-500 text-xs">{item.desc}</div>
              </div>
            </div>
            <div className="w-6 h-6 rounded bg-yellow-900/20 flex items-center justify-center shrink-0 border border-yellow-500/20">
              <Lock className="w-3.5 h-3.5 text-yellow-500" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const JourneySection = () => (
  <section className="mb-10 pt-8 border-t border-purple-900/20">
    <div className="flex flex-col lg:flex-row gap-10 items-start lg:items-center justify-between">
      <div className="max-w-xs">
        <div className="text-purple-400 text-[10px] font-bold tracking-widest uppercase mb-2">Your Journey To VIP</div>
        <h3 className="text-white font-bold text-3xl mb-3 leading-tight">Every step brings you closer.</h3>
        <p className="text-gray-400 text-sm">Complete 5 more referrals or upgrade anytime using your credit.</p>
      </div>

      <div className="flex-1 w-full flex items-center justify-between relative">
        {/* Connecting Line */}
        <div className="absolute left-10 right-10 top-6 h-px bg-[#1f1633] z-0 hidden md:block" />
        
        <div className="flex flex-col items-center relative z-10 bg-[#050505] px-2">
          <div className="w-12 h-12 rounded-full border-2 border-purple-500 bg-purple-900/20 flex items-center justify-center text-purple-400 mb-4 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
            <Eye className="w-5 h-5" />
          </div>
          <div className="text-white text-xs font-bold uppercase tracking-wider mb-1">1. Observe</div>
          <div className="text-gray-500 text-[10px] text-center w-24">You're here<br/>Exploring the ecosystem</div>
        </div>

        <div className="flex flex-col items-center relative z-10 bg-[#050505] px-2">
          <div className="w-12 h-12 rounded-full border-2 border-gray-700 bg-[#111] flex items-center justify-center text-gray-500 mb-4">
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">2. Learn</div>
          <div className="text-gray-600 text-[10px] text-center w-24">Gain knowledge<br/>from elite traders</div>
        </div>

        <div className="flex flex-col items-center relative z-10 bg-[#050505] px-2">
          <div className="w-12 h-12 rounded-full border-2 border-gray-700 bg-[#111] flex items-center justify-center text-gray-500 mb-4">
            <Users className="w-5 h-5" />
          </div>
          <div className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">3. Participate</div>
          <div className="text-gray-600 text-[10px] text-center w-24">Join discussions<br/>and engage</div>
        </div>

        <div className="flex flex-col items-center relative z-10 bg-[#050505] px-2">
          <div className="w-12 h-12 rounded-full border-2 border-yellow-900 bg-yellow-900/10 flex items-center justify-center text-yellow-600 mb-4">
            <Crown className="w-5 h-5" />
          </div>
          <div className="text-yellow-600 text-xs font-bold uppercase tracking-wider mb-1">4. Upgrade</div>
          <div className="text-gray-600 text-[10px] text-center w-24">Unlock full access<br/>and grow faster</div>
        </div>
      </div>
    </div>
  </section>
);

const ReferralCentre = () => (
  <section className="mb-10 bg-[#080512] border border-purple-900/40 rounded-2xl p-6 md:p-8 relative overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />

    <div className="flex items-center text-purple-400 text-sm font-bold tracking-widest mb-6 uppercase relative z-10">
      <Users className="w-5 h-5 mr-2" /> Referral Centre
      <span className="text-gray-400 text-xs font-normal ml-3 normal-case tracking-normal hidden md:inline">Refer 5 VIP members and unlock your next month free.</span>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
      <div className="border border-purple-900/30 rounded-xl p-5 bg-[#0c0814]/80 backdrop-blur-sm">
        <div className="text-[10px] text-purple-400 font-bold mb-3 uppercase tracking-wider">Your Referral Link</div>
        <div className="flex items-center bg-[#050308] border border-purple-900/50 rounded-lg p-1.5 mb-4">
          <div className="text-gray-500 mx-2"><Lock className="w-4 h-4"/></div>
          <input type="text" readOnly value={mockReferral.link} className="bg-transparent flex-1 text-sm text-gray-300 outline-none" />
          <button className="p-2 hover:bg-purple-900/30 rounded text-gray-400 transition-colors"><Copy className="w-4 h-4"/></button>
        </div>
        <div className="flex gap-3 mb-6">
          <button className="flex-1 border border-purple-900/50 text-gray-300 hover:bg-purple-900/20 py-2 rounded-lg text-sm font-medium transition-colors">Edit Link</button>
          <button className="flex-1 bg-purple-600 hover:bg-purple-500 text-white py-2 rounded-lg text-sm font-medium transition-colors shadow-[0_0_15px_rgba(147,51,234,0.3)]">Share Link</button>
        </div>
        <div className="text-[10px] text-purple-400 font-bold mb-3 uppercase tracking-wider">Referral Rules</div>
        <ul className="space-y-2 text-[12px] text-gray-400">
          {mockReferral.rules.map((rule, idx) => (
            <li key={idx} className="flex items-start">
              <Check className="w-3.5 h-3.5 text-green-500 mr-2 shrink-0 mt-0.5" /> {rule}
            </li>
          ))}
          <li className="flex items-start text-[11px] text-purple-400/80 mt-4 pt-4 border-t border-purple-900/30">
            <div className="w-4 h-4 rounded-full border border-purple-400/80 flex items-center justify-center mr-2 shrink-0 mt-0.5 font-bold">i</div>
            Only completed VIP purchases count toward referral progress.
          </li>
        </ul>
      </div>

      <div className="border border-purple-900/30 rounded-xl p-5 bg-[#0c0814]/80 backdrop-blur-sm flex flex-col items-center justify-center text-center">
        <div className="text-[10px] text-purple-400 font-bold mb-2 uppercase tracking-wider">Referral Progress</div>
        <div className="text-gray-300 text-sm mb-6">Refer 5 VIP Members</div>
        <div className="text-6xl font-bold text-purple-500 mb-8 tracking-tighter drop-shadow-[0_0_15px_rgba(147,51,234,0.2)]">
          {mockReferral.current}<span className="text-3xl text-purple-900">/{mockReferral.target}</span>
        </div>
        <div className="flex justify-center gap-3 w-full mb-6">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full border border-purple-900/40 bg-[#050308] flex items-center justify-center text-gray-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
                <User className="w-4 h-4" />
              </div>
              <span className="text-[10px] text-gray-500">Pending</span>
            </div>
          ))}
        </div>
        <div className="text-xs text-gray-500">{mockReferral.current} Completed</div>
      </div>

      <div className="border border-purple-900/30 rounded-xl p-5 bg-[#0c0814]/80 backdrop-blur-sm flex flex-col items-center justify-center text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.1)_0%,transparent_60%)] pointer-events-none" />
        <div className="text-[10px] text-purple-400 font-bold mb-6 uppercase tracking-wider z-10">Reward Unlock</div>
        <div className="relative mb-6 z-10">
          <div className="w-28 h-28 bg-gradient-to-br from-purple-400 via-purple-600 to-purple-900 rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(147,51,234,0.3)] border border-purple-400/30">
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

const UpgradeCTASection = () => (
  <section className="mb-10 bg-[#0c0814] border border-yellow-900/30 rounded-2xl p-6 md:p-8 flex flex-col lg:flex-row gap-8 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-[500px] h-full bg-gradient-to-l from-yellow-900/10 to-transparent pointer-events-none" />
    
    <div className="flex-1 relative z-10">
      <div className="flex items-start gap-6 mb-8">
        <div className="hidden md:flex w-16 h-16 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-600 items-center justify-center shrink-0 shadow-[0_0_30px_rgba(234,179,8,0.2)] text-black">
          <Crown className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-300 leading-tight mb-2">
            Most communities give you information.<br/>
            <span className="text-white">TraderCity gives you context.</span>
          </h2>
        </div>
      </div>

      <div className="text-yellow-500 text-[10px] font-bold tracking-widest uppercase mb-4">Unlock Everything In VIP</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6">
        {[
          "Full Discord Access", "Complete Education Framework",
          "Weekly BTC Microstructure Report", "All Premium Market Perspectives",
          "Weekly Quant Research Report", "VIP Events & Workshops",
          "Full Report Library (400+)", "30 Days Full Access"
        ].map((feature, i) => (
          <div key={i} className="flex items-center text-gray-300 text-sm">
            <CheckCircle2 className="w-4 h-4 text-green-500 mr-3 shrink-0" /> {feature}
          </div>
        ))}
      </div>
    </div>

    <div className="w-full lg:w-[350px] bg-[#050308] border border-yellow-900/40 rounded-xl p-6 relative z-10 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center mb-3">
          <div className="text-gray-400 text-xs uppercase tracking-wider">Regular Price</div>
          <div className="text-gray-400 text-sm strikethrough line-through">$60</div>
        </div>
        <div className="flex justify-between items-center mb-6 pb-6 border-b border-purple-900/30">
          <div className="text-purple-400 text-xs uppercase tracking-wider font-bold">Your Credit</div>
          <div className="text-green-400 text-sm font-bold">-$10</div>
        </div>
        <div className="flex justify-between items-end mb-6">
          <div className="text-gray-300 text-sm font-bold uppercase tracking-wider">Today You Pay</div>
          <div className="text-yellow-500 text-4xl font-bold leading-none">$50</div>
        </div>
      </div>
      
      <div>
        <button className="w-full bg-gradient-to-r from-yellow-600 to-yellow-400 hover:from-yellow-500 hover:to-yellow-300 text-black py-3.5 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(234,179,8,0.2)] flex items-center justify-center gap-2 mb-3">
          <Lock className="w-4 h-4" /> Upgrade to VIP Now
        </button>
        <div className="flex items-center justify-center text-gray-500 text-[10px] mb-4">
          <Clock className="w-3 h-3 mr-1.5" /> Offer expires in: 1d 23h 44m 43s
        </div>
        <button className="w-full border border-purple-800/50 bg-purple-900/20 hover:bg-purple-900/40 text-purple-400 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 text-sm">
          Invite Friends <Share2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  </section>
);

const PricingPlansSection = () => (
  <section className="mb-10 text-center">
    <div className="text-purple-400 text-[10px] font-bold tracking-widest uppercase mb-2">Pricing Plans</div>
    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
      Choose the plan that fits your <span className="text-purple-400">journey</span>
    </h2>
    <p className="text-gray-400 text-sm mb-6">All plans include full access to our VIP community and premium content.</p>

    <div className="flex items-center justify-center gap-2 text-gray-400 text-xs bg-[#0c0814] border border-purple-900/30 w-fit mx-auto px-4 py-2 rounded-full mb-10">
      <ShieldCheck className="w-4 h-4 text-purple-400" />
      {/* <span className="font-bold text-gray-300 mr-1">30-Day Money Back Guarantee</span> */}
      Not satisfied? Get a full refund within 30 days.
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">
      {/* Quarterly Plan */}
      <div className="bg-[#0c0814] border-2 border-yellow-500/80 rounded-2xl p-8 relative flex flex-col hover:-translate-y-1 transition-transform duration-300 shadow-[0_0_30px_rgba(234,179,8,0.05)]">
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-yellow-500 text-black text-[10px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
          <Star className="w-3 h-3 fill-black" /> Most Popular
        </div>
        
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl bg-yellow-900/20 border border-yellow-500/30 flex items-center justify-center shrink-0">
            <Calendar className="w-6 h-6 text-yellow-500" />
          </div>
          <div>
            <h3 className="text-gray-300 font-bold uppercase tracking-wider text-sm mb-1">Quarterly</h3>
            <div className="flex items-end gap-1 mb-1">
              <span className="text-4xl font-bold text-white leading-none">$150</span>
              <span className="text-gray-500 text-sm mb-1">/ 3 months</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-yellow-500/20 text-yellow-500 text-[10px] font-bold px-2 py-0.5 rounded border border-yellow-500/20">Save $30</span>
              <span className="text-gray-600 text-xs line-through">$180</span>
            </div>
          </div>
        </div>

        <div className="space-y-3 mb-8 flex-grow">
          <div className="flex items-center text-gray-300 text-sm">
            <CheckCircle2 className="w-4 h-4 text-green-500 mr-3 shrink-0" /> Full Discord Access
          </div>
          <div className="flex items-center text-gray-300 text-sm">
            <CheckCircle2 className="w-4 h-4 text-green-500 mr-3 shrink-0" /> Complete Education Framework
          </div>
        </div>

        <button className="w-full bg-yellow-500 hover:bg-yellow-400 text-black py-3.5 rounded-xl font-bold transition-all text-sm mb-3">
          Choose Quarterly Plan
        </button>
        <div className="text-center text-gray-500 text-[10px]">Billed every 3 months.</div>
      </div>

      {/* Yearly Plan */}
      <div className="bg-[#0c0814] border border-purple-600/50 rounded-2xl p-8 flex flex-col hover:-translate-y-1 transition-transform duration-300">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl bg-purple-900/20 border border-purple-500/30 flex items-center justify-center shrink-0">
            <Calendar className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h3 className="text-gray-300 font-bold uppercase tracking-wider text-sm mb-1">Yearly</h3>
            <div className="flex items-end gap-1 mb-1">
              <span className="text-4xl font-bold text-white leading-none">$500</span>
              <span className="text-gray-500 text-sm mb-1">/ year</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-purple-900/50 text-purple-400 text-[10px] font-bold px-2 py-0.5 rounded border border-purple-500/30">Save $220</span>
              <span className="text-gray-600 text-xs line-through">$720</span>
            </div>
          </div>
        </div>

        <div className="space-y-3 mb-8 flex-grow">
          <div className="flex items-center text-gray-300 text-sm">
            <CheckCircle2 className="w-4 h-4 text-green-500 mr-3 shrink-0" /> Full Discord Access
          </div>
          <div className="flex items-center text-gray-300 text-sm">
            <CheckCircle2 className="w-4 h-4 text-green-500 mr-3 shrink-0" /> All Premium Reports
          </div>
        </div>

        <button className="w-full border border-purple-600/80 bg-purple-900/20 hover:bg-purple-900/40 text-purple-300 py-3.5 rounded-xl font-bold transition-all text-sm mb-3">
          Choose Yearly Plan
        </button>
        <div className="text-center text-gray-500 text-[10px]">Billed once per year.</div>
      </div>
    </div>
  </section>
);

export default function FreeDashboardPage() {
  return (
    <div className="min-h-screen bg-[#050308] font-sans selection:bg-purple-500/30">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-6 md:py-10">
        <DashboardHeader />
        <main>
          <FreeHeroSection />
          <AccessComparisonSection />
          <JourneySection />
          <ReferralCentre />
          <UpgradeCTASection />
          <PricingPlansSection />
        </main>
      </div>
    </div>
  );
}
