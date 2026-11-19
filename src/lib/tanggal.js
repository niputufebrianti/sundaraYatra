export function formatTanggal(value) {
  if (typeof value !== "string") return "Tanggal belum tersedia";

  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return "Tanggal belum tersedia";

  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function parseTanggal(value) {
  if (
    typeof value !== "string" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(value)
  ) {
    return null;
  }

  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return null;

  const [year, month, day] = value.split("-").map(Number);
  if (
    date.getFullYear() !== year ||
    date.getMonth() + 1 !== month ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
}

export function isEvenTelahBerakhir(even, today = new Date()) {
  const endValue = even.tanggalSelesai || even.tanggalMulai;
  const endDate = parseTanggal(endValue);
  if (!endDate) return false;

  const todayStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );
  return endDate < todayStart;
}
