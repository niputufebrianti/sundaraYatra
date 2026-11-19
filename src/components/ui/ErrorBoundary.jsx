import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="error-boundary">
          <section role="alert" aria-labelledby="unexpected-error-title">
            <h1 id="unexpected-error-title">Terjadi kesalahan tak terduga</h1>
            <p>Silakan muat ulang halaman untuk mencoba lagi.</p>
            <button
              type="button"
              className="button button-primary"
              onClick={() => window.location.reload()}
            >
              Muat ulang halaman
            </button>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}
