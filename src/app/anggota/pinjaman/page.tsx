import { PageHeader } from "@/components/AppShell";
import { requireRole } from "@/lib/auth";
import { formatRupiah, formatTanggal } from "@/lib/format";
import {
  angsuranPerBulan,
  listAngsuranByPinjaman,
  listPinjamanByAnggota,
  sisaPinjaman,
  totalAngsuranTerbayar,
  totalKewajibanPinjaman,
} from "@/lib/store";

export default function AnggotaPinjamanPage() {
  const user = requireRole("anggota");
  const pinjaman = listPinjamanByAnggota(user.id);

  return (
    <>
      <PageHeader title="Pinjaman" description="Daftar pinjaman dan riwayat angsuran Anda." />

      {pinjaman.length === 0 ? (
        <div className="card card-body text-sm text-slate-600">
          Anda belum memiliki pinjaman aktif.
        </div>
      ) : (
        <div className="space-y-6">
          {pinjaman.map((p) => {
            const total = totalKewajibanPinjaman(p);
            const terbayar = totalAngsuranTerbayar(p.id);
            const sisa = sisaPinjaman(p);
            const angsuran = listAngsuranByPinjaman(p.id);
            const persen = Math.min(100, Math.round((terbayar / total) * 100));
            return (
              <div key={p.id} className="card">
                <div className="card-header flex items-center justify-between">
                  <div>
                    <h2 className="font-semibold">
                      Pinjaman {formatTanggal(p.tanggalPinjam)}
                    </h2>
                    <p className="text-sm text-slate-600">
                      Pokok {formatRupiah(p.pokok)} · Bunga {p.bunga}%/bln · Tenor {p.tenor} bulan
                    </p>
                  </div>
                  <span className={p.status === "aktif" ? "badge-amber" : "badge-green"}>
                    {p.status === "aktif" ? "Aktif" : "Lunas"}
                  </span>
                </div>
                <div className="card-body grid sm:grid-cols-4 gap-4">
                  <Info label="Total Kewajiban" value={formatRupiah(total)} />
                  <Info label="Sudah Dibayar" value={formatRupiah(terbayar)} />
                  <Info label="Sisa Tagihan" value={formatRupiah(sisa)} />
                  <Info label="Angsuran/Bulan" value={formatRupiah(angsuranPerBulan(p))} />
                  <div className="sm:col-span-4">
                    <div className="h-2 bg-slate-100 rounded">
                      <div
                        className="h-2 bg-brand rounded"
                        style={{ width: `${persen}%` }}
                      />
                    </div>
                    <div className="text-xs text-slate-500 mt-1">{persen}% terbayar</div>
                  </div>
                </div>
                <div className="border-t border-slate-200">
                  <div className="px-5 py-3 font-medium text-sm">Riwayat Angsuran</div>
                  <div className="overflow-x-auto">
                    {angsuran.length === 0 ? (
                      <div className="px-5 pb-5 text-sm text-slate-500">Belum ada angsuran tercatat.</div>
                    ) : (
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Tanggal</th>
                            <th className="text-right">Jumlah</th>
                            <th>Keterangan</th>
                          </tr>
                        </thead>
                        <tbody>
                          {angsuran.map((a) => (
                            <tr key={a.id}>
                              <td>{formatTanggal(a.tanggal)}</td>
                              <td className="text-right font-medium">{formatRupiah(a.jumlah)}</td>
                              <td className="text-slate-600">{a.keterangan ?? "-"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-sm text-slate-600">{label}</div>
      <div className="font-semibold text-slate-900">{value}</div>
    </div>
  );
}
