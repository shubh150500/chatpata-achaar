import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const rows = await prisma.setting.findMany();
  const settings: Record<string, string> = {};
  rows.forEach((r) => (settings[r.key] = r.value));
  return NextResponse.json(settings);
}

export async function POST(req: Request) {
  const body = await req.json();
  const entries = Object.entries(body) as [string, string][];
  for (const [key, value] of entries) {
    await prisma.setting.upsert({
      where: { key },
      update: { value: String(value) },
      create: { key, value: String(value) },
    });
  }
  return NextResponse.json({ ok: true });
}
