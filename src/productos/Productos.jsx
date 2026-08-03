import { useState, useEffect } from "react";
import "./Productos.css";
import Seccion from "../app-components/Seccion.jsx";

export default function Productos() {
  return (
    <div className="app-body">
      <Seccion
        propiedades={{
          icono: "sports_bar",
          titulo: "Bebidas",
          contenido: "",
        }}
      />
      <Seccion
        propiedades={{
          icono: "dinner_dining",
          titulo: "Platillos",
          contenido: "",
        }}
      />
      <Seccion
        propiedades={{
          icono: "icecream",
          titulo: "Postres",
          contenido: "",
        }}
      />
    </div>
  );
}
