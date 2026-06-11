import type { Metadata, Viewport } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";

const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const sans = Poppins({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = "https://chatpataachaar.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Chatpata Achaar — Handcrafted Luxury Indian Pickles",
    template: "%s | Chatpata Achaar",
  },
  description:
    "Heritage Indian pickles, handcrafted in small batches with cold-pressed mustard oil and hand-pounded spices. Preservative-free, pan-India delivery.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  keywords: [
    "Indian pickle",
    "achaar",
    "mango pickle",
    "homemade pickle",
    "luxury food",
    "Chatpata Achaar",
  ],
  openGraph: {
    title: "Chatpata Achaar — Handcrafted Luxury Indian Pickles",
    description:
      "Heritage recipes, premium ingredients, preservative-free. Every bite tells a story.",
    url: siteUrl,
    siteName: "Chatpata Achaar",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chatpata Achaar",
    description: "Handcrafted Luxury Indian Pickles",
  },
};

export const viewport: Viewport = {
  themeColor: "#111111",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable}`}
      suppressHydrationWarning
    >
      {/* suppressHydrationWarning: browser extensions (Grammarly, dark-mode
          readers, etc.) inject attributes onto <body> before React hydrates,
          which would otherwise trigger a false hydration mismatch warning. */}
      <body className="font-sans antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
