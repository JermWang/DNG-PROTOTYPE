"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const BREAK_IMAGE =
  "https://images.unsplash.com/photo-1642911041079-13c39400413e?w=1920&q=90&auto=format&fit=crop";

const line1 = ["This", " ", "isn't", " ", "evolution."];
const line2 = ["This", " ", "is", " ", "replacement."];

export default function VisualBreak() {
  const ref = useRef(null);
  const textRef = useRef(null);
  const isInView = useInView(textRef, { once: true, margin: "-20%" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
  const textY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section
      ref={ref}
      className="relative h-[80vh] flex items-center justify-center overflow-hidden"
    >
      {/* Car photo background with parallax zoom + edge fading */}
      <motion.div
        className="absolute inset-0"
        style={{
          scale: imgScale,
          maskImage: "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)",
        }}
      >
        <Image
          src={BREAK_IMAGE}
          alt="Volterra E1"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Horizontal accent lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Content — word-by-word reveal with blur */}
      <motion.div
        ref={textRef}
        style={{ y: textY }}
        className="relative z-10 text-center px-6 max-w-5xl"
      >
        <h2 className="text-[clamp(2.2rem,6vw,5.5rem)] font-bold leading-[1.1] tracking-[-0.02em]">
          {line1.map((word: string, i: number) =>
            word === " " ? (
              <span key={`l1-${i}`}>{" "}</span>
            ) : (
              <motion.span
                key={`l1-${i}`}
                initial={{ opacity: 0, y: 25, filter: "blur(10px)" }}
                animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="inline-block"
              >
                {word}
              </motion.span>
            )
          )}
          <br />
          {line2.map((word: string, i: number) =>
            word === " " ? (
              <span key={`l2-${i}`} className="text-white/50">{" "}</span>
            ) : (
              <motion.span
                key={`l2-${i}`}
                initial={{ opacity: 0, y: 25, filter: "blur(10px)" }}
                animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.4 + i * 0.08,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="inline-block text-white/50"
              >
                {word}
              </motion.span>
            )
          )}
        </h2>
      </motion.div>
    </section>
  );
}
