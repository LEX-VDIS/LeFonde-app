import "./Reportes.css";
import InfoCard from "../../../app-components/InfoCard.jsx";
import { useEffect, useState } from "react";
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
        setOrdenes(data.ordenes[0]);
      })
      .catch((error) => {
        console.error("Error fetching reportes:", error);
      });
  }, [updateReportes]); //Efecto para obtener la lista de reportes al cargar la página y cuando se recibe un mensaje del servidor

  return (
    <div className="app-body">
      <header className="form-header ">
        <span className="form-header-span ">
          <span className=" reportes-header">
            <span className="icon material-symbols-rounded">query_stats</span>
            <label style={{ whiteSpace: "nowrap" }}>Reporte de ventas</label>
            <select id="serv" name="servicio">
              <option value="0">por dia</option>
              <option value="1">por rango</option>
            </select>
            <span className="fecha-span">
              <span className="icon material-symbols-rounded">
                calendar_month
              </span>
              <label>{new Date().toLocaleDateString()}</label>
            </span>
          </span>
        </span>
      </header>
      <div className="form-body">
        <div className="abd-left">
          <span className="orden-title">
            <span className="icon material-symbols-rounded">analytics</span>
            <span>Resumen</span>
          </span>
          <div className="detallecard-container-cards">
            <InfoCard
              icon="room_service"
              label="Total de ordenes"
              value={ordenes.length}
            />
            <InfoCard
              icon="money_bag"
              label="Total de ganancia"
              value={`$${ordenes.reduce(
                (acc, orden) => acc + parseInt(orden.total),
                0,
              )}`}
            />
          </div>
          <div className="form-footer">
            <div className="form-footer-left"></div>
            <div className="form-footer-right">
              <button className="accion seccion blue" type="submit">
                <span className="icon material-symbols-rounded">save</span>
                Exportar
              </button>
            </div>
          </div>
        </div>
        <div className="abd-right">
          <span className="orden-title">
            <span className="icon material-symbols-rounded">room_service</span>
            <label style={{ whiteSpace: "nowrap" }}>
              Ordenes del {new Date().toLocaleDateString()}
            </label>
          </span>
          <div className="detallecard-container">
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
                        {new Date(
                          `1970-01-01T${orden.hora}Z`,
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td>${orden.total}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
