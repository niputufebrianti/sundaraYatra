# SPEC.md — Sundara Yatra

> **Panduan utama proyek.** Dokumen ini dibaca oleh manusia (pembuat proyek) dan oleh AI coding agent (GitHub Copilot di VS Code).
> Seluruh ketentuan dan perintah ditulis dalam **bahasa Indonesia**. Kode, nama variabel, dan nama file memakai bahasa Inggris atau Indonesia yang konsisten (lihat bagian 5).
> Dokumen ini disusun dengan pola **S.P.E.C**: **S**tack & Scope, **P**urpose & Behavior, **E**rrors & Edges, **C**onstraints & Security.

---

## 0. Cara Memakai Dokumen Ini

1. Simpan file ini sebagai `SPEC.md` di **akar folder proyek** (`C:\sundaraYatra\SPEC.md`).
2. Simpan file `copilot-instructions.md` (file pendamping, lebih ringkas) di `C:\sundaraYatra\.github\copilot-instructions.md`. Copilot membaca file ini otomatis.
3. Saat memberi tugas ke Copilot, **lampirkan SPEC.md** sebagai konteks (di Copilot Chat ketik `#file:SPEC.md` atau tambahkan lewat tombol *Add Context*).
4. Kerjakan **satu prompt satu fitur** (bagian 17). Setelah tiap prompt: jalankan, cek hasil, lalu commit.
5. Jika AI menyimpang dari dokumen ini, perintahkan: *"Ikuti SPEC.md bagian X. Jangan menambah fitur di luar dokumen."*

---

## 1. Ringkasan Proyek

| Item | Isi |
|---|---|
| Nama | **Sundara Yatra** (kurang lebih "perjalanan yang indah"; makna ini perlu dicek ulang sebelum dipakai di materi resmi) |
| Jenis | Website informasi wisata seni dan budaya Bali |
| Inti ide | Memadukan **destinasi wisata** dengan **seni** dan **even budaya** dalam satu tempat |
| Pembeda | Menjawab bukan hanya "ke mana?", tetapi juga "kapan, dan ada pertunjukan apa di sana?" |
| Versi | MVP front-end, dikerjakan dalam ±2 jam (praktikum Vibes Coding, Badung, 19 November 2026) |
| Target hasil | Situs yang berjalan, responsif, dan **dipublikasikan di Vercel** dengan tautan publik |

### 1.1 Target pengguna
- **Wisatawan mancanegara dan domestik** yang mencari pengalaman seni-budaya otentik.
- **Wisatawan lokal** yang ingin tahu even budaya di sekitarnya.
- (Fase lanjut) **Pengelola/penyelenggara** yang ingin mendaftarkan even.

### 1.2 Tujuan MVP
1. Pengunjung dapat **menjelajahi destinasi** dan **memfilter** menurut kabupaten/kota dan kategori seni.
2. Pengunjung dapat **melihat kalender even** dan memfilter menurut bulan.
3. Pengunjung dapat **membuka detail destinasi** (galeri, lokasi, even terkait, tautan Google Maps).
4. Pengunjung memahami **etika berkunjung** ke tempat budaya.
5. Situs nyaman dipakai di **HP** dan laptop.

---

## 2. Ruang Lingkup

### 2.1 Termasuk (MVP)
- Navbar, Hero, filter kabupaten, filter kategori seni
- Daftar destinasi (kartu, pencarian, filter)
- Kalender even (urut tanggal, filter bulan)
- Halaman detail destinasi
- Halaman Tentang Kami + Etika Berkunjung + Footer
- Halaman Login/Daftar **tampilan saja** (tanpa autentikasi nyata)
- Responsif HP, empty state, loading state, error state, halaman 404

### 2.2 TIDAK termasuk (ditunda ke fase lanjut)
- Autentikasi nyata, akun pengguna, database, backend/API
- Dashboard admin/CMS, unggah gambar oleh pengguna
- Booking/pembayaran tiket, ulasan/rating
- Peta interaktif tertanam (cukup tautan Google Maps)
- Multi-bahasa (ID/EN)

> Aturan emas: **jika tidak ada di daftar "Termasuk", jangan dibuat.** Jika ada ide tambahan, catat di bagian 21 (Backlog), jangan langsung dikerjakan.

---

## 3. S — STACK & SCOPE

### 3.1 Teknologi
| Bagian | Pilihan | Catatan |
|---|---|---|
| Build tool | **Vite** | Cepat, ringan |
| Library UI | **React** (JavaScript atau TypeScript, pilih salah satu dan konsisten) | Disarankan **TypeScript** bila nyaman; jika ragu, JavaScript lebih cepat untuk 2 jam |
| Styling | **Tailwind CSS** | Ikuti dokumentasi resmi untuk versi yang terpasang |
| Routing | **React Router** | Satu-satunya paket tambahan yang diizinkan tanpa tanya |
| Data | **`src/data/data.json`** | Statis, tanpa backend |
| Version control | **Git + GitHub** | Commit kecil dan sering |
| Deploy | **Vercel** | Wajib menambah `vercel.json` (lihat 18) |

- **Versi:** gunakan versi stabil terbaru; catat versi yang terpasang di `package.json`. Verifikasi cara pemasangan Tailwind dan React Router di **dokumentasi resmi** karena cara instalasi dapat berubah antarversi. Jangan memakai sintaks dari ingatan AI tanpa dicek.
- **Paket tambahan lain** (ikon, animasi, dsb.): **tanya dulu**, sebutkan nama paket, fungsinya, dan alasannya. Setujui hanya jika paket populer, aktif dipelihara, dan benar-benar perlu.

### 3.2 Scope per iterasi
**Satu prompt = satu tugas.** Lihat urutan di bagian 17. Jangan meminta AI membangun seluruh aplikasi dalam satu prompt.

---

## 4. Halaman dan Rute

| Rute | Halaman | Keterangan |
|---|---|---|
| `/` | Beranda | Hero, filter cepat, destinasi unggulan, even terdekat, kategori seni, ajakan |
| `/destinasi` | Daftar Destinasi | Kartu, pencarian, filter kabupaten + kategori |
| `/destinasi/:id` | Detail Destinasi | Galeri, lokasi, even terkait, Google Maps |
| `/even` | Kalender Even | Daftar urut tanggal, filter bulan (+ kategori, kabupaten) |
| `/tentang` | Tentang Kami | Misi, nilai, **Etika Berkunjung**, kontak |
| `/masuk` | Login | Form tampilan saja |
| `/daftar` | Daftar | Form tampilan saja |
| `*` | 404 | Halaman tidak ditemukan + tombol kembali |

---

## 5. Struktur Folder

```
sundaraYatra/
├─ .github/
│  └─ copilot-instructions.md     # instruksi otomatis untuk Copilot
├─ public/
│  └─ images/                     # foto lokal (berlisensi/milik sendiri)
├─ src/
│  ├─ components/
│  │  ├─ layout/    (Navbar, Footer, Container)
│  │  ├─ ui/        (Button, Badge, Card, EmptyState, LoadingState, ErrorState, Alert)
│  │  ├─ destinasi/ (DestinasiCard, DestinasiGrid, GaleriFoto)
│  │  ├─ even/      (EvenItem, EvenList)
│  │  └─ filter/    (FilterKabupaten, FilterKategori, FilterBulan, SearchBar)
│  ├─ pages/        (Beranda, Destinasi, DetailDestinasi, Even, Tentang, Masuk, Daftar, NotFound)
│  ├─ data/         (data.json)
│  ├─ lib/          (filter.js/ts, tanggal.js/ts, validasi.js/ts, url.js/ts)
│  ├─ App.jsx|tsx
│  ├─ main.jsx|tsx
│  └─ index.css     (impor Tailwind + variabel warna)
├─ .gitignore
├─ .env.example     (boleh kosong; tidak ada secret di proyek ini)
├─ SPEC.md
├─ vercel.json
├─ package.json
└─ README.md
```

**Aturan:** logika filter/tanggal/validasi ditaruh di `src/lib/` (bukan di dalam komponen) agar mudah diuji dan tidak duplikat (prinsip *Separation of Concerns* dan DRY).

---

## 6. Model Data (`src/data/data.json`)

```json
{
  "destinasi": [
    {
      "id": "contoh-destinasi-1",
      "nama": "Nama Destinasi Contoh 1",
      "kabupaten": "Gianyar",
      "kategori": ["Tari", "Seni Rupa"],
      "ringkasan": "Satu kalimat singkat (maks. 140 karakter).",
      "deskripsi": "Paragraf deskripsi lengkap.",
      "gambar": "/images/contoh-1.jpg",
      "galeri": ["/images/contoh-1.jpg", "/images/contoh-1b.jpg"],
      "alamat": "Isi hanya jika terverifikasi",
      "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Nama+Tempat",
      "jamKunjung": "Isi hanya jika terverifikasi",
      "tiket": "Isi hanya jika terverifikasi",
      "fasilitas": ["Parkir", "Toilet"],
      "kreditFoto": "Nama fotografer / sumber + lisensi",
      "dataContoh": true
    }
  ],
  "even": [
    {
      "id": "contoh-even-1",
      "nama": "Nama Even Contoh 1",
      "tanggalMulai": "2026-12-05",
      "tanggalSelesai": "2026-12-05",
      "kabupaten": "Badung",
      "kategori": "Musik",
      "akses": "umum",
      "lokasi": "Nama tempat",
      "destinasiId": "contoh-destinasi-1",
      "deskripsi": "Deskripsi singkat even.",
      "dataContoh": true
    }
  ]
}
```

### 6.1 Nilai yang diizinkan (enum)
- **kabupaten** (9 wilayah): `Badung`, `Bangli`, `Buleleng`, `Gianyar`, `Jembrana`, `Karangasem`, `Klungkung`, `Tabanan`, `Denpasar` (Kota Denpasar).
- **kategori seni** (5): `Tari`, `Musik`, `Seni Rupa`, `Kriya`, `Festival`.
- **akses even**: `umum` (terbuka untuk umum), `tiket` (perlu tiket), `sakral` (upacara sakral; ikuti aturan setempat).
- **tanggal**: format ISO `YYYY-MM-DD`.

### 6.2 Aturan data
- Semua data awal adalah **data contoh** dengan `"dataContoh": true`. Tampilkan lencana "Data contoh" di UI selama nilainya `true`.
- **Dilarang mengarang** alamat, koordinat, harga, jam buka, atau jadwal even. Jika belum terverifikasi, isi `null` dan tampilkan "Informasi belum tersedia".
- Setiap destinasi yang diisi data nyata wajib memiliki `kreditFoto`.
- `destinasiId` pada even harus cocok dengan `id` destinasi, atau `null`.
- `id` unik, huruf kecil, angka, dan tanda hubung (`-`) saja.

---

## 7. P — PURPOSE & BEHAVIOR (Cerita Pengguna dan Kriteria Penerimaan)

Setiap fitur dianggap **selesai** hanya jika semua kriteria penerimaannya diperiksa.

### F1. Navbar
**Sebagai** pengunjung, **saya ingin** navigasi yang jelas, **agar** bisa berpindah halaman dengan mudah.
- Berisi: logo/nama "Sundara Yatra", tautan Beranda, Destinasi, Even, Tentang, serta tombol **Masuk** dan **Daftar**.
- Di HP: menu berubah menjadi tombol hamburger yang membuka/menutup daftar menu.
- Tautan halaman aktif diberi penanda visual.
- **Kriteria:** (a) semua tautan berpindah halaman tanpa reload penuh; (b) menu HP bisa dibuka/ditutup dengan tombol dan dengan tombol `Esc`; (c) tombol hamburger punya `aria-label` dan `aria-expanded`; (d) bisa dioperasikan dengan keyboard (Tab/Enter).

### F2. Hero (Beranda)
- Judul "Sundara Yatra", tagline (contoh: *"Jelajahi seni, budaya, dan keindahan Bali"*), tombol **Jelajahi** yang menuju `/destinasi`.
- **Filter cepat kabupaten** berupa 9 tombol (chip). Klik salah satu membawa ke `/destinasi?kabupaten=Gianyar`.
- **Kriteria:** tombol "Jelajahi" berfungsi; klik chip kabupaten membuka halaman Destinasi dengan filter sudah aktif; teks terbaca jelas di atas gambar latar (kontras cukup).

### F3. Kategori Seni (filter)
- 5 tombol: Tari, Musik, Seni Rupa, Kriya, Festival (+ tombol "Semua").
- Tombol aktif tampak berbeda; boleh memilih satu kategori pada satu waktu (sederhana).
- **Kriteria:** klik kategori hanya menampilkan item dengan kategori itu; klik "Semua" mengembalikan seluruh data.

### F4. Daftar Destinasi
- Kartu menampilkan: foto, nama, kabupaten, label kategori, ringkasan, tombol "Lihat detail".
- **Pencarian** (nama + ringkasan, tidak peka huruf besar-kecil) dan **filter** kabupaten + kategori yang dapat **digabung**.
- Menampilkan **jumlah hasil** ("12 destinasi ditemukan").
- Filter tersimpan di **parameter URL** (`?kabupaten=...&kategori=...&q=...`) sehingga bisa dibagikan.
- **Kriteria:** (a) kombinasi filter + pencarian menghasilkan irisan yang benar; (b) tombol "Atur ulang filter" mengosongkan semuanya; (c) jika hasil nol → **empty state** "Tidak ada hasil" dengan saran mengubah filter; (d) hasil muncul tanpa lag pada ≤ 100 data.

### F5. Kalender Even
- Daftar even **berurutan menurut tanggal** (terdekat dulu). Setiap item: tanggal, nama, lokasi, kabupaten, kategori, lencana akses (umum/tiket/sakral).
- Filter **bulan** (Januari–Desember atau "Semua bulan"), plus filter kategori dan kabupaten.
- Even yang sudah lewat ditandai "Telah berlalu" dan diletakkan di bagian bawah atau disembunyikan lewat sakelar "Tampilkan even yang sudah berlalu".
- Even berlabel **sakral** menampilkan catatan: "Upacara sakral. Ikuti aturan dan arahan masyarakat setempat."
- **Kriteria:** urutan tanggal benar; filter bulan benar (termasuk even lintas bulan memakai `tanggalMulai`); empty state tampil jika tidak ada even; format tanggal terbaca bahasa Indonesia (misal "5 Desember 2026").

### F6. Detail Destinasi
- Konten: foto utama, nama, kabupaten, kategori, deskripsi, **galeri** (klik gambar untuk memperbesar atau tampil sebagai grid sederhana), alamat, jam kunjung, tiket, fasilitas, tombol **Buka di Google Maps**, **Even terkait** (even dengan `destinasiId` sama), kredit foto.
- Field `null` ditampilkan sebagai "Informasi belum tersedia".
- Tombol "Kembali ke daftar".
- **Kriteria:** (a) `id` tidak dikenal → halaman "Destinasi tidak ditemukan" (bukan layar putih); (b) tautan Maps terbuka di tab baru dengan `rel="noopener noreferrer"`; (c) bagian "Even terkait" menampilkan empty state jika tidak ada; (d) semua gambar punya teks alternatif.

### F7. Tentang + Etika Berkunjung + Footer
- **Tentang:** misi, siapa di balik proyek, cara menghubungi (tautan/surel yang valid atau penanda "segera hadir").
- **Etika Berkunjung** (minimal 6 poin; isi harus akurat dan hormat), contoh topik: berpakaian sopan di area pura, tidak memasuki area yang dilarang, tidak mengambil foto tanpa izin saat upacara, tidak menyentuh sesajen, menjaga ketenangan, menghormati arahan pemangku/pecalang. **Verifikasi isi** ke sumber resmi atau tokoh setempat sebelum dipublikasikan.
- **Footer:** nama proyek, tautan navigasi, tahun, catatan "Data contoh, informasi sedang dilengkapi", kredit.
- **Kriteria:** semua teks terbaca di HP; footer tampil di semua halaman.

### F8. Login / Daftar (TAMPILAN SAJA)
- Form **Masuk**: email, kata sandi. Form **Daftar**: nama, email, kata sandi, konfirmasi kata sandi.
- Validasi sisi klien: email berformat benar, kata sandi ≥ 8 karakter, konfirmasi cocok, nama tidak kosong.
- Saat tombol kirim ditekan dan valid → tampilkan pesan: **"Fitur akun segera hadir. Data Anda tidak disimpan."**
- Tampilkan spanduk di halaman: "Fitur akun belum aktif".
- **Kriteria:** pesan kesalahan muncul di bawah kolom terkait dan jelas; tidak ada data yang disimpan (tidak di `localStorage`, tidak dikirim ke mana pun); kolom kata sandi bertipe `password`.

### F9. Responsif, Empty State, Loading, Error
- Titik patah: **HP** (<640px), **tablet** (640–1023px), **desktop** (≥1024px). Desain dimulai dari HP (*mobile-first*).
- Komponen `EmptyState`, `LoadingState`, `ErrorState`, dan halaman `NotFound` dipakai ulang di seluruh situs.
- **Kriteria:** tidak ada scroll horizontal di lebar 360px; area sentuh tombol ≥ 44×44px; teks ≥ 16px untuk isi utama.

---

## 8. Kerangka Wireframe (Teks)

> Wireframe di bawah adalah **kerangka tata letak**, bukan desain akhir. Karakter `[ ]` = tombol/kolom, `▒▒` = gambar.

### 8.1 Beranda (Desktop)
```
┌──────────────────────────────────────────────────────────────┐
│ NAVBAR: Sundara Yatra | Beranda Destinasi Even Tentang | [Masuk] [Daftar] │
├──────────────────────────────────────────────────────────────┤
│ HERO (gambar latar ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒)    │
│   Sundara Yatra                                              │
│   "Jelajahi seni, budaya, dan keindahan Bali"                │
│   [ Jelajahi ]                                               │
│   Pilih wilayah:                                             │
│   (Badung)(Bangli)(Buleleng)(Gianyar)(Jembrana)              │
│   (Karangasem)(Klungkung)(Tabanan)(Denpasar)                 │
├──────────────────────────────────────────────────────────────┤
│ KATEGORI SENI:  [Tari][Musik][Seni Rupa][Kriya][Festival]    │
├──────────────────────────────────────────────────────────────┤
│ DESTINASI UNGGULAN                      [Lihat semua →]      │
│ ┌────────┐ ┌────────┐ ┌────────┐                             │
│ │ ▒▒▒▒▒▒ │ │ ▒▒▒▒▒▒ │ │ ▒▒▒▒▒▒ │   (3 kartu)                 │
│ │ Nama   │ │ Nama   │ │ Nama   │                             │
│ │ Kab.|Kat│ │       │ │       │                             │
│ └────────┘ └────────┘ └────────┘                             │
├──────────────────────────────────────────────────────────────┤
│ EVEN TERDEKAT                           [Lihat kalender →]   │
│ 05 DES | Nama even ......... Kab. | [umum]                   │
│ 12 DES | Nama even ......... Kab. | [tiket]                  │
├──────────────────────────────────────────────────────────────┤
│ AJAKAN: "Hormati budaya, nikmati perjalanan" [Etika Berkunjung →] │
├──────────────────────────────────────────────────────────────┤
│ FOOTER: nama | tautan | catatan data contoh | © tahun        │
└──────────────────────────────────────────────────────────────┘
```

### 8.2 Beranda (HP, satu kolom)
```
┌───────────────┐
│ ☰  Sundara Yatra │
├───────────────┤
│ HERO ▒▒▒▒▒▒▒▒ │
│ Judul + tagline│
│ [ Jelajahi ]   │
│ (chip wilayah  │
│  bisa digeser  │
│  ke samping)   │
├───────────────┤
│ Kategori (chip)│
├───────────────┤
│ Kartu 1 (penuh)│
│ Kartu 2 (penuh)│
├───────────────┤
│ Even terdekat  │
├───────────────┤
│ Footer         │
└───────────────┘
```

### 8.3 Daftar Destinasi
```
Judul: Destinasi
[ 🔍 Cari destinasi... ]
Kabupaten: [Semua ▾]   Kategori: (Semua)(Tari)(Musik)(Seni Rupa)(Kriya)(Festival)
[ Atur ulang filter ]               "12 destinasi ditemukan"
┌────────┐ ┌────────┐ ┌────────┐
│ kartu  │ │ kartu  │ │ kartu  │   desktop: 3 kolom
└────────┘ └────────┘ └────────┘   tablet: 2 kolom, HP: 1 kolom
(Jika kosong:  ┌──────────────────────────┐
               │ Tidak ada hasil           │
               │ Coba ubah kata kunci/filter│
               │ [ Atur ulang filter ]     │
               └──────────────────────────┘)
```

### 8.4 Kalender Even
```
Judul: Kalender Even
Bulan: [Semua bulan ▾]  Kategori: [Semua ▾]  Kabupaten: [Semua ▾]
[ ] Tampilkan even yang sudah berlalu
─────────────────────────────────────────────
DESEMBER 2026
 05 DES  Nama even                 Lokasi, Kab.       [umum]
 12 DES  Nama even                 Lokasi, Kab.       [sakral] ⓘ catatan
JANUARI 2027
 ...
(Jika kosong: EmptyState "Tidak ada even pada filter ini")
```

### 8.5 Detail Destinasi
```
[← Kembali ke daftar]
┌──────────────────────────────────────────────┐
│ FOTO UTAMA ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ │
└──────────────────────────────────────────────┘
Nama Destinasi            (badge: Kabupaten) (badge: Kategori) (badge: Data contoh)
Deskripsi ...
┌─ Informasi ──────────┐  ┌─ Lokasi ──────────────┐
│ Jam kunjung          │  │ Alamat                │
│ Tiket                │  │ [ Buka di Google Maps ]│
│ Fasilitas            │  └───────────────────────┘
└──────────────────────┘
GALERI:  [▒▒][▒▒][▒▒][▒▒]
EVEN TERKAIT:
  05 DES | Nama even | [umum]
Kredit foto: ...
```

### 8.6 Tentang
```
Judul: Tentang Sundara Yatra
Misi & Nilai (paragraf + 3 poin)
Etika Berkunjung  (daftar bernomor ≥ 6 poin, ikon sederhana)
Kontak (tautan valid / "segera hadir")
```

### 8.7 Masuk / Daftar
```
┌──────────────────────────────┐
│ [Spanduk: Fitur akun belum aktif] │
│ Masuk                         │
│ Email   [__________]          │
│ Sandi   [__________]          │
│ [ Masuk ]                     │
│ Belum punya akun? Daftar →    │
└──────────────────────────────┘
```

---

## 9. Komponen Reusable

| Komponen | Fungsi | Props utama |
|---|---|---|
| `Container` | Pembatas lebar konten + padding | `children` |
| `Button` | Tombol seragam | `variant` (utama/sekunder/garis), `onClick`, `href` |
| `Badge` | Label kecil (kategori, akses, data contoh) | `variant`, `children` |
| `Card` | Kotak dasar kartu | `children` |
| `DestinasiCard` | Kartu destinasi | `destinasi` |
| `EvenItem` | Satu baris even | `even` |
| `FilterChip` | Tombol filter (kabupaten/kategori) | `label`, `aktif`, `onClick` |
| `SearchBar` | Kolom pencarian berlabel | `value`, `onChange` |
| `EmptyState` | "Tidak ada hasil" | `judul`, `pesan`, `aksi` |
| `LoadingState` | Indikator memuat | – |
| `ErrorState` | Pesan kesalahan + tombol coba lagi | `pesan`, `onRetry` |
| `Alert` | Spanduk informasi | `jenis`, `children` |

Aturan: tidak ada gaya atau markup yang disalin berulang; jika dipakai ≥ 2 kali, jadikan komponen.

---

## 10. Sistem Desain

### 10.1 Warna (variabel CSS di `index.css`)
| Nama | Contoh nilai | Penggunaan |
|---|---|---|
| `--hijau-tua` | `#1F4D3A` | Warna utama, navbar, tombol utama |
| `--hijau-muda` | `#E4EFE7` | Latar seksi |
| `--krem` | `#FAF6EE` | Latar halaman |
| `--cokelat` | `#6B4A2F` | Teks sekunder, garis |
| `--emas` | `#C9A24A` | Aksen, tombol sorot |
| `--teks` | `#1E1E1E` | Teks utama |
| `--biru-laut` | `#2F6F8F` | Tautan, info |

> **Wajib:** cek kontras teks vs latar (target rasio ≥ 4,5:1 untuk teks isi). Teks emas di atas krem biasanya **kurang kontras**; jangan dipakai untuk teks kecil.

### 10.2 Tipografi
- Judul: font serif elegan (misal *Playfair Display*); isi: sans-serif mudah dibaca (misal *Inter*). Jika memakai Google Fonts, sediakan **fallback** (`serif`, `sans-serif`) dan batasi maksimal 2 keluarga font.
- Skala: isi 16px, subjudul 20–24px, judul 32–48px. Tinggi baris isi ±1,6.

### 10.3 Jarak dan bentuk
- Kelipatan 4px (kelas Tailwind default). Sudut membulat sedang (`rounded-xl`) untuk kartu. Bayangan tipis.
- Lebar konten maksimum ±1152px (`max-w-6xl`), rata tengah.

### 10.4 Gaya visual
Natural, modern, elegan: banyak ruang kosong, foto besar, ornamen minimal. Animasi **sederhana** (hover, transisi 150–300ms). Hormati preferensi `prefers-reduced-motion` (matikan animasi bila diminta).

---

## 11. Aksesibilitas (Wajib)
- HTML semantik: `header`, `nav`, `main`, `section`, `footer`; satu `h1` per halaman, urutan judul tidak melompat.
- Semua `img` punya `alt` bermakna (gambar dekoratif: `alt=""`).
- Semua kolom form punya `label` terhubung.
- Fokus keyboard terlihat jelas; urutan Tab logis.
- Tombol/tautan punya nama yang jelas (bukan hanya "klik di sini").
- Jangan mengandalkan warna saja untuk menyampaikan informasi (tambahkan teks/ikon).

## 12. SEO dan Performa
- `<title>` dan `<meta name="description">` unik per halaman (boleh via `document.title` sederhana).
- Gambar: ukuran wajar (idealnya < 300 KB per gambar, format WebP/JPEG), atribut `loading="lazy"` untuk gambar di bawah layar pertama, `width`/`height` untuk mencegah loncatan tata letak.
- Tambahkan `public/robots.txt` sederhana.
- **Catatan jujur:** karena ini aplikasi satu halaman (SPA) tanpa render server, SEO terbatas. Jangan mengklaim "SEO-friendly" sebelum diuji.

---

## 13. E — ERRORS & EDGES (Penanganan Kegagalan dan Kasus Tepi)

| Situasi | Perilaku yang diharapkan |
|---|---|
| Pencarian/filter tidak menemukan apa pun | `EmptyState` "Tidak ada hasil" + tombol "Atur ulang filter" |
| `id` destinasi di URL tidak ada | Halaman "Destinasi tidak ditemukan" + tautan kembali |
| Rute tidak dikenal | Halaman 404 + tombol ke Beranda |
| `data.json` gagal dimuat/format salah | `ErrorState` dengan pesan ramah dan tombol "Coba lagi" (bukan layar putih) |
| Gambar gagal dimuat | Tampilkan gambar pengganti (placeholder) dengan `onError` |
| Field data `null`/kosong | Tampilkan "Informasi belum tersedia" |
| Even tanpa `destinasiId` | Tampil tanpa tautan destinasi |
| Even lintas bulan/tahun | Diurutkan dan difilter berdasarkan `tanggalMulai` |
| Tanggal tidak valid | Lewati item itu, jangan merusak seluruh daftar; catat di console (pengembangan) |
| Parameter URL berisi nilai aneh (`?kabupaten=xyz`) | Abaikan nilai yang tidak ada di enum; anggap "Semua" |
| Input pencarian sangat panjang / berisi karakter khusus | Batasi panjang (misal 100 karakter), perlakukan sebagai teks biasa |
| Form Login/Daftar tidak valid | Pesan error per kolom, fokus pindah ke kolom bermasalah |
| Layar sangat kecil (≤ 360px) | Tata letak tetap utuh, tidak ada scroll horizontal |
| JavaScript dimatikan | Tampilkan pesan `<noscript>` singkat |
| Terjadi error tak terduga di komponen | `ErrorBoundary` sederhana menampilkan pesan, bukan layar putih |

---

## 14. C — CONSTRAINTS & SECURITY (Larangan dan Keamanan)

### 14.1 Larangan untuk AI dan pembuat
1. **Jangan** menambah fitur di luar bagian 2.1.
2. **Jangan** memasang paket tanpa menyebut nama, fungsi, dan alasannya, lalu menunggu persetujuan.
3. **Jangan** menghapus atau menimpa file yang tidak terkait tugas; jangan mengubah banyak file sekaligus tanpa penjelasan.
4. **Jangan** menulis ulang seluruh aplikasi untuk memperbaiki satu bug (pakai alur: reproduksi → akar masalah → perbaikan minimal → uji).
5. **Jangan** mengarang data (alamat, harga, jadwal, koordinat, fakta budaya). Beri tanda `dataContoh`.
6. **Jangan** memakai foto/teks/aset tanpa izin atau lisensi yang jelas. Catat sumber di `kreditFoto`.
7. **Jangan** membuat login palsu yang hanya menyembunyikan halaman lalu menyebutnya aman.
8. **Jangan** menyatakan fitur "aman", "sudah diuji", atau "SEO-friendly" tanpa pemeriksaan nyata.
9. **Jangan** menjalankan perintah destruktif (`rm -rf`, `git reset --hard`, `git push --force`, dll.) tanpa persetujuan eksplisit.

### 14.2 Aturan keamanan teknis
- **Tidak ada rahasia di repositori.** Proyek ini tidak butuh API key. Jika nanti ada, simpan di `.env` (sudah masuk `.gitignore`), bukan di kode. File `.env.example` hanya berisi nama variabel tanpa nilai.
- **Cegah XSS:** jangan memakai `dangerouslySetInnerHTML`, `innerHTML`, atau `eval`. Tampilkan teks lewat JSX biasa (otomatis di-escape).
- **Validasi URL:** `mapsUrl` hanya boleh `https://` dengan host `www.google.com`, `maps.google.com`, atau `maps.app.goo.gl` (cek di `src/lib/url`). Selain itu, tombol Maps disembunyikan. Tautan eksternal memakai `target="_blank"` **dan** `rel="noopener noreferrer"`.
- **Parameter URL dan input pencarian** dianggap tidak tepercaya: validasi terhadap daftar nilai yang diizinkan, jangan dimasukkan ke HTML mentah.
- **Form Login/Daftar:** jangan menyimpan kata sandi di mana pun (state sementara boleh, dikosongkan setelah kirim), jangan mencatat (`console.log`) isi kolom sandi, jangan mengirim ke jaringan.
- **Rantai pasok paket:** sebelum menerima paket baru dari saran AI, cek di npmjs.com: jumlah unduhan mingguan, usia, repositori GitHub, dan pembuat. Waspadai nama paket yang terdengar masuk akal tetapi tidak dikenal. Setelah instalasi, jalankan `npm audit` dan baca hasilnya.
- **Review kode AI:** baca semua perubahan (`git diff`) sebelum commit. Perhatikan kode yang aneh, URL asing, atau fungsi yang namanya tidak dikenal.
- **Hak cipta dan privasi:** jangan menempel data pribadi, token, atau file `.env` ke chat AI.

### 14.3 Etika (dari materi Vibes Coding)
Jujur soal kontribusi AI jika diminta; hormati lisensi; jaga privasi; uji sebelum rilis; jangan buat fitur berbahaya; **transparan** bahwa ini versi eksperimental dengan data contoh.

---

## 15. Pengujian (Checklist Manual)

Isi kolom hasil dengan **LULUS / GAGAL / BELUM DIUJI** berdasarkan pengujian nyata. Jangan mengarang hasil.

| No | Skenario | Hasil yang diharapkan | Hasil |
|---|---|---|---|
| 1 | Buka Beranda | Hero, kategori, destinasi unggulan, even terdekat tampil | |
| 2 | Klik "Jelajahi" | Menuju `/destinasi` | |
| 3 | Klik chip kabupaten di Hero | `/destinasi` dengan filter aktif | |
| 4 | Cari kata yang ada | Hasil sesuai | |
| 5 | Cari kata yang tidak ada | Empty state tampil | |
| 6 | Gabung filter kabupaten + kategori | Hanya yang cocok keduanya | |
| 7 | Klik "Atur ulang filter" | Semua data kembali | |
| 8 | Buka Kalender Even | Urut tanggal, benar | |
| 9 | Filter bulan tanpa even | Empty state | |
| 10 | Buka detail destinasi | Info, galeri, even terkait, tautan Maps benar | |
| 11 | Buka `/destinasi/ngawur` | "Destinasi tidak ditemukan" | |
| 12 | Buka rute acak | 404 | |
| 13 | Gambar sengaja dirusak | Placeholder tampil | |
| 14 | Form Daftar dengan data tidak valid | Pesan error jelas per kolom | |
| 15 | Form Daftar valid | Pesan "Fitur akun segera hadir" | |
| 16 | Lebar layar 360px | Tidak ada scroll horizontal | |
| 17 | Navigasi hanya dengan keyboard | Semua bisa dijangkau, fokus terlihat | |
| 18 | `npm run build` | Berhasil tanpa error | |
| 19 | Situs di Vercel | Tautan publik terbuka, semua rute bisa di-refresh | |
| 20 | Tidak ada rahasia di repo | `git status`/`git diff` bersih dari secret | |

---

## 16. Alur Git
- Awal: `git init` (sudah), buat repositori GitHub, hubungkan, dorong.
- **Commit sebelum meminta AI bekerja**, dan setelah tiap fitur terverifikasi.
- Sebelum commit: `git status`, `git diff`, pastikan tidak ada secret.
- Pesan commit (bahasa Inggris singkat atau Indonesia, konsisten):
  - `chore: initialize project`
  - `docs: add SPEC.md`
  - `feat: add navbar, hero, footer`
  - `feat: add destination list with search and filters`
  - `feat: add event calendar`
  - `feat: add destination detail page`
  - `feat: add about page and visiting etiquette`
  - `feat: add login/register UI (no auth)`
  - `fix: ...`, `refactor: ...`, `test: ...`

---

## 17. Rencana Prompt Berpola S.P.E.C (Salin ke Copilot)

> Selalu lampirkan `#file:SPEC.md`. Kerjakan berurutan. Setelah tiap prompt: jalankan `npm run dev`, cek kriteria penerimaan fitur terkait, baca `git diff`, lalu commit.

### Prompt 0 — Persiapan proyek
```
Baca #file:SPEC.md terlebih dahulu.

S (Stack & Scope): Buat proyek Vite + React + Tailwind CSS + React Router di FOLDER SAAT INI (jangan membuat subfolder baru). Hanya inisialisasi proyek dan struktur folder bagian 5. Belum membuat fitur.
P (Purpose): Proyek bisa dijalankan dengan `npm run dev` dan menampilkan halaman kosong berjudul "Sundara Yatra".
E (Errors): Jika folder tidak kosong atau ada konflik file, berhenti dan tanyakan, jangan menimpa.
C (Constraints): Gunakan dokumentasi resmi untuk instalasi Tailwind dan React Router. Jangan memasang paket selain yang disebut. Buat .gitignore (node_modules, dist, .env) dan vercel.json sesuai bagian 18. Jelaskan setiap file yang dibuat dalam bahasa Indonesia.
```

### Prompt 1 — Data, tema, kerangka layout
```
Ikuti #file:SPEC.md bagian 6, 8, 9, 10.

S: Tambah src/data/data.json (3 destinasi + 3 even, SEMUA data contoh dengan dataContoh:true), variabel warna di index.css, komponen Container, Button, Badge, Card, Navbar, Footer, dan routing semua rute (halaman boleh masih placeholder).
P: Navbar responsif dengan menu hamburger di HP; tombol Masuk/Daftar di Navbar; Footer dengan catatan "Data contoh".
E: Rute tidak dikenal menampilkan halaman 404.
C: Jangan mengarang alamat/harga/jadwal. Tanpa paket baru. Tanpa dangerouslySetInnerHTML. Tulis penjelasan singkat dalam bahasa Indonesia.
```

### Prompt 2 — Beranda
```
Ikuti #file:SPEC.md F2, F3, bagian 8.1 dan 8.2.
S: Kerjakan HANYA halaman Beranda.
P: Hero + tombol Jelajahi + chip 9 kabupaten (menuju /destinasi?kabupaten=...) + chip 5 kategori + 3 destinasi unggulan + 3 even terdekat.
E: Jika data kosong tampilkan EmptyState; gambar rusak pakai placeholder.
C: Gunakan komponen reusable yang sudah ada; kontras teks di atas gambar harus cukup; tidak menambah fitur lain.
```

### Prompt 3 — Daftar Destinasi
```
Ikuti #file:SPEC.md F4, bagian 8.3, 13, 14.
S: Kerjakan HANYA halaman /destinasi. Taruh logika filter di src/lib/filter.
P: Pencarian + filter kabupaten + filter kategori digabung, jumlah hasil, tombol Atur ulang, filter tersimpan di parameter URL.
E: Hasil nol → EmptyState; parameter URL tidak valid diabaikan; panjang pencarian dibatasi 100 karakter.
C: Parameter URL dan input dianggap tidak tepercaya; tanpa innerHTML; tanpa paket baru.
```

### Prompt 4 — Kalender Even
```
Ikuti #file:SPEC.md F5, bagian 8.4, 13.
S: Kerjakan HANYA halaman /even. Taruh format tanggal di src/lib/tanggal.
P: Daftar urut tanggal, filter bulan + kategori + kabupaten, lencana akses, catatan untuk even sakral, tanda "Telah berlalu", format tanggal bahasa Indonesia.
E: Tanggal tidak valid dilewati tanpa merusak daftar; hasil nol → EmptyState.
C: Jangan mengarang jadwal; tanpa paket tanggal tambahan (pakai Intl.DateTimeFormat bawaan browser).
```

### Prompt 5 — Detail Destinasi
```
Ikuti #file:SPEC.md F6, bagian 8.5, 14.2.
S: Kerjakan HANYA /destinasi/:id. Buat src/lib/url untuk memvalidasi mapsUrl.
P: Tampilkan semua informasi, galeri, tombol Google Maps, even terkait, kredit foto, tombol kembali.
E: id tidak ada → halaman "Destinasi tidak ditemukan"; field null → "Informasi belum tersedia"; gambar rusak → placeholder.
C: Tautan eksternal memakai rel="noopener noreferrer"; mapsUrl hanya https dan host yang diizinkan; tanpa paket baru.
```

### Prompt 6 — Tentang, Etika, Masuk/Daftar
```
Ikuti #file:SPEC.md F7, F8, bagian 8.6 dan 8.7.
S: Kerjakan HANYA halaman /tentang, /masuk, /daftar. Taruh validasi di src/lib/validasi.
P: Tentang + Etika Berkunjung (≥ 6 poin, isi hormat dan akurat, beri catatan bahwa perlu diverifikasi) + form Masuk/Daftar TAMPILAN SAJA dengan validasi dan pesan "Fitur akun segera hadir. Data Anda tidak disimpan."
E: Pesan error per kolom; fokus pindah ke kolom bermasalah.
C: JANGAN menyimpan atau mengirim data form; JANGAN console.log kata sandi; JANGAN membuat login palsu; tanpa paket baru.
```

### Prompt 7 — Penyempurnaan, aksesibilitas, review
```
Ikuti #file:SPEC.md bagian 11, 12, 13, 15.
S: Periksa seluruh proyek tanpa menambah fitur baru.
P: Tambahkan ErrorBoundary, noscript, title/description per halaman, loading="lazy", robots.txt, dan perbaiki masalah aksesibilitas yang ditemukan.
E: Laporkan daftar temuan dulu (masalah, penyebab, usulan perbaikan) dan TUNGGU persetujuan sebelum mengubah file.
C: Perubahan minimal; jangan menulis ulang komponen yang sudah benar; laporkan hasil pengujian secara jujur (LULUS/GAGAL/BELUM DIUJI).
```

### Prompt 8 — Review keamanan
```
Ikuti #file:SPEC.md bagian 14.
Lakukan review keamanan pada seluruh kode: cari dangerouslySetInnerHTML/innerHTML/eval, tautan eksternal tanpa rel, URL yang tidak divalidasi, rahasia di repo, console.log data sensitif. Jalankan `npm audit` dan jelaskan hasilnya.
Pisahkan temuan TERBUKTI dan DUGAAN. Jangan mengubah apa pun sebelum saya setujui.
```

---

## 18. Deploy ke Vercel
1. Pastikan `npm run build` berhasil dan semua checklist bagian 15 diperiksa.
2. Buat `vercel.json` di akar proyek agar rute seperti `/destinasi/xyz` tidak 404 saat di-refresh:
   ```json
   {
     "rewrites": [{ "source": "/(.*)", "destination": "/" }]
   }
   ```
3. Dorong kode ke GitHub (pastikan `.env` dan `node_modules` tidak ikut).
4. Di Vercel: **Add New → Project → Import** repositori. Preset: **Vite** (otomatis terdeteksi). Build command `npm run build`, output `dist`.
5. Deploy, buka tautan publik, uji: Beranda, filter, detail, refresh di halaman detail, tampilan HP.
6. Bagikan tautan dengan catatan jujur: *"Versi awal, data contoh."*

---

## 19. README.md (Minimal Isi)
Deskripsi proyek, fitur, teknologi, struktur folder, cara instal (`npm install`), jalankan (`npm run dev`), build (`npm run build`), cara deploy, catatan "data contoh", kredit foto.

---

## 20. Definisi Selesai (Definition of Done)
Sebuah fitur selesai jika: (1) kode berjalan tanpa error di konsol, (2) kriteria penerimaan di bagian 7 terpenuhi, (3) kasus tepi di bagian 13 ditangani, (4) larangan di bagian 14 tidak dilanggar, (5) sudah dites manual di HP dan laptop, (6) `git diff` sudah dibaca, (7) sudah di-commit.

---

## 21. Backlog (Ide Fase Lanjut, JANGAN dikerjakan di MVP)
Autentikasi nyata (mis. Supabase Auth) · database · dashboard admin/CMS · unggah gambar · peta interaktif (Leaflet/OpenStreetMap) · multi-bahasa ID/EN · wishlist · ulasan · booking tiket · render sisi server (Next.js) untuk SEO lebih baik · pengujian otomatis (Vitest, Playwright) · analytics.

---

## 22. Risiko dan Asumsi
- **Waktu 2 jam sangat ketat:** utamakan alur inti (Beranda → Destinasi → Detail → Even). Poles belakangan.
- **Kualitas data:** data contoh bisa terlihat nyata; selalu beri label.
- **Halusinasi AI:** kode dan fakta dari AI bisa keliru; review dan cek dokumentasi resmi.
- **Hak foto:** foto wisata sering berhak cipta; pakai milik sendiri atau berlisensi bebas.
- **Kepekaan budaya:** konsultasikan konten upacara/adat dengan sumber yang berwenang.
