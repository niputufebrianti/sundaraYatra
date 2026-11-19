export default function FilterChip({
  label,
  aktif = false,
  onClick,
  type = "button",
}) {
  return (
    <button
      className={`filter-chip ${aktif ? "filter-chip-active" : ""}`}
      type={type}
      aria-pressed={aktif}
      onClick={onClick}
    >
      {aktif && <span aria-hidden="true">✓ </span>}
      {label}
    </button>
  );
}
