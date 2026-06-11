"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Flame, Plus } from "lucide-react";
import type { Product } from "@/lib/types";
import { useCart } from "@/store/cart";
import { formatINR } from "@/lib/utils";

export default function ProductCard({ product }: { product: Product }) {
  const add = useCart((s) => s.add);
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -10, y: px * 10 });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="perspective"
    >
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: "transform 0.2s ease-out",
        }}
        className="group relative overflow-hidden rounded-3xl glass p-4 transition-all duration-300 hover:shadow-glow"
      >
        {/* glow */}
        <div className="pointer-events-none absolute -inset-1 rounded-3xl bg-gradient-to-tr from-brand-saffron/0 via-brand-saffron/0 to-brand-red/0 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-40" />

        <div className="relative aspect-square overflow-hidden rounded-2xl">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width:768px) 90vw, 320px"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {product.mrp && product.mrp > product.price && (
            <span className="absolute left-3 top-3 rounded-full bg-brand-red px-3 py-1 text-xs font-bold text-white">
              {Math.round(((product.mrp - product.price) / product.mrp) * 100)}%
              OFF
            </span>
          )}
          <div className="absolute right-3 top-3 flex gap-0.5 rounded-full glass-strong px-2 py-1">
            {Array.from({ length: product.spiceLevel }).map((_, i) => (
              <Flame key={i} className="h-3 w-3 text-brand-saffron" />
            ))}
          </div>
        </div>

        <div className="mt-4 px-1">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-bold text-brand-cream">
              {product.name}
            </h3>
            <span className="text-xs text-brand-cream/50">{product.weight}</span>
          </div>
          <p className="mt-1 line-clamp-2 text-sm text-brand-cream/60">
            {product.description}
          </p>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-2xl font-bold text-gradient-gold">
                {formatINR(product.price)}
              </span>
              {product.mrp && product.mrp > product.price && (
                <span className="text-sm text-brand-cream/40 line-through">
                  {formatINR(product.mrp)}
                </span>
              )}
            </div>
            <button
              onClick={() => add(product)}
              aria-label={`Add ${product.name} to cart`}
              className="flex items-center gap-1 rounded-full bg-gradient-to-r from-brand-saffron to-brand-red px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-105 active:scale-95"
            >
              <Plus className="h-4 w-4" /> Add
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
