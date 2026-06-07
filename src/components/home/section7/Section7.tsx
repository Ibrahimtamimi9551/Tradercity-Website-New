// import Section7Background from "./Section7Background";
// import Section7Content from "./Section7Content";

// export default function Section7() {
//   return (
//     <section
//       id="membership"
//       className="relative overflow-hidden"
//     >
//       <Section7Background />
//       <Section7Content />
//     </section>
//   );
// }

import Section7Background from "./Section7Background";
import Section7Content from "./Section7Content";

export default function Section7() {
  return (
    <section className="relative overflow-hidden">
      <Section7Background />

      <div className="relative z-10 w-full">
        <Section7Content />
      </div>
    </section>
  );
}