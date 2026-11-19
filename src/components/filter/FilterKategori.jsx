import FilterChip from "./FilterChip";

const kategori = ["Tari", "Musik", "Seni Rupa", "Kriya", "Festival"];

export default function FilterKategori({ value, onChange }) {
  return (
    <fieldset className="category-filter">
      <legend>Kategori seni</legend>
      <div className="chip-row">
        <FilterChip
          label="Semua"
          aktif={!value}
          onClick={() => onChange("")}
        />
        {kategori.map((name) => (
          <FilterChip
            key={name}
            label={name}
            aktif={value === name}
            onClick={() => onChange(name)}
          />
        ))}
      </div>
    </fieldset>
  );
}
