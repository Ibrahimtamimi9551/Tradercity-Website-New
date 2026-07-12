export function AdminBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 bg-tc-navy">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(155,93,229,0.12),_transparent_55%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_32px] opacity-20" />
    </div>
  );
}
