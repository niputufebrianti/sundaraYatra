import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Container from "../components/layout/Container";
import Button from "../components/ui/Button";
import DestinasiCard from "../components/destinasi/DestinasiCard";
import SearchBar from "../components/filter/SearchBar";
import FilterKabupaten from "../components/filter/FilterKabupaten";
import FilterKategori from "../components/filter/FilterKategori";
import EmptyState from "../components/ui/EmptyState";
import LoadingState from "../components/ui/LoadingState";
import ErrorState from "../components/ui/ErrorState";
import { loadData } from "../lib/data";
import {
  filterDestinasi,
  isKabupatenValid,
  isKategoriValid,
  normalizeQuery,
} from "../lib/filter";
import { setPageMetadata } from "../lib/pageMetadata";
import DataNotice from "../components/ui/DataNotice";

export default function Destinasi() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  const kabupatenParam = searchParams.get("kabupaten") || "";
  const kategoriParam = searchParams.get("kategori") || "";
  const queryParam = searchParams.get("q") || "";

  const kabupaten = isKabupatenValid(kabupatenParam) ? kabupatenParam : "";
  const kategori = isKategoriValid(kategoriParam) ? kategoriParam : "";
  const query = normalizeQuery(queryParam);

  useEffect(() => {
    setPageMetadata(
      "Destinasi | Sundara Yatra",
      "Cari dan saring destinasi wisata seni dan budaya di berbagai wilayah Bali.",
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

  const resetFilters = () => setSearchParams({});

  const results = data
    ? filterDestinasi(data.destinasi, { q: query, kabupaten, kategori })
    : [];

  return (
    <main className="destination-page">
      <Container>
        <header className="page-heading">
          <h1>Destinasi</h1>
          <p>Temukan ruang seni dan budaya di seluruh Bali.</p>
        </header>
        {data && <DataNotice warning={data.warning} />}

        <section className="destination-filters" aria-label="Filter destinasi">
          <div className="filter-mobile-heading">
            <SearchBar
              id="destination-search-mobile"
              value={query}
              onChange={(value) => updateFilter("q", normalizeQuery(value))}
            />
            <Button
              variant="secondary"
              aria-expanded={filterOpen}
              aria-controls="destination-filter-panel"
              onClick={() => setFilterOpen((open) => !open)}
            >
              {filterOpen ? "Tutup Filter" : "Filter"}
            </Button>
          </div>

          <div
            id="destination-filter-panel"
            className={`filter-panel ${filterOpen ? "filter-panel-open" : ""}`}
          >
            <div className="desktop-search">
              <SearchBar
                id="destination-search-desktop"
                value={query}
                onChange={(value) => updateFilter("q", normalizeQuery(value))}
              />
            </div>
            <FilterKabupaten
              value={kabupaten}
              onChange={(value) => updateFilter("kabupaten", value)}
            />
            <FilterKategori
              value={kategori}
              onChange={(value) => updateFilter("kategori", value)}
            />
            <Button variant="secondary" onClick={resetFilters}>
              Atur ulang filter
            </Button>
          </div>
        </section>

        <p className="result-count" aria-live="polite">
          {data ? `${results.length} destinasi ditemukan` : ""}
        </p>

        {error && (
          <ErrorState
            pesan={error}
            onRetry={() => setReloadKey((key) => key + 1)}
          />
        )}
        {!error && !data && <LoadingState pesan="Memuat destinasi..." />}
        {!error && data && results.length === 0 && (
          <EmptyState
            judul="Tidak ada hasil"
            pesan="Coba ubah kata kunci atau pilihan filter."
            aksi={
              <Button variant="secondary" onClick={resetFilters}>
                Atur ulang filter
              </Button>
            }
          />
        )}
        {!error && data && results.length > 0 && (
          <div className="destination-grid">
            {results.map((item) => (
              <DestinasiCard key={item.id} destinasi={item} />
            ))}
          </div>
        )}
      </Container>
    </main>
  );
}
