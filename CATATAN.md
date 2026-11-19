# CATATAN.md — Sundara Yatra

Catatan latihan Vibes Coding · Badung, Bali · Kamis, 19 November 2026

> Bagian bertanda **(isi sendiri)** diisi berdasarkan pengalaman nyata saat latihan. Jangan diisi dengan dugaan.

---

## 1. Tujuan Latihan

1. **Memahami alur vibes coding** dari ide sampai rilis: jelaskan ide → AI menghasilkan kode → jalankan dan cek → beri umpan balik → perbaiki.
2. **Berlatih menulis prompt berpola S.P.E.C** (Stack & Scope, Purpose & Behavior, Errors & Edges, Constraints & Security), satu prompt untuk satu tugas.
3. **Membangun front-end web** yang berjalan, lalu **mempublikasikannya ke Vercel** agar bisa dibuka lewat tautan publik.
4. **Menerapkan kebiasaan aman dan beretika:** commit sebelum agen bekerja, membaca `git diff`, memeriksa paket dan data, tidak menempel rahasia ke chat AI, serta jujur tentang keterbatasan hasil.
5. **Menjadi pengarah dan penguji**, bukan hanya penerima kode: kualitas, keamanan, dan keputusan akhir tetap tanggung jawab saya.

---

## 2. Target Aplikasi

**Nama:** Sundara Yatra
**Jenis:** website wisata seni dan budaya Bali yang memadukan destinasi dengan even kesenian/budaya.
**Pembeda:** menjawab bukan hanya "ke mana?", tetapi juga "kapan, dan ada pertunjukan apa di sana?"

### Fitur inti (MVP)
- Navbar dan Hero dengan filter kabupaten/kota di Bali (9 wilayah).
- Filter kategori seni: Tari, Musik, Seni Rupa, Kriya, Festival.
- Daftar destinasi: kartu, pencarian, filter, dan *empty state* "Tidak ada hasil".
- Kalender even: urut tanggal, filter bulan.
- Halaman detail destinasi: galeri, lokasi, even terkait, tautan Google Maps.
- Halaman Tentang, Etika Berkunjung, dan Footer.
- Halaman Masuk/Daftar **tampilan saja** (tanpa autentikasi nyata).
- Tampilan responsif di HP.

### Fitur tambahan (jika waktu masih ada)
WhatsApp, dashboard CRUD mode demo, dan penyimpanan localStorage (lihat `TASKS.md`).

### Target hasil hari ini
- Situs berjalan dengan `npm run dev` dan `npm run build` berhasil.
- Terpublikasi di Vercel dengan tautan publik yang bisa di-refresh di setiap rute.
- Seluruh data berlabel **"data contoh"** kecuali yang sudah terverifikasi.
- Kode ada di GitHub tanpa rahasia di dalamnya.

### Batasan
Waktu ±2 jam, tanpa backend dan database, dokumen panduan: `SPEC.md`, `UI-SPEC.md`, `TASKS.md`.

---

## 3. Satu Risiko Penggunaan AI yang Diperiksa

### Risiko yang dipilih: **Halusinasi**
AI menghasilkan keluaran yang **tampak rapi dan meyakinkan, tetapi salah atau karangan**. Pada proyek ini ada dua bentuknya:

- **Halusinasi data/fakta:** alamat, jam buka, harga, jadwal even, atau makna budaya yang dikarang.
- **Halusinasi kode:** memakai fungsi, opsi, atau cara instalasi yang tidak ada atau sudah usang (misalnya konfigurasi Tailwind/React Router yang tidak sesuai versi), atau logika filter/validasi yang terbalik namun terlihat benar.

### Mengapa risiko ini penting untuk Sundara Yatra
Situs wisata budaya dipercaya pengunjung. Jadwal even atau aturan upacara yang keliru dapat menyesatkan wisatawan dan merugikan masyarakat setempat. Kode yang keliru pada filter, validasi URL, atau penyimpanan dapat tampak berfungsi tetapi diam-diam salah.

### Pertanyaan yang ingin dijawab
> Seberapa sering AI mengarang data atau menghasilkan kode yang keliru ketika saya hanya memberi instruksi umum, dan apakah aturan di `SPEC.md` (label `dataContoh`, larangan mengarang data, wajib cek dokumentasi resmi) benar-benar mengurangi masalah itu?

### Cara memeriksa
| Langkah | Yang dilakukan | Bukti yang dicatat |
|---|---|---|
| 1 | Minta AI membuat data destinasi dan even **tanpa** memberi data sendiri, lalu periksa tiap alamat, jam, harga, dan jadwal terhadap sumber resmi | Tabel temuan (bagian 4) |
| 2 | Periksa apakah AI mematuhi aturan "isi `null` bila belum terverifikasi" dan memberi `dataContoh: true` | Cuplikan `data.json` |
| 3 | Minta AI menjelaskan sumber setiap fakta budaya dalam Etika Berkunjung; verifikasi ke sumber atau tokoh setempat | Daftar sumber |
| 4 | Periksa instalasi Tailwind dan React Router yang dihasilkan AI terhadap **dokumentasi resmi** versi terpasang | Catatan perbedaan |
| 5 | Uji logika `filter`, `tanggal`, `validasi`, `url` dengan kasus normal dan tepi (SPEC.md bagian 13 dan 15) | Hasil LULUS/GAGAL |
| 6 | Baca `git diff` setiap perubahan; tandai fungsi, paket, atau URL yang tidak dikenal | Catatan review |

### Kriteria hasil
- **Terkendali** jika: tidak ada data karangan yang lolos ke versi rilis tanpa label "data contoh", dan semua temuan keliru sudah diperbaiki atau ditandai.
- **Tidak terkendali** jika: ada fakta/jadwal/alamat karangan tampil tanpa label, atau ada kode keliru lolos ke rilis.

### Kontrol yang diterapkan
- Aturan di `SPEC.md` bagian 6.2 dan 14.1: dilarang mengarang data; wajib `dataContoh`.
- Wajib review kode (`git diff`) sebelum commit.
- Cek dokumentasi resmi untuk instalasi dan sintaks.
- Uji manual (SPEC.md bagian 15) dan laporan hasil apa adanya.
- Verifikasi isi budaya ke sumber/tokoh berwenang.

---

## 4. Tabel Temuan (isi sendiri saat latihan)

| No | Keluaran AI | Jenis (data / kode) | Benar atau salah | Bukti/sumber pengecekan | Tindakan |
|---|---|---|---|---|---|
| 1 | | | | | |
| 2 | | | | | |
| 3 | | | | | |
| 4 | | | | | |
| 5 | | | | | |

---

## 5. Kesimpulan (isi sendiri setelah latihan)

- **Jumlah temuan keliru:** …
- **Contoh paling berbahaya yang ditemukan:** …
- **Apakah aturan SPEC.md membantu?** …
- **Yang akan saya lakukan berbeda lain kali:** …

---

## 6. Refleksi Singkat (isi sendiri)

- Apa yang berjalan baik?
- Apa kendala terbesar?
- Fitur apa yang ditunda ke fase lanjut?
- Pelajaran paling penting tentang bekerja dengan AI:
