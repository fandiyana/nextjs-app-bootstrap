import { hashPassword } from "./password";
import {
  Angsuran,
  JenisSimpanan,
  Pinjaman,
  Simpanan,
  User,
} from "./types";

type Store = {
  users: User[];
  simpanan: Simpanan[];
  pinjaman: Pinjaman[];
  angsuran: Angsuran[];
  sessions: Map<string, string>;
};

const globalForStore = globalThis as unknown as { __koperasiStore?: Store };

function seed(): Store {
  const users: User[] = [
    {
      id: "u-admin",
      username: "admin",
      password: hashPassword("admin123"),
      nama: "Pengurus Koperasi",
      role: "pengurus",
    },
    {
      id: "u-budi",
      username: "budi",
      password: hashPassword("budi123"),
      nama: "Budi Santoso",
      role: "anggota",
      nomorAnggota: "A-0001",
      alamat: "Jl. Melati No. 12, Jakarta",
      telepon: "0812-1111-1111",
      tanggalGabung: "2024-01-15",
    },
    {
      id: "u-siti",
      username: "siti",
      password: hashPassword("siti123"),
      nama: "Siti Aminah",
      role: "anggota",
      nomorAnggota: "A-0002",
      alamat: "Jl. Kenanga No. 7, Bandung",
      telepon: "0812-2222-2222",
      tanggalGabung: "2024-02-10",
    },
    {
      id: "u-andi",
      username: "andi",
      password: hashPassword("andi123"),
      nama: "Andi Wijaya",
      role: "anggota",
      nomorAnggota: "A-0003",
      alamat: "Jl. Mawar No. 3, Surabaya",
      telepon: "0812-3333-3333",
      tanggalGabung: "2024-03-05",
    },
  ];

  const simpanan: Simpanan[] = [
    // Budi
    { id: "s-1", anggotaId: "u-budi", jenis: "pokok", tipe: "setor", jumlah: 500000, tanggal: "2024-01-15", keterangan: "Simpanan pokok awal" },
    { id: "s-2", anggotaId: "u-budi", jenis: "wajib", tipe: "setor", jumlah: 100000, tanggal: "2024-02-01", keterangan: "Simpanan wajib Februari" },
    { id: "s-3", anggotaId: "u-budi", jenis: "wajib", tipe: "setor", jumlah: 100000, tanggal: "2024-03-01", keterangan: "Simpanan wajib Maret" },
    { id: "s-4", anggotaId: "u-budi", jenis: "sukarela", tipe: "setor", jumlah: 250000, tanggal: "2024-03-15", keterangan: "Simpanan sukarela" },
    // Siti
    { id: "s-5", anggotaId: "u-siti", jenis: "pokok", tipe: "setor", jumlah: 500000, tanggal: "2024-02-10" },
    { id: "s-6", anggotaId: "u-siti", jenis: "wajib", tipe: "setor", jumlah: 100000, tanggal: "2024-03-01" },
    { id: "s-7", anggotaId: "u-siti", jenis: "sukarela", tipe: "setor", jumlah: 1000000, tanggal: "2024-03-20" },
    // Andi
    { id: "s-8", anggotaId: "u-andi", jenis: "pokok", tipe: "setor", jumlah: 500000, tanggal: "2024-03-05" },
    { id: "s-9", anggotaId: "u-andi", jenis: "wajib", tipe: "setor", jumlah: 100000, tanggal: "2024-04-01" },
  ];

  const pinjaman: Pinjaman[] = [
    {
      id: "p-1",
      anggotaId: "u-budi",
      pokok: 5000000,
      bunga: 1.5,
      tenor: 10,
      tanggalPinjam: "2024-04-01",
      status: "aktif",
      keterangan: "Modal usaha warung",
    },
    {
      id: "p-2",
      anggotaId: "u-siti",
      pokok: 3000000,
      bunga: 1.5,
      tenor: 6,
      tanggalPinjam: "2024-03-25",
      status: "aktif",
      keterangan: "Biaya pendidikan",
    },
  ];

  const angsuran: Angsuran[] = [
    { id: "a-1", pinjamanId: "p-1", jumlah: 575000, tanggal: "2024-05-01", keterangan: "Angsuran ke-1" },
    { id: "a-2", pinjamanId: "p-1", jumlah: 575000, tanggal: "2024-06-01", keterangan: "Angsuran ke-2" },
    { id: "a-3", pinjamanId: "p-2", jumlah: 545000, tanggal: "2024-04-25", keterangan: "Angsuran ke-1" },
  ];

  return { users, simpanan, pinjaman, angsuran, sessions: new Map() };
}

export function getStore(): Store {
  if (!globalForStore.__koperasiStore) {
    globalForStore.__koperasiStore = seed();
  }
  return globalForStore.__koperasiStore;
}

// ---------- Sessions ----------
export function createSession(userId: string, token: string): void {
  getStore().sessions.set(token, userId);
}

export function getUserIdBySession(token: string): string | undefined {
  return getStore().sessions.get(token);
}

export function destroySession(token: string): void {
  getStore().sessions.delete(token);
}

function genId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

// ---------- User ----------
export function findUserByUsername(username: string): User | undefined {
  return getStore().users.find((u) => u.username.toLowerCase() === username.toLowerCase());
}

export function findUserById(id: string): User | undefined {
  return getStore().users.find((u) => u.id === id);
}

export function listAnggota(): User[] {
  return getStore().users.filter((u) => u.role === "anggota");
}

export function tambahAnggota(input: {
  username: string;
  password: string;
  nama: string;
  alamat?: string;
  telepon?: string;
}): User {
  const store = getStore();
  if (findUserByUsername(input.username)) {
    throw new Error("Username sudah dipakai");
  }
  const nomor = `A-${String(store.users.filter((u) => u.role === "anggota").length + 1).padStart(4, "0")}`;
  const user: User = {
    id: genId("u"),
    username: input.username,
    password: hashPassword(input.password),
    nama: input.nama,
    role: "anggota",
    nomorAnggota: nomor,
    alamat: input.alamat,
    telepon: input.telepon,
    tanggalGabung: new Date().toISOString().slice(0, 10),
  };
  store.users.push(user);
  return user;
}

// ---------- Simpanan ----------
export function listSimpananByAnggota(anggotaId: string): Simpanan[] {
  return getStore()
    .simpanan.filter((s) => s.anggotaId === anggotaId)
    .sort((a, b) => b.tanggal.localeCompare(a.tanggal));
}

export function listSimpananAll(): Simpanan[] {
  return [...getStore().simpanan].sort((a, b) => b.tanggal.localeCompare(a.tanggal));
}

export function totalSimpananByJenis(anggotaId: string): Record<JenisSimpanan, number> {
  const out: Record<JenisSimpanan, number> = { pokok: 0, wajib: 0, sukarela: 0 };
  for (const s of getStore().simpanan) {
    if (s.anggotaId !== anggotaId) continue;
    const delta = s.tipe === "setor" ? s.jumlah : -s.jumlah;
    out[s.jenis] += delta;
  }
  return out;
}

export function totalSimpanan(anggotaId: string): number {
  const t = totalSimpananByJenis(anggotaId);
  return t.pokok + t.wajib + t.sukarela;
}

export function tambahSimpanan(input: Omit<Simpanan, "id">): Simpanan {
  const store = getStore();
  const item: Simpanan = { id: genId("s"), ...input };
  store.simpanan.push(item);
  return item;
}

// ---------- Pinjaman ----------
export function listPinjamanByAnggota(anggotaId: string): Pinjaman[] {
  return getStore()
    .pinjaman.filter((p) => p.anggotaId === anggotaId)
    .sort((a, b) => b.tanggalPinjam.localeCompare(a.tanggalPinjam));
}

export function listPinjamanAll(): Pinjaman[] {
  return [...getStore().pinjaman].sort((a, b) => b.tanggalPinjam.localeCompare(a.tanggalPinjam));
}

export function findPinjamanById(id: string): Pinjaman | undefined {
  return getStore().pinjaman.find((p) => p.id === id);
}

export function tambahPinjaman(input: Omit<Pinjaman, "id" | "status">): Pinjaman {
  const store = getStore();
  const item: Pinjaman = { id: genId("p"), status: "aktif", ...input };
  store.pinjaman.push(item);
  return item;
}

export function totalAngsuranTerbayar(pinjamanId: string): number {
  return getStore()
    .angsuran.filter((a) => a.pinjamanId === pinjamanId)
    .reduce((sum, a) => sum + a.jumlah, 0);
}

export function totalKewajibanPinjaman(p: Pinjaman): number {
  // Total pengembalian = pokok + (pokok * bunga% * tenor)
  const bunga = (p.pokok * (p.bunga / 100)) * p.tenor;
  return p.pokok + bunga;
}

export function angsuranPerBulan(p: Pinjaman): number {
  return Math.round(totalKewajibanPinjaman(p) / p.tenor);
}

export function sisaPinjaman(p: Pinjaman): number {
  return Math.max(0, totalKewajibanPinjaman(p) - totalAngsuranTerbayar(p.id));
}

// ---------- Angsuran ----------
export function listAngsuranByPinjaman(pinjamanId: string): Angsuran[] {
  return getStore()
    .angsuran.filter((a) => a.pinjamanId === pinjamanId)
    .sort((a, b) => b.tanggal.localeCompare(a.tanggal));
}

export function listAngsuranByAnggota(anggotaId: string): Angsuran[] {
  const store = getStore();
  const pinjamanIds = new Set(store.pinjaman.filter((p) => p.anggotaId === anggotaId).map((p) => p.id));
  return store.angsuran
    .filter((a) => pinjamanIds.has(a.pinjamanId))
    .sort((a, b) => b.tanggal.localeCompare(a.tanggal));
}

export function tambahAngsuran(input: Omit<Angsuran, "id">): Angsuran {
  const store = getStore();
  const item: Angsuran = { id: genId("a"), ...input };
  store.angsuran.push(item);

  // Update status pinjaman jika sudah lunas
  const p = store.pinjaman.find((x) => x.id === input.pinjamanId);
  if (p && totalAngsuranTerbayar(p.id) >= totalKewajibanPinjaman(p)) {
    p.status = "lunas";
  }
  return item;
}

// ---------- Aggregations ----------
export function totalSimpananKoperasi(): number {
  return getStore().simpanan.reduce((sum, s) => sum + (s.tipe === "setor" ? s.jumlah : -s.jumlah), 0);
}

export function totalPinjamanAktif(): number {
  return getStore()
    .pinjaman.filter((p) => p.status === "aktif")
    .reduce((sum, p) => sum + sisaPinjaman(p), 0);
}

export function jumlahAnggota(): number {
  return listAnggota().length;
}
