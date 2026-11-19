export default function ErrorState({
  pesan = "Data tidak dapat dimuat.",
  onRetry,
}) {
  return (
    <section className="state-box state-error" role="alert">
      <h2>Terjadi kesalahan</h2>
      <p>{pesan}</p>
      {onRetry && (
        <button type="button" className="button button-secondary" onClick={onRetry}>
          Coba lagi
        </button>
      )}
    </section>
  );
}
