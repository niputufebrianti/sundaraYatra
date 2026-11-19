import { useEffect, useRef, useState } from "react";
import { validateDestination } from "../../lib/validasi";

const categories = ["Tari", "Musik", "Seni Rupa", "Kriya", "Festival"];
const kabupaten = [
  "Badung",
  "Bangli",
  "Buleleng",
  "Gianyar",
  "Jembrana",
  "Karangasem",
  "Klungkung",
  "Tabanan",
  "Denpasar",
];

function getInitialValues(destination) {
  if (!destination) {
    return {
      nama: "",
      kabupaten: "",
      kategori: [],
      ringkasan: "",
      deskripsi: "",
      gambar: "/images/photo-placeholder.svg",
      mapsUrl: "",
      whatsapp: "",
      kreditFoto: "Ilustrasi placeholder milik Sundara Yatra",
    };
  }

  return {
    nama: destination.nama,
    kabupaten: destination.kabupaten,
    kategori: [...destination.kategori],
    ringkasan: destination.ringkasan,
    deskripsi: destination.deskripsi,
    gambar: destination.gambar,
    mapsUrl: destination.mapsUrl || "",
    whatsapp: destination.whatsapp || "",
    kreditFoto: destination.kreditFoto,
  };
}

function FieldError({ id, message }) {
  return message ? <p className="field-error" id={id}>{message}</p> : null;
}

export default function DestinasiForm({
  destination = null,
  onSave,
  onCancel,
  saveError,
}) {
  const [values, setValues] = useState(() => getInitialValues(destination));
  const [errors, setErrors] = useState({});
  const nameRef = useRef(null);
  const regencyRef = useRef(null);
  const categoryRef = useRef(null);
  const summaryRef = useRef(null);
  const descriptionRef = useRef(null);
  const imageRef = useRef(null);
  const mapsRef = useRef(null);
  const whatsappRef = useRef(null);
  const creditRef = useRef(null);

  useEffect(() => {
    setValues(getInitialValues(destination));
    setErrors({});
  }, [destination]);

  const update = (field) => (event) =>
    setValues((current) => ({ ...current, [field]: event.target.value }));

  const toggleCategory = (category) => {
    setValues((current) => ({
      ...current,
      kategori: current.kategori.includes(category)
        ? current.kategori.filter((item) => item !== category)
        : [...current.kategori, category],
    }));
  };

  const submit = (event) => {
    event.preventDefault();
    const nextErrors = validateDestination(values);
    setErrors(nextErrors);
    const errorOrder = [
      ["nama", nameRef],
      ["kabupaten", regencyRef],
      ["kategori", categoryRef],
      ["ringkasan", summaryRef],
      ["deskripsi", descriptionRef],
      ["gambar", imageRef],
      ["mapsUrl", mapsRef],
      ["whatsapp", whatsappRef],
      ["kreditFoto", creditRef],
    ];
    const firstError = errorOrder.find(([field]) => nextErrors[field]);
    if (firstError) {
      firstError[1].current?.focus();
      return;
    }

    onSave({
      ...values,
      nama: values.nama.trim(),
      ringkasan: values.ringkasan.trim(),
      deskripsi: values.deskripsi.trim(),
      gambar: values.gambar.trim(),
      mapsUrl: values.mapsUrl.trim() || null,
      whatsapp: values.whatsapp.trim() || null,
      kreditFoto: values.kreditFoto.trim(),
    });
  };

  return (
    <section className="dashboard-form-section" aria-labelledby="destination-form-title">
      <h2 id="destination-form-title">
        {destination ? "Ubah destinasi" : "Tambah destinasi"}
      </h2>
      {saveError && <p className="field-error" role="alert">{saveError}</p>}
      <form className="dashboard-form" noValidate onSubmit={submit}>
        <div className="form-field">
          <label htmlFor="destination-name">Nama destinasi</label>
          <input
            ref={nameRef}
            id="destination-name"
            value={values.nama}
            maxLength={100}
            aria-invalid={Boolean(errors.nama)}
            aria-describedby={errors.nama ? "destination-name-error" : undefined}
            onChange={update("nama")}
          />
          <FieldError id="destination-name-error" message={errors.nama} />
        </div>

        <div className="form-field">
          <label htmlFor="destination-regency">Kabupaten</label>
          <select
            ref={regencyRef}
            id="destination-regency"
            value={values.kabupaten}
            aria-invalid={Boolean(errors.kabupaten)}
            aria-describedby={errors.kabupaten ? "destination-regency-error" : undefined}
            onChange={update("kabupaten")}
          >
            <option value="">Pilih kabupaten</option>
            {kabupaten.map((name) => <option key={name}>{name}</option>)}
          </select>
          <FieldError id="destination-regency-error" message={errors.kabupaten} />
        </div>

        <fieldset
          ref={categoryRef}
          className="form-field category-choices"
          tabIndex={-1}
          aria-describedby={errors.kategori ? "destination-category-error" : undefined}
        >
          <legend>Kategori seni</legend>
          <div className="category-checkboxes">
            {categories.map((category) => (
              <label key={category}>
                <input
                  type="checkbox"
                  checked={values.kategori.includes(category)}
                  onChange={() => toggleCategory(category)}
                />
                {category}
              </label>
            ))}
          </div>
          <FieldError id="destination-category-error" message={errors.kategori} />
        </fieldset>

        <div className="form-field">
          <label htmlFor="destination-summary">Ringkasan</label>
          <textarea
            ref={summaryRef}
            id="destination-summary"
            value={values.ringkasan}
            maxLength={140}
            rows={3}
            aria-invalid={Boolean(errors.ringkasan)}
            aria-describedby={errors.ringkasan ? "destination-summary-error" : undefined}
            onChange={update("ringkasan")}
          />
          <FieldError id="destination-summary-error" message={errors.ringkasan} />
        </div>

        <div className="form-field">
          <label htmlFor="destination-description">Deskripsi</label>
          <textarea
            ref={descriptionRef}
            id="destination-description"
            value={values.deskripsi}
            maxLength={3000}
            rows={5}
            aria-invalid={Boolean(errors.deskripsi)}
            aria-describedby={errors.deskripsi ? "destination-description-error" : undefined}
            onChange={update("deskripsi")}
          />
          <FieldError id="destination-description-error" message={errors.deskripsi} />
        </div>

        <div className="form-field">
          <label htmlFor="destination-image">Jalur/URL gambar</label>
          <input
            ref={imageRef}
            id="destination-image"
            value={values.gambar}
            aria-invalid={Boolean(errors.gambar)}
            aria-describedby={errors.gambar ? "destination-image-error" : undefined}
            onChange={update("gambar")}
          />
          <FieldError id="destination-image-error" message={errors.gambar} />
        </div>

        <div className="form-field">
          <label htmlFor="destination-maps">URL Google Maps (opsional)</label>
          <input
            ref={mapsRef}
            id="destination-maps"
            value={values.mapsUrl}
            aria-invalid={Boolean(errors.mapsUrl)}
            aria-describedby={errors.mapsUrl ? "destination-maps-error" : undefined}
            onChange={update("mapsUrl")}
          />
          <FieldError id="destination-maps-error" message={errors.mapsUrl} />
        </div>

        <div className="form-field">
          <label htmlFor="destination-whatsapp">WhatsApp (opsional, setelah ada izin)</label>
          <input
            ref={whatsappRef}
            id="destination-whatsapp"
            inputMode="numeric"
            autoComplete="off"
            value={values.whatsapp}
            aria-invalid={Boolean(errors.whatsapp)}
            aria-describedby={errors.whatsapp ? "destination-whatsapp-error" : undefined}
            onChange={update("whatsapp")}
          />
          <FieldError id="destination-whatsapp-error" message={errors.whatsapp} />
        </div>

        <div className="form-field">
          <label htmlFor="destination-photo-credit">Kredit foto</label>
          <input
            ref={creditRef}
            id="destination-photo-credit"
            value={values.kreditFoto}
            maxLength={200}
            aria-invalid={Boolean(errors.kreditFoto)}
            aria-describedby={errors.kreditFoto ? "destination-credit-error" : undefined}
            onChange={update("kreditFoto")}
          />
          <FieldError id="destination-credit-error" message={errors.kreditFoto} />
        </div>

        <div className="dashboard-form-actions">
          <button type="submit" className="button button-primary">
            Simpan destinasi
          </button>
          <button type="button" className="button button-secondary" onClick={onCancel}>
            Batal
          </button>
        </div>
      </form>
    </section>
  );
}
