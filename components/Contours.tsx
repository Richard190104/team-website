// Topografické vrstevnice – generované deterministicky (bez knižníc).
function ring(r: number, k: number, cx: number) {
  const pts: string[] = [];
  const N = 90;
  for (let i = 0; i <= N; i++) {
    const a = (i / N) * Math.PI * 2;
    const w = 1 + 0.12 * Math.sin(a * 3 + k * 0.35) + 0.07 * Math.sin(a * 5 - k * 0.2) + 0.04 * Math.cos(a * 7 + k);
    const x = cx + Math.cos(a) * r * w * 1.25;
    const y = 300 + Math.sin(a) * r * w * 0.9;
    pts.push(`${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return pts.join("") + "Z";
}

export default function Contours({ seed = 0, rings = 16 }: { seed?: number; rings?: number }) {
  const cx = seed % 2 ? 620 : 180;
  return (
    <svg className="contours" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" aria-hidden>
      {Array.from({ length: rings }, (_, i) => (
        <path key={i} d={ring(24 + i * 22, i + seed * 5, cx)} />
      ))}
    </svg>
  );
}
