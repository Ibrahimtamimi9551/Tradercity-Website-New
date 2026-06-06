//Gpt code given for logic Background render karo + Discord render karo + Illustration render karo

import Section6Background from "./Section6Background";
import Section6Discord from "./Section6Discord";
import Section6Illustration from "./Section6Illustration";

export default function Section6() {
  return (
    <section className="relative overflow-hidden bg-[#050816]">
      <Section6Background />

      <div className="relative z-10">
        <Section6Discord />
        <Section6Illustration />
      </div> 
    </section>
  );
} 


// tum sirf Background render kar rahe ho

// import Section6Background from "./Section6Background";
// import Section6Discord from "./Section6Discord";
// // import Section6Content from "./Section6Ollustration";

// export default function Section6() {
//   return (
//     <section
//       id="community"
//       className="relative min-h-screen overflow-hidden"
//     >
//      <div className="relative z-10">
//       <Section6Background />
//       {<Section6Discord />}
//       {/* <Section6Illustration /> */}
//       </div>
//     </section>
//   );
// } 