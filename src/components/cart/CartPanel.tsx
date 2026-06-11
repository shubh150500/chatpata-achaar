"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/store/cart";
import { formatINR } from "@/lib/utils";
import CheckoutModal from "@/components/checkout/CheckoutModal";

export default function CartPanel() {
  const { items, isOpen, close, increment, decrement, remove } = useCart();
  const total = useCart((s) => s.total());
  const [checkout, setCheckout] = useState(false);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-luxury-gradient shadow-glass"
            >
              <div className="flex items-center justify-between border-b border-white/10 p-5">
                <h3 className="font-display text-2xl font-bold text-brand-cream">
                  Your Basket
                </h3>
                <button
                  onClick={close}
                  className="grid h-10 w-10 place-items-center rounded-full glass"
                  aria-label="Close cart"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {items.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center gap-4 text-brand-cream/60">
                  <ShoppingBag className="h-14 w-14" />
                  <p>Your basket is empty</p>
                  <button onClick={close} className="btn-ghost">
                    Continue shopping
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex-1 space-y-4 overflow-y-auto p-5 no-scrollbar">
                    {items.map((i) => (
                      <motion.div
                        layout
                        key={i.id}
                        className="flex gap-3 rounded-2xl glass p-3"
                      >
                        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                          <Image
                            src={i.image}
                            alt={i.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-semibold text-brand-cream">
                                {i.name}
                              </p>
                              <p className="text-xs text-brand-cream/60">
                                {i.weight}
                              </p>
                            </div>
                            <button
                              onClick={() => remove(i.id)}
                              className="text-brand-cream/50 hover:text-brand-red"
                              aria-label="Remove"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="mt-auto flex items-center justify-between">
                            <div className="flex items-center gap-2 rounded-full glass px-2 py-1">
                              <button
                                onClick={() => decrement(i.id)}
                                aria-label="Decrease"
                                className="grid h-6 w-6 place-items-center rounded-full hover:bg-white/10"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="w-5 text-center text-sm font-semibold">
                                {i.quantity}
                              </span>
                              <button
                                onClick={() => increment(i.id)}
                                aria-label="Increase"
                                className="grid h-6 w-6 place-items-center rounded-full hover:bg-white/10"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            <span className="font-semibold text-brand-mustard">
                              {formatINR(i.price * i.quantity)}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="border-t border-white/10 p-5">
                    <div className="mb-4 flex items-center justify-between text-lg">
                      <span className="text-brand-cream/70">Total</span>
                      <span className="font-display text-2xl font-bold text-gradient-gold">
                        {formatINR(total)}
                      </span>
                    </div>
                    <button
                      onClick={() => setCheckout(true)}
                      className="btn-primary w-full"
                    >
                      Checkout via WhatsApp
                    </button>
                    <p className="mt-3 text-center text-xs text-brand-cream/50">
                      No online payment · Order confirmed on WhatsApp
                    </p>
                  </div>
                </>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <CheckoutModal open={checkout} onClose={() => setCheckout(false)} />
    </>
  );
}
