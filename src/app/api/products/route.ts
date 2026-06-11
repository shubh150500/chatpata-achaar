import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

export async function GET() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  const body = await req.json();
  const {
    name,
    weight,
    price,
    mrp,
    description,
    image,
    category,
    featured,
    inStock,
    spiceLevel,
  } = body;

  if (!name || !price || !weight) {
    return NextResponse.json(
      { error: "name, weight and price are required" },
      { status: 400 }
    );
  }

  let slug = slugify(name);
  const exists = await prisma.product.findUnique({ where: { slug } });
  if (exists) slug = `${slug}-${Date.now().toString(36).slice(-4)}`;

  const product = await prisma.product.create({
    data: {
      name,
      slug,
      weight,
      price: Number(price),
      mrp: mrp ? Number(mrp) : null,
      description: description || "",
      image: image || "/placeholder-product.jpg",
      category: category || "Pickle",
      featured: !!featured,
      inStock: inStock ?? true,
      spiceLevel: Number(spiceLevel) || 3,
    },
  });
  return NextResponse.json(product, { status: 201 });
}
