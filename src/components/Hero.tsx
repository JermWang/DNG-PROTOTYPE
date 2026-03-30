"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=1920&q=90&auto=format&fit=crop";

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex items-end justify-center overflow-hidden bg-black">
      {/* Car photo */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute inset-0"
      >
        <Image
          src={HERO_IMAGE}
          alt="Volterra E1"
          fill
          priority
          className="object-cover object-center"
        />
      </motion.div>

      {/* Gradient overlays for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent pointer-events-none" />

      {/* Text content — bottom-aligned */}
      <div className="relative z-10 text-center px-6 pb-24 w-full max-w-5xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-[11px] tracking-[0.5em] uppercase text-white/60 mb-6 font-light"
        >
          Introducing
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.4,
            delay: 0.7,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="text-[clamp(3.5rem,12vw,10rem)] font-bold leading-[0.85] tracking-[-0.04em]"
        >
          VOLTERRA E1
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 1,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="text-sm md:text-base tracking-[0.25em] text-white/50 font-light mt-6 uppercase"
        >
          Electric Performance Redefined
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent"
        />
      </motion.div>
    </section>
  );
}
