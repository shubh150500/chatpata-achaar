"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, X, Loader2 } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatINR } from "@/lib/utils";

const blank = {
  name: "",
  weight: "500g",
  price: 0,
  mrp: 0,
  description: "",
  image: "",
  category: "Pickle",
  spiceLevel: 3,
  featured: false,
  inStock: true,
};

type Draft = typeof blank & { id?: string };

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Draft | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const res = await fetch("/api/products");
    setProducts(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function save() {
    if (!editing) return;
    setSaving(true);
    const isEdit = !!editing.id;
    const res = await fetch(
      isEdit ? `/api/products/${editing.id}` : "/api/products",
      {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      }
    );
    setSaving(false);
    if (res.ok) {
      setEditing(null);
      load();
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this product?")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    load();
  }

  function onImageFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !editing) return;
    // For the demo we read as base64 data URL (no external storage needed).
    const reader = new FileReader();
    reader.onload = () =>
      setEditing({ ...editing, image: reader.result as string });
    reader.readAsDataURL(file);
  }

  return (
    <div className="p-5 lg:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-brand-cream">
            Products
          </h1>
          <p className="text-brand-cream/50">{products.length} items</p>
        </div>
        <button onClick={() => setEditing({ ...blank })} className="btn-primary">
          <Plus className="h-4 w-4" /> Add Product
        </button>
      </div>

      {loading ? (
        <div className="mt-20 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-brand-saffron" />
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <div key={p.id} className="overflow-hidden rounded-2xl glass">
              <div className="relative aspect-video">
                {p.image && (
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="320px"
                    className="object-cover"
                  />
                )}
                {p.featured && (
                  <span className="absolute left-2 top-2 rounded-full bg-brand-saffron px-2 py-0.5 text-[10px] font-bold text-black">
                    FEATURED
                  </span>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-brand-cream">{p.name}</h3>
                  <span className="text-xs text-brand-cream/50">{p.weight}</span>
                </div>
                <p className="mt-1 font-bold text-brand-mustard">
                  {formatINR(p.price)}
                </p>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => setEditing({ ...blank, ...p, mrp: p.mrp ?? 0 })}
                    className="flex flex-1 items-center justify-center gap-1 rounded-lg glass py-2 text-sm hover:bg-white/10"
                  >
                    <Pencil className="h-3.5 w-3.5" /> Edit
                  </button>
                  <button
                    onClick={() => remove(p.id)}
                    className="flex items-center justify-center rounded-lg bg-brand-red/20 px-3 py-2 text-brand-red hover:bg-brand-red/30"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {editing && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditing(null)}
              className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed left-1/2 top-1/2 z-[90] max-h-[90vh] w-[92vw] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-3xl bg-[#1a1010] p-6 no-scrollbar"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xl font-bold text-brand-cream">
                  {editing.id ? "Edit" : "New"} Product
                </h2>
                <button
                  onClick={() => setEditing(null)}
                  className="grid h-9 w-9 place-items-center rounded-full glass"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-5 space-y-3">
                <Field label="Name">
                  <input
                    value={editing.name}
                    onChange={(e) =>
                      setEditing({ ...editing, name: e.target.value })
                    }
                    className="input"
                  />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Weight">
                    <input
                      value={editing.weight}
                      onChange={(e) =>
                        setEditing({ ...editing, weight: e.target.value })
                      }
                      className="input"
                    />
                  </Field>
                  <Field label="Category">
                    <input
                      value={editing.category}
                      onChange={(e) =>
                        setEditing({ ...editing, category: e.target.value })
                      }
                      className="input"
                    />
                  </Field>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Price (₹)">
                    <input
                      type="number"
                      value={editing.price}
                      onChange={(e) =>
                        setEditing({ ...editing, price: Number(e.target.value) })
                      }
                      className="input"
                    />
                  </Field>
                  <Field label="MRP (₹, optional)">
                    <input
                      type="number"
                      value={editing.mrp}
                      onChange={(e) =>
                        setEditing({ ...editing, mrp: Number(e.target.value) })
                      }
                      className="input"
                    />
                  </Field>
                </div>
                <Field label="Description">
                  <textarea
                    rows={3}
                    value={editing.description}
                    onChange={(e) =>
                      setEditing({ ...editing, description: e.target.value })
                    }
                    className="input"
                  />
                </Field>
                <Field label="Image URL or upload">
                  <input
                    value={editing.image}
                    placeholder="https://..."
                    onChange={(e) =>
                      setEditing({ ...editing, image: e.target.value })
                    }
                    className="input"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={onImageFile}
                    className="mt-2 text-xs text-brand-cream/60 file:mr-3 file:rounded-full file:border-0 file:bg-brand-saffron file:px-3 file:py-1.5 file:text-black"
                  />
                </Field>
                <Field label={`Spice Level: ${editing.spiceLevel}/5`}>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    value={editing.spiceLevel}
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        spiceLevel: Number(e.target.value),
                      })
                    }
                    className="w-full accent-brand-saffron"
                  />
                </Field>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-sm text-brand-cream/70">
                    <input
                      type="checkbox"
                      checked={editing.featured}
                      onChange={(e) =>
                        setEditing({ ...editing, featured: e.target.checked })
                      }
                      className="accent-brand-saffron"
                    />
                    Featured
                  </label>
                  <label className="flex items-center gap-2 text-sm text-brand-cream/70">
                    <input
                      type="checkbox"
                      checked={editing.inStock}
                      onChange={(e) =>
                        setEditing({ ...editing, inStock: e.target.checked })
                      }
                      className="accent-brand-saffron"
                    />
                    In Stock
                  </label>
                </div>
              </div>

              <button
                onClick={save}
                disabled={saving || !editing.name || !editing.price}
                className="btn-primary mt-6 w-full disabled:opacity-50"
              >
                {saving ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  "Save Product"
                )}
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .input {
          width: 100%;
          border-radius: 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 0.625rem 0.875rem;
          color: #fff8e1;
          font-size: 0.875rem;
          outline: none;
        }
        .input:focus {
          border-color: #ff6f00;
        }
      `}</style>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs text-brand-cream/60">{label}</label>
      {children}
    </div>
  );
}
