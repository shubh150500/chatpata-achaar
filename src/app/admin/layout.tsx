import AdminSidebar from "@/components/admin/AdminSidebar";
import { cookies } from "next/headers";
import { verifySession, SESSION_COOKIE } from "@/lib/auth";

// Admin section uses its own chrome. Login page renders without the sidebar
// because it lives at /admin/login and we detect the session here.
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  const session = token ? await verifySession(token) : null;

  // If not logged in, render children bare (the login page handles its own UI).
  if (!session) {
    return <div className="min-h-screen bg-luxury-gradient">{children}</div>;
  }

  return (
    <div className="flex min-h-screen bg-[#0c0808]">
      <AdminSidebar />
      <div className="flex-1 overflow-x-hidden">{children}</div>
    </div>
  );
}
