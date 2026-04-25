import Link from "next/link";
import type { User } from "@/lib/types";

type NavItem = { href: string; label: string };

export default function AppShell({
  user,
  nav,
  children,
}: {
  user: User;
  nav: NavItem[];
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-brand text-white">
        <div className="mx-auto max-w-7xl px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-white/20 grid place-items-center font-bold">KS</div>
            <span className="font-semibold">Koperasi Sejahtera</span>
          </Link>
          <div className="flex items-center gap-3 text-sm">
            <div className="hidden sm:block text-right">
              <div className="font-medium leading-tight">{user.nama}</div>
              <div className="text-xs text-white/80 leading-tight">
                {user.role === "pengurus" ? "Pengurus" : `Anggota · ${user.nomorAnggota ?? ""}`}
              </div>
            </div>
            <form action="/logout" method="post">
              <button type="submit" className="btn-secondary">
                Keluar
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl w-full px-6 py-6 grid md:grid-cols-[220px_1fr] gap-6 flex-1">
        <aside>
          <nav className="card p-2 md:sticky md:top-6">
            <ul className="space-y-1">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="block rounded px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
        {description && <p className="text-sm text-slate-600 mt-1">{description}</p>}
      </div>
      {actions && <div className="flex gap-2">{actions}</div>}
    </div>
  );
}
