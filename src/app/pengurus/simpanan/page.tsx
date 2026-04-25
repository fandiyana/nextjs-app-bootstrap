import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { PageHeader } from "@/components/AppShell";
import { requireRole } from "@/lib/auth";
import { formatRupiah, formatTanggal } from "@/lib/format";
import {
  findUserById,
  listAnggota,
  listSimpananAll,
  tambahSimpanan,
} from "@/lib/store";
import type { JenisSimpanan, TipeSimpanan } from "@/lib/types";

export default function PengurusSimpananPage({
  searchParams,
}: {
  searchParams: { error?: string; ok?: string };
}) {
  requireRole("pengurus");
  const anggota = listAnggota();
  const items = listSimpananAll();

  async function action(formData: FormData) {
    "use server";
    requireRole("pengurus");
    const anggotaId = String(formData.get("anggotaId") ?? "");
    const jenis = String(formData.get("jenis") ?? "wajib") as JenisSimpanan;
    const tipe = String(formData.get("tipe") ?? "setor") as TipeSimpanan;
    const jumlah = Number(formData.get("jumlah") ?? 0);
    const tanggal = String(formData.get("tanggal") ?? "") || new Date().toISOString().slice(0, 10);
    const keterangan = String(formData.get("keterangan") ?? "").trim();

    if (!anggotaId || !findUserById(anggotaId)) {
      redirect("/pengurus/simpanan?error=anggota_tidak_valid");
    }
    if (!Number.isFinite(jumlah) || jumlah <= 0) {
      redirect("/pengurus/simpanan?error=jumlah_tidak_valid");
    }
    if (!["pokok", "wajib", "sukarela"].includes(jenis)) {
      redirect("/pengurus/simpanan?error=jenis_tidak_valid");
    }
    if (!["setor", "tarik"].includes(tipe)) {
      redirect("/pengurus/simpanan?error=tipe_tidak_valid");
    }

    tambahSimpanan({
      anggotaId,
      jenis,
      tipe,
      jumlah,
      tanggal,
      keterangan: keterangan || undefined,
    });

    revalidatePath("/pengurus/simpanan");
    revalidatePath("/pengurus");
    revalidatePath("/anggota");
    revalidatePath("/anggota/simpanan");
    redirect("/pengurus/simpanan?ok=1");
  }

  return (
    <>
      <PageHeader title="Simpanan" description="Catat transaksi simpanan anggota." />

      {searchParams?.ok && (
        <div className="mb-4 rounded border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
          Transaksi simpanan berhasil disimpan.
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
            <h2 className="font-semibold">Riwayat Transaksi</h2>
          </div>
          <div className="card-body p-0 overflow-x-auto">
            {items.length === 0 ? (
              <div className="p-5 text-sm text-slate-500">Belum ada transaksi.</div>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Tanggal</th>
                    <th>Anggota</th>
                    <th>Jenis</th>
                    <th>Tipe</th>
                    <th className="text-right">Jumlah</th>
                    <th>Keterangan</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((s) => {
                    const u = findUserById(s.anggotaId);
                    return (
                      <tr key={s.id}>
                        <td>{formatTanggal(s.tanggal)}</td>
                        <td>{u?.nama ?? s.anggotaId}</td>
                        <td className="capitalize">{s.jenis}</td>
                        <td>
                          <span className={s.tipe === "setor" ? "badge-green" : "badge-amber"}>
                            {s.tipe === "setor" ? "Setor" : "Tarik"}
                          </span>
                        </td>
                        <td className="text-right font-medium">
                          {s.tipe === "tarik" ? "-" : ""}
                          {formatRupiah(s.jumlah)}
                        </td>
                        <td className="text-slate-600">{s.keterangan ?? "-"}</td>
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
            <h2 className="font-semibold">Input Simpanan</h2>
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
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">Jenis</label>
                  <select className="input" name="jenis" defaultValue="wajib">
                    <option value="pokok">Pokok</option>
                    <option value="wajib">Wajib</option>
                    <option value="sukarela">Sukarela</option>
                  </select>
                </div>
                <div>
                  <label className="label">Tipe</label>
                  <select className="input" name="tipe" defaultValue="setor">
                    <option value="setor">Setor</option>
                    <option value="tarik">Tarik</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="label">Jumlah (Rp)</label>
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
                Simpan Transaksi
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
