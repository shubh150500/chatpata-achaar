import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { genOrderNumber } from "@/lib/utils";

export async function GET() {
  const orders = await prisma.order.findMany({
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(orders);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { details, items, total } = body;

  if (!details?.name || !details?.phone || !items?.length) {
    return NextResponse.json(
      { error: "Missing customer details or items" },
      { status: 400 }
    );
  }

  // Upsert customer by phone
  const customer = await prisma.customer.upsert({
    where: { phone: details.phone },
    update: { name: details.name },
    create: { name: details.name, phone: details.phone },
  });

  // Resolve which product IDs actually exist so we never hit a FK violation
  // (e.g. a product was deleted after it was added to the cart).
  const incomingIds = (items as { id?: string }[])
    .map((i) => i.id)
    .filter((id): id is string => !!id);
  const existing = incomingIds.length
    ? await prisma.product.findMany({
        where: { id: { in: incomingIds } },
        select: { id: true },
      })
    : [];
  const validIds = new Set(existing.map((p) => p.id));

  const order = await prisma.order.create({
    data: {
      orderNumber: genOrderNumber(),
      customerName: details.name,
      phone: details.phone,
      address: details.address || "",
      city: details.city || "",
      state: details.state || "",
      pincode: details.pincode || "",
      notes: details.notes || null,
      total: Number(total),
      status: "Pending",
      customerId: customer.id,
      items: {
        create: items.map(
          (i: {
            id?: string;
            name: string;
            weight: string;
            price: number;
            quantity: number;
          }) => ({
            productId: i.id && validIds.has(i.id) ? i.id : null,
            name: i.name,
            weight: i.weight,
            price: Number(i.price),
            quantity: Number(i.quantity),
          })
        ),
      },
    },
    include: { items: true },
  });

  return NextResponse.json(order, { status: 201 });
}
