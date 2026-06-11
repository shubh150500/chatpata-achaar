"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="section-pad relative overflow-hidden bg-luxury-gradient">
      <div className="pointer-events-none absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-brand-red/20 blur-[120px]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="eyebrow">Our Legacy</p>
          <h2 className="mt-3 font-display text-4xl font-bold text-brand-cream sm:text-5xl">
            A Family. <br />
            <span className="text-gradient-gold">A Recipe. A Promise.</span>
          </h2>
          <div className="mt-6 space-y-4 text-brand-cream/70">
            <p>
              It began in 1952, on a sunlit terrace in the heart of India, where
              our great-grandmother laid out raw mangoes to dry and stirred them
              into mustard oil with hands that knew the recipe by heart.
            </p>
            <p>
              Three generations later, we still make achaar the same way — in
              small batches, with whole spices pounded fresh, and not a single
              artificial shortcut. Chatpata Achaar is our way of bottling that
              terrace, that sunlight, and that love.
            </p>
            <p className="font-display text-xl italic text-brand-mustard">
              “Good achaar can&apos;t be hurried. Neither can good memories.”
            </p>
          </div>
          <div className="mt-8 flex gap-8">
            {[
              { n: "70+", l: "Years of recipes" },
              { n: "50k+", l: "Jars delivered" },
              { n: "100%", l: "Preservative-free" },
            ].map((s) => (
              <div key={s.l}>
                <p className="font-display text-3xl font-bold text-gradient">
                  {s.n}
                </p>
                <p className="text-xs text-brand-cream/50">{s.l}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="aspect-[4/5] overflow-hidden rounded-3xl glass-strong shadow-glass">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=900&q=80"
              alt="Traditional Indian kitchen"
              className="h-full w-full object-cover"
            />
          </div>
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute -bottom-6 -left-6 rounded-2xl glass-strong p-5 shadow-glow"
          >
            <p className="font-display text-2xl font-bold text-brand-mustard">
              Est. 1952
            </p>
            <p className="text-xs text-brand-cream/60">Handcrafted ever since</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
