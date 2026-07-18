/**
 * Free Dashboard page atmosphere.
 * Visual treatment is frozen — keep grid/base subtle; do not restyle.
 */
export default function FreeDashboardBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-[#050308]">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px]" />
    </div>
  );
}
