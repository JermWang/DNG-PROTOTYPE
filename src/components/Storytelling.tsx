"use client";

import ScrollReveal from "./ScrollReveal";

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

export default function Storytelling() {
  return (
    <section className="relative">
      {stories.map((story, i) => (
        <div
          key={i}
          className="min-h-[85vh] flex items-center justify-center px-6 md:px-16 lg:px-24"
        >
          <div className="max-w-4xl w-full">
            <ScrollReveal delay={0.05}>
              <p className="text-[10px] tracking-[0.5em] uppercase text-white/25 mb-8 font-light">
                {story.label}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <h2 className="text-[clamp(2.5rem,7vw,6rem)] font-bold leading-[1] tracking-[-0.03em] whitespace-pre-line mb-8">
                {story.headline}
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="text-base md:text-lg text-white/40 max-w-lg leading-relaxed font-light">
                {story.description}
              </p>
            </ScrollReveal>

            {i < stories.length - 1 && (
              <ScrollReveal delay={0.45}>
                <div className="mt-20 w-12 h-px bg-white/10" />
              </ScrollReveal>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}
