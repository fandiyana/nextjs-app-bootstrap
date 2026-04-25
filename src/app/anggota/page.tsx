import Link from "next/link";
import { PageHeader } from "@/components/AppShell";
import StatCard from "@/components/StatCard";
import { requireRole } from "@/lib/auth";
import { formatRupiah, formatTanggal } from "@/lib/format";
import {
  listPinjamanByAnggota,
  listSimpananByAnggota,
  sisaPinjaman,
  totalSimpananByJenis,
} from "@/lib/store";

export default function AnggotaDashboard() {
  const user = requireRole("anggota");
  const totals = totalSimpananByJenis(user.id);
  const totalAll = totals.pokok + totals.wajib + totals.sukarela;
  const pinjaman = listPinjamanByAnggota(user.id);
  const pinjamanAktif = pinjaman.filter((p) => p.status === "aktif");
  const totalSisa = pinjamanAktif.reduce((s, p) => s + sisaPinjaman(p), 0);
  const recent = listSimpananByAnggota(user.id).slice(0, 5);

  return (
    <>
      <PageHeader
        title={`Halo, ${user.nama.split(" ")[0]}`}
        description={`Nomor Anggota: ${user.nomorAnggota ?? "-"} · Bergabung ${formatTanggal(user.tanggalGabung ?? "")}`}
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Simpanan" value={formatRupiah(totalAll)} tone="brand" />
        <StatCard label="Simpanan Pokok" value={formatRupiah(totals.pokok)} />
        <StatCard label="Simpanan Wajib" value={formatRupiah(totals.wajib)} />
        <StatCard label="Simpanan Sukarela" value={formatRupiah(totals.sukarela)} />
      </div>

      <div className="grid lg:grid-cols-2 gap-4 mt-6">
        <div className="card">
          <div className="card-header flex items-center justify-between">
            <h2 className="font-semibold">Transaksi Simpanan Terbaru</h2>
            <Link href="/anggota/simpanan" className="text-sm text-brand hover:underline">
              Lihat semua
            </Link>
          </div>
          <div className="card-body p-0">
            {recent.length === 0 ? (
              <div className="p-5 text-sm text-slate-500">Belum ada transaksi.</div>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Tanggal</th>
                    <th>Jenis</th>
                    <th>Tipe</th>
                    <th className="text-right">Jumlah</th>
                  </tr>
                </thead>
                <tbody>
                  {recent.map((s) => (
                    <tr key={s.id}>
                      <td>{formatTanggal(s.tanggal)}</td>
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
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className="card">
          <div className="card-header flex items-center justify-between">
            <h2 className="font-semibold">Pinjaman</h2>
            <Link href="/anggota/pinjaman" className="text-sm text-brand hover:underline">
              Detail pinjaman
            </Link>
          </div>
          <div className="card-body">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-slate-600">Pinjaman Aktif</div>
                <div className="text-xl font-semibold">{pinjamanAktif.length}</div>
              </div>
              <div>
                <div className="text-sm text-slate-600">Total Sisa Tagihan</div>
                <div className="text-xl font-semibold">{formatRupiah(totalSisa)}</div>
              </div>
            </div>
            {pinjamanAktif.length > 0 && (
              <div className="mt-4 space-y-3">
                {pinjamanAktif.map((p) => (
                  <div key={p.id} className="rounded border border-slate-200 p-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">Pinjaman {formatTanggal(p.tanggalPinjam)}</span>
                      <span className="badge-amber">Aktif</span>
                    </div>
                    <div className="text-sm text-slate-600 mt-1">
                      Pokok {formatRupiah(p.pokok)} · Bunga {p.bunga}%/bln · {p.tenor} bln
                    </div>
                    <div className="text-sm mt-1">
                      Sisa: <span className="font-semibold">{formatRupiah(sisaPinjaman(p))}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
