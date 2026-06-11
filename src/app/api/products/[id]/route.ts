import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();
  const data: Record<string, unknown> = {};
  for (const key of [
    "name",
    "weight",
    "description",
    "image",
    "category",
    "featured",
    "inStock",
  ]) {
    if (key in body) data[key] = body[key];
  }
  if ("price" in body) data.price = Number(body.price);
  if ("mrp" in body) data.mrp = body.mrp ? Number(body.mrp) : null;
  if ("spiceLevel" in body) data.spiceLevel = Number(body.spiceLevel);

  const product = await prisma.product.update({ where: { id }, data });
  return NextResponse.json(product);
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
