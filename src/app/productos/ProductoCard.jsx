import "./ProductoCard.css";

export default function ProductoCard({ propiedades }) {
  return (
    <div className="producto-card">
        <span className="producto-card-header">
          <span>
            <strong>{propiedades.nombre}</strong>
            <strong>${Intl.NumberFormat("es-MX", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(propiedades.precio)}</strong>
          </span>
        </span>
        <span>{propiedades.descripcion}</span>
    </div>
  );
}
