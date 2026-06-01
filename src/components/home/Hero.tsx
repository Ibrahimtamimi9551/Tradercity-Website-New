import {
  IconUsers,
  IconMessageCircle,
  IconChartBar,
  IconRocket,
} from "@tabler/icons-react";


export default function Hero() {
  
  return (
    
    <section className="relative flex min-h-screen flex-col items-center pt-32">

     <div className="mb-6">
      <IconRocket size={80} className="text-red-500 mx-auto" />
    </div>   

      {/* Background Glow */}
      <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[120px]" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 text-center">
       
       {/* Hero Label */}
         <p className="mb-6 text-sm font-semibold uppercase tracking-[0.4em] text-cyan-400">
          TRADERCITY </p>

        <h1 className="text-5xl font-extrabold tracking-tight md:text-7xl lg:text-8xl">
          <span className="block text-white">
            ONE ECOSYSTEM.
          </span>

          <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            MULTIPLE EXPERTS.
          </span>

          <span className="block bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
            INFINITE OPPORTUNITIES.
          </span>
        </h1>

        <p className="mx-auto mt-8 max-w-3xl text-lg text-gray-400 md:text-2xl">
          TraderCity connects elite analysts and ambitious traders
          through one unified ecosystem.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">

  <button className="rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 px-8 py-4 text-lg font-semibold">
    Join Community
  </button>

  <button className="rounded-2xl border border-purple-500/40 px-8 py-4 text-lg font-semibold">
    Explore Analysts
  </button>
</div>

{/* Hero-logo */}
<div className="relative -mt-12 flex justify-center">
  <img
    src="/images/hero-logo.png"
    alt="TraderCity"
    className="w-[220px] md:w-[300px]"
  />
</div>

{/* Strip  */}
<div className="-mt-16 w-full max-w-5xl">
<div
  className="
    grid
    grid-cols-2
    md:grid-cols-4
    gap-6
    rounded-2xl
    border
    border-white/10
    bg-white/[0.02]
    backdrop-blur-xl
    py-6
    px-4
  "
>

<div className="text-center">
    <IconUsers size={28} className="mx-auto mb-3 text-cyan-400" />
  <h3 className="text-sm font-semibold uppercase tracking-wider text-cyan-400">
    Elite Analysts
  </h3>

  <p className="mt-2 text-sm text-gray-500">
    Verified specialists.
  </p>

</div>

    <div className="text-center">
        <IconMessageCircle size={28}
         className="mx-auto mb-3 text-blue-400"/>
      <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-400">
        Unified Community
      </h3>

      <p className="mt-2 text-sm text-gray-500">
        One ecosystem.
      </p>
    </div>

    <div className="text-center">
       <IconChartBar size={28}
        className="mx-auto mb-3 text-purple-400"/> 
      <h3 className="text-sm font-semibold uppercase tracking-wider text-purple-400">
        Market Insights
      </h3>

      <p className="mt-2 text-sm text-gray-500">
        Actionable research.
      </p>
    </div>

    <div className="text-center">
        <IconChartBar size={28}
        className="mx-auto mb-3 text-purple-400" />
      <h3 className="text-sm font-semibold uppercase tracking-wider text-pink-400">
        Grow Together
      </h3>

      <p className="mt-2 text-sm text-gray-500">
        Long-term success.
      </p>
    </div>

  </div>

</div>

      </div>
    </section>
  );
}