# Sundara Yatra

Website MVP untuk menjelajahi destinasi wisata seni, budaya, dan kalender even di Bali. Seluruh konten saat ini adalah data contoh; informasi faktual dan kontak resmi perlu diverifikasi sebelum dipublikasikan.

## Fitur

- Beranda dengan kategori seni dan pilihan kabupaten.
- Katalog destinasi dengan pencarian dan filter yang tersimpan di URL.
- Detail destinasi, galeri, tautan Google Maps, dan kontak WhatsApp bila tersedia serta telah disetujui pemilik nomor.
- Kalender even dengan filter bulan, kabupaten, kategori, dan penanda even lampau.
- Halaman Tentang dan Etika Berkunjung.
- Halaman Masuk/Daftar sebagai tampilan demo saja; tidak ada autentikasi dan data formulir tidak disimpan atau dikirim.
- Dashboard demo untuk CRUD destinasi. Perubahan hanya tersimpan di `localStorage` browser yang sedang dipakai; dashboard bukan CMS bersama dan tidak memakai login.

## Teknologi

- React 19
- React Router 8
- Vite 8
- Tailwind CSS 4
- JavaScript

Versi persis tercatat di `package.json` dan `package-lock.json`.

## Persyaratan

- Node.js 20.19+ atau 22.12+
- npm

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Vite akan menampilkan alamat lokal di terminal.

## Build dan pratinjau

```bash
npm run build
npm run preview
```

Hasil produksi dibuat di `dist/`. `dist/` tidak di-commit. Saat ini belum ada runner pengujian otomatis atau perintah `npm test`; hasil uji manual dicatat di [SPEC.md](./SPEC.md) bagian 15 dan [TEST-PLAN.md](./TEST-PLAN.md).

## Struktur utama

```text
public/images/            Aset gambar lokal
src/components/           Komponen layout, UI, destinasi, even, filter, dashboard
src/data/data.json        Data awal destinasi dan even
src/lib/                  Pemrosesan data, filter, tanggal, validasi, URL, storage
src/pages/                Halaman dan rute aplikasi
src/App.jsx               Pemetaan rute
src/index.css             Token desain dan gaya responsif
SPEC.md                   Spesifikasi produk dan hasil checklist
TASKS.md                  Status tahapan pekerjaan
TEST-PLAN.md              Catatan pengujian manual
```

## Data contoh dan kredit gambar

Semua record awal diberi `dataContoh: true`; alamat, jam kunjung, tiket, dan Maps yang belum diverifikasi dibiarkan kosong. Gambar awal menggunakan `public/images/photo-placeholder.svg`, ilustrasi placeholder milik Sundara Yatra. Jika mengganti atau menambah foto, gunakan foto milik sendiri atau yang berlisensi sesuai, lalu cantumkan sumber dan kreditnya. Jangan menambahkan nomor WhatsApp tanpa verifikasi dan persetujuan pemilik.

Dashboard hanya mengelola destinasi di browser lokal. Gunakan tombol **Kembalikan data awal** untuk menghapus perubahan demo. Data `localStorage` bisa diubah oleh pengguna browser dan bukan tempat penyimpanan untuk akun, kata sandi, token, atau data pribadi pengunjung.

## Deploy ke Vercel

1. Dorong proyek ke repositori GitHub.
2. Impor repositori tersebut di Vercel dan pilih preset Vite.
3. Gunakan build command `npm run build` dan output directory `dist`.
4. Tidak ada environment variable wajib. `vercel.json` mengatur rewrite SPA agar rute dalam tetap dapat dimuat ulang.
5. Setelah deploy, uji rute utama dan refresh halaman detail secara langsung.

Dashboard tetap lokal pada browser masing-masing meskipun situs dipublikasikan; perubahan tidak tersinkron antar-pengunjung.
