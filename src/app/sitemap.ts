import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://chatpataachaar.com";
  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/#products`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/#story`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/#contact`, changeFrequency: "monthly", priority: 0.6 },
  ];
}
