"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Instagram, Facebook, MessageCircle } from "lucide-react";
import LogoPlaceholder from "@/components/ui/LogoPlaceholder";

const quickLinks = [
  { label: "Our Story", href: "#story" },
  { label: "Ingredients", href: "#ingredients" },
  { label: "Shop", href: "#products" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <footer className="relative overflow-hidden bg-luxury-gradient pt-20">
      {/* animated glow background */}
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[80%] -translate-x-1/2 rounded-full bg-brand-saffron/20 blur-[120px]"
      />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3">
              <LogoPlaceholder size="sm" />
              <span className="font-display text-lg font-bold text-brand-cream">
                CHATPATA <span className="text-gradient">ACHAAR</span>
              </span>
            </div>
            <p className="mt-4 text-sm text-brand-cream/60">
              Handcrafted heritage pickles, slow-cured the way they&apos;ve been
              made since 1952.
            </p>
            <div className="mt-5 flex gap-3">
              {[MessageCircle, Instagram, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#contact"
                  className="grid h-10 w-10 place-items-center rounded-full glass transition-transform hover:scale-110"
                >
                  <Icon className="h-4 w-4 text-brand-cream" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold text-brand-mustard">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-2">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-brand-cream/60 transition-colors hover:text-brand-cream"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-brand-mustard">
              Customer Care
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-brand-cream/60">
              <li>Shipping & Delivery</li>
              <li>Returns Policy</li>
              <li>Track Your Order</li>
              <li>
                <a href="/admin/login" className="hover:text-brand-cream">
                  Admin Login
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h4 className="font-display font-bold text-brand-mustard">
              Join the Family
            </h4>
            <p className="mt-4 text-sm text-brand-cream/60">
              Recipes, new launches & subscriber-only offers.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
                setEmail("");
              }}
              className="mt-4 flex overflow-hidden rounded-full glass"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="flex-1 bg-transparent px-4 py-3 text-sm text-brand-cream outline-none placeholder:text-brand-cream/40"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="grid w-12 place-items-center bg-gradient-to-r from-brand-saffron to-brand-red"
              >
                <Send className="h-4 w-4 text-white" />
              </button>
            </form>
            {sent && (
              <p className="mt-2 text-xs text-green-400">
                Thanks for subscribing! 🎉
              </p>
            )}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 py-8 text-xs text-brand-cream/50 sm:flex-row">
          <p>© {2025} Chatpata Achaar. All rights reserved.</p>
          <p>Made with 🥭 & lots of mustard oil in India.</p>
        </div>
      </div>
    </footer>
  );
}
