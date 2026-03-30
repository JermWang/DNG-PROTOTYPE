"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ScrollReveal from "./ScrollReveal";

export default function VisualBreak() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.3, 1, 1, 0.3]
  );

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1.05]);

  return (
    <section
      ref={ref}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Cinematic gradient background */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at 50% 50%, rgba(255,255,255,0.04) 0%, transparent 70%),
            radial-gradient(ellipse 100% 80% at 30% 60%, rgba(120,80,255,0.03) 0%, transparent 50%),
            radial-gradient(ellipse 100% 80% at 70% 40%, rgba(255,60,20,0.02) 0%, transparent 50%),
            linear-gradient(180deg, #030303 0%, #0a0a0a 30%, #080808 70%, #030303 100%)
          `,
          scale,
        }}
      />
      {/* Horizontal accent lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center px-6 max-w-5xl"
      >
        <ScrollReveal>
          <h2 className="text-[clamp(2.2rem,6vw,5.5rem)] font-bold leading-[1.1] tracking-[-0.02em]">
            This isn&apos;t evolution.
            <br />
            <span className="text-white/25">This is replacement.</span>
          </h2>
        </ScrollReveal>
      </motion.div>
    </section>
  );
}
