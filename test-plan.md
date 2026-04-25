# Test Plan — Koperasi Simpan Pinjam (PR #2)

## Lingkungan
- Run lokal: `npm run dev` di `/home/ubuntu/repos/nextjs-app-bootstrap`
- URL: http://localhost:3000
- Akun: `admin/admin123` (pengurus), `budi/budi123` (anggota)

## Seed yang relevan (untuk verifikasi angka)
- Total simpanan koperasi (Σ semua setor − tarik) = 950.000 (Budi) + 1.600.000 (Siti) + 600.000 (Andi) = **Rp 3.150.000**
- Pinjaman Budi (`p-1`): pokok 5.000.000, bunga 1.5%/bln, tenor 10 → kewajiban 5.750.000, terbayar 1.150.000, **sisa 4.600.000**, angs/bln 575.000
- Pinjaman Siti (`p-2`): pokok 3.000.000, bunga 1.5%/bln, tenor 6 → kewajiban 3.270.000, terbayar 545.000, **sisa 2.725.000**, angs/bln 545.000
- Total pinjaman aktif sisa = 4.600.000 + 2.725.000 = **Rp 7.325.000**
- Budi simpanan: pokok 500.000, wajib 200.000, sukarela 250.000 → total **Rp 950.000**

## Test Cases

### T1 — Login pengurus & verifikasi dashboard ringkasan
**Aksi**: Buka `/login`, isi `admin`/`admin123`, klik "Masuk".
**Expected**:
- URL akhir: `/pengurus`
- Stat card "Total Simpanan" menampilkan `Rp 3.150.000`
- Stat card "Pinjaman Aktif (sisa)" menampilkan `Rp 7.325.000`
- Stat card "Jumlah Anggota" menampilkan `3`
- Tabel "Simpanan Terbaru" menampilkan ≥1 row dan "Pinjaman Terbaru" menampilkan 2 row

### T2 — Input simpanan baru
**Aksi**: Sidebar → "Simpanan". Pada form "Input Simpanan": Anggota = "A-0001 · Budi Santoso", Jenis = Wajib, Tipe = Setor, Jumlah = `250000`, Tanggal hari ini, Keterangan "Tes setor". Klik "Simpan Transaksi".
**Expected**:
- Banner hijau "Transaksi simpanan berhasil disimpan"
- Tabel "Riwayat Transaksi" baris pertama: Budi Santoso · wajib · Setor · `Rp 250.000` · Tes setor
- Kembali ke sidebar "Dashboard" → Total Simpanan jadi `Rp 3.400.000` (3.150.000 + 250.000)

### T3 — Input pinjaman baru untuk Andi
**Aksi**: Sidebar → "Pinjaman". Form "Input Pinjaman": Anggota = "A-0003 · Andi Wijaya", Pokok = `2000000`, Bunga = `1.5`, Tenor = `5`, Tanggal hari ini, Keterangan "Tes pinjaman". Klik "Catat Pinjaman".
**Expected**:
- Banner hijau "Pinjaman berhasil dicatat"
- Tabel "Daftar Pinjaman" baris pertama berisi: Andi Wijaya · Pokok `Rp 2.000.000` · `1.5%/bln` · `5 bln` · Angs/Bulan `Rp 430.000` · Sisa `Rp 2.150.000` (dari `Rp 2.150.000`) · status `Aktif`

### T4 — Catat angsuran sampai lunas
**Aksi**: Sidebar → "Angsuran". Pilih pinjaman Andi yang baru saja dibuat (sisa Rp 2.150.000), Jumlah = `2150000`, Tanggal hari ini, Keterangan "Pelunasan tes". Klik "Catat Angsuran".
**Expected**:
- Banner hijau "Angsuran berhasil dicatat"
- Pinjaman Andi tersebut **tidak lagi muncul** di tabel "Pinjaman Aktif" (karena status berubah menjadi Lunas)
- Sidebar → "Pinjaman" → row Andi tadi menampilkan status `Lunas`, Sisa `Rp 0`

### T5 — Login sebagai anggota Budi & verifikasi dashboard
**Aksi**: Logout (tombol "Keluar" pojok kanan atas). Login `budi`/`budi123`.
**Expected**:
- URL akhir: `/anggota`
- Stat card "Total Simpanan" = `Rp 1.200.000` (950.000 + 250.000 dari T2)
- Stat card "Simpanan Wajib" = `Rp 450.000` (200.000 + 250.000)
- Stat card "Simpanan Pokok" = `Rp 500.000`, "Simpanan Sukarela" = `Rp 250.000`
- Bagian "Pinjaman" → Pinjaman Aktif = `1`, Total Sisa Tagihan = `Rp 4.600.000`
- Klik sidebar "Pinjaman" → progress bar pinjaman Budi menampilkan ~`20%` terbayar (1.150.000 / 5.750.000)

## Catatan adversarial
Setiap angka di atas hanya bisa dihasilkan jika:
- Store benar-benar persist antar request (modul-scoped global store) ✓
- Perhitungan bunga `pokok + pokok*bunga%*tenor` benar ✓
- Akses anggota di-scope ke `anggotaId`-nya sendiri (Budi tidak melihat pinjaman Siti)
- Status pinjaman ter-update ke `lunas` ketika total angsuran ≥ kewajiban
