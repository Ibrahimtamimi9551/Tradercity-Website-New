import Section8Background from "./Section8Background";
import Section8Content from "./Section8Content";

export default function Section8() {
  return (
    <section className="relative overflow-hidden">
      <Section8Background />

      <div className="relative z-10 w-full">
        <Section8Content />
      </div>
    </section>
  );
}