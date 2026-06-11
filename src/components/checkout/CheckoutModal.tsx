"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, CheckCircle2 } from "lucide-react";
import { useCart } from "@/store/cart";
import { formatINR } from "@/lib/utils";
import type { CheckoutDetails } from "@/lib/types";
import { buildWhatsAppMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

const empty: CheckoutDetails = {
  name: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  notes: "",
};

const fields: {
  key: keyof CheckoutDetails;
  label: string;
  type?: string;
  full?: boolean;
  required?: boolean;
}[] = [
  { key: "name", label: "Full Name", required: true },
  { key: "phone", label: "Mobile Number", type: "tel", required: true },
  { key: "address", label: "Address", full: true, required: true },
  { key: "city", label: "City", required: true },
  { key: "state", label: "State", required: true },
  { key: "pincode", label: "PIN Code", required: true },
  { key: "notes", label: "Order Notes (optional)", full: true },
];

export default function CheckoutModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { items, clear, close } = useCart();
  const total = useCart((s) => s.total());
  const [details, setDetails] = useState<CheckoutDetails>(empty);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [waNumber, setWaNumber] = useState(
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919999999999"
  );

  useEffect(() => {
    if (!open) return;
    // fetch configurable admin number
    fetch("/api/settings")
      .then((r) => r.json())
      .then((s) => {
        if (s.whatsapp_number) setWaNumber(s.whatsapp_number);
      })
      .catch(() => {});
  }, [open]);

  const valid =
    details.name &&
    details.phone &&
    details.address &&
    details.city &&
    details.state &&
    details.pincode &&
    items.length > 0;

  async function placeOrder() {
    if (!valid) return;
    setLoading(true);

    // Open the tab synchronously on the click so the browser doesn't block it
    // as a popup (after an await, the user-gesture is lost).
    const waTab = window.open("", "_blank");

    let orderNumber: string | undefined;
    try {
      // Persist the order to DB so admin sees it
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ details, items, total }),
      });
      if (res.ok) {
        const order = await res.json();
        orderNumber = order.orderNumber;
      }
    } catch {
      // even if persistence fails, still let them send WhatsApp
    }

    const message = buildWhatsAppMessage(details, items, total, orderNumber);
    const url = buildWhatsAppUrl(waNumber, message);

    setLoading(false);
    setDone(true);

    // Redirect the pre-opened tab; fall back to current-tab navigation
    if (waTab && !waTab.closed) {
      waTab.location.href = url;
    } else {
      window.location.href = url;
    }

    setTimeout(() => {
      clear();
      close();
      setDone(false);
      setDetails(empty);
      onClose();
    }, 2500);
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm"
          />
          {/* Full-screen centering wrapper (flex), so the modal is always
              vertically + horizontally centered regardless of its height. */}
          <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="flex max-h-[88vh] w-full max-w-lg flex-col overflow-hidden rounded-3xl bg-luxury-gradient shadow-glass"
            >
            <div className="flex shrink-0 items-center justify-between border-b border-white/10 p-5">
              <h3 className="font-display text-xl font-bold text-brand-cream">
                Delivery Details
              </h3>
              <button
                onClick={onClose}
                className="grid h-9 w-9 place-items-center rounded-full glass"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {done ? (
              <div className="flex flex-col items-center gap-4 p-12 text-center">
                <CheckCircle2 className="h-16 w-16 text-green-400" />
                <p className="font-display text-2xl font-bold text-brand-cream">
                  Order ready!
                </p>
                <p className="text-brand-cream/70">
                  We&apos;ve opened WhatsApp with your order. Send the message to
                  confirm.
                </p>
              </div>
            ) : (
              <>
              <div className="flex-1 overflow-y-auto p-5">
                <div className="grid grid-cols-2 gap-3">
                  {fields.map((f) => (
                    <div
                      key={f.key}
                      className={f.full ? "col-span-2" : "col-span-2 sm:col-span-1"}
                    >
                      <label className="mb-1 block text-xs text-brand-cream/60">
                        {f.label}
                        {f.required && <span className="text-brand-red"> *</span>}
                      </label>
                      {f.key === "notes" || f.key === "address" ? (
                        <textarea
                          rows={2}
                          value={details[f.key] || ""}
                          onChange={(e) =>
                            setDetails({ ...details, [f.key]: e.target.value })
                          }
                          className="w-full rounded-xl glass px-3 py-2 text-sm text-brand-cream outline-none focus:ring-1 focus:ring-brand-saffron"
                        />
                      ) : (
                        <input
                          type={f.type || "text"}
                          value={details[f.key] || ""}
                          onChange={(e) =>
                            setDetails({ ...details, [f.key]: e.target.value })
                          }
                          className="w-full rounded-xl glass px-3 py-2 text-sm text-brand-cream outline-none focus:ring-1 focus:ring-brand-saffron"
                        />
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-2xl glass p-4">
                  <p className="mb-2 text-xs uppercase tracking-widest text-brand-mustard">
                    Order summary
                  </p>
                  {items.map((i) => (
                    <div
                      key={i.id}
                      className="flex justify-between py-1 text-sm text-brand-cream/80"
                    >
                      <span>
                        {i.name} {i.weight} × {i.quantity}
                      </span>
                      <span>{formatINR(i.price * i.quantity)}</span>
                    </div>
                  ))}
                  <div className="mt-2 flex justify-between border-t border-white/10 pt-2 font-bold text-brand-cream">
                    <span>Total</span>
                    <span className="text-gradient-gold">{formatINR(total)}</span>
                  </div>
                </div>
              </div>

              {/* Fixed footer — button always visible regardless of scroll */}
              <div className="shrink-0 border-t border-white/10 bg-black/30 p-4">
                <button
                  disabled={!valid || loading}
                  onClick={placeOrder}
                  className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    "Place Order on WhatsApp"
                  )}
                </button>
                {!valid && (
                  <p className="mt-2 text-center text-xs text-brand-cream/50">
                    Please fill all required fields
                  </p>
                )}
              </div>
              </>
            )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
