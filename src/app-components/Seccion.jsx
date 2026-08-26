import "./Seccion.css";
import { useNavigate } from "react-router-dom";

export default function Seccion({ propiedades, children }) {
  const navigate = useNavigate();
  return (
    <section className="Seccion">
      <header className="Seccion-header-static">
        <span className="Seccion-title">
          <span className="icon material-symbols-rounded">
            {propiedades.icono[0]}
          </span>
          <span>{propiedades.titulo[0]}</span>
        </span>
        <span className="Seccion-title">
          <span className="icon material-symbols-rounded">
            {propiedades.icono[1]}
          </span>
          <span>{propiedades.titulo[1]}</span>
        </span>
      </header>
      <section className={`Seccion-content-${propiedades.mostrar}`}>
        {children}
      </section>
    </section>
  );
}
