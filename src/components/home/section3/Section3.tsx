import Section3Background from "./Section3Background";
import Section3Content from "./Section3Content";

export default function Section3() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <Section3Background />

      <div className="relative z-10 w-full">
        <Section3Content />
      </div>
    </section>
  );
}