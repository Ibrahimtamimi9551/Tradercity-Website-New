export default function Ecosystem() {
  return (
    <section className="relative py-32">

      {/* Section Title */}

      <div className="mx-auto max-w-7xl px-6 text-center">

        <h2 className="text-5xl font-bold">
          THE CENTRAL INTELLIGENCE LAYER
        </h2>

        <p className="mt-4 text-gray-400">
          TraderCity connects analysts and traders through one unified ecosystem.
        </p>

      </div>

      {/* Ecosystem Grid */}

      <div className="mx-auto mt-20 grid max-w-7xl grid-cols-3 gap-8 px-6">

        {/* Left */}

        <div className="space-y-4">
          <div className="rounded-2xl border border-purple-500/30 p-6">
            Market Analyst
          </div>

          <div className="rounded-2xl border border-cyan-500/30 p-6">
            Orderflow Expert
          </div>

          <div className="rounded-2xl border border-green-500/30 p-6">
            Education Analyst
          </div>

          <div className="rounded-2xl border border-yellow-500/30 p-6">
            Niche Analyst
          </div>
        </div>

        {/* Center */}

        <div className="flex items-center justify-center">

          <div className="rounded-3xl border border-purple-500/40 p-12 text-center">

            <h3 className="text-4xl font-bold">
              Discord
            </h3>

            <p className="mt-4 text-gray-400">
              Unified Community Hub
            </p>

          </div>

        </div>

        {/* Right */}

        <div>

          <div className="rounded-3xl border border-green-500/30 p-8">

            <h3 className="text-3xl font-bold">
              Community Traders
            </h3>

            <ul className="mt-6 space-y-4 text-gray-300">
              <li>Multiple Perspectives</li>
              <li>Better Decisions</li>
              <li>Actionable Strategies</li>
              <li>Continuous Learning</li>
              <li>Long-term Growth</li>
            </ul>

          </div>

        </div>

      </div>

    </section>
  );
}