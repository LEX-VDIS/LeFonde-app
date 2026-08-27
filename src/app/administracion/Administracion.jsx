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
            totalOrdenes: result.conteo[0][0].total,
            totalGanancia: result.conteo[1][0].total,
            administradores: result.conteo[2][0].total,
            usuarios: result.conteo[3][0].total,
          });
        } else {
          alert(result.mensaje);
        }
      })
      .catch((error) => {
        console.error("Error fetching administración:", error);
      });
  }, [update]); //Efecto para obtener la lista de administración al cargar la página y cuando se recibe un mensaje del servidor

  console.log("Conteo de administración:", conteo); // Agrega este console.log para depuración
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
        <InfoCard icon="room_service" label="Total de ordenes" value={conteo.totalOrdenes} />
        <InfoCard icon="money_bag" label="Total de ganancia" value={conteo.totalGanancia} />
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
