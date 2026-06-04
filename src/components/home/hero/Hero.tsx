import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <HeroBackground />

      <div className="relative z-10">
        <HeroContent />
      </div>
    </section>
  );
}