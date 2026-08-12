import { useState } from "react";
import "./Ordenes.css";
import Ejemplo from "../Ejemplo.jsx";
import Seccion from "../app-components/Seccion.jsx";
import FormOrden from "./FormOrden.jsx";
import { CartProvider } from "./Cart.jsx";

export default function Ordenes() {
  const [nuevaOrden, setNuevaOrden] = useState(false);
  return !nuevaOrden ? (
    <div key="ordenes" className="app-body">
      <header className="seccion-header">
        <span></span>
        <span>
          <button className="accion" onClick={() => setNuevaOrden(true)}>
            <span className="material-symbols-rounded">add_circle</span>Nueva
            Orden
          </button>
        </span>
      </header>
      <Seccion
        activo={false}
        propiedades={{
          icono: "order_play",
          titulo: "Ordenes activas",
          contenido: null,
        }}
      />
      <Seccion
        activo={false}
        propiedades={{
          icono: "inactive_order",
          titulo: "Ordenes pausadas",
          contenido: null,
        }}
      />
      <Seccion
        activo={false}
        propiedades={{
          icono: "order_approve",
          titulo: "Ordenes finalizadas",
          contenido: null,
        }}
      />
    </div>
  ) : (
    <CartProvider>
      <FormOrden />
    </CartProvider>
  );
}
