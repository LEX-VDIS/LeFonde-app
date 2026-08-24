import "./Reportes.css";
import { useEffect, useState } from "react";

export default function Reportes({ activarBoton }) {
  activarBoton(false);
  const [ordenes, setOrdenes] = useState([]);
  useEffect(() => {
    const fetchOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const fetchURL = `http://${import.meta.env.VITE_DB_IP}:${import.meta.env.VITE_DB_PORT}/ordenes`;
    fetch(fetchURL, fetchOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched reportes:", data.ordenes[0]);
        setOrdenes(data.ordenes[0]);
      })
      .catch((error) => {
        console.error("Error fetching reportes:", error);
      });
  }, []);

  console.log(ordenes);

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
            <div className="infoCard">
              <div className="colIcon">
                <span className="icon material-symbols-rounded infoCard-icon">
                  room_service
                </span>
              </div>
              <div className="colText">
                <label className="key"> Total de ordenes</label>
                <label className="value"> {ordenes.length}</label>
              </div>
            </div>
            <div className="infoCard">
              <div className="colIcon">
                <span className="icon material-symbols-rounded infoCard-icon">
                  money_bag
                </span>
              </div>
              <div className="colText">
                <label className="key"> Total de ganancia</label>
                <label className="value">
                  {" "}
                  $
                  {ordenes.reduce(
                    (acc, orden) => acc + parseInt(orden.total),
                    0,
                  )}
                </label>
              </div>
            </div>
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
