export default function DestinasiTable({ destinations, onEdit, onDelete }) {
  return (
    <div className="dashboard-table-wrap" role="region" aria-label="Daftar destinasi demo" tabIndex={0}>
      <table className="dashboard-table">
        <thead>
          <tr>
            <th scope="col">Nama</th>
            <th scope="col">Kabupaten</th>
            <th scope="col">Kategori</th>
            <th scope="col">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {destinations.map((destination) => (
            <tr key={destination.id}>
              <th scope="row">{destination.nama}</th>
              <td>{destination.kabupaten}</td>
              <td>{destination.kategori.join(", ")}</td>
              <td className="table-actions">
                <button
                  type="button"
                  className="button button-secondary"
                  onClick={() => onEdit(destination)}
                  aria-label={`Ubah ${destination.nama}`}
                >
                  Ubah
                </button>
                <button
                  type="button"
                  className="button button-secondary"
                  onClick={() => onDelete(destination)}
                  aria-label={`Hapus ${destination.nama}`}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
