import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Project = {
  n: string;
  year: string;
  title: string;
  category: string;
  url?: string;
  description: string;
  tags: string[];
  accent: string;
  pattern: "grid" | "circles" | "diagonals" | "mesh" | "dots";
};

const PROJECTS: Project[] = [
  {
    n: "01",
    year: "2025",
    title: "LuxeBook",
    category: "Full-Stack · Production",
    url: "https://github.com/ankitkr52/Hotel-booking-website",
    description:
      "Production hotel booking platform with multi-role guest + admin support, Stripe payments, email notifications, and sub-2s loads at 100+ concurrent sessions.",
    tags: ["React", "Node.js", "MongoDB", "Stripe", "Clerk", "Vercel"],
    accent: "#f37512",
    pattern: "grid",
  },
  {
    n: "02",
    year: "2025",
    title: "HireEdge",
    category: "Full-Stack · GenAI · SaaS",
    url: "https://github.com/ankitkr52/HireEdge",
    description:
      "AI-powered SaaS that analyses resumes against any job description — skill gaps, technical questions, day-wise prep roadmap via Gemini 2.0 Flash.",
    tags: ["React", "Node.js", "MongoDB", "Gemini AI", "JWT", "Zod"],
    accent: "#b91c1c",
    pattern: "circles",
  },
  {
    n: "03",
    year: "2024",
    title: "Melt Chocolate",
    category: "Frontend · Animation",
    url: "https://meltchocolate-page.netlify.app/",
    description:
      "Cinematic landing page for a premium chocolate brand. Buttery GSAP scroll and Lenis inertia crafted to match the product.",
    tags: ["React", "Tailwind", "GSAP", "Lenis", "Netlify"],
    accent: "#7B3F00",
    pattern: "diagonals",
  },
  {
    n: "04",
    year: "2024",
    title: "Agency AI",
    category: "Frontend · Framer Motion",
    url: "https://agency4a.netlify.app/",
    description:
      "Modern digital agency site with immersive hover effects, Framer Motion animations, and a live contact form wired straight to the admin inbox.",
    tags: ["React", "Tailwind", "Framer Motion", "EmailJS"],
    accent: "#F2F2EC",
    pattern: "mesh",
  },
  {
    n: "05",
    year: "2024",
    title: "Healthcare Clinic",
    category: "Freelance · Production",
    description:
      "Fully responsive clinic site delivered in 3 days with zero revisions. 40% load-speed gain via lazy loading and code splitting. WCAG compliant.",
    tags: ["React", "Tailwind", "Vercel"],
    accent: "#2A9D8F",
    pattern: "dots",
  },
];

function Pattern({ kind, color }: { kind: Project["pattern"]; color: string }) {
  const common = "absolute inset-0 opacity-70 mix-blend-screen";
  if (kind === "grid")
    return (
      <div
        className={common}
        style={{
          backgroundImage: `linear-gradient(${color}33 1px, transparent 1px), linear-gradient(90deg, ${color}33 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />
    );
  if (kind === "circles")
    return (
      <svg className={common} viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
        {[...Array(10)].map((_, i) => (
          <circle key={i} cx="200" cy="200" r={20 + i * 18} stroke={color} strokeOpacity={0.35} fill="none" />
        ))}
      </svg>
    );
  if (kind === "diagonals")
    return (
      <div
        className={common}
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, ${color}33 0 1px, transparent 1px 18px)`,
        }}
      />
    );
  if (kind === "mesh")
    return (
      <div
        className={common}
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, ${color}22 0 1px, transparent 1px 14px), repeating-linear-gradient(90deg, ${color}22 0 1px, transparent 1px 14px)`,
        }}
      />
    );
  return (
    <div
      className={common}
      style={{
        backgroundImage: `radial-gradient(${color}55 1.2px, transparent 1.6px)`,
        backgroundSize: "20px 20px",
      }}
    />
  );
}

function Card({ p, i, total }: { p: Project; i: number; total: number }) {
  const inner = (
    <div className="group relative h-[58vh] min-h-[440px] w-[78vw] max-w-[560px] shrink-0 overflow-hidden rounded-2xl bg-graphite md:w-[42vw]">
      <div className="absolute inset-0 corner-bracket" />
      <Pattern kind={p.pattern} color={p.accent} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

      <div className="relative z-10 flex h-full flex-col justify-between p-7">
        <div className="flex items-start justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/60">
            {p.n} / {String(total).padStart(2, "0")} · {p.year}
          </span>
          <span className="rounded-full border border-white/15 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-white/70">
            {p.category}
          </span>
        </div>

        <div>
          <h3
            className="font-display text-5xl leading-[0.95] text-bone md:text-6xl"
            style={{ textShadow: "0 6px 30px rgba(0,0,0,0.4)" }}
          >
            {p.title}
          </h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70 line-clamp-2">{p.description}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {p.tags.map((t) => (
              <span key={t} className="rounded-full border border-white/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-white/60">
                {t}
              </span>
            ))}
          </div>
          <div className="mt-5 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ember">
            {p.url ? "Live project →" : "Case study soon →"}
          </div>
        </div>
      </div>
    </div>
  );

  return p.url ? (
    <a href={p.url} target="_blank" rel="noopener noreferrer" data-cursor="view" className="contents">
      {inner}
    </a>
  ) : (
    <div data-cursor="view">{inner}</div>
  );
}

export function Projects() {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(max-width: 1024px)").matches) return;
    const track = trackRef.current;
    const section = sectionRef.current;
    if (!track || !section) return;

    const ctx = gsap.context(() => {
      const distance = () => track.scrollWidth - window.innerWidth + 80;
      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
      return () => tween.kill();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={sectionRef} className="relative isolate overflow-hidden bg-carbon py-24 lg:py-0 lg:min-h-screen">
      <div className="absolute inset-0 industrial-grid opacity-30" />
      <div className="vignette" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col px-6 lg:h-screen lg:py-24">
        <div className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-ember">— Selected Work / 03</div>
            <h2 className="mt-4 font-display text-5xl leading-[1.05] text-bone md:text-6xl">
              Five products,
              <br />
              <span className="italic text-ember">shipped and live.</span>
            </h2>
          </div>
          <p className="max-w-sm font-mono text-[11px] uppercase tracking-[0.22em] text-white/45">
            Scroll → horizontally
          </p>
        </div>

        <div className="flex-1 overflow-x-auto lg:overflow-visible">
          <div ref={trackRef} className="flex items-center gap-6 pb-6 lg:pb-0">
            {PROJECTS.map((p) => (
              <Card key={p.n} p={p} i={Number(p.n)} total={PROJECTS.length} />
            ))}
            <div className="glass corner-bracket flex h-[58vh] min-h-[440px] w-[60vw] max-w-[380px] shrink-0 flex-col items-center justify-center rounded-2xl border-ember/30 p-8 text-center md:w-[28vw]">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-ember">Next up</div>
              <h3 className="mt-4 font-display text-4xl text-bone">More on <br /><span className="italic text-ember">the way →</span></h3>
              <p className="mt-4 text-xs text-white/55">New launches landing in 2025.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}