import { Link, Route, Routes } from "react-router";

function PlaceholderPage() {
  return (
    <main>
      <h1>Sundara Yatra</h1>
      <p>Persiapan proyek selesai. Halaman fitur belum dibuat.</p>
    </main>
  );
}

function NotFound() {
  return (
    <main>
      <h1>Halaman tidak ditemukan</h1>
      <Link to="/">Kembali ke Beranda</Link>
    </main>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PlaceholderPage />} />
      <Route path="/destinasi" element={<PlaceholderPage />} />
      <Route path="/destinasi/:id" element={<PlaceholderPage />} />
      <Route path="/even" element={<PlaceholderPage />} />
      <Route path="/tentang" element={<PlaceholderPage />} />
      <Route path="/masuk" element={<PlaceholderPage />} />
      <Route path="/daftar" element={<PlaceholderPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
