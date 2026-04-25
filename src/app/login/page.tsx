import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser, login } from "@/lib/auth";

export default function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const user = getCurrentUser();
  if (user) {
    redirect(user.role === "pengurus" ? "/pengurus" : "/anggota");
  }

  async function action(formData: FormData) {
    "use server";
    const username = String(formData.get("username") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const u = login(username, password);
    if (!u) {
      redirect("/login?error=1");
    }
    redirect(u.role === "pengurus" ? "/pengurus" : "/anggota");
  }

  return (
    <main className="min-h-screen grid place-items-center bg-slate-100 px-4">
      <div className="w-full max-w-md card p-8">
        <Link href="/" className="text-sm text-brand hover:underline">
          ← Kembali ke beranda
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-slate-900">Masuk</h1>
        <p className="mt-1 text-sm text-slate-600">
          Masuk untuk mengakses dashboard anggota atau pengurus.
        </p>

        {searchParams?.error && (
          <div className="mt-4 rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            Username atau password salah.
          </div>
        )}

        <form action={action} className="mt-6 space-y-4">
          <div>
            <label className="label" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className="input"
              placeholder="contoh: budi"
            />
          </div>
          <div>
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="input"
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="btn-primary w-full">
            Masuk
          </button>
        </form>

        <div className="mt-6 text-xs text-slate-500">
          Belum punya akun? Hubungi pengurus koperasi untuk pendaftaran.
        </div>
      </div>
    </main>
  );
}
