import { useEffect, useState } from "react";
import SeccionLink from "../../app-components/SeccionLink.jsx";
import InfoCard from "../../app-components/InfoCard.jsx";
import { io } from "socket.io-client";
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

  return (
    <div className="app-body">
      <SeccionLink
        propiedades={{
          icono: "query_stats",
          titulo: "Reportes",
          ruta: "/administracion/reportes",
          mostrar: "flex",
        }}
      ></SeccionLink>
      <SeccionLink
        propiedades={{
          icono: "person",
          titulo: "Personal",
          ruta: "/administracion/personal",
          mostrar: "flex",
        }}
      ></SeccionLink>
    </div>
  );
}
