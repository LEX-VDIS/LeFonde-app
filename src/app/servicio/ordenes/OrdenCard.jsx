import "./OrdenCard.css";
import { useNavigate } from "react-router-dom";
import { parseJwt } from "../../sesion";
import { useEffect, useState } from "react";

export default function Orden({ propiedades }) {

  const [usuario, setUsuario] = useState(propiedades.idusuario);
  useEffect(() => {
    const fetchOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idusuario: propiedades.idusuario }),
    };
    const fetchUsuario = async () => {
      const response = await fetch(
        `http://${import.meta.env.VITE_DB_IP}:${import.meta.env.VITE_DB_PORT}/usuarios`,
        fetchOptions
      );
      const data = await response.json();
      setUsuario(data.usuario[0].nombre);
    };
    fetchUsuario();
  }, []);

  const navigate = useNavigate();
  return (
    <div
      className="tarjetaOrden"
      onClick={() => navigate(`/servicio/ordenes/${propiedades.idorden}`)}
    >
      <div className="rowOrden">
        <span className="icon material-symbols-rounded">room_service</span>
        <label>Orden #{propiedades.idorden}</label>
      </div>
      {propiedades.idmesa !== 0 ? (
        <div className="rowOrden">
          <span className="icon material-symbols-rounded">
            table_restaurant
          </span>
          <label> Mesa #{propiedades.idmesa}</label>
        </div>
      ) : (
        <div className="rowOrden">
          <span className="icon material-symbols-rounded">
            takeout_dining_2
          </span>
          <label>Mostrador</label>
        </div>
      )}
      <div className="rowOrden">
        <span className="icon material-symbols-rounded">hand_meal</span>
        <label>
          {propiedades.prod_servidos}/{propiedades.prod_totales} servidos
        </label>
      </div>
      <div className="rowOrden">
        <span className="icon material-symbols-rounded">watch</span>
        <label>
          {new Date(new Date(`1970-01-01T${propiedades.hora}Z`).getTime() + 21600000).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </label>
      </div>
      {parseJwt(localStorage.getItem("tokenme")).usuario[0].administrador ===
        1 && (
        <div className="rowOrden">
          <span className="icon material-symbols-rounded">person_apron</span>
          <label>{usuario}</label>
        </div>
      )}
    </div>
  );
}
