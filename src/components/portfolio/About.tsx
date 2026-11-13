import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const STACK = [
  { label: "Languages", items: ["JavaScript (ES6+)", "TypeScript", "Python"] },
  { label: "Frontend", items: ["React.js", "Next.js", "HTML5", "CSS3", "Tailwind CSS", "GSAP", "Lenis"] },
  { label: "Backend", items: ["Node.js", "Express.js", "REST API Design", "JWT Auth", "Bcrypt", "Zod Validation"] },
  { label: "Database", items: ["MongoDB", "Mongoose ODM", "MongoDB Atlas"] },
  { label: "System Design", items: ["Monolithic & Microservices", "Load Balancing", "Caching", "Redis"] },
  { label: "DevOps & Tools", items: ["Git", "GitHub", "Docker", "Postman", "Vercel", "Netlify", "VPS (Hostinger)", "PM2", "GitHub Actions (CI/CD)"] },
  { label: "Integrations", items: ["Razorpay", "Stripe", "Nodemailer", "Brevo", "Google Gemini AI", "Multer", "pdf-parse", "Clerk", "Cloudinary"] },
];

const STATS = [
  { val: 2, suffix: "", label: "Live Production Apps" },
  { val: 150, suffix: "+", label: "DSA Problems (LeetCode)" },
  { val: 3, suffix: "", label: "Months MERN Internship" },
  { val: 100, suffix: "%", label: "Responsive, Device-Tested" },
];

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
                Based in India / Open to Full-Time SDE & Full-Stack Roles
                <br />
                Sarvepalli Radhakrishnan University · CSE 2026
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
                I'm a Computer Science &amp; Engineering graduate (Class of 2026) from Sarvepalli Radhakrishnan University
                (RKDF Institute of Science &amp; Technology), Bhopal. I'm a full-stack MERN developer who ships
                production-grade web apps — not toy projects. I build with real users, real payment flows, and real
                deployment pipelines. I care about reliability, security, clean REST API design, and the end user.
              </p>
            </div>

            <div className="mt-10 border-y border-white/10 py-7">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ember">Experience</div>
              <h3 className="mt-3 font-display text-2xl text-bone">MERN Stack Developer Intern</h3>
              <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-white/50">
                3Skill Training · Aug 2026 – Oct 2026
              </div>
              <ul className="mt-5 space-y-3 text-sm leading-relaxed text-white/65">
                <li>Built a full-stack real-estate admin dashboard with secure, role-based admin access for listings, enquiries, and user data.</li>
                <li>Set up a dedicated MongoDB Atlas cluster (AWS, Mumbai) with a normalised schema for reliable multi-collection CRUD.</li>
                <li>Developed Express.js + Mongoose REST APIs for the listing lifecycle, cutting manual admin effort by ~55%.</li>
              </ul>
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

      </div>
    </section>
  );
}