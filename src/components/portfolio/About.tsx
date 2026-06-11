import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const STACK = [
  { label: "Languages", items: ["JavaScript (ES6+)", "Python", "HTML5", "CSS3"] },
  { label: "Frontend", items: ["React.js", "Next.js", "Tailwind CSS", "Framer Motion", "GSAP", "Lenis"] },
  { label: "Backend & DB", items: ["Node.js", "Express.js", "MongoDB", "Mongoose", "JWT", "Zod", "Bcrypt", "Stripe", "REST APIs"] },
  { label: "Tools & AI", items: ["Git", "GitHub", "Postman", "Vercel", "Netlify", "Clerk", "Gemini API", "Multer", "pdf-parse"] },
];

const STATS = [
  { val: 5, suffix: "", label: "Live Projects" },
  { val: 3, suffix: "", label: "Clients Served" },
  { val: 100, suffix: "%", label: "On-Time Delivery" },
  { val: 0, suffix: "", label: "Post-Delivery Revisions" },
];

const SKILLS = [
  ["React.js", 85],
  ["Node.js & Express.js", 80],
  ["MongoDB", 75],
  ["REST API Design", 85],
  ["JWT Authentication", 80],
  ["AI Integration", 70],
  ["Next.js", 65],
  ["Tailwind CSS", 90],
] as const;

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1400;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <span ref={ref} className="font-display text-5xl text-bone md:text-6xl">
      {String(n).padStart(2, "0")}
      {suffix}
    </span>
  );
}

export function About() {
  return (
    <section id="about" className="relative isolate overflow-hidden bg-carbon py-32">
      <div className="absolute inset-0 industrial-grid opacity-40" />
      <div className="absolute right-0 top-32 h-[420px] w-[420px] rounded-full bg-ember/10 blur-[140px]" />
      <div className="vignette" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-16">
          <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-ember">— About / 04</div>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2"
          >
            <div className="glass corner-bracket relative aspect-[4/5] overflow-hidden rounded-2xl p-6">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-white/50">
                <span>Profile · 001</span>
                <span className="flex items-center gap-1.5">
                  <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-green-500" />
                  Available
                </span>
              </div>

              <div className="absolute inset-0 grid place-items-center">
                <div className="absolute h-72 w-72 rounded-full bg-ember/20 blur-[80px]" />
                <div className="relative font-display text-[14rem] leading-none">
                  <span className="text-bone">A</span>
                  <span className="-ml-12 italic text-ember">K</span>
                </div>
              </div>

              <div className="absolute inset-x-6 bottom-6 font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] text-white/55">
                Based in India / Open to Full-Time Roles
                <br />
                Mahakaushal University · CS 2025
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-3">
            <h2 className="font-display text-5xl leading-[1.05] text-bone md:text-6xl">
              Engineered from scratch.
              <br />
              <span className="italic text-ember">Shipped with intention.</span>
            </h2>

            <div className="mt-8 space-y-5 text-base leading-relaxed text-white/65">
              <p>
                I'm a Computer Science graduate from Mahakaushal University, Jabalpur (Class of 2025). I build and
                ship production-grade web applications — not side projects that sit in draft, but live products with
                real users, real payment flows, and real AI pipelines.
              </p>
              <p>
                My focus is the full stack: clean React frontends, robust Express and Node.js backends, MongoDB data
                modelling, and AI integrations using Google Gemini. I don't just implement features — I think about
                scalability, security, and the user on the other end.
              </p>
              <p>
                I delivered my first freelance project — a healthcare clinic website — in 3 days with zero revisions.
                That kind of reliability is what I bring to every build.
              </p>
            </div>

            <div className="mt-10 space-y-4">
              {STACK.map((row) => (
                <div key={row.label} className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-4">
                  <div className="w-32 shrink-0 font-mono text-[10px] uppercase tracking-[0.22em] text-ember pt-1.5">
                    {row.label}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {row.items.map((it) => (
                      <span key={it} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white/65">
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-2 gap-8 border-y border-white/10 py-10 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label}>
              <Counter to={s.val} suffix={s.suffix} />
              <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/50">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 gap-x-12 gap-y-5 md:grid-cols-2">
          {SKILLS.map(([name, pct]) => (
            <div key={name}>
              <div className="mb-2 flex items-baseline justify-between">
                <span className="font-display text-base text-bone">{name}</span>
                <span className="font-mono text-[11px] text-ember">{pct}%</span>
              </div>
              <div className="h-[3px] w-full overflow-hidden bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="ember-sweep h-full bg-ember"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}