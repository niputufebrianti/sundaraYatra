export default function LoadingState({ pesan = "Memuat data..." }) {
  return (
    <div className="state-box" role="status" aria-live="polite">
      <span className="loading-spinner" aria-hidden="true" />
      <p>{pesan}</p>
    </div>
  );
}
