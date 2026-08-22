import "./MesaCard.css";
import { useNavigate } from "react-router-dom";

export default function MesaCard({ propiedades }) {
  const navigate = useNavigate();
  return (
    <div className="tarjetaMesa" onClick={() => propiedades.orden ? navigate(`/servicio/ordenes/${propiedades.orden.idorden}`) : navigate(`/servicio/ordenes?new=true&mesa=${propiedades.numero}`)}>
      <div className="rowMesa">
        <span className="icon material-symbols-rounded">table_restaurant</span>
        <label>Mesa #{propiedades.numero}</label>
      </div>
      {propiedades.orden && (
        <div className="rowMesa">
          <span className="icon material-symbols-rounded">room_service</span>
          <label>Orden #{propiedades.orden.idorden}</label>
        </div>
      )}
    </div>
  );
}
