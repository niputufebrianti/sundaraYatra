import { useEffect, useRef, useState } from "react";

export default function GaleriFoto({ gambar = [], nama }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const openerRef = useRef(null);
  const closeButtonRef = useRef(null);
  const images = gambar.length > 0 ? gambar : ["/images/photo-placeholder.svg"];

  useEffect(() => {
    if (!selectedImage) return undefined;

    closeButtonRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        setSelectedImage(null);
      } else if (event.key === "Tab") {
        event.preventDefault();
        closeButtonRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      openerRef.current?.focus();
    };
  }, [selectedImage]);

  const useFallback = (event) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = "/images/photo-placeholder.svg";
    event.currentTarget.alt = "Foto belum tersedia";
  };

  return (
    <section className="gallery-section" aria-labelledby="gallery-title">
      <h2 id="gallery-title">Galeri</h2>
      <div className="gallery-grid">
        {images.map((image, index) => (
          <button
            type="button"
            className="gallery-button"
            key={`${image}-${index}`}
            onClick={(event) => {
              openerRef.current = event.currentTarget;
              setSelectedImage(image);
            }}
            aria-label={`Perbesar gambar ${index + 1} ${nama}`}
          >
            <img
              src={image}
              alt={`Galeri ${nama}, gambar ${index + 1}`}
              width="400"
              height="400"
              loading="lazy"
              onError={useFallback}
            />
          </button>
        ))}
      </div>

      {selectedImage && (
        <div
          className="image-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`Pratinjau galeri ${nama}`}
          onClick={() => setSelectedImage(null)}
        >
          <button
            ref={closeButtonRef}
            type="button"
            className="image-modal-close"
            aria-label="Tutup gambar"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>
          <img
            src={selectedImage}
            alt={`Pratinjau galeri ${nama}`}
            onError={useFallback}
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
