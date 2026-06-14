// import Ecosystem from "@/components/home/Ecosystem";

// export default function Home() {
//   return <Ecosystem />;
// }

//import HeroBackground from "@/components/home/HeroBackground";
// import EcosystemLite from "@/components/home/EcosystemLite";

// export default function Page() {
//   return (
//     <main>
//      {/* <HeroBackground /> */}
//       <EcosystemLite />
//     </main>
//   );
// }


import Hero from "@/components/home/hero/Hero";
// import EcosystemLite from "@/components/home/ecosystem-lite/EcosystemLite";
import Section3 from "@/components/home/section3/Section3";
import Section4 from "@/components/home/section4/Section4";
import Section5 from "@/components/home/section5/Section5";
import Section6 from "@/components/home/section6/Section6"; 
import Section7 from "@/components/home/section7/Section7";
import Section8 from "@/components/home/section8/Section8";
// import Section9 from "@/components/home/section9/Section9";
// import Section10 from "@/components/home/section10/Section10";
// import Section11 from "@/components/home/section11/Section11";
// import Section12 from "@/components/home/section12/Section12";
import Pricing from "@/components/pricing/Pricing";

export default function Page() {
  return (
    <main>
      <Hero />
      {/* <EcosystemLite /> */}
      <Section3 />
      <Section4 />
      <Section5 />
      <Section6 /> 
      <Section7 />
      <Section8 />
      {/* <Section9 /> */}
      {/* <Section10 /> */}
      {/* <Section11 /> */}
      {/* <Section12 /> */}
      <Pricing />
    </main>
  );
}

// export default function Page() {
//   return (
//     <div
//       style={{
//         background: "red",
//         color: "white",
//         fontSize: "80px",
//         height: "100vh",
//       }}
//     >
//       APP ROUTER TEST
//     </div>
//   );
// }

// import Hero from "@/components/home/Hero";

// export default function Page() {
//   return <Hero />;
// }