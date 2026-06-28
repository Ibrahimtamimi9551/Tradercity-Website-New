import EcosystemLiteBackground from "../ecosystem-lite/EcosystemLiteBackground";

export default function ProblemAwarenessBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">

      {/* Reuse Ecosystem Lite background */}
      <EcosystemLiteBackground />

      {/* Problem Awareness specific effects go here later */}

    </div>
  );
}