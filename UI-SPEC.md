# UI-SPEC.md — Sundara Yatra

> Spesifikasi desain antarmuka (UI/UX) untuk **Sundara Yatra**, pelengkap `SPEC.md`.
> Bila ada pertentangan: **SPEC.md menentukan fitur, ruang lingkup, data, dan keamanan; UI-SPEC.md menentukan tampilan dan interaksi.**
> Seluruh ketentuan ditulis dalam bahasa Indonesia. Pakai bersama Copilot dengan melampirkan `#file:SPEC.md` dan `#file:UI-SPEC.md`.
> Nilai kontras pada dokumen ini adalah **hasil hitung perkiraan**; tetap verifikasi dengan alat (misalnya WebAIM Contrast Checker) sebelum dipublikasikan.

---

## 1. Konsep dan Karakter Visual

### 1.1 Ide inti
**"Sundara"** (indah) dan **"Yatra"** (perjalanan): antarmuka harus terasa seperti **perjalanan yang tenang dan menghargai budaya**, bukan brosur wisata yang ramai. Pengunjung diajak menikmati seni dengan pelan: banyak ruang kosong, foto besar, tipografi elegan.

### 1.2 Kata kunci suasana
| Gunakan | Hindari |
|---|---|
| Tenang, hangat, elegan | Ramai, norak, penuh stiker |
| Alami (sawah, hutan, laut, tanah) | Neon, gradasi tajam, gaya "startup generik" |
| Bernuansa kerajinan (tenun, ukir, anyaman) | Meniru simbol sakral sebagai hiasan |
| Foto besar, teks ringkas | Teks panjang di atas gambar sibuk |

### 1.3 Sumber inspirasi (diterjemahkan secara abstrak, bukan disalin)
- **Teras sawah dan hutan tropis** → hijau tua dan hijau muda.
- **Batu bata merah, tanah liat, dan kayu ukir** → terakota dan cokelat.
- **Prada (hiasan emas) pada kain dan ukiran** → emas, dipakai hemat sebagai aksen.
- **Laut dan langit** → biru laut untuk informasi dan tautan.
- **Tenun dan anyaman** → pola garis/ritme geometris halus sebagai pemisah dan latar tipis.

### 1.4 Etika visual budaya (WAJIB)
1. **Jangan memakai simbol sakral sebagai ornamen dekoratif**: aksara suci, simbol Om, wajah Barong/Rangda/topeng sakral, pola poleng (kotak hitam-putih), sesajen, atau atribut upacara sebagai ikon, latar, atau tombol.
2. Ornamen cukup **abstrak dan netral**: garis bergelombang halus, pola geometris sederhana, siluet daun/teras sawah. Bila ingin motif tradisional yang lebih spesifik, **konsultasikan dengan seniman atau tokoh setempat**.
3. Foto upacara atau orang: **harus ada izin** dan keterangan kredit; hindari menampilkan bagian yang disakralkan.
4. Label **"sakral"** pada even selalu disertai catatan etika (lihat 9.6), bukan sekadar lencana hiasan.
5. Jangan mengklaim makna budaya yang belum diverifikasi.

---

## 2. Sistem Warna

### 2.1 Palet inti
| Token | Nilai | Peran |
|---|---|---|
| `--hijau-tua` | `#1F4D3A` | Warna utama: navbar, tombol utama, judul bagian |
| `--hijau-muda` | `#E4EFE7` | Latar seksi, lencana kategori Festival |
| `--krem` | `#FAF6EE` | Latar halaman utama |
| `--putih` | `#FFFFFF` | Latar kartu, teks di atas hijau tua |
| `--cokelat` | `#6B4A2F` | Teks sekunder, garis, ikon |
| `--teks` | `#1E1E1E` | Teks utama |
| `--emas` | `#C9A24A` | **Aksen saja**: tombol sorot, garis hias, bintang/penanda |
| `--biru-laut` | `#2F6F8F` | Tautan, informasi, lencana "umum" |
| `--terakota` | `#A8452B` | Peringatan lembut, lencana "sakral", aksen hangat |

### 2.2 Warna kategori seni (lencana: latar muda + teks tua)
| Kategori | Latar | Teks |
|---|---|---|
| Tari | `#F6E3DC` | `#7A2E1A` |
| Musik | `#DCEAF1` | `#1F4F68` |
| Seni Rupa | `#F3EAD0` | `#6B5314` |
| Kriya | `#EADFD3` | `#4F3721` |
| Festival | `#E4EFE7` | `#1F4D3A` |

> Kategori **selalu** memakai teks (nama kategori), bukan warna saja, agar tetap terbaca bagi pengguna buta warna.

### 2.3 Kombinasi yang diizinkan dan kontras perkiraan
| Teks / latar | Perkiraan rasio | Keputusan |
|---|---|---|
| `--hijau-tua` di atas `--krem` | ±8,9 : 1 | Boleh untuk semua ukuran teks |
| `--teks` di atas `--krem` | ±15 : 1 | Boleh |
| `--cokelat` di atas `--krem` | ±7,4 : 1 | Boleh (teks sekunder) |
| `--putih` di atas `--hijau-tua` | ±9,6 : 1 | Boleh (navbar, tombol utama) |
| `--hijau-tua` di atas `--hijau-muda` | ±8,2 : 1 | Boleh |
| `--biru-laut` di atas `--krem` | ±5,1 : 1 | Boleh (tautan, teks ≥ 16px) |
| `--terakota` di atas `--krem` | ±5,5 : 1 | Boleh |
| `--teks` di atas `--emas` | ±7 : 1 | Boleh (tombol emas memakai teks gelap) |
| **`--emas` di atas `--krem`** | ±2,2 : 1 | **DILARANG untuk teks.** Hanya garis/ornamen |
| `--putih` di atas `--emas` | rendah | **DILARANG** |
| `--hijau-tua` di atas `--emas` | ±4 : 1 | **Hindari** untuk teks kecil |

### 2.4 Teks di atas foto
- Wajib ada **lapisan gelap gradasi** (overlay) di bawah teks: dari `rgba(15, 35, 27, 0.75)` di bawah ke `rgba(15, 35, 27, 0.15)` di atas, atau seluruh gambar `rgba(15, 35, 27, 0.45)`.
- Teks di atas foto berwarna **putih** atau **krem**, ukuran minimum 18px untuk teks isi.
- Jangan menaruh teks di atas bagian foto yang ramai tanpa overlay.

---

## 3. Tipografi

| Peran | Font | Fallback | Catatan |
|---|---|---|---|
| Judul (display) | **Playfair Display** | `Georgia, serif` | Elegan, memberi nuansa klasik |
| Isi dan UI | **Inter** | `system-ui, -apple-system, Segoe UI, sans-serif` | Mudah dibaca di HP |

- Maksimal **2 keluarga font**. Muat via Google Fonts dengan `display=swap`, hanya bobot yang dipakai (Playfair 600/700, Inter 400/500/600).
- Jika font gagal dimuat, tampilan tetap rapi dengan fallback.

### 3.1 Skala ukuran (mobile → desktop)
| Gaya | HP | Desktop | Font | Bobot | Tinggi baris |
|---|---|---|---|---|---|
| H1 (Hero) | 36px | 56px | Playfair | 700 | 1,15 |
| H2 (judul bagian) | 28px | 36px | Playfair | 600 | 1,2 |
| H3 (judul kartu/subbagian) | 20px | 24px | Playfair | 600 | 1,3 |
| Isi | 16px | 17–18px | Inter | 400 | 1,6 |
| Keterangan kecil | 14px | 14px | Inter | 500 | 1,5 |
| Lencana / chip | 13–14px | 14px | Inter | 600 | 1 |

- Panjang baris paragraf: **maksimal ±70 karakter** (`max-w-prose`).
- Rata teks: kiri. Hindari teks rata kanan-kiri (justify).
- Teks isi tidak boleh di bawah 16px; keterangan kecil minimum 14px.

---

## 4. Tata Letak, Jarak, dan Bentuk

### 4.1 Titik patah (selaras SPEC.md F9)
| Nama | Lebar | Kolom kartu |
|---|---|---|
| HP | < 640px | 1 |
| Tablet | 640–1023px | 2 |
| Desktop | ≥ 1024px | 3 |

### 4.2 Wadah dan jarak
- Wadah konten: `max-w-6xl` (±1152px), rata tengah. Padding sisi: 16px (HP), 24px (tablet), 32px (desktop).
- Jarak antarbagian (vertikal): 56px (HP), 88px (desktop).
- Skala jarak: kelipatan 4px; yang sering dipakai 8, 12, 16, 24, 32, 48.
- Jarak antarkartu: 20px (HP), 24px (desktop).

### 4.3 Bentuk
| Elemen | Radius |
|---|---|
| Kartu | 16px (`rounded-2xl`) |
| Tombol | 9999px (pil) untuk tombol utama; 12px untuk tombol sekunder |
| Chip/lencana | 9999px |
| Kolom form | 12px |
| Gambar dalam kartu | 12px bagian atas |

### 4.4 Bayangan dan garis
- Kartu diam: bayangan sangat tipis `0 1px 2px rgba(30, 30, 30, 0.06)` + garis tipis `1px solid rgba(107, 74, 47, 0.15)`.
- Kartu hover: `0 8px 24px rgba(30, 30, 30, 0.10)`, naik 2–4px.
- Hindari bayangan tebal dan hitam pekat.

### 4.5 Ornamen (opsional, ringan)
- **Garis pemisah bagian**: garis tipis emas 2px, lebar 64px, di bawah judul H2 (aksen kecil).
- **Latar bagian tertentu**: pola garis geometris halus (opasitas ≤ 6%) di `--hijau-muda`, dibuat dengan CSS/SVG inline sederhana.
- Tidak ada ornamen yang dipakai untuk menyampaikan informasi.

---

## 5. Foto dan Gambar

| Penggunaan | Rasio | Catatan |
|---|---|---|
| Hero | 16:9 desktop, 4:5 atau 3:4 HP (crop) | Gunakan `object-cover`, titik fokus di subjek utama |
| Kartu destinasi | 4:3 | Seragam untuk semua kartu |
| Foto utama detail | 16:9 | Lebar penuh wadah |
| Galeri | 1:1 atau 4:3 | Grid, klik untuk memperbesar |

- **Gaya foto:** alami, cahaya hangat, manusia tampil hormat (bukan hanya objek), hindari filter berlebihan.
- **Teks alternatif (alt):** deskriptif dan singkat, contoh: *"Penari sedang tampil di panggung terbuka pada sore hari"*. Gambar dekoratif `alt=""`.
- **Kredit foto** selalu tampil di halaman detail (teks kecil, `--cokelat`).
- **Berat file:** idealnya < 300 KB per gambar (WebP/JPEG); `loading="lazy"` kecuali Hero; tetapkan `width`/`height`.
- **Gambar pengganti (placeholder):** blok `--hijau-muda` dengan ikon gambar sederhana dan teks "Foto belum tersedia" (jangan memakai foto stok acak yang menyesatkan).
- **Data contoh:** bila belum ada foto berlisensi, gunakan placeholder tersebut.

---

## 6. Ikon
- Gaya: garis tipis, sederhana, sudut membulat, ukuran 20–24px, warna mengikuti teks.
- Cara paling ringan: **SVG inline** buatan sendiri untuk ikon yang jarang (menu, tutup, panah, lokasi, kalender, cari).
- Jika ingin pustaka ikon (misalnya `lucide-react`), itu **paket tambahan**: ajukan dulu sesuai SPEC.md bagian 3.1 dan cek reputasinya.
- Ikon yang berdiri sendiri (tanpa teks) wajib punya `aria-label`.

---

## 7. Gerak dan Interaksi

| Interaksi | Perilaku | Durasi |
|---|---|---|
| Hover tombol | Warna sedikit lebih gelap, bayangan halus | 150ms |
| Hover kartu | Naik 2–4px, bayangan menguat, gambar zoom ≤ 1.04 | 250ms |
| Buka menu HP | Panel meluncur/memudar | 200ms |
| Perpindahan filter | Daftar diperbarui tanpa kedipan; boleh memudar halus | ≤ 200ms |
| Muncul saat gulir | Opsional, hanya fade-up ringan, **sekali saja** | ≤ 400ms |

- Easing: `ease-out`.
- **Wajib** menghormati `prefers-reduced-motion`: bila aktif, matikan zoom, gerak naik, dan animasi gulir (tetap fungsional tanpa gerak).
- Tidak ada animasi otomatis berulang, karusel otomatis, atau video latar.

### 7.1 Status interaktif (semua elemen yang bisa diklik)
| Status | Aturan |
|---|---|
| Normal | Sesuai gaya komponen |
| Hover | Perubahan warna/bayangan halus |
| **Fokus keyboard** | Garis fokus jelas: `outline: 3px solid #2F6F8F`, `outline-offset: 2px` (atau cincin emas + hijau tua); **tidak boleh dihilangkan** |
| Aktif/ditekan | Sedikit lebih gelap, skala 0,98 |
| Terpilih (chip filter) | Latar `--hijau-tua`, teks putih, ikon centang kecil (jangan hanya warna) |
| Nonaktif | Opasitas 50%, kursor `not-allowed`, `aria-disabled` |

---

## 8. Struktur Halaman (Hierarki Visual)

> Wireframe ASCII ada di SPEC.md bagian 8. Di sini ditetapkan **urutan, latar, dan perilaku responsif** tiap bagian.

### 8.1 Beranda
| Urutan | Bagian | Latar | Perilaku responsif |
|---|---|---|---|
| 1 | Navbar | `--hijau-tua`, teks putih | HP: hamburger |
| 2 | **Hero** | Foto + overlay | Tinggi 70vh (HP) / 80vh (desktop); teks rata kiri; chip kabupaten dalam satu baris yang bisa digeser horizontal di HP |
| 3 | Kategori seni | `--krem` | HP: chip bisa digeser; desktop: satu baris |
| 4 | Destinasi unggulan (3 kartu) | `--krem` | 1 / 2 / 3 kolom |
| 5 | Even terdekat (3 item) | `--hijau-muda` | Daftar vertikal; HP: tanggal di atas judul |
| 6 | Ajakan Etika Berkunjung | `--hijau-tua`, teks krem | Teks + tombol emas |
| 7 | Footer | `--hijau-tua` gelap (`#173A2B`) | HP: tumpuk satu kolom |

### 8.2 Daftar Destinasi
- Judul H1 + deskripsi singkat.
- **Panel filter** (pencarian, kabupaten, kategori, atur ulang): di HP dilipat dalam tombol **"Filter"** yang membuka panel; di desktop tampil terbuka di atas daftar.
- Penghitung hasil: teks `14px` `--cokelat`.
- Grid kartu 1/2/3 kolom. Empty state di tengah, tinggi minimum 240px.

### 8.3 Kalender Even
- Dikelompokkan per bulan (judul bulan H3 + garis emas tipis).
- Tiap item: kolom tanggal di kiri (angka besar + singkatan bulan), isi di kanan. HP: tanggal tampil di atas.
- Filter bulan/kategori/kabupaten sebagai **dropdown** (`select` asli agar mudah diakses).
- Sakelar "Tampilkan even yang sudah berlalu": komponen `checkbox` berlabel jelas.

### 8.4 Detail Destinasi
- Foto utama penuh lebar → judul + lencana → deskripsi → dua kartu informasi (Informasi, Lokasi) → galeri → even terkait → kredit foto.
- Desktop: deskripsi di kolom kiri (≈ 2/3), kartu Informasi/Lokasi di kolom kanan (≈ 1/3, menempel/*sticky*). HP: satu kolom, urutan sama.

### 8.5 Tentang
- Bagian Misi (teks + foto/ilustrasi opsional), bagian **Etika Berkunjung** (daftar bernomor besar, tiap poin berupa kartu ringan dengan ikon sederhana), bagian Kontak.

### 8.6 Masuk / Daftar
- Kartu form di tengah (lebar maksimum 440px) di atas latar `--hijau-muda`.
- **Spanduk "Fitur akun belum aktif"** di bagian atas kartu (warna info/biru muda).

### 8.7 404 dan "Tidak ditemukan"
- Pesan ramah, ikon sederhana, tombol "Kembali ke Beranda" dan "Lihat destinasi".

---

## 9. Spesifikasi Komponen

### 9.1 Navbar
- Tinggi 64px (HP), 72px (desktop). Latar `--hijau-tua`, **tetap menempel di atas** (sticky) dengan bayangan tipis saat halaman digulir.
- Kiri: nama **"Sundara Yatra"** (Playfair 600, putih; boleh diberi garis emas tipis di bawah huruf pertama sebagai aksen kecil, tidak wajib logo gambar).
- Tengah/kanan (desktop): tautan Beranda, Destinasi, Even, Tentang. Tautan aktif: garis bawah emas 2px.
- Kanan: tombol **Masuk** (garis putih, transparan) dan **Daftar** (emas, teks `--teks`).
- HP: tombol hamburger (44×44px) membuka panel penuh lebar; menutup dengan tombol, `Esc`, atau memilih tautan. `aria-expanded`, `aria-controls`, fokus berpindah ke panel saat dibuka.
- Sertakan tautan **"Lewati ke konten utama"** (skip link) yang muncul saat difokus.

### 9.2 Tombol
| Varian | Tampilan | Pemakaian |
|---|---|---|
| Utama | Latar `--hijau-tua`, teks putih, pil | Aksi utama ("Jelajahi", "Lihat detail") |
| Sorot | Latar `--emas`, teks `--teks`, pil | Aksi menonjol (di atas latar gelap, "Daftar") |
| Sekunder | Garis `--hijau-tua` 1,5px, teks `--hijau-tua`, transparan | Aksi pendukung ("Atur ulang filter") |
| Tautan | Teks `--biru-laut`, garis bawah | Navigasi kecil |
- Tinggi minimum 44px, padding horizontal 20–24px, teks 15–16px bobot 600.

### 9.3 Chip filter (kabupaten, kategori)
- Bentuk pil, tinggi 40–44px, garis `--cokelat` 20% opasitas, teks `--teks`.
- Terpilih: latar `--hijau-tua`, teks putih, ikon centang.
- Di HP: baris chip dapat digeser horizontal dengan `scroll-snap` dan **ada petunjuk visual** (chip terakhir terpotong sebagian atau bayangan tepi).
- Chip berperan sebagai tombol (`button`) dengan `aria-pressed`.

### 9.4 Kartu destinasi
```
┌─────────────────────────┐
│  FOTO 4:3 (radius atas) │
│  [badge: Data contoh]   │  ← pojok kiri atas, hanya jika dataContoh = true
├─────────────────────────┤
│ Nama Destinasi (H3)     │
│ 📍 Kabupaten            │  ← ikon lokasi + teks
│ [Tari] [Seni Rupa]      │  ← lencana kategori
│ Ringkasan 2 baris maks. │  ← dipotong dengan elipsis
│ [Lihat detail →]        │
└─────────────────────────┘
```
- Seluruh kartu dapat diklik (satu tautan utama), fokus terlihat jelas.
- Tinggi kartu seragam dalam satu baris (grid `items-stretch`).
- Ringkasan dibatasi 2–3 baris (`line-clamp`).

### 9.5 Item even
- Kolom tanggal: angka (Playfair 28px, `--hijau-tua`) + singkatan bulan (Inter 13px kapital, `--cokelat`).
- Isi: nama (H3 kecil), lokasi + kabupaten, lencana kategori, **lencana akses**.
- Even yang sudah berlalu: opasitas isi 70% + label "Telah berlalu" (teks, bukan hanya pudar).

### 9.6 Lencana akses
| Akses | Tampilan | Teks |
|---|---|---|
| `umum` | Latar `#DCEAF1`, teks `#1F4F68` | "Terbuka untuk umum" |
| `tiket` | Latar `#F3EAD0`, teks `#6B5314` | "Perlu tiket" |
| `sakral` | Latar `#F6E3DC`, teks `#7A2E1A` | "Upacara sakral" |
- Untuk `sakral`, tampilkan **catatan di bawah item** (kotak lembut, ikon info): *"Upacara sakral. Ikuti aturan dan arahan masyarakat setempat. Tidak semua bagian terbuka untuk wisatawan."*

### 9.7 Lencana "Data contoh"
- Latar `#FFF4D6`, teks `#6B5314`, garis putus-putus tipis, teks "Data contoh".
- Tampil di kartu, detail, dan item even selama `dataContoh = true`; **hilang otomatis** saat data diverifikasi.

### 9.8 Galeri
- Grid 2 kolom (HP) / 3–4 kolom (desktop), jarak 8–12px, radius 12px.
- Klik gambar membuka tampilan besar (modal sederhana): tombol tutup 44px, `Esc` menutup, fokus terkunci dalam modal dan kembali ke gambar asal saat ditutup, panah kiri/kanan bila lebih dari satu gambar. (Bila waktu mepet: cukup grid tanpa modal.)

### 9.9 Form (Masuk/Daftar)
- Label **selalu tampil** di atas kolom (bukan hanya placeholder).
- Kolom: tinggi 48px, garis `--cokelat` 40%, radius 12px; fokus: garis `--biru-laut` 2px + cincin fokus.
- Pesan kesalahan: teks `--terakota` 14px di bawah kolom, diawali ikon peringatan, `aria-describedby` dan `aria-invalid`.
- Tombol kirim lebar penuh di HP.
- Kolom sandi: tombol "Tampilkan/Sembunyikan" (opsional) berlabel jelas.
- Sesudah kirim valid: `Alert` informasi (bukan sukses palsu): "Fitur akun segera hadir. Data Anda tidak disimpan."

### 9.10 Alert / Spanduk
| Jenis | Latar | Teks | Ikon |
|---|---|---|---|
| Info | `#DCEAF1` | `#1F4F68` | info |
| Peringatan | `#FFF4D6` | `#6B5314` | segitiga |
| Kesalahan | `#F6E3DC` | `#7A2E1A` | silang |

### 9.11 Footer
- Latar `#173A2B`, teks krem. Tiga kolom (desktop): Tentang singkat, Tautan, Catatan ("Data contoh. Informasi sedang dilengkapi."). Garis emas tipis di atas footer.
- Hak cipta, kredit foto umum, dan tautan "Etika Berkunjung".

---

## 10. Status Antarmuka (Loading, Kosong, Kesalahan)

| Status | Tampilan | Teks (contoh) |
|---|---|---|
| **Loading** | Kerangka kartu (skeleton) abu-krem berdenyut halus (mati bila reduced-motion), `aria-busy="true"` | "Memuat destinasi…" (teks tersembunyi untuk pembaca layar) |
| **Kosong (filter)** | Ikon sederhana + judul + saran + tombol | Judul: "Tidak ada hasil". Isi: "Coba ubah kata kunci atau atur ulang filter." Tombol: "Atur ulang filter" |
| **Kosong (even)** | Sama | "Belum ada even pada filter ini." |
| **Kosong (even terkait)** | Teks ringan di dalam bagian | "Belum ada even terkait untuk destinasi ini." |
| **Kesalahan data** | Kartu `Alert` kesalahan + tombol | "Data tidak dapat dimuat. Silakan coba lagi." Tombol: "Coba lagi" |
| **Tidak ditemukan** | Halaman penuh ramah | "Destinasi tidak ditemukan." |
| **404** | Halaman penuh | "Halaman tidak ditemukan." |
| **Gambar gagal** | Placeholder 5 | "Foto belum tersedia" |
| **Informasi kosong** | Teks `--cokelat` miring | "Informasi belum tersedia" |

---

## 11. Gaya Bahasa (Microcopy)
- Bahasa Indonesia yang hangat, sopan, ringkas. Gunakan "Anda" (bukan "kamu") di antarmuka.
- Tagline Hero (usulan): *"Jelajahi seni, budaya, dan keindahan Bali."*
- Subjudul (usulan): *"Temukan destinasi dan pertunjukan yang hidup di setiap sudut pulau."*
- Tombol: kata kerja jelas ("Jelajahi", "Lihat detail", "Buka di Google Maps", "Atur ulang filter").
- Hindari klaim berlebihan ("terbaik", "satu-satunya") dan hindari menyebut hal budaya yang belum diverifikasi.
- Tanggal: "5 Desember 2026" (gunakan `Intl.DateTimeFormat('id-ID')`).

---

## 12. Aksesibilitas Visual (Ringkas, mengikat dengan SPEC.md bagian 11)
- Kontras sesuai tabel 2.3; **jangan memakai kombinasi yang dilarang**.
- Fokus keyboard selalu terlihat; urutan Tab mengikuti urutan visual.
- Area sentuh ≥ 44×44px.
- Informasi tidak hanya lewat warna (lencana selalu bertuliskan teks).
- Zoom hingga 200% tanpa kehilangan konten atau fungsi; tidak ada scroll horizontal di 360px (kecuali baris chip yang memang dirancang bisa digeser).
- `lang="id"` pada elemen `html`.
- Hormati `prefers-reduced-motion`.
- Judul berurutan (satu H1 per halaman).

---

## 13. Pemetaan ke Kode (Token Tailwind)

Definisikan token sebagai variabel CSS di `src/index.css` dan hubungkan ke Tailwind sesuai **dokumentasi resmi versi yang terpasang** (cara Tailwind v3 dan v4 berbeda; jangan menebak).

```css
:root {
  --hijau-tua: #1F4D3A;
  --hijau-gelap: #173A2B;
  --hijau-muda: #E4EFE7;
  --krem: #FAF6EE;
  --putih: #FFFFFF;
  --cokelat: #6B4A2F;
  --teks: #1E1E1E;
  --emas: #C9A24A;
  --biru-laut: #2F6F8F;
  --terakota: #A8452B;
}

body {
  background: var(--krem);
  color: var(--teks);
  font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif;
  line-height: 1.6;
}

h1, h2, h3 {
  font-family: 'Playfair Display', Georgia, serif;
}

:focus-visible {
  outline: 3px solid var(--biru-laut);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 14. Daftar Periksa Desain (Sebelum Dianggap Selesai)

Isi dengan **LULUS / GAGAL / BELUM DIUJI** berdasarkan pemeriksaan nyata.

| No | Pemeriksaan | Hasil |
|---|---|---|
| 1 | Warna dan font sesuai token (tidak ada warna sembarang) | |
| 2 | Tidak ada teks emas di atas krem/putih | |
| 3 | Teks di atas foto punya overlay dan terbaca | |
| 4 | Navbar berfungsi di HP (buka/tutup, `Esc`, fokus) | |
| 5 | Chip kabupaten/kategori bisa digeser di HP dan terlihat terpilih | |
| 6 | Kartu seragam tingginya, ringkasan terpotong rapi | |
| 7 | Lencana akses dan "Data contoh" tampil benar | |
| 8 | Catatan etika muncul pada even sakral | |
| 9 | Empty, loading, error, 404, gambar gagal tampil sesuai bagian 10 | |
| 10 | Tidak ada scroll horizontal di 360px | |
| 11 | Fokus keyboard terlihat di semua elemen interaktif | |
| 12 | Animasi mati saat `prefers-reduced-motion` | |
| 13 | Tidak ada simbol sakral dipakai sebagai hiasan | |
| 14 | Semua gambar punya `alt` dan kredit foto | |
| 15 | Kontras utama diperiksa dengan alat | |

---

## 15. Prompt Berpola S.P.E.C untuk Penerapan UI

> Lampirkan `#file:SPEC.md` dan `#file:UI-SPEC.md`. Satu prompt satu tugas. Setelah tiap prompt: jalankan, cek tampilan di HP dan laptop, baca `git diff`, commit.

### Prompt UI-1 — Fondasi desain
```
Baca #file:SPEC.md dan #file:UI-SPEC.md bagian 2, 3, 4, 13.
S: Terapkan token warna, font (Playfair Display + Inter dengan fallback), gaya fokus, dan aturan reduced-motion di src/index.css. Hubungkan token ke Tailwind sesuai dokumentasi resmi versi yang terpasang.
P: Semua halaman memakai warna dan tipografi yang sama; judul memakai Playfair, isi memakai Inter.
E: Jika font gagal dimuat, fallback tetap rapi.
C: Jangan memakai warna di luar palet; jangan pakai teks emas di atas krem/putih; tanpa paket baru; jelaskan perubahan dalam bahasa Indonesia.
```

### Prompt UI-2 — Navbar dan Footer
```
Ikuti #file:UI-SPEC.md bagian 9.1, 9.2, 9.11 dan #file:SPEC.md F1.
S: Kerjakan HANYA Navbar, Button, dan Footer.
P: Navbar menempel di atas, menu hamburger di HP, skip link, tombol Masuk/Daftar, tautan aktif bergaris emas.
E: Menu HP menutup dengan Esc dan saat tautan dipilih.
C: Aksesibel (aria-expanded, fokus terlihat, area sentuh ≥ 44px); tanpa paket baru.
```

### Prompt UI-3 — Hero, chip, kartu
```
Ikuti #file:UI-SPEC.md bagian 5, 8.1, 9.3, 9.4, 9.7 dan #file:SPEC.md F2, F3, F4.
S: Kerjakan Hero, FilterChip, DestinasiCard, dan Badge saja.
P: Hero dengan overlay gelap, chip bisa digeser di HP, kartu 4:3 dengan lencana kategori dan "Data contoh".
E: Gambar gagal → placeholder; ringkasan panjang dipotong 2 baris.
C: Teks di atas foto wajib ada overlay; tidak memakai simbol sakral sebagai hiasan; tanpa paket baru.
```

### Prompt UI-4 — Even, detail, form
```
Ikuti #file:UI-SPEC.md bagian 8.3, 8.4, 9.5, 9.6, 9.8, 9.9, 9.10.
S: Kerjakan EvenItem, lencana akses, galeri, tata letak detail, dan form Masuk/Daftar.
P: Even sakral menampilkan catatan etika; galeri berupa grid (modal bila waktu cukup); form dengan label, pesan error per kolom, dan Alert "Fitur akun segera hadir".
E: Field kosong → "Informasi belum tersedia"; error form jelas dan fokus pindah ke kolom bermasalah.
C: Tidak menyimpan/mengirim data form; tautan eksternal rel="noopener noreferrer"; tanpa paket baru.
```

### Prompt UI-5 — Status dan penyempurnaan
```
Ikuti #file:UI-SPEC.md bagian 10, 12, 14.
S: Terapkan LoadingState (skeleton), EmptyState, ErrorState, halaman 404/"Tidak ditemukan" sesuai teks bagian 10, lalu periksa daftar bagian 14.
P: Semua status tampil konsisten dan ramah.
E: Laporkan temuan dulu (masalah, penyebab, usulan), TUNGGU persetujuan sebelum mengubah.
C: Perubahan minimal; laporkan hasil pemeriksaan apa adanya (LULUS/GAGAL/BELUM DIUJI).
```

---

## 16. Catatan Penting
- **Waktu terbatas (±2 jam):** prioritaskan token warna/font, Navbar, Hero, kartu, dan status kosong. Galeri bermodal, animasi gulir, dan ornamen pola adalah **opsional**.
- **Nilai kontras** pada dokumen ini perkiraan; verifikasi dengan alat sebelum klaim "aksesibel".
- **Isi budaya** (Etika Berkunjung, catatan sakral, makna nama) harus diverifikasi ke sumber atau tokoh yang berwenang.
- **Foto:** pakai milik sendiri atau berlisensi bebas; catat sumbernya.
