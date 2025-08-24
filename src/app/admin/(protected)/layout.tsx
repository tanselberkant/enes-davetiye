import { ReactNode } from "react";
import { isAuthenticated, logout } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const authed = await isAuthenticated();
  if (!authed) {
    redirect("/admin/login");
  }

  async function logoutAction() {
    "use server";
    await logout();
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="w-full border-b bg-white text-[#171717]">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <span className="font-semibold">Admin Dashboard</span>
          <form action={logoutAction}>
            <button className="text-sm px-3 py-1.5 rounded-md border hover:bg-black/5">
              Çıkış Yap
            </button>
          </form>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
