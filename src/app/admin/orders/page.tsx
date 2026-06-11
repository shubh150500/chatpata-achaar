"use client";

import { useEffect, useState, useCallback } from "react";
import { Loader2, Phone, MapPin, ChevronDown } from "lucide-react";
import { formatINR } from "@/lib/utils";
import { ORDER_STATUSES, type Order, type OrderStatus } from "@/lib/types";

const statusColor: Record<OrderStatus, string> = {
  Pending: "bg-yellow-500/20 text-yellow-300",
  Confirmed: "bg-blue-500/20 text-blue-300",
  Packed: "bg-purple-500/20 text-purple-300",
  Shipped: "bg-orange-500/20 text-orange-300",
  Delivered: "bg-green-500/20 text-green-300",
};

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState<string | null>(null);
  const [filter, setFilter] = useState<OrderStatus | "All">("All");

  const load = useCallback(async () => {
    const res = await fetch("/api/orders");
    setOrders(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function updateStatus(id: string, status: OrderStatus) {
    await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o))
    );
  }

  const filtered =
    filter === "All" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div className="p-5 lg:p-8">
      <h1 className="font-display text-3xl font-bold text-brand-cream">Orders</h1>
      <p className="text-brand-cream/50">{orders.length} total orders</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {(["All", ...ORDER_STATUSES] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
              filter === s
                ? "bg-gradient-to-r from-brand-saffron to-brand-red text-white"
                : "glass text-brand-cream/70"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="mt-20 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-brand-saffron" />
        </div>
      ) : filtered.length === 0 ? (
        <p className="mt-16 text-center text-brand-cream/40">No orders here yet.</p>
      ) : (
        <div className="mt-6 space-y-3">
          {filtered.map((o) => (
            <div key={o.id} className="overflow-hidden rounded-2xl glass">
              <button
                onClick={() => setOpen(open === o.id ? null : o.id)}
                className="flex w-full items-center justify-between gap-4 p-4 text-left"
              >
                <div className="min-w-0">
                  <p className="font-semibold text-brand-cream">
                    {o.customerName}{" "}
                    <span className="text-xs text-brand-cream/40">
                      #{o.orderNumber}
                    </span>
                  </p>
                  <p className="truncate text-xs text-brand-cream/50">
                    {o.items.length} items · {formatINR(o.total)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      statusColor[o.status]
                    }`}
                  >
                    {o.status}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-brand-cream/50 transition-transform ${
                      open === o.id ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>

              {open === o.id && (
                <div className="border-t border-white/10 p-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1 text-sm text-brand-cream/70">
                      <p className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-brand-saffron" />
                        {o.phone}
                      </p>
                      <p className="flex items-start gap-2">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-saffron" />
                        {o.address}, {o.city}, {o.state} — {o.pincode}
                      </p>
                      {o.notes && (
                        <p className="italic text-brand-cream/50">
                          Note: {o.notes}
                        </p>
                      )}
                    </div>
                    <div>
                      <p className="mb-2 text-xs uppercase tracking-wide text-brand-mustard">
                        Items
                      </p>
                      {o.items.map((it) => (
                        <div
                          key={it.id}
                          className="flex justify-between text-sm text-brand-cream/70"
                        >
                          <span>
                            {it.name} {it.weight} × {it.quantity}
                          </span>
                          <span>{formatINR(it.price * it.quantity)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-xs text-brand-cream/50">
                      Update status:
                    </span>
                    <select
                      value={o.status}
                      onChange={(e) =>
                        updateStatus(o.id, e.target.value as OrderStatus)
                      }
                      className="rounded-lg bg-white/5 px-3 py-1.5 text-sm text-brand-cream outline-none"
                    >
                      {ORDER_STATUSES.map((s) => (
                        <option key={s} value={s} className="bg-[#1a1010]">
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
