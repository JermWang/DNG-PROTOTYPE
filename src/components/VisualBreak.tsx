"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";

const line1Words = ["This", " ", "isn't", " ", "evolution."];
const line2Words = ["This", " ", "is", " ", "replacement."];

export default function VisualBreak() {
  const ref = useRef(null);
  const textRef = useRef(null);
  const isInView = useInView(textRef, { once: true, margin: "-20%" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1.05]);
  const textY = useTransform(scrollYProgress, [0, 1], [30, -30]);

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

      {/* Moving light streak */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(ellipse 2% 80% at -10% 50%, rgba(255,255,255,0.06) 0%, transparent 100%)",
            "radial-gradient(ellipse 2% 80% at 110% 50%, rgba(255,255,255,0.06) 0%, transparent 100%)",
          ],
        }}
        transition={{ duration: 8, ease: "easeInOut", repeat: Infinity, repeatDelay: 3 }}
      />

      {/* Horizontal accent lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />

      {/* Content — word-by-word reveal with blur */}
      <motion.div
        ref={textRef}
        style={{ opacity, y: textY }}
        className="relative z-10 text-center px-6 max-w-5xl"
      >
        <h2 className="text-[clamp(2.2rem,6vw,5.5rem)] font-bold leading-[1.1] tracking-[-0.02em]">
          {line1Words.map((word, i) => (
            <motion.span
              key={`l1-${i}`}
              initial={{ opacity: 0, y: 25, filter: "blur(10px)" }}
              animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="inline-block"
            >
              {word}
            </motion.span>
          ))}
          <br />
          {line2Words.map((word, i) => (
            <motion.span
              key={`l2-${i}`}
              initial={{ opacity: 0, y: 25, filter: "blur(10px)" }}
              animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{
                duration: 0.6,
                delay: 0.4 + i * 0.08,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="inline-block text-white/25"
            >
              {word}
            </motion.span>
          ))}
        </h2>
      </motion.div>
    </section>
  );
}
