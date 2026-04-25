import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { PageHeader } from "@/components/AppShell";
import { requireRole } from "@/lib/auth";
import { formatRupiah, formatTanggal } from "@/lib/format";
import { listAnggota, tambahAnggota, totalSimpanan } from "@/lib/store";

export default function PengurusAnggotaPage({
  searchParams,
}: {
  searchParams: { error?: string; ok?: string };
}) {
  requireRole("pengurus");
  const anggota = listAnggota();

  async function action(formData: FormData) {
    "use server";
    requireRole("pengurus");
    const username = String(formData.get("username") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const nama = String(formData.get("nama") ?? "").trim();
    const alamat = String(formData.get("alamat") ?? "").trim();
    const telepon = String(formData.get("telepon") ?? "").trim();
    if (!username || !password || !nama) {
      redirect("/pengurus/anggota?error=missing");
    }
    try {
      tambahAnggota({ username, password, nama, alamat, telepon });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "gagal";
      redirect(`/pengurus/anggota?error=${encodeURIComponent(msg)}`);
    }
    revalidatePath("/pengurus/anggota");
    revalidatePath("/pengurus");
    redirect("/pengurus/anggota?ok=1");
  }

  return (
    <>
      <PageHeader title="Anggota" description="Kelola data anggota koperasi." />

      {searchParams?.ok && (
        <div className="mb-4 rounded border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
          Anggota berhasil ditambahkan.
        </div>
      )}
      {searchParams?.error && (
        <div className="mb-4 rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          Gagal: {searchParams.error}
        </div>
      )}

      <div className="grid lg:grid-cols-[1fr_360px] gap-4">
        <div className="card">
          <div className="card-header">
            <h2 className="font-semibold">Daftar Anggota</h2>
          </div>
          <div className="card-body p-0 overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>No. Anggota</th>
                  <th>Nama</th>
                  <th>Username</th>
                  <th>Telepon</th>
                  <th>Bergabung</th>
                  <th className="text-right">Total Simpanan</th>
                </tr>
              </thead>
              <tbody>
                {anggota.map((a) => (
                  <tr key={a.id}>
                    <td className="font-mono">{a.nomorAnggota}</td>
                    <td>{a.nama}</td>
                    <td className="font-mono">{a.username}</td>
                    <td>{a.telepon ?? "-"}</td>
                    <td>{formatTanggal(a.tanggalGabung ?? "")}</td>
                    <td className="text-right font-medium">
                      {formatRupiah(totalSimpanan(a.id))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="font-semibold">Tambah Anggota</h2>
          </div>
          <div className="card-body">
            <form action={action} className="space-y-3">
              <div>
                <label className="label">Nama Lengkap</label>
                <input className="input" name="nama" required />
              </div>
              <div>
                <label className="label">Username</label>
                <input className="input" name="username" required />
              </div>
              <div>
                <label className="label">Password</label>
                <input className="input" name="password" type="password" required />
              </div>
              <div>
                <label className="label">Alamat</label>
                <input className="input" name="alamat" />
              </div>
              <div>
                <label className="label">Telepon</label>
                <input className="input" name="telepon" />
              </div>
              <button type="submit" className="btn-primary w-full">
                Simpan Anggota
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
