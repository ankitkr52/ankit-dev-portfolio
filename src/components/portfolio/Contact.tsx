import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

const SERVICE_ID = "YOUR_SERVICE_ID";
const TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const PUBLIC_KEY = "YOUR_PUBLIC_KEY";

const TYPES = ["Full-Stack App", "Backend API", "AI Integration", "Freelance Website", "Something Else"];

function Field({ label, type = "text", textarea = false, value, onChange, name, required }: {
  label: string; type?: string; textarea?: boolean; value: string;
  onChange: (v: string) => void; name: string; required?: boolean;
}) {
  const filled = value.length > 0;
  return (
    <label className="group relative block">
      <span
        className={`pointer-events-none absolute left-4 font-mono text-[11px] uppercase tracking-[0.18em] transition-all duration-300 ${
          filled ? "top-1 text-[9px] text-ember" : "top-4 text-white/40"
        } group-focus-within:top-1 group-focus-within:text-[9px] group-focus-within:text-ember`}
      >
        {label}
      </span>
      {textarea ? (
        <textarea
          name={name}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          className="block w-full resize-none rounded-xl border border-white/10 bg-white/[0.02] px-4 pb-3 pt-6 font-sans text-base text-bone outline-none transition focus:border-ember"
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 pb-3 pt-6 font-sans text-base text-bone outline-none transition focus:border-ember"
        />
      )}
    </label>
  );
}

export function Contact() {
  const [f, setF] = useState({ name: "", email: "", company: "", budget: "", message: "" });
  const [types, setTypes] = useState<string[]>([]);
  const [state, setState] = useState<"idle" | "loading" | "sent">("idle");

  const update = (k: keyof typeof f) => (v: string) => setF((p) => ({ ...p, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("loading");
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: f.name,
          from_email: f.email,
          company: f.company || "Not provided",
          budget: f.budget || "Not provided",
          project_type: types.join(", ") || "Not specified",
          message: f.message,
        },
        PUBLIC_KEY,
      );
      setState("sent");
    } catch (error) {
      console.error("EmailJS error:", error);
      setState("idle");
      alert("Something went wrong. Please email directly: ankit72p@gmail.com");
    }
  };

  return (
    <section id="contact" className="relative isolate overflow-hidden bg-carbon py-32">
      <div className="absolute inset-0 industrial-grid opacity-40" />
      <div className="absolute left-1/2 top-20 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-ember/10 blur-[160px]" />
      <div className="vignette" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-14">
          <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-ember">— Contact / 05</div>
          <h2 className="mt-4 font-display text-6xl leading-[1.02] text-bone md:text-8xl">
            Let's build
            <br />
            <span className="italic text-ember">something real.</span>
          </h2>
          <p className="mt-6 max-w-xl text-sm text-white/60">
            Open to full-time roles, freelance projects, and collaborations.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <form onSubmit={submit} className="glass corner-bracket relative space-y-4 rounded-2xl p-7">
            <Field label="Full Name *" name="name" required value={f.name} onChange={update("name")} />
            <Field label="Email Address *" name="email" type="email" required value={f.email} onChange={update("email")} />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field label="Company / Organization" name="company" value={f.company} onChange={update("company")} />
              <Field label="Budget Range" name="budget" value={f.budget} onChange={update("budget")} />
            </div>
            <Field label="Message *" name="message" textarea required value={f.message} onChange={update("message")} />

            <div>
              <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/50">Project type</div>
              <div className="flex flex-wrap gap-2">
                {TYPES.map((t) => {
                  const on = types.includes(t);
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTypes((p) => (on ? p.filter((x) => x !== t) : [...p, t]))}
                      className={`rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider transition ${
                        on
                          ? "border-ember bg-ember text-carbon"
                          : "border-white/15 text-white/70 hover:border-ember/50 hover:text-bone"
                      }`}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              disabled={state !== "idle"}
              className="ember-sweep mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ember px-6 py-3.5 font-mono text-[12px] uppercase tracking-[0.18em] text-carbon disabled:opacity-70"
            >
              {state === "idle" && "Send Message →"}
              {state === "loading" && "Sending…"}
              {state === "sent" && "✓ Message sent"}
            </button>
            {state === "sent" && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center font-mono text-[11px] uppercase tracking-[0.18em] text-green-400"
              >
                I'll get back to you within 24 hours.
              </motion.p>
            )}
          </form>

          <div className="space-y-8">
            <div>
              <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-white/45">Direct</div>
              <a
                href="mailto:ankit72p@gmail.com"
                className="block font-display text-3xl text-bone transition hover:text-ember md:text-4xl"
              >
                ankit72p@gmail.com
              </a>
              <a
                href="tel:+918292640752"
                className="mt-2 block font-display text-xl text-white/70 transition hover:text-ember"
              >
                +91 82926 40752
              </a>
            </div>

            <div>
              <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-white/45">Channels</div>
              <div className="space-y-2">
                <a
                  href="https://linkedin.com/in/ankit-kumar-2b3381355"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between border-b border-white/10 py-3 transition hover:border-ember"
                >
                  <span className="font-display text-lg text-bone">LinkedIn</span>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-white/50 group-hover:text-ember">
                    /in/ankit-kumar →
                  </span>
                </a>
                <a
                  href="https://github.com/ankitkr52"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between border-b border-white/10 py-3 transition hover:border-ember"
                >
                  <span className="font-display text-lg text-bone">GitHub</span>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-white/50 group-hover:text-ember">
                    /ankitkr52 →
                  </span>
                </a>
              </div>
            </div>

            <div className="glass corner-bracket rounded-2xl p-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-ember">Status</div>
              <dl className="mt-4 space-y-2.5 font-mono text-[11px] uppercase tracking-[0.15em]">
                {[
                  ["Currently", "Open to Full-Time Roles"],
                  ["Available", "Freelance Projects"],
                  ["Education", "Mahakaushal Univ. · CS 2025"],
                  ["Location", "India · Remote / Hybrid / On-site"],
                  ["Response", "Within 24 hours"],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between gap-4">
                    <dt className="text-white/45">{k}</dt>
                    <dd className="text-right text-bone">→ {v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}