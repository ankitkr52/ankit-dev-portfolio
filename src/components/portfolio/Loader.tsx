import { useEffect, useState } from "react";

export function Loader() {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const start = performance.now();
    const dur = 1600;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setProgress(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setHidden(true), 350);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-carbon transition-transform duration-700"
      style={{
        transform: hidden ? "translateY(-100%)" : "translateY(0)",
        pointerEvents: hidden ? "none" : "auto",
      }}
      aria-hidden={hidden}
    >
      <svg
        className="animate-spin-slow mb-8"
        width="42"
        height="42"
        viewBox="0 0 42 42"
        fill="none"
      >
        <rect
          x="21"
          y="3"
          width="25"
          height="25"
          transform="rotate(45 21 3)"
          stroke="var(--ember)"
          strokeWidth="1.2"
        />
      </svg>
      <div className="h-px w-48 bg-white/10">
        <div
          className="h-full bg-ember transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-4 font-mono text-xs uppercase tracking-[0.4em] text-white/50">
        Loading {progress}
      </div>
    </div>
  );
}