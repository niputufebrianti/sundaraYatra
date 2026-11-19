const KABUPATEN = new Set([
  "Badung",
  "Bangli",
  "Buleleng",
  "Gianyar",
  "Jembrana",
  "Karangasem",
  "Klungkung",
  "Tabanan",
  "Denpasar",
]);

const KATEGORI = new Set(["Tari", "Musik", "Seni Rupa", "Kriya", "Festival"]);
const AKSES = new Set(["umum", "tiket", "sakral"]);

function isValidId(value) {
  return typeof value === "string" && /^[a-z0-9-]+$/.test(value);
}

function isValidDestination(item) {
  return (
    item &&
    isValidId(item.id) &&
    typeof item.nama === "string" &&
    KABUPATEN.has(item.kabupaten) &&
    Array.isArray(item.kategori) &&
    item.kategori.every((category) => KATEGORI.has(category))
  );
}

function isValidEvent(item) {
  return (
    item &&
    isValidId(item.id) &&
    typeof item.nama === "string" &&
    KABUPATEN.has(item.kabupaten) &&
    KATEGORI.has(item.kategori) &&
    AKSES.has(item.akses) &&
    /^\d{4}-\d{2}-\d{2}$/.test(item.tanggalMulai)
  );
}

export async function loadData() {
  try {
    const module = await import("../data/data.json");
    const data = module.default;

    if (!data || !Array.isArray(data.destinasi) || !Array.isArray(data.even)) {
      throw new Error("Format data tidak sesuai.");
    }

    return {
      destinasi: data.destinasi.filter(isValidDestination),
      even: data.even.filter(isValidEvent),
    };
  } catch (error) {
    throw new Error("Data destinasi dan even tidak dapat dimuat.", {
      cause: error,
    });
  }
}
