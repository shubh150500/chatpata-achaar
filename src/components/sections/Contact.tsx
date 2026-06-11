"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Instagram, Facebook, MapPin } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Contact() {
  const [wa, setWa] = useState("919999999999");

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((s) => s.whatsapp_number && setWa(s.whatsapp_number))
      .catch(() => {});
  }, []);

  const socials = [
    {
      icon: MessageCircle,
      label: "WhatsApp",
      sub: "Chat & order",
      href: `https://wa.me/${wa.replace(/[^\d]/g, "")}`,
      color: "from-green-500 to-green-700",
    },
    {
      icon: Instagram,
      label: "Instagram",
      sub: "@chatpataachaar",
      href: "https://instagram.com",
      color: "from-pink-500 to-purple-600",
    },
    {
      icon: Facebook,
      label: "Facebook",
      sub: "Chatpata Achaar",
      href: "https://facebook.com",
      color: "from-blue-500 to-blue-700",
    },
  ];

  return (
    <section id="contact" className="section-pad relative bg-brand-ink">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Get in Touch"
          title="Let's Talk Achaar"
          subtitle="Questions, bulk orders, or just to say the mango pickle changed your life — we're here."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <div className="grid gap-4">
            {socials.map((s, i) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 6 }}
                className="flex items-center gap-4 rounded-2xl glass p-5 transition-shadow hover:shadow-glow"
              >
                <div
                  className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${s.color}`}
                >
                  <s.icon className="h-7 w-7 text-white" />
                </div>
                <div>
                  <p className="font-display text-lg font-bold text-brand-cream">
                    {s.label}
                  </p>
                  <p className="text-sm text-brand-cream/60">{s.sub}</p>
                </div>
              </motion.a>
            ))}
            <div className="flex items-center gap-3 rounded-2xl glass p-5 text-brand-cream/70">
              <MapPin className="h-5 w-5 text-brand-saffron" />
              <span className="text-sm">
                Chatpata Achaar Foods, MG Road, New Delhi, India
              </span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-3xl glass-strong shadow-glass"
          >
            <iframe
              title="Store location"
              src="https://www.google.com/maps?q=New+Delhi+India&output=embed"
              className="h-full min-h-[340px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
