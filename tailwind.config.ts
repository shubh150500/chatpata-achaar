import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#B71C1C",
          saffron: "#FF6F00",
          mustard: "#F9A825",
          cream: "#FFF8E1",
          ink: "#111111",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "spice-radial":
          "radial-gradient(circle at 50% 30%, rgba(255,111,0,0.18), transparent 60%)",
        "luxury-gradient":
          "linear-gradient(135deg, #1a0a0a 0%, #2b0f0f 40%, #111111 100%)",
      },
      boxShadow: {
        glow: "0 0 40px rgba(255,111,0,0.35)",
        "glow-red": "0 0 50px rgba(183,28,28,0.45)",
        glass: "0 8px 32px rgba(0,0,0,0.37)",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        "fade-up": "fade-up 0.8s ease forwards",
      },
    },
  },
  plugins: [],
};

export default config;
