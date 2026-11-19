import { Link } from "react-router";
import Badge from "../ui/Badge";
import Card from "../ui/Card";

export default function DestinasiCard({ destinasi }) {
  return (
    <Card className="destination-card">
      <Link
        className="destination-card-link"
        to={`/destinasi/${destinasi.id}`}
        aria-label={`Lihat detail ${destinasi.nama}`}
      >
        <div className="destination-card-image">
          <img
            src={destinasi.gambar || "/images/photo-placeholder.svg"}
            alt={`Ilustrasi ${destinasi.nama}`}
            width="800"
            height="600"
            loading="lazy"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = "/images/photo-placeholder.svg";
              event.currentTarget.alt = "Foto belum tersedia";
            }}
          />
        </div>
        <div className="destination-card-body">
          <div className="badge-row">
            <Badge variant={destinasi.kabupaten}>{destinasi.kabupaten}</Badge>
            {destinasi.kategori.map((kategori) => (
              <Badge key={kategori} variant={kategori}>{kategori}</Badge>
            ))}
            {destinasi.dataContoh && <Badge variant="data">Data contoh</Badge>}
          </div>
          <h3>{destinasi.nama}</h3>
          <p>{destinasi.ringkasan}</p>
          <span className="card-action">Lihat detail →</span>
        </div>
      </Link>
    </Card>
  );
}
