"use client";

import { motion } from "framer-motion";
import { Leaf, ShieldCheck, Heart, Sparkles, Truck } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const features = [
  { icon: Heart, title: "Homemade", desc: "Cooked in small batches in real kitchens, not factories." },
  { icon: ShieldCheck, title: "Preservative Free", desc: "Zero artificial preservatives, colours or flavours." },
  { icon: Sparkles, title: "Traditional Recipe", desc: "Four generations of guarded family recipes." },
  { icon: Leaf, title: "Pure Ingredients", desc: "Cold-pressed oils and hand-pounded whole spices." },
  { icon: Truck, title: "Pan-India Delivery", desc: "Sealed fresh and shipped to your doorstep." },
];

export default function WhyChooseUs() {
  return (
    <section className="section-pad relative bg-brand-ink">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Why Choose Us" title="The Chatpata Promise" />
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="group rounded-3xl glass p-7 transition-shadow hover:shadow-glow"
            >
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-saffron to-brand-red shadow-glow">
                <f.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-brand-cream">
                {f.title}
              </h3>
              <p className="mt-2 text-sm text-brand-cream/60">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
