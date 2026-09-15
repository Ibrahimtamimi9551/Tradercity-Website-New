export default function TraderSolutionBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{
        background: [
          // 1. Outgoing subtle maroon carryover from Section 02 fading out
          "radial-gradient(ellipse 70% 30% at 50% -5%, rgba(120, 18, 42, 0.07), transparent 55%)",
          // 2. Primary TraderCity solution blue ambient glow
          "radial-gradient(ellipse 70% 40% at 50% 18%, rgba(59, 130, 246, 0.10), transparent 58%)",
          // 3. Lower left blue aura
          "radial-gradient(ellipse 40% 35% at 0% 70%, rgba(59, 130, 246, 0.06), transparent 50%)",
          "#020617",
        ].join(", "),
      }}
      aria-hidden
    />
  );
}
