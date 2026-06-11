import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import ScrollStory from "@/components/sections/ScrollStory";
import { HandcraftedScene } from "@/components/sections/StoryScenes";
import {
  IngredientsScene,
  PerfectTasteScene,
} from "@/components/sections/TasteScenes";
import ProductShowcase from "@/components/products/ProductShowcase";
import About from "@/components/sections/About";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Reviews from "@/components/sections/Reviews";
import Gallery from "@/components/sections/Gallery";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import CartPanel from "@/components/cart/CartPanel";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <ScrollStory />
      <HandcraftedScene />
      <IngredientsScene />
      <ProductShowcase />
      <PerfectTasteScene />
      <About />
      <WhyChooseUs />
      <Reviews />
      <Gallery />
      <FAQ />
      <Contact />
      <Footer />
      <CartPanel />
      <FloatingWhatsApp />
    </main>
  );
}
