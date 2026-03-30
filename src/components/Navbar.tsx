"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function NavLink({ children, accent }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <motion.span
      className={`relative text-xs tracking-[0.2em] uppercase cursor-pointer group ${
        accent ? "text-white/60" : "text-white/40"
      }`}
      whileHover={{ color: "rgba(255,255,255,1)" }}
      transition={{ duration: 0.3 }}
    >
      {children}
      <motion.span
        className="absolute -bottom-1 left-0 right-0 h-px bg-white origin-left"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
    </motion.span>
  );
}

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-black/70 backdrop-blur-2xl border-b border-white/[0.04]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
        <motion.span
          className="text-sm font-bold tracking-[0.3em] uppercase cursor-pointer"
          whileHover={{ letterSpacing: "0.35em" }}
          transition={{ duration: 0.4 }}
        >
          Volterra
        </motion.span>

        <span className="hidden md:block">
          <NavLink>E1 Series</NavLink>
        </span>

        <motion.button
          className="relative text-xs tracking-[0.2em] uppercase text-white/60 font-medium cursor-pointer overflow-hidden px-5 py-2 rounded-full border border-white/[0.08]"
          whileHover={{
            borderColor: "rgba(255,255,255,0.25)",
            backgroundColor: "rgba(255,255,255,0.05)",
            color: "rgba(255,255,255,1)",
          }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.3 }}
        >
          Reserve
        </motion.button>
      </div>
    </motion.nav>
  );
}
