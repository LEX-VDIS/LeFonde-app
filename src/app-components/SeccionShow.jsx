import { useState } from "react";
import "./Seccion.css";

export default function SeccionShow({ activo = false, propiedades, children }) {
  const [visible, setVisible] = useState(activo);
  const cambiarVisibilidad = () => {
    setVisible((valor) => !valor);
  }; //Muestra/oculta el cuerpo de la seccion

  return (
    <section className={`Seccion ${propiedades.lado ? propiedades.lado : ""}`}>
      <header className="Seccion-header-dinamic" onClick={cambiarVisibilidad}>
        <span className="Seccion-title">
          <span className="icon material-symbols-rounded">
            {propiedades.icono}
          </span>
          <span>{propiedades.titulo}</span>
        </span>
        <span className="Seccion-action">
          <span>{propiedades.cantidad}</span>
          {visible ? (
            <span className="icon material-symbols-rounded">
              expand_circle_up
            </span>
          ) : (
            <span className="icon material-symbols-rounded">
              expand_circle_down
            </span>
          )}
        </span>
      </header>
      <div
        style={{ display: visible ? "" : "none" }}
        className={`Seccion-content-${propiedades.mostrar}`}
      >
        {children}
      </div>
    </section>
  );
}
