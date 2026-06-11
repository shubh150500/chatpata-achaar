"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const reviews = [
  {
    name: "Shubham Mehta",
    city: "Mumbai",
    rating: 5,
    text: "Tastes exactly like my dadi used to make. The mango pickle disappeared in a week. Packaging felt like a gift.",
    avatar: "https://i.pravatar.cc/120?img=12",
  },
  {
    name: "Ananya Sharma",
    city: "Bengaluru",
    rating: 5,
    text: "The mustard oil aroma the moment you open the jar — incredible. You can tell it's genuinely handmade.",
    avatar: "https://i.pravatar.cc/120?img=45",
  },
  {
    name: "Rajesh Kumar",
    city: "Delhi",
    rating: 5,
    text: "Ordered the garlic achaar for my parents. They called to thank me twice. Pan-India delivery was quick.",
    avatar: "https://i.pravatar.cc/120?img=33",
  },
  {
    name: "Fatima Sheikh",
    city: "Hyderabad",
    rating: 5,
    text: "Premium in every way — from the jar to the taste. Worth every rupee. The lemon pickle is unreal.",
    avatar: "https://i.pravatar.cc/120?img=23",
  },
];

export default function Reviews() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % reviews.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="reviews" className="section-pad relative bg-luxury-gradient">
      <div className="pointer-events-none absolute inset-0 bg-spice-radial opacity-30" />
      <div className="relative mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="Loved Across India"
          title="What Our Family Says"
        />

        <div className="relative mt-14 min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.97 }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl glass-strong p-8 text-center shadow-glass sm:p-12"
            >
              <Quote className="mx-auto h-10 w-10 text-brand-saffron/60" />
              <p className="mt-6 font-display text-xl leading-relaxed text-brand-cream sm:text-2xl">
                “{reviews[index].text}”
              </p>
              <div className="mt-6 flex items-center justify-center gap-1">
                {Array.from({ length: reviews[index].rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-brand-mustard text-brand-mustard"
                  />
                ))}
              </div>
              <div className="mt-6 flex items-center justify-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={reviews[index].avatar}
                  alt={reviews[index].name}
                  className="h-12 w-12 rounded-full border-2 border-brand-saffron object-cover"
                />
                <div className="text-left">
                  <p className="font-semibold text-brand-cream">
                    {reviews[index].name}
                  </p>
                  <p className="text-xs text-brand-cream/50">
                    {reviews[index].city}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex justify-center gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Review ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-8 bg-brand-saffron" : "w-2 bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
