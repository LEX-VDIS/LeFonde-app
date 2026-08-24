import { useState, useEffect } from "react";
import Seccion from "../../../app-components/Seccion.jsx";
import "./Ordenes.css";
import OrdenCard from "./OrdenCard.jsx";
import OrdenForm from "./OrdenForm.jsx";
import { CartProvider } from "./Cart.jsx";
import { useLocation } from "react-router-dom";

export default function Ordenes({ activarBoton, propsBoton }) {
  useEffect(() => {
    activarBoton(true);
    propsBoton({
      texto: "Nueva",
      icono: "add_circle",
      click: () => {
        setNuevaOrden(true);
        activarBoton((prev) => !prev);
      },
    });
  }, [activarBoton, propsBoton]); //Efecto para activar el botón de nueva orden en el header al cargar la página

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const newOrderParam = queryParams.get("new");
  const mesaParam = queryParams.get("mesa");
  const [nuevaOrden, setNuevaOrden] = useState(false);
  const [ordenesActivas, setOrdenesActivas] = useState([]);
  const [ordenesServidas, setOrdenesServidas] = useState([]);
  const [ordenesFinalizadas, setOrdenesFinalizadas] = useState([]);

  useEffect(() => {
    if (newOrderParam === "true") {
      setNuevaOrden(true);
    }
  }, [newOrderParam]); //Efecto para comprobar si se debe abrir el formulario de nueva orden al cargar la página

  useEffect(() => {
    if (mesaParam) {
      setNuevaOrden(true);
    }
  }, [mesaParam]); //Efecto para comprobar si se debe abrir el formulario de nueva orden con la mesa preseleccionada al cargar la página

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
            (orden, index) => (
              <OrdenCard key={index} propiedades={{ ...orden }} />
            ),
          );
          const ordenesServidas = Array.from(
            result.ordenes[1],
            (orden, index) => (
              <OrdenCard key={index} propiedades={{ ...orden }} />
            ),
          );
          const ordenesFinalizadas = Array.from(
            result.ordenes[2],
            (orden, index) => (
              <OrdenCard key={index} propiedades={{ ...orden }} />
            ),
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
      <Seccion
        activo={true}
        propiedades={{
          icono: "order_play",
          titulo: "Ordenes activas",
          contenido: ordenesActivas,
        }}
      />
      <Seccion
        activo={true}
        propiedades={{
          icono: "inactive_order",
          titulo: "Ordenes servidas",
          contenido: ordenesServidas,
        }}
      />
      <Seccion
        activo={true}
        propiedades={{
          icono: "order_approve",
          titulo: "Ordenes finalizadas",
          contenido: ordenesFinalizadas,
        }}
      />
    </div>
  ) : (
    <CartProvider>
      <OrdenForm
        setNuevaOrden={setNuevaOrden}
        mesa={mesaParam}
        activarBoton={activarBoton}
        propsBoton={propsBoton}
      />
    </CartProvider>
  );
}
