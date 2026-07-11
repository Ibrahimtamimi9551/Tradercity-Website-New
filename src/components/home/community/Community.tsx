//Gpt code given for logic Background render karo + Discord render karo + Illustration render karo

import CommunityBackground from "./CommunityBackground";
import CommunityDiscord from "./CommunityDiscord";
// import CommunityIllustration from "./CommunityIllustration";
import GradientText from "../shared/GradientText";

export default function Community() {
  return (
    <section id="community" className="relative overflow-hidden bg-[#050816]">
      <CommunityBackground />

      <div className="relative z-10">
        <CommunityDiscord />
        {/* <CommunityIllustration /> */}

        {/* Community insight — replaces illustration below Discord screenshot */}
        <div className="relative z-20 w-full flex flex-col items-center px-6 sm:px-8 lg:px-16 pt-10 sm:pt-6 lg:pt-4 pb-20 md:pb-28 lg:pb-32">
          <div className="w-full max-w-4xl mx-auto text-center font-sans">
            <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.15]">
              Build your network
              <br className="hidden sm:block" />
              inside a living Discord.
            </p>

            <p className="mt-6 sm:mt-8 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight leading-[1.25]">
              <GradientText from="#60A5FA" via="#3B82F6" to="#06B6D4">
                Learn beside experienced analysts.
              </GradientText>
            </p>

            <p className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-white/50 leading-relaxed max-w-2xl mx-auto font-medium">
              Share ideas. Challenge assumptions. Grow with traders who show up every day —
              and analysts who turn market noise into clear context.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
