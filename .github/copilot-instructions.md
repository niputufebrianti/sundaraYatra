# Instruksi untuk Copilot — Sundara Yatra

Kamu membantu membangun **Sundara Yatra**, website wisata seni dan budaya Bali (MVP front-end, tanpa backend).
**Selalu baca `SPEC.md` di akar proyek sebelum bekerja.** Jika instruksi ini bertentangan dengan permintaan di chat, tanyakan dulu.

## Bahasa
- Jawab, jelaskan, dan beri laporan dalam **bahasa Indonesia** yang sederhana.
- Teks antarmuka situs berbahasa Indonesia.
- Komentar kode singkat dalam bahasa Indonesia; nama variabel/fungsi/file konsisten (Inggris).

## Stack
- Vite + React + Tailwind CSS + React Router. Data dari `src/data/data.json`.
- Jangan memasang paket lain tanpa menyebut nama, fungsi, dan alasan, lalu menunggu persetujuan.
- Cek dokumentasi resmi untuk cara instalasi dan sintaks sesuai versi terpasang; jangan mengandalkan ingatan.

## Cara bekerja
1. Kerjakan **satu tugas dalam satu waktu**, sesuai prompt di SPEC.md bagian 17.
2. Sebelum mengubah file: sebutkan file yang akan dibuat/diubah dan alasannya.
3. Ubah seminimal mungkin. Jangan menulis ulang file/komponen yang sudah benar. Jangan menyentuh file yang tidak terkait.
4. Jika ada bug: reproduksi → cari akar masalah → usulkan perbaikan minimal → tunggu persetujuan → uji.
5. Setelah selesai: ringkas file yang berubah dan cara mengujinya. Laporkan hasil uji **apa adanya** (LULUS/GAGAL/BELUM DIUJI). Jangan mengklaim sudah diuji jika belum dijalankan.

## Larangan
- Jangan menambah fitur di luar SPEC.md bagian 2.1.
- Jangan mengarang data (alamat, koordinat, harga, jam, jadwal even, fakta budaya). Tandai `dataContoh: true`.
- Jangan memakai foto/aset tanpa lisensi jelas; catat sumber di `kreditFoto`.
- Jangan membuat login palsu; Masuk/Daftar hanya tampilan, tanpa menyimpan atau mengirim data.
- Jangan menyatakan fitur "aman", "SEO-friendly", atau "accessible" tanpa pemeriksaan nyata.
- Jangan menjalankan perintah destruktif (`rm -rf`, `git reset --hard`, `git push --force`) atau menghapus file tanpa persetujuan.

## Keamanan
- Tidak ada rahasia/API key di kode atau repositori. Gunakan `.env` (di `.gitignore`).
- Jangan memakai `dangerouslySetInnerHTML`, `innerHTML`, atau `eval`.
- Validasi `mapsUrl` (hanya `https`, host Google Maps yang diizinkan). Tautan eksternal: `target="_blank"` + `rel="noopener noreferrer"`.
- Anggap parameter URL dan input pengguna tidak tepercaya; validasi terhadap daftar nilai yang diizinkan.
- Jangan `console.log` kata sandi atau data sensitif.

## Kualitas
- Mobile-first, tanpa scroll horizontal di 360px, area sentuh ≥ 44px.
- Wajib ada: empty state, loading state, error state, halaman 404, fallback gambar.
- HTML semantik, `alt` pada gambar, label pada form, fokus keyboard terlihat, hormati `prefers-reduced-motion`.
- Logika (filter, tanggal, validasi, url) di `src/lib/`, bukan di dalam komponen. Komponen dipakai ulang, hindari duplikasi.

## Git
Sebelum commit: `git status` dan `git diff`; pastikan tidak ada rahasia. Commit kecil dan deskriptif (`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`).
