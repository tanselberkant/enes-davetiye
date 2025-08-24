import { redirect } from "next/navigation";
import { isAuthenticated, loginWithCredentials } from "@/lib/auth";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function loginAction(formData: FormData) {
  "use server";
  const username = String(formData.get("username") || "");
  const password = String(formData.get("password") || "");

  const result = await loginWithCredentials(username, password);
  if (result.ok) {
    redirect("/admin");
  }
  redirect("/admin/login?error=1");
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams?: { error?: string };
}) {
  const authed = await isAuthenticated();
  if (authed) {
    redirect("/admin");
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white text-[#171717] rounded-lg shadow p-6">
        <h1 className="text-2xl font-semibold mb-4">Admin Giriş</h1>
        <form action={loginAction} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm mb-1">
              Kullanıcı Adı
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/20"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm mb-1">
              Şifre
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/20"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white rounded-md py-2 hover:bg-black/90"
          >
            Giriş Yap
          </button>
        </form>
        {searchParams?.error ? (
          <p className="text-sm text-red-600 mt-3">
            Geçersiz kullanıcı adı veya şifre
          </p>
        ) : null}
        <Link href="/">
          <p className="text-center text-lg text-black mt-4">Ana Sayfaya Dön</p>
        </Link>
      </div>
    </div>
  );
}
