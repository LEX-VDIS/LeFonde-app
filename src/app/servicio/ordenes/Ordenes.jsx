import { useState, useEffect, use } from "react";
import "./Ordenes.css";
import OrdenCard from "./OrdenCard.jsx";
import OrdenForm from "./OrdenForm.jsx";
import SeccionShow from "../../../app-components/SeccionShow.jsx";
import { CartProvider } from "./Cart.jsx";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
const socket = io(
  `http://${import.meta.env.VITE_DB_IP}:${import.meta.env.VITE_DB_PORT}`,
);

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
  const [ordenes, setOrdenes] = useState([]);
  const [updateOrdenes, setUpdateOrdenes] = useState(false);

  useEffect(() => {
    socket.on("mensaje", (data) => {
      setUpdateOrdenes((prev) => !prev);
    });
  }, []); //Efecto para escuchar los mensajes del servidor y actualizar la lista de ordenes cuando se recibe un mensaje

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
          setOrdenes((prev) => {
            const newOrdenes = [...prev];
            newOrdenes[0] = result.ordenes[0].length;
            return newOrdenes;
          });
          const ordenesActivas = Array.from(
            result.ordenes[0],
            (orden, index) => (
              <OrdenCard key={index} propiedades={{ ...orden }} />
            ),
          );
          setOrdenes((prev) => {
            const newOrdenes = [...prev];
            newOrdenes[1] = result.ordenes[1].length;
            return newOrdenes;
          });
          const ordenesServidas = Array.from(
            result.ordenes[1],
            (orden, index) => (
              <OrdenCard key={index} propiedades={{ ...orden }} />
            ),
          );
          setOrdenes((prev) => {
            const newOrdenes = [...prev];
            newOrdenes[2] = result.ordenes[2].length;
            return newOrdenes;
          });
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
  }, [nuevaOrden, updateOrdenes]); //Efecto para obtener las ordenes activas, servidas y finalizadas

  return !nuevaOrden ? (
    <div key="ordenes" className="app-body">
      <SeccionShow
        activo={true}
        propiedades={{
          icono: "order_play",
          titulo: "Ordenes activas",
          cantidad: ordenes[0],
        }}
      >
        {ordenesActivas}
      </SeccionShow>
      <SeccionShow
        activo={true}
        propiedades={{
          icono: "inactive_order",
          titulo: "Ordenes servidas",
          cantidad: ordenes[1],
        }}
      >
        {ordenesServidas}
      </SeccionShow>
      <SeccionShow
        activo={true}
        propiedades={{
          icono: "order_approve",
          titulo: "Ordenes finalizadas",
          cantidad: ordenes[2],
        }}
      >
        {ordenesFinalizadas}
      </SeccionShow>
    </div>
  ) : (
    <CartProvider>
      <OrdenForm
        setNuevaOrden={setNuevaOrden}
        mesa={mesaParam}
        activarBoton={activarBoton}
        propsBoton={propsBoton}
        update={setUpdateOrdenes}
      />
    </CartProvider>
  );
}
