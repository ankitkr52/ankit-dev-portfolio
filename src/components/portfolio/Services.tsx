import { useRef } from "react";
import { motion } from "framer-motion";
import { scrollToId } from "./SmoothScroll";

const SERVICES = [
  {
    n: "01",
    title: "Full-Stack Development",
    headline: "End-to-End Products",
    body: "Full-stack web application development using React, Node.js, Express, and MongoDB — from database schema design to deployed product.",
    pills: ["React", "Node.js", "MongoDB", "Express", "REST APIs"],
  },
  {
    n: "02",
    title: "Backend Engineering & APIs",
    headline: "Scalable Server Systems",
    body: "Designing and building secure, scalable REST APIs with Express.js, JWT authentication, Bcrypt hashing, and Zod schema validation.",
    pills: ["Express.js", "JWT", "Zod", "Bcrypt", "MongoDB"],
  },
  {
    n: "03",
    title: "AI & Gemini Integration",
    headline: "Intelligent Automation",
    body: "Wiring large language models into real products using Google Gemini 2.0 — structured AI outputs, resume analysis, and smart automation.",
    pills: ["Gemini 2.0", "Zod", "Node.js", "Structured Output", "API Design"],
  },
  {
    n: "04",
    title: "Authentication Systems",
    headline: "Zero-Trust Security",
    body: "Building airtight auth flows with JWT, token blacklists, bcrypt, and session management — security that never cuts corners.",
    pills: ["JWT", "Bcrypt", "MongoDB", "Express", "Sessions"],
  },
  {
    n: "05",
    title: "Freelance Web Projects",
    headline: "Launch-Ready Websites",
    body: "Complete website delivery for startups and small businesses — from scoping and wireframing to launch, with zero post-delivery revisions.",
    pills: ["React", "Tailwind", "GSAP", "Framer Motion", "Netlify"],
  },
];

function ServiceCard({ s }: { s: (typeof SERVICES)[number] }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1200px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
    el.style.setProperty("--mx", `${(e.clientX - r.left)}px`);
    el.style.setProperty("--my", `${(e.clientY - r.top)}px`);
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "perspective(1200px) rotateX(0) rotateY(0)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className="glass corner-bracket group relative overflow-hidden rounded-2xl p-7 transition-transform duration-300 will-change-transform"
      style={{
        backgroundImage:
          "radial-gradient(360px circle at var(--mx, 50%) var(--my, 50%), rgba(243,117,18,0.12), transparent 60%)",
      }}
    >
      <div className="mb-8 flex items-start justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ember">{s.n}</span>
        <svg width="18" height="18" viewBox="0 0 18 18" className="text-white/30 group-hover:text-ember transition">
          <rect x="9" y="1" width="11" height="11" transform="rotate(45 9 1)" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>
      <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">{s.title}</div>
      <h3 className="mt-2 font-display text-2xl text-bone">{s.headline}</h3>
      <p className="mt-3 text-sm leading-relaxed text-white/60">{s.body}</p>
      <div className="mt-6 flex flex-wrap gap-1.5">
        {s.pills.map((p) => (
          <span
            key={p}
            className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white/55 transition group-hover:border-ember/40 group-hover:text-bone"
          >
            {p}
          </span>
        ))}
      </div>
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.06) 50%, transparent 70%)",
        }}
      />
    </div>
  );
}

export function Services() {
  return (
    <section id="services" className="relative isolate overflow-hidden bg-carbon py-32">
      <div className="absolute inset-0 industrial-grid opacity-40" />
      <div className="vignette" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-ember">— Services / 02</div>
            <h2 className="mt-4 font-display text-5xl leading-[1.05] text-bone md:text-6xl">
              What I build,
              <br />
              <span className="italic text-ember">end to end.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-white/60">
            Five disciplines stitched into one workflow — design, frontend, backend, AI, and delivery.
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
          className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {SERVICES.map((s) => (
            <motion.div
              key={s.n}
              variants={{
                hidden: { opacity: 0, y: 40 },
                show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
              }}
            >
              <ServiceCard s={s} />
            </motion.div>
          ))}

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 40 },
              show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
            }}
            className="glass corner-bracket relative flex flex-col justify-between overflow-hidden rounded-2xl border-ember/40 p-7 ember-glow"
          >
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ember">06 / Let's talk</div>
              <h3 className="mt-6 font-display text-3xl leading-tight text-bone">
                Have a project <br /> <span className="italic text-ember">in mind?</span>
              </h3>
              <p className="mt-4 text-sm text-white/60">Let's talk about what you're building.</p>
            </div>
            <button
              onClick={() => scrollToId("contact")}
              className="ember-sweep mt-8 inline-flex items-center gap-2 self-start rounded-full bg-ember px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-carbon"
            >
              Start a conversation →
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}