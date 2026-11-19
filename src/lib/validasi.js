import { getValidMapsUrl } from "./url";
import { isValidWhatsAppNumber } from "./whatsapp";
import { parseTanggal } from "./tanggal";

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

export function isValidEmail(value) {
  return (
    typeof value === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) &&
    value.trim().length <= 254
  );
}

export function isValidImageSource(value) {
  if (typeof value !== "string" || !value.trim()) return false;
  const source = value.trim();

  if (source.startsWith("/images/")) {
    return /^\/images\/[a-zA-Z0-9._/-]+$/.test(source) &&
      !source.split("/").includes("..");
  }

  try {
    const url = new URL(source);
    return (
      url.protocol === "https:" &&
      Boolean(url.hostname) &&
      !url.username &&
      !url.password
    );
  } catch {
    return false;
  }
}

export function validateDestination(values) {
  const errors = {};

  if (typeof values.nama !== "string" || !values.nama.trim()) {
    errors.nama = "Nama destinasi wajib diisi.";
  } else if (values.nama.trim().length > 100) {
    errors.nama = "Nama maksimal 100 karakter.";
  }

  if (!KABUPATEN.has(values.kabupaten)) {
    errors.kabupaten = "Pilih kabupaten yang tersedia.";
  }

  if (
    !Array.isArray(values.kategori) ||
    values.kategori.length === 0 ||
    !values.kategori.every((item) => KATEGORI.has(item))
  ) {
    errors.kategori = "Pilih minimal satu kategori yang valid.";
  }

  if (typeof values.ringkasan !== "string" || !values.ringkasan.trim()) {
    errors.ringkasan = "Ringkasan wajib diisi.";
  } else if (values.ringkasan.trim().length > 140) {
    errors.ringkasan = "Ringkasan maksimal 140 karakter.";
  }

  if (typeof values.deskripsi !== "string" || !values.deskripsi.trim()) {
    errors.deskripsi = "Deskripsi wajib diisi.";
  } else if (values.deskripsi.trim().length > 3000) {
    errors.deskripsi = "Deskripsi maksimal 3000 karakter.";
  }

  if (!isValidImageSource(values.gambar)) {
    errors.gambar = "Gunakan jalur /images/ atau URL gambar HTTPS.";
  }

  if (
    values.mapsUrl &&
    !getValidMapsUrl(values.mapsUrl)
  ) {
    errors.mapsUrl = "Gunakan URL Google Maps HTTPS yang diizinkan.";
  }

  if (
    values.whatsapp &&
    !isValidWhatsAppNumber(values.whatsapp)
  ) {
    errors.whatsapp = "Gunakan nomor internasional 8–15 digit tanpa tanda baca.";
  }

  if (typeof values.kreditFoto !== "string" || !values.kreditFoto.trim()) {
    errors.kreditFoto = "Kredit foto wajib diisi.";
  } else if (values.kreditFoto.trim().length > 200) {
    errors.kreditFoto = "Kredit foto maksimal 200 karakter.";
  }

  return errors;
}

function isValidId(value) {
  return typeof value === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
}

function isNullableString(value) {
  return value === null || typeof value === "string";
}

function isValidDestinationRecord(item) {
  return (
    item &&
    isValidId(item.id) &&
    typeof item.nama === "string" &&
    item.nama.trim().length > 0 &&
    item.nama.length <= 100 &&
    KABUPATEN.has(item.kabupaten) &&
    Array.isArray(item.kategori) &&
    item.kategori.length > 0 &&
    item.kategori.every((category) => KATEGORI.has(category)) &&
    typeof item.ringkasan === "string" &&
    item.ringkasan.trim().length > 0 &&
    item.ringkasan.length <= 140 &&
    typeof item.deskripsi === "string" &&
    item.deskripsi.trim().length > 0 &&
    item.deskripsi.length <= 3000 &&
    isValidImageSource(item.gambar) &&
    Array.isArray(item.galeri) &&
    item.galeri.every(isValidImageSource) &&
    isNullableString(item.alamat) &&
    (item.mapsUrl === null || Boolean(getValidMapsUrl(item.mapsUrl))) &&
    isNullableString(item.jamKunjung) &&
    isNullableString(item.tiket) &&
    (item.whatsapp === null || isValidWhatsAppNumber(item.whatsapp)) &&
    Array.isArray(item.fasilitas) &&
    item.fasilitas.every((facility) => typeof facility === "string") &&
    typeof item.kreditFoto === "string" &&
    item.kreditFoto.trim().length > 0 &&
    typeof item.dataContoh === "boolean"
  );
}

function isValidEventRecord(item, destinationIds) {
  const start = parseTanggal(item?.tanggalMulai);
  const end = item?.tanggalSelesai ? parseTanggal(item.tanggalSelesai) : start;

  return (
    item &&
    isValidId(item.id) &&
    typeof item.nama === "string" &&
    item.nama.trim().length > 0 &&
    item.nama.length <= 100 &&
    KABUPATEN.has(item.kabupaten) &&
    KATEGORI.has(item.kategori) &&
    AKSES.has(item.akses) &&
    start !== null &&
    end !== null &&
    end >= start &&
    isNullableString(item.lokasi) &&
    (item.destinasiId === null || destinationIds.has(item.destinasiId)) &&
    (item.whatsapp === null || isValidWhatsAppNumber(item.whatsapp)) &&
    typeof item.deskripsi === "string" &&
    item.deskripsi.trim().length > 0 &&
    typeof item.dataContoh === "boolean"
  );
}

export function validateDemoData(data) {
  if (
    !data ||
    !Array.isArray(data.destinasi) ||
    !Array.isArray(data.even)
  ) {
    return false;
  }

  const destinationIds = new Set();
  for (const item of data.destinasi) {
    if (!isValidDestinationRecord(item) || destinationIds.has(item.id)) {
      return false;
    }
    destinationIds.add(item.id);
  }

  const eventIds = new Set();
  for (const item of data.even) {
    if (!isValidEventRecord(item, destinationIds) || eventIds.has(item.id)) {
      return false;
    }
    eventIds.add(item.id);
  }

  return true;
}

export function createDestinationId(name, existingIds) {
  const base = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "destinasi";

  let candidate = base;
  let suffix = 2;
  while (existingIds.has(candidate)) {
    candidate = `${base}-${suffix}`;
    suffix += 1;
  }
  return candidate;
}

export function validateLogin(values) {
  const errors = {};

  if (!isValidEmail(values.email)) {
    errors.email = "Masukkan email berformat benar.";
  }
  if (typeof values.password !== "string" || values.password.length < 8) {
    errors.password = "Kata sandi minimal 8 karakter.";
  }

  return errors;
}

export function validateRegister(values) {
  const errors = {};

  if (typeof values.name !== "string" || !values.name.trim()) {
    errors.name = "Nama tidak boleh kosong.";
  } else if (values.name.trim().length > 100) {
    errors.name = "Nama maksimal 100 karakter.";
  }

  if (!isValidEmail(values.email)) {
    errors.email = "Masukkan email berformat benar.";
  }
  if (typeof values.password !== "string" || values.password.length < 8) {
    errors.password = "Kata sandi minimal 8 karakter.";
  }
  if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Konfirmasi kata sandi tidak cocok.";
  }

  return errors;
}
