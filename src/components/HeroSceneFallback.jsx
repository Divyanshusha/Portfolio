// Pure-CSS stand-in shown when WebGL is unavailable, so the hero still
// communicates "AI core" without requiring a 3D context.
export default function HeroSceneFallback() {
  return (
    <div
      className="relative flex h-full w-full items-center justify-center"
      role="img"
      aria-label="Stylized glowing AI core graphic"
    >
      <div className="absolute h-56 w-56 rounded-full border border-accent/30 motion-safe:animate-[spin_18s_linear_infinite]" />
      <div className="absolute h-72 w-72 rounded-full border border-electric/20 motion-safe:animate-[spin_26s_linear_infinite_reverse]" />
      <div className="absolute h-40 w-40 rounded-full bg-pass/20 blur-2xl motion-safe:animate-pulse" />
      <div className="relative h-32 w-32 rounded-full bg-gradient-to-br from-pass via-accent to-electric opacity-80 shadow-[0_0_60px_rgba(95,203,141,0.35)] motion-safe:animate-float" />
    </div>
  );
}
