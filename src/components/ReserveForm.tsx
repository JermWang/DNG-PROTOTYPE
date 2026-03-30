"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

export default function ReserveForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="min-h-[80vh] flex items-center justify-center px-6 md:px-16 py-32">
      <div className="max-w-md w-full text-center">
        <ScrollReveal>
          <p className="text-[10px] tracking-[0.5em] uppercase text-white/25 mb-4 font-light">
            Be First
          </p>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-[-0.02em] mb-4">
            Reserve Your Build
          </h2>
          <p className="text-white/30 text-sm font-light mb-14 leading-relaxed tracking-wide">
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
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-5 py-4 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-colors text-sm tracking-wide"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-5 py-4 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-colors text-sm tracking-wide"
                />
                <button
                  type="submit"
                  className="w-full py-4 bg-white text-black font-medium text-xs tracking-[0.2em] uppercase rounded-xl hover:bg-white/90 transition-all duration-300 mt-2 cursor-pointer"
                >
                  Reserve Now
                </button>
                <p className="text-[10px] text-white/15 mt-4 tracking-wider">
                  No payment required. Fully refundable deposit.
                </p>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="py-16"
              >
                <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center mx-auto mb-8">
                  <svg
                    className="w-6 h-6 text-white/50"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-lg font-light tracking-wide">
                  You&apos;re on the list.
                </p>
                <p className="text-white/30 mt-2 text-xs tracking-wider font-light">
                  We&apos;ll be in touch soon.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </ScrollReveal>
      </div>
    </section>
  );
}
