"use client";

import { useEffect, useState } from "react";
import { Loader2, Save, CheckCircle2 } from "lucide-react";

export default function AdminSettings() {
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((s) => {
        setNumber(s.whatsapp_number || "");
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  async function save() {
    setSaving(true);
    await fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ whatsapp_number: number }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="p-5 lg:p-8">
      <h1 className="font-display text-3xl font-bold text-brand-cream">
        Settings
      </h1>
      <p className="text-brand-cream/50">Store configuration</p>

      {loading ? (
        <div className="mt-20 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-brand-saffron" />
        </div>
      ) : (
        <div className="mt-8 max-w-lg rounded-2xl glass p-6">
          <h3 className="font-display text-lg font-bold text-brand-cream">
            WhatsApp Order Number
          </h3>
          <p className="mt-1 text-sm text-brand-cream/50">
            All checkout orders are sent to this number. Use international format
            with country code, e.g. <code>919876543210</code> (no +, no spaces).
          </p>
          <input
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="919876543210"
            className="mt-4 w-full rounded-xl bg-white/5 px-4 py-3 text-brand-cream outline-none focus:ring-1 focus:ring-brand-saffron"
          />
          <button
            onClick={save}
            disabled={saving}
            className="btn-primary mt-4 disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : saved ? (
              <>
                <CheckCircle2 className="h-4 w-4" /> Saved
              </>
            ) : (
              <>
                <Save className="h-4 w-4" /> Save Settings
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
