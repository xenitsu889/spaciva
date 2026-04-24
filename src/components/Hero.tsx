"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full blur-[150px] animate-float"
          style={{ background: "var(--gradient-orb-1)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[150px] animate-float-delay"
          style={{ background: "var(--gradient-orb-2)" }}
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs mb-10"
          style={{
            color: "var(--text-muted)",
            border: "1px solid var(--border-subtle)",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          Accepting new clients
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Engineering Growth
          <br />
          <span className="gradient-text">for Modern Brands</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[15px] sm:text-base max-w-lg mx-auto mb-10 leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          We help startups and businesses scale through powerful marketing
          strategies and cutting-edge technology.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <a
            href="#cta"
            className="group flex items-center gap-2 px-6 py-3 text-sm font-medium text-white rounded-full bg-gradient-to-r from-electric-blue to-violet hover:shadow-lg hover:shadow-violet/20 transition-all duration-300"
          >
            Get Started
            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </a>
          <a
            href="#portfolio"
            className="flex items-center gap-2 px-6 py-3 text-sm transition-colors duration-300"
            style={{ color: "var(--text-secondary)" }}
          >
            View Work
          </a>
        </motion.div>
      </div>
    </section>
  );
}
