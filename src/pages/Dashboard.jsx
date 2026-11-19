import { useEffect, useState } from "react";
import Container from "../components/layout/Container";
import Alert from "../components/ui/Alert";
import Button from "../components/ui/Button";
import DataNotice from "../components/ui/DataNotice";
import EmptyState from "../components/ui/EmptyState";
import ErrorState from "../components/ui/ErrorState";
import LoadingState from "../components/ui/LoadingState";
import DestinasiForm from "../components/dashboard/DestinasiForm";
import DestinasiTable from "../components/dashboard/DestinasiTable";
import { createDestinationId } from "../lib/validasi";
import { loadData } from "../lib/data";
import { resetDemoData, saveDemoData } from "../lib/storage";
import { setPageMetadata } from "../lib/pageMetadata";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loadError, setLoadError] = useState("");
  const [saveError, setSaveError] = useState("");
  const [notice, setNotice] = useState("");
  const [editing, setEditing] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    setPageMetadata(
      "Dashboard Demo | Sundara Yatra",
      "Kelola data destinasi lokal untuk demonstrasi. Perubahan hanya tersimpan di browser ini.",
    );
    setLoadError("");
    loadData()
      .then(setData)
      .catch((error) => setLoadError(error.message));
  }, [reloadKey]);

  const openNewForm = () => {
    setEditing(null);
    setSaveError("");
    setNotice("");
    setFormOpen(true);
  };

  const openEditForm = (destination) => {
    setEditing(destination);
    setSaveError("");
    setNotice("");
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditing(null);
    setSaveError("");
  };

  const handleSave = (values) => {
    if (!data) return;

    const existing = editing
      ? data.destinasi.find((item) => item.id === editing.id)
      : null;
    const id = existing
      ? existing.id
      : createDestinationId(
          values.nama,
          new Set(data.destinasi.map((item) => item.id)),
        );
    const destination = {
      ...existing,
      ...values,
      id,
      gambar: values.gambar,
      galeri: [values.gambar],
      alamat: existing?.alamat || null,
      jamKunjung: existing?.jamKunjung || null,
      tiket: existing?.tiket || null,
      fasilitas: existing?.fasilitas || [],
      dataContoh: existing?.dataContoh ?? true,
    };
    const nextData = {
      destinasi: existing
        ? data.destinasi.map((item) => item.id === id ? destination : item)
        : [...data.destinasi, destination],
      even: data.even,
    };

    try {
      saveDemoData(nextData);
      setData(nextData);
      setFormOpen(false);
      setEditing(null);
      setSaveError("");
      setNotice(existing
        ? "Perubahan tersimpan di browser ini."
        : "Destinasi ditambahkan di browser ini.");
    } catch (error) {
      setSaveError(error.message);
    }
  };

  const handleDelete = (destination) => {
    if (!data) return;
    const confirmed = window.confirm(
      `Hapus destinasi ${destination.nama}? Tindakan ini tidak dapat dibatalkan di browser ini.`,
    );
    if (!confirmed) return;

    const nextData = {
      destinasi: data.destinasi.filter((item) => item.id !== destination.id),
      even: data.even.map((item) =>
        item.destinasiId === destination.id
          ? { ...item, destinasiId: null }
          : item,
      ),
    };

    try {
      saveDemoData(nextData);
      setData(nextData);
      setNotice(`Destinasi "${destination.nama}" dihapus dari browser ini.`);
      setSaveError("");
      if (editing?.id === destination.id) closeForm();
    } catch (error) {
      setSaveError(error.message);
    }
  };

  const handleReset = () => {
    const confirmed = window.confirm(
      "Kembalikan data awal? Semua perubahan demo di browser ini akan dihapus.",
    );
    if (!confirmed) return;

    try {
      resetDemoData();
      setFormOpen(false);
      setEditing(null);
      setSaveError("");
      setNotice("Data awal dipulihkan.");
      setReloadKey((key) => key + 1);
    } catch (error) {
      setSaveError(error.message);
    }
  };

  return (
    <main className="dashboard-page">
      <Container>
        <header className="page-heading dashboard-heading">
          <h1>Dashboard Demo</h1>
          <p>Kelola destinasi untuk demonstrasi di browser ini.</p>
        </header>

        <Alert jenis="warning">
          Mode demo: perubahan hanya tersimpan di browser ini.
        </Alert>
        {data && <DataNotice warning={data.warning} />}
        {notice && <Alert jenis="success">{notice}</Alert>}
        {saveError && !formOpen && <Alert jenis="error">{saveError}</Alert>}

        <div className="dashboard-toolbar">
          <Button variant="primary" onClick={openNewForm}>
            Tambah destinasi
          </Button>
          <Button variant="secondary" onClick={handleReset}>
            Kembalikan data awal
          </Button>
        </div>

        {formOpen && (
          <DestinasiForm
            key={editing?.id || "new"}
            destination={editing}
            onSave={handleSave}
            onCancel={closeForm}
            saveError={saveError}
          />
        )}

        {loadError && (
          <ErrorState
            pesan={loadError}
            onRetry={() => setReloadKey((key) => key + 1)}
          />
        )}
        {!loadError && !data && <LoadingState pesan="Memuat data demo..." />}
        {!loadError && data && data.destinasi.length === 0 && !formOpen && (
          <EmptyState
            judul="Belum ada destinasi"
            pesan="Tambahkan destinasi untuk mulai mencoba dashboard demo."
            aksi={<Button onClick={openNewForm}>Tambah destinasi</Button>}
          />
        )}
        {!loadError && data && data.destinasi.length > 0 && (
          <DestinasiTable
            destinations={data.destinasi}
            onEdit={openEditForm}
            onDelete={handleDelete}
          />
        )}
      </Container>
    </main>
  );
}
