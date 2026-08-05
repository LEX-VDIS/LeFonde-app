import { useState, useEffect } from "react";
import "./ProductoChckBx.css";

export default function ProductoChckBx({ propiedades }) {
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
      <div className="tarjeta">
        <div className="row">
          <label htmlFor={propiedades.id}>{propiedades.nombre}</label>
          <input
            id={propiedades.id}
            name={propiedades.id}
            type="checkbox"
            checked={seleccionado}
            onChange={toggleCheck}
          />
        </div>
      </div>
    </label>
  );
}
