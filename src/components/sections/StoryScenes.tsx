"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

/* Scene 1 — "Every Bite Tells A Story" reprise + spice reveal */
export function StoryScene() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.05, 1.2]);
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      id="story"
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-luxury-gradient"
    >
      <div className="pointer-events-none absolute inset-0 bg-spice-radial" />
      {/* floating spice motes */}
      {[...Array(12)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute h-2 w-2 rounded-full bg-brand-saffron/40 blur-[1px]"
          style={{ left: `${(i * 8.3) % 100}%`, top: `${(i * 13) % 100}%` }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 4 + (i % 4), repeat: Infinity, delay: i * 0.3 }}
        />
      ))}

      <motion.div
        style={{ scale, y, opacity }}
        className="relative z-10 px-6 text-center"
      >
        <p className="eyebrow">Scene I</p>
        <h2 className="mx-auto mt-4 max-w-4xl font-display text-5xl font-bold leading-tight text-brand-cream sm:text-7xl">
          Every Bite Tells <br />
          <span className="text-gradient-gold">A Story</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-brand-cream/70">
          A jar of achaar is a jar of memory — of summer mangoes drying on
          terraces, of grandmothers&apos; hands, of recipes never written down.
        </p>
      </motion.div>
    </section>
  );
}

/* Scene 2 — Handcrafted timeline */
const timeline = [
  { year: "Sun", title: "Sun-dried", desc: "Raw mangoes cured under the Indian summer sun for three days." },
  { year: "Hand", title: "Hand-pounded", desc: "Spices ground fresh in stone, never machine-blitzed." },
  { year: "Oil", title: "Cold-pressed", desc: "Only wood-pressed mustard oil — sharp, golden, alive." },
  { year: "Time", title: "Slow-matured", desc: "Each jar rests for weeks until the flavour deepens." },
];

export function HandcraftedScene() {
  return (
    <section className="section-pad relative bg-brand-ink">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Scene II"
          title="Handcrafted, Traditional"
          subtitle="No factory line. No shortcuts. Just the recipe our family has guarded since 1952."
        />
        <div className="relative mt-16">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-brand-saffron/0 via-brand-saffron/50 to-brand-saffron/0 md:block" />
          <div className="space-y-12">
            {timeline.map((t, i) => (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, x: i % 2 ? 60 : -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7 }}
                className={`flex items-center gap-6 md:w-1/2 ${
                  i % 2 ? "md:ml-auto md:flex-row" : "md:flex-row-reverse md:text-right"
                }`}
              >
                <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl glass-strong font-display text-sm font-bold text-brand-mustard shadow-glow">
                  {t.year}
                </div>
                <div className="rounded-2xl glass p-5">
                  <h3 className="font-display text-xl font-bold text-brand-cream">
                    {t.title}
                  </h3>
                  <p className="mt-1 text-sm text-brand-cream/60">{t.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
