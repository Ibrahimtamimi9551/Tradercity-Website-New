import Section9Background from "./Section9Background";
import Section9Content from "./Section9Content";

export default function Section9() {
  return (
    <section className="relative overflow-hidden">
      <Section9Background />

      <div className="relative z-10 w-full">
        <Section9Content />
      </div>
    </section>
  );
}

// import Section9Content from "./Section9Content";

// export default function Section9() {
//   return (
//     <section
//       className="relative min-h-screen"
//       style={{
//         background: "blue",
//         border: "10px solid yellow",
//       }}
//     >
//       <Section9Content />
//     </section>
//   );
// }