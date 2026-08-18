import "./MesaCard.css";

export default function MesaCard({ propiedades }) {
  return (
    <div className="tarjetaMesa">
      <div className="rowMesa">
        <span className="icon material-symbols-rounded">table_restaurant</span>
        <label>Mesa {propiedades.numero}</label>
      </div>
    </div>
  );
}
