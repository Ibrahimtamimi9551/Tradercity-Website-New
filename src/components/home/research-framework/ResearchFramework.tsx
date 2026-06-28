import ResearchFrameworkBackground from "./ResearchFrameworkBackground";
import ResearchFrameworkContent from "./ResearchFrameworkContent";

export default function ResearchFramework() {
  return (
    <section className="relative overflow-hidden">
      <ResearchFrameworkBackground />

      <div className="relative z-10 w-full">
        <ResearchFrameworkContent />
      </div>
    </section>
  );
}