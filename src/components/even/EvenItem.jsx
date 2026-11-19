import Badge from "../ui/Badge";
import Card from "../ui/Card";
import { formatTanggal } from "../../lib/tanggal";

export default function EvenItem({ even }) {
  return (
    <Card className="event-item" as="article">
      <time dateTime={even.tanggalMulai}>
        {formatTanggal(even.tanggalMulai)}
      </time>
      <div>
        <h3>{even.nama}</h3>
        <p>{even.lokasi} · {even.kabupaten}</p>
        {even.akses === "sakral" && (
          <p className="sacred-note">
            Upacara sakral. Ikuti aturan dan arahan masyarakat setempat.
          </p>
        )}
      </div>
      <Badge variant={even.akses}>{even.akses}</Badge>
      {even.dataContoh && <Badge variant="data">Data contoh</Badge>}
    </Card>
  );
}
