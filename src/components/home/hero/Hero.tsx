import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";

export default function Hero() {
  return (
    // <section className="relative overflow-hidden">
    <section className="relative overflow-hidden min-h-screen">
      {/* min-h-[140vh] */}
      <HeroBackground />

      <div className="relative z-10">
        <HeroContent />
      </div>
    </section>
  );
}