const KABUPATEN = [
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

const KATEGORI = ["Tari", "Musik", "Seni Rupa", "Kriya", "Festival"];

export function isKabupatenValid(value) {
  return KABUPATEN.includes(value);
}

export function isKategoriValid(value) {
  return KATEGORI.includes(value);
}

export function normalizeQuery(value) {
  if (typeof value !== "string") return "";
  return value.slice(0, 100).trim();
}

export function filterDestinasi(destinasi, criteria = {}) {
  const query = normalizeQuery(criteria.q).toLocaleLowerCase("id-ID");
  const kabupaten = isKabupatenValid(criteria.kabupaten)
    ? criteria.kabupaten
    : "";
  const kategori = isKategoriValid(criteria.kategori)
    ? criteria.kategori
    : "";

  return destinasi.filter((item) => {
    const matchesKabupaten = !kabupaten || item.kabupaten === kabupaten;
    const matchesKategori =
      !kategori || (Array.isArray(item.kategori) && item.kategori.includes(kategori));
    const searchableText = `${item.nama || ""} ${item.ringkasan || ""}`
      .toLocaleLowerCase("id-ID");
    const matchesQuery = !query || searchableText.includes(query);

    return matchesKabupaten && matchesKategori && matchesQuery;
  });
}
