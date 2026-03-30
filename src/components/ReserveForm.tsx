"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import Image from "next/image";

const RESERVE_IMAGE =
  "https://images.unsplash.com/photo-1642911041553-297e5295276b?w=800&q=85&auto=format&fit=crop&crop=left";

function GlowInput({
  type,
  placeholder,
  value,
  onChange,
}: {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <motion.div
      className="relative group"
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        className="w-full px-5 py-4 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-white/20 focus:bg-white/[0.05] focus:shadow-[0_0_20px_rgba(255,255,255,0.04)] transition-all duration-500 text-sm tracking-wide"
      />
    </motion.div>
  );
}

export default function ReserveForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="px-6 md:px-16 py-32">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
        {/* Image side */}
        <ScrollReveal direction="left">
          <div
            className="relative aspect-[3/4] rounded-2xl overflow-hidden"
            style={{
              maskImage: "radial-gradient(ellipse 85% 85% at 50% 50%, black 60%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(ellipse 85% 85% at 50% 50%, black 60%, transparent 100%)",
            }}
          >
            <Image
              src={RESERVE_IMAGE}
              alt="Volterra E1"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/10" />
          </div>
        </ScrollReveal>

        {/* Form side */}
        <div className="text-center md:text-left">
          <ScrollReveal>
            <p className="text-[10px] tracking-[0.5em] uppercase text-white/60 mb-4 font-light">
              Be First
            </p>
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-[-0.02em] mb-4">
              Reserve Your Build
            </h2>
            <p className="text-white/70 text-sm font-light mb-14 leading-relaxed tracking-wide">
              Join the founding cohort. Priority access to configuration,
              delivery, and the future.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="space-y-3"
                exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                transition={{ duration: 0.4 }}
              >
                <GlowInput
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <GlowInput
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <motion.button
                  type="submit"
                  className="w-full py-4 bg-white text-black font-medium text-xs tracking-[0.2em] uppercase rounded-xl mt-2 cursor-pointer relative overflow-hidden"
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 0 30px rgba(255,255,255,0.15)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  />
                  <span className="relative z-10">Reserve Now</span>
                </motion.button>

                <p className="text-[10px] text-white/40 mt-4 tracking-wider">
                  No payment required. Fully refundable deposit.
                </p>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="py-16"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, delay: 0.15, type: "spring", stiffness: 200 }}
                  className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center mx-auto mb-8"
                >
                  <svg
                    className="w-6 h-6 text-white/80"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <motion.path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M5 13l4 4L19 7"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    />
                  </svg>
                </motion.div>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="text-lg font-light tracking-wide"
                >
                  You&apos;re on the list.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65, duration: 0.5 }}
                  className="text-white/60 mt-2 text-xs tracking-wider font-light"
                >
                  We&apos;ll be in touch soon.
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
