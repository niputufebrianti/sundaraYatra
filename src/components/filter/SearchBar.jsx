export default function SearchBar({ value, onChange, id = "destination-search" }) {
  return (
    <div className="search-field">
      <label htmlFor={id}>Cari destinasi</label>
      <input
        id={id}
        type="search"
        value={value}
        maxLength={100}
        placeholder="Cari nama atau ringkasan..."
        onChange={(event) => onChange(event.target.value.slice(0, 100))}
      />
    </div>
  );
}
