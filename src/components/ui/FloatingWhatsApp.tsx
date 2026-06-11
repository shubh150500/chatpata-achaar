"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  const [wa, setWa] = useState("919999999999");

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((s) => s.whatsapp_number && setWa(s.whatsapp_number))
      .catch(() => {});
  }, []);

  return (
    <a
      href={`https://wa.me/${wa.replace(/[^\d]/g, "")}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-green-500 shadow-glow transition-transform hover:scale-110 active:scale-95"
    >
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-40" />
      <MessageCircle className="relative h-7 w-7 text-white" />
    </a>
  );
}
