import "./Mesa.css";

export default function Mesa({ propiedades }) {
  return (
    <div className="tarjeta">
      <div className="row">
        <span className="icon material-symbols-rounded">table_restaurant</span>
        <label>Mesa {propiedades.numero}</label>
      </div>
    </div>
  );
}
