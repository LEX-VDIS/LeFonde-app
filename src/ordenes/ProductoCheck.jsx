import { useState, useEffect } from "react";
import "./ProductoCheck.css";

export default function ProductoCheck({ propiedades }) {
  const [seleccionado, setSeleccionado] = useState(false);

  const toggleCheck = (activar) => {
    setSeleccionado(activar.target.checked);
  };

  function OpcionesMultiples() {
    const [valores, setValores] = useState({
      notificaciones: false,
      promociones: true,
    });
  }

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setValores((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  return (
    <label htmlFor={propiedades.id}>
      <div className="check-card">
        <span className="row">
          <strong>{propiedades.nombre}</strong>
          <span>
            ${propiedades.precio}
            <input
              id={propiedades.id}
              name={propiedades.id}
              type="checkbox"
              checked={seleccionado}
              onChange={toggleCheck}
            />
          </span>
        </span>
        <span>{propiedades.detalle}</span>
      </div>
    </label>
  );
}
