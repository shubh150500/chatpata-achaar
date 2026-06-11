"use client";

import { useEffect, useState } from "react";
import { Loader2, User } from "lucide-react";
import { formatINR } from "@/lib/utils";

type Customer = {
  id: string;
  name: string;
  phone: string;
  createdAt: string;
  orders: { id: string; total: number; orderNumber: string; status: string }[];
};

export default function AdminCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/customers")
      .then((r) => r.json())
      .then((d) => {
        setCustomers(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="p-5 lg:p-8">
      <h1 className="font-display text-3xl font-bold text-brand-cream">
        Customers
      </h1>
      <p className="text-brand-cream/50">{customers.length} customers</p>

      {loading ? (
        <div className="mt-20 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-brand-saffron" />
        </div>
      ) : customers.length === 0 ? (
        <p className="mt-16 text-center text-brand-cream/40">
          No customers yet. Orders will populate this list.
        </p>
      ) : (
        <div className="mt-8 overflow-hidden rounded-2xl glass">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-white/10 text-brand-cream/50">
              <tr>
                <th className="p-4">Customer</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Orders</th>
                <th className="p-4">Total Spent</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => {
                const spent = c.orders.reduce((s, o) => s + o.total, 0);
                return (
                  <tr
                    key={c.id}
                    className="border-b border-white/5 last:border-0 hover:bg-white/5"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-brand-saffron to-brand-red">
                          <User className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-medium text-brand-cream">
                          {c.name}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-brand-cream/70">{c.phone}</td>
                    <td className="p-4 text-brand-cream/70">
                      {c.orders.length}
                    </td>
                    <td className="p-4 font-semibold text-brand-mustard">
                      {formatINR(spent)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
