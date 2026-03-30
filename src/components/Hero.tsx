"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#030303]">
      {/* Layered gradient background — premium automotive feel */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% 120%, rgba(255,255,255,0.03) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 50% 0%, rgba(255,255,255,0.02) 0%, transparent 50%),
            radial-gradient(ellipse 120% 80% at 20% 80%, rgba(100,100,255,0.015) 0%, transparent 50%),
            radial-gradient(ellipse 120% 80% at 80% 80%, rgba(255,100,50,0.01) 0%, transparent 50%),
            linear-gradient(180deg, #0a0a0a 0%, #030303 40%, #050505 100%)
          `,
        }}
      />
      {/* Subtle noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      {/* Top edge subtle light line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-[11px] tracking-[0.5em] uppercase text-white/35 mb-8 font-light"
        >
          Introducing
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.4,
            delay: 0.2,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="text-[clamp(3.5rem,12vw,11rem)] font-bold leading-[0.85] tracking-[-0.04em]"
        >
          VOLTERRA E1
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.2,
            delay: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="text-sm md:text-base tracking-[0.25em] text-white/40 font-light mt-8 uppercase"
        >
          Electric Performance Redefined
        </motion.p>

        {/* Decorative line */}
        <motion.div
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
          className="mt-24 origin-top"
        >
          <div className="w-px h-24 bg-gradient-to-b from-white/20 to-transparent mx-auto" />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="text-[10px] tracking-[0.4em] uppercase text-white/15 font-light"
        >
          Scroll
        </motion.span>
      </motion.div>
    </section>
  );
}
