import { useState } from "react";
import "./Seccion.css";

export default function Seccion({ activo = false, propiedades }) {
  const [visible, setVisible] = useState(activo);
  const cambiarVisibilidad = () => {
    setVisible((valor) => !valor);
  }; //Muestra/oculta el cuerpo de la seccion

  return (
    <section className="section">
      <section className="section_head">
        <button type="button" onClick={cambiarVisibilidad}>
          <span className="section_title">
            <span className="icon material-symbols-rounded">
              {propiedades.icono}
            </span>
            <span>{propiedades.titulo}</span>
          </span>
          <span className="section_action" style={{ width: "34px" }}>
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
        </button>
      </section>
      <section
        style={{ display: visible ? "" : "none" }}
        className="section_body"
      >
        {propiedades.contenido}
      </section>
    </section>
  );
}
