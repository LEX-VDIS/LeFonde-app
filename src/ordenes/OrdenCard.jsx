import "./OrdenCard.css";

export default function Orden({ propiedades }) {
  //console.log("propiedades", propiedades);
  return (
    <div className="tarjetaOrden">
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
