import { PageHeader } from "@/components/AppShell";
import StatCard from "@/components/StatCard";
import { requireRole } from "@/lib/auth";
import { formatRupiah, formatTanggal } from "@/lib/format";
import { listSimpananByAnggota, totalSimpananByJenis } from "@/lib/store";

export default function AnggotaSimpananPage() {
  const user = requireRole("anggota");
  const totals = totalSimpananByJenis(user.id);
  const items = listSimpananByAnggota(user.id);
  const totalAll = totals.pokok + totals.wajib + totals.sukarela;

  return (
    <>
      <PageHeader title="Simpanan" description="Saldo dan riwayat transaksi simpanan Anda." />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Simpanan" value={formatRupiah(totalAll)} tone="brand" />
        <StatCard label="Pokok" value={formatRupiah(totals.pokok)} />
        <StatCard label="Wajib" value={formatRupiah(totals.wajib)} />
        <StatCard label="Sukarela" value={formatRupiah(totals.sukarela)} />
      </div>

      <div className="card mt-6">
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
                  <th>Jenis</th>
                  <th>Tipe</th>
                  <th className="text-right">Jumlah</th>
                  <th>Keterangan</th>
                </tr>
              </thead>
              <tbody>
                {items.map((s) => (
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
                    <td className="text-slate-600">{s.keterangan ?? "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
