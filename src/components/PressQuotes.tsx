"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const quotes = [
  {
    text: "The Volterra E1 isn't just fast — it's a paradigm shift in what electric performance means.",
    source: "Motor Trend",
    award: "2026 EV of the Year",
  },
  {
    text: "Silence has never felt so violent. The E1 redefines the relationship between power and restraint.",
    source: "Top Gear",
    award: "Editor's Choice",
  },
  {
    text: "From the moment you press the accelerator, you understand — this is the future, arriving ahead of schedule.",
    source: "Car and Driver",
    award: "10Best Winner",
  },
];

function QuoteCard({
  quote,
  index,
}: {
  quote: (typeof quotes)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="relative p-8 md:p-10 rounded-2xl border border-white/[0.06] bg-white/[0.02]"
    >
      <p className="text-white/80 text-base md:text-lg leading-relaxed font-light italic mb-8">
        &ldquo;{quote.text}&rdquo;
      </p>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white text-sm font-medium tracking-wide">
            {quote.source}
          </p>
          <p className="text-white/50 text-[10px] tracking-[0.2em] uppercase mt-1">
            {quote.award}
          </p>
        </div>
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.15 + 0.4 + i * 0.05, duration: 0.3 }}
              className="w-2 h-2 rounded-full bg-white/60"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function PressQuotes() {
  return (
    <section className="px-6 md:px-16 py-32">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-[10px] tracking-[0.5em] uppercase text-white/60 mb-4 font-light">
            Recognition
          </p>
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-bold tracking-[-0.02em]">
            What They&apos;re Saying
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quotes.map((quote, i) => (
            <QuoteCard key={i} quote={quote} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
