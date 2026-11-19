import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import Container from "../components/layout/Container";
import Alert from "../components/ui/Alert";
import { validateRegister } from "../lib/validasi";
import { setPageMetadata } from "../lib/pageMetadata";

export default function Daftar() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmRef = useRef(null);

  useEffect(() => {
    setPageMetadata(
      "Daftar | Sundara Yatra",
      "Halaman pendaftaran Sundara Yatra. Fitur akun belum aktif dan data tidak disimpan.",
    );
  }, []);

  const submit = (event) => {
    event.preventDefault();
    const nextErrors = validateRegister(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmitted(false);
      if (nextErrors.name) nameRef.current?.focus();
      else if (nextErrors.email) emailRef.current?.focus();
      else if (nextErrors.password) passwordRef.current?.focus();
      else if (nextErrors.confirmPassword) confirmRef.current?.focus();
      return;
    }

    setSubmitted(true);
    setValues({ name: "", email: "", password: "", confirmPassword: "" });
  };

  const update = (field) => (event) =>
    setValues((current) => ({ ...current, [field]: event.target.value }));

  return (
    <main className="account-page">
      <Container className="account-container">
        <section className="account-card" aria-labelledby="register-title">
          <Alert jenis="warning">Fitur akun belum aktif</Alert>
          {submitted && (
            <Alert jenis="success">
              Fitur akun segera hadir. Data Anda tidak disimpan.
            </Alert>
          )}
          <h1 id="register-title">Daftar</h1>
          <form noValidate onSubmit={submit}>
            <div className="form-field">
              <label htmlFor="register-name">Nama</label>
              <input
                ref={nameRef}
                id="register-name"
                type="text"
                autoComplete="name"
                value={values.name}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "register-name-error" : undefined}
                onChange={update("name")}
              />
              {errors.name && (
                <p id="register-name-error" className="field-error">{errors.name}</p>
              )}
            </div>
            <div className="form-field">
              <label htmlFor="register-email">Email</label>
              <input
                ref={emailRef}
                id="register-email"
                type="email"
                autoComplete="email"
                value={values.email}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "register-email-error" : undefined}
                onChange={update("email")}
              />
              {errors.email && (
                <p id="register-email-error" className="field-error">{errors.email}</p>
              )}
            </div>
            <div className="form-field">
              <label htmlFor="register-password">Kata sandi</label>
              <input
                ref={passwordRef}
                id="register-password"
                type="password"
                autoComplete="new-password"
                value={values.password}
                aria-invalid={Boolean(errors.password)}
                aria-describedby={errors.password ? "register-password-error" : undefined}
                onChange={update("password")}
              />
              {errors.password && (
                <p id="register-password-error" className="field-error">{errors.password}</p>
              )}
            </div>
            <div className="form-field">
              <label htmlFor="register-confirm">Konfirmasi kata sandi</label>
              <input
                ref={confirmRef}
                id="register-confirm"
                type="password"
                autoComplete="new-password"
                value={values.confirmPassword}
                aria-invalid={Boolean(errors.confirmPassword)}
                aria-describedby={errors.confirmPassword ? "register-confirm-error" : undefined}
                onChange={update("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p id="register-confirm-error" className="field-error">{errors.confirmPassword}</p>
              )}
            </div>
            <button className="button button-primary" type="submit">Daftar</button>
          </form>
          <p>Sudah punya akun? <Link to="/masuk">Masuk</Link></p>
        </section>
      </Container>
    </main>
  );
}
