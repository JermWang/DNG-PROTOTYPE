"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

function useCountUp(
  end: number,
  duration: number = 2000,
  start: boolean = false
) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, start]);

  return count;
}

function StatCard({
  value,
  unit,
  label,
  delay,
}: {
  value: number;
  unit: string;
  label: string;
  delay: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const count = useCountUp(value, 2200, isInView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, filter: "blur(6px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.9, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{
        backgroundColor: "rgba(255,255,255,0.02)",
        y: -4,
        transition: { duration: 0.35 },
      }}
      className="text-center py-14 md:py-20 cursor-default rounded-xl transition-colors"
    >
      <motion.div
        className="text-[clamp(3rem,9vw,7.5rem)] font-bold leading-none tracking-[-0.04em]"
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {count.toLocaleString()}
        <span className="text-white/25 text-[0.35em] ml-2 font-light">
          {unit}
        </span>
      </motion.div>
      <p className="text-[10px] tracking-[0.4em] uppercase text-white/20 mt-5 font-light">
        {label}
      </p>
    </motion.div>
  );
}

export default function PerformanceStats() {
  return (
    <section className="px-6 md:px-16 py-32">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <p className="text-[10px] tracking-[0.5em] uppercase text-white/25 mb-4 text-center font-light">
            By The Numbers
          </p>
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-bold text-center tracking-[-0.02em] mb-20">
            Performance Specs
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.04] rounded-2xl overflow-hidden">
          <div className="bg-[#030303]">
            <StatCard value={1200} unit="HP" label="Peak Horsepower" delay={0} />
          </div>
          <div className="bg-[#030303]">
            <StatCard
              value={350}
              unit="MI"
              label="EPA Estimated Range"
              delay={0.15}
            />
          </div>
          <div className="bg-[#030303]">
            <StatCard
              value={18}
              unit="MIN"
              label="10–80% Fast Charge"
              delay={0.3}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
