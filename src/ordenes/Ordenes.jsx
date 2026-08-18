import { useState, useEffect } from "react";
import Seccion from "../app-components/Seccion.jsx";
import "./Ordenes.css";
import OrdenCard from "./OrdenCard.jsx";
import OrdenForm from "./OrdenForm.jsx";
import { CartProvider } from "./Cart.jsx";

export default function Ordenes() {
  const [nuevaOrden, setNuevaOrden] = useState(false);
  const [ordenesActivas, setOrdenesActivas] = useState([]);
  const [ordenesServidas, setOrdenesServidas] = useState([]);
  const [ordenesFinalizadas, setOrdenesFinalizadas] = useState([]);

  useEffect(() => {
    const fetchOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const fetchURL = `http://${import.meta.env.VITE_DB_IP}:${import.meta.env.VITE_DB_PORT}/ordenes`;

    fetch(fetchURL, fetchOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          const ordenesActivas = Array.from(
            result.ordenes[0],
            (orden, index) => <OrdenCard key={index} propiedades={{ ...orden }} />,
          );
          const ordenesServidas = Array.from(
            result.ordenes[1],
            (orden, index) => <OrdenCard key={index} propiedades={{ ...orden }} />,
          );
          const ordenesFinalizadas = Array.from(
            result.ordenes[2],
            (orden, index) => <OrdenCard key={index} propiedades={{ ...orden }} />,
          );
          setOrdenesActivas(ordenesActivas);
          setOrdenesServidas(ordenesServidas);
          setOrdenesFinalizadas(ordenesFinalizadas);
        } else {
          alert(result.mensaje);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [nuevaOrden]); //Efecto para obtener las ordenes activas, servidas y finalizadas

  return !nuevaOrden ? (
    <div key="ordenes" className="app-body">
      <header className="seccion-header">
        <span></span>
        <span>
          <button className="accion blue" onClick={() => setNuevaOrden(true)}>
            <span className="material-symbols-rounded">add_circle</span>Nueva
            Orden
          </button>
        </span>
      </header>
      <Seccion
        activo={true}
        propiedades={{
          icono: "order_play",
          titulo: "Ordenes activas",
          contenido: ordenesActivas,
        }}
      />
      <Seccion
        activo={false}
        propiedades={{
          icono: "inactive_order",
          titulo: "Ordenes servidas",
          contenido: ordenesServidas,
        }}
      />
      <Seccion
        activo={false}
        propiedades={{
          icono: "order_approve",
          titulo: "Ordenes finalizadas",
          contenido: ordenesFinalizadas,
        }}
      />
    </div>
  ) : (
    <CartProvider>
      <OrdenForm setNuevaOrden={setNuevaOrden} />
    </CartProvider>
  );
}
