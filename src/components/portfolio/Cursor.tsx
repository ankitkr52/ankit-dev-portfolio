import { useEffect, useRef, useState } from "react";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [variant, setVariant] = useState<"default" | "hover" | "view">("default");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    setEnabled(fine);
    if (!fine) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let dx = mx, dy = my, rx = mx, ry = my;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("[data-cursor='view']")) setVariant("view");
      else if (t.closest("a, button, [data-cursor='hover']")) setVariant("hover");
      else setVariant("default");
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);

    let raf = 0;
    const tick = () => {
      dx += (mx - dx) * 0.5;
      dy += (my - dy) * 0.5;
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (dotRef.current) dotRef.current.style.transform = `translate(${dx - 4}px, ${dy - 4}px)`;
      if (ringRef.current) ringRef.current.style.transform = `translate(${rx - 16}px, ${ry - 16}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  if (!enabled) return null;

  const ringSize = variant === "view" ? 80 : variant === "hover" ? 48 : 32;
  const ringColor = variant === "default" ? "rgba(242,242,236,0.6)" : "var(--ember)";

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full"
        style={{ background: "var(--bone)", mixBlendMode: "difference" }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] flex items-center justify-center rounded-full border transition-[width,height,border-color] duration-200 ease-out"
        style={{
          width: ringSize,
          height: ringSize,
          borderColor: ringColor,
          marginLeft: (32 - ringSize) / 2,
          marginTop: (32 - ringSize) / 2,
        }}
      >
        {variant === "view" && (
          <span className="font-mono text-[10px] uppercase tracking-widest text-ember">View</span>
        )}
      </div>
    </>
  );
}