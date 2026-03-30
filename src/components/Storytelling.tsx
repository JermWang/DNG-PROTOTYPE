"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";

const stories = [
  {
    label: "Acceleration",
    headline: "0–60 in 2.1s",
    description:
      "Instant torque. Zero hesitation. The E1 rewrites the rules of acceleration with dual-motor precision.",
  },
  {
    label: "Powertrain",
    headline: "Dual Motor System",
    description:
      "Independent front and rear motors deliver surgical power distribution. Every wheel, every millisecond, optimized.",
  },
  {
    label: "Philosophy",
    headline: "Designed for Silence.\nBuilt for Impact.",
    description:
      "The absence of noise isn\u2019t emptiness \u2014 it\u2019s confidence. The E1 commands attention without asking for it.",
  },
];

function StoryBlock({ story, index }: { story: typeof stories[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const headlineParallax = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <div
      ref={scrollRef}
      className="min-h-[85vh] flex items-center justify-center px-6 md:px-16 lg:px-24"
    >
      <motion.div ref={ref} className="max-w-4xl w-full" style={{ y: parallaxY }}>
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-[10px] tracking-[0.5em] uppercase text-white/25 mb-8 font-light"
        >
          {story.label}
        </motion.p>

        {/* Headline — word-by-word stagger with blur */}
        <motion.h2
          style={{ y: headlineParallax }}
          className="text-[clamp(2.5rem,7vw,6rem)] font-bold leading-[1] tracking-[-0.03em] whitespace-pre-line mb-8"
        >
          {story.headline.split(/(\s+)/).map((word, wi) => (
            <motion.span
              key={wi}
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{
                duration: 0.7,
                delay: 0.1 + wi * 0.06,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="inline-block"
            >
              {word === "\n" ? <br /> : word}
            </motion.span>
          ))}
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 25, filter: "blur(4px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-base md:text-lg text-white/40 max-w-lg leading-relaxed font-light"
        >
          {story.description}
        </motion.p>

        {/* Animated divider */}
        {index < stories.length - 1 && (
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="mt-20 w-16 h-px bg-gradient-to-r from-white/15 to-transparent origin-left"
          />
        )}
      </motion.div>
    </div>
  );
}

export default function Storytelling() {
  return (
    <section className="relative">
      {stories.map((story, i) => (
        <StoryBlock key={i} story={story} index={i} />
      ))}
    </section>
  );
}
