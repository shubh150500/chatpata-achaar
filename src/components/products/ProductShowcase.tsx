import { prisma } from "@/lib/prisma";
import type { Product } from "@/lib/types";
import ProductCard from "./ProductCard";
import SectionHeading from "@/components/ui/SectionHeading";

export default async function ProductShowcase() {
  const products = (await prisma.product.findMany({
    where: { inStock: true },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  })) as Product[];

  return (
    <section id="products" className="section-pad relative bg-brand-ink">
      <div className="pointer-events-none absolute inset-0 bg-spice-radial opacity-40" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="The Collection"
          title="Jars Worth Savouring"
          subtitle="Each batch is small, slow-cured, and bottled at the peak of flavour."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {products.length === 0 && (
          <p className="mt-10 text-center text-brand-cream/50">
            No products yet. Add some from the admin panel.
          </p>
        )}
      </div>
    </section>
  );
}
