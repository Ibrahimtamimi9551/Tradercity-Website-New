import TraderSolutionBackground from "./TraderSolutionBackground";
import TraderSolutionContent from "./TraderSolutionContent";

export default function TraderSolution() {
  return (
    // <section className="relative min-h-screen overflow-hidden">
    <section className="relative overflow-hidden">
      <TraderSolutionBackground />

      <div className="relative z-10 w-full">
        <TraderSolutionContent />
      </div>
       
       {/* <div className="w-full lg:w-[48%]">
         <Section4Illustration />
      </div> */}

    </section>
  );
}