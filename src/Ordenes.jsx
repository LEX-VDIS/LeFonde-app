import { useState } from "react";
import "./Ordenes.css";
import Ejemplo from "./Ejemplo";
import Seccion from "./components/Seccion.jsx";

const cantidad = 33;
const mesobas = Array.from({ length: cantidad }, (_, index) => (
  <Ejemplo key={index} propiedades={{ numero: index }} />
));

export default function Ordenes() {
  return (
    <div className="app-body">
      <Seccion
        propiedades={{
          icono: "order_play",
          titulo: "Órdenes activas",
          contenido: mesobas }}
      />
      <Seccion
        propiedades={{
          icono: "inactive_order",
          titulo: "Órdenes pausadas",
          contenido: null,
        }}
      />
      <Seccion
        propiedades={{
          icono: "order_approve",
          titulo: "Órdenes finalizadas",
          contenido: null,
        }}
      />
    </div>
  );
}
