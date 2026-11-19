import { Route, Routes } from "react-router";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Beranda from "./pages/Beranda";
import Destinasi from "./pages/Destinasi";
import DetailDestinasi from "./pages/DetailDestinasi";
import Even from "./pages/Even";
import Tentang from "./pages/Tentang";
import Masuk from "./pages/Masuk";
import Daftar from "./pages/Daftar";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Lewati ke konten utama</a>
      <Navbar />
      <div id="main-content">
        <Routes>
          <Route path="/" element={<Beranda />} />
          <Route path="/destinasi" element={<Destinasi />} />
          <Route path="/destinasi/:id" element={<DetailDestinasi />} />
          <Route path="/even" element={<Even />} />
          <Route path="/tentang" element={<Tentang />} />
          <Route path="/masuk" element={<Masuk />} />
          <Route path="/daftar" element={<Daftar />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
