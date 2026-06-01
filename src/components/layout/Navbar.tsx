export default function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/60 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src="/images/hero-logo.png"
            alt="TraderCity"
            className="h-10 w-10 object-contain"
          />

          <span className="text-xl font-bold tracking-wide text-white">
            Trader
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              City
            </span>
          </span>
        </div>

        {/* Nav Links */}
        <nav className="hidden items-center gap-10 text-sm font-medium text-gray-300 lg:flex">
          <a href="#" className="transition hover:text-white">
            Analysts
          </a>

          <a href="#" className="transition hover:text-white">
            Community
          </a>

          <a href="#" className="transition hover:text-white">
            Pricing
          </a>

          <a href="#" className="transition hover:text-white">
            For Traders
          </a>
        </nav>

        {/* CTA */}
        <button className="rounded-full border border-purple-500/40 px-6 py-3 text-sm font-semibold text-white transition hover:border-purple-400">
          Join Community
        </button>

      </div>
    </header>
  );
}