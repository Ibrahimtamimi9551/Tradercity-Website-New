import HeroBackground from "./HeroBackground";
import HeroContent2 from "./HeroContent2";

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-[100svh] flex-col overflow-hidden pb-24 sm:pb-28 md:pb-32 lg:pb-36">
      <HeroBackground />

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col px-4 sm:px-6 md:px-8 lg:px-16">
        <div className="grid min-h-0 flex-1 grid-cols-12">
          <HeroContent2 />
        </div>
      </div>
    </section>
  );
}
