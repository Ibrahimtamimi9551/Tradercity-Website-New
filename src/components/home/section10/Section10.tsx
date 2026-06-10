import Section10Background from "./Section10Background";
import Section10Content from "./Section10Content";

export default function Section10() {
  return (
    <section className="relative overflow-hidden">
      <Section10Background />

      <div className="relative z-10 w-full">
        <Section10Content />
      </div>
    </section>
  );
}