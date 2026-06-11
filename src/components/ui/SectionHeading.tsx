"use client";

import { motion } from "framer-motion";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = true,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className={center ? "text-center" : ""}
    >
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-3 font-display text-4xl font-bold text-brand-cream sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-brand-cream/60 ${
            center ? "mx-auto max-w-2xl" : "max-w-2xl"
          }`}
        >
          {subtitle}
        </p>
      )}
      <div
        className={`gold-line mt-6 h-px w-32 animate-shimmer ${
          center ? "mx-auto" : ""
        }`}
      />
    </motion.div>
  );
}
