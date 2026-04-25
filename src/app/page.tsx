import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";

export default function HomePage() {
  const user = getCurrentUser();

  return (
    <main className="min-h-screen">
      <header className="bg-brand text-white">
        <div className="mx-auto max-w-6xl px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-md bg-white/20 grid place-items-center font-bold">KS</div>
            <span className="font-semibold text-lg">Koperasi Sejahtera</span>
          </div>
          <nav className="flex items-center gap-3">
            {user ? (
              <Link
                href={user.role === "pengurus" ? "/pengurus" : "/anggota"}
                className="btn-secondary"
              >
                Buka Dashboard
              </Link>
            ) : (
              <Link href="/login" className="btn-secondary">
                Masuk
              </Link>
            )}
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
              Kelola Simpanan & Pinjaman Koperasi dengan Mudah
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Anggota dapat memantau saldo simpanan dan status pinjaman secara
              transparan. Pengurus mengelola transaksi simpanan, pinjaman, dan
              angsuran dalam satu tempat.
            </p>
            <div className="mt-6 flex gap-3">
              <Link href="/login" className="btn-primary">
                Masuk ke Akun
              </Link>
              <a href="#fitur" className="btn-secondary">
                Pelajari Fitur
              </a>
            </div>
          </div>
          <div className="card p-6">
            <h2 className="font-semibold text-slate-800">Akun Demo</h2>
            <p className="text-sm text-slate-500 mt-1">
              Gunakan akun berikut untuk mencoba aplikasi.
            </p>
            <div className="mt-4 overflow-hidden rounded border border-slate-200">
              <table className="table">
                <thead>
                  <tr>
                    <th>Role</th>
                    <th>Username</th>
                    <th>Password</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Pengurus</td>
                    <td className="font-mono">admin</td>
                    <td className="font-mono">admin123</td>
                  </tr>
                  <tr>
                    <td>Anggota</td>
                    <td className="font-mono">budi</td>
                    <td className="font-mono">budi123</td>
                  </tr>
                  <tr>
                    <td>Anggota</td>
                    <td className="font-mono">siti</td>
                    <td className="font-mono">siti123</td>
                  </tr>
                  <tr>
                    <td>Anggota</td>
                    <td className="font-mono">andi</td>
                    <td className="font-mono">andi123</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section id="fitur" className="bg-white border-t border-slate-200">
        <div className="mx-auto max-w-6xl px-6 py-16 grid md:grid-cols-3 gap-6">
          <FeatureCard
            title="Untuk Anggota"
            items={[
              "Lihat saldo simpanan pokok, wajib, dan sukarela",
              "Riwayat transaksi simpanan",
              "Status pinjaman aktif & sisa angsuran",
            ]}
          />
          <FeatureCard
            title="Untuk Pengurus"
            items={[
              "Tambah anggota baru",
              "Input transaksi simpanan (setor / tarik)",
              "Catat pinjaman dan angsuran",
            ]}
          />
          <FeatureCard
            title="Transparan & Rapi"
            items={[
              "Riwayat transaksi tercatat",
              "Perhitungan otomatis sisa pinjaman",
              "Antarmuka responsif & mudah digunakan",
            ]}
          />
        </div>
      </section>

      <footer className="bg-slate-900 text-slate-300">
        <div className="mx-auto max-w-6xl px-6 py-8 text-sm flex flex-col md:flex-row justify-between gap-3">
          <span>© {new Date().getFullYear()} Koperasi Sejahtera</span>
          <span>Aplikasi simpan pinjam internal koperasi.</span>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="card p-6">
      <h3 className="font-semibold text-lg text-slate-900">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm text-slate-600">
        {items.map((it) => (
          <li key={it} className="flex gap-2">
            <span className="text-brand">•</span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
