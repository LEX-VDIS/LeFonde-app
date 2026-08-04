import { useState } from "react";
import "./Ordenes.css";
import Ejemplo from "../Ejemplo.jsx";
import Seccion from "../app-components/Seccion.jsx";
import FormOrden from "./FormOrden.jsx";

export default function Ordenes() {
  const [nuevaOrden, setNuevaOrden] = useState(false);
  return !nuevaOrden ? (
    <div key="ordenes" className="app-body">
      <header className="seccion-header">
        <span>
          <button onClick={() => setNuevaOrden(true)}>Nueva Órden</button>
        </span>
      </header>
      <Seccion
        activo={false}
        propiedades={{
          icono: "order_play",
          titulo: "Órdenes activas",
          contenido: null,
        }}
      />
      <Seccion
        activo={false}
        propiedades={{
          icono: "inactive_order",
          titulo: "Órdenes pausadas",
          contenido: null,
        }}
      />
      <Seccion
        activo={false}
        propiedades={{
          icono: "order_approve",
          titulo: "Órdenes finalizadas",
          contenido: null,
        }}
      />
    </div>
  ) : (
    <FormOrden />
  );
}
