import { useEffect } from "react";
import Container from "../components/layout/Container";
import Button from "../components/ui/Button";
import { setPageMetadata } from "../lib/pageMetadata";

export default function NotFound() {
  useEffect(() => {
    setPageMetadata(
      "404 | Halaman Tidak Ditemukan",
      "Halaman yang Anda cari tidak ditemukan di Sundara Yatra.",
    );
  }, []);

  return (
    <main className="not-found-page">
      <Container className="not-found-content">
        <p className="not-found-code" aria-hidden="true">404</p>
        <h1>Halaman tidak ditemukan</h1>
        <p>Alamat yang Anda buka tidak tersedia atau sudah berpindah.</p>
        <Button to="/" variant="primary">Kembali ke Beranda</Button>
      </Container>
    </main>
  );
}
