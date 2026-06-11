"use client";

import Image from "next/image";

/**
 * Brand logo — the real Chatpata Achaar emblem (public/logo.png).
 * Rendered in a circular frame so the round badge sits cleanly on the dark
 * theme. To change the logo, just replace /public/logo.png.
 */
export default function LogoPlaceholder({
  size = "lg",
}: {
  size?: "sm" | "lg";
}) {
  const dim = size === "lg" ? 112 : 44;

  return (
    <div
      style={{ width: dim, height: dim }}
      className="relative shrink-0 overflow-hidden rounded-full bg-white shadow-glow ring-2 ring-brand-mustard/40"
    >
      <Image
        src="/logo.png"
        alt="Chatpata Achaar"
        width={dim}
        height={dim}
        priority
        className="h-full w-full object-cover"
      />
    </div>
  );
}
