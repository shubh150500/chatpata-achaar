import type { CartItem, CheckoutDetails } from "@/lib/types";
import { formatINR } from "@/lib/utils";

export function buildWhatsAppMessage(
  details: CheckoutDetails,
  items: CartItem[],
  total: number,
  orderNumber?: string
) {
  const lines: string[] = [];
  lines.push("*🥭 NEW ORDER — CHATPATA ACHAAR*");
  if (orderNumber) lines.push(`*Order:* ${orderNumber}`);
  lines.push("");
  lines.push("*Customer Details*");
  lines.push(`Name: ${details.name}`);
  lines.push(`Phone: ${details.phone}`);
  lines.push(`Address: ${details.address}`);
  lines.push(`City: ${details.city}`);
  lines.push(`State: ${details.state}`);
  lines.push(`PIN: ${details.pincode}`);
  if (details.notes) lines.push(`Notes: ${details.notes}`);
  lines.push("");
  lines.push("*Products*");
  items.forEach((i) => {
    lines.push(
      `- ${i.name} ${i.weight} x ${i.quantity} = ${formatINR(
        i.price * i.quantity
      )}`
    );
  });
  lines.push("");
  lines.push(`*Total: ${formatINR(total)}*`);
  lines.push("");
  lines.push("_Sent from chatpataachaar.com_");

  return lines.join("\n");
}

export function buildWhatsAppUrl(number: string, message: string) {
  const clean = number.replace(/[^\d]/g, "");
  return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`;
}
