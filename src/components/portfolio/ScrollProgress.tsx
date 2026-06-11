import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? scrolled / max : 0);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <div className="pointer-events-none fixed right-4 top-1/2 z-40 hidden h-40 w-px -translate-y-1/2 bg-white/10 md:block">
      <div className="w-full origin-top bg-ember" style={{ height: `${p * 100}%` }} />
    </div>
  );
}