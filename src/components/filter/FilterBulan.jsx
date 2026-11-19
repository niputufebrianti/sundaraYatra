const bulan = [
  ["01", "Januari"],
  ["02", "Februari"],
  ["03", "Maret"],
  ["04", "April"],
  ["05", "Mei"],
  ["06", "Juni"],
  ["07", "Juli"],
  ["08", "Agustus"],
  ["09", "September"],
  ["10", "Oktober"],
  ["11", "November"],
  ["12", "Desember"],
];

export default function FilterBulan({ value, onChange }) {
  return (
    <div className="filter-field">
      <label htmlFor="bulan-filter">Bulan</label>
      <select
        id="bulan-filter"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="">Semua bulan</option>
        {bulan.map(([number, name]) => (
          <option key={number} value={number}>{name}</option>
        ))}
      </select>
    </div>
  );
}
