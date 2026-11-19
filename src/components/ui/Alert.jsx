export default function Alert({ jenis = "info", children }) {
  return (
    <div className={`alert alert-${jenis}`} role={jenis === "error" ? "alert" : "status"}>
      {children}
    </div>
  );
}
