export default function ProblemAwarenessBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{
        background: [
          // 1. Hero blue dissolve — dark, narrow, fades quickly at top edge only
          //    Kept very dim (0.06) and contained within the first ~8% of the section
          "radial-gradient(ellipse 50% 15% at 50% 0%, rgba(30, 64, 130, 0.06), transparent 40%)",
          // 2. Concentrated deep burgundy/maroon glow around the main heading area
          "radial-gradient(ellipse 55% 45% at 26% 22%, rgba(145, 24, 52, 0.22), transparent 65%)",
          // 3. Low-intensity subtle maroon tint across middle section
          "radial-gradient(ellipse 85% 50% at 48% 30%, rgba(95, 14, 32, 0.08), transparent 70%)",
          // 4. Seamless vertical base: near-black with subtle maroon mid-tone
          "linear-gradient(to bottom, #020617 0%, #040310 8%, #060206 25%, #050205 60%, #03040f 88%, #020617 100%)",
        ].join(", "),
      }}
      aria-hidden
    />
  );
}
