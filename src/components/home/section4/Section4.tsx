import Section4Background from "./Section4Background";
import Section4Content from "./Section4Content";
// import Section4Illustration from "./Section4Illustration";

export default function Section4() {
  return (
    // <section className="relative min-h-screen overflow-hidden">
    <section className="relative overflow-hidden">
      <Section4Background />

      <div className="relative z-10 w-full">
        <Section4Content />
      </div>
       
       {/* <div className="w-full lg:w-[48%]">
         <Section4Illustration />
      </div> */}

    </section>
  );
}