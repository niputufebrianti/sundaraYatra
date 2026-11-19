import { Link, Route, Routes } from "react-router";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Beranda from "./pages/Beranda";
import Destinasi from "./pages/Destinasi";

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
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Lewati ke konten utama</a>
      <Navbar />
      <div id="main-content">
        <Routes>
          <Route path="/" element={<Beranda />} />
          <Route path="/destinasi" element={<Destinasi />} />
          <Route path="/destinasi/:id" element={<PlaceholderPage />} />
          <Route path="/even" element={<PlaceholderPage />} />
          <Route path="/tentang" element={<PlaceholderPage />} />
          <Route path="/masuk" element={<PlaceholderPage />} />
          <Route path="/daftar" element={<PlaceholderPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
