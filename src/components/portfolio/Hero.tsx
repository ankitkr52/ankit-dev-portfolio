import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import Lottie from "lottie-react";
import { AmbientThree } from "./AmbientThree";
import { MagneticButton } from "./MagneticButton";
import { scrollToId } from "./SmoothScroll";

export function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch("https://assets10.lottiefiles.com/packages/lf20_w51pcehl.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data));
  }, []);

  useEffect(() => {
    if (!titleRef.current) return;
    const spans = titleRef.current.querySelectorAll("[data-char]");
    gsap.fromTo(
      spans,
      { y: "110%" },
      { y: "0%", duration: 1.1, ease: "expo.out", stagger: 0.025, delay: 0.4 }
    );
  }, []);

  const renderChars = (text: string, italic = false, color = "") =>
    text.split("").map((c, i) => (
      <span key={`${text}-${i}`} className="inline-block overflow-hidden align-bottom" style={{ paddingBottom: "0.12em" }}>
        <span
          data-char
          className={`inline-block ${italic ? "italic" : ""}`}
          style={{ color: color || undefined, transform: "translateY(110%)" }}
        >
          {c === " " ? "\u00A0" : c}
        </span>
      </span>
    ));

  return (
    <section id="hero" className="relative isolate min-h-screen overflow-hidden bg-carbon">
      <div className="absolute inset-0 industrial-grid opacity-60" />
      <div className="absolute -left-32 top-20 h-[420px] w-[420px] rounded-full bg-ember/20 blur-[140px]" />
      <div className="absolute -right-20 bottom-10 h-[340px] w-[340px] rounded-full bg-ember/10 blur-[120px]" />
      <div className="vignette" />

      <div className="absolute inset-x-0 top-24 z-10 flex justify-center px-6">
        <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/40">
          Ankit Kumar · Portfolio &nbsp;|&nbsp; 2024–2025 Index &nbsp;|&nbsp; Designed · Built · Shipped
        </div>
      </div>

      <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-8 px-6 pt-40 pb-24 lg:grid-cols-2 lg:pt-32">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mb-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-white/60"
          >
            <span className="h-px w-8 bg-ember" />
            Full-Stack Developer &amp; MERN Stack Engineer
          </motion.div>

          <h1
            ref={titleRef}
            className="font-display text-[14vw] font-light leading-[0.95] text-bone sm:text-7xl lg:text-[5.6rem] xl:text-[6.4rem]"
          >
            <div className="block">{renderChars("Building")}</div>
            <div className="block">{renderChars("Scalable", true, "var(--ember)")}</div>
            <div className="block">{renderChars("Web Products.")}</div>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.7 }}
            className="mt-8 max-w-xl text-base leading-relaxed text-white/65"
          >
            Computer Science graduate from Mahakaushal University, Jabalpur. I design and ship production-grade web
            applications — from clean user interfaces to scalable backend systems — with a focus on AI integrations,
            authentication, and real-world impact.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.7 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton onClick={() => scrollToId("work")}>View Projects →</MagneticButton>
            <MagneticButton variant="ghost" onClick={() => scrollToId("contact")}>
              Contact Me
            </MagneticButton>
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-white/70">
              <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-green-500" />
              Available for Hire
            </div>
          </motion.div>
        </div>

        <div className="relative aspect-square w-full max-w-xl justify-self-end lg:aspect-[4/5]">
          <div className="absolute inset-0">
            <AmbientThree />
          </div>
          <Suspense fallback={<div className="absolute inset-0 grid place-items-center font-mono text-xs uppercase tracking-widest text-white/40">Loading scene…</div>}>
            <div className="absolute inset-0 pointer-events-none">
              <Spline scene={SPLINE_SCENE} style={{ width: "100%", height: "100%", background: "transparent" }} />
            </div>
          </Suspense>
          <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/5" />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-6 z-10 px-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4 font-mono text-[11px] uppercase tracking-[0.22em] text-white/60">
          <span><span className="text-ember">05</span> Live Projects</span>
          <span className="hidden sm:inline"><span className="text-ember">06</span> Core Technologies</span>
          <span><span className="text-ember">03</span> Clients Served</span>
          <span className="hidden md:inline">Scroll ↓</span>
        </div>
      </div>

      <div className="noise-overlay" />
    </section>
  );
}