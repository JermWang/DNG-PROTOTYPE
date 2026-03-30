"use client";

import {
  motion,
  useMotionValue,
  useTransform,
  useMotionTemplate,
  animate,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

/* ── Sporty EV side-profile silhouette ── */
function CarSilhouette({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 380"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Body shell */}
      <path
        d="
          M 75 300
          L 75 272
          C 75 262 82 248 100 242
          L 240 210
          C 258 205 270 192 285 176
          L 365 115
          C 382 100 405 90 432 84
          L 545 72
          C 570 70 600 68 635 68
          L 760 70
          C 795 72 825 78 850 90
          L 915 118
          C 935 128 952 142 962 156
          L 1015 218
          C 1028 236 1048 248 1075 254
          L 1105 260
          C 1118 264 1125 275 1125 286
          L 1125 300
          C 1125 300 1100 300 1085 300
          C 1058 300 1042 290 1025 272
          C 1005 252 988 242 965 240
          C 935 238 915 248 895 268
          C 878 288 860 300 832 300
          L 372 300
          C 345 300 328 290 310 272
          C 292 252 275 242 252 240
          C 225 238 205 248 188 268
          C 170 288 152 300 125 300
          Z
        "
        fill="currentColor"
      />
      {/* Front windshield */}
      <path
        d="
          M 395 112
          L 455 88
          C 472 82 495 78 525 74
          L 655 70
          C 678 69 688 74 688 88
          L 688 150
          C 688 156 682 160 676 160
          L 408 148
          C 398 147 392 140 395 130
          Z
        "
        fill="currentColor"
        opacity="0.2"
      />
      {/* Rear window */}
      <path
        d="
          M 708 72
          L 775 80
          C 798 86 818 98 834 112
          L 878 152
          C 884 158 878 164 868 164
          L 708 156
          C 702 156 698 150 698 144
          L 698 80
          C 698 72 704 70 708 72
          Z
        "
        fill="currentColor"
        opacity="0.2"
      />
      {/* Body crease line */}
      <path
        d="M 128 262 C 320 238 520 230 600 230 C 680 230 880 238 1072 262"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.15"
      />
      {/* Headlight */}
      <path d="M 1088 248 L 1118 254 L 1118 272 L 1095 270 Z" fill="currentColor" opacity="0.5" />
      {/* Tail light */}
      <path d="M 90 258 L 112 248 L 115 270 L 92 275 Z" fill="currentColor" opacity="0.5" />
      {/* Door seam */}
      <line x1="580" y1="160" x2="575" y2="295" stroke="currentColor" strokeWidth="0.8" opacity="0.08" />
      {/* Front wheel */}
      <circle cx="252" cy="272" r="40" fill="none" stroke="currentColor" strokeWidth="3" />
      <circle cx="252" cy="272" r="28" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
      <circle cx="252" cy="272" r="15" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
      <circle cx="252" cy="272" r="5" fill="currentColor" opacity="0.4" />
      {/* Rear wheel */}
      <circle cx="965" cy="272" r="40" fill="none" stroke="currentColor" strokeWidth="3" />
      <circle cx="965" cy="272" r="28" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
      <circle cx="965" cy="272" r="15" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
      <circle cx="965" cy="272" r="5" fill="currentColor" opacity="0.4" />
      {/* Ground reflection */}
      <ellipse cx="600" cy="318" rx="500" ry="12" fill="currentColor" opacity="0.04" />
    </svg>
  );
}

/* ── Hero Section ── */
export default function Hero() {
  const lightPos = useMotionValue(-20);
  const glowPos = useMotionValue(-20);
  const [phase, setPhase] = useState<"dark" | "sweep" | "ambient">("dark");
  const activeRef = useRef(true);

  useEffect(() => {
    activeRef.current = true;

    const run = async () => {
      // Brief darkness before reveal
      await new Promise((r) => setTimeout(r, 600));
      if (!activeRef.current) return;

      setPhase("sweep");

      // Main light sweep — reveals the car
      await animate(lightPos, 115, {
        duration: 3.5,
        ease: [0.22, 0.03, 0.26, 1],
      });
      if (!activeRef.current) return;

      setPhase("ambient");

      // Ambient glow loop
      const loop = async () => {
        while (activeRef.current) {
          glowPos.set(-20);
          await new Promise((r) => setTimeout(r, 5000));
          if (!activeRef.current) break;
          await animate(glowPos, 115, {
            duration: 6,
            ease: "easeInOut",
          });
          await new Promise((r) => setTimeout(r, 3000));
        }
      };
      loop();
    };

    run();
    return () => {
      activeRef.current = false;
    };
  }, [lightPos, glowPos]);

  /* ── Mask gradient — progressive car reveal ── */
  const mA = useTransform(lightPos, (v) => Math.max(0, v - 22));
  const mB = useTransform(lightPos, (v) => Math.max(0, v - 4));
  const mD = useTransform(lightPos, (v) => Math.min(100, v + 4));
  const mE = useTransform(lightPos, (v) => Math.min(100, v + 14));

  const carMask = useMotionTemplate`linear-gradient(90deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.14) ${mA}%, rgba(255,255,255,0.85) ${mB}%, white ${lightPos}%, rgba(255,255,255,0.85) ${mD}%, transparent ${mE}%, transparent 100%)`;

  /* ── Light beam visuals ── */
  const beamGlow = useMotionTemplate`radial-gradient(ellipse 6% 90% at ${lightPos}% 55%, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.02) 50%, transparent 100%)`;
  const beamLine = useMotionTemplate`radial-gradient(ellipse 0.8% 70% at ${lightPos}% 55%, rgba(255,255,255,0.22) 0%, transparent 100%)`;
  const floorHit = useMotionTemplate`radial-gradient(ellipse 8% 20% at ${lightPos}% 72%, rgba(255,255,255,0.06) 0%, transparent 100%)`;

  /* ── Ambient glow (after first sweep) ── */
  const ambGlow = useMotionTemplate`radial-gradient(ellipse 7% 90% at ${glowPos}% 55%, rgba(255,255,255,0.04) 0%, transparent 70%)`;
  const ambLine = useMotionTemplate`radial-gradient(ellipse 0.5% 60% at ${glowPos}% 55%, rgba(255,255,255,0.10) 0%, transparent 100%)`;

  const showText = phase === "ambient";

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#030303]">
      {/* Base atmosphere */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% 120%, rgba(255,255,255,0.015) 0%, transparent 60%),
            linear-gradient(180deg, #080808 0%, #030303 40%, #040404 100%)
          `,
        }}
      />

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ── Car silhouette — sweep reveal ── */}
      {phase === "sweep" && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center pt-[18vh]"
          style={{
            WebkitMaskImage: carMask,
            maskImage: carMask,
          }}
        >
          <CarSilhouette className="w-[80vw] max-w-[1000px] text-white/30" />
        </motion.div>
      )}

      {/* ── Car silhouette — ambient (persistent after reveal) ── */}
      {phase === "ambient" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 flex items-center justify-center pt-[18vh]"
        >
          <CarSilhouette className="w-[80vw] max-w-[1000px] text-white/[0.07]" />
        </motion.div>
      )}

      {/* ── Light beam layers (during sweep) ── */}
      {phase === "sweep" && (
        <>
          <motion.div className="absolute inset-0 pointer-events-none" style={{ background: beamGlow }} />
          <motion.div className="absolute inset-0 pointer-events-none" style={{ background: beamLine }} />
          <motion.div className="absolute inset-0 pointer-events-none" style={{ background: floorHit }} />
        </>
      )}

      {/* ── Ambient glow layers (looping) ── */}
      {phase === "ambient" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3 }}
          className="absolute inset-0 pointer-events-none"
        >
          <motion.div className="absolute inset-0" style={{ background: ambGlow }} />
          <motion.div className="absolute inset-0" style={{ background: ambLine }} />
        </motion.div>
      )}

      {/* Floor line */}
      <div className="absolute top-[72%] left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-white/[0.035] to-transparent" />

      {/* ── Text content — fades in after sweep ── */}
      <div className="relative z-10 text-center px-6 -mt-[8vh]">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={showText ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-[11px] tracking-[0.5em] uppercase text-white/35 mb-8 font-light"
        >
          Introducing
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={showText ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 1.4,
            delay: 0.15,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="text-[clamp(3.5rem,12vw,11rem)] font-bold leading-[0.85] tracking-[-0.04em]"
        >
          VOLTERRA E1
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={showText ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 1,
            delay: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="text-sm md:text-base tracking-[0.25em] text-white/40 font-light mt-8 uppercase"
        >
          Electric Performance Redefined
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scaleY: 0 }}
          animate={showText ? { opacity: 1, scaleY: 1 } : {}}
          transition={{ duration: 1, delay: 1, ease: "easeOut" }}
          className="mt-20 origin-top"
        >
          <div className="w-px h-20 bg-gradient-to-b from-white/20 to-transparent mx-auto" />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={showText ? { opacity: 1 } : {}}
        transition={{ delay: 1.8, duration: 1 }}
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
