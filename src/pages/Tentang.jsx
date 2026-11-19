import { useEffect } from "react";
import Container from "../components/layout/Container";
import Card from "../components/ui/Card";
import { setPageMetadata } from "../lib/pageMetadata";

const ethics = [
  "Berpakaian sopan dan sesuai aturan saat memasuki area pura atau tempat upacara.",
  "Jangan memasuki area yang ditandai terbatas atau dilarang oleh masyarakat setempat.",
  "Minta izin sebelum memotret orang atau bagian upacara yang sedang berlangsung.",
  "Jangan menyentuh, memindahkan, atau mengganggu sesajen dan perlengkapan upacara.",
  "Jagalah ketenangan, hindari percakapan keras, dan ikuti arahan petugas.",
  "Hormati arahan pemangku, pecalang, pengelola, dan masyarakat setempat.",
];

export default function Tentang() {
  useEffect(() => {
    setPageMetadata(
      "Tentang & Etika Berkunjung | Sundara Yatra",
      "Kenali Sundara Yatra dan panduan etika berkunjung ke tempat seni dan budaya Bali.",
    );
  }, []);

  return (
    <main className="about-page">
      <Container>
        <header className="page-heading">
          <h1>Tentang Sundara Yatra</h1>
          <p>Perjalanan yang menghubungkan seni, budaya, dan penghormatan.</p>
        </header>

        <section className="about-grid" aria-labelledby="mission-title">
          <Card className="about-card">
            <h2 id="mission-title">Misi kami</h2>
            <p>
              Membantu pengunjung menjelajahi destinasi seni dan budaya Bali
              dengan informasi yang mudah dipahami dan bijak.
            </p>
            <ul>
              <li>Mengutamakan rasa hormat pada masyarakat setempat.</li>
              <li>Menghubungkan destinasi dengan informasi even.</li>
              <li>Menyajikan data secara jujur dan memberi tanda data contoh.</li>
            </ul>
          </Card>

          <Card className="about-card">
            <h2>Siapa di balik proyek</h2>
            <p>
              Sundara Yatra adalah prototipe front-end untuk praktik pengembangan
              situs wisata seni dan budaya Bali.
            </p>
            <p>
              Kontak resmi: <strong>segera hadir</strong>
            </p>
          </Card>
        </section>

        <section className="ethics-section" aria-labelledby="ethics-title">
          <h2 id="ethics-title">Etika Berkunjung</h2>
          <p className="ethics-disclaimer">
            Isi etika berikut masih perlu diverifikasi dengan sumber resmi atau
            tokoh setempat sebelum dipublikasikan secara luas.
          </p>
          <ol className="ethics-list">
            {ethics.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </section>
      </Container>
    </main>
  );
}
