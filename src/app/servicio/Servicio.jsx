import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { set } from "react-hook-form";

export default function Servicio() {
  const navigate = useNavigate();
  const [conteo, setConteo] = useState({
    ordenesActivas: 0,
    ordenesServidas: 0,
    ordenesFinalizadas: 0,
    mesasDisponibles: 0,
    mesasOcupadas: 0,
  });
  useEffect(() => {
    const fetchOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    const fetchURL = `http://${import.meta.env.VITE_DB_IP}:${import.meta.env.VITE_DB_PORT}/servicio`;

    fetch(fetchURL, fetchOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          setConteo({
            ordenesActivas: result.conteos[0][0].total,
            ordenesServidas: result.conteos[1][0].total,
            ordenesFinalizadas: result.conteos[2][0].total,
            mesasDisponibles: result.conteos[3][0].total,
            mesasOcupadas: result.conteos[4][0].total,
          });
        } else {
          alert(result.mensaje);
        }
      });
  }, []);

  return (
    <div className="app-body">
      <div className="app-section">
        <header
          className="form-header title-link"
          onClick={() => navigate(`/servicio/ordenes`)}
        >
          <span className="form-header-span">
            <span className="form-header-title">
              <span className="icon material-symbols-rounded">
                room_service
              </span>
              <span>Ordenes</span>
            </span>
          </span>
          <span className="section_action">
            <span className="icon right material-symbols-rounded">
              expand_circle_right
            </span>
          </span>
        </header>
        <div className="form-body">
          <div className="form-body-item">
            <span className="icon material-symbols-rounded">order_play</span>
            <span>Ordenes activas: {conteo.ordenesActivas}</span>
          </div>
          <div className="form-body-item">
            <span className="icon material-symbols-rounded">
              inactive_order
            </span>
            <span>Ordenes servidas: {conteo.ordenesServidas}</span>
          </div>
          <div className="form-body-item">
            <span className="icon material-symbols-rounded">order_approve</span>
            <span>Ordenes finalizadas: {conteo.ordenesFinalizadas}</span>
          </div>
        </div>
      </div>
      <div className="app-section">
        <header
          className="form-header title-link"
          onClick={() => navigate(`/servicio/mesas`)}
        >
          <span className="form-header-span">
            <span className="form-header-title">
              <span className="icon material-symbols-rounded">
                table_restaurant
              </span>
              <span>Mesas</span>
            </span>
          </span>
          <span className="section_action">
            <span className="icon right material-symbols-rounded">
              expand_circle_right
            </span>
          </span>
        </header>
        <div className="form-body">
          <div className="form-body-item">
            <span className="icon material-symbols-rounded">dine_lamp</span>
            <span>Mesas disponibles: {conteo.mesasDisponibles}</span>
          </div>
          <div className="form-body-item">
            <span className="icon material-symbols-rounded">dine_in</span>
            <span>Mesas ocupadas: {conteo.mesasOcupadas}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
