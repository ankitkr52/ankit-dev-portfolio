import { useRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { motion } from "framer-motion";

interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "ref"> {
  variant?: "primary" | "ghost";
  children: ReactNode;
}

export function MagneticButton({ children, variant = "primary", className = "", ...rest }: Props) {
  const ref = useRef<HTMLButtonElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.3;
    const y = (e.clientY - r.top - r.height / 2) * 0.3;
    el.style.transform = `translate(${Math.max(-12, Math.min(12, x))}px, ${Math.max(-12, Math.min(12, y))}px)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };

  const base =
    "ember-sweep relative inline-flex items-center gap-2 rounded-full px-6 py-3 font-mono text-[12px] uppercase tracking-[0.18em] transition-[transform,background,color] duration-300 ease-out";
  const skin =
    variant === "primary"
      ? "bg-ember text-carbon hover:bg-ember/90"
      : "border border-white/20 text-bone hover:border-ember hover:bg-ember hover:text-carbon";

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={`${base} ${skin} ${className}`}
      {...(rest as any)}
    >
      {children}
    </motion.button>
  );
}