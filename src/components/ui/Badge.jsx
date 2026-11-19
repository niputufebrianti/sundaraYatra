const badgeColors = {
  data: "badge-data",
  umum: "badge-umum",
  tiket: "badge-tiket",
  sakral: "badge-sakral",
  Tari: "badge-tari",
  Musik: "badge-musik",
  "Seni Rupa": "badge-seni-rupa",
  Kriya: "badge-kriya",
  Festival: "badge-festival",
};

export default function Badge({ children, variant = "data" }) {
  return (
    <span className={`badge ${badgeColors[variant] || "badge-data"}`}>
      {children}
    </span>
  );
}
