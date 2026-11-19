import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import Container from "../components/layout/Container";
import Alert from "../components/ui/Alert";
import { validateLogin } from "../lib/validasi";
import { setPageMetadata } from "../lib/pageMetadata";

export default function Masuk() {
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    setPageMetadata(
      "Masuk | Sundara Yatra",
      "Halaman masuk Sundara Yatra. Fitur akun belum aktif dan data tidak disimpan.",
    );
  }, []);

  const submit = (event) => {
    event.preventDefault();
    const nextErrors = validateLogin(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmitted(false);
      if (nextErrors.email) emailRef.current?.focus();
      else if (nextErrors.password) passwordRef.current?.focus();
      return;
    }

    setSubmitted(true);
    setValues({ email: "", password: "" });
  };

  return (
    <main className="account-page">
      <Container className="account-container">
        <section className="account-card" aria-labelledby="login-title">
          <Alert jenis="warning">Fitur akun belum aktif</Alert>
          {submitted && (
            <Alert jenis="success">
              Fitur akun segera hadir. Data Anda tidak disimpan.
            </Alert>
          )}
          <h1 id="login-title">Masuk</h1>
          <form noValidate onSubmit={submit}>
            <div className="form-field">
              <label htmlFor="login-email">Email</label>
              <input
                ref={emailRef}
                id="login-email"
                type="email"
                autoComplete="email"
                value={values.email}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "login-email-error" : undefined}
                onChange={(event) =>
                  setValues((current) => ({ ...current, email: event.target.value }))
                }
              />
              {errors.email && (
                <p id="login-email-error" className="field-error">{errors.email}</p>
              )}
            </div>
            <div className="form-field">
              <label htmlFor="login-password">Kata sandi</label>
              <input
                ref={passwordRef}
                id="login-password"
                type="password"
                autoComplete="current-password"
                value={values.password}
                aria-invalid={Boolean(errors.password)}
                aria-describedby={errors.password ? "login-password-error" : undefined}
                onChange={(event) =>
                  setValues((current) => ({ ...current, password: event.target.value }))
                }
              />
              {errors.password && (
                <p id="login-password-error" className="field-error">{errors.password}</p>
              )}
            </div>
            <button className="button button-primary" type="submit">Masuk</button>
          </form>
          <p>Belum punya akun? <Link to="/daftar">Daftar</Link></p>
        </section>
      </Container>
    </main>
  );
}
