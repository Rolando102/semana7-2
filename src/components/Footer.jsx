
import { memo } from "react";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div>
          <h2 className="footer-logo">
            Dashboard React Hooks
          </h2>

          <p className="footer-text">
            Proyecto desarrollado con React,
            Hooks avanzados y Recharts.
          </p>
        </div>

        <div className="footer-links">
          <a href="#">
            Inicio
          </a>

          <a href="#">
            Dashboard
          </a>

          <a href="#">
            Reportes
          </a>

          <a href="#">
            Contacto
          </a>
        </div>

        <div className="footer-social">
          <button>
            GitHub
          </button>

          <button>
            LinkedIn
          </button>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {year} Dashboard React Hooks |
          Universidad Nacional del Centro
          del Perú
        </p>
      </div>
    </footer>
  );
}

export default memo(Footer);