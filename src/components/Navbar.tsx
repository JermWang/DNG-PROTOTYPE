"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-black/80 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
        <span className="text-sm font-bold tracking-[0.3em] uppercase">
          Volterra
        </span>
        <span className="text-xs tracking-[0.2em] text-white/40 uppercase hidden md:block">
          E1 Series
        </span>
        <button className="text-xs tracking-[0.2em] uppercase text-white/60 hover:text-white transition-colors">
          Reserve
        </button>
      </div>
    </motion.nav>
  );
}
