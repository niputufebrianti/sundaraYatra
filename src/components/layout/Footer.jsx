import { Link } from "react-router";
import Container from "./Container";

export default function Footer() {
  return (
    <footer className="footer">
      <Container className="footer-inner">
        <div>
          <strong>Sundara Yatra</strong>
          <p>Perjalanan seni, budaya, dan keindahan Bali.</p>
        </div>
        <nav className="footer-links" aria-label="Navigasi footer">
          <Link to="/">Beranda</Link>
          <Link to="/destinasi">Destinasi</Link>
          <Link to="/even">Even</Link>
          <Link to="/tentang">Tentang</Link>
          <Link to="/dashboard">Dashboard demo</Link>
        </nav>
        <p className="footer-note">
          © {new Date().getFullYear()} Sundara Yatra · Data contoh, informasi sedang dilengkapi
        </p>
      </Container>
    </footer>
  );
}
