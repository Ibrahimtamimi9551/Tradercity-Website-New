import ProblemAwarenessBackground from "./ProblemAwarenessBackground";
import ProblemAwarenessContent from "./ProblemAwarenessContent";

export default function ProblemAwareness() {
  return (
    // <section className="relative min-h-screen overflow-hidden">
     <section className="relative overflow-hidden">
    {/* <section className="relative overflow-hidden py-8"> */}
      <ProblemAwarenessBackground />

      <div className="relative z-10 w-full">
        <ProblemAwarenessContent />
      </div>
    </section>
  );
}