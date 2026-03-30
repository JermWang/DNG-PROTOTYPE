"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

type Mode = "ECO" | "SPORT" | "EXTREME";

const modeConfig: Record<
  Mode,
  {
    color: string;
    hp: number;
    torque: number;
    topSpeed: number;
    range: number;
    tagline: string;
  }
> = {
  ECO: {
    color: "#00ff88",
    hp: 600,
    torque: 480,
    topSpeed: 155,
    range: 420,
    tagline: "Maximum Efficiency",
  },
  SPORT: {
    color: "#ff8800",
    hp: 900,
    torque: 680,
    topSpeed: 185,
    range: 350,
    tagline: "Balanced Performance",
  },
  EXTREME: {
    color: "#ff0044",
    hp: 1200,
    torque: 860,
    topSpeed: 210,
    range: 280,
    tagline: "Unrestricted Power",
  },
};

function AnimatedValue({ value, color }: { value: number; color: string }) {
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={value}
        initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ color }}
        className="inline-block"
      >
        {value.toLocaleString()}
      </motion.span>
    </AnimatePresence>
  );
}

export default function PowerMode() {
  const [mode, setMode] = useState<Mode>("SPORT");
  const config = modeConfig[mode];

  const stats = [
    { label: "Horsepower", value: config.hp, unit: "HP" },
    { label: "Torque", value: config.torque, unit: "lb-ft" },
    { label: "Top Speed", value: config.topSpeed, unit: "mph" },
    { label: "Range", value: config.range, unit: "mi" },
  ];

  return (
    <section className="min-h-screen flex items-center justify-center px-6 md:px-16 py-32">
      <div className="max-w-5xl w-full">
        <ScrollReveal>
          <p className="text-[10px] tracking-[0.5em] uppercase text-white/60 mb-4 text-center font-light">
            Drive Configuration
          </p>
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-bold text-center tracking-[-0.02em] mb-16">
            Power Mode
          </h2>
        </ScrollReveal>

        {/* Mode Toggle Buttons */}
        <ScrollReveal delay={0.15}>
          <div className="flex justify-center gap-3 mb-20">
            {(Object.keys(modeConfig) as Mode[]).map((m) => {
              const isActive = mode === m;
              const c = modeConfig[m].color;
              return (
                <motion.button
                  key={m}
                  onClick={() => setMode(m)}
                  className="relative px-7 py-3 text-xs tracking-[0.25em] uppercase font-medium rounded-full cursor-pointer"
                  style={{
                    color: isActive ? "#000" : c,
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: isActive ? c : c + "30",
                    background: isActive ? c : "transparent",
                    boxShadow: isActive ? `0 0 30px ${c}25` : "none",
                  }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: `0 0 40px ${c}35`,
                    borderColor: c,
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  {m}
                </motion.button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Tagline */}
        <AnimatePresence mode="wait">
          <motion.p
            key={mode + "-tagline"}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="text-center text-sm tracking-[0.2em] mb-16 font-light uppercase"
            style={{ color: config.color + "66" }}
          >
            {config.tagline}
          </motion.p>
        </AnimatePresence>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              className="text-center p-6 md:p-8 rounded-2xl cursor-default"
              animate={{
                borderColor: config.color + "12",
                backgroundColor: config.color + "04",
                boxShadow: `inset 0 1px 0 ${config.color}08`,
              }}
              whileHover={{
                y: -6,
                borderColor: config.color + "30",
                backgroundColor: config.color + "0a",
                boxShadow: `0 8px 32px ${config.color}12, inset 0 1px 0 ${config.color}15`,
              }}
              transition={{ duration: 0.4 }}
              style={{
                border: `1px solid ${config.color}12`,
              }}
            >
              <p className="text-[10px] tracking-[0.3em] uppercase text-white/60 mb-4 font-light">
                {stat.label}
              </p>
              <div className="text-3xl md:text-4xl font-bold mb-1 tabular-nums">
                <AnimatedValue value={stat.value} color={config.color} />
              </div>
              <p className="text-[11px] text-white/60 tracking-wider">
                {stat.unit}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Power Bar */}
        <div className="mt-16 max-w-2xl mx-auto">
          <div className="flex justify-between text-[10px] text-white/50 mb-3 tracking-[0.2em] uppercase font-light">
            <span>Power Output</span>
            <span>{Math.round((config.hp / 1200) * 100)}%</span>
          </div>
          <div className="h-[2px] bg-white/[0.04] rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              initial={false}
              animate={{
                width: `${(config.hp / 1200) * 100}%`,
                backgroundColor: config.color,
              }}
              transition={{
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
