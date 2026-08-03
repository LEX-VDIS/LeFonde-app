import { useState } from "react";
import "./Ordenes.css";
import Ejemplo from "../Ejemplo.jsx";
import Seccion from "../app-components/Seccion.jsx";
import NuevaOrden from "./NuevaOrden.jsx";

const cantidad = 5;
const ejemplo = Array.from({ length: cantidad }, (_, index) => (
  <Ejemplo key={index} propiedades={{ numero: index }} />
));

export default function Ordenes() {
  const [nuevaOrden, setNuevaOrden] = useState(false);
  return !nuevaOrden ? (
    <>
      <div className="app-body">
        <header>
          <span>
            <button onClick={() => setNuevaOrden(true)}>Nueva Órden</button>
          </span>
        </header>
      </div>
      <div className="app-body">
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
    </>
  ) : (
    <NuevaOrden />
  );
}
