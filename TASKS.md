# TASKS.md — Sundara Yatra

> Daftar milestone dan tugas, disusun dari `SPEC.md` dan `UI-SPEC.md`.
> **Dokumen ini hanya perencanaan. Tidak ada kode yang diubah saat menyusunnya.**
> Ditulis dalam bahasa Indonesia. Lampirkan `#file:SPEC.md`, `#file:UI-SPEC.md`, dan `#file:TASKS.md` saat memberi tugas ke Copilot.

---

## 0. Cara Memakai

1. Kerjakan **satu tugas dalam satu waktu**, berurutan dari milestone M0 ke M9 (kecuali ditandai paralel).
2. Tugas dinyatakan **selesai** hanya jika **semua acceptance criteria (AC)** sudah diperiksa nyata, bukan sekadar kode sudah ditulis.
3. Setelah tiap tugas: jalankan, cek di HP dan laptop, baca `git diff`, pastikan tidak ada rahasia, lalu commit.
4. Kolom **"Berkas yang mungkin berubah"** adalah perkiraan. Jika agen ingin mengubah berkas di luar daftar, ia harus menjelaskan alasannya dan menunggu persetujuan.
5. Jika ada bug: reproduksi → akar masalah → perbaikan minimal → persetujuan → uji ulang.

### Legenda status
- `[ ]` Not Started  ·  `[~]` In Progress  ·  `[?]` Review  ·  `[x]` Completed  ·  `[!]` Blocked

### Legenda prioritas (untuk waktu ±2 jam)
- **P0** wajib (inti produk dan rilis)
- **P1** penting, kerjakan jika P0 aman
- **P2** tambahan, hanya jika waktu masih ada

### Legenda hasil uji
`LULUS` · `GAGAL` · `BLOCKED` · `BELUM DIUJI` (isi berdasarkan pengujian nyata, jangan mengarang)

---

## 1. Keputusan Pemilik Proyek (19 November 2026)

Keputusan berikut menjadi acuan sebelum mengerjakan milestone terkait.

| Kode | Masalah | Usulan | Keputusan Anda |
|---|---|---|---|
| **D1** | SPEC.md sebelumnya belum mencakup fitur demo WhatsApp/dashboard. | Setujui WhatsApp dan dashboard demo di SPEC 2.1.1; dashboard lokal saja, bukan CMS bersama. | [x] Setuju |
| **D2** | Dashboard tanpa backend hanya mengubah data browser yang dipakai. | Tampilkan "**Mode demo: perubahan hanya tersimpan di browser ini**"; tanpa gerbang login palsu atau klaim keamanan. | [x] Setuju |
| **D3** | WhatsApp memerlukan nomor dengan izin pemilik. | Nomor akan diberikan pemilik proyek kemudian; saat ini `null`, tombol "Kontak belum tersedia". Tidak mengarang nomor. | [x] Setuju |
| **D4** | Cakupan CRUD dapat destinasi atau even. | Destinasi saja; CRUD even tidak dikerjakan. | [x] Destinasi |
| **D5** | Kalender, Tentang/Etika, Masuk/Daftar perlu masuk dalam rangkaian tugas. | Sertakan semua halaman MVP yang tercantum di SPEC.md. | [x] Setuju |
| **D6** | Waktu terbatas. | Ikuti urutan penuh TASKS.md sesuai arahan pemilik proyek. | [x] Setuju |

---

## 2. Ringkasan Milestone

| ID | Milestone | Prioritas | Perkiraan waktu | Status |
|---|---|---|---|---|
| M0 | Scaffold (dan penyelarasan SPEC) | P0 | 10–15 mnt | `[ ]` |
| M1 | Katalog dan halaman utama | P0 | 25–30 mnt | `[ ]` |
| M2 | Interaksi pencarian dan filter | P0 | 15–20 mnt | `[ ]` |
| M3 | WhatsApp | P1 | 8–10 mnt | `[x]` |
| M4 | CRUD dashboard | P1/P2 | 20–25 mnt | `[x]` |
| M5 | localStorage | P1/P2 | 10 mnt | `[x]` |
| M6 | Testing | P0 (minimal) | 7–10 mnt | `[ ]` |
| M7 | Security | P0 (minimal) | 7–10 mnt | `[ ]` |
| M8 | Build | P0 | 3–5 mnt | `[ ]` |
| M9 | Deployment | P0 | 5–10 mnt | `[ ]` |

---

## 3. Garis Potong Waktu (Rekomendasi)

Urutan prioritas jika waktu mepet:

1. **Wajib rilis:** M0 → M1 → M2 → M6 (minimal) → M7 (minimal) → M8 → M9.
2. **Jika masih ada waktu:** M3 (WhatsApp), lalu M4 + M5 (dashboard + penyimpanan, **dikerjakan bersamaan** karena saling bergantung).
3. **Jangan memulai M4/M5 jika sisa waktu kurang dari ±35 menit**; rilis dulu versi P0, lalu lanjutkan sebagai pembaruan.

---

## M0 — Scaffold

**Tujuan:** proyek siap dikembangkan, dokumen panduan selaras, repositori rapi.
**Berkas dokumen:** `SPEC.md`, `UI-SPEC.md`, `TASKS.md` di akar proyek; `.github/copilot-instructions.md`.

### T0.1 — Selaraskan SPEC.md dengan milestone baru  `[x]`  (P0, dokumen saja)
- **AC:**
  - Keputusan D1–D5 sudah dicatat.
  - SPEC.md bagian 2 memuat WhatsApp dan Dashboard demo di "Termasuk (demo)" dan tidak lagi bertentangan.
  - Ada **F10 (WhatsApp)** dan **F11 (Dashboard demo)** berikut cerita pengguna dan AC.
  - Model data (bagian 6) memuat field `whatsapp` (boleh `null`) dan aturan nomor.
  - Bagian 14 (keamanan) memuat aturan WhatsApp, localStorage, dan dashboard.
- **Berkas:** `SPEC.md`, `.github/copilot-instructions.md`.

### T0.2 — Inisialisasi proyek Vite + React + Tailwind + React Router  `[ ]`  (P0)
- **AC:**
  - Proyek dibuat di folder saat ini (bukan subfolder baru).
  - `npm run dev` berjalan dan menampilkan halaman berjudul "Sundara Yatra".
  - Instalasi Tailwind dan React Router mengikuti dokumentasi resmi versi terpasang.
  - Tidak ada paket di luar yang disepakati.
- **Berkas:** `package.json`, `package-lock.json`, `vite.config.*`, `index.html`, `src/main.*`, `src/App.*`, `src/index.css`.

### T0.3 — Struktur folder dan berkas dasar  `[ ]`  (P0)
- **AC:**
  - Struktur sesuai SPEC.md bagian 5 (`components/`, `pages/`, `data/`, `lib/`).
  - `.gitignore` memuat `node_modules`, `dist`, `.env`.
  - `.env.example` ada (boleh kosong, tanpa nilai rahasia).
  - `vercel.json` memuat rewrite SPA.
  - `README.md` awal berisi cara menjalankan.
- **Berkas:** `.gitignore`, `.env.example`, `vercel.json`, `README.md`, folder `src/*`.

### T0.4 — Token desain dan routing kerangka  `[ ]`  (P0)
- **AC:**
  - Variabel warna dan font sesuai UI-SPEC.md bagian 2, 3, 13; gaya fokus dan reduced-motion aktif.
  - Semua rute SPEC.md bagian 4 terdaftar (halaman boleh placeholder); rute tak dikenal → 404.
  - `lang="id"` di `index.html`.
- **Berkas:** `src/index.css`, `src/App.*`, `src/pages/*`, `index.html`, `tailwind.config.*` (jika versi memakainya).

### T0.5 — Navbar, Footer, Button, Container  `[ ]`  (P0)
- **AC:** (UI-SPEC 9.1, 9.2, 9.11)
  - Navbar menempel, hamburger di HP, buka/tutup dengan tombol dan `Esc`, `aria-expanded`, skip link.
  - Tautan aktif bergaris emas; tombol Masuk/Daftar tampil.
  - Footer memuat catatan "Data contoh".
  - Area sentuh ≥ 44px; fokus terlihat.
- **Berkas:** `src/components/layout/Navbar.*`, `Footer.*`, `Container.*`, `src/components/ui/Button.*`, `src/App.*`.

### T0.6 — Commit awal  `[ ]`  (P0)
- **AC:** `git status` bersih dari rahasia; commit `chore: initialize project` dan `docs: add SPEC, UI-SPEC, TASKS`; repositori GitHub terhubung.
- **Berkas:** (tidak ada perubahan kode).

**Hasil testing M0:** `BELUM DIUJI`  ·  **Catatan kendala:** –

---

## M1 — Katalog dan Halaman Utama

**Tujuan:** data tampil rapi dalam kartu, halaman detail, kalender, dan halaman pendukung.

### T1.1 — Data contoh dan model data  `[ ]`  (P0)
- **AC:**
  - `data.json` berisi ≥ 6 destinasi dan ≥ 4 even, **semua `dataContoh: true`**, nilai `kabupaten`/`kategori`/`akses` sesuai enum SPEC.md 6.1.
  - Tidak ada alamat, harga, jam, koordinat, atau jadwal karangan (isi `null` bila belum terverifikasi).
  - Pemuat data menangani kegagalan (ErrorState), bukan layar putih.
- **Berkas:** `src/data/data.json`, `src/lib/data.*`, `public/images/*`.

### T1.2 — Komponen UI dasar (Card, Badge, state)  `[ ]`  (P0)
- **AC:** (UI-SPEC 9.4, 9.7, 9.10, 10)
  - `Badge` (kategori, akses, "Data contoh"), `Card`, `EmptyState`, `LoadingState`, `ErrorState`, `Alert` tersedia dan dipakai ulang.
  - Lencana selalu bertuliskan teks.
- **Berkas:** `src/components/ui/*`.

### T1.3 — Beranda  `[ ]`  (P0)
- **AC:** (SPEC F2, F3; UI-SPEC 8.1)
  - Hero dengan overlay dan teks terbaca; tombol "Jelajahi" ke `/destinasi`.
  - Chip 9 kabupaten menuju `/destinasi?kabupaten=...`; chip 5 kategori.
  - 3 destinasi unggulan, 3 even terdekat, ajakan Etika Berkunjung.
  - Responsif 1/2/3 kolom; tidak ada scroll horizontal di 360px (kecuali baris chip yang memang dapat digeser).
- **Berkas:** `src/pages/Beranda.*`, `src/components/destinasi/DestinasiCard.*`, `src/components/filter/FilterChip.*`, `src/components/even/EvenItem.*`.

### T1.4 — Daftar destinasi (tampilan)  `[ ]`  (P0)
- **AC:** (SPEC F4)
  - Grid kartu seragam; foto 4:3; ringkasan dipotong 2 baris; gambar rusak → placeholder.
  - Kartu dapat diklik ke detail; fokus terlihat.
- **Berkas:** `src/pages/Destinasi.*`, `src/components/destinasi/DestinasiGrid.*`.

### T1.5 — Detail destinasi  `[ ]`  (P0)
- **AC:** (SPEC F6; UI-SPEC 8.4, 9.8)
  - Menampilkan foto, deskripsi, informasi, galeri (grid), alamat, tombol Google Maps, even terkait, kredit foto.
  - `id` tidak dikenal → "Destinasi tidak ditemukan"; field `null` → "Informasi belum tersedia".
  - `mapsUrl` divalidasi (`https`, host yang diizinkan); tautan eksternal memakai `rel="noopener noreferrer"`.
- **Berkas:** `src/pages/DetailDestinasi.*`, `src/components/destinasi/GaleriFoto.*`, `src/lib/url.*`.

### T1.6 — Kalender even  `[ ]`  (P1 per D5; masuk MVP SPEC)
- **AC:** (SPEC F5)
  - Urut tanggal; dikelompokkan per bulan; format tanggal bahasa Indonesia.
  - Lencana akses; even `sakral` menampilkan catatan etika; even lewat bertanda "Telah berlalu".
  - Tanggal tidak valid dilewati tanpa merusak daftar.
- **Berkas:** `src/pages/Even.*`, `src/components/even/EvenList.*`, `src/lib/tanggal.*`.

### T1.7 — Tentang + Etika Berkunjung + Masuk/Daftar (tampilan)  `[ ]`  (P1 per D5)
- **AC:** (SPEC F7, F8)
  - Etika Berkunjung ≥ 6 poin dengan catatan "perlu diverifikasi".
  - Form Masuk/Daftar hanya tampilan: validasi email, sandi ≥ 8, konfirmasi cocok; pesan "Fitur akun segera hadir. Data Anda tidak disimpan."
  - Tidak ada data form yang disimpan atau dikirim; sandi tidak masuk `console.log`.
- **Berkas:** `src/pages/Tentang.*`, `Masuk.*`, `Daftar.*`, `src/lib/validasi.*`.

### T1.8 — Halaman 404 dan commit  `[ ]`  (P0)
- **AC:** 404 ramah dengan tombol kembali; commit per fitur (`feat: ...`).
- **Berkas:** `src/pages/NotFound.*`.

**Hasil testing M1:** `BELUM DIUJI`  ·  **Catatan kendala:** –

---

## M2 — Interaksi Pencarian dan Filter

**Tujuan:** pengunjung dapat mencari dan menyaring destinasi/even dengan benar dan aman.

### T2.1 — Logika filter di `src/lib/filter`  `[ ]`  (P0)
- **AC:**
  - Fungsi murni yang menerima daftar + kriteria (kata kunci, kabupaten, kategori) dan mengembalikan irisan yang benar.
  - Pencarian tidak peka huruf besar-kecil; mencakup nama dan ringkasan.
  - Nilai kabupaten/kategori di luar enum diabaikan (dianggap "Semua").
  - Kata kunci dibatasi 100 karakter dan diperlakukan sebagai teks biasa.
- **Berkas:** `src/lib/filter.*`.

### T2.2 — Panel filter dan pencarian di halaman Destinasi  `[ ]`  (P0)
- **AC:** (SPEC F4; UI-SPEC 8.2, 9.3)
  - Kolom pencarian berlabel, dropdown kabupaten, chip kategori (`aria-pressed`), tombol "Atur ulang filter", penghitung hasil.
  - Di HP, panel dilipat dalam tombol "Filter".
  - Kombinasi filter + pencarian menghasilkan irisan yang benar.
  - Hasil nol → EmptyState "Tidak ada hasil" + tombol atur ulang.
- **Berkas:** `src/pages/Destinasi.*`, `src/components/filter/SearchBar.*`, `FilterKabupaten.*`, `FilterKategori.*`.

### T2.3 — Filter tersimpan di URL  `[ ]`  (P0)
- **AC:**
  - `?kabupaten=...&kategori=...&q=...` memuat ulang filter saat halaman dibuka/di-refresh/dibagikan.
  - Chip di Beranda membuka `/destinasi` dengan filter sudah aktif.
  - Parameter tidak valid diabaikan, tidak menyebabkan error.
- **Berkas:** `src/pages/Destinasi.*`, `src/pages/Beranda.*`, `src/lib/filter.*`.

### T2.4 — Filter bulan/kategori/kabupaten di Kalender Even  `[ ]`  (P1)
- **AC:**
  - Dropdown bulan, kategori, kabupaten bekerja dan dapat digabung.
  - Even lintas bulan difilter berdasarkan `tanggalMulai`.
  - Hasil nol → EmptyState "Belum ada even pada filter ini."
- **Berkas:** `src/pages/Even.*`, `src/components/filter/FilterBulan.*`, `src/lib/filter.*`, `src/lib/tanggal.*`.

**Hasil testing M2:** `BELUM DIUJI`  ·  **Catatan kendala:** –

---

## M3 — WhatsApp

**Tujuan:** pengunjung dapat menghubungi pengelola/penyelenggara melalui WhatsApp dengan aman.
**Prasyarat:** keputusan D1 dan D3; SPEC.md sudah diperbarui (T0.1).

### T3.1 — Data dan aturan nomor  `[x]`  (P1)
- **AC:**
  - Field `whatsapp` ditambahkan di model data (boleh `null`).
  - Nomor memakai format internasional **hanya angka** (contoh: `62…`, tanpa `+`, spasi, atau tanda hubung).
  - **Tidak ada nomor karangan atau milik orang tanpa persetujuan**; data contoh = `null`.
  - Aturan ini tercatat di SPEC.md.
- **Berkas:** `src/data/data.json`, `SPEC.md`.

### T3.2 — Pembuat tautan WhatsApp di `src/lib/whatsapp`  `[x]`  (P1)
- **AC:**
  - Fungsi memvalidasi nomor (angka saja, panjang wajar) sebelum membuat tautan.
  - Tautan berbentuk `https://wa.me/<nomor>?text=<pesan>` dengan pesan di-**encode** (`encodeURIComponent`).
  - Nomor/format tidak valid → tidak membuat tautan (mengembalikan `null`).
  - Pesan awal hanya memuat nama destinasi/even; tidak memuat data pribadi pengguna.
- **Berkas:** `src/lib/whatsapp.*`.

### T3.3 — Tombol WhatsApp di UI  `[x]`  (P1)
- **AC:**
  - Tombol "Hubungi via WhatsApp" tampil di halaman detail destinasi (dan di item even bila `whatsapp` ada).
  - Terbuka di tab baru dengan `target="_blank"` dan `rel="noopener noreferrer"`.
  - `whatsapp` = `null` → tombol nonaktif dengan teks "Kontak belum tersedia" (`aria-disabled`), bukan disembunyikan tanpa penjelasan.
  - Warna dan gaya mengikuti UI-SPEC (tidak memakai warna di luar palet kecuali disetujui).
- **Berkas:** `src/pages/DetailDestinasi.*`, `src/components/even/EvenItem.*`, `src/components/ui/Button.*`.

**Hasil testing M3:** `LULUS`  ·  **Catatan kendala:** Nomor kontak belum diberikan; semua data contoh menggunakan `null` dan tombol detail tidak aktif.

---

## M4 — CRUD Dashboard (Mode Demo)

**Tujuan:** pengelola dapat menambah, mengubah, dan menghapus destinasi **di browser sendiri** untuk demonstrasi.
**Prasyarat:** keputusan D1, D2, D4; SPEC.md diperbarui. **Kerjakan bersamaan dengan M5.**

### T4.1 — Kerangka halaman dashboard  `[x]`  (P1)
- **AC:**
  - Rute `/dashboard` ada, tertaut dari Footer/Navbar secara wajar.
  - Spanduk tetap tampil: "**Mode demo: perubahan hanya tersimpan di browser ini.**"
  - **Tidak ada klaim keamanan/login palsu.** Halaman tidak memakai gerbang login semu.
  - Tampilan responsif dan aksesibel.
- **Berkas:** `src/pages/Dashboard.*`, `src/App.*`, `src/components/layout/Navbar.*`, `Footer.*`.

### T4.2 — Daftar dan Read  `[x]`  (P1)
- **AC:**
  - Tabel/daftar destinasi dengan kolom nama, kabupaten, kategori, aksi (Ubah, Hapus).
  - Di HP, tabel dapat digulir di dalam wadahnya sendiri (tanpa scroll horizontal halaman).
  - Data kosong → EmptyState dengan tombol "Tambah destinasi".
- **Berkas:** `src/pages/Dashboard.*`, `src/components/dashboard/DestinasiTable.*`.

### T4.3 — Create (tambah destinasi)  `[x]`  (P1)
- **AC:**
  - Form dengan label tampil: nama, kabupaten (dropdown enum), kategori (pilihan enum), ringkasan, deskripsi, URL gambar, `mapsUrl`, `whatsapp` (opsional), kredit foto.
  - Validasi: nama wajib dan panjang dibatasi, enum valid, `mapsUrl` lolos validasi host, gambar berupa jalur lokal atau URL `https`, nomor WhatsApp valid atau kosong.
  - `id` dibuat otomatis, unik, hanya huruf kecil/angka/tanda hubung.
  - Pesan error per kolom; fokus pindah ke kolom bermasalah.
  - Setelah berhasil, item muncul di daftar dan di katalog publik pada browser yang sama.
- **Berkas:** `src/components/dashboard/DestinasiForm.*`, `src/lib/validasi.*`, `src/lib/url.*`, `src/lib/whatsapp.*`, `src/pages/Dashboard.*`.

### T4.4 — Update (ubah destinasi)  `[x]`  (P1)
- **AC:**
  - Form terisi data lama; menyimpan memperbarui item yang benar (tanpa mengubah `id`).
  - Validasi sama dengan Create; tombol "Batal" mengembalikan tanpa menyimpan.
- **Berkas:** `src/components/dashboard/DestinasiForm.*`, `src/pages/Dashboard.*`.

### T4.5 — Delete (hapus destinasi) dengan konfirmasi  `[x]`  (P1)
- **AC:**
  - Menghapus meminta **konfirmasi** yang jelas ("Hapus destinasi X? Tindakan ini tidak dapat dibatalkan di browser ini.").
  - Setelah dihapus, item hilang dari dashboard dan katalog.
  - Even yang menautkan `destinasiId` tersebut tidak merusak halaman (tampil tanpa tautan).
- **Berkas:** `src/components/dashboard/DestinasiTable.*`, `src/components/ui/ConfirmDialog.*`, `src/pages/Dashboard.*`.

### T4.6 — CRUD even  `[ ]`  (P2, hanya jika D4 = Keduanya)
- **AC:** tambah/ubah/hapus even dengan validasi tanggal ISO, enum akses/kategori, `destinasiId` valid atau `null`; konfirmasi hapus.
- **Berkas:** `src/components/dashboard/EvenForm.*`, `EvenTable.*`, `src/lib/validasi.*`.

**Hasil testing M4:** `LULUS`  ·  **Catatan kendala:** CRUD diuji di browser; tabel/form responsif pada 360px. Perubahan hanya lokal.

---

## M5 — localStorage

**Tujuan:** perubahan dashboard bertahan setelah halaman dimuat ulang, dengan penanganan data rusak yang aman.
**Catatan:** ini **tidak** melanggar aturan SPEC.md F8 (data form login tidak boleh disimpan); yang disimpan hanya data destinasi/even.

### T5.1 — Lapisan penyimpanan `src/lib/storage`  `[x]`  (P1)
- **AC:**
  - Satu kunci tetap dengan prefiks proyek (contoh `sundarayatra:v1:data`) dan penanda versi skema.
  - Setiap baca/tulis dibungkus `try/catch` (bisa gagal: mode privat, kuota penuh, diblokir).
  - Data hasil baca **divalidasi** (bentuk dan enum) sebelum dipakai; data rusak/ber-tampering → diabaikan dan jatuh ke `data.json`, tanpa layar putih.
  - Tidak menyimpan kata sandi, token, atau data pribadi pengunjung; nomor kontak bisnis hanya jika pemiliknya memberi izin.
- **Berkas:** `src/lib/storage.*`, `src/lib/validasi.*`.

### T5.2 — Sumber data tunggal (data awal + perubahan)  `[x]`  (P1)
- **AC:**
  - Aplikasi memakai `data.json` sebagai data awal; bila ada data tersimpan yang valid, itu yang dipakai.
  - Katalog, filter, detail, dan dashboard membaca dari sumber yang sama.
  - Setelah Create/Update/Delete lalu refresh, perubahan tetap ada.
- **Berkas:** `src/lib/data.*`, `src/App.*`, `src/pages/*` yang membaca data.

### T5.3 — Atur ulang data demo dan batas ukuran  `[x]`  (P1)
- **AC:**
  - Tombol "Kembalikan data awal" (dengan konfirmasi) menghapus data tersimpan dan memuat ulang `data.json`.
  - Gambar **tidak** disimpan sebagai base64 di localStorage (hanya jalur/URL) agar tidak melebihi kuota.
  - Kuota penuh → pesan kesalahan ramah (bukan crash).
- **Berkas:** `src/lib/storage.*`, `src/pages/Dashboard.*`, `src/components/ui/ConfirmDialog.*`.

**Hasil testing M5:** `LULUS`  ·  **Catatan kendala:** Data rusak, pemulihan data awal, persistensi refresh, dan simulasi kuota penuh diuji; foto base64 ditolak.

---

## M6 — Testing

**Tujuan:** memastikan fitur benar-benar berfungsi; hasil dilaporkan jujur.
**Catatan:** pengujian otomatis (Vitest/Playwright) butuh **paket tambahan** dan harus disetujui terlebih dahulu; untuk 2 jam, pengujian manual adalah minimum.

### T6.1 — Uji manual berdasarkan SPEC.md bagian 15  `[ ]`  (P0)
- **AC:** 20 skenario SPEC.md bagian 15 dijalankan; hasil diisi LULUS/GAGAL/BLOCKED/BELUM DIUJI tanpa dikarang; temuan GAGAL dicatat.
- **Berkas:** `TEST-PLAN.md` (baru, opsional) atau tabel di `SPEC.md`.

### T6.2 — Uji skenario tambahan (WhatsApp, dashboard, localStorage)  `[ ]`  (P1)
- **AC:** minimal kasus berikut diuji dan dicatat:
  - WhatsApp `null` → tombol nonaktif; nomor valid → tautan benar dan terbuka di tab baru.
  - Tambah/ubah/hapus destinasi → katalog ikut berubah; refresh → perubahan tetap ada.
  - Data localStorage dirusak manual (JSON tidak valid / enum salah) → aplikasi tetap hidup dan kembali ke data awal.
  - "Kembalikan data awal" → data kembali.
  - Validasi form dashboard menolak input tidak valid dan `mapsUrl` di luar host yang diizinkan.
- **Berkas:** `TEST-PLAN.md`.

### T6.3 — Uji responsif, keyboard, dan aksesibilitas dasar  `[ ]`  (P0)
- **AC:** (UI-SPEC bagian 12, 14)
  - Tidak ada scroll horizontal di 360px; area sentuh ≥ 44px.
  - Seluruh fitur dapat dijangkau keyboard; fokus terlihat; menu HP menutup dengan `Esc`.
  - Kontras utama diperiksa dengan alat (WebAIM Contrast Checker); animasi mati saat `prefers-reduced-motion`.
- **Berkas:** `TEST-PLAN.md`.

### T6.4 — Pengujian otomatis  `[ ]`  (P2, butuh persetujuan paket)
- **AC:** bila disetujui: uji unit untuk `filter`, `tanggal`, `validasi`, `url`, `whatsapp`, `storage` dan semuanya lulus lewat perintah uji yang tercatat di README. Persetujuan paket mencantumkan nama, fungsi, dan hasil cek reputasi.
- **Berkas:** `package.json`, `vite.config.*`, `src/lib/*.test.*`, `README.md`.

### T6.5 — Perbaikan temuan  `[ ]`  (P0)
- **AC:** tiap temuan GAGAL diperbaiki dengan perubahan minimal, diuji ulang (regression), dan dicommit (`fix: ...`).
- **Berkas:** bergantung temuan.

**Hasil testing M6:** `BELUM DIUJI`  ·  **Catatan kendala:** –

---

## M7 — Security

**Tujuan:** menemukan dan menutup celah umum; membedakan temuan **terbukti** dan **dugaan**.

### T7.1 — Tinjauan kode untuk XSS dan tautan  `[ ]`  (P0)
- **AC:**
  - Pencarian seluruh kode menunjukkan **tidak ada** `dangerouslySetInnerHTML`, `innerHTML`, `eval`, atau `new Function`.
  - Semua tautan eksternal memakai `rel="noopener noreferrer"`.
  - `mapsUrl` dan tautan WhatsApp melewati validasi (host/skema `https` yang diizinkan); `javascript:` dan `data:` ditolak.
- **Berkas:** `src/lib/url.*`, `src/lib/whatsapp.*`, komponen yang memuat tautan eksternal.

### T7.2 — Tinjauan input dan penyimpanan  `[ ]`  (P0)
- **AC:**
  - Semua input (form, pencarian, parameter URL, isi localStorage) diperlakukan tidak tepercaya dan divalidasi terhadap daftar nilai yang diizinkan.
  - Form Login/Daftar tidak menyimpan atau mengirim data; tidak ada `console.log` kata sandi atau data pribadi.
  - Dashboard tetap berlabel "Mode demo" dan tidak mengklaim keamanan.
- **Berkas:** `src/lib/validasi.*`, `src/lib/storage.*`, `src/pages/Masuk.*`, `Daftar.*`, `Dashboard.*`.

### T7.3 — Tinjauan dependensi dan rahasia  `[ ]`  (P0)
- **AC:**
  - Semua paket diperiksa reputasinya (unduhan mingguan, usia, repositori, pembuat); tidak ada paket aneh hasil saran AI.
  - `npm audit` dijalankan dan hasilnya dibaca; temuan dicatat (terbukti/dugaan, tingkat risiko, rekomendasi).
  - `git diff` dan riwayat commit bersih dari rahasia; `.env` tidak ter-commit; tidak ada API key di kode.
- **Berkas:** `package.json`, `package-lock.json`, `.gitignore`.

### T7.4 — Header keamanan di Vercel  `[ ]`  (P2, opsional, butuh persetujuan)
- **AC:** bila disetujui, `vercel.json` memuat header dasar (misalnya `X-Content-Type-Options: nosniff`, `Referrer-Policy`, pembatasan framing). Jika menambah Content-Security-Policy, uji bahwa Google Fonts dan gambar tetap termuat; **tidak mengklaim situs "aman"** hanya karena header.
- **Berkas:** `vercel.json`.

### T7.5 — Laporan temuan dan perbaikan minimal  `[ ]`  (P0)
- **AC:** daftar temuan memuat penyebab, dampak, tingkat risiko, rekomendasi; patch minimal disetujui lalu diterapkan; uji ulang dijalankan; tidak ada klaim "sudah aman" tanpa bukti.
- **Berkas:** `SECURITY-NOTES.md` (baru, opsional), berkas yang diperbaiki.

**Hasil testing M7:** `BELUM DIUJI`  ·  **Catatan kendala:** –

---

## M8 — Build

**Tujuan:** memastikan versi produksi berhasil dibuat dan berjalan.

### T8.1 — Build produksi  `[ ]`  (P0)
- **AC:**
  - `npm run build` selesai tanpa error; peringatan dibaca dan dicatat.
  - Folder `dist` terbentuk dan **tidak** ter-commit.
- **Berkas:** (tidak ada perubahan kode; jika gagal, berkas penyebab).

### T8.2 — Pratinjau hasil build  `[ ]`  (P0)
- **AC:**
  - `npm run preview` dijalankan; Beranda, Destinasi, Detail, Even, Tentang, Dashboard (bila ada), dan 404 terbuka.
  - Refresh di rute dalam (misalnya `/destinasi/<id>`) tidak 404 pada pratinjau/hosting yang mendukung rewrite.
  - Tidak ada galat di konsol; gambar termuat; ukuran gambar wajar (< ±300 KB per gambar).
- **Berkas:** `public/images/*` (bila perlu dikompres), `vercel.json`.

### T8.3 — Pembaruan README  `[ ]`  (P0)
- **AC:** README memuat deskripsi, fitur, teknologi, struktur folder, cara instal, jalankan, build, uji, deploy, catatan "data contoh", dan kredit foto.
- **Berkas:** `README.md`.

**Hasil testing M8:** `BELUM DIUJI`  ·  **Catatan kendala:** –

---

## M9 — Deployment

**Tujuan:** situs terbit di tautan publik dan terverifikasi.

### T9.1 — Dorong ke GitHub  `[ ]`  (P0)
- **AC:** `git status` dan `git diff` diperiksa; tidak ada rahasia; semua commit sudah didorong ke cabang utama.
- **Berkas:** (tidak ada perubahan kode).

### T9.2 — Impor dan deploy di Vercel  `[ ]`  (P0)
- **AC:**
  - Repositori diimpor; preset Vite terdeteksi; build command `npm run build`, output `dist`.
  - Tidak ada variabel lingkungan wajib (atau terdaftar bila ada).
  - Deploy berhasil dan menghasilkan URL publik.
- **Berkas:** `vercel.json` (bila perlu penyesuaian).

### T9.3 — Smoke test di URL publik  `[ ]`  (P0)
- **AC:**
  - Beranda, Destinasi (dengan filter), Detail, Even, Tentang terbuka.
  - Refresh di `/destinasi/<id>` dan `/even` tidak 404.
  - Tampilan HP diperiksa pada perangkat nyata atau emulasi.
  - Tombol Google Maps dan WhatsApp (bila ada nomor valid) membuka tujuan benar.
  - Dashboard menampilkan label "Mode demo" dan perubahan bertahan setelah refresh.
- **Berkas:** (tidak ada perubahan kode).

### T9.4 — Catatan rilis dan refleksi  `[ ]`  (P1)
- **AC:**
  - URL publik dicatat di README.
  - Dibagikan dengan catatan jujur: "Versi awal, data contoh, dashboard mode demo."
  - Dibuat `PROJECT-REFLECTION.md` (hasil, kendala, rencana fase lanjut: backend/autentikasi nyata, CMS bersama, multi-bahasa).
- **Berkas:** `README.md`, `PROJECT-REFLECTION.md`.

**Hasil testing M9:** `BELUM DIUJI`  ·  **Catatan kendala:** –

---

## 4. Rencana Commit (Usulan)

| Setelah | Pesan commit |
|---|---|
| T0.1 | `docs: align SPEC with demo dashboard and WhatsApp` |
| T0.2–T0.3 | `chore: initialize project` |
| T0.4–T0.5 | `feat: add design tokens, routing, navbar, footer` |
| M1 | `feat: add catalog, detail, events, about pages` |
| M2 | `feat: add search and filters with URL params` |
| M3 | `feat: add WhatsApp contact button` |
| M4 | `feat: add demo dashboard CRUD` |
| M5 | `feat: persist data in localStorage with validation` |
| M6 | `test: add test plan and fix findings` |
| M7 | `fix: security review patches` |
| M8 | `docs: update README and verify build` |
| M9 | `docs: add release notes and reflection` |

---

## 5. Definisi Selesai (Per Tugas)

Sebuah tugas selesai jika: (1) semua AC diperiksa nyata, (2) tidak ada galat di konsol, (3) larangan di SPEC.md bagian 14 tidak dilanggar, (4) sudah dites di HP dan laptop, (5) `git diff` sudah dibaca dan bersih dari rahasia, (6) sudah di-commit, dan (7) statusnya diperbarui di dokumen ini.

---

## 6. Risiko dan Catatan

- **Waktu:** semua milestone dalam ±2 jam tidak realistis; ikuti garis potong (bagian 3). Lebih baik rilis P0 yang matang daripada semua fitur setengah jadi.
- **Dashboard demo ≠ sistem admin yang aman.** Jangan menyebutnya aman atau terlindungi login.
- **localStorage bisa diubah siapa pun** di browser mereka; selalu validasi saat membaca.
- **Nomor WhatsApp = data pribadi.** Gunakan hanya dengan persetujuan pemiliknya.
- **Halusinasi AI:** fakta budaya, tautan, nama paket, dan sintaks versi perlu dicek ke sumber resmi.
- **Foto:** pakai milik sendiri atau berlisensi bebas; catat sumbernya.
