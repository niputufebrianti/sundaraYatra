import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import Container from "../components/layout/Container";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import Card from "../components/ui/Card";
import GaleriFoto from "../components/destinasi/GaleriFoto";
import EmptyState from "../components/ui/EmptyState";
import LoadingState from "../components/ui/LoadingState";
import ErrorState from "../components/ui/ErrorState";
import EvenItem from "../components/even/EvenItem";
import { loadData } from "../lib/data";
import { getValidMapsUrl } from "../lib/url";
import { formatTanggal } from "../lib/tanggal";
import { setPageMetadata } from "../lib/pageMetadata";
import WhatsAppContactButton from "../components/ui/WhatsAppContactButton";
import DataNotice from "../components/ui/DataNotice";

export default function DetailDestinasi() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    setError("");

    loadData()
      .then(setData)
      .catch((loadError) => setError(loadError.message));
  }, [reloadKey]);

  const destination = data?.destinasi.find((item) => item.id === id);

  useEffect(() => {
    if (destination) {
      setPageMetadata(
        `${destination.nama} | Sundara Yatra`,
        `${destination.ringkasan} Informasi destinasi seni dan budaya di Bali.`,
      );
    } else if (data) {
      setPageMetadata(
        "Destinasi tidak ditemukan | Sundara Yatra",
        "Destinasi yang Anda cari tidak tersedia.",
      );
    }
  }, [data, destination]);

  if (error) {
    return (
      <main>
        <Container>
          <ErrorState
            pesan={error}
            onRetry={() => setReloadKey((key) => key + 1)}
          />
        </Container>
      </main>
    );
  }

  if (!data) {
    return (
      <main>
        <Container>
          <LoadingState pesan="Memuat detail destinasi..." />
        </Container>
      </main>
    );
  }

  if (!destination) {
    return (
      <main>
        <Container>
          <EmptyState
            judul="Destinasi tidak ditemukan"
            pesan="Destinasi yang Anda cari tidak tersedia."
            aksi={
              <Button to="/destinasi" variant="secondary">
                Kembali ke daftar
              </Button>
            }
          />
        </Container>
      </main>
    );
  }

  const mapsUrl = getValidMapsUrl(destination.mapsUrl);
  const relatedEvents = data.even
    .filter((item) => item.destinasiId === destination.id)
    .sort((a, b) => a.tanggalMulai.localeCompare(b.tanggalMulai));

  const information = [
    ["Jam kunjung", destination.jamKunjung],
    ["Tiket", destination.tiket],
  ];

  return (
    <main className="destination-detail">
      <Container>
        <Link className="back-link" to="/destinasi">
          ← Kembali ke daftar
        </Link>

        <section className="detail-hero" aria-labelledby="detail-title">
          <img
            className="detail-main-image"
            src={destination.gambar || "/images/photo-placeholder.svg"}
            alt={`Ilustrasi ${destination.nama}`}
            width="1200"
            height="675"
            loading="eager"
            fetchPriority="high"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = "/images/photo-placeholder.svg";
              event.currentTarget.alt = "Foto belum tersedia";
            }}
          />
          <div className="detail-heading">
            <h1 id="detail-title">{destination.nama}</h1>
            <div className="badge-row">
              <Badge variant={destination.kabupaten}>{destination.kabupaten}</Badge>
              {destination.kategori.map((kategori) => (
                <Badge key={kategori} variant={kategori}>{kategori}</Badge>
              ))}
              {destination.dataContoh && <Badge variant="data">Data contoh</Badge>}
            </div>
          </div>
        </section>

        <DataNotice warning={data.warning} />
        <p className="detail-description">{destination.deskripsi}</p>

        <div className="detail-info-grid">
          <Card className="detail-info-card">
            <h2>Informasi kunjungan</h2>
            <dl>
              {information.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value || "Informasi belum tersedia"}</dd>
                </div>
              ))}
              <div>
                <dt>Fasilitas</dt>
                <dd>
                  {destination.fasilitas?.length
                    ? destination.fasilitas.join(", ")
                    : "Informasi belum tersedia"}
                </dd>
              </div>
            </dl>
          </Card>

          <Card className="detail-info-card">
            <h2>Lokasi</h2>
            <p>
              <strong>Alamat</strong>
              <br />
              {destination.alamat || "Informasi belum tersedia"}
            </p>
            {mapsUrl && (
              <a
                className="button button-primary"
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Buka di Google Maps
              </a>
            )}
            {!mapsUrl && (
              <p className="maps-unavailable">Tautan Google Maps belum tersedia.</p>
            )}
            <WhatsAppContactButton
              phoneNumber={destination.whatsapp}
              itemName={destination.nama}
            />
          </Card>
        </div>

        <GaleriFoto gambar={destination.galeri} nama={destination.nama} />

        <section className="related-events" aria-labelledby="related-events-title">
          <h2 id="related-events-title">Even terkait</h2>
          {relatedEvents.length === 0 ? (
            <EmptyState
              judul="Belum ada even terkait"
              pesan="Informasi even untuk destinasi ini akan dilengkapi."
            />
          ) : (
            <div className="event-list">
              {relatedEvents.map((even) => (
                <EvenItem key={even.id} even={even} />
              ))}
            </div>
          )}
        </section>

        <p className="photo-credit">
          <strong>Kredit foto:</strong> {destination.kreditFoto || "Belum tersedia"}
        </p>
      </Container>
    </main>
  );
}
