import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import Container from "../components/layout/Container";
import Button from "../components/ui/Button";
import EvenItem from "../components/even/EvenItem";
import FilterBulan from "../components/filter/FilterBulan";
import FilterKabupaten from "../components/filter/FilterKabupaten";
import FilterKategori from "../components/filter/FilterKategori";
import EmptyState from "../components/ui/EmptyState";
import LoadingState from "../components/ui/LoadingState";
import ErrorState from "../components/ui/ErrorState";
import { loadData } from "../lib/data";
import { isKabupatenValid, isKategoriValid } from "../lib/filter";
import { isEvenTelahBerakhir, parseTanggal } from "../lib/tanggal";
import { setPageMetadata } from "../lib/pageMetadata";
import DataNotice from "../components/ui/DataNotice";

const months = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

export default function Even() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const [showPast, setShowPast] = useState(
    searchParams.get("lampau") === "ya",
  );

  const bulanParam = searchParams.get("bulan") || "";
  const bulan = /^((0[1-9])|(1[0-2]))$/.test(bulanParam) ? bulanParam : "";
  const kabupatenParam = searchParams.get("kabupaten") || "";
  const kategoriParam = searchParams.get("kategori") || "";
  const kabupaten = isKabupatenValid(kabupatenParam) ? kabupatenParam : "";
  const kategori = isKategoriValid(kategoriParam) ? kategoriParam : "";

  useEffect(() => {
    setPageMetadata(
      "Kalender Even | Sundara Yatra",
      "Jelajahi kalender even seni dan budaya Bali berdasarkan bulan, kategori, dan kabupaten.",
    );
    setError("");

    loadData()
      .then(setData)
      .catch((loadError) => setError(loadError.message));
  }, [reloadKey]);

  const updateFilter = (name, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(name, value);
    else next.delete(name);
    setSearchParams(next);
  };

  const resetFilters = () => {
    setSearchParams({});
    setShowPast(false);
  };

  const togglePast = (checked) => {
    setShowPast(checked);
    const next = new URLSearchParams(searchParams);
    if (checked) next.set("lampau", "ya");
    else next.delete("lampau");
    setSearchParams(next);
  };

  const results = useMemo(() => {
    if (!data) return [];

    return data.even
      .filter((even) => {
        const start = parseTanggal(even.tanggalMulai);
        if (!start) {
          return false;
        }

        const monthMatch = !bulan || `${start.getMonth() + 1}`.padStart(2, "0") === bulan;
        const kabupatenMatch = !kabupaten || even.kabupaten === kabupaten;
        const kategoriMatch = !kategori || even.kategori === kategori;
        const pastMatch = showPast || !isEvenTelahBerakhir(even);

        return monthMatch && kabupatenMatch && kategoriMatch && pastMatch;
      })
      .sort((a, b) => a.tanggalMulai.localeCompare(b.tanggalMulai));
  }, [data, bulan, kabupaten, kategori, showPast]);

  const grouped = results.reduce((groups, even) => {
    const date = parseTanggal(even.tanggalMulai);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    if (!groups[key]) groups[key] = [];
    groups[key].push(even);
    return groups;
  }, {});

  return (
    <main className="event-page">
      <Container>
        <header className="page-heading">
          <h1>Kalender Even</h1>
          <p>Temukan even seni dan budaya berdasarkan tanggal dan wilayah.</p>
        </header>
        {data && <DataNotice warning={data.warning} />}

        <section className="event-filters" aria-label="Filter kalender even">
          <FilterBulan
            value={bulan}
            onChange={(value) => updateFilter("bulan", value)}
          />
          <FilterKategori
            value={kategori}
            onChange={(value) => updateFilter("kategori", value)}
          />
          <FilterKabupaten
            value={kabupaten}
            onChange={(value) => updateFilter("kabupaten", value)}
          />
          <label className="past-toggle">
            <input
              type="checkbox"
              checked={showPast}
              onChange={(event) => togglePast(event.target.checked)}
            />
            Tampilkan even yang sudah berlalu
          </label>
          <Button variant="secondary" onClick={resetFilters}>
            Atur ulang filter
          </Button>
        </section>

        {error && (
          <ErrorState
            pesan={error}
            onRetry={() => setReloadKey((key) => key + 1)}
          />
        )}
        {!error && !data && <LoadingState pesan="Memuat kalender even..." />}
        {!error && data && results.length === 0 && (
          <EmptyState
            judul="Tidak ada even pada filter ini"
            pesan="Coba pilih bulan, kategori, atau kabupaten lain."
            aksi={
              <Button variant="secondary" onClick={resetFilters}>
                Atur ulang filter
              </Button>
            }
          />
        )}
        {!error && data && results.length > 0 && (
          <div className="event-groups">
            {Object.entries(grouped).map(([key, items]) => {
              const [year, month] = key.split("-");
              return (
                <section className="event-group" key={key}>
                  <h2>{months[Number(month) - 1]} {year}</h2>
                  <div className="event-list">
                    {items.map((even) => (
                      <div className="event-row" key={even.id}>
                        {isEvenTelahBerakhir(even) && (
                          <span className="past-label">Telah berlalu</span>
                        )}
                        <EvenItem even={even} />
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </Container>
    </main>
  );
}
