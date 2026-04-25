# Koperasi Simpan Pinjam

Aplikasi web Koperasi Simpan Pinjam berbasis Next.js 14 (App Router) + TypeScript + Tailwind CSS.

## Fitur

### Anggota
- Login dengan akun anggota
- Lihat saldo simpanan (Pokok, Wajib, Sukarela)
- Lihat riwayat transaksi simpanan
- Lihat status pinjaman aktif & riwayat angsuran

### Pengurus / Admin
- Dashboard ringkasan koperasi (total simpanan, pinjaman aktif, jumlah anggota)
- Kelola data anggota (tambah anggota baru)
- Input transaksi simpanan (setoran / penarikan)
- Input pinjaman baru untuk anggota
- Catat angsuran pinjaman

## Akun Demo

| Role     | Username       | Password   |
|----------|----------------|------------|
| Pengurus | `admin`        | `admin123` |
| Anggota  | `budi`         | `budi123`  |
| Anggota  | `siti`         | `siti123`  |
| Anggota  | `andi`         | `andi123`  |

## Menjalankan Lokal

```bash
npm install
npm run dev
```

Buka http://localhost:3000

## Build

```bash
npm run build
npm start
```

## Catatan

Data disimpan di memori server (in-memory store) sehingga akan ter-reset setiap kali server di-restart. Untuk produksi, ganti `src/lib/store.ts` dengan koneksi ke database (mis. Postgres / Supabase / SQLite).
