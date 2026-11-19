export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-field">
      <label htmlFor="destination-search">Cari destinasi</label>
      <input
        id="destination-search"
        type="search"
        value={value}
        maxLength={100}
        placeholder="Cari nama atau ringkasan..."
        onChange={(event) => onChange(event.target.value.slice(0, 100))}
      />
    </div>
  );
}
