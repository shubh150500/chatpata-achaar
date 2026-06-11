import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatINR(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function genOrderNumber() {
  // CA + yyMMdd-ish + random; avoids needing Date precision collisions
  const rand = Math.floor(1000 + Math.random() * 9000);
  const stamp = Date.now().toString(36).toUpperCase().slice(-5);
  return `CA-${stamp}-${rand}`;
}
