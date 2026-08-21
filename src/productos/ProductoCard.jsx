import "./ProductoCard.css";

export default function ProductoCard({ propiedades }) {
  return (
    <div className="producto-card">
        <span className="producto-card-header">
          <span>
            <strong>{propiedades.nombre}</strong>
            <strong>${propiedades.precio}</strong>
          </span>
        </span>
        <span>{propiedades.descripcion}</span>
    </div>
  );
}
