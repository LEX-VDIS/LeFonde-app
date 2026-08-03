import "./Producto.css";

export default function Producto({ propiedades }) {
  return (
    <div className="tarjeta">
      <div className="row">
        <span className="icon material-symbols-rounded">{propiedades.icono}</span>
        <label>{propiedades.nombre}</label>
      </div>
    </div>
  );
}
