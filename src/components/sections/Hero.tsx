"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import LogoPlaceholder from "@/components/ui/LogoPlaceholder";
import CanvasErrorBoundary from "@/components/three/CanvasErrorBoundary";

const HeroCanvas = dynamic(() => import("@/components/three/HeroCanvas"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 grid place-items-center">
      <div className="h-16 w-16 animate-spin rounded-full border-2 border-brand-saffron border-t-transparent" />
    </div>
  ),
});

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative h-[100svh] w-full overflow-hidden bg-luxury-gradient"
    >
      {/* radial ambient glow */}
      <div className="pointer-events-none absolute inset-0 bg-spice-radial" />
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-brand-red/20 blur-[120px]" />

      {/* 3D canvas */}
      <CanvasErrorBoundary>
        <HeroCanvas />
      </CanvasErrorBoundary>

      {/* Overlay content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-between py-10 text-center pointer-events-none">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-[8vh] flex flex-col items-center px-5"
        >
          <motion.div variants={item} className="pointer-events-auto">
            <LogoPlaceholder />
          </motion.div>

          <motion.div
            variants={item}
            className="mt-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs text-brand-mustard"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Handcrafted in small batches since 1952
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-6 max-w-4xl font-display text-5xl font-bold leading-[1.05] sm:text-7xl lg:text-8xl"
          >
            <span className="text-gradient-gold">Every Bite</span>
            <br />
            <span className="text-brand-cream">Tells A Story</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-base text-brand-cream/70 sm:text-lg"
          >
            Heritage Indian achaar, slow-cured in cold-pressed mustard oil and
            hand-pounded spices. Preservative-free. Unapologetically bold.
          </motion.p>

          <motion.div
            variants={item}
            className="pointer-events-auto mt-9 flex flex-wrap items-center justify-center gap-4"
          >
            <a href="#products" className="btn-primary">
              Explore the Collection
            </a>
            <a href="#story" className="btn-ghost">
              Our Story
            </a>
          </motion.div>
        </motion.div>

        <motion.a
          href="#story"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="pointer-events-auto flex flex-col items-center gap-1 text-brand-cream/50"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </motion.a>
      </div>
    </section>
  );
}
