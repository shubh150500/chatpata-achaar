import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const customers = await prisma.customer.findMany({
    include: {
      orders: { select: { id: true, total: true, orderNumber: true, status: true, createdAt: true } },
    },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(customers);
}
