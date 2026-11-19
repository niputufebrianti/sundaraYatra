import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router";
import Container from "./Container";
import Button from "../ui/Button";

const navigation = [
  { to: "/", label: "Beranda", end: true },
  { to: "/destinasi", label: "Destinasi" },
  { to: "/even", label: "Even" },
  { to: "/tentang", label: "Tentang" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [menuOpen]);

  return (
    <header className="navbar">
      <Container className="navbar-inner">
        <NavLink className="navbar-brand" to="/" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark" aria-hidden="true">SY</span>
          <span>Sundara Yatra</span>
        </NavLink>

        <button
          ref={menuButtonRef}
          className="menu-button"
          type="button"
          aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={menuOpen}
          aria-controls="navbar-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span aria-hidden="true">{menuOpen ? "×" : "☰"}</span>
        </button>

        <nav
          id="navbar-menu"
          className={`navbar-menu ${menuOpen ? "navbar-menu-open" : ""}`}
          aria-label="Navigasi utama"
        >
          <div className="navbar-links">
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
          <div className="navbar-actions">
            <Button to="/masuk" variant="secondary" onClick={() => setMenuOpen(false)}>
              Masuk
            </Button>
            <Button to="/daftar" variant="gold" onClick={() => setMenuOpen(false)}>
              Daftar
            </Button>
          </div>
        </nav>
      </Container>
    </header>
  );
}
