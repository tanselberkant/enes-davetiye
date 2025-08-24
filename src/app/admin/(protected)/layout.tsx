import { ReactNode } from "react";
import { isAuthenticated, logout } from "@/lib/auth";
import { redirect } from "next/navigation";
import ReturnHomeButton from "@/components/ReturnHomeButton";

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
          <div className="flex items-center gap-2">
            <ReturnHomeButton />
            <form action={logoutAction}>
              <button className="text-sm px-3 py-1.5 rounded-md border hover:bg-red-500/10 bg-red-500 cursor-pointer">
                Çıkış Yap
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
