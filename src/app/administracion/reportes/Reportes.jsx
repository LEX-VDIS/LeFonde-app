import "./Reportes.css";
import InfoCard from "../../../app-components/InfoCard.jsx";
import { useEffect, useState } from "react";
import Seccion from "../../../app-components/Seccion.jsx";
import SeccionShow from "../../../app-components/SeccionShow.jsx";
import { io } from "socket.io-client";
const socket = io(
  `http://${import.meta.env.VITE_DB_IP}:${import.meta.env.VITE_DB_PORT}`,
);

export default function Reportes({ activarBoton }) {
  activarBoton(false);
  const [ordenes, setOrdenes] = useState([]);
  const [updateReportes, setUpdateReportes] = useState(false);

  useEffect(() => {
    socket.on("mensaje", (data) => {
      console.log("Mensaje del servidor:", data);
      setUpdateReportes((prev) => !prev);
    });
  }, [updateReportes]); //Efecto para escuchar los mensajes del servidor y actualizar la lista de ordenes cuando se recibe un mensaje

  useEffect(() => {
    const fetchOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const fetchURL = `http://${import.meta.env.VITE_DB_IP}:${import.meta.env.VITE_DB_PORT}/ordenes`;
    fetch(fetchURL, fetchOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("Datos de reportes obtenidos:", data); // Agrega este console.log para depuración
        setOrdenes(data.ordenes[2]);
      })
      .catch((error) => {
        console.error("Error fetching reportes:", error);
      });
  }, [updateReportes]); //Efecto para obtener la lista de reportes al cargar la página y cuando se recibe un mensaje del servidor

  return (
    <div className="app-body">
      <Seccion
        propiedades={{
          icono: ["query_stats", "calendar_month"],
          titulo: ["Reporte de ventas", new Date().toLocaleDateString()],
          mostrar: "flex",
          doble: true,
        }}
      >
        <SeccionShow
          activo={true}
          propiedades={{
            icono: ["leaderboard"],
            titulo: ["Resumen de ordenes"],
            mostrar: "flex",
            lado: "left",
          }}
        >
          <InfoCard
            icon="room_service"
            label="Total de ordenes"
            value={ordenes.length}
          />
          <InfoCard
            icon="money_bag"
            label="Total de ganancia"
            value={`$${Intl.NumberFormat("es-MX", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(
              ordenes.reduce((acc, orden) => acc + parseInt(orden.total), 0),
            )}`}
          />
        </SeccionShow>
        <SeccionShow
          activo={true}
          propiedades={{
            icono: ["room_service"],
            titulo: [`Ordenes del ${new Date().toLocaleDateString()}`],
            mostrar: "flex",
            lado: "right",
          }}
        >
          <table className="ordenes-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {ordenes &&
                ordenes.map((orden, index) => (
                  <tr key={index}>
                    <td>{orden.idorden}</td>
                    <td>{new Date(orden.fecha).toLocaleDateString()}</td>
                    <td>
                      {new Date(`1970-01-01T${orden.hora}Z`).toLocaleTimeString(
                        [],
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )}
                    </td>
                    <td>
                      $
                      {Intl.NumberFormat("es-MX", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(orden.total)}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </SeccionShow>
      </Seccion>
    </div>
  );
}
