import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { PageHeader } from "@/components/AppShell";
import { requireRole } from "@/lib/auth";
import { formatRupiah, formatTanggal } from "@/lib/format";
import {
  angsuranPerBulan,
  findUserById,
  listAnggota,
  listPinjamanAll,
  sisaPinjaman,
  tambahPinjaman,
  totalKewajibanPinjaman,
} from "@/lib/store";

export default function PengurusPinjamanPage({
  searchParams,
}: {
  searchParams: { error?: string; ok?: string };
}) {
  requireRole("pengurus");
  const anggota = listAnggota();
  const items = listPinjamanAll();

  async function action(formData: FormData) {
    "use server";
    requireRole("pengurus");
    const anggotaId = String(formData.get("anggotaId") ?? "");
    const pokok = Number(formData.get("pokok") ?? 0);
    const bunga = Number(formData.get("bunga") ?? 0);
    const tenor = Number(formData.get("tenor") ?? 0);
    const tanggalPinjam = String(formData.get("tanggalPinjam") ?? "") || new Date().toISOString().slice(0, 10);
    const keterangan = String(formData.get("keterangan") ?? "").trim();

    if (!anggotaId || !findUserById(anggotaId)) {
      redirect("/pengurus/pinjaman?error=anggota_tidak_valid");
    }
    if (!Number.isFinite(pokok) || pokok <= 0) {
      redirect("/pengurus/pinjaman?error=pokok_tidak_valid");
    }
    if (!Number.isFinite(bunga) || bunga < 0) {
      redirect("/pengurus/pinjaman?error=bunga_tidak_valid");
    }
    if (!Number.isFinite(tenor) || tenor <= 0) {
      redirect("/pengurus/pinjaman?error=tenor_tidak_valid");
    }

    tambahPinjaman({
      anggotaId,
      pokok,
      bunga,
      tenor,
      tanggalPinjam,
      keterangan: keterangan || undefined,
    });

    revalidatePath("/pengurus/pinjaman");
    revalidatePath("/pengurus");
    revalidatePath("/anggota");
    revalidatePath("/anggota/pinjaman");
    redirect("/pengurus/pinjaman?ok=1");
  }

  return (
    <>
      <PageHeader title="Pinjaman" description="Daftar pinjaman dan input pinjaman baru." />

      {searchParams?.ok && (
        <div className="mb-4 rounded border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
          Pinjaman berhasil dicatat.
        </div>
      )}
      {searchParams?.error && (
        <div className="mb-4 rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          Gagal: {decodeURIComponent(searchParams.error)}
        </div>
      )}

      <div className="grid lg:grid-cols-[1fr_360px] gap-4">
        <div className="card">
          <div className="card-header">
            <h2 className="font-semibold">Daftar Pinjaman</h2>
          </div>
          <div className="card-body p-0 overflow-x-auto">
            {items.length === 0 ? (
              <div className="p-5 text-sm text-slate-500">Belum ada pinjaman.</div>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Tanggal</th>
                    <th>Anggota</th>
                    <th className="text-right">Pokok</th>
                    <th>Bunga</th>
                    <th>Tenor</th>
                    <th className="text-right">Angs/Bulan</th>
                    <th className="text-right">Sisa</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((p) => {
                    const u = findUserById(p.anggotaId);
                    return (
                      <tr key={p.id}>
                        <td>{formatTanggal(p.tanggalPinjam)}</td>
                        <td>{u?.nama ?? p.anggotaId}</td>
                        <td className="text-right font-medium">{formatRupiah(p.pokok)}</td>
                        <td>{p.bunga}%/bln</td>
                        <td>{p.tenor} bln</td>
                        <td className="text-right">{formatRupiah(angsuranPerBulan(p))}</td>
                        <td className="text-right font-medium">
                          {formatRupiah(sisaPinjaman(p))}
                          <div className="text-[11px] text-slate-500">dari {formatRupiah(totalKewajibanPinjaman(p))}</div>
                        </td>
                        <td>
                          <span className={p.status === "aktif" ? "badge-amber" : "badge-green"}>
                            {p.status === "aktif" ? "Aktif" : "Lunas"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="font-semibold">Input Pinjaman</h2>
          </div>
          <div className="card-body">
            <form action={action} className="space-y-3">
              <div>
                <label className="label">Anggota</label>
                <select className="input" name="anggotaId" required defaultValue="">
                  <option value="" disabled>
                    -- Pilih anggota --
                  </option>
                  {anggota.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.nomorAnggota} · {a.nama}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label">Pokok Pinjaman (Rp)</label>
                <input className="input" name="pokok" type="number" min="1" step="1" required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">Bunga (% / bulan)</label>
                  <input className="input" name="bunga" type="number" min="0" step="0.01" defaultValue={1.5} required />
                </div>
                <div>
                  <label className="label">Tenor (bulan)</label>
                  <input className="input" name="tenor" type="number" min="1" step="1" defaultValue={12} required />
                </div>
              </div>
              <div>
                <label className="label">Tanggal Pinjam</label>
                <input
                  className="input"
                  name="tanggalPinjam"
                  type="date"
                  defaultValue={new Date().toISOString().slice(0, 10)}
                />
              </div>
              <div>
                <label className="label">Keterangan</label>
                <input className="input" name="keterangan" placeholder="opsional" />
              </div>
              <button type="submit" className="btn-primary w-full">
                Catat Pinjaman
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
