import { useState } from "react";
import "./Seccion.css";

export default function SeccionShow({ activo = false, propiedades, children }) {
  const [visible, setVisible] = useState(activo);
  const cambiarVisibilidad = () => {
    setVisible((valor) => !valor);
  }; //Muestra/oculta el cuerpo de la seccion

  return (
    <section className="SeccionLink">
      <header className="SeccionLink-header" onClick={cambiarVisibilidad}>
        <span className="SeccionLink-title">
          <span className="icon material-symbols-rounded">
            {propiedades.icono}
          </span>
          <span>{propiedades.titulo}</span>
        </span>
        <span className="SeccionLink-action">
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
        className="SeccionShow-content"
      >
        {children}
      </div>
    </section>
  );
}
