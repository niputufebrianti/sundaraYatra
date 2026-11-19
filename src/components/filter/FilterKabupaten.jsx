const kabupaten = [
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

export default function FilterKabupaten({ value, onChange }) {
  return (
    <div className="filter-field">
      <label htmlFor="kabupaten-filter">Kabupaten</label>
      <select
        id="kabupaten-filter"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="">Semua kabupaten</option>
        {kabupaten.map((name) => (
            <option key={name} value={name}>{name}</option>
          ))}
      </select>
    </div>
  );
}
