import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { scrollToId } from "./SmoothScroll";

const LINKS = [
  { n: "01", id: "work", label: "Work" },
  { n: "02", id: "services", label: "Services" },
  { n: "03", id: "about", label: "About" },
  { n: "04", id: "contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
        <nav
          className={`flex w-full max-w-6xl items-center justify-between transition-all duration-500 ${
            scrolled
              ? "glass rounded-full px-4 py-2 ember-glow"
              : "rounded-full px-4 py-3"
          }`}
        >
          <button
            onClick={() => scrollToId("hero")}
            className="flex items-center gap-3 text-bone"
          >
            <svg
              className="animate-spin-slow"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
            >
              <rect
                x="9"
                y="1"
                width="11"
                height="11"
                transform="rotate(45 9 1)"
                stroke="var(--ember)"
                strokeWidth="1"
              />
            </svg>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em]">
              Ankit Kumar <span className="text-white/40">/ Portfolio</span>
            </span>
          </button>

          <ul className="hidden items-center gap-7 md:flex">
            {LINKS.map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => scrollToId(l.id)}
                  className="group flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-white/70 transition hover:text-bone"
                >
                  <span className="text-ember/80">{l.n}</span>
                  <span>{l.label}</span>
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={() => scrollToId("contact")}
            className="ember-sweep hidden rounded-full bg-bone px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-carbon transition hover:bg-ember hover:text-bone md:inline-block"
          >
            Hire Me →
          </button>

          <button
            className="md:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5 text-bone" />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex flex-col bg-carbon/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex items-center justify-between p-6">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone">
                Menu
              </span>
              <button onClick={() => setOpen(false)} aria-label="Close menu">
                <X className="h-6 w-6 text-bone" />
              </button>
            </div>
            <ul className="flex flex-1 flex-col justify-center gap-6 px-8">
              {LINKS.map((l, i) => (
                <motion.li
                  key={l.id}
                  initial={{ x: -40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <button
                    onClick={() => {
                      setOpen(false);
                      setTimeout(() => scrollToId(l.id), 250);
                    }}
                    className="flex items-baseline gap-4 text-left"
                  >
                    <span className="font-mono text-xs text-ember">{l.n}</span>
                    <span className="font-display text-5xl text-bone">{l.label}</span>
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}