import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const orders = await prisma.order.findMany({ include: { items: true } });
  const customers = await prisma.customer.count();

  const totalOrders = orders.length;
  const revenue = orders.reduce((s, o) => s + o.total, 0);

  // Best selling products by quantity
  const productMap: Record<string, { name: string; qty: number; revenue: number }> = {};
  orders.forEach((o) => {
    o.items.forEach((i) => {
      const key = i.name;
      if (!productMap[key]) productMap[key] = { name: i.name, qty: 0, revenue: 0 };
      productMap[key].qty += i.quantity;
      productMap[key].revenue += i.price * i.quantity;
    });
  });
  const bestSellers = Object.values(productMap)
    .sort((a, b) => b.qty - a.qty)
    .slice(0, 5);

  // Monthly sales (last 6 months) — group by YYYY-MM
  const monthly: Record<string, number> = {};
  orders.forEach((o) => {
    const d = new Date(o.createdAt);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    monthly[key] = (monthly[key] || 0) + o.total;
  });
  const monthlySales = Object.entries(monthly)
    .sort()
    .slice(-6)
    .map(([month, total]) => ({ month, total }));

  const statusCounts: Record<string, number> = {};
  orders.forEach((o) => {
    statusCounts[o.status] = (statusCounts[o.status] || 0) + 1;
  });

  return NextResponse.json({
    totalOrders,
    revenue,
    customers,
    avgOrderValue: totalOrders ? Math.round(revenue / totalOrders) : 0,
    bestSellers,
    monthlySales,
    statusCounts,
  });
}
