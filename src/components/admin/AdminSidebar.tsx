"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
} from "lucide-react";
import LogoPlaceholder from "@/components/ui/LogoPlaceholder";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { label: "Customers", href: "/admin/customers", icon: Users },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="sticky top-0 flex h-screen w-16 flex-col border-r border-white/10 bg-black/40 py-5 backdrop-blur-xl lg:w-60">
      <div className="mb-8 flex items-center gap-3 px-3 lg:px-5">
        <LogoPlaceholder size="sm" />
        <span className="hidden font-display text-sm font-bold text-brand-cream lg:block">
          CHATPATA <span className="text-gradient">ACHAAR</span>
        </span>
      </div>

      <nav className="flex-1 space-y-1 px-2 lg:px-3">
        {nav.map((n) => {
          const active =
            pathname === n.href ||
            (n.href !== "/admin" && pathname.startsWith(n.href));
          return (
            <Link
              key={n.href}
              href={n.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition-colors",
                active
                  ? "bg-gradient-to-r from-brand-saffron/30 to-brand-red/20 text-brand-cream"
                  : "text-brand-cream/60 hover:bg-white/5 hover:text-brand-cream"
              )}
            >
              <n.icon className="h-5 w-5 shrink-0" />
              <span className="hidden lg:block">{n.label}</span>
            </Link>
          );
        })}
      </nav>

      <button
        onClick={logout}
        className="mx-2 flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-brand-cream/60 hover:bg-white/5 hover:text-brand-red lg:mx-3"
      >
        <LogOut className="h-5 w-5 shrink-0" />
        <span className="hidden lg:block">Logout</span>
      </button>
    </aside>
  );
}
