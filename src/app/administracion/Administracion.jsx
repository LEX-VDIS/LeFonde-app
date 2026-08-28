import { useEffect, useState } from "react";
import SeccionLink from "../../app-components/SeccionLink.jsx";
import InfoCard from "../../app-components/InfoCard.jsx";
import { io } from "socket.io-client";
import { useSubmit } from "react-router-dom";
const socket = io(
  `http://${import.meta.env.VITE_DB_IP}:${import.meta.env.VITE_DB_PORT}`,
);

export default function Administracion({ activarBoton }) {
  activarBoton(false);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    socket.on("mensaje", (data) => {
      console.log("Mensaje del servidor:", data);
      setUpdate((prev) => !prev);
    });
  }, []); //Efecto para escuchar los mensajes del servidor y actualizar la lista de ordenes cuando se recibe un mensaje

  const [conteo, setConteo] = useState({
    totalOrdenes: 0,
    totalGanancia: 0,
    administradores: 0,
    usuarios: 0,
  });

  useEffect(() => {
    const fetchOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const fetchURL = `http://${import.meta.env.VITE_DB_IP}:${import.meta.env.VITE_DB_PORT}/administracion`;

    fetch(fetchURL, fetchOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          setConteo({
            totalOrdenes: result.conteos[0][0].total,
            totalGanancia: result.conteos[1][0].total,
            administradores: result.conteos[2][0].total,
            usuarios: result.conteos[3][0].total,
          });
        } else {
          alert(result.mensaje);
        }
      })
      .catch((error) => {
        console.error("Error fetching administración:", error);
      });
  }, [update]); //Efecto para obtener la lista de administración al cargar la página y cuando se recibe un mensaje del servidor

  return (
    <div className="app-body">
      <SeccionLink
        propiedades={{
          icono: "query_stats",
          titulo: "Reportes",
          ruta: "/administracion/reportes",
          mostrar: "flex",
        }}
      >
        <InfoCard icon="room_service" label="Total de órdenes" value={conteo.totalOrdenes} />
        <InfoCard icon="money_bag" label="Total de ingresos" value={"$" + Intl.NumberFormat("es-MX", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(conteo.totalGanancia)} />
      </SeccionLink>
      <SeccionLink
        propiedades={{
          icono: "person",
          titulo: "Personal",
          ruta: "/administracion/personal",
          mostrar: "flex",
        }}
      >
        <InfoCard icon="manage_accounts" label="Administradores" value={conteo.administradores} />
        <InfoCard icon="person" label="Usuarios" value={conteo.usuarios} />
      </SeccionLink>
    </div>
  );
}
