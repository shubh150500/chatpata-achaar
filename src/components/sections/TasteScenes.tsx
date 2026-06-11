"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

const ingredients = [
  { emoji: "🥭", name: "Raw Mango", note: "Hand-picked, sun-cured", color: "from-brand-mustard/30" },
  { emoji: "🌶️", name: "Red Chilli", note: "Stone-ground heat", color: "from-brand-red/30" },
  { emoji: "🫗", name: "Mustard Oil", note: "Cold-pressed, golden", color: "from-brand-saffron/30" },
  { emoji: "🌿", name: "Fenugreek", note: "Bitter-sweet depth", color: "from-green-700/30" },
  { emoji: "🧂", name: "Traditional Spices", note: "A secret family blend", color: "from-amber-700/30" },
];

export function IngredientsScene() {
  return (
    <section id="ingredients" className="section-pad relative bg-luxury-gradient">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Scene III"
          title="Our Ingredients"
          subtitle="Five honest things. Nothing artificial, nothing you can't pronounce."
        />
        <div className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {ingredients.map((ing, i) => (
            <motion.div
              key={ing.name}
              initial={{ opacity: 0, y: 50, rotate: -4 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              whileHover={{ y: -10, scale: 1.04 }}
              className={`group relative overflow-hidden rounded-3xl glass p-6 text-center bg-gradient-to-b ${ing.color} to-transparent`}
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3 + i, repeat: Infinity }}
                className="mx-auto grid h-20 w-20 place-items-center rounded-full glass-strong text-4xl shadow-glow"
              >
                {ing.emoji}
              </motion.div>
              <h3 className="mt-4 font-display text-lg font-bold text-brand-cream">
                {ing.name}
              </h3>
              <p className="mt-1 text-xs text-brand-cream/60">{ing.note}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PerfectTasteScene() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-brand-ink">
      {/* oil wave */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-brand-saffron/20 to-transparent"
        animate={{ scaleY: [1, 1.15, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* splash dots */}
      {[...Array(18)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-brand-saffron/50"
          style={{
            width: 6 + (i % 5) * 4,
            height: 6 + (i % 5) * 4,
            left: `${(i * 11) % 100}%`,
            bottom: "10%",
          }}
          animate={{ y: [0, -120 - (i % 6) * 30, 0], opacity: [0, 1, 0] }}
          transition={{
            duration: 3 + (i % 4),
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="relative z-10 px-6 text-center"
      >
        <p className="eyebrow">Scene IV</p>
        <h2 className="mt-4 font-display text-5xl font-bold text-brand-cream sm:text-7xl">
          The <span className="text-gradient">Perfect</span> Taste
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-brand-cream/70">
          That first tangy, fiery, oil-glossed bite that makes a simple meal
          feel like a celebration. That&apos;s the whole point.
        </p>
        <a href="#products" className="btn-primary mt-8">
          Taste it Yourself
        </a>
      </motion.div>
    </section>
  );
}
