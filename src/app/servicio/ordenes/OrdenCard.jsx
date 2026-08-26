import "./OrdenCard.css";
import { useNavigate } from "react-router-dom";

export default function Orden({ propiedades }) {
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
          {propiedades.prod_servidos} de {propiedades.prod_totales} servidos
        </label>
      </div>
      <div className="rowOrden">
        <span className="icon material-symbols-rounded">watch</span>
        <label>
          {new Date(
            `1970-01-01T${propiedades.hora}Z`,
          ).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </label>
      </div>
    </div>
  );
}
