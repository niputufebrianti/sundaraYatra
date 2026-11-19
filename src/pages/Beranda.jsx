import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Container from "../components/layout/Container";
import Button from "../components/ui/Button";
import DestinasiCard from "../components/destinasi/DestinasiCard";
import EvenItem from "../components/even/EvenItem";
import FilterChip from "../components/filter/FilterChip";
import EmptyState from "../components/ui/EmptyState";
import LoadingState from "../components/ui/LoadingState";
import ErrorState from "../components/ui/ErrorState";
import { loadData } from "../lib/data";

const kabupaten = [
  "Badung",
  "Bangli",
  "Buleleng",
  "Gianyar",
  "Jembrana",
  "Karangasem",
  "Klungkung",
  "Tabanan",
  "Denpasar",
];

const kategori = ["Tari", "Musik", "Seni Rupa", "Kriya", "Festival"];

export default function Beranda() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] = useState("");

  useEffect(() => {
    document.title = "Beranda | Sundara Yatra";

    loadData()
      .then(setData)
      .catch((loadError) => setError(loadError.message));
  }, []);

  const openKabupaten = (value) => {
    navigate(`/destinasi?kabupaten=${encodeURIComponent(value)}`);
  };

  const displayedDestinasi = data
    ? data.destinasi
        .filter((item) =>
          activeCategory ? item.kategori.includes(activeCategory) : true,
        )
        .slice(0, 3)
    : [];

  const nearbyEvents = data
    ? [...data.even]
        .filter((item) => /^\d{4}-\d{2}-\d{2}$/.test(item.tanggalMulai))
        .sort((a, b) => a.tanggalMulai.localeCompare(b.tanggalMulai))
        .slice(0, 3)
    : [];

  return (
    <main>
      <section className="hero" aria-labelledby="hero-title">
        <Container className="hero-inner">
          <h1 id="hero-title">Sundara Yatra</h1>
          <p>Jelajahi seni, budaya, dan keindahan Bali</p>
          <Button to="/destinasi" variant="gold">Jelajahi</Button>
          <div className="hero-regions" aria-label="Pilih kabupaten">
            {kabupaten.map((name) => (
              <FilterChip
                key={name}
                label={name}
                onClick={() => openKabupaten(name)}
              />
            ))}
          </div>
        </Container>
      </section>

      <section className="category-section" aria-labelledby="category-title">
        <Container>
          <h2 id="category-title">Kategori Seni</h2>
          <div className="chip-row">
            <FilterChip
              label="Semua"
              aktif={!activeCategory}
              onClick={() => setActiveCategory("")}
            />
            {kategori.map((name) => (
              <FilterChip
                key={name}
                label={name}
                aktif={activeCategory === name}
                onClick={() => setActiveCategory(name)}
              />
            ))}
          </div>
        </Container>
      </section>

      <section className="home-section" aria-labelledby="destination-title">
        <Container>
          <div className="section-heading">
            <h2 id="destination-title">Destinasi Unggulan</h2>
            <Button to="/destinasi" variant="secondary">Lihat semua →</Button>
          </div>
          {error && <ErrorState pesan={error} />}
          {!error && !data && <LoadingState />}
          {!error && data && displayedDestinasi.length === 0 && (
            <EmptyState judul="Tidak ada destinasi" pesan="Coba kategori seni lainnya." />
          )}
          {!error && data && displayedDestinasi.length > 0 && (
            <div className="destination-grid">
              {displayedDestinasi.map((item) => (
                <DestinasiCard key={item.id} destinasi={item} />
              ))}
            </div>
          )}
        </Container>
      </section>

      <section className="events-section" aria-labelledby="events-title">
        <Container>
          <div className="section-heading">
            <h2 id="events-title">Even Terdekat</h2>
            <Button to="/even" variant="secondary">Lihat kalender →</Button>
          </div>
          {nearbyEvents.length > 0 ? (
            <div className="event-list">
              {nearbyEvents.map((item) => (
                <EvenItem key={item.id} even={item} />
              ))}
            </div>
          ) : (
            <EmptyState judul="Belum ada even" pesan="Informasi even akan dilengkapi." />
          )}
        </Container>
      </section>

      <section className="ethics-callout" aria-labelledby="ethics-title">
        <Container className="ethics-inner">
          <div>
            <h2 id="ethics-title">Hormati budaya, nikmati perjalanan</h2>
            <p>Kenali aturan setempat agar kunjungan tetap bijak dan menghormati masyarakat.</p>
          </div>
          <Button to="/tentang" variant="gold">Etika Berkunjung →</Button>
        </Container>
      </section>
    </main>
  );
}
