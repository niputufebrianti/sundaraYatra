import { validateDemoData } from "./validasi";

const STORAGE_KEY = "sundarayatra:v1:data";
const SCHEMA_VERSION = 1;

const invalidDataWarning =
  "Data demo tersimpan tidak valid. Data awal digunakan; kembalikan data awal untuk menghapus data rusak.";
const unavailableWarning =
  "Penyimpanan lokal tidak tersedia. Data awal digunakan dan perubahan tidak dapat disimpan.";

export function readDemoData() {
  let serialized;

  try {
    serialized = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return { data: null, warning: unavailableWarning };
  }

  if (serialized === null) return { data: null, warning: null };

  let stored;
  try {
    stored = JSON.parse(serialized);
  } catch {
    return { data: null, warning: invalidDataWarning };
  }

  if (
    stored?.version !== SCHEMA_VERSION ||
    !validateDemoData(stored.data)
  ) {
    return { data: null, warning: invalidDataWarning };
  }

  return { data: stored.data, warning: null };
}

export function saveDemoData(data) {
  if (!validateDemoData(data)) {
    throw new Error("Data destinasi tidak valid. Perubahan tidak disimpan.");
  }

  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ version: SCHEMA_VERSION, data }),
    );
  } catch (error) {
    throw new Error(
      "Perubahan tidak dapat disimpan. Ruang penyimpanan browser mungkin penuh atau diblokir.",
      { cause: error },
    );
  }
}

export function resetDemoData() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    throw new Error(
      "Data demo tidak dapat dihapus dari penyimpanan lokal browser.",
      { cause: error },
    );
  }
}
