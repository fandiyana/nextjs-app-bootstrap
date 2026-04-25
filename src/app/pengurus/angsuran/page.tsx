import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { PageHeader } from "@/components/AppShell";
import { requireRole } from "@/lib/auth";
import { formatRupiah, formatTanggal } from "@/lib/format";
import {
  angsuranPerBulan,
  findPinjamanById,
  findUserById,
  listPinjamanAll,
  sisaPinjaman,
  tambahAngsuran,
} from "@/lib/store";

export default function PengurusAngsuranPage({
  searchParams,
}: {
  searchParams: { error?: string; ok?: string };
}) {
  requireRole("pengurus");
  const pinjamanList = listPinjamanAll();
  const aktif = pinjamanList.filter((p) => p.status === "aktif");

  async function action(formData: FormData) {
    "use server";
    requireRole("pengurus");
    const pinjamanId = String(formData.get("pinjamanId") ?? "");
    const jumlah = Number(formData.get("jumlah") ?? 0);
    const tanggal = String(formData.get("tanggal") ?? "") || new Date().toISOString().slice(0, 10);
    const keterangan = String(formData.get("keterangan") ?? "").trim();

    const p = findPinjamanById(pinjamanId);
    if (!p) {
      redirect("/pengurus/angsuran?error=pinjaman_tidak_valid");
    }
    if (!Number.isFinite(jumlah) || jumlah <= 0) {
      redirect("/pengurus/angsuran?error=jumlah_tidak_valid");
    }

    tambahAngsuran({
      pinjamanId,
      jumlah,
      tanggal,
      keterangan: keterangan || undefined,
    });

    revalidatePath("/pengurus/angsuran");
    revalidatePath("/pengurus/pinjaman");
    revalidatePath("/pengurus");
    revalidatePath("/anggota");
    revalidatePath("/anggota/pinjaman");
    redirect("/pengurus/angsuran?ok=1");
  }

  return (
    <>
      <PageHeader title="Angsuran" description="Catat pembayaran angsuran pinjaman." />

      {searchParams?.ok && (
        <div className="mb-4 rounded border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
          Angsuran berhasil dicatat.
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
            <h2 className="font-semibold">Pinjaman Aktif</h2>
          </div>
          <div className="card-body p-0 overflow-x-auto">
            {aktif.length === 0 ? (
              <div className="p-5 text-sm text-slate-500">Tidak ada pinjaman aktif.</div>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Tanggal</th>
                    <th>Anggota</th>
                    <th className="text-right">Pokok</th>
                    <th className="text-right">Angs/Bulan</th>
                    <th className="text-right">Sisa</th>
                  </tr>
                </thead>
                <tbody>
                  {aktif.map((p) => {
                    const u = findUserById(p.anggotaId);
                    return (
                      <tr key={p.id}>
                        <td>{formatTanggal(p.tanggalPinjam)}</td>
                        <td>{u?.nama ?? p.anggotaId}</td>
                        <td className="text-right">{formatRupiah(p.pokok)}</td>
                        <td className="text-right">{formatRupiah(angsuranPerBulan(p))}</td>
                        <td className="text-right font-medium">{formatRupiah(sisaPinjaman(p))}</td>
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
            <h2 className="font-semibold">Input Angsuran</h2>
          </div>
          <div className="card-body">
            {aktif.length === 0 ? (
              <p className="text-sm text-slate-500">
                Tidak ada pinjaman aktif yang bisa diangsur.
              </p>
            ) : (
              <form action={action} className="space-y-3">
                <div>
                  <label className="label">Pinjaman</label>
                  <select className="input" name="pinjamanId" required defaultValue="">
                    <option value="" disabled>
                      -- Pilih pinjaman --
                    </option>
                    {aktif.map((p) => {
                      const u = findUserById(p.anggotaId);
                      return (
                        <option key={p.id} value={p.id}>
                          {u?.nama ?? p.anggotaId} · {formatRupiah(p.pokok)} ·{" "}
                          sisa {formatRupiah(sisaPinjaman(p))}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div>
                  <label className="label">Jumlah Angsuran (Rp)</label>
                  <input className="input" name="jumlah" type="number" min="1" step="1" required />
                </div>
                <div>
                  <label className="label">Tanggal</label>
                  <input
                    className="input"
                    name="tanggal"
                    type="date"
                    defaultValue={new Date().toISOString().slice(0, 10)}
                  />
                </div>
                <div>
                  <label className="label">Keterangan</label>
                  <input className="input" name="keterangan" placeholder="opsional" />
                </div>
                <button type="submit" className="btn-primary w-full">
                  Catat Angsuran
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
