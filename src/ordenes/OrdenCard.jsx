import "./OrdenCard.css";
import {useNavigate} from "react-router-dom";

export default function Orden({ propiedades }) {
  const navigate = useNavigate();
  return (
    <div className="tarjetaOrden" onClick={() => navigate(`/operacion/ordenes/${propiedades.idorden}`)}>
      <div className="rowOrden">
        <span className="icon material-symbols-rounded">hand_meal</span>
        <label>Orden #{propiedades.idorden}</label>
      </div>
      <div className="rowOrden">
        <span className="icon material-symbols-rounded">table_restaurant</span>
        <label> Mesa #{propiedades.idmesa}</label>
      </div>
    </div>
  );
}
