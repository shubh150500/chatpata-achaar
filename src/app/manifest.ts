import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Chatpata Achaar",
    short_name: "Chatpata",
    description: "Handcrafted Luxury Indian Pickles",
    start_url: "/",
    display: "standalone",
    background_color: "#111111",
    theme_color: "#111111",
    icons: [
      { src: "/logo.png", sizes: "256x256", type: "image/png" },
    ],
  };
}
