"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const faqs = [
  {
    q: "Are your pickles really preservative-free?",
    a: "Yes. We use only salt, oil and spices as natural preservatives — exactly as it's been done for generations. No artificial additives whatsoever.",
  },
  {
    q: "How long do the pickles stay fresh?",
    a: "Stored in a cool, dry place and always using a dry spoon, our pickles stay delicious for up to 12 months. They rarely last that long though!",
  },
  {
    q: "Do you deliver across India?",
    a: "Absolutely. We ship pan-India with secure, leak-proof packaging. Most orders are delivered within 3–6 working days.",
  },
  {
    q: "How do I place an order?",
    a: "Add your favourites to the basket and checkout — your order is sent directly to us on WhatsApp. We'll confirm and share delivery details there.",
  },
  {
    q: "Is the mustard oil too strong?",
    a: "Our cold-pressed mustard oil is pungent and authentic — that's the soul of North Indian achaar. The flavour mellows beautifully as the pickle matures.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section-pad relative bg-luxury-gradient">
      <div className="mx-auto max-w-3xl">
        <SectionHeading eyebrow="Questions" title="Frequently Asked" />
        <div className="mt-12 space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="overflow-hidden rounded-2xl glass">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 p-5 text-left"
              >
                <span className="font-semibold text-brand-cream">{f.q}</span>
                <motion.span
                  animate={{ rotate: open === i ? 45 : 0 }}
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-saffron to-brand-red"
                >
                  <Plus className="h-4 w-4 text-white" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="px-5 pb-5 text-sm leading-relaxed text-brand-cream/70">
                      {f.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
