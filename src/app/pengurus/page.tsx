import Link from "next/link";
import { PageHeader } from "@/components/AppShell";
import StatCard from "@/components/StatCard";
import { requireRole } from "@/lib/auth";
import { formatRupiah, formatTanggal } from "@/lib/format";
import {
  jumlahAnggota,
  listPinjamanAll,
  listSimpananAll,
  totalPinjamanAktif,
  totalSimpananKoperasi,
  findUserById,
} from "@/lib/store";

export default function PengurusDashboard() {
  requireRole("pengurus");
  const totalSimpanan = totalSimpananKoperasi();
  const totalPinjaman = totalPinjamanAktif();
  const anggota = jumlahAnggota();
  const recentSimpanan = listSimpananAll().slice(0, 5);
  const recentPinjaman = listPinjamanAll().slice(0, 5);

  return (
    <>
      <PageHeader title="Dashboard Pengurus" description="Ringkasan keuangan koperasi." />

      <div className="grid sm:grid-cols-3 gap-4">
        <StatCard label="Total Simpanan" value={formatRupiah(totalSimpanan)} tone="brand" />
        <StatCard label="Pinjaman Aktif (sisa)" value={formatRupiah(totalPinjaman)} tone="amber" />
        <StatCard label="Jumlah Anggota" value={String(anggota)} />
      </div>

      <div className="grid lg:grid-cols-2 gap-4 mt-6">
        <div className="card">
          <div className="card-header flex items-center justify-between">
            <h2 className="font-semibold">Simpanan Terbaru</h2>
            <Link href="/pengurus/simpanan" className="text-sm text-brand hover:underline">
              Kelola
            </Link>
          </div>
          <div className="card-body p-0 overflow-x-auto">
            {recentSimpanan.length === 0 ? (
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
                  </tr>
                </thead>
                <tbody>
                  {recentSimpanan.map((s) => {
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
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className="card">
          <div className="card-header flex items-center justify-between">
            <h2 className="font-semibold">Pinjaman Terbaru</h2>
            <Link href="/pengurus/pinjaman" className="text-sm text-brand hover:underline">
              Kelola
            </Link>
          </div>
          <div className="card-body p-0 overflow-x-auto">
            {recentPinjaman.length === 0 ? (
              <div className="p-5 text-sm text-slate-500">Belum ada pinjaman.</div>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Tanggal</th>
                    <th>Anggota</th>
                    <th className="text-right">Pokok</th>
                    <th>Tenor</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentPinjaman.map((p) => {
                    const u = findUserById(p.anggotaId);
                    return (
                      <tr key={p.id}>
                        <td>{formatTanggal(p.tanggalPinjam)}</td>
                        <td>{u?.nama ?? p.anggotaId}</td>
                        <td className="text-right font-medium">{formatRupiah(p.pokok)}</td>
                        <td>{p.tenor} bln</td>
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
      </div>
    </>
  );
}
