import { useEffect, useRef, useState } from "react";

const MARQUEE = "Open to Full-Time Roles  ·  Available for Freelance  ·  MERN Stack Engineer  ·  Let's Ship Something Great  ·  ";

export function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.4);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.max(0, Math.min(1, 1 - r.top / vh));
      setScale(0.4 + progress * 0.6);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <footer className="relative isolate overflow-hidden bg-carbon pt-24">
      <div className="vignette" />

      <div className="relative overflow-hidden border-y border-white/10 py-6">
        <div className="flex animate-marquee whitespace-nowrap font-display text-5xl text-bone md:text-7xl">
          <span className="px-4">{MARQUEE.repeat(4)}</span>
          <span className="px-4" aria-hidden>{MARQUEE.repeat(4)}</span>
        </div>
      </div>

      <div ref={ref} className="relative my-16 flex justify-center overflow-hidden px-2">
        <h2
          className="font-display font-bold leading-none text-bone transition-transform duration-300 ease-out"
          style={{ fontSize: "clamp(4rem, 20vw, 18rem)", transform: `scale(${scale})`, transformOrigin: "center" }}
        >
          Ankit <span className="italic text-ember">Kumar</span>
        </h2>
      </div>

      <div className="mx-auto h-px max-w-7xl bg-gradient-to-r from-transparent via-ember/60 to-transparent" />

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 font-mono text-[11px] uppercase tracking-[0.18em] text-white/50 md:flex-row">
        <span>© 2025 Ankit Kumar · All rights reserved</span>
        <span className="flex items-center gap-4">
          Built with React · Deployed on Vercel
          <span className="flex items-center gap-1.5">
            <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-green-500" /> Open to Work
          </span>
        </span>
      </div>
    </footer>
  );
}