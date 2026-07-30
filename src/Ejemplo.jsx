import "./Ejemplo.css";

export default function Ejemplo({ propiedades }) {
  return (
    <div className="tarjeta">
      <div className="row">
        <span className="icon material-symbols-rounded">hand_meal</span>
        <label>Orden {propiedades.numero}</label>
      </div>
      <div className="row">
        <span className="icon material-symbols-rounded">table_restaurant</span>
        <label>Mesa</label>
      </div>
    </div>
  );
}
