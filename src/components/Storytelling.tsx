"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const stories = [
  {
    label: "Acceleration",
    headline: "0–60 in 2.1s",
    description:
      "Instant torque. Zero hesitation. The E1 rewrites the rules of acceleration with dual-motor precision.",
    image:
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=85&auto=format&fit=crop",
  },
  {
    label: "Powertrain",
    headline: "Dual Motor System",
    description:
      "Independent front and rear motors deliver surgical power distribution. Every wheel, every millisecond, optimized.",
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=85&auto=format&fit=crop",
  },
  {
    label: "Philosophy",
    headline: "Designed for Silence.\nBuilt for Impact.",
    description:
      "The absence of noise isn\u2019t emptiness \u2014 it\u2019s confidence. The E1 commands attention without asking for it.",
    image:
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&q=85&auto=format&fit=crop",
  },
];

function StoryBlock({
  story,
  index,
}: {
  story: (typeof stories)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const imgParallax = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const isReversed = index % 2 !== 0;

  return (
    <div
      ref={scrollRef}
      className="py-24 md:py-32 px-6 md:px-16 lg:px-24"
    >
      <div
        ref={ref}
        className={`max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center ${
          isReversed ? "md:[direction:rtl]" : ""
        }`}
      >
        {/* Text side */}
        <motion.div
          style={{ y: parallaxY }}
          className={isReversed ? "md:[direction:ltr]" : ""}
        >
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.8,
              delay: 0.05,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="text-[10px] tracking-[0.5em] uppercase text-white/25 mb-6 font-light"
          >
            {story.label}
          </motion.p>

          <motion.h2 className="text-[clamp(2rem,5vw,4.5rem)] font-bold leading-[1] tracking-[-0.03em] whitespace-pre-line mb-6">
            {story.headline.split(/(\s+|\n)/).map((word, wi) =>
              word === "\n" ? (
                <br key={wi} />
              ) : /^\s+$/.test(word) ? (
                <span key={wi}>{" "}</span>
              ) : (
                <motion.span
                  key={wi}
                  initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                  animate={
                    isInView
                      ? { opacity: 1, y: 0, filter: "blur(0px)" }
                      : {}
                  }
                  transition={{
                    duration: 0.7,
                    delay: 0.1 + wi * 0.04,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              )
            )}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 25, filter: "blur(4px)" }}
            animate={
              isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}
            }
            transition={{
              duration: 0.9,
              delay: 0.35,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="text-base md:text-lg text-white/40 max-w-lg leading-relaxed font-light"
          >
            {story.description}
          </motion.p>
        </motion.div>

        {/* Image side */}
        <motion.div
          style={{ y: imgParallax }}
          className={isReversed ? "md:[direction:ltr]" : ""}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{
              duration: 1,
              delay: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="relative aspect-[4/3] rounded-2xl overflow-hidden"
          >
            <Image
              src={story.image}
              alt={story.label}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
          </motion.div>
        </motion.div>
      </div>
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
