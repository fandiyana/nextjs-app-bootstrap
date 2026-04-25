export type Role = "anggota" | "pengurus";

export type User = {
  id: string;
  username: string;
  password: string;
  nama: string;
  role: Role;
  nomorAnggota?: string;
  alamat?: string;
  telepon?: string;
  tanggalGabung?: string;
};

export type JenisSimpanan = "pokok" | "wajib" | "sukarela";
export type TipeSimpanan = "setor" | "tarik";

export type Simpanan = {
  id: string;
  anggotaId: string;
  jenis: JenisSimpanan;
  tipe: TipeSimpanan;
  jumlah: number;
  tanggal: string;
  keterangan?: string;
};

export type StatusPinjaman = "aktif" | "lunas";

export type Pinjaman = {
  id: string;
  anggotaId: string;
  pokok: number;
  bunga: number;
  tenor: number;
  tanggalPinjam: string;
  status: StatusPinjaman;
  keterangan?: string;
};

export type Angsuran = {
  id: string;
  pinjamanId: string;
  jumlah: number;
  tanggal: string;
  keterangan?: string;
};
