export default function EmptyState({ judul = "Tidak ada hasil", pesan, aksi }) {
  return (
    <section className="state-box" aria-live="polite">
      <div className="state-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="24" height="24">
          <circle cx="11" cy="11" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="m16 16 4 4" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
      <h2>{judul}</h2>
      {pesan && <p>{pesan}</p>}
      {aksi}
    </section>
  );
}
